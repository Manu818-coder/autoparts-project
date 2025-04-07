import VinLookup from "@/components/VinLookup";


export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <section className="py-10 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Search Vehicle by VIN</h2>
          <p className="text-lg text-gray-600 mb-8">
            Enter a valid VIN to retrieve all available vehicle details.
          </p>
          <VinLookup />
        </div>
      </section>
    </main>
  );
}
