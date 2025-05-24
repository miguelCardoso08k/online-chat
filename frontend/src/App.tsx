import { Route, Routes } from "react-router";
import AuthLayout from "./layouts/Auth";
import Login from "./pages/public/login/login";
import Home from "./pages/private/home/Home";
import Register from "./pages/public/register/register";
import Profile from "./pages/private/profile/Profile";
import Chat from "./pages/private/chat/Chat";
import Search from "./pages/private/search/Search";
import MainLayout from "./layouts/Main";
import CurrentChat from "./pages/private/chat/[id]/CurrentChat";

function App() {
  document.documentElement.classList.add("dark");
  
  return (
    <Routes>
      <Route path="other">
        <Route path="wellcome" element={<Home />}></Route>
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route path="chat" element={<Chat />}></Route>
        <Route path="chat/:id" element={<CurrentChat />}></Route>

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
