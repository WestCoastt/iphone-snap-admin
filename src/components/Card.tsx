interface CardProps {
  reservationStatus: "예약완료" | "잔금완료" | "촬영완료" | "취소"; // 예약 상태 타입 정의
}

export default function Card({ reservationStatus }: CardProps) {
  return (
    <div className="w-full flex mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div
        className={`w-2 m-0 rounded-md ${
          reservationStatus === "예약완료"
            ? "bg-yellow-300"
            : reservationStatus === "잔금완료"
            ? "bg-blue-300"
            : reservationStatus === "촬영완료"
            ? "bg-green-300"
            : reservationStatus === "취소"
            ? "bg-red-300"
            : ""
        }`}
      ></div>
      <div className="w-full px-5 py-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold">
            이보라{" "}
            <span className="text-sm font-medium text-gray-700">신부님</span>
          </h2>
          <h3 className="text-lg font-semibold">프리미엄</h3>
        </div>
        <div className="mt-4 flex justify-between">
          <p className="text-sm text-gray-500">25.09.07(토) 17:00</p>
          <p className="text-sm text-gray-600">MJ컨벤션 다이너스티홀</p>
        </div>
      </div>
    </div>
  );
}
