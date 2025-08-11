import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

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
            navigate('/');
        } else {
            navigate('/login');
        }
    }, []);

    return (
        <div></div>
    )
}