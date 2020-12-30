import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAdmin, isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const orders = await Order.find({}).populate('user', 'name') //Lo que hace populate es lo siguiente: El modelo Order tiene definido como un parametro al modelo User. Si no se utilizara populate, Order solo mostraria la propieddad _id de User. Al agregar populate hago que se muestren en el objeto Order todas las propiedades el objeto User que tiene asignado. Sin embargo en este caso se hace ('user', 'name'). Esto lo que hace es filtrar la informacion del user vinculado y mostrar solamente su propiedad name, ya que las otras propiedades en este caso no me interesan
    res.send(orders);
}))

orderRouter.post('/', isAuth , expressAsyncHandler(async(req, res) => {
    if(req.body.orderItems.length === 0) {
        res.status(400).send({
            message: 'Cart is empty'
        }) 
    } else {
            const order = new Order({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id
            })
            
            const createdOrder = await order.save();

            res.status(201).send({
                message: 'New Order Created',
                order: createdOrder
            })   
        }
    }
))

orderRouter.get('/mine', isAuth, expressAsyncHandler(async(req, res) => {
    const orders = await Order.find({user: req.user._id})
    if(orders) {
        res.send(orders)
    } else {
        res.status(404).send ({
            message: 'NO ORDERS YET'
        })
    } 
}))

orderRouter.get('/:id', /*isAuth,*/ expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user')
    if (order) {
        res.send(order)
    } else {
        res.status(404).send({
            message: 'Order Not Found'
        })
    }
}))

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true,
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.address
        };
        const updatedOrder = await order.save()
        res.send({message: 'Order Paid', order: updatedOrder})
    } else {
        res.status(404).send ({message: 'Order Not Found'})
    }
}))

orderRouter.put('/:id/pending', isAuth, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaidPending = true,
        order.paidAt = Date.now()
        /*order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.address
        };*/
        const updatedOrder = await order.save()
        res.send({message: 'Order Pending', order: updatedOrder})
    } else {
        res.status(404).send ({message: 'Order Not Found'})
    }
}))

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        const deleteOrder = await order.remove()
        res.send({message: 'Order Deleted', order: deleteOrder})
    } else {
        res.status(404).send({message: 'Order Not Found'})
    }
}))

orderRouter.put('/:id/paidPending', isAuth, isAdmin, expressAsyncHandler(async(req, res) => { //cuando el admin recibe el pago
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true,
        order.paidAt = Date.now()
        
        const updatedOrder = await order.save()
        res.send({message: 'Order Paid', order: updatedOrder})
    } else {
        res.status(404).send ({message: 'Order Not Found'})
    }
}))

orderRouter.put('/:id/deliver', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isDelivered = true,
        order.deliveredAt = Date.now()
        
        const updatedOrder = await order.save()
        res.send({message: 'Order Delivered', order: updatedOrder})
    } else {
        res.status(404).send ({message: 'Order Not Found'})
    }
}))

export default orderRouter;

