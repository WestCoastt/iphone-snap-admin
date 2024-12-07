import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="app-container px-4">
      <h1 className="mb-4 text-center text-lg font-semibold">대시보드</h1>
      <div className="space-y-3">
        <button
          className="w-full p-4 text-white bg-blue-400 rounded-lg"
          onClick={() => navigate("/reservations")}
        >
          예약현황
        </button>
        <button
          className="w-full p-4 text-white bg-blue-400 rounded-lg"
          onClick={() => navigate("/schedule")}
        >
          스케줄
        </button>
      </div>
    </div>
  );
}
