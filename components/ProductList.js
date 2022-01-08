import style from '../styles/ProductList.module.css'
import {ProductCard} from "./ProductCard";

export const ProductList = ({data}) => {

    return (
        <div className={style.container}>
            <h1 className={style.title}>Products</h1>
            <p className={style.desc}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, consequatur cupiditate.
            </p>
            <div className={style.wrapper}>
                {
                    data.map(data => (
                        <ProductCard
                            key={data._id}
                                data={data}/>
                    ))
                }
            </div>
        </div>
    )
}

