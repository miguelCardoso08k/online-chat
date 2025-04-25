import { Route, Routes } from "react-router";
import AuthLayout from "./layouts/Auth";
import Login from "./pages/public/login/login";
import Home from "./pages/private/home/home";
import Register from "./pages/public/register/register";
import Profile from "./pages/private/profile/profile";
import Chat from "./pages/private/chat/chat";
import Search from "./pages/private/search/search";
import MainLayout from "./layouts/Main";

function App() {
  document.documentElement.classList.add("dark");
  return (
    <Routes>
      <Route path="other">
        <Route path="wellcome" element={<Home />}></Route>
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route path="chat" element={<Chat />}></Route>

        <Route path="profile" element={<Profile />}></Route>

        <Route path="search" element={<Search />}></Route>
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="signin" element={<Login />}></Route>
        <Route path="signup" element={<Register />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
