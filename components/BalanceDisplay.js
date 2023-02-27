import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"

export const BalanceDisplay = () => {
  const [balance, setBalance] = useState(0)
  const { connection } = useConnection()
  const { publicKey } = useWallet()

  useEffect(() => {
    if (!connection || !publicKey) {
      return
    }

    connection.getAccountInfo(publicKey).then(info => {
      setBalance(info.lamports)
    })
  }, [connection, publicKey])

  return (
    <div>
      <div className="nigblock">{publicKey ? `Cuenta: ${publicKey}` : ""}</div>
      <div className={styles.nigblock}>{publicKey ? `Balance: ${balance / LAMPORTS_PER_SOL} SOL` : ""}</div>       
    </div>   
  )
}
