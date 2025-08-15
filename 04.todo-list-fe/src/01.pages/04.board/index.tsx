import style from './style.module.css';
import { useState } from 'react';
import { useBoardListQuery } from '@/03.query/02.board';
import { useNavigate, useParams } from 'react-router-dom';
import { Error, Loading } from '@/02.component';
import { Fragment } from 'react';
import AddTaskButton from './02.add-task-button';
import BoardTitle from './01.board-title';
import AddBoardButton from './03.add-board-button';
import TaskCard from './04.task-card';
import TaskBar from './05.task-bar';

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

    const result: BoardDto[] = data?.data || [];

    return (
        <>
            <Loading isLoading={isLoading} />
            <div className={style.body}>
                <div className={style.boardSection}>
                    {result
                        .sort((a, b) => a.orderNo - b.orderNo)
                        .map((board: BoardDto, boardKey: number) => {
                            return (
                                <Fragment key={boardKey}>
                                    <div className={style.boardBar}></div>
                                    <div className={style.board}>
                                        <BoardTitle board={board} boardList={result} />
                                        {
                                            board.tasks
                                                .sort((a, b) => a.orderNo - b.orderNo)
                                                .map((task: TaskDto, taskKey: number) => (
                                                    <Fragment key={taskKey}>
                                                        <TaskBar index={taskKey} board={board} />
                                                        <TaskCard task={task} board={board} />
                                                    </Fragment>
                                                ))
                                        }
                                        <div className={style.taskBottomBar}></div>
                                        <AddTaskButton board={board} />
                                    </div>
                                </Fragment>
                            )
                        })}
                    <div className={style.boardRightBar}></div>
                    <AddBoardButton projectId={projectId} orderNo={result.length} />
                </div>
            </div>
        </>
    )
}