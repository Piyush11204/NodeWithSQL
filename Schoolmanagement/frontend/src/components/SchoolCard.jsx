// /src/components/SchoolCard.js
const SchoolCard = ({ school }) => {
    return (
      <div className="border p-4 rounded shadow">
        <h2 className="font-bold text-lg">{school.name}</h2>
        <p>{school.address}</p>
        <p>
          <strong>Distance:</strong> {school.distance.toFixed(2)} km
        </p>
      </div>
    );
  };
  
  export default SchoolCard;
  