import {Vault} from "bakosafe";
import {Src14OwnedProxy} from "../proxy/types";

type GetImplementationParams = {
  vault: Vault;
  proxyAddress: string;
};

export async function getImplementation({
  vault,
  proxyAddress,
}: GetImplementationParams) {
  const proxy = new Src14OwnedProxy(proxyAddress, vault);

  console.log(`Proxy(${proxyAddress}) get implementation script initiated`);
  console.log('\t> Account address: ', vault.address.toB256());
  console.log(
    '\t> Balance: ',
    (await vault.getBalance()).format({
      precision: 9,
    }),
  );

  const { value: currentTarget } = await proxy.functions.proxy_target().get();

  console.log(`\t> Implementation: ${currentTarget?.bits ?? null}`);
}
