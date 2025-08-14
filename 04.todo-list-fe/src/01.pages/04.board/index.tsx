import style from './style.module.css';
import { useState } from 'react';
import {
    useBoardListQuery,
    useAddBoardQuery,
    useUpdateBoardOrderQuery,
    useDeleteBoardQuery
} from '@/03.query/02.board';
import { useNavigate, useParams } from 'react-router-dom';
import { alertStore } from '04.store';
import { Error, Loading } from '@/02.component';
import { Fragment } from 'react';
import AddTaskButton from './02.add-task-button';
import BoardTitle from './01.board-title';
import MoreVert from '@mui/icons-material/MoreVert'

export interface TaskDto {
    id: number;
    projectId: number;
    boardId: number;
    priority: number;
    orderNo: number;
    name: string;
}

export interface BoardDto {
    id: number;
    projectId: number;
    name: string;
    orderNo: number;
    tasks: TaskDto[];
}

export default function Board() {
    const navigate = useNavigate();
    const { id } = useParams();
    if (!id) {
        navigate(-1);
    }

    const [projectId] = useState(parseInt(id as string));
    const { isLoading, error, data } = useBoardListQuery(projectId);

    if (error) return (<Error error={error} />)

    const result = data?.data || [];

    return (
        <>
            <Loading isLoading={isLoading} />
            <div className={style.body}>
                <div className={style.boardSection}>
                    {result.map((board: BoardDto, boardKey: number) => {
                        return (
                            <Fragment key={boardKey}>
                                <div className={style.boardBar}></div>
                                <div className={style.board}>
                                    <BoardTitle board={board} />
                                    {
                                        board.tasks.map((task: TaskDto, taskKey: number) => (
                                            <Fragment key={taskKey}>
                                                <div className={style.taskBar}></div>
                                                <div className={style.task}>
                                                    <div className={style.taskTitle}>
                                                        <div className={style.taskName}>{task.name}</div>
                                                    </div>
                                                    <div className={style.button}>
                                                        <MoreVert/>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        ))
                                    }
                                    <div className={style.taskBottomBar}></div>
                                    <AddTaskButton board={board} />
                                </div>
                            </Fragment>
                        )
                    })}
                </div>
            </div>
        </>
    )
}