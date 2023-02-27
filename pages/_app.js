import '../styles/globals.css'
import styles from "../styles/background.css"

function MyApp({ Component, pageProps }) {
  return( 
    <div className={styles.background}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
