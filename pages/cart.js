import styles from '../styles/Cart.module.css'
import Image from 'next/image'
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from "axios";
import {useRouter} from "next/router";
import {reset} from "../rtk/cartSlice";
import {OrderDetail} from "../components/OrderDetail";

const Cart = () => {
    const {products, total} = useSelector(state => state.cartReducer)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [cash, setCash] = useState(false)
    const amount = total;
    const currency = "USD";
    const style = {"layout":"vertical"};
    const router = useRouter()

    const createOrder = async data => {
        try {
            const res = await axios.post('http://localhost:3000/api/orders', data)

            res.status === 201 && router.push(`/orders/${res.data._id}`);

            dispatch(reset())
        } catch (e) {
            console.log(e)
        }
    }


    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);


        return (<>
                { (showSpinner && isPending) && <div className="spinner" /> }
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[amount, currency, style]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the order
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function (det) {
                            const shipping = det.purchase_units[0].shipping
                            createOrder({
                                customer: shipping.name.full_name,
                                address: shipping.address.address_line_1,
                                total,
                                method: 1
                            })
                        });
                    }}
                />
            </>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Extras</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </tbody>
                    {
                        products.map(product => (

                            <tr className={styles.tr} key={product._id}>
                                <td>
                                    <div className={styles.imgContainer}>
                                        <Image
                                            src={product.img}
                                            layout='fill'
                                            objectFit='cover' />
                                    </div>
                                </td>
                                <td>
                            <span className={styles.name}>
                                {product.title}
                            </span>
                                </td>
                                <td>
                            <span className={styles.extras}>
                                {
                                    product.extras.map(extra => (
                                        <span
                                            key={extra._id}
                                        >{extra.text}</span>
                                    ))
                                }
                            </span>
                                </td>
                                <td>
                            <span className={styles.price}>
                                ${product.price}
                            </span>
                                </td>
                                <td>
                            <span className={styles.quantity}>
                                {product.quantity}
                            </span>
                                </td>
                                <td>
                            <span className={styles.total}>
                                ${product.price * product.quantity}
                            </span>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>CART TOTAL</h2>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>
                            Subtotal:
                        </b>
                        ${total}
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>
                            Discount:
                        </b>
                        $0.00
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>
                            Total:
                        </b>
                        ${total}
                    </div>
                    {
                        open ? (
                            <div style={{ maxWidth: "750px", minHeight: "200px", marginTop: 10 }}>
                                <button onClick={() => setCash(true)} style={{
                                    width: '100%',
                                    height: 50,
                                    marginBottom: 15,
                                    background: '#d1411e',
                                    border: 0,
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    borderRadius: 5,
                                    cursor: 'pointer'
                                }}>
                                    CASH ON DELIVERY</button>
                                <PayPalScriptProvider
                                    options={{
                                        "client-id": "ASxUjH91cgfDywc1of5ONApu5PNiiqryVyg3ebkYua2Kt7RvundHMWaGkJQ-Sc29D4odvza7-kejknbR",
                                        components: "buttons",
                                        currency: "USD"
                                    }}
                                >
                                    <ButtonWrapper
                                        currency={currency}
                                        showSpinner={false}
                                    />
                                </PayPalScriptProvider>
                            </div>
                        ) :  <button onClick={() => setOpen(true)} className={styles.btn}>
                                CHECKOUT NOW!
                            </button>
                    }
                </div>
            </div>
            {cash && (
                <OrderDetail total={total} createOrder={createOrder}/>
            )}
        </div>
    )
}

export default Cart