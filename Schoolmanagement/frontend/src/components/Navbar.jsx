// /src/components/Navbar.js
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold text-lg">
          School Management
        </Link>
        <div className="space-x-4">
          <Link to="/add-school" className="hover:underline">Add School</Link>
          <Link to="/search-schools" className="hover:underline">Search Schools</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
