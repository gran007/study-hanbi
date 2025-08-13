import style from './style.module.css'
import { Riple } from 'react-loading-indicators';

interface Loading {
    isLoading: boolean;
}

export default function Loading({ isLoading }: Loading) {
    return (
        <div className={`${style.loading} ${isLoading && style.show}`}>
            <Riple size='small' color='#2F7AE5' />
        </div>
    )
}