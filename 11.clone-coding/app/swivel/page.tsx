'use client';

import style from './style.module.css';
import Header from './01.header';
import Modal from './02.modal';
import { FirstPage, CardPage, NoticePage, SalesPage, WhyPage } from './03.pages';
import { useState, useEffect } from 'react';

export default function Swivel() {

    const [showModal, setShowModal] = useState<boolean>(false);
    
    useEffect(() => {
        window.history.scrollRestoration = 'manual';
    }, []);

    return (
        <div className={style.body}>
            <Header onClickLanguageButton={() => setShowModal(true)} />
            <FirstPage />
            <CardPage />
            <NoticePage />
            <SalesPage />
            <WhyPage />
        </div>
    );
}
