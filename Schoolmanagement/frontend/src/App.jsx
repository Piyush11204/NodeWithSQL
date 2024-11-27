// /src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddSchool from './Pages/AddSchool';
import SearchSchools from './Pages/SearchSchools';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchSchools />} />
        <Route path="/search-schools" element={<SearchSchools />} />
        <Route path="/add-school" element={<AddSchool />} />

      </Routes>
    </Router>
  );
};

export default App;
