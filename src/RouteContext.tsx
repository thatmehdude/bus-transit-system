import { useContext, createContext, useState, type ReactNode } from "react";
import { mockRoutes } from "./mockData";


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

type RouteContextType = {
    routes: Route[];
    favourites: string[];
    alerts: Alert[];
    toggleFavorite: (routeId: string) => void;
    refreshArrivalTimes: () => void;
    addAlert: (message: string, severity: 'warning' | 'critical') => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
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
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleFavorite = (routeId: string) => {
        setFavourites((prev) =>
            prev.includes(routeId)
                ? prev.filter((id) => id !== routeId)
                : [...prev, routeId]
        );
    };

    const refreshArrivalTimes = () => {
        const updatedRoutes = routes.map((route) => ({
            ...route,
            schedule: route.schedule.map((_, i) => {
                const hour = 6 + i * 2;
                return `${hour.toString().padStart(2, "0")}:00`;
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

    const value = {
      routes,
      favourites,
      alerts,
      toggleFavorite,
      refreshArrivalTimes,
      addAlert,
      searchQuery,
      setSearchQuery,
    };

    return (
      <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
    );
}