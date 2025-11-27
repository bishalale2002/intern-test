import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={product.thumbnail}
        className="card-img-top"
        alt={product.title}
        style={{ height: "180px", objectFit: "cover" }}
      />

      <div className="card-body">
        <h6 className="card-title">{product.title}</h6>
        <p className="card-text fw-bold">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
