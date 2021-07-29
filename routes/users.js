const express = require ("express");
const router = express.Router();
const userController = require ('../controllers/userController');
const multer = require ('multer');

const storage = multer.diskStorage ({
    destination: function (req, file, cb){
        cb(null, './public/images/users');
    },
    fileName: function (req, file, cb){
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`)
    }
})

const fileUpload = multer ({storage});


router.get('/:id',userController.detail);

//Acción de edición (a donde se envía el formulario)
router.put('/:id',fileUpload.single('profileImage'), userController.save);



module.exports = router;