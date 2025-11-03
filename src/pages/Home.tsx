import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../appStore/productSlice";
import type { RootState, AppDispatch } from "../appStore/store";
import Card from "../components/Card";
import Loader from "../components/Loader";

/**
 * Renders the main Home component for displaying the product catalog.
 * Parameters: None.
 * This component fetches product data using React Query, synchronizes it with Redux, applies filtering/sorting based on Redux state, and handles pagination.
 */
const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, searchQuery, categoryFilter, sortOption } = useSelector(
    (state: RootState) => state.product
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchProducts = async () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const res = await fetch(`${baseUrl}/products?limit=30`);
    const data = await res.json();
    return data.products;
  };

  //react query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (data) dispatch(setProducts(data));
  }, [data, dispatch]);

  //search filtring sorting
  let filteredProducts = [...products];

  if (searchQuery) {
    filteredProducts = filteredProducts.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (categoryFilter && categoryFilter !== "All") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category?.toLowerCase() === categoryFilter.toLowerCase()
    );
  }

  if (sortOption === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "title") {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
  }

  // pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading) return <Loader />;

  if (isError)
    return (
      <p className="text-center text-red-400 mt-20 text-lg">
        Error fetching products!
      </p>
    );

  return (
    <div className="p-6 text-white min-h-screen bg-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>

      {paginatedProducts.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No products found!</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {paginatedProducts.map((product) => (
              <Card key={product.id} {...product} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white">
              Previous
            </button>

            <span className="text-lg">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
