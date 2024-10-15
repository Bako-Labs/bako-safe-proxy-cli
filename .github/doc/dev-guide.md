# How to secure your contracts using Bako Vaults

- [How transfer ownership from EOA to Bako Vault?](#deploying-your-contract-and-transferring-ownership-to-bako-vault)
- [How to upgrade?](#how-to-upgrade)

## How transfer ownership from EOA to Bako Vault?

1. Deploy your contract using a EOA account

    ```zsh
    cd path/to/your/contract
   
    # Deploy your contract using fuels
    pnpm fuels deploy
   
    # Or deploy using forc
    pnpm forc deploy
    ```

2. Once deploy is complete install CLI

    ```zsh
    pnpm install -g bakosafe-proxy-cli
    ```

3. Create a Bako Vault

   [![Watch the video](https://img.youtube.com/vi/VZtqEc5sP-0/maxresdefault.jpg)](https://www.youtube.com/watch?v=VZtqEc5sP-0)

4. Create a API Token

   In the BakoSafe APP, go to settings, create a new API Token and copy the token.

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

   Open [BakoSafe APP](https://safe.bako.global/), login and sign the transaction on Vault page or Home page
