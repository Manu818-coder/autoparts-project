// app/vehicle-details/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VehicleDetails() {
  const searchParams = useSearchParams();
  const vin = searchParams.get("vin");

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!vin) {
      setError("VIN not provided.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`
        );
        const json = await res.json();
        setData(json.Results);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [vin]);

  if (loading) return <div className="p-6 text-xl">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Vehicle Details</h1>
      <table className="w-full text-sm bg-white rounded shadow p-4 mt-4 max-h-[600px] overflow-auto">
        <thead>
          <tr>
            <th className="text-left border-b p-2">Label</th>
            <th className="text-left border-b p-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) => item.Value && item.Value !== "Not Applicable")
            .map((item, idx) => (
              <tr key={idx}>
                <td className="border-b p-2 font-medium">{item.Variable}</td>
                <td className="border-b p-2">{item.Value}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
