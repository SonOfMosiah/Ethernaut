// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import log from "ololog";
import contractAbi from "../artifacts/contracts/Privacy.sol/Privacy.json";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const [signer] = await ethers.getSigners();
  const CONTRACT_ADDRESS = "0x36b3951048c7470d218660b425cf6e35872e7bc8";
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractAbi.abi,
    signer
  );

  // Storage Slots
  // 0: bool locked
  // 1: uint256 ID
  // 2: uint8 flattening, uint8 denomination, uint16 awkwardness
  // 3: bytes32 data[0]
  // 4: bytes32 data[1]
  // 5: bytes32 data[2]
  // 6: bytes32 data[3]

  let key = await ethers.provider.getStorageAt(CONTRACT_ADDRESS, 5);
  key = key.slice(0, 34);
  await contract.unlock(key);

  const locked = await contract.locked();
  log.yellow("locked:", locked);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
