import style from '../../styles/Product.module.css'
import Image from 'next/image'
import {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {addProduct} from "../../rtk/cartSlice";

const Product = ({pizza}) => {
    const [price, setPrice] = useState(pizza.prices[0])
    const [size, setSize] = useState(0)
    const [extras, setExtras] = useState([])
    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()

    const changePrice = (number) => {
        setPrice(price + number);
    };

    const handleSize = (sizeIndex) => {
        const difference = pizza.prices[sizeIndex] - pizza.prices[size];//0
        setSize(sizeIndex);//0
        changePrice(difference);//0
    };

    const handleChange = (event, option) => {
        const checked = event.target.checked;

        if (checked) {
            changePrice(option.price);
            setExtras(prev => [...prev, option])
        } else {
            changePrice(-option.price);
            setExtras(prev => prev.filter(extra => extra._id !== option._id))
        }
    };

    const handleClick = () => {
        dispatch(addProduct({...pizza, extras, price, quantity}))
    }

    return (
        <div className={style.container}>
            <div className={style.left}>
                <div className={style.imgContainer}>
                    <Image src={pizza.img} objectFit='contain' layout='fill' />
                </div>
            </div>
            <div className={style.right}>
                <h1 className={style.title}>{pizza.title}</h1>
                <span className={style.price}>${price}</span>
                <p className={style.desc}>{pizza.desc}</p>
                <h3 className={style.choose}>Choose the Pizza-Size</h3>
                <div className={style.sizes}>
                    <div className={style.size} onClick={() => handleSize(0)}>
                        <Image src='/img/size.png' layout='fill' />
                        <span className={style.number}>Small</span>
                    </div>
                    <div className={style.size} onClick={() => handleSize(1)}>
                        <Image src='/img/size.png' layout='fill' />
                        <span className={style.number}>Medium</span>
                    </div>
                    <div className={style.size} onClick={() => handleSize(2)}>
                        <Image src='/img/size.png' layout='fill' />
                        <span className={style.number}>Large</span>
                    </div>
                </div>
                <h3 className={style.choose}>Choose additional ingredients</h3>
                <div className={style.ingrs}>
                    {
                        pizza.extraOptions.map((option) => (
                            <div className={style.option} key={option._id}>
                                <input
                                    type="checkbox"
                                    id={option.text}
                                    name={option.text}
                                    className={style.checkbox}
                                    onChange={(e) => handleChange(e, option)}
                                />
                                <label htmlFor="double">{option.text}</label>
                            </div>
                        ))
                    }
                </div>
                <div className={style.add}>
                    <input onChange={e => setQuantity(e.target.value)} type='number' defaultValue={1} className={style.quantity} />
                    <button onClick={handleClick} className={style.btn}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Product

export const getServerSideProps = async ({params}) => {

    const res = await axios.get(`http://localhost:3000/api/products/${params.id}`)

    return {
        props: {
            pizza: res.data
        }
    }
}