import { useState } from "react";
import { useRouteContext } from "../RouteContext";

const AlertsPage = () => {
  const { alerts, addAlert } = useRouteContext();
  const [newMessage, setNewMessage] = useState("");
  const [newSeverity, setNewSeverity] = useState<"warning" | "critical">(
    "warning"
  );
  const [showForm, setShowForm] = useState(false);


  const sortedAlerts = [...alerts].sort((a, b) => {
    if (a.severity === "critical" && b.severity === "warning") return -1;
    if (a.severity === "warning" && b.severity === "critical") return 1;
    return 0;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      addAlert(newMessage.trim(), newSeverity);
      setNewMessage("");
      setNewSeverity("warning");
      setShowForm(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Alerts Center</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="new-alert-btn"
        >
          + New Alert
        </button>
      </div>

      {showForm && (
        <div className="alert-form-container">
          <form onSubmit={handleSubmit} className="alert-form">
            <h3>Report New Alert</h3>
            <div className="form-group">
              <label htmlFor="message">Alert Message:</label>
              <textarea
                id="message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Describe the service issue..."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="severity">Severity:</label>
              <select
                id="severity"
                value={newSeverity}
                onChange={(e) =>
                  setNewSeverity(e.target.value as "warning" | "critical")
                }
              >
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Submit Alert
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="alerts-list">
        {sortedAlerts.length === 0 ? (
          <div className="empty-state">
            <p>No active alerts</p>
          </div>
        ) : (
          sortedAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`alert-item ${
                alert.severity === "critical"
                  ? "alert-critical"
                  : "alert-warning"
              }`}
            >
              <div className="alert-severity">
                {alert.severity === "critical" ? "🚨" : "⚠️"}
                <span className="severity-text">
                  {alert.severity.toUpperCase()}
                </span>
              </div>
              <div className="alert-message">{alert.message}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertsPage;
