// Convierte el JSON completo del Ministerio en un fichero compacto para la app.
// Uso: node scripts/compactar.mjs entrada.json salida.json
import { readFileSync, writeFileSync } from "node:fs";

const [, , entrada, salida] = process.argv;
const FUELS = [
  "Precio Gasoleo A", "Precio Gasoleo Premium",
  "Precio Gasolina 95 E5", "Precio Gasolina 95 E10", "Precio Gasolina 95 E5 Premium",
  "Precio Gasolina 98 E5", "Precio Gasolina 98 E10",
  "Precio Gases licuados del petróleo", "Precio Gas Natural Comprimido",
  "Precio Biodiesel", "Precio Hidrogeno",
];
const num = (s) => { const v = parseFloat(String(s ?? "").replace(",", ".")); return Number.isFinite(v) ? v : null; };

const raw = JSON.parse(readFileSync(entrada, "utf8"));
const lista = raw.ListaEESSPrecio;
if (!Array.isArray(lista) || lista.length < 5000) {
  console.error(`Respuesta sospechosa: ${Array.isArray(lista) ? lista.length : 0} estaciones`);
  process.exit(1);
}

const s = [];
for (const e of lista) {
  const lat = num(e.Latitud), lon = num(e["Longitud (WGS84)"]);
  if (lat === null || lon === null) continue;
  const p = FUELS.map((k) => { const v = num(e[k]); return v && v > 0 ? v : 0; });
  if (!p.some(Boolean)) continue;
  s.push([e.IDEESS, e["Rótulo"] ?? "", e["Dirección"] ?? "", e.Municipio ?? "", e.Provincia ?? "",
    e.Horario ?? "", +lat.toFixed(5), +lon.toFixed(5), p]);
}

writeFileSync(salida, JSON.stringify({ fecha: raw.Fecha ?? "", generado: new Date().toISOString(), fuels: FUELS, s }));
console.log(`OK: ${s.length} estaciones, fecha ${raw.Fecha}`);
