import { ImageResponse } from 'next/og';
import { COLORS } from '@/utils/constants';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 80,
          background: `linear-gradient(135deg, ${COLORS.CORAL[500]} 0%, ${COLORS.CORAL[600]} 100%)`,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '20px',
          fontWeight: 'bold',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        W
      </div>
    ),
    {
      ...size,
    }
  );
}