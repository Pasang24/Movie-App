import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import MoviesPage from "./pages/MoviesPage";
import SeriesPage from "./pages/SeriesPage";
import MoviePage from "./pages/MoviePage";
import ShowPage from "./pages/ShowPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:searchTerm" element={<SearchPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/tv-show" element={<SeriesPage />} />
        <Route path="/movie/:movieId" element={<MoviePage />} />
        <Route path="/tv/:tvShowId" element={<ShowPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
