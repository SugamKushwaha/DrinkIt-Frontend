const PairingCard = ({ pairing }) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-700 group cursor-pointer">

      <img
        src={pairing.image}
        alt={pairing.title}
        className="w-full h-56 object-cover duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>

      <div className="absolute inset-0 p-5 flex flex-col justify-between">

        <div>

          <h3 className="text-white text-2xl font-bold">
            {pairing.title}
          </h3>

          <p className="text-yellow-400 font-semibold mt-3">
            {pairing.drink}
          </p>

          <ul className="text-gray-300 mt-2 space-y-1">
            {pairing.snacks.map((snack, index) => (
              <li key={index}>• {snack}</li>
            ))}
          </ul>

        </div>

        <button className="w-fit border border-yellow-500 text-yellow-400 px-5 py-2 rounded-md hover:bg-yellow-500 hover:text-black duration-300 font-semibold">

          SHOP PAIRING

        </button>

      </div>

    </div>
  );
};

export default PairingCard;