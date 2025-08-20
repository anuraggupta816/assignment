import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function InvestmentsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    asset_type: "stock",
    purchase_price: "",
    current_value: "",
  } as any);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await api.get("/investments");
      setItems(res?.data.investments);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to load investments");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const payload = {
        name: form.name,
        asset_type: form.asset_type,
        purchase_price: Number(form.purchase_price),
        current_value: Number(form.current_value),
      };

      if (editingId) {
        await api.put(`/investments/${editingId}`, payload);
      } else {
        await api.post("/investments", payload);
      }

      setForm({
        name: "",
        asset_type: "stock",
        purchase_price: "",
        current_value: "",
      });
      setEditingId(null);
      await load();
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to save investment");
    }
  };

  const edit = (it: any) => {
    setEditingId(it.id);
    setForm({
      name: it.name,
      asset_type: it.asset_type,
      purchase_price: it.purchase_price,
      current_value: it.current_value,
    });
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this investment?")) return;
    await api.del(`/investments/${id}`);
    await load();
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-blue-900">Investments</h3>

      {/* Form */}
      <form
        onSubmit={submit}
        className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6 items-end"
      >
        <div className="col-span-1 sm:col-span-1">
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="col-span-1 sm:col-span-1">
          <label className="block text-gray-700 mb-1">Type</label>
          <select
            value={form.asset_type}
            onChange={(e) => setForm({ ...form, asset_type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="stock">Stock</option>
            <option value="bond">Bond</option>
            <option value="mutual_fund">Mutual Fund</option>
          </select>
        </div>

        <div className="col-span-1 sm:col-span-1">
          <label className="block text-gray-700 mb-1">Purchase Price</label>
          <input
            placeholder="Purchase Price"
            value={form.purchase_price}
            onChange={(e) =>
              setForm({ ...form, purchase_price: e.target.value })
            }
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="col-span-1 sm:col-span-1">
          <label className="block text-gray-700 mb-1">Current Value</label>
          <input
            placeholder="Current Value"
            value={form.current_value}
            onChange={(e) =>
              setForm({ ...form, current_value: e.target.value })
            }
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="col-span-1 sm:col-span-1">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded transition"
          >
            {editingId ? "Update" : "Add"}
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
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Type</th>
              <th className="text-right px-4 py-2">Purchase</th>
              <th className="text-right px-4 py-2">Current</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr
                key={it.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-2">{it.name}</td>
                <td className="px-4 py-2">{it.asset_type}</td>
                <td className="px-4 py-2 text-right">
                  ${Number(it.purchase_price).toFixed(2)}
                </td>
                <td className="px-4 py-2 text-right">
                  ${Number(it.current_value).toFixed(2)}
                </td>
                <td className="px-4 py-2 text-right flex gap-2 justify-end">
                  <button
                    onClick={() => edit(it)}
                    className="px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(it.id)}
                    className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
