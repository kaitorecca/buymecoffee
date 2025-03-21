const express = require("express");
const ethers = require("ethers");
const app = express();
app.use(express.json());

// Configure RPC for Electroneum Testnet
const rpcUrl = "YOUR_ANKR_RPC_URL_HERE"; // Get from https://www.ankr.com/rpc/?utm_referral=Electroneum2025
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

// ElectroTipV4 contract address
const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
const abi = [
    {"inputs":[{"internalType":"address payable","name":"_creator","type":"address"},{"internalType":"string","name":"_userId","type":"string"}],"name":"sendTip","outputs":[],"stateMutability":"payable","type":"function"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"creator","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"string","name":"userId","type":"string"}],"name":"TipSent","type":"event"}
];
const contract = new ethers.Contract(contractAddress, abi, provider);

app.post("/tip-notify", async (req, res) => {
    const { user_id, creator_wallet, amount, tx_hash } = req.body;

    try {
        // Get transaction information from the blockchain
        const txReceipt = await provider.getTransactionReceipt(tx_hash);
        if (!txReceipt) {
            return res.status(400).json({ error: "Transaction not found" });
        }

        // Check if the transaction is related to the contract
        if (txReceipt.to.toLowerCase() !== contractAddress.toLowerCase()) {
            return res.status(400).json({ error: "Transaction not sent to ElectroTip contract" });
        }

        // Get the TipSent event log from the transaction
        const logs = txReceipt.logs.map(log => contract.interface.parseLog(log));
        const tipEvent = logs.find(log => log && log.name === "TipSent");
        if (!tipEvent) {
            return res.status(400).json({ error: "No TipSent event found in transaction" });
        }

        // Verify data from the callback
        const eventSender = tipEvent.args.sender;
        const eventCreator = tipEvent.args.creator;
        const eventAmount = ethers.utils.formatEther(tipEvent.args.amount);
        const eventUserId = tipEvent.args.userId;

        if (
            eventCreator.toLowerCase() !== creator_wallet.toLowerCase() ||
            eventAmount !== amount.toString() ||
            eventUserId !== user_id
        ) {
            return res.status(400).json({ error: "Callback data does not match blockchain record" });
        }

        // If everything matches, log the transaction
        console.log("Valid tip received:", {
            user_id,
            creator_wallet,
            amount,
            tx_hash,
            sender_wallet: eventSender
        });
        res.status(200).json({ message: "Tip verified and logged" });
    } catch (error) {
        console.error("Error verifying tip:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));