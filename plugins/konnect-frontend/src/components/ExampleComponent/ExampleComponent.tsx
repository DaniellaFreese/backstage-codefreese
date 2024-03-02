import React from 'react';
import { useState, useEffect } from 'react';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Grid } from '@material-ui/core';
import {
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
  Header
} from '@backstage/core-components';
import { 
  GatewayServiceHeader, 
  GatewayServiceConfig,
  KonnectPluginTable,
  KonnectRouteTable,
} from '../KonnectComponents';
import { useKonnectConfigData, useKonnectEntityData } from './useKonnectData';
import { Route, Plugin, konnectApiRef, GatewayService } from '../../types';
import { useApi, configApiRef } from '@backstage/core-plugin-api';

export const ExampleComponent = () => {

  const {entity} = useEntity();

  const { controlPlaneId, gatewayServiceId } = useKonnectEntityData({entity}); 
  const [gatewayServiceData, setGatewayServiceData] = useState({} as any);
  const [routeData, setRouteData] = useState<Route[]>([]);
  const [pluginData, setPluginData] = useState<Plugin[]>([]);

  // config data
  const config = useApi(configApiRef);
  const konnectBackendApi = useApi(konnectApiRef);

  const {baseUrl} = useKonnectConfigData({config});

  //pass into the gateway service component
  const gatewayServiceUrl = `${baseUrl}/gateway-manager/${controlPlaneId}/gateway-services/${gatewayServiceId}` 

  const getGatweayService = async () => {
    const gatewayServiceData: GatewayService = await konnectBackendApi.getService(controlPlaneId, gatewayServiceId);
    setGatewayServiceData(gatewayServiceData);
  };

  const getRoutes = async () => {
    const routes = await konnectBackendApi.getRoutesByService(controlPlaneId, gatewayServiceId);
    setRouteData(routes);
  };

  const getPlugins = async () => {
    const plugins = await konnectBackendApi.getPluginsByService(controlPlaneId, gatewayServiceId);
    setPluginData(plugins);
  };

  useEffect(() => {
    getGatweayService();
    getRoutes();
    getPlugins();
  },[]);
  
  //konnect components
  return (
    <Page themeId="tool">
      <Header title="Kong Konnect" subtitle="Gateway Manager Plugin">
        <HeaderLabel label="Control Plane" value={controlPlaneId} />
        <HeaderLabel label="Gateway Service" value={gatewayServiceData.name} />
      </Header>
      <Content>
        <ContentHeader title="Gateway Service">
          <SupportButton>This plugin provides a overview of the Konnect Gateway Service</SupportButton>
        </ContentHeader>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <GatewayServiceHeader data={gatewayServiceData} url={gatewayServiceUrl}/>
          </Grid>
          <Grid item>
            <Grid container spacing={3} direction='row'>
              <Grid item>
                <GatewayServiceConfig data={gatewayServiceData}/>
              </Grid>
              <Grid item>
                <KonnectRouteTable data={routeData}/>
              </Grid>
              <Grid item>
                <KonnectPluginTable data={pluginData}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
