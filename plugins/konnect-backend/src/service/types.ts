export type GatewayService = {

  connect_timeout: number,
  created_at: number,
  enabled: boolean,
  host: string,
  id: string,
  name: string,
  path: string,
  port: number,
  protocol: string,
  read_timeout: number,
  retries: number,
  updated_at: number,
  write_timeout: number
}

export type Route = {
  created_at: number,
  destinations: Array<any>,
  headers: any,
  hosts: string[],
  id: string,
  methods: string[],
  name: string,
  paths: string[],
  preserve_host: boolean,
  protocols: string[],
  regex_priority: number,
  service: GatewayService,
  sources: string[],
  strip_path: boolean,
  updated_at: number
}

export type Plugin = {
  created_at: number,
  enabled: boolean,
  id: string,
  name: string,
  instance_name: string,
  protocols: string[],
  route: {
    description: string,
    id: string,
  },
  service: {
    description: string,
    id: string,
  },
  config: {
    description: string,
  },
  run_on: string,
  consumer: any,
  tags: string[],
  updated_at: number, 
  ordering: any,
}

// app-config - the backstage config object
export type KonnectConfig = {
  accessToken: string;
  baseUrl: string;
}

// konnect service interface
export interface KonnectAPI {
  getService(controlPlaneId: string , serviceId: string): Promise<GatewayService>;
  getRoutesByService(controlePlaneId: string, serviceId: string): Promise<Route[]>;
  getPluginsByService(controlPlaneId: string, serviceId: string): Promise<Plugin[]>;
}