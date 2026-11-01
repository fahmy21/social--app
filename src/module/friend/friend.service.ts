import { IFriend } from "../../common/interfaces/friend.interface";
import { friendModel } from "../../database/model/friend.model";
import { DatabaseRepository } from "../../database/reposatory/database.reposatory";

export class FriendService {

    private FriendRepository: DatabaseRepository<IFriend>;

    constructor() {
        this.FriendRepository =
            new DatabaseRepository<IFriend>(friendModel);
    }

    async addFriend(
        userId: string,
        friendId: string
    ) {

        const friend =
            await this.FriendRepository.create({
                userId: userId as any,
                friendId: friendId as any
            });

        return {
            message: "Friend added successfully"
        };
    }

    async getFriends(userId: string) {

        const friends =
            await this.FriendRepository.Find_All({
                filter: {
                    userId: userId
                },
                populate: "friendId"
            });

        return friends;
    }

    async removeFriend(
        userId: string,
        friendId: string
    ) {

        await this.FriendRepository.Delete_One({
            filter: {
                userId: userId,
                friendId: friendId
            }
        });

        return {
            message: "Friend removed successfully"
        };
    }
}