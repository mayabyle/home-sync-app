import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Chores from "./pages/Chores";
import Plants from "./pages/Plants";
import Market from "./pages/Market";
import Calendar from "./pages/CalendarPage.jsx";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss"

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  { path: "/", element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/chores", element: <Chores /> },
      { path: "/calendar", element: <Calendar /> },
      { path: "/plants", element: <Plants /> },
      { path: "/market", element: <Market /> },
    ] 
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> }
])

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/> 
      </div>
    </div>
  );
}

export default App;