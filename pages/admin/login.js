import style from '../../styles/Login.module.css'
import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

const Login = () => {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)

    const router = useRouter()

    const handleClick = async () => {
        try {
            await axios.post('http://localhost:3000/api/login', {
                username,
                password
            })
            router.push('/admin')
        } catch (e) {
            console.log(e)
            setError(true)
        }
    }

    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <h1>Admin dashboard</h1>
                <input
                    placeholder='username'
                    className={style.input}
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    placeholder='password'
                    className={style.input}
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={handleClick}
                    className={style.btn}
                >
                    Sign In
                </button>
                {error && <span className={style.error}>
                    Wrong Credentials!
                </span>}
            </div>
        </div>
    )
}

export default Login