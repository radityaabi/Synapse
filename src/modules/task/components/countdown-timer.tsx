import { useState, useEffect, useCallback } from "react";
import { AlertTriangle, Clock, CheckCircle2 } from "lucide-react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  isToday,
  isPast,
  format,
} from "date-fns";

interface CountdownTimerProps {
  targetDate: Date;
  isDone: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPastDue: boolean;
  isToday: boolean;
}

export function CountdownTimer({ targetDate, isDone }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => {
    const now = new Date();

    if (isPast(targetDate)) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isPastDue: true,
        isToday: isToday(targetDate),
      };
    }

    return {
      days: differenceInDays(targetDate, now),
      hours: differenceInHours(targetDate, now) % 24,
      minutes: differenceInMinutes(targetDate, now) % 60,
      seconds: differenceInSeconds(targetDate, now) % 60,
      isPastDue: false,
      isToday: isToday(targetDate),
    };
  });

  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = new Date();

    if (isPast(targetDate)) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isPastDue: true,
        isToday: isToday(targetDate),
      };
    }

    return {
      days: differenceInDays(targetDate, now),
      hours: differenceInHours(targetDate, now) % 24,
      minutes: differenceInMinutes(targetDate, now) % 60,
      seconds: differenceInSeconds(targetDate, now) % 60,
      isPastDue: false,
      isToday: isToday(targetDate),
    };
  }, [targetDate]);

  useEffect(() => {
    if (isDone) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, isDone]);

  if (isDone) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-green-100 px-3 py-2">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <div>
          <p className="text-sm font-semibold text-green-800">
            Well Done! Task Completed
          </p>
        </div>
      </div>
    );
  }

  if (timeLeft.isPastDue) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-red-100 px-3 py-2">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <div>
          <p className="text-sm font-semibold text-red-800">Overdue</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        timeLeft.isToday
          ? "rounded-lg bg-amber-100 px-3 py-2"
          : "rounded-lg bg-blue-100 px-3 py-2"
      }
    >
      {/* Header */}
      <div className="mb-2 flex items-center gap-2">
        <Clock className="h-3 w-3" />
        <span className="text-xs font-medium">
          {timeLeft.isToday ? "Due Today" : "Time Remaining"}
        </span>
      </div>

      {/* Desktop View */}
      <div className="hidden grid-cols-4 gap-1 text-center md:grid">
        <div className="rounded bg-white p-1 shadow-sm">
          <div className="text-sm font-bold text-gray-900 tabular-nums">
            {timeLeft.days.toString().padStart(2, "0")}
          </div>
          <div className="text-[10px] text-gray-500">Days</div>
        </div>
        <div className="rounded bg-white p-1 shadow-sm">
          <div className="text-sm font-bold text-gray-900 tabular-nums">
            {timeLeft.hours.toString().padStart(2, "0")}
          </div>
          <div className="text-[10px] text-gray-500">Hours</div>
        </div>
        <div className="rounded bg-white p-1 shadow-sm">
          <div className="text-sm font-bold text-gray-900 tabular-nums">
            {timeLeft.minutes.toString().padStart(2, "0")}
          </div>
          <div className="text-[10px] text-gray-500">Minutes</div>
        </div>
        <div className="rounded bg-white p-1 shadow-sm">
          <div className="text-sm font-bold text-gray-900 tabular-nums">
            {timeLeft.seconds.toString().padStart(2, "0")}
          </div>
          <div className="text-[10px] text-gray-500">Seconds</div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="grid grid-cols-4 gap-1 text-center md:hidden">
        <div className="rounded bg-white p-1 shadow-sm">
          <div className="text-sm font-bold text-gray-900 tabular-nums">
            {timeLeft.days.toString().padStart(2, "0")}
          </div>
          <div className="text-[10px] text-gray-500">D</div>
        </div>
        <div className="rounded bg-white p-1 shadow-sm">
          <div className="text-sm font-bold text-gray-900 tabular-nums">
            {timeLeft.hours.toString().padStart(2, "0")}
          </div>
          <div className="text-[10px] text-gray-500">H</div>
        </div>
        <div className="rounded bg-white p-1 shadow-sm">
          <div className="text-sm font-bold text-gray-900 tabular-nums">
            {timeLeft.minutes.toString().padStart(2, "0")}
          </div>
          <div className="text-[10px] text-gray-500">M</div>
        </div>
        <div className="rounded bg-white p-1 shadow-sm">
          <div className="text-sm font-bold text-gray-900 tabular-nums">
            {timeLeft.seconds.toString().padStart(2, "0")}
          </div>
          <div className="text-[10px] text-gray-500">S</div>
        </div>
      </div>

      {timeLeft.isToday && (
        <p className="mt-1 text-center text-xs font-medium text-amber-700">
          Due at {format(targetDate, "HH:mm")}
        </p>
      )}
    </div>
  );
}
