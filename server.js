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

const __dirname = path.resolve();
console.log(__dirname)

dotenv.config(); //necesario

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true})) //estas dos lineas son importantes para que las peticiones post se hagan en el formato correcto

//app.use(express.static('../frontend/build'))

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

/*app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})*/

app.use('/api/users', userRouter);

app.use('/api/products', productRouter);

app.use('/api/mercadolibre', mercadolibreRouter)

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