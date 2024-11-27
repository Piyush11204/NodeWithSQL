// /src/pages/SearchSchools.js
import { useState } from 'react';
import { getSchools } from '../api/SchoolApi';
import SchoolCard from '../components/SchoolCard';

const SearchSchools = () => {
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    if (!location.latitude || !location.longitude) {
      setError('Please enter both latitude and longitude.');
      return;
    }
    try {
      setError('');
      const response = await getSchools(location.latitude, location.longitude);
      setSchools(response);
    } catch (err) {
      setError('Error fetching schools: ' + err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Schools</h1>
      <div className="space-y-4">
        <input
          type="number"
          name="latitude"
          value={location.latitude}
          onChange={handleChange}
          placeholder="Your Latitude"
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="longitude"
          value={location.longitude}
          onChange={handleChange}
          placeholder="Your Longitude"
          className="border p-2 w-full"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
          Search Schools
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {schools.length > 0 ? (
          schools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))
        ) : (
          <p>No schools found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchSchools;
