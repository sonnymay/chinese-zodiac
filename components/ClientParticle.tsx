'use client';

// This thin client wrapper allows Server Components to include the
// canvas particle background without triggering the "ssr:false in
// Server Component" error.
import dynamic from 'next/dynamic';

const ParticleBackground = dynamic(
  () => import('./ParticleBackground'),
  { ssr: false },
);

export default function ClientParticle() {
  return <ParticleBackground />;
}
