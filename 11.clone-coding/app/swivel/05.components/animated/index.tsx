import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { checkIsInViewport } from '@/app/swivel/04.util';

type AnimatedProps = {
    className: Object | undefined,
}

function Animated ({ children, className={} }: PropsWithChildren<AnimatedProps>) {
    const [show, setShow] = useState(false);
    const areaRef = useRef<HTMLDivElement>(null);

    const handleScrollAnimation = () => {
        const elementTop = areaRef?.current;
        if(!show) {
            setShow(checkIsInViewport(elementTop));
        }
    }

    useEffect(() => {
        handleScrollAnimation();
        window.addEventListener('scroll', handleScrollAnimation);

        return () => {
            window.removeEventListener('scroll', handleScrollAnimation);
        };
    }, [show, areaRef.current]);

    return (
        <div ref={areaRef} 
            className={`${show ? className : {}}`}>
            {children}
        </div>
    )
}

export default Animated;