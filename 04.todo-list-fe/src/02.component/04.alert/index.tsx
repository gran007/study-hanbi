import style from './style.module.css'
import { useEffect, createRef } from 'react';
import { alertStore } from '@/04.store';
import type { ButtonType } from '@/04.store';

export default function Alert() {

    const { show, title, body, buttons, close } = alertStore();
    
    const modalRef = createRef<HTMLDivElement>();
    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as HTMLElement)) {
            close();
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
            <div className={style.alert} ref={modalRef}>
                <div className={style.title}>{title}</div>
                <div className={style.body}>{body}</div>
                <div className={style.buttonGroup}>
                    {buttons?.map((item: ButtonType) => (
                        <div onClick={()=>item.onClick()} className={style.button}>{item.name}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}