const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const User = require('../models/user');
const braintree = require('braintree');
/*
BRAINTREE_MERCHANT_ID=k58ts5ff778jp34b
BRAINTREE_PUBLIC_KEY=2njz3c4ft9s2sysx
BRAINTREE_PRIVATE_KEY=363a3178001f165ce394d3726dc6b820
*/

const gateway = new braintree.BraintreeGateway({
    environment:  braintree.Environment.Sandbox,
    merchantId:   process.env.BRAINTREE_MERCHANT_ID,
    publicKey:    process.env.BRAINTREE_PUBLIC_KEY,
    privateKey:   process.env.BRAINTREE_PRIVATE_KEY
});


exports.generateToken = (req, res) => {
	gateway.clientToken.generate({}, function(err, response) {
		 //Se verdade vamos trazer o token
			if(err){
				res.status(500).send(err)
			}else{
				res.send(response)
			}
	});
};

exports.processPayment = (req, res) => {
	let nonceFromTheClient = req.body.paymentMethodNonce
	let amountFromTheClient = req.body.amount

	//charge
		
	
	let newTransaction = gateway.transaction.sale({
		amount: amountFromTheClient,
		paymentMethodNonce: nonceFromTheClient, 
		options: {
			submitForSettlement: true
		}
	}).then(function (result) {
		  if (result.success) {
		    res.json(result);
		  } else {
			  console.log(result.errors)
			//res.status(500).json(error); 
		  }
		  }).catch(function (err) {
		  	console.error(err);
		  });

}