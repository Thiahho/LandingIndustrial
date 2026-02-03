"use client";

const clients = [
  { name: "Akzo Nobel", image: "Akzo Nobel.png" },
  { name: "Alijor", image: "alijor.png" },
  { name: "Axion", image: "axionlong.png" },
  { name: "BASF", image: "basf.png" },
  { name: "Castell", image: "castell.png" },
  { name: "Federación Patronal", image: "federacion patronal.png" },
  { name: "Grupo L", image: "grupo L.png" },
  { name: "Luvik", image: "luvik.png" },
  { name: "Mapa Virulana", image: "mapa virulana.png" },
  { name: "OCA", image: "Oca.png" },
  { name: "Pinturas del Centro", image: "pint del centro.png" },
  { name: "Procter & Gamble", image: "procter.png" },
  { name: "Tandanor", image: "tandanor.png" },
  { name: "Tapalqué", image: "tapalque.png" },
  { name: "Tersuave", image: "tersuave.png" },
  { name: "Zott", image: "zott.png" },
];

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export function ClientsCarousel() {
  // Duplicate array to create seamless loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Gradient overlays for fade effect */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#0b1110] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#0b1110] to-transparent" />

      {/* Scrolling container */}
      <div className="flex animate-scroll">
        {duplicatedClients.map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className="flex h-24 w-50 flex-shrink-0 items-center justify-center px-4"
          >
            <img
              src={`${baseUrl}/imagenes/${encodeURIComponent(client.image)}`}
              alt={client.name}
              className="max-h-24 max-w-full object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
