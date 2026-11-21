"use client";

import { useMemo } from "react";

interface RoofingVisualizerProps {
  pitch: number;
  pitchDegrees: number;
  pitchMultiplier: number;
  surfaceArea: number;
  footprintArea: number;
  unit: string;
}

export function RoofingVisualizer({
  pitch,
  pitchDegrees,
  pitchMultiplier,
  surfaceArea,
  footprintArea,
  unit,
}: RoofingVisualizerProps) {
  // SVG coordinates:
  // Base width = 360, center = 180.
  // Half-span = 140 (from x=40 to x=180, and x=180 to x=320).
  // Height is proportional to pitch (e.g. pitch=6 -> 6/12 * 140 = 70px)
  const clampedPitch = Math.min(24, Math.max(0, pitch));
  const baseY = 135;
  const apexY = Math.max(25, baseY - (clampedPitch / 12) * 110);
  const leftX = 50;
  const rightX = 310;
  const centerX = 180;

  const points = useMemo(() => {
    return `${leftX},${baseY} ${centerX},${apexY} ${rightX},${baseY}`;
  }, [leftX, rightX, centerX, apexY, baseY]);

  const percentageIncrease = ((pitchMultiplier - 1) * 100).toFixed(1);

  return (
    <div className="roofing-visualizer-wrap" style={{ margin: "14px 0 20px" }}>
      <div
        style={{
          border: "1px solid var(--line)",
          borderRadius: "4px",
          background: "color-mix(in srgb, var(--surface-2) 50%, var(--surface))",
          padding: "12px 14px 10px",
          display: "grid",
          gap: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "11px",
            fontWeight: 650,
            color: "var(--muted)",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--green)",
                display: "inline-block",
              }}
            />
            <span>Pitch Slope: {pitch}/12</span>
            <span style={{ color: "var(--subtle)" }}>({pitchDegrees.toFixed(1)}°)</span>
          </span>
          <span
            style={{
              padding: "2px 7px",
              borderRadius: "3px",
              background: "var(--green-soft)",
              color: "var(--green-dark)",
              fontWeight: 700,
            }}
          >
            +{percentageIncrease}% Surface Multiplier (×{pitchMultiplier.toFixed(3)})
          </span>
        </div>

        <svg
          viewBox="0 0 360 160"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "150px",
            overflow: "visible",
          }}
          aria-label={`Roof pitch visualization showing ${pitch} in 12 slope`}
        >
          {/* Ground Footprint Line */}
          <line
            x1={leftX}
            y1={baseY}
            x2={rightX}
            y2={baseY}
            stroke="var(--line-strong)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Roof Triangle Fill */}
          <polygon
            points={points}
            fill="color-mix(in srgb, var(--green-soft) 40%, transparent)"
            stroke="var(--green)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Center Vertical Rise Line */}
          <line
            x1={centerX}
            y1={apexY}
            x2={centerX}
            y2={baseY}
            stroke="color-mix(in srgb, var(--green-dark) 45%, var(--line))"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />

          {/* Overhang eaves */}
          <line
            x1={leftX - 12}
            y1={baseY + 6}
            x2={leftX}
            y2={baseY}
            stroke="var(--green)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1={rightX}
            y1={baseY}
            x2={rightX + 12}
            y2={baseY + 6}
            stroke="var(--green)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Rise Label */}
          <text
            x={centerX + 6}
            y={(apexY + baseY) / 2 + 3}
            fill="var(--green-dark)"
            fontSize="10"
            fontWeight="700"
          >
            Rise: {pitch}&quot;
          </text>

          {/* Run Label */}
          <text
            x={centerX - 50}
            y={baseY - 5}
            fill="var(--subtle)"
            fontSize="10"
            fontWeight="600"
          >
            Run: 12&quot;
          </text>

          {/* Eave Labels */}
          <text
            x={leftX}
            y={baseY + 16}
            fill="var(--subtle)"
            fontSize="9"
            textAnchor="middle"
          >
            Eave
          </text>
          <text
            x={centerX}
            y={apexY - 8}
            fill="var(--ink)"
            fontSize="10"
            fontWeight="700"
            textAnchor="middle"
          >
            Ridge ({pitchDegrees.toFixed(1)}°)
          </text>
          <text
            x={rightX}
            y={baseY + 16}
            fill="var(--subtle)"
            fontSize="9"
            textAnchor="middle"
          >
            Eave
          </text>
        </svg>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "11px",
            paddingTop: "6px",
            borderTop: "1px solid var(--line)",
            color: "var(--muted)",
          }}
        >
          <span>
            Footprint: <strong>{Math.round(footprintArea).toLocaleString()}</strong> {unit}
          </span>
          <span style={{ color: "var(--ink)" }}>
            Sloped Surface: <strong>{Math.round(surfaceArea).toLocaleString()}</strong> {unit}
          </span>
        </div>
      </div>
    </div>
  );
}
