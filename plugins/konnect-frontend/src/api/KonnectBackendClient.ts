import { DiscoveryApi } from "@backstage/core-plugin-api";
import { GatewayService, KonnectBackendApi, Route, Plugin } from "../types";

export class KonnectBackendClient implements KonnectBackendApi {
  private readonly discoveryApi: DiscoveryApi;

  constructor(options: {discoveryApi: DiscoveryApi}) {
    this.discoveryApi = options.discoveryApi;
  }
  private async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  }

  async getService(controlPlaneId: string, serviceId: string): Promise<GatewayService> {
    const url = `${await this.discoveryApi.getBaseUrl('konnect-backend')}/gateway-manager/${controlPlaneId}/gateway-services/${serviceId}`;
    const response = await fetch(url, {
      method: 'GET',
    });
    return await this.handleResponse(response);
  }

  async getRoutesByService(controlePlaneId: string, serviceId: string): Promise<Route[]> {
    const url = `${await this.discoveryApi.getBaseUrl('konnect-backend')}/gateway-manager/${controlePlaneId}/gateway-services/${serviceId}/routes`;
    const response = await fetch(url, {
      method: 'GET',
    }); 
    return await this.handleResponse(response);
  }
  async getPluginsByService(controlPlaneId: string, serviceId: string): Promise<Plugin[]> {
    const url = `${await this.discoveryApi.getBaseUrl('konnect-backend')}/gateway-manager/${controlPlaneId}/gateway-services/${serviceId}/plugins`;
    const response = await fetch(url, {
      method: 'GET',
    });
    return await this.handleResponse(response);
  }
}