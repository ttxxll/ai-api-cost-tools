import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AI API Cost Tools';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0B0F19',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Background glow effects */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '20%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '20%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            $
          </div>
          <span
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#9CA3AF',
              letterSpacing: '-0.02em',
            }}
          >
            AI API Cost Tools
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '52px',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #FFFFFF 0%, #A78BFA 50%, #06B6D4 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: '20px',
            padding: '0 40px',
          }}
        >
          AI API Cost Calculator
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '22px',
            color: '#6B7280',
            textAlign: 'center',
            maxWidth: '700px',
          }}
        >
          Estimate & compare costs across Claude, GPT, Gemini, DeepSeek
        </div>
      </div>
    ),
    { ...size }
  );
}
