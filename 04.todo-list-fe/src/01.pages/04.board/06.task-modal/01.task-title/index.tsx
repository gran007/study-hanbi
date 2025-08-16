import style from './style.module.css'
import { useState, useEffect, type KeyboardEvent } from 'react'
import type { TaskDto } from '../../types'
import { ClickCancel } from '@/02.component';
import { useUpdateTaskQuery } from '03.query/03.task'

export default function TaskTitle({ task }: { task: TaskDto }) {

    const [select, setSelect] = useState(false);
    const [name, setName] = useState(task.name);
    const updateData = useUpdateTaskQuery(() => setSelect(false));

    useEffect(() => {
        setName(task.name);
    }, [select]);

    const onKeyDown = (e: KeyboardEvent) => {
        if (name.length > 0 && e.key === 'Enter' && !e.nativeEvent.isComposing) {
            updateData.mutate({
                id: task.id,
                name
            });
        }
    }

    return (
        <div className={style.titleSection}>
            {
                !select ?
                    (<div className={style.title}>
                        <div onClick={() => setSelect(true)} className={style.titleText}>{task.name}</div>
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
        </div>
    )
}