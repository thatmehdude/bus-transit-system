import { Link } from "react-router-dom";
import { useRouteContext } from "../RouteContext";

const FavoritesPage = () => {
  const { favourites, routes, toggleFavorite, getNextArrival } = useRouteContext();
  const favoriteRoutes = routes.filter((r) => favourites.includes(r.id));

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'on-time': return 'status-on-time';
      case 'delayed': return 'status-delayed';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  return (
    <div className="page-container">
      <h2>Favorites Dashboard</h2>
      
      {favoriteRoutes.length === 0 ? (
        <div className="empty-state">
          <p>No favorite routes yet!</p>
          <Link to="/" className="cta-link">Browse routes to add favorites</Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favoriteRoutes.map((route) => (
            <div key={route.id} className="favorite-card">
              <div className="route-header">
                <Link to={`/routes/${route.id}`} className="route-name">
                  {route.name}
                </Link>
                <button 
                  onClick={() => toggleFavorite(route.id)}
                  className="favorite-btn favorited"
                >
                  ★
                </button>
              </div>
              
              <div className={`status-indicator ${getStatusClass(route.status)}`}>
                {route.status.replace('-', ' ').toUpperCase()}
              </div>
              
              <div className="next-arrival">
                <span className="next-label">Next arrival:</span>
                <span className="next-time highlighted">
                  {getNextArrival(route.schedule)}
                </span>
              </div>
              
              <div className="upcoming-times">
                <span className="upcoming-label">Upcoming:</span>
                <div className="times">
                  {route.schedule.slice(1, 4).map((time, idx) => (
                    <span key={idx} className="time">{time}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;