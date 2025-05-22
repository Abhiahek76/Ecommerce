import { useState } from "react";

const ShoppingCart = () => {
  const [quantity, setQuantity] = useState(2);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <a href="#" className="shrink-0 md:order-1">
                    <img
                      className="h-20 w-20 dark:hidden"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                      alt="imac"
                    />
                    <img
                      className="hidden h-20 w-20 dark:block"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                      alt="imac"
                    />
                  </a>
                  <div className="flex items-center justify-between md:order-3 md:justify-end">
                    <div className="flex items-center">
                      <button
                        onClick={handleDecrement}
                        className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="w-10 text-center text-sm font-medium text-gray-900 dark:text-white"
                        value={quantity}
                        readOnly
                      />
                      <button
                        onClick={handleIncrement}
                        className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-end md:order-4 md:w-32">
                      <p className="text-base font-bold text-gray-900 dark:text-white">
                        $1,499
                      </p>
                    </div>
                  </div>
                  <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <a
                      href="#"
                      className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                    >
                      PC system All in One APPLE iMac (2023)
                    </a>
                    <div className="flex items-center gap-4">
                      <button className="text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                        Add to Favorites
                      </button>
                      <button className="text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Order summary
              </p>
              <dl className="flex justify-between text-gray-900 dark:text-white">
                <dt>Original price</dt>
                <dd>$7,592.00</dd>
              </dl>
              <dl className="flex justify-between text-green-600">
                <dt>Savings</dt>
                <dd>-$299.00</dd>
              </dl>
              <dl className="flex justify-between">
                <dt>Store Pickup</dt>
                <dd>$99</dd>
              </dl>
              <dl className="flex justify-between">
                <dt>Tax</dt>
                <dd>$799</dd>
              </dl>
              <dl className="flex justify-between font-bold border-t pt-2">
                <dt>Total</dt>
                <dd>$8,191.00</dd>
              </dl>
              <button className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-white hover:bg-blue-800">
                Proceed to Checkout
              </button>
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                or{" "}
                <a href="#" className="text-blue-700 hover:underline">
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
