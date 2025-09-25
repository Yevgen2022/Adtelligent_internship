declare module "virtual:ads" {
  import type { AdsClient } from "../ads/ads.types";
  const client: AdsClient;
  export default client;
}
