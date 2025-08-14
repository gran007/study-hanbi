import style from './style.module.css';
import { useState } from 'react';
import {
    useBoardListQuery,
    useAddBoardQuery,
    useUpdateBoardQuery,
    useUpdateBoardOrderQuery,
    useDeleteBoardQuery
} from '@/03.query/02.board';
import { useSearchParams } from 'react-router-dom';
import { alertStore } from '04.store';
import { Error, Loading } from '@/02.component';

interface BoardDto {
    id: number;
    projectId: number;
    name: number;
    orderNo: number;
}

export default function Board() {
    const [searchParams] = useSearchParams();
    const [projectId] = useState(+(searchParams.get('projectId') as string));
    const { isLoading, error, data } = useBoardListQuery(projectId);
    const { open, close } = alertStore();
    const deleteData = useDeleteBoardQuery(projectId, () => close());

    if (error) return (<Error error={error} />)

    const result = data?.data || [];
    console.log(result);
    const onDeleteEvent = (project: BoardDto) => {
        open({
            title: '삭제',
            body: '보드를 삭제하시겠습니까?',
            buttons: [
                {
                    name: '확인', onClick: () => {
                        deleteData.mutate({ id: project.id });
                    }
                },
                { name: '취소', onClick: () => { close() } },
            ]
        });
    }

    return (
        <>
            <Loading isLoading={isLoading} />
            <div className={style.body}>

            </div>
        </>
    )
}