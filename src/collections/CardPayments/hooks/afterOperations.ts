import { CollectionAfterOperationHook } from "payload/types";
import * as crypto from "crypto";

const ACTION = ["0", "1", "2", "3", "7", "21"];

function recordTransactionData(data: any, result: any) {
    result.ACTION = data.ACTION
    result.STATUSMSG = data.STATUSMSG
    result.RC = data.RC
    result.AMOUNT = data.AMOUNT
    result.CURRENCY = data.CURRENCY
    result.ORDER = data.ORDER
    result. DESC = data.DESC
    result.TIMESTAMP = data.TIMESTAMP
    result.LANG = data.LANG
    result.TRAN_TRTYPE = data.TRAN_TRTYPE
    result.RRN = data.RRN
    result.INT_REF = data.INT_REF
    result.PARES_STATUS = data.PARES_STATUS
    result.AUTH_STEP_RES = data.AUTH_STEP_RES
    result.CARDHOLDERINFO = data.CARDHOLDERINFO
    result.ECI = data.ECI
    result.CARD = data.CARD
    result.CARD_BRAND = data.CARD_BRAND
}

export const afterOperationHook: CollectionAfterOperationHook = async ({
  args, // arguments passed into the operation
  operation, // name of the operation
  req, // full express request
  result, // the result of the operation, before modifications
}) => {

async function getTransactionData(result: any) {
    const TERMINAL = process.env.BORICA_TERMINAL;
    const TRTYPE = "90";
    const ORDER = result.ORDER;
    const TRAN_TRTYPE = "1";
    const NONCE = crypto.randomBytes(16).toString("hex").toUpperCase(); // Формиране на сигнатура за подписване, Размер: 1-64
  
    console.log(TERMINAL, TRTYPE, ORDER, TRAN_TRTYPE, NONCE)
  
    if (ORDER) {
      const P_SIGN =
        `${TERMINAL.length}${TERMINAL}` +
        `${TRTYPE.length}${TRTYPE}` +
        `${ORDER.length}${ORDER}` +
        `${NONCE.length}${NONCE}`;
  
      const sign = crypto.createSign("SHA256");
  
      //   // Update the sign object with the P_SIGN data
      sign.update(P_SIGN);
  
      let privateKey = process.env.BORICA_DEV_PRIVATE_KEY;
  
      let decodedPrivateKey = Buffer.from(privateKey, "base64").toString("utf-8");
  
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
  console.log("After operation hook");

  console.log(operation);
  console.log(result)

  if (operation === "create" || operation === "updateByID") {
    const response = await getTransactionData(result);

    if (response.RC === "-40" || response.RC === "-24" || response.RC === "-33") {
        let intervalId: NodeJS.Timeout;
        const checkTransactionData = async () => {
            const response = await getTransactionData(result);
            recordTransactionData(response, result);
            console.log("Waiting for transaction data");
            // If the response.ACTION is one of the specified values, clear the interval
            if (response.RC !== "-40" || response.RC !== "-24" || response.RC !== "-33") {
                clearInterval(intervalId);
                console.log(response)
                recordTransactionData(response, result);
                console.log("Transaction found");
            }
        };

        // Start the interval
        intervalId = setInterval(checkTransactionData, 20000);

        // Clear the interval after 15 minutes (900000 milliseconds)
        setTimeout(() => {
            clearInterval(intervalId);
            console.log("Interval cleared after 15 minutes");
        }, 900000);
    }  else {
        recordTransactionData(response, result);
        console.log("Transaction is not -40 or -24 or -33");
    } 
  }

  console.log(result);

  return result
};
