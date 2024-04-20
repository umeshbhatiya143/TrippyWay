import React from "react";
import { useRouter } from "next/router";
const Payment = () => {
  const router = useRouter();
  const billingAddress = {
    name: "John Doe",
    address_line1: "1234 Main Street",
    address_line2: "Apartment 101",
    city: "Bangalore",
    state: "Karnataka",
    postal_code: "560001",
    country: "India",
  };

  const paymentHandler=async(event)=>{
    const amount = 500;
    const currency = 'INR';
    const receiptId = '1234567899';

    const response = await fetch('http://localhost:5000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId
      })
    })

      const order = await response.json();
      console.log('order', order);

      //predefined template
      var option = {
        key:"",
        amount,
        currency,
        name:"TrippyWay",
        description: "Test Transaction",
        image:"../logo.png",
        //passing the orderid geberated above
        order_id:order.id,
        handler: async function(response) {
          //we have to check whether transaction is succesful to reduce fraud
          const body = {...response,}

          const validateResponse = await fetch('http://localhost:5000/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)

          }
        )

          const jsonResponse = await validateResponse.json();

          console.log('jsonResponse', jsonResponse);
          alert("transaction successful");
          //After successful payment move to home page
          router.push("/");


        },
        //user billing Address
        prefill: {
          name: "kanika", 
          email: "kanikakur14@gmail,com",
          contact: "9000000000", 
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        //razorpay popup color
        theme: {
          color: "#3C096C",
        },
      }
      var rzp1 = new Razorpay(option);
      //if payment fails
      rzp1.on("payment.failed", function(response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      })

      rzp1.open();
      event.preventDefault();

  }

  return (
    <div>
      {/* subheading */}
      <div className="flex flex-row  h-20 justify-center bg-white border-2 rounded-xl shadow-md overflow-hidden">
        <div className="text-2xl m-3 p-2">Payment</div>
      </div>
      {/* main section*/}
      <div className=" flex flex-row justify-center gap-2">
        
        <div className="w-3/6 m-8 p-1  bg-white border-2 rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col  m-3 p-1">
            {/* address area*/}
            <div className="m-10 p-2 flex flex-row justify-between gap-x-5">
              <h4 className="text-xl font-semibold">Your Billing Address</h4>
              <div>
                <ul>
                  <li className="font-medium">{billingAddress.name}</li>
                  <li>{billingAddress.address_line2}</li>
                  <li>{billingAddress.address_line1}</li>
                  <li>{billingAddress.city}</li>
                  <li>{billingAddress.state}</li>
                  <li>{billingAddress.country}</li>
                  <li>{billingAddress.postal_code}</li>
                </ul>
              </div>
            </div>
            <hr></hr>
            {/*Select Payment method */}
            <div className="m-10 p-2 flex flex-col justify-between gap-x-5">
            <h4 className="text-xl font-semibold">Choose Your Payment Option</h4>
              <form className="m-5">
                <input
                  type="radio"
                  id="online_payment"
                  name="payment_method"
                  value="online_payment"
                />
                <label className ="m-2 font-medium"for="credit_card">Online Payment</label>
                <br />
                <input
                  type="radio"
                  id="cash"
                  name="payment_method"
                  value="cash"
                />
                <label className ="m-2 font-medium" for="debit_card">Cash</label>
                <br />
                {/* <input
                  type="radio"
                  id="net_banking"
                  name="payment_method"
                  value="net_banking"
                />
                <label className ="m-2 font-medium" for="net_banking">Net Banking</label>

                <br />
                <input
                  type="radio"
                  id="upi"
                  name="payment_method"
                  value="upi"
                />
                <label className ="m-2 font-medium" for="upi">UPI</label> */}
                <br />
                <div className="">
          <h4> Order Total : Rs 56,000</h4>
         
        </div>
              </form>
              <button onClick={paymentHandler} className="bg-deep-purple w-60 hover:bg-opacity-75 transition-colors duration-300 h-10 m-1 text-white font-bold py-2 px-4 rounded-l">Pay</button>
            </div>
          </div>

          {/* proceed to pay */}
        </div>
       
      </div>
    </div>
  );
};

export default Payment;
