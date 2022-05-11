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
  const Fallback = await ethers.getContractFactory("Fallback");
  const fallback = Fallback.attach(
    "0x06505ccDb9A31719cE616FC636a4E27D63547F26"
  );

  const contribute = await fallback.contribute({
    value: ethers.utils.parseEther("0.0001"),
  });

  await contribute.wait();
  log.yellow("contribute:", contribute.hash);

  const fallbackFunction = await fallback.fallback({
    value: ethers.utils.parseEther("0.0001"),
  });
  await fallbackFunction.wait();
  log.yellow("fallback:", fallbackFunction.hash);

  const withdraw = await fallback.withdraw();
  await withdraw.wait();
  log.yellow("withdraw:", withdraw.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
