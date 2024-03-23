import './App.css';
import { ethers } from "ethers";
import { useState } from 'react';


function App() {

  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState([]);


  const logar = async () => {
    let signer = null;
    let provider;

    if (window.ethereum == null) {

      // If MetaMask is not installed, we use the default provider,
      // which is backed by a variety of third-party services (such
      // as INFURA). They do not have private keys installed,
      // so they only have read-only access
      console.log("MetaMask not installed; using read-only defaults")
      provider = ethers.getDefaultProvider()

    } else {

      // Connect to the MetaMask EIP-1193 object. This is a standard
      // protocol that allows Ethers access to make all read-only
      // requests through MetaMask.
      provider = new ethers.BrowserProvider(window.ethereum)

      // It also provides an opportunity to request access to write
      // operations, which will be performed by the private key
      // that MetaMask manages for the user.
      signer = await provider.getSigner();

      // Obtém a conta conectada
      const account = await provider.listAccounts();
      const selectedAccount = account[0];

      setAccount(selectedAccount.address);
      setConnected(true);
    }
  }

  return (
    <div className="App">
      <header className="App-header">

        <div className="Account-log">
          {connected ?
            (<p>Conectado com a carteira <p>{account}</p></p>)
            : (<p>Nenhuma carteira conectada</p>)
          }
        </div>

        <button className="connect-wallet-button" onClick={logar}>Connect Wallet</button>
        <p className="balance">Seu saldo: 50000.00 UT</p>

        <div className="boddy-container">

          <img src="./images/token-img.png" alt="Example" className="image" />

          <div>
            <input
              type="text"
              className="input-field"
              placeholder="Digite o endereço de destino"
            // value={}
            //onChange={}
            />
          </div>

          <input
            type="text"
            className="input-field"
            placeholder="Digite o valor"
          // value={}
          //onChange={}
          />

          <div className='input-button-container'>
            <button className="send-button" >ENVIAR</button>
          </div>


        </div>

      </header>
    </div>
  );
}

export default App;
