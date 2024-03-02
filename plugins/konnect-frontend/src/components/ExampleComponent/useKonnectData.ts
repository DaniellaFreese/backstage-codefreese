import { Entity } from '@backstage/catalog-model';
import { Config } from '@backstage/config';

export const KONNECT_CONTROLPLANE_ID = 'konnect/control-plane-id';
export const KONNECT_GATEWAY_SERVICE_ID = 'konnect/gateway-service-id';

export const useKonnectEntityData = ({ entity }: { entity: Entity }) => {
  const controlPlaneId = entity.metadata.annotations?.[KONNECT_CONTROLPLANE_ID] ?? '';
  const gatewayServiceId = entity.metadata.annotations?.[KONNECT_GATEWAY_SERVICE_ID] ?? '';

  return {
    controlPlaneId,
    gatewayServiceId,
  };
};

export const useKonnectConfigData = ({config} :{ config: Config }) => {
  const baseUrl = config.getOptionalString('konnect.cloudUrl') ?? 'https://cloud.konghq.com/us';
    return {
      baseUrl,
    }
};
