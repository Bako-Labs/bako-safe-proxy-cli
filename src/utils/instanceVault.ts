import { Provider } from 'fuels';
import {generateCLIAuth, API_URL} from "./api";
import {BakoProvider, Vault} from "bakosafe";

export async function instanceVault(key: string, providerUrl: string) {
  if (!key || !providerUrl) {
    throw new Error('API Token and provider URL are required!');
  }
  let provider = await Provider.create(providerUrl);
  const cliAuth = await generateCLIAuth({
    token: key,
    network: {
      url: provider.url,
      chainId: provider.getChainId(),
    }
  });
  provider = await BakoProvider.create(provider.url, {
    token: cliAuth.code,
    address: cliAuth.address,
    serverApi: API_URL,
  });

  return new Vault(provider, cliAuth.configurable);
}
