import React from "react";

const Card = ({ title, quantity }: { title: string; quantity: number }) => {
  return (
    <div className="bg-[#182237] p-5 w-full flex flex-col gap-3 rounded-md">
      <h1 className="font-semibold text-lg">{title}</h1>
      <h3 className="font-bold text-xl">{quantity}</h3>
    </div>
  );
};

export default Card;
