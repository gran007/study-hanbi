import style from './style.module.css'
import { useEffect, useState } from 'react'
import {
    useAddProjectQuery,
    useUpdateProjectQuery,
} from '@/03.query/01.project';
import { type Project } from '../'
import { type Dispatch, type SetStateAction, type RefObject } from 'react';
import { ClickCancel } from '@/02.component';

interface ProjectModalType {
    project: RefObject<Project | null>;
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>
}

const ProjectModal = ({ project, show, setShow } : ProjectModalType) => {
    const [projectName, setProjectName] = useState<string>('');
    const clear = () => {
        project.current = null;
        setProjectName('');
        setShow(false);
    }
    const addData = useAddProjectQuery(clear);
    const updateData = useUpdateProjectQuery(clear);

    useEffect(()=> {
        if(project.current) {
            setProjectName(project.current.name);
        } else {
            setProjectName('');
        }
    }, [project.current])

    const onClickSaveProject = () => {
        if (projectName.length === 0) {
            return;
        }
        if (!project.current) {
            addData.mutate({
                name: projectName,
            })
        } else {
            updateData.mutate({
                id: project.current.id,
                name: projectName,
            });
        }
    }

    return (
        <div className={`${style.modalBackground} ${show && style.show}`}>
            <ClickCancel setCancel={()=>setShow(false)}  className={style.modal}>
                <div className={style.modalTitle}>
                    {project.current ? '프로젝트 수정' : '프로젝트 추가'}
                </div>
                <div className={style.inputTitle}>프로젝트명</div>
                <input className={style.inputText} type='text'
                    value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                <div className={style.buttonGroup}>
                    <div onClick={onClickSaveProject} className={`${style.modalButton} ${projectName.length == 0 && style.disabled}`}>
                        {project.current ? '수정' : '추가'}
                    </div>
                    <div className={`${style.modalButton} ${style.cancel}`}
                        onClick={() => setShow(false)}>취소</div>
                </div>
            </ClickCancel>
        </div>
    )
}

export default ProjectModal;