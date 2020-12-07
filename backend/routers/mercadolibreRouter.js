import mercadopago from 'mercadopago'
import express from 'express'
import expressAsyncHandler from 'express-async-handler'

mercadopago.configure({
    access_token: 'TEST-959807999894080-090620-44560d8f0723d4a8d1895a07ceb383db-2875546'
})

const mercadolibreRouter = express.Router()

mercadolibreRouter.post('/', expressAsyncHandler(async(req, res) => {
    let preference = {
        items: [
            {
                title: req.body.name,
                unit_price: req.body.price,
                quantity: req.body.qty
            },
        ]
    } 
    const link = await mercadopago.preferences.create(preference)
    res.send(link.body.init_point)
}))

export default mercadolibreRouter;

