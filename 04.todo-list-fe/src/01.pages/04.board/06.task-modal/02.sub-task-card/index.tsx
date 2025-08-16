import style from './style.module.css'
import { useState, useEffect, type KeyboardEvent } from 'react'
import type { SubTaskDto } from '../../types'
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { ClickCancel, DeleteModal } from '@/02.component';
import { useUpdateSubTaskQuery, useDeleteSubTaskQuery } from '03.query/04.sub-task'
import { alertStore } from '@/04.store';

interface TaskCardProps {
    subTask: SubTaskDto,
    subTaskList: SubTaskDto[],
}

export default function SubTaskCard({ subTask, subTaskList }: TaskCardProps) {

    const [select, setSelect] = useState(false);
    const [name, setName] = useState(subTask.name);
    const updateData = useUpdateSubTaskQuery(() => setSelect(false));
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        setName(subTask.name);
    }, [select]);

    const onKeyDown = (e: KeyboardEvent) => {
        if (name.length > 0 && e.key === 'Enter' && !e.nativeEvent.isComposing) {
            updateData.mutate({
                id: subTask.id,
                name
            });
        }
    }

    const { open, close } = alertStore();
    const deleteData = useDeleteSubTaskQuery(() => close());

    const onDeleteEvent = () => {
        setShowDeleteModal(false);
        open({
            title: '삭제',
            body: '작업을 삭제하시겠습니까?',
            buttons: [
                {
                    name: '확인', onClick: () => {
                        deleteData.mutate({ 
                            subTask: { id: subTask.id },
                            subTaskList: subTaskList
                            .filter((order)=>order.id != subTask.id)
                            .map((order)=> {
                                const { id, orderNo } = order;
                                return {
                                    id,
                                    orderNo: orderNo > subTask.orderNo ? orderNo - 1 : orderNo
                                };
                            })
                        });
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
                    (<div  className={style.taskTitle}>
                        <div onClick={() => setSelect(true)} className={style.taskName}>
                            {subTask.name}
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