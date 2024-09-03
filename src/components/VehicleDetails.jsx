import React, { useState } from 'react';

const VehicleDetails = ({ vehicle }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${vehicle.title}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDetails(data);
    } catch (err) {
      setError('Failed to fetch vehicle details.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 onClick={handleClick} className="text-2xl font-bold cursor-pointer">
        {vehicle.title}
      </h3>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {details && (
        <div className="mt-4">
          <h4 className="text-xl font-semibold">{details.title}</h4>
          <p>{details.extract}</p>
        </div>
      )}
    </div>
  );
};

export default VehicleDetails;
