type SparklineProps = {
  points: number[]
  width?: number
  height?: number
  color?: 'signal' | 'alert'
  highlightEnd?: boolean
  className?: string
}

export default function Sparkline({
  points,
  width = 240,
  height = 64,
  color = 'signal',
  highlightEnd = true,
  className = '',
}: SparklineProps) {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const stepX = width / (points.length - 1)
  const coords = points.map((p, i) => {
    const x = i * stepX
    const y = height - ((p - min) / range) * (height - 10) - 5
    return [x, y] as const
  })
  const d = coords
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ')
  const [endX, endY] = coords[coords.length - 1]

  const strokeClass =
    color === 'alert'
      ? 'stroke-alert dark:stroke-alert-dark'
      : 'stroke-signal dark:stroke-signal-dark'
  const fillClass =
    color === 'alert' ? 'fill-alert dark:fill-alert-dark' : 'fill-signal dark:fill-signal-dark'

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      className={className}
      aria-hidden="true"
    >
      <line
        x1={0}
        y1={height - 2}
        x2={width}
        y2={height - 2}
        strokeWidth={1}
        className="stroke-stone/25"
      />
      <path
        d={d}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`sparkline-path ${strokeClass}`}
      />
      {highlightEnd && <circle cx={endX} cy={endY} r={3} className={fillClass} />}
    </svg>
  )
}
