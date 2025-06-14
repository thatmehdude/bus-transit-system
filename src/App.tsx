import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/NavBar"
import { RouteProvider } from "./RouteContext"
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/Favourites";
import RouteDetailPage from "./pages/RouteDetail";
function App() {

  return (
    <>
      <RouteProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/favourites" element={<FavoritesPage />}/>
            <Route path="/routes/:routeId" element={<RouteDetailPage />}/>
          </Routes>
        </BrowserRouter>
      </RouteProvider>
    </>
  );
}

export default App
