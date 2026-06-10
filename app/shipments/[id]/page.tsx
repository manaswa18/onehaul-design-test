'use client';

import React from 'react';
import Text from '@/components/Text';

interface Props {
  params: Promise<{ id: string }>;
}

export default function ShipmentDetailsPage({ params }: Props) {
  const { id } = React.use(params);
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
      <Text variant="heading" size="lg" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
        Shipment Details
      </Text>
      <Text variant="body" size="md" style={{ color: 'var(--theme-color-grey-50)' }}>
        {id}
      </Text>
    </div>
  );
}
