import { useEffect, useState } from "react";

export default function CursorPagination() {
  const [products, setProducts] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = ["Electronics", "Books", "Fashion", "Sports", "Home"];

  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchFirstPage = async () => {
    try {
      setLoading(true);

      let url = `${import.meta.env.VITE_BACKEND_URL}/api/products/cursor?limit=20`;

      if (selectedCategory) {
        url += `&category=${encodeURIComponent(selectedCategory)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setProducts(data.products);
      setNextCursor(data.nextCursor);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPage = async () => {
    if (!nextCursor) return;

    try {
      setLoading(true);

      let url =
        `${import.meta.env.VITE_BACKEND_URL}/as?` +
        `limit=20` +
        `&cursorUpdatedAt=${encodeURIComponent(nextCursor.updated_at)}` +
        `&cursorId=${nextCursor.id}`;

      if (selectedCategory) {
        url += `&category=${encodeURIComponent(selectedCategory)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setProducts(data.products);
      setNextCursor(data.nextCursor);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFirstPage();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

        <h2 className="text-2xl font-semibold">Loading Products...</h2>

        <p className="text-gray-500">Please wait while we fetch data.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex flex-col justify-center text-center mb-8">
        <h1 className="text-4xl font-bold ">Cursor Pagination</h1>
        <p>cursor pagination is the best </p>
      </div>

      <div className="flex justify-center mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-4 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl shadow-sm hover:shadow-lg transition p-5"
          >
            <h2 className="text-lg font-semibold">{product.name}</h2>

            <p className="text-blue-600 mt-2">Category: {product.category}</p>

            <p className="text-green-600 font-semibold mt-2">
              ₹{product.price}
            </p>

            <p className="text-gray-500 text-sm mt-2">
              Product ID: {product.id}
            </p>

            <p className="text-gray-400 text-xs mt-1">
              Updated:
              <br />
              {new Date(product.updated_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={fetchNextPage}
          disabled={!nextCursor}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:bg-gray-300"
        >
          {nextCursor ? "Next Page" : "No More Products"}
        </button>
      </div>

      {nextCursor && (
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Current Cursor</p>

          <p>ID : {nextCursor.id}</p>

          <p>{nextCursor.updated_at}</p>
        </div>
      )}
    </div>
  );
}
