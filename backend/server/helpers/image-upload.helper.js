const multer = require('multer');

/**
 * Image upload configurations
 */
const imageOptions = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
});
const imageUp = multer({ storage: imageOptions }).single('image');
exports.imageUpload = (req, res) => {    
    return new Promise((resolve, reject) => {
        imageUp(req, res, function (err) {
            if (err)
                reject(err);
            else {
                req.body.image = req.file ? req.file['filename'] : "";
                resolve();
            }
        });
    });
}