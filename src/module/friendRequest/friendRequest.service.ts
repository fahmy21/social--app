import { IFriendRequest } from "../../common/interfaces/friendRequest.interface";
import { friendRequestModel } from "../../database/model/friendRequest.model";
import { DatabaseRepository } from "../../database/reposatory/database.reposatory";
import { FriendService } from "../friend/friend.service";

export class FriendRequestService {

    private FriendRequestRepository:
        DatabaseRepository<IFriendRequest>;

    private friendService: FriendService;

    constructor() {

        this.FriendRequestRepository =
            new DatabaseRepository<IFriendRequest>(
                friendRequestModel
            );

        this.friendService =
            new FriendService();
    }

    async sendRequest(
        senderId: string,
        receiverId: string
    ) {

        if (senderId === receiverId) {

            throw new Error( "You cannot send a friend request to yourself");

        }

        const existingRequest =
            await this.FriendRequestRepository.Find_One({

                filter: {
                    senderId: senderId,
                    receiverId: receiverId,
                    status: "pending"
                }

            });

        if (existingRequest) {

            throw new Error("Friend request already exists" );

        }

        await this.FriendRequestRepository.create({

            senderId: senderId as any,

            receiverId: receiverId as any,

            status: "pending"

        });

        return {
            message: "Friend request sent successfully"
        };
    }
async getPendingRequests(receiverId: string) {

    const requests =
        await this.FriendRequestRepository.Find_All({

            filter: {
                receiverId: receiverId,
                status: "pending"
            },

            populate: "senderId"

        });

    return requests;
}

    // Accept Friend Request
    async acceptRequest(
        requestId: string,
        receiverId: string
    ) {

        const request =
            await this.FriendRequestRepository.Find_One({

                filter: {
                    _id: requestId,
                    receiverId: receiverId,
                    status: "pending"
                }

            });

        if (!request) {

            throw new Error(
                "Friend request not found"
            );

        }

        await this.FriendRequestRepository.Updata_one({

            filter: {
                _id: requestId,
                receiverId: receiverId
            },

            data: {
                status: "accepted"
            }

        });

        await this.friendService.addFriend(
            request.senderId.toString(),
            request.receiverId.toString()
        );

        await this.friendService.addFriend(
            request.receiverId.toString(),
            request.senderId.toString()
        );
        return {
            message:
                "Friend request accepted successfully"
        };
    }


    // Reject Friend Request
    async rejectRequest(
        requestId: string,
        receiverId: string
    ) {

        const request =
            await this.FriendRequestRepository.Find_One({

                filter: {
                    _id: requestId,
                    receiverId: receiverId,
                    status: "pending"
                }

            });

        if (!request) {

            throw new Error(
                "Friend request not found"
            );

        }

        await this.FriendRequestRepository.Updata_one({

            filter: {
                _id: requestId,
                receiverId: receiverId
            },

            data: {
                status: "rejected"
            }

        });

        return {
            message:
                "Friend request rejected successfully"
        };
    }

}