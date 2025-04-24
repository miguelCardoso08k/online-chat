import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <h1>Hello World</h1>

      <ul>
        <li>
          <Link to="/auth/signin">Login</Link>
        </li>
        <li>
          <Link to="/auth/signup">Register</Link>
        </li>
      </ul>
    </>
  );
}
