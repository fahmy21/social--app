import { IUser } from "../../common";
import { Bad_Request_Exception, Not_Found_Exception } from "../../common/excaptions/error.exceptions";
import UserModel from "../../database/model/user.model";
import { DatabaseRepository } from "../../database/reposatory/database.reposatory";


class UserService {
    private userRepository: DatabaseRepository<IUser>;

    constructor() {
        this.userRepository = new DatabaseRepository<IUser>(UserModel);
    }
////////////////////////////////////////////////////////////////////////////////////

    async Updata_user(id: string, data: IUser) {
        let { Email, PhoneNumber, Password, UserName } = data
        let updata_data = await this.userRepository.Updata_one({ filter: { _id: id }, data: { Email, PhoneNumber, Password, UserName } })
        if (!updata_data) {
            throw new Bad_Request_Exception("something with wrong")
        }
        return {message:"User Updata"}
    }
////////////////////////////////////////////////////////////////////////////////////
async Deleted_User(id: string){
 let Deelet_Users = await this.userRepository.Delete_One({filter: { _id: id }})
    if (!Deelet_Users) {
            throw new Bad_Request_Exception("something with wrong")
        }
         return {message:"User Deleted"}

}
////////////////////////////////////////////////////////////////////////////////////
async Get_User(id: string) {
    let user = await this.userRepository.Find_One({
        filter: { _id: id }
    });

    if (!user) {
        throw new Not_Found_Exception("user not found");
    }

    return user;
}
///////////////////////////////////////////////////////////////////////////////////////////////


}

export const userService = new UserService();