import {
    GenderEnums,
    ProviderEnums,
    RoleEnums
} from "../enums/user.enums";

export interface IUser {
    UserName: string;

    FirstName?: string;
    LastName?: string;

    Email: string;
    PhoneNumber: string;
    Password: string;
    confirmPassword: string;

    Gender?: GenderEnums;
    Provider?: ProviderEnums;
    Role?: RoleEnums;
    ConfirmEmail?: boolean;
    profilePicture?: string[];
}