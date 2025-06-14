import { useContext, createContext, useState, type ReactNode } from "react";
import { mockAlerts, mockRoutes, mockStops } from "./mockData";


type Route = {
    id: string;
    name: string;
    schedule: string[];
    status: "on-time" | "delayed" | "cancelled";
}

type Alert = {
    id: string;
    message: string;
    severity: 'warning' | 'critical';
}

type Stop = {
    id: string;
    name: string;
    routes: string[];
}

type RouteContextType = {
    routes: Route[];
    favourites: string[];
    alerts: Alert[];
    stops: Stop[];
    toggleFavorite: (routeId: string) => void;
    refreshArrivalTimes: () => void;
    addAlert: (message: string, severity: 'warning' | 'critical') => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    getNextArrival: (schedule: string[]) => string;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const useRouteContext = () => {
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
    const [routes, setRoutes] = useState<Route[]>(mockRoutes);
    const [favourites, setFavourites] = useState<string[]>([]);
    const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
    const [searchQuery, setSearchQuery] = useState("");
    const [stops] = useState<Stop[]>(mockStops);

    const toggleFavorite = (routeId: string) => {
        setFavourites((prev) =>
            prev.includes(routeId)
                ? prev.filter((id) => id !== routeId)
                : [...prev, routeId]
        );
    };

    const refreshArrivalTimes = () => {
        const now = new Date();
        const currentHour = now.getHours();

        const updatedRoutes = routes.map((route) => ({
            ...route,
            schedule: route.schedule.map((_, i) => {
                const hour = Math.max(currentHour, 6 + i * 2);
                const minute = Math.floor(Math.random() * 60);
                return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
            }),
        }));
        setRoutes(updatedRoutes);
    };

    const addAlert = (message: string, severity: "warning" | "critical") => {
      const newAlert: Alert = {
        id: Date.now().toString(),
        message,
        severity,
      };
      setAlerts((prev) => [...prev, newAlert]);
    };

    const getNextArrival = (schedule: string[]): string => {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        for (const time of schedule) {
            const [hours, minutes] = time.split(":").map(Number);
            const scheduleTime = hours * 60 + minutes;
            if (scheduleTime > currentTime) {
                return time;
            }
        }
        return schedule[0] || 'no more arrivals today';
    }

    const value = {
      routes,
      favourites,
      alerts,
      stops,
      toggleFavorite,
      refreshArrivalTimes,
      addAlert,
      searchQuery,
      setSearchQuery,
      getNextArrival,
    };

    return (
      <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
    );
}