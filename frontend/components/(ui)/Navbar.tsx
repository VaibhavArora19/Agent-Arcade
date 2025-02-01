"use client";

const Navbar = () => {
  return (
    <div className="flex justify-between mx-8 my-4 border-b-2 border-gray-900 pb-4">
      <div className="flex gap-8">
        <h1 className="text-2xl font-bold cursor-pointer">Agentic ETH</h1>
        <div className="flex gap-4">
          <h3 className="text-lg pt-1 cursor-pointer">Dashboard</h3>
          <h3 className="text-lg pt-1 cursor-pointer">Create</h3>
        </div>
      </div>
      <appkit-button />
    </div>
  );
};

export default Navbar;
