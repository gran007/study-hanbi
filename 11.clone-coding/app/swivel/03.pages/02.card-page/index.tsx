'use client';

import style from './style.module.css';
import { Animated, SVG } from '@/app/swivel/05.components';

const gridData = [
    0, 1, 0, 0, 1, 0, 1, 0,
    1, 0, 0, 1, 0, 1, 0, 0,
    0, 1, 1, 0, 0, 1, 0, 1,
    1, 0, 1, 0, 0, 1, 0, 0,
    0, 0, 1, 1, 0, 1, 0, 1,
    0, 1, 0, 0, 1, 0, 1, 0,
    1, 0, 0, 1, 0, 1, 0, 0,
    0, 1, 1, 0, 0, 1, 0, 1,
]

const Card = () => {
    return (
        <div className={style.cardContainer}>
            <div className={style.card}>
                <div className={style.card1}>
                    <div className={style.card2}>
                        <div className={style.cardSurface}>
                            <div className={style.cardInner}>
                                <div className={style.cardView}>
                                    <div className={style.cardImg}>
                                        <SVG className={style.imgSvg}
                                            d={'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'} />
                                    </div>
                                    <h2 className={style.company}>SWIVEL</h2>
                                </div>
                                <div className={style.cardView}>
                                    <h1 className={style.name}>홍길동</h1>
                                    <p className={style.rank}>Senior Product Designer</p>
                                    <div className={style.contact}>
                                        <div className={style.contactDetail}>
                                            <svg className={style.smallImg} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                                                    d={'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'} />
                                            </svg>
                                            <span className={style.contactText}>hong@company.com</span>
                                        </div>
                                        <div className={style.contactDetail}>
                                            <svg className={style.smallImg} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                                                    d={'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'} />
                                            </svg>
                                            <span className={style.contactText}>+82 10-1234-5678</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${style.cardSurface} ${style.cardBack}`}>
                            <div className={style.cardBackInner}>
                                <div className={style.cardBackView}>
                                    <div className={style.qrCode}>
                                        <div className={style.qrGridContainer}>
                                            <div className={style.qrGrid}>
                                                {gridData.map((value, index) => (
                                                    <div key={index} className={`${style.qrItem} ${value ? '' : style.black}`} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className={style.instruction}>QR 코드로 연락처 저장</p>
                                    <p className={style.recommend}>QR 코드로 연락처 저장</p>
                                </div>
                                <div className={style.cardView}>
                                    <p className={style.homepageAddress}>www.company.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CardPage = () => {
    return (
        <Animated className={style.show}>
            <section className={style.cardSection}>
                <div className={style.cardPage}>
                    <div className={style.titleSection}>
                        <h2 className={style.title}>명함을 클릭해보세요</h2>
                        <p className={style.desc}>
                            실제 명함처럼 앞뒤로 뒤집어지는 애니메이션을 체험해보세요.
                            <br className={style.descBlock} />
                            QR 코드와 연락처 정보가 포함된 디지털 명함을 만들 수 있습니다.</p>
                    </div>
                    <Card />
                    <div className={style.moreInfo}>
                        <p className={style.tip}>💡 명함을 클릭하면 뒤집어집니다</p>
                        <div>
                            <a className={style.scrollButton}>
                                <svg className={style.scrollButtonSvg} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                                나만의 명함 만들기
                            </a>
                        </div>
                    </div>
                </div>
            </section >
        </Animated>
    )
}

export default CardPage;