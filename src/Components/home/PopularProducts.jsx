import popularProducts from "../../data/products";
import ProductCard from "../Common/ProductCard";
import { Flame } from "lucide-react";

const PopularProducts = () => {
  return (
    <section className="bg-black py-5">

      <div className="max-w-[1450px] mx-auto px-5">

        <div className="flex justify-center items-center gap-3 mb-10">

          <Flame
            size={34}
            className="text-orange-500"
            fill="currentColor"
          />

          <h2 className="text-white text-4xl font-bold uppercase">
            Popular Tonight
          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

          {popularProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default PopularProducts;