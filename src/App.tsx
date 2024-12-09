import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Schedule from "./pages/Schedule";
import Reservations from "./pages/Reservations";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Navigation from "./components/Naviation";
// import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Main />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/schedule" element={<Schedule />} />
        {/* <Route
            path="/*"
            element={<PrivateRoute element={<Main />} />}
          />
          <Route
            path="/reservations"
            element={<PrivateRoute element={<Reservations />} />}
          />
          <Route
            path="/schedule"
            element={<PrivateRoute element={<Schedule />} />}
          /> */}
      </Routes>
      <Navigation />
    </Router>
  );
}

export default App;
