import { useMemo, useState } from "react";
import './Calender.scss'

export type CalendarDate = Date | null;

export interface CalendarProps {
    value?: CalendarDate; // single selected date
    onChange?: (d: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
    locale?: string; // e.g. 'en-US'
    showHeader?: boolean;
    firstWeekday?: 0 | 1; // 0 = Sunday, 1 = Monday
}

function startOfMonth(d: Date) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date) {
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
function addMonths(d: Date, n: number) {
    return new Date(d.getFullYear(), d.getMonth() + n, d.getDate());
}
function isSameDay(a?: Date | null, b?: Date | null) {
    if (!a || !b) return false;
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}
function clampDate(d: Date, min?: Date, max?: Date) {
    if (min && d < min) return min;
    if (max && d > max) return max;
    return d;
}

const defaultWeekdays = (locale = "en-US", firstWeekday: 0 | 1 = 0) => {
    const base = Array.from({ length: 7 }).map((_, i) => {
        // 2020-08-02 is a Sunday — but we'll generate names by using Date
        const dt = new Date(Date.UTC(2020, 7, 2 + i));
        return dt.toLocaleDateString(locale, { weekday: "short" });
    });
    if (firstWeekday === 1) return [...base.slice(1), base[0]]; // Mon first
    return base;
};

export default function Calendar({
    value = null,
    onChange,
    minDate,
    maxDate,
    locale = "en-US",
    showHeader = true,
    firstWeekday = 0,
}: CalendarProps) {
    const today = useMemo(() => new Date(), []);
    const initialMonth = value ? startOfMonth(value) : startOfMonth(today);
    const [visibleMonth, setVisibleMonth] = useState<Date>(initialMonth);

    const weekdays = useMemo(() => defaultWeekdays(locale, firstWeekday), [locale, firstWeekday]);

    const monthMatrix = useMemo(() => {
        // returns array of weeks, each week is array of Date objects (may be previous/next month days)
        const start = startOfMonth(visibleMonth);
        const end = endOfMonth(visibleMonth);

        const startDayIndex = (start.getDay() - firstWeekday + 7) % 7; // offset by firstWeekday
        const days: Date[] = [];

        // fill days before start of month
        for (let i = startDayIndex - 1; i >= 0; i--) {
            const d = new Date(start);
            d.setDate(start.getDate() - (i + 1));
            days.push(d);
        }

        // fill this month
        for (let d = 1; d <= end.getDate(); d++) {
            days.push(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), d));
        }

        // fill remaining to complete weeks
        while (days.length % 7 !== 0) {
            const last = days[days.length - 1];
            const d = new Date(last);
            d.setDate(last.getDate() + 1);
            days.push(d);
        }

        // chunk into weeks
        const weeks: Date[][] = [];
        for (let i = 0; i < days.length; i += 7) {
            weeks.push(days.slice(i, i + 7));
        }
        return weeks;
    }, [visibleMonth, firstWeekday]);

    const handlePrev = () => setVisibleMonth((m) => addMonths(m, -1));
    const handleNext = () => setVisibleMonth((m) => addMonths(m, 1));
    const handleToday = () => setVisibleMonth(startOfMonth(today));

    const isDisabled = (d: Date) => {
        if (minDate && d < startOfDay(minDate)) return true;
        if (maxDate && d > endOfDay(maxDate)) return true;
        return false;
    };

    function startOfDay(d: Date) {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }
    function endOfDay(d: Date) {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
    }

    const handleSelect = (d: Date) => {
        if (isDisabled(d)) return;
        const clamped = clampDate(d, minDate, maxDate);
        onChange?.(clamped);
    };

    return (
        <div className="rc-calendar">
            {showHeader && (
                <div className="rc-header">
                    <div className="rc-nav">
                        <button className="rc-btn" onClick={handlePrev} aria-label="Previous month">
                            ‹
                        </button>
                        <button className="rc-btn" onClick={handleToday} aria-label="Go to current month">
                            Today
                        </button>
                        <button className="rc-btn" onClick={handleNext} aria-label="Next month">
                            ›
                        </button>
                    </div>

                    <div className="rc-title" aria-live="polite">
                        {visibleMonth.toLocaleDateString(locale, { month: "long", year: "numeric" })}
                    </div>
                </div>
            )}

            <table className="rc-table" role="grid">
                <thead>
                    <tr>
                        {weekdays.map((w) => (
                            <th key={w} scope="col">
                                {w}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {monthMatrix.map((week, wi) => (
                        <tr key={wi}>
                            {week.map((d) => {
                                const inCurrentMonth = d.getMonth() === visibleMonth.getMonth();
                                const disabled = isDisabled(d);
                                const selected = isSameDay(d, value);
                                const isToday = isSameDay(d, today);
                                return (
                                    <td key={d.toISOString()} className={`rc-cell ${inCurrentMonth ? "current" : "other"}`}>
                                        <button
                                            className={`rc-day ${selected ? "selected" : ""} ${disabled ? "disabled" : ""} ${isToday ? "today" : ""}`}
                                            onClick={() => handleSelect(d)}
                                            disabled={disabled}
                                            aria-pressed={selected}
                                        >
                                            {d.getDate()}
                                        </button>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}