import { IUser } from "../../common";
import { Send_Email } from "../../common/email/sendemai";
import { Bad_Request_Exception, Not_Found_Exception } from "../../common/excaptions/error.exceptions";
import { Compare_Hash, Generate_Hash } from "../../common/security/security";
import { redis } from "../../common/service/redis.service";
import { sS3_Service } from "../../common/service/s3.service";
import { TokenService } from "../../common/service/token.service";
import UserModel from "../../database/model/user.model";
import { DatabaseRepository } from "../../database/reposatory/database.reposatory";
import { signupDTO } from "./dto/auth.dto";


export class Auth_Service {

    private userRepository: DatabaseRepository<IUser>
    private tokenservice: TokenService
    constructor() {
        this.userRepository = new DatabaseRepository(UserModel)
        this.tokenservice = new TokenService()
    }
    //////////////////////////////////////////////////////////////////////////
    async Get_All_Users(id: string) {
        let FindAllUser = await this.userRepository.Find_One({ filter: { _id: id }, select: "Email  Password" })
        return FindAllUser
    }
    //////////////////////////////////////////////////////////////////////////
    async login(data: any) {
        let { email, password } = data

        let UserData = await this.userRepository.Find_One({ filter: { Email: email }, select: "+Password" })

        if (UserData) {
            let Match_Password = await Compare_Hash({ planText: password, cypherText: UserData.Password })

            if (Match_Password) {
                let { accessToken, refreshToken } = this.tokenservice.generateToken(UserData)
                return { accessToken, refreshToken }
            }
            else {
                throw new Bad_Request_Exception("password not match")
            }
        }
        else {
            throw new Not_Found_Exception("user is not found")
        }
    }
    //////////////////////////////////////////////////////////////////////////
    async signup(data: signupDTO, file: Express.Multer.File) {

        let { UserName, Email, Password, PhoneNumber, confirmPassword, } = data;

        let encrypt_password = await Generate_Hash({ planText: Password });

        let picture: string[] = [];

        let pic = await sS3_Service.createPreSignedUrl({
            Originalname: file.originalname,
            ContentType: file.mimetype
        });
        const otp = Math.floor(100000 + Math.random() * 900000)

        let addeduser = await this.userRepository.create({ UserName, Email, Password: encrypt_password, PhoneNumber, confirmPassword, profilePicture: picture });

        await redis.set({
            key: `otp::${addeduser._id}`,
            value: { otp },
            ttl: 300
        });
        console.log(otp);


        if (addeduser) {


            await Send_Email({
                to: Email,
                subject: "Welcome",
                html: "<h1>Welcome to Social Media App</h1>"
            });

            return addeduser;

        } else {

            throw new Bad_Request_Exception(
                "something went wrong"
            );
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    async Verify_Account(data: any) {
        let { Email, otp } = data
        let userData = this.userRepository.Find_One({ filter: { Email } })
        if (!userData) {
            throw new Not_Found_Exception("user not found")
        }
        let userotp = await redis.get(`otp::${userData._id}`)
        if (otp == userotp) {
            let updateduser = await this.userRepository.Updata_one({ filter: { _id: userData._id }, data: { ConfirmEmail: true } });
            return { message: "user verified" }
        }
        else {
            throw new Bad_Request_Exception("otp not matched")
        }

    }
    ////////////////////////////////////////////////////////////////////////////

}

export default new Auth_Service