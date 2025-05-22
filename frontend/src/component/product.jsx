import React, { useState } from "react";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState("/images/shoe1.png");
  const [selectedColor, setSelectedColor] = useState("red");
  const [selectedSize, setSelectedSize] = useState("20");
  const [quantity, setQuantity] = useState(1);

  const colors = ["green", "red", "orange", "blue", "black"];
  const sizes = ["16", "20", "28", "28", "28"];
  const images = [
    "/images/shoe1.png",
    "/images/shoe2.png",
    "/images/shoe3.png",
    "/images/shoe4.png",
  ];

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 p-10">
      <div className="bg-white rounded-lg shadow-lg p-8 flex max-w-5xl w-full gap-10">
        {/* Image Section */}
        <div className="flex flex-col items-center gap-4 w-1/2">
          <img
            src={selectedImage}
            alt="Product"
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="flex gap-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Thumbnail"
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
                  selectedImage === img ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="w-1/2">
          <h2 className="text-2xl font-bold text-gray-900">
            White Rally Running Sport Shoes
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Lorem Ipsum is simply dummy text of the printing industry.
          </p>
          <div className="flex items-center mt-4">
            <span className="text-2xl font-bold">$80.00</span>
            <span className="text-gray-400 line-through ml-2">$100.00</span>
            <span className="text-blue-600 font-bold ml-2">20% off</span>
          </div>

          {/* Colors */}
          <div className="mt-4">
            <p className="text-gray-700 font-semibold mb-2">Bag Color</p>
            <div className="flex gap-2">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`w-6 h-6 rounded-full cursor-pointer border ${
                    selectedColor === color ? "border-black" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-4">
            <p className="text-gray-700 font-semibold mb-2">Bag Size</p>
            <div className="flex gap-2">
              {sizes.map((size, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 border rounded-full ${
                    selectedSize === size
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-4 flex items-center">
            <button
              className="px-3 py-1 border rounded-l bg-gray-200"
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              -
            </button>
            <span className="px-4 py-1 border-t border-b">{quantity}</span>
            <button
              className="px-3 py-1 border rounded-r bg-gray-200"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">
              Add To Cart
            </button>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
