import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen bg-[#151c2c] flex justify-center items-center text-white">
      <Link
        href="/dashboard"
        className="p-5 shadow-2xl shadow-white rounded-md bg-[#182237] font-bold text-2xl"
      >
        Dashboard
      </Link>
    </div>
  );
}
