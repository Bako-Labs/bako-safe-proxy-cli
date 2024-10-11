# How to secure your contracts using Bako Vaults

## How transfer ownership from EOA to Bako Vault?

1. Deploy your contract using a EOA account

> Use [forc deploy](https://docs.fuel.network/docs/forc/plugins/forc_deploy/#forc-deploy)
> or [fuels deploy](https://docs.fuel.network/docs/fuels-ts/fuels-cli/commands/#fuels-deploy)

2. Once deploy is complete install CLI

```zsh
pnpm install -g bakosafe-proxy-cli
```

3. Create a Bako Vault

> Open [BakoSafe APP](https://safe.bako.global/), create an account and create a new vault

4. Create a API Token

> In the BakoSafe APP, go to settings, create a new API Token and copy the token

5. Open the terminal and Call transferOwnershipEOA using the deployer EOA to set Bako Vault as the owner

```zsh
export EOA_KEY='<account-private-key>'
export PROVIDER_URL='<provider-url>'
export API_TOKEN='<api-token>'

bakosafe-proxy-cli transferOwnershipEOA -p '<proxy-address>'
```

6. Now your multisig is the Owner of Contract

## How to Upgrade?

1. Deploy the implementation contract using a EOA
2. Using the CLI you can call setImplementation and provide the Contract ID.

```zsh
export PROVIDER_URL='<provider-url>'
export API_TOKEN='<api-token>'

bakosafe-proxy-cli setImplementation -p '<proxy-address>' --implementationAddress '<implementation-address>'
```

3. Now sign the transaction using your Vault.

> Open [BakoSafe APP](https://safe.bako.global/), login and sign the transaction on Vault page or Home page
