import { useEffect, useState } from 'react'
import { longDateFormatter } from '../../utils/dateFormatter'
import { getTime } from '../../utils/getTime';

function Timer() {
    const date = longDateFormatter();
    const [time, setTime] = useState('')

    useEffect(() => {
        const interval = setInterval(() => {
            const clock = getTime();
            setTime(clock);
        },1000)
        return () => clearInterval(interval);
    },[])

    return (
        <div id="timer">
            <h3>{date}</h3>
            <p>{time}</p>
        </div>
    )
}

export default Timer