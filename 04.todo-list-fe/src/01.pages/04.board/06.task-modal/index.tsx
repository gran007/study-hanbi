import style from './style.module.css'
import { useSubTaskListQuery } from '@/03.query/04.sub-task'
import { Loading, Error } from '@/02.component';
import TaskTitle from './01.task-title';
import SubTaskCard from './02.sub-task-card';
import type { TaskDto, SubTaskDto } from '../types';
import AddSubTaskButton from './03.add-sub-task-button';
import { useRef } from 'react';
import type { MouseEvent } from 'react';

interface TaskModalProps {
    task: TaskDto | null;
    show: boolean;
    setShow: Function;
}

export default function TaskModal({ show, setShow, task }: TaskModalProps) {

    if (!task) return (<></>);

    const inputRef = useRef<HTMLInputElement>(null);

    const { isLoading, error, data } = useSubTaskListQuery(task.id);
    if (error) return (<Error error={error} />);

    const result: SubTaskDto[] = data?.data || [];

    const onClickOutside = (event: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(event.target as HTMLElement)) {
            setShow(false);
        }
    }

    return (
        <>
            <Loading isLoading={isLoading} />
            <div onClick={e=>onClickOutside(e)} className={`${style.modalBackground} ${show && style.show}`}>
                <div ref={inputRef} className={style.modal}>
                    <TaskTitle task={task} />
                    <div className={style.body}>
                        {result
                            .sort((a, b) => a.orderNo - b.orderNo)
                            .map((subTask: SubTaskDto, index: number) => (
                                <SubTaskCard key={index} subTask={subTask} subTaskList={result} />
                            ))}
                        <AddSubTaskButton task={task} subTasks={result} />
                    </div>
                </div>
            </div>
        </>
    )
}