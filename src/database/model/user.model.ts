import mongoose from "mongoose";
import {
    GenderEnums,
    IUser,
    ProviderEnums,
    RoleEnums
} from "../../common";

const UserSchema = new mongoose.Schema<IUser>(
    {
        FirstName: {
            type: String,
            required: true,
            trim: true
        },

        LastName: {
            type: String,
            required: true,
            trim: true
        },

        Email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        PhoneNumber: {
            type: String,
            trim: true
        },

        Password: {
            type: String,
            required: true,
            select: false
        },
        confirmPassword: {
            type: String,
            required: true,
            select: false
        },

        Gender: {
            type: Number,
            default: GenderEnums.Male
        },

        profilePicture: [String],

        Role: {
            type: Number,
            default: RoleEnums.User
        },

        Provider: {
            type: Number,
            default: ProviderEnums.System
        },

        ConfirmEmail: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,

        toJSON: {
            virtuals: true
        },

        toObject: {
            virtuals: true
        }
    }
);
UserSchema.virtual("UserName")
    .set(function (value: string) {

        const [FirstName, ...rest] =
            value.trim().split(/\s+/);

        if (!FirstName) {
            throw new Error("UserName is required");
        }

        this.FirstName = FirstName;
        this.LastName = rest.join(" ");

    })
    .get(function () {

        return `${this.FirstName} ${this.LastName}`;

    });



// Mongoose Middleware
UserSchema.pre("save", function () {
    console.log(
        `User ${this.Email} is about to be saved`
    );
});

UserSchema.post("save", function (doc) {
    console.log(
        `User ${doc.Email} has been saved successfully`
    );
});


const UserModel =
    mongoose.model<IUser>("user", UserSchema);

export default UserModel;