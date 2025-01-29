import { useState, useEffect } from "react";
import "./Stopwatch.scss";

export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer: any = null;
        if (isRunning) {
            // Continuously update the time every 10ms when running
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (timer) {
            // Stop updating when stopwatch is paused
            clearInterval(timer);
        }
        return () => {
            // Ensure timer is cleared when component unmounts
            if (timer) clearInterval(timer);
        };
    }, [isRunning]);

    const start = () => setIsRunning(true); // Begin timing
    const stop = () => setIsRunning(false); // Pause timing
    const reset = () => {
        setIsRunning(false);
        setTime(0); // Reset time to zero
    };

    const formatTime = (milliseconds: number) => {
        // Convert time into readable format (MM:SS:MS)
        const mins = Math.floor(milliseconds / 60000);
        // Divide by 60000 (milliseconds in a minute) to convert time to minutes. 
        // This ensures we get the full minutes in the total time, rounding down to the nearest whole minute.

        const secs = Math.floor((milliseconds % 60000) / 1000);
        // First, calculate the remaining milliseconds after extracting full minutes using the modulus operator (%).
        // Then, divide by 1000 (milliseconds in a second) to convert the remainder into seconds.
        // This gives us the number of full seconds remaining after extracting minutes.

        const ms = Math.floor((milliseconds % 1000) / 10);
        // Calculate the remaining milliseconds after extracting full seconds using the modulus operator (%).
        // Divide by 10 to convert the remaining milliseconds into "centiseconds" (hundredths of a second) for better readability.
        // This allows us to display two digits for milliseconds.

        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}:${String(ms).padStart(2, "0")}`;
    };

    return (
        <div className="stopwatch">
            <h1 className="title">Stopwatch</h1>
            <p className="time">{formatTime(time)}</p>
            <div className="buttons">
                <button className="start" onClick={start} disabled={isRunning}>Start</button>
                <button className="stop" onClick={stop} disabled={!isRunning}>Stop</button>
                <button className="reset" onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

/*
Algorithm steps:
1. Initialize state for time and running status.
2. Use useEffect to manage the timer lifecycle.
3. Start button sets running state to true.
4. Stop button sets running state to false.
5. Reset button stops timer and resets time.
6. Update time every 10ms for smooth and accurate millisecond display.
   - 10ms is used because:
     - It provides a balance between performance and precision.
     - Updating every 1ms is unnecessary and may cause performance issues.
     - 100ms is too slow and makes the timer appear choppy.
     - Most digital stopwatches use 10ms updates for better readability.
7. Format time into MM:SS:MS format before displaying it.
8. Render UI and update dynamically based on state changes.
9. Ensure proper cleanup of the interval when the component unmounts.
*/
