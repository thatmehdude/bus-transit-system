import { useParams, Link } from "react-router-dom";
import { useRouteContext } from "../RouteContext";
import "../styles/route-detail.css"

const RouteDetailPage = () => {
  const { routes, favourites, toggleFavorite } = useRouteContext();
  const { routeId } = useParams();
  const route = routes.find((r) => r.id === routeId);

  if (!route) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>Route not found</h2>
          <Link to="/" className="cta-link">← Back to Routes</Link>
        </div>
      </div>
    );
  }

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
      <div className="route-detail">
        <div className="route-detail-header">
          <Link to="/" className="back-link">← Back to Routes</Link>
          <button 
            onClick={() => toggleFavorite(route.id)}
            className={`favorite-btn large ${favourites.includes(route.id) ? 'favorited' : ''}`}
          >
            {favourites.includes(route.id) ? '★ Favorited' : '☆ Add to Favorites'}
          </button>
        </div>

        <div className="route-detail-content">
          <h1 className="route-title">{route.name}</h1>
          
          <div className={`status-indicator large ${getStatusClass(route.status)}`}>
            {route.status.replace('-', ' ').toUpperCase()}
          </div>

          <div className="schedule-section">
            <h3>Full Schedule</h3>
            <div className="schedule-grid">
              {route.schedule.map((time, idx) => (
                <div key={idx} className="schedule-time">
                  {time}
                </div>
              ))}
            </div>
          </div>

          {route.status === 'delayed' && (
            <div className="service-notice warning">
              <h4>Service Notice</h4>
              <p>This route is currently experiencing delays. Please allow extra travel time.</p>
            </div>
          )}

          {route.status === 'cancelled' && (
            <div className="service-notice critical">
              <h4>Service Alert</h4>
              <p>This route is currently cancelled. Please check for alternative routes or service updates.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RouteDetailPage;