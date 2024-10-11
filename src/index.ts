import { Option, program } from 'commander';

import { getBalance } from './actions/getBalance';
import { getImplementation } from './actions/getImplementation';
import { getOwnership } from './actions/getOwnership';
import { setImplementation } from './actions/setImplementation';
import { transferOwnership } from './actions/transferOwnership';
import { transferSelf } from './actions/transferSelf';
import { instanceVault } from './utils';

const optionProvider = new Option(
  '--providerUrl <provider>',
  'Provider URL is required!',
)
  .env('PROVIDER_URL')
  .makeOptionMandatory();
const optionAccountKey = new Option(
  '-a, --apiToken <apiToken>',
  'API Token is required!',
)
  .env('API_TOKEN')
  .makeOptionMandatory();

program
  .name('Proxy scripts')
  .description('Scripts for interacting with the proxy contract');

program
  .command('balance')
  .addOption(optionProvider)
  .addOption(optionAccountKey)
  .action(async (options) => {
    const vault = await instanceVault(options.apiToken, options.providerUrl);
    await getBalance({ vault });
  });

program
  .command('setImplementation')
  .addOption(optionProvider)
  .addOption(optionAccountKey)
  .requiredOption(
    '-p, --proxyAddress <proxyAddress>',
    'Proxy address is required!',
  )
  .requiredOption(
    '--implementationAddress <targetAddress>',
    'Implementation address is required!',
  )
  .action(async (options) => {
    const vault = await instanceVault(options.apiToken, options.providerUrl);
    await setImplementation({
      vault,
      proxyAddress: options.proxyAddress,
      implementationAddress: options.implementationAddress,
    });
  });

program
  .command('getImplementation')
  .addOption(optionProvider)
  .addOption(optionAccountKey)
  .requiredOption(
    '-p, --proxyAddress <proxyAddress>',
    'Proxy address is required!',
  )
  .action(async (options) => {
    const vault = await instanceVault(options.apiToken, options.providerUrl);
    await getImplementation({
      vault,
      proxyAddress: options.proxyAddress,
    });
  });

program
  .command('getOwnership')
  .addOption(optionProvider)
  .addOption(optionAccountKey)
  .requiredOption(
    '-p, --proxyAddress <proxyAddress>',
    'Proxy address is required!',
  )
  .action(async (options) => {
    const vault = await instanceVault(options.apiToken, options.providerUrl);
    await getOwnership({
      vault,
      proxyAddress: options.proxyAddress,
    });
  });

program
  .command('transferOwnership')
  .addOption(optionProvider)
  .addOption(optionAccountKey)
  .requiredOption(
    '-p, --proxyAddress <proxyAddress>',
    'Proxy address is required!',
  )
  .requiredOption('--newOwner <newOwner>', 'New owner address is required!')
  .action(async (options) => {
    const vault = await instanceVault(options.apiToken, options.providerUrl);
    await transferOwnership({
      vault,
      proxyAddress: options.proxyAddress,
      newOwner: options.newOwner,
    });
  });

program
  .command('transferSelf')
  .addOption(optionProvider)
  .addOption(optionAccountKey)
  .action(async (options) => {
    const vault = await instanceVault(options.apiToken, options.providerUrl);
    await transferSelf({ vault });
  });

program.parse().showSuggestionAfterError();
