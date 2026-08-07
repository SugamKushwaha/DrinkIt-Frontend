import vibes from "../../data/vibes";
import VibeCard from "./VibeCard";

const VibeSection = () => {
  return (
    <section className="bg-black py-20">

      <div className="max-w-[1400px] mx-auto px-5">

        <h2 className="text-center text-4xl font-bold text-white uppercase mb-10">
          What's Your Vibe Tonight?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {vibes.map((vibe) => (
            <VibeCard
              key={vibe.id}
              vibe={vibe}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default VibeSection;