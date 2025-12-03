"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// ComposedChart Variants
// ============================================================================

const composedChartVariants = cva(
  [
    "relative w-full",
    "bg-surface-800 rounded-2xl border border-surface-700",
    "shadow-[0_4px_0_0_rgba(0,0,0,0.15),0_8px_16px_-4px_rgba(0,0,0,0.2)]",
    "p-6",
  ],
  {
    variants: {
      variant: {
        default: "",
        elevated: [
          "shadow-[0_6px_0_0_rgba(0,0,0,0.2),0_12px_24px_-4px_rgba(0,0,0,0.25)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ============================================================================
// ComposedChart Types
// ============================================================================

export interface ComposedChartData {
  label: string;
  barValue?: number;
  lineValue?: number;
  areaValue?: number;
}

export interface ComposedChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof composedChartVariants> {
  /** Chart data */
  data: ComposedChartData[];
  /** Chart title */
  title?: string;
  /** Chart description */
  description?: string;
  /** Maximum value for scaling */
  maxValue?: number;
  /** Show grid lines */
  showGrid?: boolean;
  /** Show value labels */
  showLabels?: boolean;
  /** Bar color */
  barColor?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger";
  /** Line color */
  lineColor?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger";
  /** Area color */
  areaColor?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger";
  /** Bar spacing */
  barSpacing?: number;
}

const colorGradients = {
  primary: {
    from: "rgb(59, 130, 246)",
    via: "rgb(96, 165, 250)",
    to: "rgb(147, 197, 253)",
    shadow: "rgb(37, 99, 235)",
    stroke: "rgb(59, 130, 246)",
    fill: "rgba(59, 130, 246, 0.1)",
  },
  secondary: {
    from: "rgb(168, 85, 247)",
    via: "rgb(192, 132, 252)",
    to: "rgb(221, 214, 254)",
    shadow: "rgb(147, 51, 234)",
    stroke: "rgb(168, 85, 247)",
    fill: "rgba(168, 85, 247, 0.1)",
  },
  accent: {
    from: "rgb(101, 221, 9)",
    via: "rgb(163, 230, 53)",
    to: "rgb(220, 252, 231)",
    shadow: "rgb(84, 197, 0)",
    stroke: "rgb(101, 221, 9)",
    fill: "rgba(101, 221, 9, 0.1)",
  },
  success: {
    from: "rgb(34, 197, 94)",
    via: "rgb(74, 222, 128)",
    to: "rgb(187, 247, 208)",
    shadow: "rgb(22, 163, 74)",
    stroke: "rgb(34, 197, 94)",
    fill: "rgba(34, 197, 94, 0.1)",
  },
  warning: {
    from: "rgb(234, 179, 8)",
    via: "rgb(250, 204, 21)",
    to: "rgb(254, 240, 138)",
    shadow: "rgb(202, 138, 4)",
    stroke: "rgb(234, 179, 8)",
    fill: "rgba(234, 179, 8, 0.1)",
  },
  danger: {
    from: "rgb(239, 68, 68)",
    via: "rgb(248, 113, 113)",
    to: "rgb(254, 202, 202)",
    shadow: "rgb(220, 38, 38)",
    stroke: "rgb(239, 68, 68)",
    fill: "rgba(239, 68, 68, 0.1)",
  },
};

// ============================================================================
// ComposedChart Component
// ============================================================================

export const ComposedChart = React.forwardRef<HTMLDivElement, ComposedChartProps>(
  (
    {
      className,
      variant,
      data,
      title,
      description,
      maxValue,
      showGrid = true,
      showLabels = true,
      barColor = "primary",
      lineColor = "secondary",
      areaColor = "accent",
      barSpacing = 12,
      ...props
    },
    ref
  ) => {
    const chartHeight = 300;
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };

    // Calculate max value
    const allValues = data.flatMap((d) => [
      d.barValue || 0,
      d.lineValue || 0,
      d.areaValue || 0,
    ]);
    const max = React.useMemo(() => {
      if (maxValue !== undefined) return maxValue;
      return Math.max(...allValues, 0) * 1.1;
    }, [allValues, maxValue]);

    const chartAreaHeight = chartHeight - padding.top - padding.bottom;

    // Generate Y-axis labels
    const yAxisLabels = Array.from({ length: 5 }).map((_, i) => {
      const value = max - (max / 4) * i;
      const y = padding.top + (chartAreaHeight / 4) * i;
      return { value, y };
    });

    // Calculate bar dimensions
    const barWidth = (1000 - padding.left - padding.right - barSpacing * (data.length - 1)) / data.length;
    
    // Get X position for bar center (used for aligning line points)
    const getBarCenterX = (index: number) => {
      return padding.left + index * (barWidth + barSpacing) + barWidth / 2;
    };

    // Create line path - align with bar centers
    const createLinePath = (getValue: (d: ComposedChartData) => number | undefined) => {
      const points = data
        .map((d, i) => {
          const value = getValue(d) || 0;
          const x = getBarCenterX(i);
          const y = padding.top + chartAreaHeight - (value / max) * chartAreaHeight;
          return `${i === 0 ? "M" : "L"} ${x} ${y}`;
        })
        .join(" ");
      return points;
    };

    return (
      <div
        ref={ref}
        className={cn(composedChartVariants({ variant }), className)}
        {...props}
      >
        {(title || description) && (
          <div className="mb-6">
            {title && (
              <h3 className="text-lg font-semibold text-surface-100 mb-1">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-surface-400">{description}</p>
            )}
          </div>
        )}

        <div className="relative" style={{ height: chartHeight }}>
          <svg
            width="100%"
            height={chartHeight}
            className="overflow-visible"
            viewBox={`0 0 1000 ${chartHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              {/* Bar gradients */}
              {Object.entries(colorGradients).map(([colorName, colors]) => (
                <linearGradient
                  key={`bar-gradient-${colorName}`}
                  id={`composed-bar-gradient-${colorName}`}
                  x1="0%"
                  y1="100%"
                  x2="0%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={colors.from} />
                  <stop offset="50%" stopColor={colors.via} />
                  <stop offset="100%" stopColor={colors.to} />
                </linearGradient>
              ))}
              {/* Area gradients */}
              {Object.entries(colorGradients).map(([colorName, colors]) => (
                <linearGradient
                  key={`area-gradient-${colorName}`}
                  id={`composed-area-gradient-${colorName}`}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={colors.fill} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={colors.fill} stopOpacity="0.05" />
                </linearGradient>
              ))}
            </defs>

            {/* Y-axis labels */}
            {yAxisLabels.map((label, i) => (
              <text
                key={`y-label-${i}`}
                x={padding.left - 10}
                y={label.y}
                textAnchor="end"
                dominantBaseline="middle"
                className="text-xs fill-surface-400 pointer-events-none"
              >
                {Math.round(label.value)}
              </text>
            ))}

            {/* Grid lines */}
            {showGrid &&
              yAxisLabels.map((label, i) => (
                <line
                  key={`grid-${i}`}
                  x1={padding.left}
                  y1={label.y}
                  x2={1000 - padding.right}
                  y2={label.y}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.1"
                  className="text-surface-600"
                />
              ))}

            {/* Area chart - aligned with bar centers */}
            {data.some((d) => d.areaValue !== undefined) && (
              <path
                d={`${createLinePath((d) => d.areaValue)} L ${getBarCenterX(data.length - 1)} ${chartHeight - padding.bottom} L ${getBarCenterX(0)} ${chartHeight - padding.bottom} Z`}
                fill={`url(#composed-area-gradient-${areaColor})`}
                className="transition-opacity duration-300"
              />
            )}

            {/* Bars */}
            {data.map((item, index) => {
              if (item.barValue === undefined) return null;

              const barHeight = (item.barValue / max) * chartAreaHeight;
              const x = padding.left + index * (barWidth + barSpacing);
              const y = padding.top + chartAreaHeight - barHeight;
              const gradient = colorGradients[barColor];

              return (
                <g key={`bar-${index}`}>
                  {/* Bar shadow */}
                  <rect
                    x={x + 4}
                    y={y + 4}
                    width={barWidth}
                    height={barHeight}
                    fill="rgba(0,0,0,0.3)"
                    rx="4"
                    className="pointer-events-none"
                  />
                  {/* Bar */}
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={`url(#composed-bar-gradient-${barColor})`}
                    rx="4"
                    className="cursor-pointer transition-all hover:opacity-90"
                    style={{
                      filter: `drop-shadow(0 4px 0 ${gradient.shadow}) drop-shadow(0 6px 8px rgba(0,0,0,0.3))`,
                    }}
                  />
                  {/* Value label */}
                  {showLabels && (
                    <text
                      x={x + barWidth / 2}
                      y={y - 6}
                      textAnchor="middle"
                      className="text-xs font-semibold fill-surface-200 pointer-events-none"
                      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                    >
                      {item.barValue}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Line chart */}
            {data.some((d) => d.lineValue !== undefined) && (
              <>
                <path
                  d={createLinePath((d) => d.lineValue)}
                  fill="none"
                  stroke={colorGradients[lineColor].stroke}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                />
                {/* Line points - aligned with bar centers */}
                {data.map((item, index) => {
                  if (item.lineValue === undefined) return null;
                  const x = getBarCenterX(index);
                  const y = padding.top + chartAreaHeight - (item.lineValue / max) * chartAreaHeight;
                  return (
                    <g key={`line-point-${index}`}>
                      <circle
                        cx={x + 1}
                        cy={y + 1}
                        r="5"
                        fill="rgba(0,0,0,0.3)"
                        className="pointer-events-none"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        fill={colorGradients[lineColor].stroke}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:r-6"
                      />
                    </g>
                  );
                })}
              </>
            )}

            {/* X-axis labels - aligned with bar centers */}
            {data.map((item, index) => {
              const x = getBarCenterX(index);
              return (
                <text
                  key={`label-${index}`}
                  x={x}
                  y={chartHeight - padding.bottom + 16}
                  textAnchor="middle"
                  className="text-xs fill-surface-400 pointer-events-none"
                >
                  {item.label}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    );
  }
);

ComposedChart.displayName = "ComposedChart";

export { composedChartVariants };

