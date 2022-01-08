import style from '/styles/Add.module.css'
import {useState} from "react";
import axios from "axios";

const Add = ({setClose}) => {

    const [file, setFile] = useState(null)
    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)
    const [prices, setPrices] = useState([])
    const [extra, setExtra] = useState(null)
    const [extraOptions, setExtraOptions] = useState([])

    const changePrice = (e, idx) => {
        const currentPrices = prices
        currentPrices[idx] = e.target.value
        setPrices(currentPrices)
    }

    const handleExtraInput = (e) => {
        setExtra({...extra, [e.target.name]: e.target.value})
    }

    const handleExtra = (e) => {
        setExtraOptions(prev => [...prev, extra])
    }

    const handleCreate = async () => {
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "uploads")
        try {
            const uploadRes = await axios.post('http://api.cloudinary.com/v1_1/gsmuzumak1/image/upload', data)

            const {url} = uploadRes.data

            const newProduct = {
                title, desc, prices, extraOptions, img: url
            }

            await axios.post('http://localhost:3000/api/products', newProduct)
            setClose(true)

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <span
                    className={style.close}
                    onClick={() => setClose(true)}
                >
                    X
                </span>
                <h1>Add a New Pizza</h1>
                <div className={style.item}>
                    <label className={style.label}>Choose an image</label>
                    <input type="file" onChange={e => setFile(e.target.files[0])}/>
                </div>
                <div className={style.item}>
                    <label className={style.label}>Title</label>
                    <input
                        className={style.input}
                        onChange={e => setTitle(e.target.value)}
                        type="text"/>
                </div>
                <div className={style.item}>
                    <label className={style.label}>Desc</label>
                    <input
                        onChange={e => setDesc(e.target.value)}
                        type="text"/>
                </div>
                <div className={style.item}>
                    <label className={style.label}>Prices</label>
                    <div className={style.priceContainer}>
                    <input
                        className={`${style.input} ${style.inputSm}`}
                        type="number"
                        placeholder='Small'
                        onChange={e => changePrice(e, 0)}
                    />
                    <input
                        className={`${style.input} ${style.inputSm}`}
                        type="number"
                        placeholder='Medium'
                        onChange={e => changePrice(e, 1)}
                    />
                    <input
                        className={`${style.input} ${style.inputSm}`}
                        type="number"
                        placeholder='Large'
                        onChange={e => changePrice(e, 2)}
                    />
                    </div>
                </div>
                <div className={style.item}>
                    <label className={style.label}>
                        Extra
                    </label>

                    <div className={style.extra}>
                        <input
                            className={`${style.input} ${style.inputSm}`}
                            type="text"
                            placeholder="Item"
                            name="text"
                            onChange={handleExtraInput}
                        />
                        <input
                            className={`${style.input} ${style.inputSm}`}
                            type="number"
                            placeholder="Price"
                            name="price"
                            onChange={handleExtraInput}
                        />
                        <button className={style.extraButton} onClick={handleExtra}>
                            Add
                        </button>
                    </div>
                    <div className={style.extraItems}>
                        {
                            extraOptions.map(option => (
                                <span key={option.text} className={style.extraItem}>{option.text}</span>
                            ))
                        }
                    </div>
                </div>
                <button className={style.addBtn} onClick={handleCreate}>Create</button>
            </div>
        </div>
    );
};

export default Add;
