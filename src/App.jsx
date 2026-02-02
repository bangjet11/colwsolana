import React, { useState } from "react";
import { airdropToken } from "./utils/solana";
import { getDeviceInfo, getIP } from "./utils/security";

export default function App() {
  const [wallet, setWallet] = useState(null);
  const [status, setStatus] = useState("");

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const resp = await window.solana.connect();
        setWallet(resp.publicKey.toString());
        setStatus("Wallet connected: " + resp.publicKey.toString());
      } catch (err) {
        setStatus("Wallet connection failed");
      }
    } else {
      setStatus("Phantom wallet not found");
    }
  };

  const registerAndClaim = async () => {
    const device = getDeviceInfo();
    const ip = await getIP();

    setStatus(`Registering... Device: ${device}, IP: ${ip}`);

    if (wallet) {
      await airdropToken(wallet);
      setStatus("Token claimed successfully!");
    } else {
      setStatus("Please connect wallet first");
    }
  };

  return (
    <div className="container">
      <h1>ColwSolana Airdrop</h1>
      <p>{status}</p>
      <button onClick={connectWallet}>Connect Wallet</button>
      <button onClick={registerAndClaim}>Register & Claim Token</button>
    </div>
  );
}
