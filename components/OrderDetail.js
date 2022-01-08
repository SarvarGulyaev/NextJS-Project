import style from '../styles/OrderDetail.module.css'
import {useState} from "react";

export const OrderDetail = ({total, createOrder}) => {

    const [customer, setCustomer] = useState('')
    const [address, setAddress] = useState('')

    const handleClick = () => {
        createOrder({
            customer, address, total, method: 0
        })
    }


    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                 <h1 className={style.title}>
                     You will pay ${total} after delivery.
                 </h1>
                <div className={style.item}>
                    <label>Name SurName</label>
                    <input
                        onChange={e => setCustomer(e.target.value)}
                        placeholder='John Doe'
                        type="text"
                        className={style.input}/>
                </div>
                <div className={style.item}>
                    <label>Phone Number</label>
                    <input
                        placeholder='+91 312 312'
                        type="text"
                        className={style.input}/>
                </div>
                <div className={style.item}>
                    <label>Address</label>
                    <input
                        onChange={e => setAddress(e.target.value)}
                        placeholder='Elton 5.et'
                        type="text"
                        className={style.input}/>
                </div>
                <button className={style.btn} onClick={handleClick}>
                    Order
                </button>
            </div>
        </div>
    )
}