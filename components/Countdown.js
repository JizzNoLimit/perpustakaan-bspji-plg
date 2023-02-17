import { useEffect, useState } from "react";

function Countdown({ deadline }) {
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date().getTime();
            const distance = deadline - now;

            if (distance < 0) {
                clearInterval(intervalId);
                setTimeRemaining({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
                return;
            }

            setTimeRemaining({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [deadline]);

    return (
        <>
        {timeRemaining.days < 0 ? (
            <span className="px-2 bg-red-500 rounded-lg">
                Anggota menerima sanksi
            </span>
        ) : (
            <span className="px-2 bg-emerald-400 rounded-lg">
                {timeRemaining.days}:{timeRemaining.hours}:{timeRemaining.minutes}:{timeRemaining.seconds}
            </span>
        )}
        </>
    );
}

export default Countdown;