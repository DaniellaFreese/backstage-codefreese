import { KonnectAPI, KonnectConfig } from "./types";
import { GatewayService, Route, Plugin } from "./types";

export class KonnectService implements KonnectAPI {

  konnectConfig: KonnectConfig;

  constructor(konnectConfig: KonnectConfig) {
    this.konnectConfig = konnectConfig;
  }

  async getService(controlPlaneId: string , serviceId: string): Promise<GatewayService>{
    return fetch(`${this.konnectConfig.baseUrl}/control-planes/${controlPlaneId}/core-entities/services/${serviceId}`, {
      headers: {
        Authorization: `Bearer ${this.konnectConfig.accessToken}`,
      },
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<GatewayService>;
    });

  }
  async getRoutesByService(controlePlaneId: string, serviceId: string): Promise<Route[]>{
    const resp = await fetch(`${this.konnectConfig.baseUrl}/control-planes/${controlePlaneId}/core-entities/services/${serviceId}/routes`, {
      headers: {
        Authorization: `Bearer ${this.konnectConfig.accessToken}`,
      },
    }); 
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    const data = await resp.json();
    return data;
  }
  async getPluginsByService(controlPlaneId: string, serviceId: string): Promise<Plugin[]> {
    return fetch(`${this.konnectConfig.baseUrl}/control-planes/${controlPlaneId}/core-entities/services/${serviceId}/plugins`, {
      headers: {
        Authorization: `Bearer ${this.konnectConfig.accessToken}`,
      },
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<Plugin[]>;
    });
  }; 
}