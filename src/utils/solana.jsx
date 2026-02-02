import { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export async function airdropToken(walletAddress) {
  try {
    const pubKey = new PublicKey(walletAddress);
    const signature = await connection.requestAirdrop(pubKey, 0.1 * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(signature, "confirmed");
    console.log("Airdrop success:", signature);
  } catch (err) {
    console.error("Airdrop failed:", err);
  }
}
