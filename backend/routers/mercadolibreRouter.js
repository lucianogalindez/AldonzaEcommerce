import mercadopago from 'mercadopago'
import express from 'express'
import expressAsyncHandler from 'express-async-handler'

mercadopago.configure({
    access_token: process.env.MERCADOPAGO_CLIENT_TOKEN
})

const mercadolibreRouter = express.Router()

mercadolibreRouter.post('/', expressAsyncHandler(async(req, res) => {
    const baseURL = 'https://aldonza.herokuapp.com/'
    let preference = {
        items: [
            { 
                title: req.body.name,
                quantity: req.body.qty,
                currency_id: 'ARS',
                unit_price: req.body.price 
            },
        ],
        back_urls: {
            success: `${baseURL}/order/mercadopago/${req.body.orderId}/success`,
            pending: `${baseURL}/order/mercadopago/${req.body.orderId}/pending`
        },
        auto_return: 'approved'
    } 
    await mercadopago.preferences.create(preference)
        .then(response => {
            global.init_point = response.body.init_point;
        }).catch(function(error){
            console.log(error)
        })

    res.send(global.init_point)
}))

export default mercadolibreRouter;

