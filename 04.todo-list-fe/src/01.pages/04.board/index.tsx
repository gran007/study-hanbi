import style from './style.module.css';
import { useEffect, useRef, useState } from 'react';
import { useBoardListQuery } from '@/03.query/02.board';
import { useNavigate, useParams } from 'react-router-dom';
import { Error, Loading } from '@/02.component';
import { Fragment } from 'react';
import type { BoardDto, TaskDto } from './types';
import BoardTitle from './01.board-title';
import AddBoardButton from './02.add-board-button';
import AddTaskButton from './03.add-task-button';
import TaskCard from './04.task-card';
import TaskBar from './05.task-bar';
import TaskModal from './06.task-modal';

export default function Board() {
    const navigate = useNavigate();
    const { id } = useParams();
    if (!id) {
        navigate(-1);
    }

    const [boardIndex, setBoardIndex] = useState(-1);
    const [taskIndex, setTaskIndex] = useState(-1);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [projectId] = useState(parseInt(id as string));
    const { isLoading, error, data } = useBoardListQuery(projectId);

    if (error) return (<Error error={error} />)

    const result: BoardDto[] = data?.data || [];

    const onClickTaskCard = (boardIndex: number, taskIndex: number) => {
        setBoardIndex(boardIndex);
        setTaskIndex(taskIndex);
        setShowModal(true);
    }

    useEffect(() => {
        if (!showModal) {
            setBoardIndex(-1);
            setTaskIndex(-1);
        }
    }, [showModal]);

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
                                                        <TaskCard
                                                            onClick={() => onClickTaskCard(boardKey, taskKey)}
                                                            task={task}
                                                            board={board} />
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
            <TaskModal
                show={showModal}
                setShow={setShowModal}
                task={
                    boardIndex >= 0 && taskIndex >= 0 ?
                        result[boardIndex].tasks[taskIndex] : null} />
        </>
    )
}