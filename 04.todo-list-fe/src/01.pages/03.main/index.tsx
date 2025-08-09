import style from './style.module.css';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '@/02.component/axios';

export default function Main() {
    const navigate = useNavigate();

    useEffect(()=> {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        } else {
            navigate('/login');
        }
    }, [])
    
    return (
        <div></div>
    )
}