import React, {
  useEffect,
  useState,
} from "react";

import {
  Flame,
} from "lucide-react";

import ProductCard from "../common/ProductCard";

import {
  getPopularProducts,
} from "../../api/productApi";


const PopularProducts = () => {

  // =====================================================
  // STATE
  // =====================================================

  const [
    popularProducts,
    setPopularProducts,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");


  // =====================================================
  // LOAD POPULAR PRODUCTS
  // =====================================================

  useEffect(() => {

    loadPopularProducts();

  }, []);


  const loadPopularProducts = async () => {

    try {

      setLoading(true);

      setError("");

      const data =
        await getPopularProducts();

      // Make sure we always store an array
      if (Array.isArray(data)) {

        setPopularProducts(data);

      } else {

        setPopularProducts([]);

      }

    } catch (err) {

      console.error(
        "Failed to load popular products:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Unable to load popular products"
      );

      setPopularProducts([]);

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <section className="bg-black py-8">

        <div className="max-w-[1400px] mx-auto px-5">

          {/* HEADER */}

          <div className="
            flex
            justify-center
            items-center
            gap-3
            mb-8
          ">

            <Flame
              size={30}
              className="text-orange-400"
              fill="currentColor"
            />

            <h2 className="
              text-white
              text-3xl
              font-bold
              uppercase
            ">
              Popular Tonight
            </h2>

          </div>


          {/* LOADING */}

          <div className="
            grid
            md:grid-cols-2
            lg:grid-cols-4
            gap-4
          ">

            {[1, 2, 3, 4].map(
              (item) => (

                <div
                  key={item}
                  className="
                    h-[350px]
                    rounded-2xl
                    bg-zinc-900
                    animate-pulse
                  "
                />

              )
            )}

          </div>

        </div>

      </section>
    );
  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {

    return (
      <section className="bg-black py-8">

        <div className="max-w-[1400px] mx-auto px-5">

          <div className="
            flex
            justify-center
            items-center
            gap-3
            mb-8
          ">

            <Flame
              size={30}
              className="text-orange-400"
              fill="currentColor"
            />

            <h2 className="
              text-white
              text-3xl
              font-bold
              uppercase
            ">
              Popular Tonight
            </h2>

          </div>

          <div className="
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900
            p-8
            text-center
          ">

            <p className="text-gray-400">
              {error}
            </p>

          </div>

        </div>

      </section>
    );
  }


  // =====================================================
  // NO PRODUCTS
  // =====================================================

  if (popularProducts.length === 0) {

    return (
      <section className="bg-black py-8">

        <div className="max-w-[1400px] mx-auto px-5">

          <div className="
            flex
            justify-center
            items-center
            gap-3
            mb-8
          ">

            <Flame
              size={30}
              className="text-orange-400"
              fill="currentColor"
            />

            <h2 className="
              text-white
              text-3xl
              font-bold
              uppercase
            ">
              Popular Tonight
            </h2>

          </div>

          <div className="
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900
            p-8
            text-center
          ">

            <p className="text-gray-400">
              No popular products available.
            </p>

          </div>

        </div>

      </section>
    );
  }


  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="bg-black py-8">

      <div className="max-w-[1400px] mx-auto px-5">

        {/* HEADER */}

        <div className="
          flex
          justify-center
          items-center
          gap-3
          mb-8
        ">

          <Flame
            size={30}
            className="text-orange-400"
            fill="currentColor"
          />

          <h2 className="
            text-white
            text-3xl
            font-bold
            uppercase
          ">
            Popular Tonight
          </h2>

        </div>


        {/* PRODUCTS */}

        <div className="
          grid
          md:grid-cols-2
          lg:grid-cols-4
          gap-4
        ">

          {popularProducts.map(
            (product) => (

              <ProductCard
                key={product.id}
                product={product}
                bordered={true}
                showButton={true}
              />

            )
          )}

        </div>

      </div>

    </section>
  );
};


export default PopularProducts;