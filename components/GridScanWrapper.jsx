"use client";

import dynamic from 'next/dynamic';

const GridScan = dynamic(() => import('./GridScan'), { ssr: false });

export default function GridScanWrapper(props) {
  return <GridScan {...props} />;
}
