/**
 * Procedural classical-architecture line-art geometry.
 * Every function returns SVG path `d` strings in absolute coordinates, so the
 * result is consistent and "pixel-perfect" regardless of placement/scale.
 */

const n = (v: number): number => Math.round(v * 10) / 10;

export interface ColumnSpec {
  cx: number; // shaft centre x
  baseY: number; // bottom of plinth (sits on the floor)
  height: number; // full height: plinth bottom → top of capital
  width: number; // shaft diameter at the base
  flutes?: number;
  order?: "doric" | "ionic";
}

/** A single fluted, tapered classical column with base, plinth and capital. */
export function column(spec: ColumnSpec): string[] {
  const { cx, baseY, height, width } = spec;
  const flutes = spec.flutes ?? 5;
  const order = spec.order ?? "doric";

  const hw = width / 2;
  const taper = width * 0.12;
  const thw = hw - taper / 2; // top half-width
  const plinthH = n(width * 0.34);
  const baseH = n(width * 0.5);
  const capH = n(width * (order === "ionic" ? 0.62 : 0.5));
  const baseTop = n(baseY - baseH); // top of base = bottom of shaft
  const capBot = n(baseY - height + capH); // bottom of capital = top of shaft
  const midY = n((baseTop + capBot) / 2);
  const out: string[] = [];

  // Plinth + base torus
  const pw = n(hw * 1.32);
  out.push(`M${n(cx - pw)} ${n(baseY)} H${n(cx + pw)} V${n(baseY - plinthH)} H${n(cx - pw)} Z`);
  out.push(`M${n(cx - hw * 1.12)} ${baseTop} Q ${n(cx)} ${n(baseTop - baseH * 0.55)} ${n(cx + hw * 1.12)} ${baseTop}`);
  out.push(`M${n(cx - hw)} ${baseTop} H${n(cx + hw)}`);

  // Shaft sides (slight entasis via quadratic bulge)
  out.push(`M${n(cx - hw)} ${baseTop} Q ${n(cx - hw - width * 0.04)} ${midY} ${n(cx - thw)} ${capBot}`);
  out.push(`M${n(cx + hw)} ${baseTop} Q ${n(cx + hw + width * 0.04)} ${midY} ${n(cx + thw)} ${capBot}`);

  // Flutes (interpolated across the taper)
  let fl = "";
  for (let i = 1; i <= flutes; i++) {
    const t = i / (flutes + 1);
    const xb = cx - hw + t * width;
    const xt = cx - thw + t * (thw * 2);
    fl += `M${n(xb)} ${n(baseTop - 2)} Q ${n((xb + xt) / 2 - width * 0.025)} ${midY} ${n(xt)} ${n(capBot + 2)} `;
  }
  out.push(fl.trim());

  // Capital
  const absTop = n(capBot - capH);
  if (order === "ionic") {
    out.push(`M${n(cx - thw)} ${capBot} H${n(cx + thw)}`); // necking
    out.push(`M${n(cx - thw * 1.7)} ${absTop} H${n(cx + thw * 1.7)} V${n(absTop - capH * 0.28)} H${n(cx - thw * 1.7)} Z`); // abacus
    out.push(`M${n(cx - thw)} ${capBot} Q ${n(cx)} ${n(capBot - capH * 0.5)} ${n(cx + thw)} ${capBot}`); // echinus
    // volute eyes
    const vr = n(capH * 0.16);
    out.push(eye(n(cx - thw * 1.25), n(absTop + capH * 0.34), vr));
    out.push(eye(n(cx + thw * 1.25), n(absTop + capH * 0.34), vr));
  } else {
    out.push(`M${n(cx - thw)} ${capBot} Q ${n(cx - thw * 1.45)} ${n(absTop + capH * 0.45)} ${n(cx - thw * 1.55)} ${absTop}`);
    out.push(`M${n(cx + thw)} ${capBot} Q ${n(cx + thw * 1.45)} ${n(absTop + capH * 0.45)} ${n(cx + thw * 1.55)} ${absTop}`);
    out.push(`M${n(cx - thw * 1.65)} ${absTop} H${n(cx + thw * 1.65)} V${n(absTop - capH * 0.4)} H${n(cx - thw * 1.65)} Z`);
  }
  return out;
}

function eye(cx: number, cy: number, r: number): string {
  return `M${n(cx - r)} ${cy} a ${r} ${r} 0 1 0 ${n(2 * r)} 0 a ${r} ${r} 0 1 0 ${n(-2 * r)} 0`;
}

export interface ColonnadeResult {
  sketch: string[];
  accent: string[];
}

/**
 * Two colonnades (left + right) receding toward the centre — a symmetric
 * perspective that frames the centred hero text and adds depth.
 */
export function heroColonnade(W: number, H: number): ColonnadeResult {
  const sketch: string[] = [];
  const accent: string[] = [];
  const groundY = n(H * 0.94);
  const frontH = n(H * 0.74);
  const frontW = n(W * 0.055);

  for (const side of [-1, 1] as const) {
    const x = (f: number): number => (side < 0 ? n(W * f) : n(W * (1 - f)));
    const cols: ColumnSpec[] = [
      { cx: x(0.07), baseY: groundY, height: frontH, width: frontW, flutes: 6, order: "ionic" },
      { cx: x(0.165), baseY: n(groundY - H * 0.045), height: n(frontH * 0.83), width: n(frontW * 0.8), flutes: 5, order: "doric" },
      { cx: x(0.245), baseY: n(groundY - H * 0.08), height: n(frontH * 0.69), width: n(frontW * 0.62), flutes: 4, order: "doric" },
    ];
    for (const c of cols) sketch.push(...column(c));

    const edgeX = x(0.015);
    const t0y = n(cols[0].baseY - cols[0].height);
    const t2 = cols[2];
    const t2y = n(t2.baseY - t2.height);
    // Entablature (cornice + architrave) sloping toward centre
    sketch.push(`M${edgeX} ${n(t0y - 8)} L${n(t2.cx)} ${n(t2y - 4)}`);
    sketch.push(`M${edgeX} ${n(t0y + 12)} L${n(t2.cx)} ${n(t2y + 8)}`);
    // Stylobate (two steps) rising toward centre
    sketch.push(`M${edgeX} ${n(groundY + 10)} L${n(t2.cx + frontW * 0.3)} ${n(t2.baseY)}`);
    sketch.push(`M${edgeX} ${n(groundY + 22)} L${n(t2.cx + frontW * 0.3)} ${n(t2.baseY + 12)}`);
    // Accent roundel centred on the front capital
    const a = cols[0];
    accent.push(eye(a.cx, n(a.baseY - a.height - 2), 5));
  }

  return { sketch, accent };
}
