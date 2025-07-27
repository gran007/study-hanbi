'use client';

import style from './style.module.css';
import Header from './header';
import Modal from './modal';
import { useState, useEffect } from 'react';

const Video = () => {
    return (

        <div className={style.videoContainer}>
            <video
                autoPlay
                muted
                loop
                playsInline
                preload='auto'
                className={style.video} src="/landing_video.mp4" />
        </div>
    )
}

const GoogleIcon = () => {
    return (
        <svg className={style.svg} viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    )
}

export default function Swivel() {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        setShow(true);
    }, []);

    return (
        <div className={style.body}>
            <Header onClickLanguageButton={() => setShowModal(true)} />
            <Modal show={showModal} setShow={setShowModal} />
            <section className={style.section}>
                <Video />
                <div className={style.topPage}>
                    <div className={style.textCenter}>
                        <div className={`${style.title} ${show ? style.show : ''}`}>
                            <h1 className={`${style.titleTop} ${show ? style.show : ''}`}>멋진 디지털 명함을
                                <span className={`${style.titleBottom} ${show ? style.show : ''}`}>만들어보세요</span>
                            </h1>
                            <div className={`${style.desc} ${show ? style.show : ''}`}>
                                <p className={style.descText}>
                                    기존 명함을 아름다운 플립 애니메이션, QR 코드, 간편한 공유 기능이 있는 인터랙티브 디지털 경험으로 변환하세요.
                                </p>
                            </div>
                        </div>
                        <div className={`${style.buttonContainer} ${show ? style.show : ''}`}>
                            <div className={`${style.loginBox} ${show ? style.show : ''}`}>
                                <div className={style.buttonGroup}>
                                    <div className={style.buttonBorder}>
                                        <button className={style.button}>
                                            <GoogleIcon />
                                            Google로 로그인
                                        </button>
                                    </div>
                                    <p className={style.loginDesc}>시작하려면 로그인하세요</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
