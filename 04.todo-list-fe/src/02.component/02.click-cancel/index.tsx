import type { PropsWithChildren } from "react";
import { useRef, useEffect } from "react";

interface ClickOutSide {
    setCancel: Function;
    className?: string; 
}

export default function ClickCancel({ children, setCancel, className='' }: PropsWithChildren<ClickOutSide>) {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleClickOutside = (event: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(event.target as HTMLElement)) {
            setCancel();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [inputRef.current]);
    return (
        <div ref={inputRef} className={className}>
            { children }
        </div>
)
}