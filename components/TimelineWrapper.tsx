'use client';
import dynamic from 'next/dynamic';

const TimelineInner = dynamic(
  () => import('@/components/sections/Timeline').then(m => ({ default: m.Timeline })),
  { ssr: false }
);

export function TimelineWrapper() {
  return <TimelineInner />;
}
