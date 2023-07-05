import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";

const HomePage = lazy(() => import("./pages/HomePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const SeriesPage = lazy(() => import("./pages/SeriesPage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const ShowPage = lazy(() => import("./pages/ShowPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
