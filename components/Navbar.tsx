// components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">Auto Parts Store</div>
      <div className="flex space-x-4">
        <Link href="/">Home</Link>
        <Link href="/inventory">Inventory</Link>
        <Link href="/engines">Engines</Link>
        <Link href="/transmissions">Transmissions</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
