'use client';

import style from './style.module.css';
import Header from './01.header';
import Modal from './02.modal';
import { FirstPage, CardPage } from './03.pages';
import { useState } from 'react';

export default function Swivel() {

    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <div className={style.body}>
            <Header onClickLanguageButton={() => setShowModal(true)} />
            <Modal show={showModal} setShow={setShowModal} />
            <FirstPage />
            <CardPage />
        </div>
    );
}
