import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function TransactionsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [investments, setInvestments] = useState<any[]>([]);
  const [form, setForm] = useState({
    investment_id: "",
    type: "buy",
    quantity: "",
    price: "",
  } as any);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const [tx, inv] = await Promise.all([
        api.get("/transactions"),
        api.get("/investments"),
      ]);
      setItems(tx?.data.items);
      setInvestments(inv?.data.investments);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to load transactions");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await api.post("/transactions", {
        investment_id: Number(form.investment_id),
        type: form.type,
        quantity: Number(form.quantity),
        price: Number(form.price),
      });
      setForm({ investment_id: "", type: "buy", quantity: "", price: "" });
      await load();
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to create transaction");
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-blue-900">Transactions</h3>

      {/* Form */}
      <form
        onSubmit={submit}
        className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6 items-end"
      >
        <div>
          <label className="block text-gray-700 mb-1">Investment</label>
          <select
            value={form.investment_id}
            onChange={(e) =>
              setForm({ ...form, investment_id: e.target.value })
            }
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Investment</option>
            {investments.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Quantity</label>
          <input
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Price</label>
          <input
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded transition"
          >
            Add
          </button>
        </div>
      </form>

      {/* Error */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="text-left px-4 py-2">Investment</th>
              <th className="text-left px-4 py-2">Type</th>
              <th className="text-right px-4 py-2">Qty</th>
              <th className="text-right px-4 py-2">Price</th>
              <th className="text-right px-4 py-2">When</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr
                key={it.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-2">{it.investment?.name}</td>
                <td className="px-4 py-2">{it.type}</td>
                <td className="px-4 py-2 text-right">{Number(it.quantity)}</td>
                <td className="px-4 py-2 text-right">
                  ${Number(it.price).toFixed(2)}
                </td>
                <td className="px-4 py-2 text-right">
                  {new Date(it.created_at || it.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
