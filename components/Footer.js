import style from '../styles/Footer.module.css'
import Image from 'next/image'

const Footer = () => {

    return (
        <div className={style.container}>
            <div className={style.item}>
                <Image src='/img/bg.png' objectFit='cover' layout='fill' />
            </div>
            <div className={style.item}>
                <div className={style.card}>
                    <h2 className={style.motto}>
                        OH YES, WE DID. THE LAMA PIZZA, WELL BAKED SLICE OF PIZZA
                    </h2>
                </div>
                <div className={style.card}>
                    <h1 className={style.title}>
                        FIND OUR RESTAURANTS
                    </h1>
                    <p className={style.text}>
                        1654 R. Don Road #304.
                        <br /> NEW YORK, 85022
                        <br /> (602) 867-1010
                    </p>
                    <p className={style.text}>
                        1654 R. Don Road #304.
                        <br /> NEW YORK, 85022
                        <br /> (602) 867-1010
                    </p>
                    <p className={style.text}>
                        1654 K.RAQUIRE #312.
                        <br /> LONDON, 83133
                        <br /> (101) 322-9414
                    </p>
                    <p className={style.text}>
                        1654 M. SARVAR GULYAEV #011.
                        <br /> MOSCOW, 19844
                        <br /> (911) 111-1111
                    </p>
                </div>
                <div className={style.card}>
                    <h1 className={style.title}>WORKING HOURS</h1>
                    <p className={style.text}>
                        MONDAY UNTIL FRIDAY
                        <br /> 9:00 - 22:00
                    </p>
                    <p className={style.text}>
                        SATURDAY - SUNDAY
                        <br /> 12:00 - 24:00
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer