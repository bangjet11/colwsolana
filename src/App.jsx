import React, { useMemo, useCallback } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton
} from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from "@solana/wallet-adapter-wallets";

import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

// Komponen untuk claim token
function AirdropButton() {
  const { publicKey } = useWallet();

  const claim = useCallback(async () => {
    if (!publicKey) {
      alert("Connect wallet dulu!");
      return;
    }
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const sig = await connection.requestAirdrop(publicKey, 0.1 * LAMPORTS_PER_SOL);
      await connection.confirmTransaction(sig, "confirmed");
      alert("Airdrop sukses ke: " + publicKey.toBase58());
    } catch (err) {
      console.error(err);
      alert("Airdrop gagal");
    }
  }, [publicKey]);

  return (
    <button onClick={claim} disabled={!publicKey}>
      Claim Token
    </button>
  );
}

export default function App() {
  const endpoint = clusterApiUrl("devnet");

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network: "devnet" })
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="container">
            <h1>ColwSolana Airdrop</h1>
            <WalletMultiButton />
            <AirdropButton />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
