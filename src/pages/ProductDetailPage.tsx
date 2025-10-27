import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { ArrowLeft } from "lucide-react";
import Rating from "@mui/material/Rating";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const res = await fetch(`${baseUrl}/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <button
        onClick={() => navigate("/home")}
        className="h-10 w-10 mb-6 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-full"
      >
        <ArrowLeft />
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex flex-col items-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full max-w-md rounded-xl"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
          <p className="text-gray-400 mb-3">{product.description}</p>
          <p className="text-gray-400 text-2xl font-semibold mb-4">
            ${product.price}
          </p>

          <p className="text-sm text-gray-400 mb-1">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="text-sm text-gray-400 mb-1">
            <strong>Brand:</strong> {product.brand}
          </p>
          <p className="text-sm text-gray-400 mb-1">
            <strong>Stock:</strong> {product.stock}
          </p>
          <p className="text-sm text-gray-400 mb-4">
            <strong>Warranty:</strong> {product.warrantyInformation}
          </p>

          {/* Reviews */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Reviews</h2>
              <div className="space-y-4">
                {product.reviews.map((review: any, index: number) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border-b-2 border-zinc-700 flex justify-between"
                  >

                    {/* use of mui */}
                    <span>
                      <Rating
                        name="product-rating"
                        value={review.rating}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                      <p>{review.comment}</p>
                    </span>
                    <p className="text-gray-500 text-sm">
                      ~ {review.reviewerName}
                    </p>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
