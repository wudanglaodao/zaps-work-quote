"use client";

import type { SheetMetalBendInput, SheetMetalBendResult } from "@/lib/calculators/sheet-metal-bend";

export function SheetMetalBendVisualizer({
  input,
  result,
  labels,
}: {
  input: SheetMetalBendInput;
  result: SheetMetalBendResult;
  labels: {
    diagramTitle: string;
    neutralAxisLegend: string;
    flangeA: string;
    flangeB: string;
    thickness: string;
    insideRadius: string;
    bendAngle: string;
    flatLength: string;
  };
}) {
  const angle = Math.min(179, Math.max(1, input.bendAngle));
  const angleRad = (angle * Math.PI) / 180;
  const unit = input.unit;

  // Maximize canvas utilization with tight margins
  const canvasW = 560;
  const canvasH = 340;
  const marginX = 40;
  const marginY = 32;
  const plotW = canvasW - 2 * marginX; // 480px
  const plotH = canvasH - 2 * marginY; // 276px

  // True Physical Parameters
  const T = Math.max(0.01, input.thickness);
  const R = Math.max(0.01, input.insideRadius);
  const A = Math.max(0.01, input.flangeA);
  const B = Math.max(0.01, input.flangeB);
  const K = Math.min(0.9, Math.max(0.1, result.kFactor));

  const rIn = R;
  const rOut = R + T;
  const rNeut = R + K * T;

  // Physical coordinates
  const ptAOutStart = { x: -A, y: rOut };
  const ptAOutEnd = { x: 0, y: rOut };
  const ptAInStart = { x: -A, y: rIn };
  const ptAInEnd = { x: 0, y: rIn };
  const ptANeutStart = { x: -A, y: rNeut };
  const ptANeutEnd = { x: 0, y: rNeut };

  const ptBOutStart = { x: rOut * Math.sin(angleRad), y: rOut * Math.cos(angleRad) };
  const ptBInStart = { x: rIn * Math.sin(angleRad), y: rIn * Math.cos(angleRad) };
  const ptBNeutStart = { x: rNeut * Math.sin(angleRad), y: rNeut * Math.cos(angleRad) };

  const ptBOutEnd = {
    x: ptBOutStart.x + B * Math.cos(angleRad),
    y: ptBOutStart.y - B * Math.sin(angleRad),
  };
  const ptBInEnd = {
    x: ptBInStart.x + B * Math.cos(angleRad),
    y: ptBInStart.y - B * Math.sin(angleRad),
  };
  const ptBNeutEnd = {
    x: ptBNeutStart.x + B * Math.cos(angleRad),
    y: ptBNeutStart.y - B * Math.sin(angleRad),
  };

  // Compute model bounding box
  const allX = [ptAOutStart.x, 0, ptBOutStart.x, ptBInStart.x, ptBOutEnd.x, ptBInEnd.x];
  const allY = [rOut, rIn, ptBOutStart.y, ptBInStart.y, ptBOutEnd.y, ptBInEnd.y];

  const minX = Math.min(...allX);
  const maxX = Math.max(...allX);
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);

  const spanX = Math.max(0.001, maxX - minX);
  const spanY = Math.max(0.001, maxY - minY);

  // Auto-maximize scale to fit the drawing fully inside the canvas
  const scale = Math.min(plotW / spanX, plotH / spanY);
  const offX = marginX + (plotW - spanX * scale) / 2;
  const offY = marginY + (plotH - spanY * scale) / 2;

  const toX = (x: number) => Number((offX + (x - minX) * scale).toFixed(2));
  const toY = (y: number) => Number((offY + (y - minY) * scale).toFixed(2));

  // Screen-space points
  const pAOutS = { x: toX(ptAOutStart.x), y: toY(ptAOutStart.y) };
  const pAOutE = { x: toX(ptAOutEnd.x), y: toY(ptAOutEnd.y) };
  const pAInS = { x: toX(ptAInStart.x), y: toY(ptAInStart.y) };
  const pAInE = { x: toX(ptAInEnd.x), y: toY(ptAInEnd.y) };
  const pANeutS = { x: toX(ptANeutStart.x), y: toY(ptANeutStart.y) };
  const pANeutE = { x: toX(ptANeutEnd.x), y: toY(ptANeutEnd.y) };

  const pBOutS = { x: toX(ptBOutStart.x), y: toY(ptBOutStart.y) };
  const pBOutE = { x: toX(ptBOutEnd.x), y: toY(ptBOutEnd.y) };
  const pBInS = { x: toX(ptBInStart.x), y: toY(ptBInStart.y) };
  const pBInE = { x: toX(ptBInEnd.x), y: toY(ptBInEnd.y) };
  const pBNeutS = { x: toX(ptBNeutStart.x), y: toY(ptBNeutStart.y) };
  const pBNeutE = { x: toX(ptBNeutEnd.x), y: toY(ptBNeutEnd.y) };

  const sROut = Number((rOut * scale).toFixed(2));
  const sRIn = Number((rIn * scale).toFixed(2));
  const sRNeut = Number((rNeut * scale).toFixed(2));

  // Angle arc placement
  const angleArcR = Math.min(36, Math.max(16, Math.min(A, B) * scale * 0.35 + 10));
  const halfAngleRad = angleRad / 2;
  const pAngleText = {
    x: pAOutE.x + (angleArcR + 10) * Math.cos(halfAngleRad),
    y: pAOutE.y - (angleArcR + 10) * Math.sin(halfAngleRad),
  };

  // Flange B dimension line geometry (parallel to Flange B along the inner side)
  const dimBOffset = 18;
  const extBExtra = 6;
  const normX = -Math.sin(angleRad);
  const normY = -Math.cos(angleRad);

  const dimBS = {
    x: Number((pBInS.x + dimBOffset * normX).toFixed(2)),
    y: Number((pBInS.y + dimBOffset * normY).toFixed(2)),
  };
  const dimBE = {
    x: Number((pBInE.x + dimBOffset * normX).toFixed(2)),
    y: Number((pBInE.y + dimBOffset * normY).toFixed(2)),
  };

  const extB1End = {
    x: Number((pBInS.x + (dimBOffset + extBExtra) * normX).toFixed(2)),
    y: Number((pBInS.y + (dimBOffset + extBExtra) * normY).toFixed(2)),
  };
  const extB2End = {
    x: Number((pBInE.x + (dimBOffset + extBExtra) * normX).toFixed(2)),
    y: Number((pBInE.y + (dimBOffset + extBExtra) * normY).toFixed(2)),
  };

  const pLabelB = {
    x: Number(((dimBS.x + dimBE.x) / 2 + 8 * normX).toFixed(2)),
    y: Number(((dimBS.y + dimBE.y) / 2 + 8 * normY).toFixed(2)),
  };

  return (
    <div className="sheet-metal-visualizer">
      <header className="visualizer-header">
        <span className="visualizer-title">{labels.diagramTitle}</span>
        <span className="visualizer-badge">
          θ = {angle}° · L = {result.flatLengthSingle} {unit}
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

          {/* Solid Sheet Metal Cross-Section */}
          <path
            d={`
              M ${pAOutS.x} ${pAOutS.y}
              L ${pAOutE.x} ${pAOutE.y}
              A ${sROut} ${sROut} 0 0 0 ${pBOutS.x} ${pBOutS.y}
              L ${pBOutE.x} ${pBOutE.y}
              L ${pBInE.x} ${pBInE.y}
              L ${pBInS.x} ${pBInS.y}
              A ${sRIn} ${sRIn} 0 0 1 ${pAInE.x} ${pAInE.y}
              L ${pAInS.x} ${pAInS.y}
              Z
            `}
            fill="url(#metal-fill-canvas)"
            stroke="var(--green, #16a34a)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Neutral Axis (Red Dashed Line) */}
          <path
            d={`
              M ${pANeutS.x} ${pANeutS.y}
              L ${pANeutE.x} ${pANeutE.y}
              A ${sRNeut} ${sRNeut} 0 0 0 ${pBNeutS.x} ${pBNeutS.y}
              L ${pBNeutE.x} ${pBNeutE.y}
            `}
            fill="none"
            stroke="#dc2626"
            strokeWidth="1.8"
            strokeDasharray="4 3"
          />

          {/* Dimension: Flange A (with Extension Lines + Arrow Reference Line) */}
          <g className="dim-flange-a">
            {/* Extension lines */}
            <line
              x1={pAOutS.x}
              y1={pAOutS.y + 2}
              x2={pAOutS.x}
              y2={pAOutS.y + 24}
              stroke="var(--line, #cbd5e1)"
              strokeWidth="1"
            />
            <line
              x1={pAOutE.x}
              y1={pAOutE.y + 2}
              x2={pAOutE.x}
              y2={pAOutE.y + 24}
              stroke="var(--line, #cbd5e1)"
              strokeWidth="1"
            />
            {/* Dimension line with double arrows */}
            <line
              x1={pAOutS.x}
              y1={pAOutS.y + 16}
              x2={pAOutE.x}
              y2={pAOutE.y + 16}
              stroke="var(--line, #cbd5e1)"
              strokeWidth="1.2"
              markerStart="url(#dim-arrow-norm)"
              markerEnd="url(#dim-arrow-norm)"
            />
            <text
              x={(pAOutS.x + pAOutE.x) / 2}
              y={pAOutS.y + 30}
              fill="var(--ink, #07100a)"
              fontSize="12"
              fontWeight="650"
              textAnchor="middle"
            >
              {labels.flangeA}: {input.flangeA} {unit}
            </text>
          </g>

          {/* Dimension: Flange B (with Extension Lines + Parallel Arrow Reference Line) */}
          <g className="dim-flange-b">
            {/* Extension lines from Flange B ends */}
            <line
              x1={pBInS.x}
              y1={pBInS.y}
              x2={extB1End.x}
              y2={extB1End.y}
              stroke="var(--line, #cbd5e1)"
              strokeWidth="1"
            />
            <line
              x1={pBInE.x}
              y1={pBInE.y}
              x2={extB2End.x}
              y2={extB2End.y}
              stroke="var(--line, #cbd5e1)"
              strokeWidth="1"
            />
            {/* Dimension line with double arrows */}
            <line
              x1={dimBS.x}
              y1={dimBS.y}
              x2={dimBE.x}
              y2={dimBE.y}
              stroke="var(--line, #cbd5e1)"
              strokeWidth="1.2"
              markerStart="url(#dim-arrow-norm)"
              markerEnd="url(#dim-arrow-norm)"
            />
            <text
              x={pLabelB.x}
              y={pLabelB.y}
              fill="var(--ink, #07100a)"
              fontSize="12"
              fontWeight="650"
              textAnchor="end"
            >
              {labels.flangeB}: {input.flangeB} {unit}
            </text>
          </g>

          {/* Dimension: Angle */}
          <g className="dim-angle">
            <path
              d={`
                M ${pAOutE.x + angleArcR} ${pAOutE.y}
                A ${angleArcR} ${angleArcR} 0 0 0 ${pAOutE.x + angleArcR * Math.cos(angleRad)} ${pAOutE.y - angleArcR * Math.sin(angleRad)}
              `}
              fill="none"
              stroke="#d97706"
              strokeWidth="1.5"
              strokeDasharray="3 2"
            />
            <text
              x={pAngleText.x}
              y={pAngleText.y}
              fill="#d97706"
              fontSize="12"
              fontWeight="700"
              textAnchor="start"
            >
              θ = {angle}°
            </text>
          </g>

          {/* Parameter Callout: Thickness & Radius (Centered above Flange A) */}
          <g className="dim-params">
            <text
              x={(pAInS.x + pAInE.x) / 2}
              y={pAInS.y - 8}
              fill="var(--muted, #546a5c)"
              fontSize="11"
              fontWeight="600"
              textAnchor="middle"
            >
              T = {input.thickness} {unit} · R = {input.insideRadius} {unit}
            </text>
          </g>
        </svg>
      </div>

      <footer className="visualizer-footer">
        <span className="legend-indicator" />
        <p className="legend-text">{labels.neutralAxisLegend} (K = {result.kFactor})</p>
      </footer>
    </div>
  );
}
