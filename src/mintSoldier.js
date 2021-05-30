import { useContractFunction} from '@usedapp/core';
import React, { useState } from "react";
import ERC20Interface from './tokenAbi.json';
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'


const soldierAddress = '0xC31Fe56810809199B28384e9E6bFfcbB2a31339c'
const abi = new utils.Interface(ERC20Interface)
const soldierContract = new Contract(soldierAddress, abi)
const MintSoldier = (account) => { 
  const { send,state } = useContractFunction(soldierContract, 'mintMinerReward')
  var hash
  if(state.receipt){
    hash = state.receipt.transactionHash
  }
  
  console.log(hash)
   return <div className="row">
   <div className="col-auto">
     <h3>Mint a new token XPS,after minting the unit will show a soldier pig </h3>
   </div>
   <div className="col-auto">
     {account && <button className="btn btn-primary mb-3" onClick={() =>{send()}}>Mint Soldier</button>}
   </div>
   <div className="col-auto">
    {hash && <a href={"https://kovan.etherscan.io/tx/"+hash} target="_blank">{hash}</a>}
   </div>
 </div>
    
}
export default MintSoldier;
