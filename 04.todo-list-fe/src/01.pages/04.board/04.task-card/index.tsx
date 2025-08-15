import style from './style.module.css'
import { useState, useEffect, type KeyboardEvent } from 'react'
import type { TaskDto } from '../'
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import Edit from '@mui/icons-material/Edit';
import { ClickCancel, DeleteModal } from '@/02.component';
import { useUpdateTaskQuery, useDeleteTaskQuery } from '03.query/03.task'
import { alertStore } from '@/04.store';

export default function TaskCard({ task }: { task: TaskDto }) {

    const [select, setSelect] = useState(false);
    const [name, setName] = useState(task.name);
    const updateData = useUpdateTaskQuery(() => setSelect(false));
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        setName(task.name);
    }, [select]);

    const onKeyDown = (e: KeyboardEvent) => {
        if (name.length > 0 && e.key === 'Enter') {
            updateData.mutate({
                id: task.id,
                name
            });
        }
    }

    const { open, close } = alertStore();
    const deleteData = useDeleteTaskQuery(() => close());

    const onDeleteEvent = () => {
        setShowDeleteModal(false);
        open({
            title: '삭제',
            body: '작업을 삭제하시겠습니까?',
            buttons: [
                {
                    name: '확인', onClick: () => {
                        deleteData.mutate({ id: task.id });
                    }
                },
                { name: '취소', onClick: () => { close() }, isCancel: true },
            ]
        });
    }

    return (
        <div className={style.task}>
            {
                !select ?
                    (<div className={style.taskTitle}>
                        <div className={style.taskName}>
                            {task.name}
                            <div onClick={() => setSelect(true)} className={style.edit}>
                                <Edit sx={{ color: "#807d7dff", fontSize: '18px' }} />
                            </div>
                        </div>
                        <div onClick={() => setShowDeleteModal(true)} className={style.taskButton}>
                            <MoreHoriz sx={{ color: "#807d7dff" }} />
                        </div>
                        <DeleteModal
                            show={showDeleteModal}
                            setShow={setShowDeleteModal}
                            onDelete={() => onDeleteEvent()} />
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