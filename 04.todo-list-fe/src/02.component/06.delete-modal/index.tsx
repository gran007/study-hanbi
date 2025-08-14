import style from './style.module.css'
import { useState } from "react";
import { ClickCancel } from '@/02.component';
import MoreHoriz from '@mui/icons-material/MoreHoriz'


interface DeleteType {
    show: boolean,
    setShow: Function;
    onDelete: Function;
}

export default function DeleteModal({ show, setShow, onDelete }: DeleteType) {

    return (
        <ClickCancel
            setCancel={() => setShow(false)}
            className={`${style.deleteModal} ${show && style.show}`}>
            <div onClick={() => onDelete()}
                className={style.button}>삭제</div>
        </ClickCancel>
    )
}