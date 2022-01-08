import style from '../styles/ProductCard.module.css'
import Image from 'next/image'
import Link from 'next/link'

export const ProductCard = ({data}) => {
    return (
        <div className={style.container}>
            <Link href={`/product/${data._id}`} passHref>
                <div style={{cursor: 'pointer'}}>
                    <Image src={data.img} width='500' height='500' />
                </div>
            </Link>
            <h1 className={style.title}>{data.title}</h1>
            <span className={style.price}>${data.prices[0]}</span>
            <p className={style.desc}>
                {data.desc}
            </p>
        </div>
    )
}