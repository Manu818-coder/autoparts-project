'use client'; // 👈 Important to make this a client component

import { useSearchParams } from 'next/navigation';

export default function VehicleDetailsComponent() {
  const searchParams = useSearchParams();
  const vin = searchParams.get('vin');

  return (
    <div>
      <h1>Vehicle Details</h1>
      <p>VIN: {vin}</p>
    </div>
  );
}
