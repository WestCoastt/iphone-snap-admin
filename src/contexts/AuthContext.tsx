import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/check-auth", {
        credentials: "include", // 쿠키 포함
      });
      setIsAuthenticated(response.ok);
    } catch (error) {
      setIsAuthenticated(false);
      console.log(error);
    }
  };

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// 1. 인증되지 않은 사용자는 자동으로 로그인 페이지로 리다이렉트됩니다.
// 2. 로그인 성공 시 세션 ID가 쿠키에 자동으로 저장됩니다.
// 3. 인증된 사용자만 Main, Reservations, Schedule 페이지에 접근할 수 있습니다.
// 4. 페이지 새로고침 시에도 인증 상태가 유지됩니다.
// 서버 API는 다음 엔드포인트들이 필요합니다:
// POST /api/login: 로그인 처리 및 세션 ID 쿠키 설정
// GET /api/check-auth: 현재 세션의 유효성 확인
// POST /api/logout: 로그아웃 처리 및 세션 삭제
