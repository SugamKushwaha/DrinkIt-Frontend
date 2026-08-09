import popularProducts from "../../data/products";
import ProductCard from "../common/ProductCard";
import { Flame } from "lucide-react";

const PopularProducts = () => {
  return (
    <section className="bg-black py-8">

      <div className="max-w-[1400px] mx-auto px-5">

        {/* HEADER */}
        <div className="flex justify-center items-center gap-3 mb-8">

          <Flame
            size={30}
            className="text-orange-400"
            fill="currentColor"
          />

          <h2 className="text-white text-3xl font-bold uppercase">
            Popular Tonight
          </h2>

        </div>

        {/* PRODUCTS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

          {popularProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              bordered={true}
              showButton={true}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default PopularProducts;