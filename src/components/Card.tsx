import React from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

const Card: React.FC<CardProps> = ({ id, title, description, price, thumbnail }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="bg-zinc-900 rounded-xl p-4 shadow-lg hover:scale-105 transition cursor-pointer"
    >
      <img
        src={thumbnail}
        alt={title}
        className="w-full mb-3"
      />
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {/* line clamp is used to hide description */}
      <p className="text-gray-400 text-sm mb-2 line-clamp-2">{description}</p> 
      <p className="text-gray-400 font-semibold">${price}</p>
    </div>
  );
};

export default Card;
