import {Vault} from "bakosafe";

type GetBalanceParams = {
  vault: Vault;
};

export async function getBalance({ vault }: GetBalanceParams) {
  const balance = await vault.getBalance();
  console.log(
    `${vault.address.toB256()}: ${balance.format({
      precision: 9,
    })}`,
  );
}
