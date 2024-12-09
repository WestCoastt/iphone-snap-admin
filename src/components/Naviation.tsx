import { useNavigate, useLocation } from "react-router-dom";
import listIcon from "../assets/list.svg";
import calendarIcon from "../assets/calendar.svg";
import messageIcon from "../assets/message.svg";

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const hideNavigation = ["/", "/login"].includes(location.pathname);

  const navItems = [
    { path: "/reservations", icon: listIcon, label: "예약" },
    { path: "/schedule", icon: calendarIcon, label: "스케줄" },
    { path: "/message", icon: messageIcon, label: "메시지" },
  ];

  return (
    <nav
      className={`${
        hideNavigation && "hidden"
      } fixed bottom-0 left-0 right-0 bg-white border-t`}
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={"flex flex-col items-center p-2"}
          >
            <img src={item.icon} alt={item.label} className="w-8 h-8 mb-1" />
          </button>
        ))}
      </div>
    </nav>
  );
}
