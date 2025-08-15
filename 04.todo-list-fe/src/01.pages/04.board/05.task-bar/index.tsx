import style from './style.module.css'
import { useState, useEffect, type KeyboardEvent } from 'react'
import type { BoardDto, TaskDto } from '../'
import Add from '@mui/icons-material/Add';
import { ClickCancel } from '@/02.component';
import { useAddAndUpdatTaskQuery } from '03.query/03.task'

interface TaskBarProps {
    index: number,
    board: BoardDto
}

export default function TaskBar({ index, board }: TaskBarProps) {

    const [select, setSelect] = useState(false);
    const [name, setName] = useState('');
    const updateData = useAddAndUpdatTaskQuery(() => setSelect(false));
    
    useEffect(() => {
        setName('');
    }, [select]);

    const onKeyDown = (e: KeyboardEvent) => {
        if (name.length > 0 && e.key === 'Enter') {
            updateData.mutate({
                task: {
                    projectId: board.projectId,
                    boardId: board.id,
                    priority: 2,
                    orderNo: index,
                    name
                },
                taskList: board.tasks
                .filter((task)=>task.orderNo >= index)
                .map((task)=>{
                    return {
                        id: task.id,
                        orderNo: task.orderNo + 1,
                    }
                })
            });
        }
    }

    return (
        <>
            {
                !select ?
                    (<div onClick={()=>setSelect(true)} className={style.taskBar}>
                        <div className={style.plusButton}>
                            <Add />
                        </div>
                    </div>) :
                    (
                        <ClickCancel setCancel={() => setSelect(false)}>
                            <input
                                onKeyDown={onKeyDown}
                                autoFocus={true}
                                className={style.input}
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </ClickCancel>
                    )
            }
        </>
    )
}