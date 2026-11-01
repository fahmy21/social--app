import { Router, type Request, type Response } from "express";
import Auth_Service from "./auth.service";
import { Success_Response } from "../../common/excaptions/success.response";
import { auth, userrequest } from "../../middleware/auth.middleware";
import { checkRole } from "../../middleware/checkrolr.middelware";
import { Validation } from "../../common/service/validation";
import { SignupSchema } from "./auth.validation";
import { Upload_File } from "../../common/utils/multer/doud";
import { Multer_Storage } from "../../common/enums/multer.enums";


const router: Router = Router();

router.post("/login", async (req: Request, res: Response) => {
    let login_user = await Auth_Service.login(req.body)
    Success_Response({ res, message: "login user", status: 200, data: login_user })
})
///////////////////////////////////////////////////////////////////////////////////
router.get("/get-all-user/:id", auth, checkRole(["1"]), async (req: userrequest, res: Response) => {
    let userdata = await Auth_Service.Get_All_Users(req.params.id as string)
    Success_Response({ res, message: "all users", status: 200, data: userdata })
})
///////////////////////////////////////////////////////////////////////////////////

router.post("/signup", Upload_File({ Storage_Key: Multer_Storage.memoryStorage }).single("profilePicture"), Validation(SignupSchema), async (req: Request, res: Response) => {

    let signup = await Auth_Service.signup(req.body, req.file as Express.Multer.File);

    Success_Response({ res, message: "signup user", status: 200, data: signup });
});
///////////////////////////////////////////////////////////////////////////////////
router.put("/verify_user_account",async(req:Request,res:Response)=>{
let userData = await Auth_Service.Verify_Account(req.body)
    Success_Response({ res, message: "verify_user ", status: 200, data: userData });

})
///////////////////////////////////////////////////////////////////////////////////



export default router