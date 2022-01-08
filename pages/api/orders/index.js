import dbConnect from "../../../utils/mongo";
import Order from "../../../models/Order";

const handler = async (req, res) => {
    const {method} = req

    if(method === 'GET') {
        try {
            const orders = await Order.find()
            res.status(201).json(orders)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    if(method === 'POST') {
        try {
            const order = await Order.create(req.body)
            res.status(201).json(order)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default handler