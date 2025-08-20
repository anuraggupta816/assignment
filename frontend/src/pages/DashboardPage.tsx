import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get("/portfolio")
      .then((res) => {
        console.log("API response:", res?.data);
        setData(res?.data || {});
      })
      .catch((e) =>
        setError(e?.response?.data?.message || "Failed to load overview")
      );
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">Overview</h3>
      <div className="flex flex-wrap gap-6 mb-6">
        <Card
          title="Total Current Value"
          value={`$${Number(data.totalCurrent).toFixed(2)}`}
        />
        <Card
          title="Total Purchase"
          value={`$${Number(data.totalPurchase).toFixed(2)}`}
        />
        <Card
          title="Performance"
          value={`${Number(data.performance).toFixed(2)}%`}
        />
      </div>

      <h4 className="text-lg font-medium mb-4">By Asset Type</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries<any>(data.byType).map(([type, vals]) => (
          <Card
            key={type}
            title={type}
            value={`$${vals.totalCurrent.toFixed(
              2
            )} (cost $${vals.totalPurchase.toFixed(2)})`}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="text-sm text-gray-500 mb-2">{title}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}
