import style from './style.module.css'
import type { PropsWithChildren, ReactElement } from "react";
import { useEffect, createRef } from 'react';

interface ModalType {
    show: boolean;
    setShow: Function;
}

export default function Modal({ children, show, setShow }: PropsWithChildren<ModalType>) {

    const modalRef = createRef<HTMLDivElement>();

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as HTMLElement)) {
            setShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [show]);

    return (
        <div className={`${style.modalBackground} ${show && style.show}`}>
            <div ref={modalRef}>
                {children}
            </div>
        </div>
    )
}