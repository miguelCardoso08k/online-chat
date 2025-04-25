import { Link } from "react-router";

export default function Chat() {
  return (
    <div>
      <Link to="/">Home</Link>
      <br />
      <Link to="/test/sidebar">Sidebar</Link>
      <h1>Chat page</h1>
    </div>
  );
}
