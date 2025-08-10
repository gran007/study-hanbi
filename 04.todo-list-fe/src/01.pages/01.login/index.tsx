import style from './style.module.css';
import { GoogleIcon } from '@/02.component';

export default function Login() {

    const onClickLogin = () => {
        window.location.href = 'http://localhost:3000/google/login';
    }

    return (
        <div className={style.body}>
            <span className={style.title}>Hanbi Todo List</span>
            <div className={style.card}>
                <div onClick={onClickLogin} className={style.button}>
                    <GoogleIcon />
                    Google로 로그인
                </div>
            </div>
        </div>
    )
}