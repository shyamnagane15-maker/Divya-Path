export const TEMPLES = [
  {
    id: "somnath",
    name: "Somnath Temple",
    location: "Prabhas Patan, Gujarat",
    tagline: "The Eternal Shrine",
    accent: "#C9A227",
  },
  {
    id: "dwarkadhish",
    name: "Dwarkadhish Temple",
    location: "Dwarka, Gujarat",
    tagline: "Abode of Lord Krishna",
    accent: "#A32C3D",
  },
  {
    id: "ambaji",
    name: "Ambaji Temple",
    location: "Banaskantha, Gujarat",
    tagline: "Shakti Peeth of Devotion",
    accent: "#E8871E",
  },
  {
    id: "pavagadh",
    name: "Pavagadh Temple",
    location: "Panchmahal, Gujarat",
    tagline: "Temple Atop the Sacred Hill",
    accent: "#4C8DAF",
  },
];

export function getTempleById(id) {
  return TEMPLES.find((t) => t.id === id) || null;
}
