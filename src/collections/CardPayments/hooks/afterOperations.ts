import { CollectionAfterOperationHook } from "payload/types";
import * as crypto from "crypto";

const ACTION = ["0", "1", "2", "3", "7", "21"];

function recordTransactionData(data: any) {
  let transactionData = {
    ACTION: data.ACTION,
    STATUSMSG: data.STATUSMSG,
    RC: data.RC,
    AMOUNT: data.AMOUNT,
    CURRENCY: data.CURRENCY,
    ORDER: data.ORDER,
    DESC: data.DESC,
    TIMESTAMP: data.TIMESTAMP,
    LANG: data.LANG,
    TRAN_TRTYPE: data.TRAN_TRTYPE,
    RRN: data.RRN,
    INT_REF: data.INT_REF,
    PARES_STATUS: data.PARES_STATUS,
    AUTH_STEP_RES: data.AUTH_STEP_RES,
    CARDHOLDERINFO: data.CARDHOLDERINFO,
    ECI: data.ECI,
    CARD: data.CARD,
    CARD_BRAND: data.CARD_BRAND,
  };
  return transactionData;
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

    if (response.RC === "-40" || response.RC === "-24") {
        let intervalId: NodeJS.Timeout;
        const checkTransactionData = async () => {
            const response = await getTransactionData(result);
            result = recordTransactionData(response);
            console.log("Checking transaction data");
            // If the response.ACTION is one of the specified values, clear the interval
            if (response.RC !== "-40" || response.RC === "-24") {
                clearInterval(intervalId);
                result = recordTransactionData(response);
                console.log("Transaction found");
            }
        };

        // Start the interval
        intervalId = setInterval(checkTransactionData, 10000);

        // Clear the interval after 15 minutes (900000 milliseconds)
        setTimeout(() => {
            clearInterval(intervalId);
            console.log("Interval cleared after 15 minutes");
        }, 900000);
    }  else {
        result = recordTransactionData(response);
        console.log("Transaction found");
    } 
  }

  console.log(result);

  return result
};
