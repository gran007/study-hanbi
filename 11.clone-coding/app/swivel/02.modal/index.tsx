'use client';

import style from './style.module.css'
import { useState } from 'react';

type LanguageType = {
    icon: string,
    name: string,
}

const language: LanguageType[] = [
    { icon: "🇺🇸", name: "English" },
    { icon: "🇰🇷", name: "한국어" },
    { icon: "🇯🇵", name: "日本語" },
]

interface modalShowType {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({ show, setShow }: modalShowType) {
    const [languageIndex, setLanguageIndex] = useState<number>(1);

    const onClickLanguageButton = (index: number) => {
        setLanguageIndex(index);
        setShow(false);
    }
    return (
        <>
            <div onClick={() => setShow(false)}
                className={`${style.blurBackground} ${show ? style.show : ''}`} />
            <div className={`${style.modal}  ${show ? style.show : ''}`}>
                <div className={style.modalInner}>
                    <div className={style.topBar}></div>
                    <h3 className={style.modalText}>언어 선택</h3>
                    <div>
                        {
                            language.map(({ icon, name }, index) => (
                                <button
                                    onClick={() => onClickLanguageButton(index)}
                                    key={index}
                                    className={`${style.modalButton} ` +
                                        ` ${show ? style.show : ''}` +
                                        ` ${languageIndex === index ? style.selected : ''}`}>
                                    <span className={style.icon}>{icon}</span>
                                    <span className={style.modalButtonText}>{name}</span>
                                    <div className={style.rightCircle}></div>
                                </button>
                            ))
                        }
                    </div>
                    <button onClick={() => setShow(false)}
                        className={
                            `${style.cancelButton} ` +
                            ` ${show ? style.show : ''}`}>취소</button>
                </div>
            </div>
        </>
    )
}