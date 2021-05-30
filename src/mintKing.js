import { useContractFunction} from '@usedapp/core';
import React, { useState } from "react";
import ERC20Interface from './tokenAbi.json';
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'


const kingAddress = '0xC19Dd8094B73999dB263b27474127E990ccC03e6'
const abi = new utils.Interface(ERC20Interface)
const kingContract = new Contract(kingAddress, abi)
const MintKing = (account) => { 
  const { send , state} = useContractFunction(kingContract, 'mintMinerReward')
  var hash
  if(state.receipt){
    hash = state.receipt.transactionHash
  }
  
  return <div className="row">
     <div className="col-auto">
         <h3>Mint a new token XPK,after minting the unit will show a king pig </h3>
     </div>
     <div className="col-auto">
     {account && <button className="btn btn-primary mb-3" onClick={() =>{send()}}>Mint king</button>}
     </div>
     <div className="col-auto">
      {hash && <a href={"https://kovan.etherscan.io/tx/"+hash} target="_blank">{hash}</a>}
     </div>
   </div>
}
export default MintKing;
