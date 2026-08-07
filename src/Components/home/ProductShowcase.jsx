import ProductSlider from "../common/ProductSlider";

import beerData from "../../data/beerData";
import whiskyData from "../../data/whiskyData";

const ProductShowcase = () => {
  return (
    <section className="bg-black py-14">

      <div className="max-w-[1520px] mx-auto px-5">

        <div className="grid lg:grid-cols-2 gap-10">

          <ProductSlider
            title="Beer"
            icon="🍺"
            products={beerData}
            prevClass="beer-prev"
            nextClass="beer-next"
          />

          <ProductSlider
            title="Whisky"
            icon="🥃"
            products={whiskyData}
            prevClass="whisky-prev"
            nextClass="whisky-next"
          />

        </div>

      </div>

    </section>
  );
};

export default ProductShowcase;