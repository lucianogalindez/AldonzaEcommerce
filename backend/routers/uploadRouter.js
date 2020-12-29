import multer from 'multer'
import express from 'express'
import { isAuth } from '../utils.js';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination (req, file, cb) {
        cb(null, 'frontend/public/images')
    },
    filename (req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
}); //usamos una carpeta como storage

const upload = multer({storage})

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
    res.send(`/images/${req.file.filename}`)
}) //esperamos un solo archivo que se llama 'image'

export default uploadRouter;