import { Route, Routes } from "react-router";
import AuthLayout from "./layouts/Auth";
import Login from "./pages/public/login/login";
import Home from "./pages/private/home/home";
import Register from "./pages/public/register/register";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />

      <Route path="auth" element={<AuthLayout />}>
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
