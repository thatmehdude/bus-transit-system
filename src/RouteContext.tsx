import { useContext, createContext, useState, type ReactNode } from "react";


type Route = {
    id: string;
    name: string;
    schedule: string[];
    status: 'on-time' | 'delayed' | 'cancelled';
}

type Alert = {
    id: string;
    message: string;
    severity: 'warning' | 'critical';
}

type RouteContextType = {
    routes: Route[];
    favourites: string[];
    alerts: Alert[];
    toggleFavorite: (routeId: string) => void;
    refreshArrivalTimes: () => void;
    addAlert: (message: string, severity: 'warning' | 'critical') => void;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const useRoute = () => {
    const context = useContext(RouteContext);
    if (context === undefined) {
        throw new Error("useRoute must be within a Route provider");
    }
    return context;
}

type RouteProviderProps = {
    children: ReactNode;
}

export const RouteProvider: React.FC<RouteProviderProps> = ({children}) => {
    const [routes, setRoutes] = useState<Route[]>([
        {
            id: "blue-line",
            name: "Blue Line Subway",
            schedule: ["08:15", "08:30", "08:45"],
            status: "on-time"
        },
        {
            id: "bus-101",
            name: "Bus 101 Downtown",
            schedule: ["08:20", "08:35", "08:50"],
            status: "delayed"
        }
    ]);
    const [favourites, setFavourites] = useState<string[]>([]);
    const [alerts, setAlerts] = useState<Alert[]>([]);

    const toggleFavorite = (routeId: string) => {
        setFavourites((prev) =>
            prev.includes(routeId)
                ? prev.filter((id) => id !== routeId)
                : [...prev, routeId]
        );
    };

    const refreshArrivalTimes = () => {
        // Placeholder for refreshing logic
    };

    const addAlert = (message: string, severity: "warning" | "critical") => {
      const newAlert: Alert = {
        id: Date.now().toString(),
        message,
        severity,
      };
      setAlerts((prev) => [...prev, newAlert]);
    };

    return (
        <RouteContext.Provider
            value={{
                routes,
                favourites,
                alerts,
                toggleFavorite,
                refreshArrivalTimes,
                addAlert
            }}
        >
            {children}
        </RouteContext.Provider>
    );
}