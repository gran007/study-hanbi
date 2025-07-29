import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { checkIsInViewport } from '@/app/swivel/04.util';

type AnimatedProps = {
    showStyle: Object,
}

function Animated ({ children, showStyle={} }: PropsWithChildren<AnimatedProps>) {
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
            className={`${show ? showStyle : {}}`}>
            {children}
        </div>
    )
}

export default Animated;