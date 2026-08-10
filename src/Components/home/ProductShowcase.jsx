import ProductSlider from "../common/ProductSlider";

import beerData from "../../data/beerData";
import whiskyData from "../../data/whiskyData";

const ProductShowcase = () => {
  return (
    <section className="bg-black py-14">

      <div className="max-w-[1520px] mx-auto px-5">

        <div className="grid lg:grid-cols-2 gap-10">

          <ProductSlider
             title="BEER"
             icon="🍺"
             products={beerData}
             prevClass="beer-prev"
             nextClass="beer-next"
             viewAllText="VIEW ALL BEER"
             viewAllLink="/shop?category=beer"
           />

          <ProductSlider
             title="WHISKY"
             icon="🥃"
             products={whiskyData}
             prevClass="whisky-prev"
             nextClass="whisky-next"
             viewAllText="VIEW ALL WHISKY"
             viewAllLink="/shop?category=whisky"
           />

        </div>

      </div>

    </section>
  );
};

export default ProductShowcase;