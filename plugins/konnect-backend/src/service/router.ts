import { errorHandler } from '@backstage/backend-common';
import { Config } from '@backstage/config';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import { KonnectService } from './konnect.service';

export interface RouterOptions {
  logger: Logger;
  config: Config; // app-config
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, config } = options;
  
  const router = Router();
  router.use(express.json());

  const baseUrl = config.getString('konnect.baseUrl');
  const accessToken = config.getString('konnect.accessToken');
  
  const konnectSVC = new KonnectService({ baseUrl, accessToken });

  router.get('/gateway-manager/:controlPlaneId/gateway-services/:serviceId', async (request, response) => {
    const serviceId: string = request.params.serviceId;
    const controlPlaneId: string = request.params.controlPlaneId;

    logger.info(`Getting gateway service on ${serviceId}`);
    try {
      const service = await konnectSVC.getService(controlPlaneId, serviceId);
      response.send(service);
    } catch (error) {
     
      logger.error(`error getting Konnect gateway service ${serviceId}: ${error}`);
     
      return response.status(500).send({
        status: 'failed',
        message: `error getting Konnect gateway service ${serviceId}`,
      });
    }
  });

  router.get('/gateway-manager/:controlPlaneId/gateway-services/:serviceId/routes', async (request, response) => {
    const serviceId: string = request.params.serviceId;
    const controlPlaneId: string = request.params.controlPlaneId;
    
    try {
      const routes = await konnectSVC.getRoutesByService(controlPlaneId, serviceId);
      response.send(routes);

    } catch (error) {
      logger.error(`error getting Routes Konnect Service ${serviceId}: ${error}`);
     
      return response.status(500).send({
        status: 'failed',
        message: `error getting Routes Konnect Service ${serviceId}`,
      });
    }
  });
  
  router.get('/gateway-manager/:controlPlaneId/gateway-services/:serviceId/plugins', async (request, response) => {
    const serviceId: string = request.params.serviceId;
    const controlPlaneId: string = request.params.controlPlaneId;
      
    try {
      const plugins = await konnectSVC.getPluginsByService(controlPlaneId, serviceId);
      response.send(plugins);

    } catch (error) {
      logger.error(`error getting Plugins Konnect Service ${serviceId}: ${error}`);
    
      return response.status(500).send({
        status: 'failed',
        message: `error getting Plugins Konnect Service ${serviceId}`,
      });
    }
  }); 

  router.use(errorHandler());
  return router;
}
