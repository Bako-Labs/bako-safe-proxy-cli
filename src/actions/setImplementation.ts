import { Vault } from 'bakosafe';
import { Address } from 'fuels';
import { Src14OwnedProxy } from '../proxy/types';

type SetImplementationParams = {
  vault: Vault;
  proxyAddress: string;
  implementationAddress: string;
};

export async function setImplementation({
                                          vault,
                                          proxyAddress,
                                          implementationAddress
                                        }: SetImplementationParams) {
  const proxy = new Src14OwnedProxy(proxyAddress, vault);

  console.log(`Proxy(${proxyAddress}) set implementation script initiated`);
  console.log('\t> Owner address: ', vault.address.toB256());
  console.log(
    '\t> Balance: ',
    (await vault.getBalance()).format({
      precision: 9
    })
  );

  const contractResult = await vault.provider.getContract(
    implementationAddress
  );
  if (!contractResult?.id) {
    console.log(`\t> Implementation ${implementationAddress} not found`);
    return;
  }

  const { value: currentTarget } = await proxy.functions.proxy_target().get();
  if (currentTarget?.bits === implementationAddress) {
    console.log(
      `\t> Implementation ${implementationAddress} is already live in the proxy`
    );
    return;
  }

  console.log('\t> New implementation at ', implementationAddress);
  const contractId = Address.fromB256(implementationAddress);
  const contractIdentityInput = { bits: contractId.toB256() };
  const request = await proxy.functions
    .set_proxy_target(contractIdentityInput)
    .getTransactionRequest();

  const { hashTxId } = await vault.BakoTransfer(request, {
    name: 'Proxy Set Implementation'
  });

  console.log('\t> Transaction ID: ', hashTxId);
}
