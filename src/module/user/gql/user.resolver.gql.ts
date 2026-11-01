import { GenderEnums, ProviderEnums, RoleEnums } from "../../../common";
import { userService } from "../user.service";

class UserSolver {
    constructor() { }


    helloworledQuery(parent: any, args: any) {
        let { name, email, password } = args
        return {
            message: `my name ${name} , my email is ${email} and pass ${password};`
        }
    }
///////////////////////////////////////////////////////////////////////////////////////////////
getUser = async (parent: any, args: any, context: any) => {

    const user = await userService.Get_User(args.id);

    return user;

}
///////////////////////////////////////////////////////////////////////////////////////////////

    helloworledMutation(parent: any, args: any) {
        const { name, email, password } = args;

        return {
            message: `my name ${name}, my email is ${email} and pass ${password}`
        };
    }


///////////////////////////////////////////////////////////////////////////////////////////////



}

export const userSolver = new UserSolver