
import './App.css';
import NewsPage from "./components/NewsPage.jsx"
import SearchPage from "./components/SearchPage.jsx"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (




    <div className="App">
      <Router>

        <Routes>
          <Route path="/" element={<NewsPage />} />
        </Routes>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
        </Routes>


      </Router>

    </div>
  );
}

export default App;
