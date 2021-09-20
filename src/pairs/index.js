const Web3 = require("web3");
const FACTORY_ABI = require("../ABI/uniswapFactory.json");

class PairHelper {
 
  constructor(provider,amm) {
    this.provider = provider;
    this.amm = amm;
    this.web3 = new Web3();
    this.web3.setProvider(provider);
    this.factory = new this.web3.eth.Contract(FACTORY_ABI, amm.FACTORY);
    this.from = this.web3.currentProvider.addresses[0];

  }
//pair creating 
  async createPair( token1, token2) {
    await this.factory.methods.createPair(token1, token2).send({
      from:this.from,
    });

    let pairAddr = await this.factory.methods.getPair(token1, token2).call();
    return pairAddr;
  }

  async getPair( token1, token2) {
    if(token1.address){
      token1 = token1.address;
    }
    if(token2.address){
      token2 = token2.address;
    }


    let pairAddr = await this.factory.methods.getPair(token1, token2).call();
    if (pairAddr === "0x0000000000000000000000000000000000000000") {
      // return await createPair(token1, token2);
    }
    return pairAddr;
  }

 
}

module.exports = PairHelper;
