import { Link } from "react-router-dom";
import { useRouteContext } from "../RouteContext";

const FavoritesPage = () => {
  const { favourites, routes, toggleFavorite } = useRouteContext();
  const favoriteRoutes = routes.filter((r) => favourites.includes(r.id));

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Your Favorite Routes</h2>
      {favoriteRoutes.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        <ul>
          {favoriteRoutes.map((route) => (
            <div key={route.id}>
              <li>
                <Link to={`/routes/${route.id}`}>{route.name}</Link>
                <button onClick={() => toggleFavorite(route.id)}>
                  ★ Unfavorite
                </button>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
