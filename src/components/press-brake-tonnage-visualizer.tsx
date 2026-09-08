"use client";

import type { PressBrakeTonnageInput, PressBrakeTonnageResult } from "@/lib/calculators/press-brake-tonnage";

export function PressBrakeTonnageVisualizer({
  input,
  result,
  labels,
}: {
  input: PressBrakeTonnageInput;
  result: PressBrakeTonnageResult;
  labels: {
    diagramTitle: string;
    thickness: string;
    bendLength: string;
    dieOpening: string;
    tonnagePerBend: string;
    tonnageWithSafety: string;
  };
}) {
  const unit = input.unit;

  // Maximize canvas utilization with tight margins
  const canvasW = 560;
  const canvasH = 340;
  const marginX = 40;
  const marginY = 32;
  const plotW = canvasW - 2 * marginX;
  const plotH = canvasH - 2 * marginY;

  // True Physical Parameters
  const V = Math.max(0.01, result.dieOpeningUsed);
  const T = Math.max(0.01, input.thickness);

  // Bounding box in physical coordinates (Y is UP)
  const minX = -V * 1.4; // space for T dimension
  const maxX = V * 1.0;
  const minY = -V * 1.0; // space below die for V dimension label
  const maxY = T + V * 1.1; // space above arrow

  const spanX = Math.max(0.001, maxX - minX);
  const spanY = Math.max(0.001, maxY - minY);

  // Auto-maximize scale to fit the drawing fully inside the canvas
  const scale = Math.min(plotW / spanX, plotH / spanY);
  const offX = marginX + (plotW - spanX * scale) / 2;
  const offY = marginY + (plotH - spanY * scale) / 2;

  // Y is UP in physical, map to Y DOWN for screen
  const toX = (x: number) => Number((offX + (x - minX) * scale).toFixed(2));
  const toY = (y: number) => Number((offY + (maxY - y) * scale).toFixed(2));

  // Screen-space points
  const pts = {
    // Die
    dieBotL: { x: toX(-V * 0.9), y: toY(-V * 0.6) },
    dieTopL: { x: toX(-V * 0.9), y: toY(0) },
    dieVLeft: { x: toX(-V / 2), y: toY(0) },
    dieVMid: { x: toX(0), y: toY(-V / 2) },
    dieVRight: { x: toX(V / 2), y: toY(0) },
    dieTopR: { x: toX(V * 0.9), y: toY(0) },
    dieBotR: { x: toX(V * 0.9), y: toY(-V * 0.6) },

    // Sheet
    sheetBotL: { x: toX(-V * 0.9), y: toY(0) },
    sheetBotR: { x: toX(V * 0.9), y: toY(0) },
    sheetTopR: { x: toX(V * 0.9), y: toY(T) },
    sheetTopL: { x: toX(-V * 0.9), y: toY(T) },

    // Punch
    punchTip: { x: toX(0), y: toY(T) },
    punchTopR: { x: toX(V * 0.35), y: toY(T + V * 0.6) },
    punchTopL: { x: toX(-V * 0.35), y: toY(T + V * 0.6) },

    // Arrow
    arrowTip: { x: toX(0), y: toY(T + V * 0.65) },
    arrowHeadL: { x: toX(-V * 0.1), y: toY(T + V * 0.75) },
    arrowHeadR: { x: toX(V * 0.1), y: toY(T + V * 0.75) },
    arrowShaftLBot: { x: toX(-V * 0.04), y: toY(T + V * 0.75) },
    arrowShaftRBot: { x: toX(V * 0.04), y: toY(T + V * 0.75) },
    arrowShaftLTop: { x: toX(-V * 0.04), y: toY(T + V * 1.0) },
    arrowShaftRTop: { x: toX(V * 0.04), y: toY(T + V * 1.0) },
  };

  // Dimension V — placed well below the die bottom to avoid overlap
  const dimV_y = -V * 0.65;
  const dimV_ext_y = -V * 0.75;
  const dimV = {
    start: { x: toX(-V / 2), y: toY(dimV_y) },
    end: { x: toX(V / 2), y: toY(dimV_y) },
    extL_start: { x: toX(-V / 2), y: toY(0) },
    extL_end: { x: toX(-V / 2), y: toY(dimV_ext_y) },
    extR_start: { x: toX(V / 2), y: toY(0) },
    extR_end: { x: toX(V / 2), y: toY(dimV_ext_y) },
    text: { x: toX(0), y: toY(dimV_y) + 16 },
  };

  // Dimension T
  const dimT_x = -V * 0.9 - V * 0.15;
  const dimT_ext_x = -V * 0.9 - V * 0.25;
  const dimT = {
    start: { x: toX(dimT_x), y: toY(0) },
    end: { x: toX(dimT_x), y: toY(T) },
    extBot_start: { x: toX(-V * 0.9), y: toY(0) },
    extBot_end: { x: toX(dimT_ext_x), y: toY(0) },
    extTop_start: { x: toX(-V * 0.9), y: toY(T) },
    extTop_end: { x: toX(dimT_ext_x), y: toY(T) },
    text: { x: toX(dimT_x) - 8, y: toY(T / 2) },
  };

  return (
    <div className="sheet-metal-visualizer">
      <header className="visualizer-header">
        <span className="visualizer-title">{labels.diagramTitle}</span>
        <span className="visualizer-badge">
          P = {result.tonnageWithSafety} {unit === "mm" ? "ton" : "US ton"}
        </span>
      </header>

      <div className="visualizer-canvas-wrap">
        <svg
          className="visualizer-svg"
          viewBox={`0 0 ${canvasW} ${canvasH}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <marker
              id="dim-arrow-norm"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="var(--muted, #546a5c)" />
            </marker>
            <linearGradient id="metal-fill-canvas" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--green-soft, #eaf6ee)" />
              <stop offset="100%" stopColor="var(--surface-2, #e2ebe5)" />
            </linearGradient>
          </defs>

          {/* V-Die */}
          <path
            d={`
              M ${pts.dieBotL.x} ${pts.dieBotL.y}
              L ${pts.dieTopL.x} ${pts.dieTopL.y}
              L ${pts.dieVLeft.x} ${pts.dieVLeft.y}
              L ${pts.dieVMid.x} ${pts.dieVMid.y}
              L ${pts.dieVRight.x} ${pts.dieVRight.y}
              L ${pts.dieTopR.x} ${pts.dieTopR.y}
              L ${pts.dieBotR.x} ${pts.dieBotR.y}
              Z
            `}
            fill="#475569"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Sheet Metal */}
          <path
            d={`
              M ${pts.sheetBotL.x} ${pts.sheetBotL.y}
              L ${pts.sheetBotR.x} ${pts.sheetBotR.y}
              L ${pts.sheetTopR.x} ${pts.sheetTopR.y}
              L ${pts.sheetTopL.x} ${pts.sheetTopL.y}
              Z
            `}
            fill="url(#metal-fill-canvas)"
            stroke="var(--green, #16a34a)"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Punch */}
          <path
            d={`
              M ${pts.punchTip.x} ${pts.punchTip.y}
              L ${pts.punchTopR.x} ${pts.punchTopR.y}
              L ${pts.punchTopL.x} ${pts.punchTopL.y}
              Z
            `}
            fill="#334155"
            stroke="var(--green, #16a34a)"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Force Arrow */}
          <path
            d={`
              M ${pts.arrowTip.x} ${pts.arrowTip.y}
              L ${pts.arrowHeadR.x} ${pts.arrowHeadR.y}
              L ${pts.arrowShaftRBot.x} ${pts.arrowShaftRBot.y}
              L ${pts.arrowShaftRTop.x} ${pts.arrowShaftRTop.y}
              L ${pts.arrowShaftLTop.x} ${pts.arrowShaftLTop.y}
              L ${pts.arrowShaftLBot.x} ${pts.arrowShaftLBot.y}
              L ${pts.arrowHeadL.x} ${pts.arrowHeadL.y}
              Z
            `}
            fill="#dc2626"
          />

          {/* Dimension: V-Die Opening */}
          <g className="dim-die-opening">
            <line
              x1={dimV.extL_start.x}
              y1={dimV.extL_start.y}
              x2={dimV.extL_end.x}
              y2={dimV.extL_end.y}
              stroke="#64748b"
              strokeWidth="1"
            />
            <line
              x1={dimV.extR_start.x}
              y1={dimV.extR_start.y}
              x2={dimV.extR_end.x}
              y2={dimV.extR_end.y}
              stroke="#64748b"
              strokeWidth="1"
            />
            <line
              x1={dimV.start.x}
              y1={dimV.start.y}
              x2={dimV.end.x}
              y2={dimV.end.y}
              stroke="#64748b"
              strokeWidth="1.2"
              markerStart="url(#dim-arrow-norm)"
              markerEnd="url(#dim-arrow-norm)"
            />
            <text
              x={dimV.text.x}
              y={dimV.text.y}
              fill="#1e293b"
              fontSize="12"
              fontWeight="650"
              textAnchor="middle"
            >
              V = {result.dieOpeningUsed} {unit}
            </text>
          </g>

          {/* Dimension: Thickness T */}
          <g className="dim-thickness">
            <line
              x1={dimT.extBot_start.x}
              y1={dimT.extBot_start.y}
              x2={dimT.extBot_end.x}
              y2={dimT.extBot_end.y}
              stroke="#64748b"
              strokeWidth="1"
            />
            <line
              x1={dimT.extTop_start.x}
              y1={dimT.extTop_start.y}
              x2={dimT.extTop_end.x}
              y2={dimT.extTop_end.y}
              stroke="#64748b"
              strokeWidth="1"
            />
            <line
              x1={dimT.start.x}
              y1={dimT.start.y}
              x2={dimT.end.x}
              y2={dimT.end.y}
              stroke="#64748b"
              strokeWidth="1.2"
              markerStart="url(#dim-arrow-norm)"
              markerEnd="url(#dim-arrow-norm)"
            />
            <text
              x={dimT.text.x}
              y={dimT.text.y}
              fill="#1e293b"
              fontSize="12"
              fontWeight="650"
              textAnchor="end"
              dominantBaseline="middle"
            >
              T = {input.thickness} {unit}
            </text>
          </g>

          {/* Force Label */}
          <text
            x={pts.arrowShaftRTop.x + 8}
            y={(pts.arrowShaftRTop.y + pts.arrowHeadR.y) / 2}
            fill="#dc2626"
            fontSize="12"
            fontWeight="700"
            textAnchor="start"
            dominantBaseline="middle"
          >
            P = {result.tonnageWithSafety} {unit === "mm" ? "ton" : "US ton"}
          </text>
        </svg>
      </div>

      <footer className="visualizer-footer">
        <span className="legend-indicator" />
        <p className="legend-text">
          {labels.tonnageWithSafety}: {result.tonnageWithSafety} {unit === "mm" ? "ton" : "US ton"}
        </p>
      </footer>
    </div>
  );
}
