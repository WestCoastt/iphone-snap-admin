"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { ko } from "react-day-picker/locale";
import { differenceInMinutes, format, parse } from "date-fns";
import TimePicker from "../components/TimePicker";

interface Schedule {
  address: string;
  contractReview: boolean;
  createdDate: string; // ISO 8601 형식의 날짜 문자열
  date: string; // ISO 8601 형식의 날짜 문자열
  deposit: number;
  finalReview: boolean;
  gender: string;
  id: number;
  isDepositPaid: boolean;
  isMyCodeUsed: boolean;
  isRemainingPaid: boolean;
  myCode: string;
  partner: boolean;
  partnerCode: string | null; // partnerCode가 null일 수 있으므로
  phone: string;
  product: string;
  remainingAmount: number;
  rights: boolean;
  snapAvailable: boolean;
  time: string; // 시간 문자열 (예: "17:00")
  userName: string;
  venue: string;
}

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("09:00");
  const currentMonth = new Date();

  const [month, setMonth] = useState<Date>(currentMonth);
  const [schedules, setSchedules] = useState<
    { data: { date: string; schedules: Schedule[] }[] } | undefined
  >(undefined);
  const [schedule, setSchedule] = useState<Schedule[] | undefined>();
  const [isAvailable, setIsAvailable] = useState(false);

  const checkSchedule = (day: Date) => {
    setSelectedDate(day);

    const formattedDate = format(day, "yyyy-MM-dd");
    const scheduleData = schedules?.data.find(
      (schedule) => schedule.date === formattedDate
    );

    setSchedule(scheduleData?.schedules);
  };

  const sortedData = schedule?.sort((a, b) => {
    return a.time.localeCompare(b.time); // 시간 비교
  });

  const checkAvailable = () => {
    if (!schedule || !schedule[0]?.time) return false;

    const scheduleTime = parse(schedule[0].time, "HH:mm", new Date());
    const selectedDateTime = parse(selectedTime, "HH:mm", new Date());
    const difference = Math.abs(
      differenceInMinutes(selectedDateTime, scheduleTime)
    );
    setIsAvailable(difference > 239);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isNotWeekend = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const fetchSchedules = async (formatedMonth: string) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/schedule?month=${formatedMonth}`
      );
      const data = await res.json();
      console.log(data);
      setSchedules(data);
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message);
    }
  };

  useEffect(() => {
    const formatedMonth = format(month, "yyyyMM");
    fetchSchedules(formatedMonth);
  }, [month]);

  useEffect(() => {
    checkAvailable();
  }, [selectedTime]);

  return (
    <div className="app-container">
      <h1 className="text-lg font-semibold mb-4">스케줄</h1>
      <div className="w-full max-w-[480px] flex flex-col  items-center">
        <DayPicker
          locale={ko}
          mode="single"
          selected={selectedDate}
          onDayClick={checkSchedule}
          disabled={[{ before: today }, isNotWeekend]}
          captionLayout="dropdown"
          startMonth={new Date()}
          endMonth={new Date(2025, 11)}
          month={month}
          onMonthChange={setMonth}
        />
        {selectedDate && (
          <div className="w-full px-1 my-4 font-semibold">
            <p>{format(selectedDate, "yyyy년 M월 d일 eeee", { locale: ko })}</p>
          </div>
        )}

        <ul className="flex flex-col gap-2 mb-6">
          {sortedData?.map((item) => (
            <li
              key={item.id}
              className="w-[320px] flex mx-auto text-white rounded-lg px-4 py-2 bg-rose-300"
            >
              <div className="w-full flex justify-between gap-2 text-sm">
                <div className="flex m-0">
                  <span className="m-0">{item.time}</span>
                  <span className="mx-2">{item.userName}</span>
                </div>
                <span className="m-0">{item.venue}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="w-full max-w-[320px]">
          <p className="font-semibold">스케줄 시간</p>
          <div className="mb-2">
            <input
              type="text"
              placeholder="스케줄 내용"
              className="mt-1 block mb-2 w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <TimePicker setSelectedTime={setSelectedTime} />
          <button
            disabled={schedule?.length === 2 || !isAvailable}
            className={`mt-2 p-3 font-semibold text-white rounded-lg w-full bg-blue-400 disabled:bg-gray-300
      }`}
          >
            스케줄 저장
          </button>
        </div>
      </div>
    </div>
  );
}
