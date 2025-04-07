'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface VehicleDetail {
  Variable: string;
  Value: string;
}

export default function VehicleDetailsComponent() {
  const searchParams = useSearchParams();
  const vin = searchParams.get('vin');

  const [vehicleData, setVehicleData] = useState<VehicleDetail[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vin) {
      setLoading(true);
      fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`)
        .then(res => res.json())
        .then(data => {
          console.log('Fetched data:', data); // 🔍 Show in console what's coming
          setVehicleData(data.Results || []);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [vin]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Vehicle Details</h1>
      {vin && <p className="mb-4">VIN: {vin}</p>}
      {loading ? (
        <p>Loading vehicle data...</p>
      ) : (
        <div className="grid gap-2">
          {vehicleData.map((item, index) => (
            <div key={index}>
              <strong>{item.Variable}:</strong> {item.Value || 'N/A'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
