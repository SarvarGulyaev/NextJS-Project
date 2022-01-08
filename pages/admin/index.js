import style from '../../styles/Admin.module.css'
import Image from 'next/image'
import axios from "axios";
import {useState} from "react";

const Admin = ({orders, products}) => {
    const [productsList, setProductsList] = useState(products)
    const [ordersList, setOrdersList] = useState(orders)
    const status = ['preparing', 'on the way', 'delivered']

    const handleDelete = async id => {
        try {
            const res = await axios.delete(
                `http://localhost:3000/api/products/${id}`
            )
            setProductsList(productsList.filter(prod => prod._id !== id))
        } catch (e) {
            console.log(e)
        }
    }

    const handleStatus = async id => {

        const item = ordersList.filter(order => order._id === id)[0]
        const currentStatus = item.status

        try {
            const res = await axios.put(`http://localhost:3000/api/orders/${id}`, {
                status: currentStatus + 1
            })
            setOrdersList([
                res.data,
                ...ordersList.filter(order => order._id !== id),
            ])
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={style.container}>
            <div className={style.item}>
                <h1 className={style.title}>Products</h1>
                <table className={style.table}>
                    <tbody>
                        <tr className={style.trTitle}>
                            <th>Image</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </tbody>
                    {
                        productsList.map(product => (
                            <tbody key={product._id}>
                            <tr className={style.trTitle}>
                                <td>
                                    <Image
                                        src={product.img}
                                        width={50}
                                        height={50}
                                        objectFit='cover'
                                    />
                                </td>
                                <td>{product._id.slice(0, 5)}...</td>
                                <td>{product.title}</td>
                                <td>{product.prices[0]}</td>
                                <td>
                                    <button className={style.btn}>Edit</button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className={style.btn}
                                    >Delete</button>
                                </td>
                            </tr>
                            </tbody>
                        ))
                    }
                </table>
            </div>
            <div className={style.item}>
                <h1 className={style.title}>Orders</h1>
                <table className={style.table}>
                    <tbody>
                    <tr className={style.trTitle}>
                        <th>Id</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </tbody>
                    {

                        ordersList.map(order => (
                            <tbody key={order._id}>
                            <tr className={style.trTitle}>
                                <td>
                                    {order._id.slice(0, 5)}...
                                </td>
                                <td>{order.customer}</td>
                                <td>${order.total}</td>
                                <td>{order.method === 0 ? (
                                    <span>Cash</span>
                                ) : (
                                    <span>Paid</span>
                                )}</td>
                                <td>{status[order.status]}</td>
                                <td>
                                    <button
                                        onClick={() => handleStatus(order._id)}
                                    >Next Stage</button>
                                </td>
                            </tr>
                            </tbody>
                        ))
                    }
                </table>
            </div>
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || ''

    if(myCookie.token !== process.env.TOKEN) {
        return {
            redirect: {
                destination: '/admin/login',//Редирект на страницу
                permanent: false//В какой вкладке откроется страница.
            }
        }
    }

    const productsRes = await axios.get('http://localhost:3000/api/products')
    const ordersRes = await axios.get('http://localhost:3000/api/orders')

    return {
        props: {
            orders: ordersRes.data,
            products: productsRes.data,
        }
    }
}

export default Admin