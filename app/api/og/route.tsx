import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') ?? 'Ahmed Mannai'
  const date = searchParams.get('date') ?? ''

  const titleSize = title.length > 60 ? '48px' : title.length > 40 ? '58px' : '68px'

  return new ImageResponse(
    <div
      style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        backgroundColor: '#080808',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Atmospheric glow — top right */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '650px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(139,92,246,0.4) 0%, rgba(99,102,241,0.18) 45%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />
      {/* Secondary glow — bottom left */}
      <div
        style={{
          position: 'absolute',
          bottom: '-60px',
          left: '-60px',
          width: '450px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(168,85,247,0.2) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Top row — author + date */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ fontSize: '20px', color: '#6b7280', fontWeight: 500 }}>Ahmed Mannai</div>
        {date && (
          <>
            <div
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: '#374151',
              }}
            />
            <div style={{ fontSize: '20px', color: '#6b7280' }}>{date}</div>
          </>
        )}
      </div>

      {/* Bottom — title + URL */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: titleSize,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            maxWidth: '960px',
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: '20px', color: '#4b5563', letterSpacing: '0.02em' }}>
          ahmedmannai.com
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 }
  )
}
