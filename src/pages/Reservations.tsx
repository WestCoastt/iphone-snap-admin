import Card from "../components/Card";

export default function Reservations() {
  return (
    <div className="app-container">
      <h1 className="text-2xl mt-2 mb-2 font-bold md:mb-6">예약현황</h1>
      <div className="w-full max-w-[768px] sticky top-0 bg-white p-4">
        <div className="flex border border-gray-300 rounded-3xl px-2 py-2 mb-4 md:py-3">
          <img
            src="/src/assets/search.svg"
            alt="search"
            className="w-5 mx-2 md:w-6"
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none"
          />
        </div>
        <div className="flex space-x-3 p-1 mb-1 md:space-x-6">
          <button className="text-sm px-[18px] py-1.5 border border-gray-300 rounded-xl md:px-5 md:py-1.5">
            전체
          </button>
          <div className="flex items-center gap-2 m-0">
            <p className="w-2 h-2 rounded-full bg-yellow-300"></p>
            <p className="text-sm">예약완료</p>
          </div>
          <div className="flex items-center gap-2 m-0">
            <p className="w-2 h-2 rounded-full bg-blue-300"></p>
            <p className="text-sm">잔금완료</p>
          </div>
          <div className="flex items-center gap-2 m-0">
            <p className="w-2 h-2 rounded-full bg-green-300"></p>
            <p className="text-sm">촬영완료</p>
          </div>
          <div className="flex items-center gap-2 m-0">
            <p className="w-2 h-2 rounded-full bg-red-300"></p>
            <p className="text-sm">취소</p>
          </div>
        </div>
      </div>
      <div className="space-y-4 md:p-4">
        <Card reservationStatus="예약완료" />
        <Card reservationStatus="잔금완료" />
        <Card reservationStatus="촬영완료" />
        <Card reservationStatus="취소" />
        <Card reservationStatus="예약완료" />
        <Card reservationStatus="잔금완료" />
        <Card reservationStatus="촬영완료" />
        <Card reservationStatus="예약완료" />
        <Card reservationStatus="예약완료" />
        <Card reservationStatus="예약완료" />
        <Card reservationStatus="예약완료" />
        <Card reservationStatus="취소" />
      </div>
    </div>
  );
}
