import { useState } from "react";
import { useRouteContext } from "../RouteContext";

const StopLookupPage = () => {
  const { stops, routes } = useRouteContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStop, setSelectedStop] = useState<string | null>(null);

  const filteredStops = stops.filter((stop) =>
    stop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRouteInfo = (routeId: string) => {
    return routes.find((route) => route.id === routeId);
  };

  const getNext3Arrivals = (routeIds: string[]) => {
    const allArrivals: { time: string; routeName: string; status: string }[] =
      [];

    routeIds.forEach((routeId) => {
      const route = getRouteInfo(routeId);
      if (route) {
        route.schedule.forEach((time) => {
          allArrivals.push({
            time,
            routeName: route.name,
            status: route.status,
          });
        });
      }
    });

    // Sort by time and return first 3
    return allArrivals
      .sort((a, b) => {
        const timeA = a.time.split(":").map(Number);
        const timeB = b.time.split(":").map(Number);
        const minutesA = timeA[0] * 60 + timeA[1];
        const minutesB = timeB[0] * 60 + timeB[1];
        return minutesA - minutesB;
      })
      .slice(0, 3);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "on-time":
        return "status-on-time";
      case "delayed":
        return "status-delayed";
      case "cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  return (
    <div className="page-container">
      <h2>Stop Lookup</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a stop..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input large"
        />
      </div>

      <div className="stops-section">
        {searchQuery && (
          <div className="stops-list">
            <h3>Matching Stops:</h3>
            {filteredStops.length === 0 ? (
              <p className="no-results">
                No stops found matching "{searchQuery}"
              </p>
            ) : (
              filteredStops.map((stop) => (
                <div
                  key={stop.id}
                  className={`stop-item ${
                    selectedStop === stop.id ? "selected" : ""
                  }`}
                  onClick={() =>
                    setSelectedStop(selectedStop === stop.id ? null : stop.id)
                  }
                >
                  <h4 className="stop-name">{stop.name}</h4>
                  <p className="routes-served">
                    Routes:{" "}
                    {stop.routes
                      .map((routeId) => {
                        const route = getRouteInfo(routeId);
                        return route ? route.name : routeId;
                      })
                      .join(", ")}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {selectedStop && (
          <div className="arrivals-section">
            <h3>Next 3 Arrivals</h3>
            {(() => {
              const stop = stops.find((s) => s.id === selectedStop);
              if (!stop) return null;

              const next3 = getNext3Arrivals(stop.routes);

              return next3.length === 0 ? (
                <p>No upcoming arrivals</p>
              ) : (
                <div className="arrivals-list">
                  {next3.map((arrival, index) => (
                    <div key={index} className="arrival-item">
                      <div className="arrival-time">{arrival.time}</div>
                      <div className="arrival-route">{arrival.routeName}</div>
                      <div
                        className={`arrival-status ${getStatusClass(
                          arrival.status
                        )}`}
                      >
                        {arrival.status.replace("-", " ").toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default StopLookupPage;
