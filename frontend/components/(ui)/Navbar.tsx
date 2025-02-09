"use client";

import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="flex justify-between mx-16 mb-8 border-b-2 border-gray-900 pb-4 sticky bg-black top-0 py-8 z-10">
      <div className="flex gap-8">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>
          Agent Arcade
        </h1>
        <div className="flex gap-4">
          <h3 className="text-lg pt-1 cursor-pointer" onClick={() => router.push("/")}>
            Dashboard
          </h3>
          <h3 className="text-lg pt-1 cursor-pointer" onClick={() => router.push("/create")}>
            Create
          </h3>
        </div>
      </div>
      <appkit-button />
    </div>
  );
};

export default Navbar;
