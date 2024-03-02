import { 
  Typography, 
  Grid,
} from '@material-ui/core';
import {
  InfoCard,
  StructuredMetadataTable,
} from '@backstage/core-components';
import { useState } from 'react';

export const GatewayServiceHeader = ({data, url}) => {

  const createdAt = new Date(data.created_at * 1000).toLocaleString();
  const updatedAt = new Date(data.updated_at * 1000).toLocaleString(); 

  return (
    <InfoCard 
    title="About this Gateway Service"
    deepLink={{title:'View in Kong Konnect', link: url }}
    >
    <Typography style={{
          display: 'flex',
          justifyContent: 'space-between',
      }} variant="subtitle1">
        <div>ID: {data.name}</div>
        <span>Created At: {createdAt} &#8594; Modified: {updatedAt}</span>
    </Typography>
    <Typography component={'span'}> 
      <div>Upstream URL: {data.host} </div>
    </Typography>
  </InfoCard>
  );
}; 