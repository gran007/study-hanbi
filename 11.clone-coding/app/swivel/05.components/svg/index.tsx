export default function SVG({className, d}: {className: string, d: string}) {
    return (
        <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={d} />
        </svg>
    )
}