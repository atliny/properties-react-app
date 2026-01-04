import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchPage from "./SearchPage";
import ResultsPage from "./ResultsPage";
import PropertyPage from "./PropertyPage";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/property/:id" element={<PropertyPage />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
