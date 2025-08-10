import style from './style.module.css'
import { useState, createRef, useEffect } from "react";
import { MoreVert } from '../01.icons';

interface clickEvent {
    onUpdateEvent: Function;
    onDeleteEvent: Function;
}

export default function ButtonModal({ onUpdateEvent, onDeleteEvent }: clickEvent) {

    const [show, setShow] = useState<Boolean>(false);
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
        <div>
            <div onClick={() => setShow(true)} className={style.moreButton}>
                <MoreVert />
            </div>
            <div ref={modalRef}
                style={{ transform: `translate(-100px, ${16 - window.scrollY}px)` }}
                className={`${style.settingModal} ${show && style.show}`}>
                <div onClick={() => {
                    onUpdateEvent();
                    setShow(false);
                }} className={style.button}>프로젝트 수정</div>
                <div onClick={() => {
                    onDeleteEvent();
                    setShow(false);
                }} className={`${style.button} ${style.delete}`}>삭제</div>
            </div>
        </div>
    )
}