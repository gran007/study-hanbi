import style from './style.module.css'
import { useState, useEffect, type KeyboardEvent } from "react";
import Add from '@mui/icons-material/Add';
import { ClickCancel } from '@/02.component';
import { useAddSubTaskQuery } from '@/03.query/04.sub-task';
import type { TaskDto, SubTaskDto } from '../../types'

export default function AddSubTaskButton({ task, subTasks }: { task: TaskDto, subTasks: SubTaskDto[] }) {
    const [select, setSelect] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (select) {
            setName('');
        }
    }, [select]);

    const addSubTask = useAddSubTaskQuery(() => setSelect(false));
    const onKeyDown = (e: KeyboardEvent) => {

        if (e.key === 'Escape') {
            setSelect(false);
        } else if (name.length > 0 && e.key === 'Enter' && !e.nativeEvent.isComposing) {
            addSubTask.mutate({
                projectId: task.projectId,
                taskId: task.id,
                priority: 2,
                orderNo: subTasks.length,
                name,
            })
        }
    }

    return (
        <div className={style.addSubTaskButtonSection}>
            {!select ?
                (<div onClick={() => setSelect(true)} className={style.addSubTaskButton}>
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