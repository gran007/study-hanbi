import style from './style.module.css'
import { useEffect, createRef } from 'react';
import { alertStore } from '@/04.store';
import type { ButtonType } from '@/04.store';
import ClickCancel from '../02.click-cancel';

export default function Alert() {

    const { show, title, body, buttons, close } = alertStore();
    
    return (
        <div className={`${style.modalBackground} ${show && style.show}`}>
            <ClickCancel setCancel={()=>close()} className={style.alert}>
                <div className={style.title}>{title}</div>
                <div className={style.body}>{body}</div>
                <div className={style.buttonGroup}>
                    {buttons?.map((item: ButtonType) => (
                        <div onClick={() => item.onClick()} className={`${style.button} ${item.isCancel && style.cancel}`}>{item.name}</div>
                    ))}
                </div>
            </ClickCancel>
        </div>
    )
}