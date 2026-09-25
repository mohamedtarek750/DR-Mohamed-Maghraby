import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { locales } from '@/content/dictionary';
import { verified } from '@/content/site';

export const alt = `${verified.name.en} — ${verified.title.en}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * The share card. Text is set in Latin on purpose: the image renderer does not
 * shape Arabic reliably, and a card with broken Arabic glyphs would do more
 * harm than an English one. The name reads the same to both audiences.
 */
export default async function OpengraphImage() {
  const portrait = await readFile(
    path.join(process.cwd(), 'public', 'images', 'dr-mohamed-maghraby.png'),
  );
  const src = `data:image/png;base64,${portrait.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#f4f0e8',
          position: 'relative',
        }}
      >
        {/* Sage arch behind the portrait, echoing the hero on the site. */}
        <div
          style={{
            position: 'absolute',
            right: 90,
            bottom: 0,
            width: 380,
            height: 520,
            borderTopLeftRadius: 190,
            borderTopRightRadius: 190,
            background: 'linear-gradient(180deg, #e6e7dd, #ece6db)',
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          width={400}
          height={562}
          style={{ position: 'absolute', right: 80, bottom: 0 }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 0 0 88px',
            width: 680,
          }}
        >
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#7d8378',
            }}
          >
            Neurology &amp; Psychiatry
          </div>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              color: '#191d18',
              marginTop: 28,
              letterSpacing: -1.5,
            }}
          >
            {verified.name.en}
          </div>
          <div style={{ fontSize: 32, color: '#3a4535', marginTop: 22 }}>
            {verified.title.en}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 48,
              paddingTop: 26,
              borderTop: '1px solid #ddd6c8',
              fontSize: 22,
              color: '#4d544a',
            }}
          >
            {verified.practice.en}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
