import React, { useState } from "react";
import { useContractFunction} from '@usedapp/core';
import ERC20Interface from './tokenAbi.json';
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'


const kingAddress = '0xC19Dd8094B73999dB263b27474127E990ccC03e6'
const abi = new utils.Interface(ERC20Interface)
const kingContract = new Contract(kingAddress, abi)
const Transferking = (account,balance) => { 
  const { send } = useContractFunction(kingContract, 'transfer')
  const [Amount, setAmount] = useState("")
  const [Receiver , setReceiver] = useState("")
  const sendTransfer = (recipient,amount) => {
    amount = amount*1e18
    if(amount <= account.balance){
      send(recipient,amount.toString())
    }
  }

  return <div className="row g-3">
  <div className="col-auto">
    <input  className="form-control" id="InputSoldierAmount" type="number"  placeholder="Amount" onChange={e => setAmount(e.target.value)} ></input>
  </div>
  <div className="col-auto">
    <input  className="form-control" id="SendSoldierAddress" type="text"   placeholder="Receiver address" onChange={e => setReceiver(e.target.value)} ></input>
  </div>
  <div className="col-auto">
    {account && <button className="btn btn-success mb-3" onClick={() => sendTransfer(Receiver,Amount)}>Transfer</button>}
  </div>
</div>
    
}
export default Transferking;
