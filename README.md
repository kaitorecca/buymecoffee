# ElectroTip

**ElectroTip** is a decentralized tipping platform built on the Electroneum blockchain, enabling anyone to receive tips instantly by sharing a simple URL like `https://yourdomain.com/?wallet_id=0xCreatorWallet&user_id=User123`. Forget platforms like Buy Me a Coffee, Ko-fi, or Patreon that take 5-20% of your revenue—ElectroTip uses Electroneum’s fast, secure, and low-cost blockchain to deliver tips directly to your wallet with no middleman. No bank accounts, no lengthy verification, no piles of paperwork—just a URL to start earning from your GitHub, OnlyFans, or any digital presence. Designed for creators worldwide, especially in developing countries, it’s a game-changer for hassle-free online income.

This project was submitted to the **Electroneum Hackathon 2025**.

---

## Repository Contents
- `ElectroTipV4.sol`: Smart contract for handling tips on Electroneum Testnet.
- `index.html`: Front-end interface for sending tips via MetaMask.
- `server.js` *(optional)*: Node.js server for callback verification of tip transactions.
- `creator-setup.html` : Front-end interface for generating the link.
---

## Prerequisites
To run ElectroTip, you’ll need:
- **MetaMask**: Browser extension for wallet management.
- **Electroneum Testnet Funds**: Free ETN from [Electroneum Testnet Faucet](https://faucet.electroneum.com/).
- **Node.js** *(optional, for server)*: Version 18.x or higher, if running the callback server.
- A modern web browser (e.g., Chrome, Firefox).

---

## Setup Instructions

### 1. Deploy the Smart Contract
1. **Open Remix**: Go to [Remix IDE](https://remix.ethereum.org/).
2. **Load Contract**: Create a new file, paste the contents of `ElectroTipV4.sol`.
3. **Compile**:  
   - Select Solidity version `0.8.19` in the Solidity Compiler tab.
   - Click "Compile ElectroTipV4.sol".
4. **Deploy**:  
   - In the "Deploy & Run Transactions" tab, set Environment to **Injected Provider - MetaMask**.
   - Connect MetaMask to Electroneum Testnet (see below).
   - Click "Deploy" and confirm the transaction in MetaMask.
5. **Get Contract Address**: Copy the deployed contract address from Remix (e.g., `0xYourContractAddress`).

### 2. Configure MetaMask for Electroneum Testnet
1. Open MetaMask and click **Add Network** > **Add a network manually**.
2. Enter the following details:
   - **Network Name**: Electroneum Testnet
   - **New RPC URL**: [Get from ANKR](https://www.ankr.com/rpc/?utm_referral=Electroneum2025) (e.g., `https://rpc.ankr.com/electroneum_testnet/...`)
   - **Chain ID**: `5201420` (verify in [Electroneum Docs](https://docs.electroneum.com/))
   - **Currency Symbol**: ETN
   - **Block Explorer URL**: `https://blockexplorer.electroneum.com/`
3. Save and switch to this network.
4. Get test ETN: Visit [Electroneum Faucet](https://faucet.electroneum.com/), paste your MetaMask address, and request funds.

### 3. Run the Front-end
1. **Update Contract Address**:  
   - Open `index.html` in a text editor.
   - Replace `const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE"` with the address from step 1 (e.g., `0xYourContractAddress`).
2. **Host Locally**:  
   - Open `index.html` directly in a browser (drag into Chrome) or use a local server (e.g., `npx serve`).
3. **Test**:  
   - Access with a URL like `http://localhost:3000/?wallet_id=0xCreatorWallet&user_id=TestUser`.
   - Connect MetaMask, enter an amount (e.g., `0.1` ETN), and click "Send Tip".
   - Check the creator’s wallet on [Electroneum Block Explorer](https://blockexplorer.electroneum.com/) to confirm the tip.

### 4. (Optional) Run the Callback Server
1. **Install Dependencies**:  
   - Navigate to the repo folder in terminal.
   - Run `npm install express ethers@5.7.2`.
2. **Update Server Config**:  
   - Open `server.js`.
   - Replace `YOUR_ANKR_RPC_URL_HERE` with your ANKR RPC URL.
   - Replace `YOUR_CONTRACT_ADDRESS_HERE` with the deployed contract address.
3. **Start Server**:  
   - Run `node server.js`.
   - Expose publicly with ngrok: `ngrok http 3000` (get URL like `https://abc123.ngrok.io`).
4. **Update HTML**:  
   - In `index.html`, set `callbackUrl` to your ngrok URL (e.g., `https://abc123.ngrok.io/tip-notify`).
5. **Test**: Send a tip and check server console for verified transaction logs.

---

## Usage
- **For Creators**: Share a URL like `https://yourdomain.com/?wallet_id=0xYourWallet&user_id=YourID` on your GitHub, OnlyFans, or anywhere you have fans. No need for Buy Me a Coffee or Ko-fi taking 20% of your earnings—keep it all with Electroneum’s low fees. No bank account setup, no verification delays—just a wallet and a link.
- **For Users**: Open the creator’s URL, connect MetaMask, enter an amount, and tip instantly. If your balance is low, grab more ETN from the faucet link in the error message.
- **Why It’s Better**: Fast (5-second confirmations), secure (blockchain-based), and convenient—no paperwork or middlemen. Perfect for creators in developing countries where traditional payment systems are a barrier.

---

## Project Link
- **GitHub Repository**: `https://github.com/yourusername/ElectroTip` *(replace with your actual repo URL)*  
- **Demo URL**: `https://yourusername.github.io/ElectroTip/` *(if hosted on GitHub Pages)*  
- **Contract Address**: `https://blockexplorer.electroneum.com/address/0xYourContractAddress` *(replace with your deployed address)*

---

## Notes
- Ensure MetaMask is on **Electroneum Testnet** before interacting with the app.
- Gas costs are minimal but require some ETN in your wallet.
- The callback server is optional but adds tip verification for creators who need it.

---

## License
MIT License - feel free to use, modify, and distribute this code.
Author: Tai Tran