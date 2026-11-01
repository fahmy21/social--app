import { Router } from "express";
import { auth } from "../../middleware/auth.middleware";
import { Success_Response } from "../../common/excaptions/success.response";
import { ChatService } from "./chat.service";
const chatService = new ChatService();

const router = Router()
router.get('/:participantId', auth, async (req: any, res: any, next: any) => {
    let chat = await chatService.getchat(req.params.participantId, req.user.id);
    Success_Response({ res, message: "chat conversation", status: 200, data: chat });
});

export default router;