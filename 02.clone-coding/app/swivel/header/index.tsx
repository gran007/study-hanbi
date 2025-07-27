'use client';

import { useEffect, useState } from 'react';
import style from './style.module.css';
import { MouseEvent } from 'react';

interface ButtonProps {
    onClickLanguageButton: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function Header({ onClickLanguageButton }: ButtonProps) {
    
    const [headerClassName, setHeaderClassName] = useState(style.header);
    
    useEffect(()=> {
        setHeaderClassName(`${style.header} ${style.show}`);
    }, []);

    return (
        <header className={headerClassName}>
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
                        <svg className={style.buttonSvg}
                            fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path 
                                strokeLinecap='round' 
                                strokeLinejoin='round' 
                                strokeWidth={2}
                                d='M19 9l-7 7-7-7'
                                />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}