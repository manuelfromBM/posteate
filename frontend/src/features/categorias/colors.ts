const PALETA = [
  "#f2ede5",
  "#eaf1ef",
  "#eef1f7",
  "#f6efe2",
  "#efeef7",
  "#fbe9ee",
  "#eef6ea",
  "#f0f0f0",
  "#fdece2",
  "#eaf2f6",
];

export function colorPorCategoria(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) % PALETA.length;
  }
  return PALETA[Math.abs(hash)];
}
