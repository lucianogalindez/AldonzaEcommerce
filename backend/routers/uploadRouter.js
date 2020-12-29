import multer from 'multer'
import express from 'express'
import { isAuth } from '../utils.js';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename (req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
}); //usamos una carpeta como storage

const upload = multer({storage})

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
}) //esperamos un solo archivo que se llama 'image'

export default uploadRouter;