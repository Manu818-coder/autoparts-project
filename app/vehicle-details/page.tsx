import { Suspense } from 'react';
import VehicleDetailsComponent from './VehicleDetailsComponent';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading vehicle details...</div>}>
      <VehicleDetailsComponent />
    </Suspense>
  );
}
