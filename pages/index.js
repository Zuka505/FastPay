import styles from "../styles/Home.module.css"
import Head from 'next/head';
import WalletContextProvider from "../components/WalletContextProvider"
import { AppBar } from "../components/AppBar"
import { SendSolForm } from "../components/SendSolForm"
import { PagoEmpleado } from "../components/PagoEmpleado"

const Home = props => {
  return (
    <div className={styles.App}>
      <Head>
        <title>FastPay</title>
      </Head>
      <WalletContextProvider>
        <div className={styles.background}>
          <AppBar />
          <div className={styles.AppBody}>
            <SendSolForm />
            <PagoEmpleado />
          </div>
        </div>
      </WalletContextProvider>
    </div>
  )
}

export default Home