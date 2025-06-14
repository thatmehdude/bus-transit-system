import { Link } from "react-router-dom";
import { useRouteContext } from "../RouteContext";

export const Navbar = () => {
  const { favourites, searchQuery, setSearchQuery } = useRouteContext();

  return (
    <nav className="nav-bar">
      <div>
        <Link to="/">Home</Link> | <Link to="/favourites">Favorites ({favourites.length})</Link>
      </div>
      <input
        type="text"
        placeholder="Search routes"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </nav>
  );
};
