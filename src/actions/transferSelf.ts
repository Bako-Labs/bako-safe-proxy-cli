import { bn } from 'fuels';
import {Vault} from "bakosafe";

type GetBalanceParams = {
  vault: Vault;
};

export async function transferSelf({ vault }: GetBalanceParams) {
  console.log(`\t> Account initiate a transfer of 0.0000001 to itself`);
  const transfer = await vault.transfer(
    vault.address,
    bn.parseUnits('0.0000001'),
  );
  await transfer.waitForResult();
  console.log(`\t> Transfer transaction ID: ${transfer.id}`);
}
