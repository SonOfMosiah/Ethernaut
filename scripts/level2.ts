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
  const Fallout = await ethers.getContractFactory("Fallout");
  const fallout = Fallout.attach("0xa7aB5C517e5FD2616c0266c4D966CfbCCC1C0B35");

  const fal1out = await fallout.Fal1out({
    value: ethers.utils.parseEther("0.0001"),
  });

  await fal1out.wait();
  log.yellow("contribute:", fal1out.hash);

  const collect = await fallout.collectAllocations();
  await collect.wait();
  log.yellow("fallback:", collect.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
