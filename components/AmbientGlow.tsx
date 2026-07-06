type AmbientGlowProps = {
  color?: 'signal' | 'alert'
  className?: string
}

export default function AmbientGlow({ color = 'signal', className = '' }: AmbientGlowProps) {
  const rgb = color === 'alert' ? '193,68,45' : '14,107,87'
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div
        className={`absolute rounded-full opacity-30 blur-[110px] ${className}`}
        style={{ background: `rgba(${rgb},0.12)` }}
      />
    </div>
  )
}
