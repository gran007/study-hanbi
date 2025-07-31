import style from './style.module.css'
import { Animated, SVG } from '@/app/swivel/05.components';


const MeritPage = () => {
    return (
        <Animated className={style.show}>
            <div className={style.section}>
                <div className={style.pageBody}>
                    <div className={style.titleSection}>
                        <h2 className={style.title}>
                            왜 디지털 명함인가요?
                        </h2>
                    </div>
                </div>
            </div>
        </Animated>
    )
}

export default MeritPage;