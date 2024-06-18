import * as crypto from "crypto";


export async function getTransactionData(order) {
    const TERMINAL = process.env.BORICA_TERMINAL;
    const TRTYPE = "90";
    const ORDER = order;
    const TRAN_TRTYPE = "1";
    const NONCE = crypto.randomBytes(16).toString("hex").toUpperCase(); // Формиране на сигнатура за подписване, Размер: 1-64
    
    if (ORDER) {
      const P_SIGN =
        `${TERMINAL.length}${TERMINAL}` +
        `${TRTYPE.length}${TRTYPE}` +
        `${ORDER.length}${ORDER}` +
        `${NONCE.length}${NONCE}`;
  
      const sign = crypto.createSign("SHA256");
  
      //   // Update the sign object with the P_SIGN data
      sign.update(P_SIGN);
  
      // const encode = Buffer.from(BORICA_DEV_PRIVATE_KEY).toString('base64');

      const decodedPrivateKey = Buffer.from(process.env.BORICA_DEV_PRIVATE_KEY, 'base64').toString('utf-8');
      
  
      // let decodedPrivateKey = Buffer.from(privateKey, "base64").toString("utf-8");
      // let decodedPrivateKey = btoa(privateKey).toString();

      // console.log(decodedPrivateKey)
  
      // Sign the data and convert it to a hex string
      const signature = sign.sign(
        { key: decodedPrivateKey, passphrase: process.env.BORICA_DEV_PASSPHRASE },
        "hex"
      );
  
      let data = {
        TERMINAL: TERMINAL,
        TRTYPE: TRTYPE,
        ORDER: ORDER,
        TRAN_TRTYPE: TRAN_TRTYPE,
        NONCE: NONCE,
        P_SIGN: signature.toUpperCase(),
      };
  
      const request = await fetch(process.env.BORICA_DEV_GATEWAY, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data),
      });
  
      const response = await request.json();
  
      return response;
    }
  }