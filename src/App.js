import logo from './logo.svg';
import './App.css';
import Unity, { UnityContext } from "react-unity-webgl";
import { useEtherBalance, useEthers, useSendTransaction ,useTokenBalance,useContractFunction} from '@usedapp/core';
import { formatEther,formatUnits} from '@ethersproject/units'
import ERC20Interface from './tokenAbi.json';
import { useCallback } from 'react';
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import Mintking from "./mintKing"
import MintSoldier from "./mintSoldier"
import TransferKing from  "./transferKing"
import TransferSoldier from  "./transferSoldier"
function DisplayKing(amount) {
  unityContext.send("Main Camera", "DisplayKing", amount);
}

function DisplaySoldier(amount) {
  unityContext.send("Main Camera", "DisplaySoldier", amount);
}

const unityContext = new UnityContext({
  loaderUrl: "Build/unity.loader.js",
  dataUrl: "Build/unity.data",
  frameworkUrl: "Build/unity.framework.js",
  codeUrl: "Build/unity.wasm",
});
const kingAddress = '0xC19Dd8094B73999dB263b27474127E990ccC03e6'
const soldierAddress = '0xC31Fe56810809199B28384e9E6bFfcbB2a31339c'
const App = () => { 
  const { activateBrowserWallet, account } = useEthers()

  const kingBalance = useTokenBalance(kingAddress, account)
  const soldierBalance = useTokenBalance(soldierAddress, account)

return <div>
    <div>
      <div className="card py-4">
        <h1 className="text-center">Warrior pigs tokens</h1>
        <p className="text-center">this demo use <a href="https://usedapp.readthedocs.io/en/latest/" target="_blank">usedapp</a>
        to connect to the wallet get the balance of tokens and mint new tokens and transfer </p>
        <p className="text-center">Every token are displayed in the unity</p>
        <p className="text-center"><a href="https://github.com/lucasespinosa28/pigstoken" target="_blank">Source code</a></p>
        <div>
          {!account && <button className="btn btn-info" onClick={() => {
            activateBrowserWallet(); 
            }}>Connect</button>}  
        </div>
    {account && kingBalance && DisplayKing(parseInt(formatUnits(kingBalance,18)))}
    {account && soldierBalance && DisplaySoldier(parseInt(formatUnits(soldierBalance,18)))}
    <div class="container">
      <div class="row">
        <div class="col">
          {account && <Mintking account={account}/>}
          {account && kingBalance && <TransferKing account={account} balance={kingBalance.toString()}/>}
        </div>
        <div class="col">
          {account && <MintSoldier account={account}/>}
          {account && soldierBalance && <TransferSoldier account={account} balance={soldierBalance.toString()}/>}
        </div>
      </div>
    </div>
    </div>
    </div>
    <div>
      </div>
    <div>
      <Unity unityContext={unityContext} />
    </div>
  </div>
    
}
export default App;
