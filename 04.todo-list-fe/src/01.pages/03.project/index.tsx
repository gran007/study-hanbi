import style from './style.module.css';
import { useState, type ChangeEvent, useRef } from 'react'
import {
    useProjectListQuery,
    useDeleteProjectQuery,
} from '@/03.query/01.project';
import ButtonModal from './02.button-modal';
import ProjectModal from './01.project-modal'
import { alertStore } from '@/04.store';
import { Error, Loading } from '@/02.component'
import { useNavigate } from 'react-router-dom';

interface User {
    name: string;
}

export interface Project {
    id: number;
    name: string;
    user: User;
}

export default function Project() {
    const [search, setSearch] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const { isLoading, error, data } = useProjectListQuery();
    const { open, close } = alertStore();
    const navigate = useNavigate();

    const deleteData = useDeleteProjectQuery(() => close());
    const selectedProject = useRef<Project>(null);

    if(error) return (<Error error={error} />)

    const result = search.length === 0 ? data?.data || []
        : data?.data.filter((item: Project) => item.name.includes(search))

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const onDeleteEvent = (project: Project) => {
        open({
            title: '삭제',
            body: '프로젝트를 삭제하시겠습니까?',
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

    const navigateToBoard = (project: Project) => {
        navigate(`/board/${project.id}`)
    }

    return (
        <>
            <ProjectModal
                project={selectedProject}
                show={showModal}
                setShow={setShowModal} />
            <Loading isLoading={isLoading} />
            
            <div className={style.body}>
                <div className={style.container}>
                    <div className={style.inputSection}>
                        <input
                            className={style.searchInput}
                            value={search}
                            placeholder='프로젝트 검색'
                            onChange={onChange} />
                    </div>
                    <div className={style.title}>
                        프로젝트
                        <div onClick={() => {
                            selectedProject.current = null;
                            setShowModal(true);
                        }} className={style.button}>프로젝트 만들기</div>
                    </div>
                    <div className={style.project}>
                        <div className={style.header}>
                            <div className={style.header1}>이름</div>
                            <div className={style.header2}>사용자</div>
                            <div className={style.header3}>설정</div>
                        </div>
                        {result.map((project: Project, index: number) => (
                            <div key={index} className={style.item}>
                                <div className={style.body1}
                                onClick={()=>navigateToBoard(project)}>{project.name}</div>
                                <div className={style.body2}>{project.user.name}</div>
                                <div className={style.body3}>
                                    <ButtonModal
                                        onUpdateEvent={() => {
                                            selectedProject.current = project;
                                            setShowModal(true);
                                        }}
                                        onDeleteEvent={() => onDeleteEvent(project)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}