"use client";
import React, { useState } from "react";

export default function VinLookup() {
  const [vin, setVin] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = async () => {
    if (vin.length < 5) {
      setError("Please enter a valid VIN (at least 5 characters)");
      return;
    }

    setError("");
    setLoading(true);
    setData([]);

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

  const filteredData = data.filter((item) => {
    const rawVal = item.Value || "";
    const val = rawVal.trim().toLowerCase();
    const label = item.Variable?.trim().toLowerCase() || "";

    const excludedValues = new Set([
      "", "n/a", "not applicable", "null", "na", "n.a.", "-", "n.a", "none"
    ]);

    const excludedLabels = new Set([
      "note", "series2", "trim2", "suggested vin", "other trailer info",
      "other motorcycle info", "other battery info", "pretensioner"
    ]);

    return !excludedValues.has(val) && !excludedLabels.has(label);
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">VIN Lookup</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={vin}
          onChange={(e) => setVin(e.target.value.toUpperCase())}
          placeholder="Enter VIN number"
          className="px-4 py-2 border rounded w-full"
        />
        <button
          onClick={() => {
            if (vin.length < 5) {
              setError("Please enter a valid VIN (at least 5 characters)");
              return;
            }
            window.open(`/vehicle-details?vin=${vin}`, "_blank");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Lookup
        </button>
      </div>

      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {filteredData.length > 0 && (
        <div className="bg-white rounded shadow p-4 mt-4 max-h-[500px] overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left border-b p-2">Label</th>
                <th className="text-left border-b p-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, idx) => (
                <tr key={idx}>
                  <td className="border-b p-2 font-medium">{item.Variable}</td>
                  <td className="border-b p-2">{item.Value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
