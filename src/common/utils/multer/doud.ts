import multer from "multer"
import { tmpdir } from "os"
import { Multer_Storage } from "../../enums/multer.enums"


export const Upload_File = ({ Storage_Key = Multer_Storage.memoryStorage }: {
    Storage_Key: Multer_Storage
}) => {


    // const storage =multer.memoryStorage()
    const storage = Storage_Key == Multer_Storage.memoryStorage ? multer.memoryStorage() : multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, tmpdir())
        },

        filename: function (req, file, cb) {
            let fileName = Date.now() + "_" + file.originalname
            cb(null, fileName)
        }
    })





    return multer({storage })
}