import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // 세션 ID는 서버에서 Set-Cookie 헤더를 통해 자동으로 저장됨
        navigate("/");
      } else {
        alert("로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="app-container flex flex-col">
      <div className="w-full max-w-[480px] px-6">
        <h1 className="mb-12 text-2xl font-bold text-center">로그인</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="text-left">
            <label className="block mb-1">아이디</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="text-left">
            <label className="block mb-1">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 text-white font-semibold bg-blue-400 rounded-lg"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
