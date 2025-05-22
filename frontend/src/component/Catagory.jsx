/*import React from "react";
const categories = [
  { name: "Paan Corner", image: "paan-corner_web.avif" },
  { name: "Dairy, Bread & Eggs", image: "Slice-2_10.avif" },
  { name: "Fruits & Vegetables", image: "Slice-3_9.avif" },
  { name: "Cold Drinks & Juices", image: "Slice-4_9 (1).avif" },
  { name: "Snacks & Munchies", image: "Slice-5_4.avif" },
  { name: "Breakfast & Instant Food", image: "Slice-6_5.avif" },
  { name: "Sweet Tooth", image: "Slice-7_3.avif" },
  { name: "Bakery & Biscuits", image: "Slice-8_4.avif" },
  { name: "Tea, Coffee & Health Drink", image: "Slice-9_3.avif" },
  { name: "Atta, Rice & Dal", image: "Slice-10.avif" },
  { name: "Masala, Oil & More", image: "Slice-11.avif" },
  { name: "Sauces & Spreads", image: "Slice-12.avif" },
  { name: "Chicken, Meat & Fish", image: "Slice-13.avif" },
  { name: "Organic & Healthy Living", image: "Slice-14.avif" },
  { name: "Baby Care", image: "Slice-15.avif" },
  { name: "Pharma & Wellness", image: "Slice-16.avif" },
  { name: "Cleaning Essentials", image: "Slice-17.avif" },
  { name: "Home & Office", image: "Slice-18.avif" },
  { name: "Personal Care", image: "Slice-19.avif" },
  { name: "Pet Care", image: "Slice-20.avif" },
];

const CategorySection = () => {
  return (
    <div className="flex flex-wrap justify-center py-2 lg:px-30 ">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex flex-col items-center w-[90px] md:w-[120px] p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 cursor-pointer"
        >
          <img
            src={category.image}
            className=" md:h-20 md:w-50 lg:h-40 lg:w-60 "
          />
        </div>
      ))}
    </div>
  );
};

export default CategorySection;*/
/*import React from "react";
import { motion } from "framer-motion";

const categories = [
  { name: "Paan Corner", image: "paan-corner_web.avif" },
  { name: "Dairy, Bread & Eggs", image: "Slice-2_10.avif" },
  { name: "Fruits & Vegetables", image: "Slice-3_9.avif" },
  { name: "Cold Drinks & Juices", image: "Slice-4_9 (1).avif" },
  { name: "Snacks & Munchies", image: "Slice-5_4.avif" },
  { name: "Breakfast & Instant Food", image: "Slice-6_5.avif" },
  { name: "Sweet Tooth", image: "Slice-7_3.avif" },
  { name: "Bakery & Biscuits", image: "Slice-8_4.avif" },
  { name: "Tea, Coffee & Health Drink", image: "Slice-9_3.avif" },
  { name: "Atta, Rice & Dal", image: "Slice-10.avif" },
  { name: "Masala, Oil & More", image: "Slice-11.avif" },
  { name: "Sauces & Spreads", image: "Slice-12.avif" },
  { name: "Chicken, Meat & Fish", image: "Slice-13.avif" },
  { name: "Organic & Healthy Living", image: "Slice-14.avif" },
  { name: "Baby Care", image: "Slice-15.avif" },
  { name: "Pharma & Wellness", image: "Slice-16.avif" },
  { name: "Cleaning Essentials", image: "Slice-17.avif" },
  { name: "Home & Office", image: "Slice-18.avif" },
  { name: "Personal Care", image: "Slice-19.avif" },
  { name: "Pet Care", image: "Slice-20.avif" },
];

const CategorySection = () => {
  return (
    <div className="flex flex-wrap justify-center py-2 lg:px-30">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center w-[90px] md:w-[120px] p-2  rounded-lg cursor-pointer"
          whileHover={{ scale: 1.1 }} // Scale up on hover
          transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
        >
          <motion.img
            src={category.image}
            alt={category.name}
            className="md:h-20 md:w-50 lg:h-40 lg:w-60"
            whileHover={{ scale: 1.1 }} // Image scales slightly on hover
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default CategorySection;*/
import React from "react";
import { motion } from "framer-motion";

const categories = [
  { name: "Paan Corner", image: "paan-corner_web.avif" },
  { name: "Dairy, Bread & Eggs", image: "Slice-2_10.avif" },
  { name: "Fruits & Vegetables", image: "Slice-3_9.avif" },
  { name: "Cold Drinks & Juices", image: "Slice-4_9 (1).avif" },
  { name: "Snacks & Munchies", image: "Slice-5_4.avif" },
  { name: "Breakfast & Instant Food", image: "Slice-6_5.avif" },
  { name: "Sweet Tooth", image: "Slice-7_3.avif" },
  { name: "Bakery & Biscuits", image: "Slice-8_4.avif" },
  { name: "Tea, Coffee & Health Drink", image: "Slice-9_3.avif" },
  { name: "Atta, Rice & Dal", image: "Slice-10.avif" },
  { name: "Masala, Oil & More", image: "Slice-11.avif" },
  { name: "Sauces & Spreads", image: "Slice-12.avif" },
  { name: "Chicken, Meat & Fish", image: "Slice-13.avif" },
  { name: "Organic & Healthy Living", image: "Slice-14.avif" },
  { name: "Baby Care", image: "Slice-15.avif" },
  { name: "Pharma & Wellness", image: "Slice-16.avif" },
  { name: "Cleaning Essentials", image: "Slice-17.avif" },
  { name: "Home & Office", image: "Slice-18.avif" },
  { name: "Personal Care", image: "Slice-19.avif" },
  { name: "Pet Care", image: "Slice-20.avif" },
];

const CategorySection = () => {
  return (
    <motion.div
      className="flex flex-wrap justify-center py-2 lg:px-30"
      initial={{ opacity: 0, y: 50 }} // Start off-screen with opacity 0
      animate={{ opacity: 1, y: 0 }} // Fade in and slide up
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
    >
      {categories.map((category, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center w-[90px] md:w-[120px] p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
          whileHover={{ scale: 1.1 }} // Hover effect
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.img
            src={category.image}
            alt={category.name}
            className="md:h-20 md:w-50 lg:h-40 lg:w-60"
            initial={{ opacity: 0, scale: 0.8 }} // Start smaller and invisible
            animate={{ opacity: 1, scale: 1 }} // Appear with normal size
            transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered effect
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategorySection;
