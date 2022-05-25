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
  const NewBuilding = await ethers.getContractFactory("NewBuilding");
  const newBuilding = await NewBuilding.deploy();
  await newBuilding.deployed();

  const elevator = await newBuilding.goToTop(
    "0x8C64DF8b12eb419112AaFAC713e6276a620E8cDA"
  );
  await elevator.wait();
  log.yellow("elevator:", elevator.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
