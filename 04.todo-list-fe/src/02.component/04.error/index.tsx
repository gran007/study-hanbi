import style from './style.module.css'

interface Error {
    message: string;
}

export default function Loading({ error }: { error: Error }) {
    return (
        <div className={style.body}>
            <div className={style.error}>
                {error.message}
            </div>
        </div>
    )
}