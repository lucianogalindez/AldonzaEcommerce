import express from 'express'
import mongoose from 'mongoose'
import userRouter from './backend/routers/userRouter.js'
import productRouter from './backend/routers/productRouter.js';
import dotenv from 'dotenv'
import mercadolibreRouter from './backend/routers/mercadolibreRouter.js';
import orderRouter from './backend/routers/orderRouter.js';
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
import uploadRouter from './backend/routers/uploadRouter.js';

const __dirname = path.resolve();

dotenv.config(); //necesario

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true})) //estas dos lineas son importantes para que las peticiones post se hagan en el formato correcto

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, 'frontend/build')))

console.log(path.join(__dirname, '/uploads'))


mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/aldonza', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.get('/', (req, res) => {
    res.send('server is ready')
});

// DIRECCIONES ESTATICAS

app.get('/product/:id', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})

app.get('/register', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})

app.get('/cart/:id?', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})

app.get('/signin', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})

app.get('/register', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})

app.get('/payment', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})

app.get('/shipping', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})

app.get('/payment', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})

app.get('/placeorder', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})

app.get('/order/:id', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})

app.get('/orderhistory', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})

app.get('/order/mercadopago/:id/:status?', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})


// DIRECCIONES API 

app.use('/api/uploads', uploadRouter)

app.use('/api/users', userRouter);

app.use('/api/products', productRouter);

app.use('/api/mercadopago', mercadolibreRouter)

app.use('/api/orders', orderRouter)

app.use((err, req, res, next) => {
    res.status(500).send({
        message: err.message
    })
})

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`)
})

//xuN2sracac8qpoIL
//amazonaclient