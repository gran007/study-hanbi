import style from './style.module.css'
import { useState } from "react";
import { ClickCancel } from '@/02.component';
import MoreHoriz from '@mui/icons-material/MoreHoriz'

interface ClickEvent {
    onUpdateEvent: Function;
    onDeleteEvent: Function;
}

export default function ButtonModal({ onUpdateEvent, onDeleteEvent }: ClickEvent) {

    const [show, setShow] = useState<Boolean>(false);

    return (
        <>
            <div onClick={() => setShow(true)} className={style.moreButton}>
                <MoreHoriz sx={{ color: "#807d7dff"}} />
            </div>
            <ClickCancel
                setCancel={()=>setShow(false)}
                className={`${style.settingModal} ${show && style.show}`}>
                <div onClick={() => {
                    onUpdateEvent();
                    setShow(false);
                }} className={style.button}>프로젝트 수정</div>
                <div onClick={() => {
                    onDeleteEvent();
                    setShow(false);
                }} className={`${style.button} ${style.delete}`}>삭제</div>
            </ClickCancel>
        </>
    )
}