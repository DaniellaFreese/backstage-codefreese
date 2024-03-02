import React from 'react';
import {
  InfoCard,
  StructuredMetadataTable,
} from '@backstage/core-components';

export const GatewayServiceConfig = ({data}) => {
  const created_at = new Date(data.created_at * 1000).toLocaleString();
  const updated_at = new Date(data.updated_at * 1000).toLocaleString();

  return (
    <InfoCard title="Configuration">
    <StructuredMetadataTable dense={true} metadata={{
      connect_timeout: data.connect_timeout,
      created_at: created_at,
      enabled: data.enabled,
      host: data.host,
      id: data.id,
      name: data.name,
      port: data.port,
      protocol: data.protocol,
      read_timeout: data.read_timeout,
      retries: data.retries,
      updated_at: updated_at,
      write_timeout: data.write_timeout,
    }} />
  </InfoCard>
  );
  } 