import multer from 'multer'
import express from 'express'
import { isAuth } from '../utils.js';
import path from 'path'

const uploadRouter = express.Router();
const __dirname = path.resolve();

const path_file = path.join(__dirname, 'frontend', 'public', 'images')

const storage = multer.diskStorage({
    destination (req, file, cb) {
        cb(null, path_file)
    },
    filename (req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
}); //usamos una carpeta como storage

const upload = multer({storage})

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
    console.log(path_file)
    console.log('hola')
    res.send(path_file)
}) //esperamos un solo archivo que se llama 'image'

export default uploadRouter;