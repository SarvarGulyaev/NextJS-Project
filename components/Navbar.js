import style from '../styles/Navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import {useSelector} from "react-redux";

const Navbar = () => {

    const {quantity} = useSelector(state => state.cartReducer)

    return (
        <div className={style.container}>

            <div className={style.item}>

                <div className={style.callButton}>
                    <Image src='/img/telephone.png' width='32' height='32'/>
                </div>
                <div className={style.texts}>
                    <div className={style.text}>ORDER NOW!</div>
                    <div className={style.text}>012 345 678</div>
                </div>
            </div>

            <div className={style.item}>
                <ul className={style.list}>
                    <Link href='/' passHref>
                        <li className={style.listitem}>HomePage</li>
                    </Link>
                    <li className={style.listitem}>Products</li>
                    <li className={style.listitem}>Menu</li>
                    <Image src='/img/Logo.png' alt="dadas" width='160' height='69'/>
                    <li className={style.listitem}>Events</li>
                    <li className={style.listitem}>Blog</li>
                    <li className={style.listitem}>Contact</li>
                </ul>
            </div>
            <Link href='/cart' passHref>
                <div className={style.item}>
                    <div className={style.cart}>
                        <Image src='/img/cart.png' alt="" width='30' height='30'/>
                        <div className={style.counter}>{quantity}</div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Navbar