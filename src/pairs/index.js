

 
 const Web3 = require("web3");
 const FACTORY_ABI =require("../ABI/uniswapFactory.json")


  const createPair =async (factory,token1,token2,from) =>{

    await factory.methods.createPair(token1,token2).send({
      from
    });
  
    let pairAddr = await factory.methods.getPair(token1,token2).call();
    return pairAddr;
  }

  const getPair =async (factory,token1,token2,from) =>{
    let pairAddr = await factory.methods.getPair(token1,token2).call();

     
    if(!pairAddr){
      return await createPair(factory,token1,token2,from)
    }
    return pairAddr

  }





  module.exports =  getPairAddress =async (provider,AMM,token1,token2)=>{
    const web3 = new Web3();
    web3.setProvider(provider);
    const factory = new web3.eth.Contract(FACTORY_ABI, AMM.FACTORY);
    const from = web3.currentProvider.selectedAddress;
    return getPair(factory,token1,token2,from);
  }