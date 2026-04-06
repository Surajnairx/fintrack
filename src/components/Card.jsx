function Card({ title, amount, positive, negative }) {
  return (
    <div
      className=" p-5 rounded-xl border 
                    hover:bg-white/10 transition"
    >
      <p className="text-sm">{title}</p>

      <h2
        className={`text-2xl font-bold mt-2
        ${positive ? "text-green-400" : ""}
        ${negative ? "text-red-400" : ""}`}
      >
        {amount}
      </h2>
    </div>
  );
}

export default Card;
