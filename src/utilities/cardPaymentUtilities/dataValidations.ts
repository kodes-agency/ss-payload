import { ValidationError } from "payload/errors";


export function validateOrderData(doc: any) {
    if (typeof doc.ORDER !== 'string' || doc.ORDER.length !== 5) {
      throw new ValidationError([
        {
          field: 'ORDER',
          message: 'ORDER must be a string with a length of 5 characters.'
        }
      ]);
    }
  
    if (!doc.orderData 
        || doc.orderData.billing_address.first_name.length === 0 
        || doc.orderData.billing_address.last_name.length === 0
        || doc.orderData.billing_address.email.length === 0
        || doc.orderData.billing_address.phone.length === 0) {
      throw new ValidationError([
        {
          field: 'orderData',
          message: 'orderData must be an object with billing_address object with first_name, last_name, email, and phone fields.'
        }
      ]);
    }
  }