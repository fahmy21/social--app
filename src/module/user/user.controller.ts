import { Request, Response, Router } from "express";
import { userService } from "./user.service";
import { auth, userrequest } from "../../middleware/auth.middleware";
import { Success_Response } from "../../common/excaptions/success.response";
import { FriendService } from "../friend/friend.service";

const router = Router()

router.put("/Updata_User", auth, async (req: userrequest, res: Response) => {
    let updata_data = await userService.Updata_user(req.user.id as string, req.body)
    Success_Response({ res, message: "User Updataed", status: 200, data: updata_data })
})
////////////////////////////////////////////////////////////////////////////////////
router.delete("/Updata_User", auth, async (req: userrequest, res: Response) => {
    let Delete_User = await userService.Deleted_User(req.user.id as string)
    Success_Response({ res, message: "Deleted_User", status: 200, data: Delete_User })
})
////////////////////////////////////////////////////////////////////////////////////

const friendService = new FriendService();
router.get("/friends", auth, async (req: userrequest, res: Response) => {

    const friends = await friendService.getFriends(req.user.id as string);

    Success_Response({ res, message: "Friends", status: 200, data: friends });

});





export default router