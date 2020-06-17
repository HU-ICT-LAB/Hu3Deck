module.exports = function diskStorage(multer) {
    return multer.diskStorage({
        destination: (req, file, callBack) => {
            //file upload destination
            if(file.mimetype == 'image/jpeg'){
                callBack(null, process.env.BACKGROUND_STORAGE);
            }
            else if(file.mimetype == 'audio/mpeg'){
                callBack(null, process.env.AUDIO_STORAGE);
            }
            else if(file.mimetype == 'model/gltf-binary'){
                callBack(null, process.env.MODEL_STORAGE)
            }
    
        },
        //filename on upload
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    });
}

