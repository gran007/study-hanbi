import style from './style.module.css'
import { useState, useEffect, type KeyboardEvent } from "react";
import Add from '@mui/icons-material/Add';
import { ClickCancel } from '@/02.component';
import { useAddBoardQuery } from '@/03.query/02.board';

interface BoardInfo {
    projectId: number;
    orderNo: number;
}

export default function AddBoardButton({ projectId, orderNo }: BoardInfo) {
    const [select, setSelect] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (select) {
            setName('');
        }
    }, [select]);

    const addBoard = useAddBoardQuery(() => setSelect(false));
    
    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setSelect(false);
        } else if (name.length > 0 && e.key === 'Enter') {
            addBoard.mutate({
                projectId,
                orderNo,
                name,
            })
        }
    }

    return (
        <div className={style.addBoardButtonSection}>
            {!select ?
                (<div onClick={() => setSelect(true)} className={style.addBoardButton}>
                    <Add />
                </div>) :
                (
                    <ClickCancel setCancel={() => setSelect(false)}>
                        <input
                            onKeyDown={onKeyDown}
                            type='text'
                            autoFocus={true}
                            className={style.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </ClickCancel>
                )}
        </div>
    )
}