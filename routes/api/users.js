const express = require ("express");
const router = express.Router();
const userController = require ('../../controllers/api/userController');
const multer = require ('multer');
const path = require ('path');

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/users'));
    },
    filename: (req, file, cb) => {
        
        const newFilename = 'user' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const fileUpload = multer ({storage});

router.get('/', userController.list);

router.get('/:id',userController.detail);

//Acción de edición (a donde se envía el formulario)
router.put('/:id',fileUpload.single('profileImage'), userController.save);



module.exports = router;