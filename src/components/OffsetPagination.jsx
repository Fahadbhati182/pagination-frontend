import { useEffect, useState } from "react";

export default function OffsetPagination() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const categories = ["Electronics", "Books", "Fashion", "Sports", "Home"];

  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchProducts = async (pageNumber, category = "") => {
    try {
      setLoading(true);

      let url = `${import.meta.env.VITE_BACKEND_URL}/api/products?page=${pageNumber}&limit=20`;

      if (category) {
        url += `&category=${encodeURIComponent(category)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setProducts(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page, selectedCategory);
  }, [page, selectedCategory]);

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
        <h1 className="text-4xl font-bold ">Offset Pagination</h1>
        <p>
          Offset pagination is not recommended over here because the product
          data is changing over time{" "}
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => {
            setPage(1);
            setSelectedCategory(e.target.value);
          }}
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

      {pagination && (
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            disabled={!pagination.hasPrevPage}
            onClick={() => setPage((prev) => prev - 1)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:bg-gray-300"
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <button
            disabled={!pagination.hasNextPage}
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
