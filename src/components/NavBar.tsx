import { Link } from "react-router-dom";
import { useRouteContext } from "../RouteContext";

export const Navbar = () => {
  const { favourites, searchQuery, setSearchQuery, alerts } = useRouteContext();
  const criticalAlerts = alerts.filter((alert) => alert.severity === 'critical').length;

  return (
    <nav className="nav-bar">
      <div className="nav-links">
        <Link to="/" className="nav-link">Routes</Link>
        <Link to="/favourites" className="nav-link">
          Favorites ({favourites.length})
        </Link>
        <Link to="/alerts" className="nav-link">
          Alerts {criticalAlerts > 0 && <span className="alert-badge">{criticalAlerts}</span>}
        </Link>
        <Link to="/stops" className="nav-link">Stop Lookup</Link>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search routes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
    </nav>
  );
};
