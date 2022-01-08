import style from '../../styles/Orders.module.css'
import Image from 'next/image'
import axios from "axios";

const Orders = ({data}) => {
    console.log(data)

    const status = data.status

    const statusClass = index => {
        if(index - status < 1) return style.done
        if(index - status === 1) return style.inProgress
        if(index - status > 1) return style.undone
    }

    return (
        <div className={style.container}>
            <div className={style.left}>
                <div className={style.row}>
                    <table className={style.table}>
                        <tr className={style.trTitle}>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Address</th>
                            <th>Total</th>
                        </tr>
                        <tr className={style.tr}>
                            <td>
                            <span className={style.id}>
                                {data._id}
                            </span>
                            </td>
                            <td>
                            <span className={style.name}>
                                {data.customer}
                            </span>
                            </td>
                            <td>
                            <span className={style.address}>
                                {data.address}
                            </span>
                            </td>
                            <td>
                            <span className={style.total}>
                                ${data.total}
                            </span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className={style.row}>
                    <div className={statusClass(0)}>
                        <Image src='/img/paid.png' width={30} height={30} />
                        <span>Payment</span>
                        <div className={style.checkedIcon}>
                            <Image className={style.checkedIcon} src='/img/checked.png' width={20} height={20} />
                        </div>
                    </div>
                    <div className={statusClass(1)}>
                        <Image src='/img/bake.png' width={30} height={30} />
                        <span>Preparing</span>
                        <div className={style.checkedIcon}>
                            <Image className={style.checkedIcon} src='/img/checked.png' width={20} height={20} />
                        </div>
                    </div>
                    <div className={statusClass(2)}>
                        <Image src='/img/bike.png' width={30} height={30} />
                        <span>On the Way</span>
                        <div className={style.checkedIcon}>
                            <Image className={style.checkedIcon} src='/img/checked.png' width={20} height={20} />
                        </div>
                    </div>
                    <div className={statusClass(3)}>
                        <Image src='/img/delivered.png' width={30} height={30} />
                        <span>Delivered</span>
                        <div className={style.checkedIcon}>
                            <Image className={style.checkedIcon} src='/img/checked.png' width={20} height={20} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.right}>
                <div className={style.wrapper}>
                    <h2 className={style.title}>CART TOTAL</h2>
                    <div className={style.totalText}>
                        <b className={style.totalTextTitle}>
                            Subtotal:
                        </b>
                        $79.90
                    </div>
                    <div className={style.totalText}>
                        <b className={style.totalTextTitle}>
                            Discount:
                        </b>
                        $0.00
                    </div>
                    <div className={style.totalText}>
                        <b className={style.totalTextTitle}>
                            Total:
                        </b>
                        $79.90
                    </div>
                    <button disabled className={style.btn}>
                        PAID
                    </button>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`)

    return {
        props: {
            data: res.data
        }
    }
}

export default Orders

