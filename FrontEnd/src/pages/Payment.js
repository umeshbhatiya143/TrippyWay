import React from "react";

const Payment = () => {
  const billingAddress = {
    name: "John Doe",
    address_line1: "1234 Main Street",
    address_line2: "Apartment 101",
    city: "Bangalore",
    state: "Karnataka",
    postal_code: "560001",
    country: "India",
  };

  return (
    <div>
      {/* subheading */}
      <div className="flex flex-row  h-20 justify-center bg-white border-2 rounded-xl shadow-md overflow-hidden">
        <div className="text-2xl m-3 p-2">Payment</div>
      </div>
      {/* main section*/}
      <div className=" flex flex-row justify-center gap-2">
        <div className="w-1/6"></div>
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
                  id="credit_card"
                  name="payment_method"
                  value="credit_card"
                />
                <label className ="m-2 font-medium"for="credit_card">Credit Card</label>
                <br />
                <input
                  type="radio"
                  id="debit_card"
                  name="payment_method"
                  value="debit_card"
                />
                <label className ="m-2 font-medium" for="debit_card">Debit Card</label>
                <br />
                <input
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
                <label className ="m-2 font-medium" for="upi">UPI</label>
                <br />
                <button className="bg-deep-purple w-60 hover:bg-opacity-75 transition-colors duration-300 h-10 m-3 text-white font-bold py-2 px-4 rounded-l">Use this payment method</button>
              </form>
            </div>
          </div>

          {/* proceed to pay */}
        </div>
        <div className="w-2/6 m-10 p-2  gap-x-5   bg-white border-2 rounded-xl shadow-md overflow-hidden h-28">
          <h4> Order Total : Rs 56,000</h4>
          <button className="bg-deep-purple w-60 hover:bg-opacity-75 transition-colors duration-300 h-10 m-3 text-white font-bold py-2 px-4 rounded-l">Pay</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
