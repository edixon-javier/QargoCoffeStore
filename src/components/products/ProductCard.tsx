import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "../../lib/types";
import { formatCurrency, getDiscountPercentage } from "../../lib/utils";
import Button from "../ui/Button";
import { useCart } from "../../contexts/CartContext";

interface ProductCardProps {
  product: Product;
  layout?: "grid" | "list";
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  layout = "grid",
}) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const hasDiscount = !!product.salePrice && product.salePrice < product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  if (layout === "list") {
    return (
      <motion.div
          className="product-card flex flex-row mb-4 overflow-hidden rounded-lg
             bg-white ring-1 ring-gray-200 ring-opacity-60
             shadow-2xl
             hover:shadow-[0_-6px_20px_-4px_rgba(0,0,0,0.2),
                          0_24px_30px_-7px_rgba(0,0,0,0.18),
                          0_12px_12px_-6px_rgba(0,0,0,0.08)]
             transition-shadow duration-300 ease-in-out"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
      >
        <div className="w-1/4 relative">
          <Link to={`/product/${product.id}`} className="block h-full">
            <img
              src={product.images[0]}
              alt={product.name}
              className="object-cover w-full h-full"
            />
            {hasDiscount && (
              <div className="absolute top-2 left-2 bg-accent-600 text-white text-xs font-bold px-2 py-1 rounded">
                {getDiscountPercentage(product.price, product.salePrice!)}% OFF
              </div>
            )}
          </Link>
        </div>

        <div className="w-3/4 p-4 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-secondary-500 mb-1">
                {product.category.name}
              </p>
              <Link to={`/product/${product.id}`}>
                <h3 className="text-lg font-semibold text-gray-800 hover:text-primary-700 transition-colors">
                  {product.name}
                </h3>
              </Link>
            </div>
            <button
              className="p-2 text-primary-600 hover:text-accent-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Add to favorites"
            >
              <Heart size={20} />
            </button>
          </div>

          <p className="text-sm text-secondary-600 mb-3 flex-grow">
            {product.description.length > 120
              ? `${product.description.slice(0, 120)}...`
              : product.description}
          </p>
          <div className="text-xs text-secondary-500 mb-2">
            SKU: {product.sku} | Supplier: {product.supplier.name}
          </div>

          <div className="flex justify-between items-center mt-auto">
            <div className="flex items-center">
              {hasDiscount ? (
                <>
                  <span className="text-accent-600 font-bold mr-2">
                    {formatCurrency(product.salePrice!)}
                  </span>
                  <span className="text-secondary-400 text-sm line-through">
                    {formatCurrency(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-gray-900 font-bold">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>

            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                leftIcon={<ShoppingCart size={16} />}
                onClick={handleAddToCart}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="product-card h-full shadow-md hover:shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden pb-[100%]">
        <Link to={`/product/${product.id}`} className="block absolute inset-0">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-accent-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {getDiscountPercentage(product.price, product.salePrice!)}% OFF
            </div>
          )}
        </Link>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs text-secondary-500">{product.category.name}</p>
          <button
            className="p-2 text-primary-600 hover:text-accent-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Add to favorites"
          >
            <Heart size={16} />
          </button>
        </div>
        <div>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-base font-semibold text-gray-800 line-clamp-2 hover:text-primary-700 transition-colors h-12">
              {product.name}
            </h3>
            <div className="text-xs text-secondary-500 mb-1">
              SKU: {product.sku}
            </div>
            <div className="text-xs text-secondary-500 mb-2">
              Supplier: {product.supplier.name}
            </div>
          </Link>
        </div>


        <div className="flex justify-between items-center mt-2">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="text-accent-600 font-bold">
                  {formatCurrency(product.salePrice!)}
                </span>
                <span className="text-secondary-400 text-xs line-through">
                  {formatCurrency(product.price)}
                </span>
              </>
            ) : (
              <span className="text-gray-900 font-bold">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="p-3 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;