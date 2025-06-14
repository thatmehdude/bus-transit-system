import { useParams } from "react-router-dom";
import { useRouteContext } from "../RouteContext";

const RouteDetailPage = () => {
  const { routes } = useRouteContext();
  const { routeId } = useParams();
  const route = routes.find((r) => r.id === routeId);

  if (!route) return <div>Route not found</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{route.name}</h2>
      <p>Status: {route.status}</p>
      <h3>Schedule:</h3>
      <ul>
        {route.schedule.map((time, idx) => (
          <li key={idx}>{time}</li>
        ))}
      </ul>
    </div>
  );
};

export default RouteDetailPage;
