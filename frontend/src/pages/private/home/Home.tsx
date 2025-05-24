
import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <h1>Rotas</h1>

      <ul>
        <li>
          <Link to="/auth/signin">Login</Link>
        </li>
        <li>
          <Link to="/auth/signup">Register</Link>
        </li>
        <li>
          <Link to="/wellcome">Wellcome</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
      </ul>
    </>
  );
}
