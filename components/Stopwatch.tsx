import React from "react";
import { useImperativeHandle, useState } from "react"
import { useEffect } from "react"

export interface StopwatchRef {
    start: () => void;
}

const Stopwatch = React.forwardRef<StopwatchRef>((_, ref) => {
    const [canStart, setCanStart] = useState(false)
    const [seconds, setSeconds] = useState(0)
    const format = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainder = seconds % 60
        return `0${minutes}:${remainder < 10 ? 0 + '' + remainder : remainder}`
    }

    const start = () => {
        setSeconds(seconds + 1)
        setCanStart(true)
    };

    // Expose the method through the ref
    useImperativeHandle(ref, () => ({ start }));

    useEffect(() => {
        canStart && setTimeout(() => setSeconds(seconds + 1), 1000)
    })

    return (
        <div>{format(seconds)}</div>
    )
})

export default Stopwatch