import style from './style.module.css'
import { ClickCancel } from '@/02.component';


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
            <div onClick={(e) => {
                e.stopPropagation();
                onDelete();
            }}
                className={style.button}>삭제</div>
        </ClickCancel>
    )
}