import { Link } from "react-router-dom";
import { useRouteContext } from "../RouteContext";

const HomePage = () => {
  const { routes, toggleFavorite, favourites, searchQuery } = useRouteContext();

  const filteredRoutes = routes.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "1rem" }}>
      <h2>All Bus Routes</h2>
      <ul>
        {filteredRoutes.map((route) => (
          <div key={route.id}>
            <li>
              <Link to={`/routes/${route.id}`}>{route.name}</Link> -{" "}
              {route.status}
              <button onClick={() => toggleFavorite(route.id)}>
                {favourites.includes(route.id) ? "★ Unfavorite" : "☆ Favorite"}
              </button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
