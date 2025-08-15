import style from './style.module.css'
import { useState, useEffect, type KeyboardEvent } from 'react'
import type { BoardDto } from '..'
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { ClickCancel, DeleteModal } from '@/02.component';
import { useUpdateBoardQuery, useDeleteBoardQuery } from '03.query/02.board'
import { alertStore } from '@/04.store';

interface BoardTitleProps {
    board: BoardDto;
    boardList: BoardDto[];
}

export default function BoardTitle({ board, boardList }: BoardTitleProps) {

    const [select, setSelect] = useState(false);
    const [name, setName] = useState(board.name);
    const updateData = useUpdateBoardQuery(() => setSelect(false));
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        setName(board.name);
    }, [select]);

    const onKeyDown = (e: KeyboardEvent) => {
        if (name.length > 0 && e.key === 'Enter' && !e.nativeEvent.isComposing) {
            updateData.mutate({
                id: board.id,
                name
            });
        }
    }

    const { open, close } = alertStore();
    const deleteData = useDeleteBoardQuery(() => close());

    const onDeleteEvent = () => {
        setShowDeleteModal(false);
        open({
            title: '삭제',
            body: '보드를 삭제하시겠습니까?',
            buttons: [
                {
                    name: '확인', onClick: () => {
                        deleteData.mutate({ 
                            board: {id: board.id},
                            boardList: boardList
                            .filter((boardOrder)=>boardOrder.id != board.id)
                            .map((boardOrder)=> {
                                const { id, orderNo } = boardOrder;
                                return {
                                    id,
                                    orderNo: orderNo > board.orderNo ? orderNo - 1 : orderNo
                                }
                            })
                        });
                    }
                },
                { name: '취소', onClick: () => { close() }, isCancel: true },
            ]
        });
    }

    return (
        <div className={style.titleSection}>
            {
                !select ?
                    (<div className={style.title}>
                        <div onClick={() => setSelect(true)} className={style.titleText}>{board.name}</div>
                        <div onClick={() => setShowDeleteModal(true)} className={style.titleButton}>
                            <MoreHoriz />
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