import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-gray-400 mb-6">Page Not Found</p>

      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
}

export default Error;
