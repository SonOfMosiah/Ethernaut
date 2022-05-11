// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import log from "ololog";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Token = await ethers.getContractFactory("Token");
  const token = Token.attach("0xf490817f01d80AA0b6010E21e1ed4c12700128fB");

  const transfer = await token.transfer(
    "0x661Cd43A26B92995C5eE8A21Cc3D715FE830576e",
    21
  );
  await transfer.wait();
  log.yellow("transfer:", transfer.hash, transfer);

  const balance = await token.balanceOf(
    "0xBF7BF3d445aEc7B0c357163d5594DB8ca7C12D31"
  );
  log.yellow("balance:", balance.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
