import pairings from "../../data/pairings";
import PairingCard from "./PairingCard";

const PairingSection = () => {
  return (
    <section className="bg-black py-10">

      <div className="max-w-[1400px] mx-auto px-5">

        <div className="text-center mb-10">

          <h2 className="text-white text-4xl font-bold uppercase">

            Perfect Pairings

          </h2>

          <p className="text-gray-400 mt-2 text-lg">
            The right drink deserves the right snack.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-4">

          {pairings.map((pairing) => (
            <PairingCard
              key={pairing.id}
              pairing={pairing}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default PairingSection;