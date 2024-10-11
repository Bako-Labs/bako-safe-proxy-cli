/**
 * This is a stand-alone script that upgrades the bridge
 */
import {Vault} from "bakosafe";

import { debug } from '../utils';
import {Src14OwnedProxy} from "../proxy/types";

type GetOwnershipParams = {
  vault: Vault;
  proxyAddress: string;
};

export const getOwnership = async ({
  vault,
  proxyAddress,
}: GetOwnershipParams) => {
  const proxy = new Src14OwnedProxy(proxyAddress, vault);

  console.log(`Proxy(${proxyAddress}) get ownership script initiated`);
  console.log(
    '\t> Balance: ',
    (await vault.getBalance()).format({
      precision: 9,
    }),
  );

  debug('Detecting if the bridge is a proxy...');
  const owner: string | null = await proxy.functions
    .proxy_owner()
    .get()
    .then((result) => {
      debug('Proxy.proxy.owner() succeeded, assuming proxy');
      return result.value.Initialized?.Address?.bits ?? null;
    })
    .catch((e) => {
      console.error(e);
      debug(`Proxy.proxy_owner() failed with error: `);
      debug(`${JSON.stringify(e, undefined, 2)}`);
      return null;
    });

  console.log('\t> Owner: ', owner);
};
