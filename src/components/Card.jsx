function Card({ title, amount, positive, negative }) {
  return (
    <div
      className="bg-white/5 p-5 rounded-xl border border-white/10 
                    hover:bg-white/10 transition"
    >
      <p className="text-gray-400 text-sm">{title}</p>

      <h2
        className={`text-2xl font-bold mt-2
        ${positive ? "text-green-400" : ""}
        ${negative ? "text-red-400" : "text-white"}`}
      >
        {amount}
      </h2>
    </div>
  );
}

export default Card;
