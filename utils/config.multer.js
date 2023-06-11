const multer = require('multer')
const uuid = require('uuid')

const config = (folder) => {
    console.log("config");

    return storage = multer.diskStorage({
        
        destination : ( req, file, callback ) => {
            console.log("storage: destination");
            callback( null, `public/images/${folder}`)
        },
        filename : ( req, file, callback ) => {

            console.log("multer file : ", file);
            const name = uuid.v4()

            const ext = file.originalname.split('.').at(-1)

            callback( null, name + '.' + ext )
        }
    })

}
module.exports = config