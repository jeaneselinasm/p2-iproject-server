const midtransClient = require('midtrans-client')
const {Product, Customer} = require('../models/index')

class midtransController {
    static async generatePayment(req, res, next){
        try {

            let id = req.params.id
            let {email} = req.customer
            // console.log(id)

            let product = await Product.findByPk(id)

            console.log(product.price)
            console.log(product.name, 'INI FIND ID')
            
            //find barangnya dulu

            let order_id = 'Transaction '+ Math.floor((Math.random()*6532 + 187)*2)

            // console.log(order_id)

            // console.log(req.customer, 'INI REQ CUST')
            
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : process.env.MID_TRANS_SERVER_KEY,
            });


            let parameter = {
                "transaction_details": {
                    "order_id": order_id,
                    "gross_amount": product.price
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    // "first_name": "budi",
                    // "last_name": "pratama",
                    // customer id : ??
                    "email": email,
                    // "phone": "08111222333"
                }
            };

           const midTransToken = await snap.createTransaction(parameter)

           console.log(midTransToken, 'INI TOKEN MIDTRANS')

           res.status(201).json(midTransToken)

            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = midtransController