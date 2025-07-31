'use client';

import style from './style.module.css';
import { MouseEvent } from 'react';
import { Animated, SVG } from '@/app/swivel/05.components';

interface ButtonProps {
    onClickLanguageButton: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function Header({ onClickLanguageButton }: ButtonProps) {

    return (
        <Animated className={style.show}>
            <header className={style.header}>
                <div className={style.headerContainer}>
                    <div className={style.headerContents}>
                        <button className={style.headerLeftButton}>
                            <img src="logo.webp" alt="Logo" loading='lazy'
                                width={32} height={32} className={style.logoImg} />
                            <span className={style.logoText}>Swivel</span>
                        </button>
                        <button
                            onClick={onClickLanguageButton}
                            className={`${style.rightButton} group`}>
                            <span className={style.buttonIcon}>🇰🇷</span>
                            <span className={style.buttonText}>한국어</span>
                            <SVG className={style.buttonSvg} d={'M19 9l-7 7-7-7'} />
                        </button>
                    </div>
                </div>
            </header>
        </Animated>
    )
}