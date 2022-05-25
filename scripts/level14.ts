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
  const CONTRACT_ADDRESS = "0xF4E7b43c946F00EBc4452a32e6Da1A9885117046";
  const GateAttackerTwo = await ethers.getContractFactory("GateAttackerTwo");
  const gateAttackerTwo = await GateAttackerTwo.deploy(CONTRACT_ADDRESS);
  await gateAttackerTwo.deployed();
  log.yellow("GateAttackerTwo:", gateAttackerTwo.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
