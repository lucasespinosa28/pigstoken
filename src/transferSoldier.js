import React, { useState } from "react";
import { useContractFunction} from '@usedapp/core';
import ERC20Interface from './tokenAbi.json';
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'


const soldierAddress = '0xC31Fe56810809199B28384e9E6bFfcbB2a31339c'
const abi = new utils.Interface(ERC20Interface)
const soldierContract = new Contract(soldierAddress, abi)
const TransSoldier = (account,balance) => { 
  const { send } = useContractFunction(soldierContract, 'transfer')
  const [Amount, setAmount] = useState("");
  const [Receiver , setReceiver] = useState("");
  const sendTransfer = (recipient,amount) => {
    amount = amount*1e18
    if(amount <= account.balance){
      send(recipient,amount.toString())
    }
  }

  return <div className="row g-3">
    <div class="col-auto">
      <input  className="form-control" id="InputSoldierAmount" type="number"  placeholder="Amount" onChange={e => setAmount(e.target.value)} ></input>
    </div>
    <div class="col-auto">
      <input  className="form-control" id="SendSoldierAddress" type="text"   placeholder="Receiver address" onChange={e => setReceiver(e.target.value)} ></input>
    </div>
    <div class="col-auto">
      {account && <button className="btn btn-success mb-3" onClick={() => sendTransfer(Receiver,Amount)}>Transfer</button>}
    </div>
  </div>
    
}
export default TransSoldier;
