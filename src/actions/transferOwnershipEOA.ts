/**
 * This is a stand-alone script that upgrades the bridge
 */
import { Account, Address } from 'fuels';

import { debug } from '../utils';
import { Src14OwnedProxy } from '../proxy/types';
import { Vault } from 'bakosafe';

type TransferOwnershipEOAParams = {
  vault: Vault;
  account: Account;
  proxyAddress: string;
};

export const transferOwnershipEOA = async ({
                                             vault,
                                             account,
                                             proxyAddress
                                           }: TransferOwnershipEOAParams) => {
  const proxy = new Src14OwnedProxy(proxyAddress, account);

  console.log(`Proxy(${proxyAddress}) transfer ownership script initiated`);
  console.log('\t> Owner address: ', vault.address.toB256());
  console.log(
    '\t> Balance: ',
    (await vault.getBalance()).format({
      precision: 9
    })
  );

  debug('Detecting if contract is a proxy...');
  const owner: string | null = await proxy.functions
    .proxy_owner()
    .get()
    .then((result) => {
      debug('Proxy._proxy.owner() succeeded, assuming proxy');
      return result.value.Initialized.Address.bits;
    })
    .catch((e) => {
      debug(`Proxy._proxy_owner() failed with error: `);
      debug(`${JSON.stringify(e, undefined, 2)}`);
      return null;
    });

  if (owner === null) {
    console.log('Could not fetch the proxy owner, is it a proxy?');
    return;
  }

  if (
    owner.replace('0x', '').toLowerCase() !==
    account.address.toB256().replace('0x', '').toLowerCase()
  ) {
    console.log(`\t> Owner mismatch, contract owned by ${owner}`);
    return;
  }

  // New owner should be a valid b256 address
  const address = vault.address;
  const addressInput = { bits: address.toB256() };
  const addressIdentityInput = { Initialized: { Address: addressInput } };
  const request = await proxy.functions
    .set_proxy_owner(addressIdentityInput)
    .call();
  console.log('\t> Transaction ID: ', request.transactionId);
  await request.waitForResult();
};
