import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import styles from "../styles/Home.module.css"
import * as web3 from "@solana/web3.js"
import { useEffect, useState } from "react"

export const PagoEmpleado = () => {

  const link = () => {
    return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : ""
  }
  
  const [txSig, setTxSig] = useState("")
  const [balance, setBalance] = useState(0)
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  var Tpersonas;
  var Paga;
  var bal2, valor, VB;


  const sendSol=event=>{
    const llaves=[];
    event.preventDefault()
    if (!connection || !publicKey) {
      return
    }
    const transaction = new web3.Transaction()
    var i=document.getElementById('personas').value;
    for(var j=1;j<=i; j++){
      llaves[j]=document.getElementById('texto'+j).value;
      var variable=llaves[j].toString()
      console.log(variable);
      
      var x=Math.floor(VB,-2)
      console.log("VB " +  VB)
      console.log("x " + x)
      const recipientPubKey = new web3.PublicKey(variable)

      const sendSolInstruction = web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientPubKey,
        lamports: LAMPORTS_PER_SOL * VB
      })
      
    console.log(recipientPubKey);
    transaction.add(sendSolInstruction)

    setTimeout(function(){sendTransaction(transaction, connection).then(sig => {
      setTxSig(sig)
    })
      console.log("llaves " + llaves)
      console.log("Recipients" + recipientPubKey);
  },3000);
    }

  }
  
  useEffect(() => {
    if (!connection || !publicKey) {
      return
    }

    connection.getAccountInfo(publicKey).then(info => {
      setBalance(info.lamports)
    })
  }, [connection, publicKey])



function table(){

if(typeof document!=="undefined"){
  valor=""; 
  var input=document.getElementById("personas");
  
  input.addEventListener("input", function(event){
  valor=event.target.value;
  console.log(valor);
})
const tabla = document.getElementById("tabla");
const tbody = tabla.querySelector("tbody");
var bal2= document.getElementById("balance").innerHTML

input.addEventListener("input", () => {
  // Limpiamos la tabla antes de volver a generarla
  tbody.innerHTML = "";

  // Obtenemos el valor del input y lo convertimos a un número entero
  const num = parseInt(input.value);

  // Generamos una fila para cada número del 1 al valor del input
  for (let i = 1; i <= num; i++) {
    // Creamos una nueva fila y la agregamos al tbody
    const row = document.createElement("tr");
    tbody.appendChild(row);

    // Creamos dos celdas para cada fila (número y su cuadrado)
    const numCell = document.createElement("td");
    const textCell = document.createElement("td");

    // Agregamos el número a la primera celda
    numCell.textContent = i;

    // Creamos un campo de entrada de texto para la segunda celda
    const input = document.createElement("input");
    input.type = "text";
    input.minLength=44;
    input.maxLength=44;
    input.id = `texto${i}`; // Establecemos un nombre para el campo de texto
    textCell.appendChild(input);

    // Agregamos las celdas a la fila
    row.appendChild(numCell);
    row.appendChild(textCell);
    VB=balance/LAMPORTS_PER_SOL / valor;
    VB=VB-VB*.10
    document.getElementById("VB").innerHTML=VB;
    
  }
});



}

else{console.log("Nope");}
}
  return ( 
   
    <div>
      <form onSubmit={sendSol}>
        <div className={styles.header}>
            Bienvenido a tu cuenta
        </div>
        <div className={styles.row}>
            <div className={styles.columnside}>
                <p className={styles.nigblock}> Cuenta: <br/> {publicKey ? `${publicKey}` : ""}</p>
                 
                <p id="balance" className={styles.nigblock}>Balance: <br/> {publicKey ? `${balance / LAMPORTS_PER_SOL } SOL` : ""}</p>
                
                <p id="VB" className={styles.nigblock}>Balance repartido por n° personas:<br/>{publicKey? ` ${VB}`:""}</p>
            </div>
            <div className={styles.columnmiddle}>
                <p>No. de empleados: &nbsp;  
                  <input className={styles.input} type="number" id="personas" min="1" max="20" placeholder="Ej: 2" required  >
                  
                  </input>
                </p>
                
                <br></br>
                <table id="tabla" className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                        <th className={styles.th}>No. de persona</th>
                        <th className={styles.th}>Llave de cuenta</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                <br/>
            </div>
        </div>
          <center>
            <button className={styles.button} onClick={table()}>
              Realizar Transacciones
            </button>
          </center> 
        </form>
    </div>   
  )
}