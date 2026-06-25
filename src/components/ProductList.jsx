import { useState } from "react";
import OffsetPagination from "./OffsetPagination";
import CursorPagination from "./CursorPanigation";

export default function ProductList() {
  const tabs = ["offset", "cursor"];

  const [selectedTab, setSelectedTab] = useState("cursor");

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-6">
        <h1 className="text-4xl font-bold text-center mb-8">
          Pagination Comparison
        </h1>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                selectedTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white border hover:bg-gray-100"
              }`}
            >
              {tab === "offset" ? "Offset Pagination" : "Cursor Pagination"}
            </button>
          ))}
        </div>

        {/* Selected Component */}
        <div>
          {selectedTab === "offset" ? (
            <OffsetPagination />
          ) : (
            <CursorPagination />
          )}
        </div>
      </div>
    </div>
  );
}
