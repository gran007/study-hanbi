import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '@/05.util/axios';

export default function Auth() {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const accessToken = queryParams.get('accessToken');
        const refreshToken = queryParams.get('refreshToken');
        
        if(accessToken && refreshToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            navigate('/');
        } else {
            navigate('/login');
        }
    }, []);

    return (
        <div></div>
    )
}