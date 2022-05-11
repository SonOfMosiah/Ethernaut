// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const ForceAttacker = await ethers.getContractFactory("ForceAttacker");
  const forceAttacker = await ForceAttacker.deploy(
    "0x0DAe3abEd8d1553a2869C475bbfa98A6865Bec48",
    {
      value: ethers.utils.parseEther("0.1"),
      gasLimit: 1000000,
    }
  );

  await forceAttacker.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
