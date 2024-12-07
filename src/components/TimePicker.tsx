import { useEffect, useState } from "react";

const TimePicker = ({
  setSelectedTime,
}: {
  setSelectedTime: (time: string) => void;
}) => {
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");

  // 9시부터 19시까지의 시간 배열 생성
  const hours = Array.from({ length: 11 }, (_, i) =>
    (i + 9).toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 12 }, (_, i) =>
    (i * 5).toString().padStart(2, "0")
  );

  const handleTimeChange = () => {
    setSelectedTime(`${selectedHour}:${selectedMinute}`);
  };

  // useEffect를 사용하여 시간 변경 시 setSelectedTime 호출
  useEffect(() => {
    handleTimeChange();
  }, [selectedHour, selectedMinute]);

  return (
    <div className="flex items-center space-x-2 w-full bg-white rounded-lg pt-2 pb-2">
      <div className="relative flex-grow">
        <select
          value={selectedHour}
          onChange={(e) => setSelectedHour(e.target.value)}
          className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-8"
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <span className="text-gray-700 text-xl font-bold">:</span>
      <div className="relative flex-grow">
        <select
          value={selectedMinute}
          onChange={(e) => setSelectedMinute(e.target.value)}
          className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-8"
        >
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
