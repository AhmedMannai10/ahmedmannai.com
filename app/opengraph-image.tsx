import { ImageResponse } from 'next/og'

export const alt = 'Ahmed Mannai — Software & DevOps Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '80px',
        backgroundColor: '#080808',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Atmospheric glow — top left */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          left: '-120px',
          width: '750px',
          height: '550px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(139,92,246,0.45) 0%, rgba(99,102,241,0.2) 45%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />
      {/* Secondary glow — bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: '-80px',
          right: '-80px',
          width: '500px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(168,85,247,0.25) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Name */}
        <div
          style={{
            fontSize: '88px',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            marginBottom: '24px',
          }}
        >
          Ahmed Mannai
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: '30px',
            fontWeight: 500,
            color: '#9ca3af',
            letterSpacing: '-0.01em',
            marginBottom: '32px',
          }}
        >
          Software & DevOps Engineer
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: '20px',
            color: '#4b5563',
            letterSpacing: '0.02em',
          }}
        >
          ahmedmannai.com
        </div>
      </div>
    </div>,
    { ...size }
  )
}
