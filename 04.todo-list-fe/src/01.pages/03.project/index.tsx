import style from './style.module.css';
import { useState, useEffect, useCallback, useMemo, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { useProjectListQuery } from '@/03.query';
import { Riple } from "react-loading-indicators";

interface User {
    name: string;
}

interface Project {
    name: string;
    user: User;
}

export default function Project() {
    const navigate = useNavigate();
    const { isLoading, error, data } = useProjectListQuery();
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            navigate('/login');
        }
    }, []);

    if (error) {
        return (
            <div className={style.body}>
                <div className={style.error}>
                    {error.message}
                </div>
            </div>
        )
    }

    const result = search.length === 0 ? data?.data : data?.data.filter((item: Project)=>item.name.includes(search))
    
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return (
        <>
            <div className={style.body}>
                <div className={style.container}>
                    <div className={style.title}>
                        프로젝트
                        <div className={style.button}>프로젝트 만들기</div>
                    </div>
                    <div className={style.inputSection}>
                        <input 
                            className={style.input} 
                            value={search}
                            placeholder='프로젝트 검색'
                            onChange={onChange}/>
                    </div>
                    <div className={style.project}>
                        <div className={style.header}>
                            <div className={style.header1}>이름</div>
                            <div className={style.header2}>사용자</div>
                        </div>
                        {result.map(({ name, user }: Project, index: number)=>(
                            <div key={index} className={style.item}>
                                <div className={style.body1}>{name}</div>
                                <div className={style.body2}>{user.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {
                isLoading &&
                <div className={style.loading}>
                    <Riple size='small' color='#2F7AE5' />
                </div>
            }
        </>
    )
}