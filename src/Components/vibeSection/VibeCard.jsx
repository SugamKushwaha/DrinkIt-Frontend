const VibeCard = ({ vibe }) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-yellow-800/40 group cursor-pointer">

      <img
        src={vibe.image}
        alt={vibe.title}
        className="h-48 w-full object-cover duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      <div className="absolute inset-0 p-4 flex flex-col justify-between">

        <div>

          <h3 className="text-3xl font-bold text-white flex items-center gap-2">
            <span>{vibe.emoji}</span>
            {vibe.title}
          </h3>

          <p className="text-gray-300 mt-1">
            {vibe.subtitle}
          </p>

        </div>

        <button className="text-yellow-400 font-semibold hover:text-yellow-300 duration-300 w-fit">
          SHOP NOW →
        </button>

      </div>

    </div>
  );
};

export default VibeCard;