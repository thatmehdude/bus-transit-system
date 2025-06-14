import { Link } from "react-router-dom";
import { useRouteContext } from "../RouteContext";

const HomePage = () => {
  const { routes, toggleFavorite, favourites, searchQuery, refreshArrivalTimes } = useRouteContext();

  const filteredRoutes = routes.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <div className="page-header">
        <h2>Lagos transit network</h2>
        <button onClick={refreshArrivalTimes} className="refresh-btn">
          Refresh Times
        </button>
      </div>
      
      <div className="routes-grid">
        {filteredRoutes.map((route) => (
          <div key={route.id} className="route-card">
            <div className="route-header">
              <Link to={`/routes/${route.id}`} className="route-name">
                {route.name}
              </Link>
              <button 
                onClick={() => toggleFavorite(route.id)}
                className={`favorite-btn ${favourites.includes(route.id) ? 'favorited' : ''}`}
              >
                {favourites.includes(route.id) ? '★' : '☆'}
              </button>
            </div>
            
            <div className={`status-indicator ${getStatusClass(route.status)}`}>
              {route.status.replace('-', ' ').toUpperCase()}
            </div>
            
            <div className="schedule-preview">
              <span className="next-label">Next arrivals:</span>
              <div className="times">
                {route.schedule.slice(0, 3).map((time, idx) => (
                  <span key={idx} className="time">{time}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;