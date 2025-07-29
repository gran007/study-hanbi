'use client';

import style from './style.module.css';

const CardPage = () => {
    return (
        <section className={style.cardSection}>
            <div className={style.cardPage}>
                <div className={style.titleSection}>
                    <h2 className={style.title}>명함을 클릭해보세요</h2>
                    <p className={style.desc}>
                        실제 명함처럼 앞뒤로 뒤집어지는 애니메이션을 체험해보세요.
                        <br className={style.descBlock} />
                        QR 코드와 연락처 정보가 포함된 디지털 명함을 만들 수 있습니다.</p>
                </div>
                <div className={style.cardContainer}>
                    <div className={style.card}>
                        <div className={style.card1}>
                            <div className={style.card2}>
                                <div className={style.card3}>
                                    <div className={style.cardInner}>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default CardPage;