import style from '../style.module.css'
import { useState, useEffect, type KeyboardEvent } from "react";
import Add from '@mui/icons-material/Add';
import { ClickCancel } from '@/02.component';
import { useAddTaskQuery } from '@/03.query/03.task';
import { type BoardDto } from '..';

export default function AddTaskButton({ board }: { board: BoardDto }) {
    const [select, setSelect] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (select) {
            setName('');
        }
    }, [select]);

    const addTask = useAddTaskQuery(() => setSelect(false));
    const onKeyDown = (e: KeyboardEvent) => {

        if (e.key === 'Escape') {
            setSelect(false);
        } else if (name.length > 0 && e.key === 'Enter' && !e.nativeEvent.isComposing) {
            addTask.mutate({
                projectId: board.projectId,
                boardId: board.id,
                priority: 2,
                orderNo: board.tasks.length,
                name,
            })
        }
    }

    return (
        <div className={style.addTaskButtonSection}>
            {!select ?
                (<div onClick={() => setSelect(true)} className={style.addTaskButton}>
                    <Add />
                    <div className={style.addText}>만들기</div>
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