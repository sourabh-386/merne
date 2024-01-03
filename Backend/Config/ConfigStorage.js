const path = require('path')
const multer = require('multer')

const destinationPath = path.join(__dirname, '../', 'Files')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, destinationPath)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '_' + file.originalname);
    }
})

exports.upload = multer({ storage }).array('file', 5);

