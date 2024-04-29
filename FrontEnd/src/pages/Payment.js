import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useSelector, useDispatch } from "react-redux";
import Invoice from "@/Components/Invoice";
import { FaFilePdf } from "react-icons/fa6";
const Payment = () => {
  const router = useRouter();
  const [booking, setBooking] = useState(false);
  const [bookingObj, setBookingObj] = useState({});
  const [bill, setBill] = useState({});
  const userData = useSelector((state) => state.auth.userData);
  const [name, setName] = useState("");

  useEffect(() => {
    // Calculate the bill for each package
    const originalPrice = parseInt(localStorage.getItem("originalPrice")) || 0;
    const noOfTraveller = parseInt(localStorage.getItem("noOfTraveller")) || 0;
    const discount = parseInt(localStorage.getItem("discount")) || 0;

    const bill = originalPrice * noOfTraveller;
    const discountedBill = Math.floor(bill - (bill * discount) / 100);
    const discountAmt = Math.floor((bill * discount) / 100);
    const taxedBill = discountedBill + (discountedBill * 18) / 100;
    const taxAmt = (discountedBill * 18) / 100;

    const paymentBill = {
      title: localStorage.getItem("currentBookingName"),
      discount: discount,
      originalPrice: bill,
      discountedPrice: discountedBill,
      taxedPrice: taxedBill,
      discountAmt: discountAmt,
      taxAmt: taxAmt,
    };

    // Update the bill state
    setBill(paymentBill);
    fetchUser();
  }, []);

  const fetchUser = async () => {
    // setIsLoading(true)

    try {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_HOST}/api/users/${userData.userId}`
      );
      const params = { fields: "name" }; // Define fields you want to fetch
      url.search = new URLSearchParams(params).toString();

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setName(data.user.name);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  var currentDate = new Date();

  // Extract the individual components of the date
  var year = currentDate.getFullYear(); // Get the full year (e.g., 2024)
  var month = currentDate.getMonth() + 1; // Get the month (0-11, add 1 to get 1-12)
  var day = currentDate.getDate(); // Get the day of the month (1-31)

  // Format the date as desired
  var formattedDate = year + "-" + month + "-" + day;

  const billingAddress = {
    name: "John Doe",
    address_line1: "1234 Main Street",
    address_line2: "Apartment 101",
    city: "Bangalore",
    state: "Karnataka",
    postal_code: "560001",
    country: "India",
  };

  const deleteItemFromCart =async()=>{}
  // const bookingOBj={
  //   orderId:"",
  //   userId:"",
  //   price:0,
  //   gst:18,
  //   packageId:"",
  //   PackageName:"",
  //   address:{
  //     address1:"1234 Main Street",
  //     address2:"Apartment 101",
  //     city:"Bangalore",
  //     state:"Karnataka",
  //     postalCode:"560001",
  //     country:"India"
  //   }
  // }
  const paymentHandler = async (event) => {
    const amount = bill.taxedPrice * 100;
    const currency = "INR";
    const receiptId = "1234567899";

    const response = await fetch("http://localhost:5000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
    });

    const order = await response.json();
    console.log("order", order);

    //predefined template
    var option = {
      key: "",
      amount,
      currency,
      name: "TrippyWay",
      description: "Test Transaction",
      image: "../logo.png",
      //passing the orderid geberated above
      order_id: order.id,
      handler: async function (response) {
        //we have to check whether transaction is succesful to reduce fraud
        const body = { ...response };

        const validateResponse = await fetch("http://localhost:5000/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const jsonResponse = await validateResponse.json();
        const rupee = () => {
          return <div>&#8377;</div>;
        };
        const bookObj = {
          bookingId: jsonResponse.orderId,
          paymentId: jsonResponse.paymentId,
          userName: name,
          noOfTraveller: parseInt(localStorage.getItem("noOfTraveller")) || 0,
          price: parseInt(localStorage.getItem("originalPrice")) || 0,
          bill: bill,
          discount: parseInt(localStorage.getItem("discount")),
          gst: 18,
          bookingDate: formattedDate,
          PackageName: localStorage.getItem("currentBookingName"),
          rupee: rupee,
          address: {
            address1: "1234 Main Street",
            address2: "Apartment 101",
            city: "Bangalore",
            state: "Karnataka",
            postalCode: "560001",
            country: "India",
          },
        };
        setBookingObj(bookObj);
        console.log("jsonResponse", jsonResponse);

        alert("transaction successful");
        //After successful payment move to home page
        //router.push("/");
        deleteItemFromCart();
        setBooking(true);
      },
      //user billing Address ,we have pull user details and pass here
      prefill: {
        name: name,
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
    };
    var rzp1 = new Razorpay(option);
    //if payment fails
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();
    event.preventDefault();
  };

  return (
    <>
      {!booking && (
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
                  <h4 className="text-xl font-semibold">
                    Your Billing Address
                  </h4>
                  <div>
                    <ul>
                      <li className="font-medium">{name}</li>
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
                  <h4 className="text-xl font-semibold">
                    {localStorage.getItem("currentBookingName")}
                  </h4>

                  <div className="border-b-2 border-gray-200 pb-4">
                    {/* <div className="text-lg font-semibold mb-2">{localStorage.getItem("currentBookingName")}</div> */}

                    <div className="flex flex-row justify-between mb-2 mr-2">
                      <div className="text-sm">Original Price:</div>
                      <div className="text-sm">
                        &#8377; {bill.originalPrice}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between mb-2 mr-2">
                      <div className="text-sm">Discount:</div>
                      <div className="text-sm">{bill.discount}%</div>
                    </div>
                    <div className="flex flex-row justify-between mb-2 mr-2">
                      <div className="text-sm">Discounted Price:</div>
                      <div className="text-sm">
                        &#8377; {bill.discountedPrice}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between mb-2 mr-2">
                      <div className="text-sm">Taxes & GST :</div>
                      <div className="text-sm">18%</div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="text-lg font-bold">Total Price:</div>
                      <div className="text-lg font-bold">
                        &#8377; {bill.taxedPrice}
                      </div>
                    </div>
                  </div>

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
                  {/* <div className="">
                      <h4> Order Total : Rs 56,000</h4>
                    </div> */}

                  <button
                    onClick={paymentHandler}
                    className="bg-deep-purple w-60 hover:bg-opacity-75 transition-colors duration-300 h-10 m-1 text-white font-bold py-2 px-4 rounded-l"
                  >
                    Pay
                  </button>
                </div>
              </div>

              {/* proceed to pay */}
            </div>
          </div>
        </div>
      )}
      {booking && (
        <div>
          {/* subheading */}
          <div className="flex flex-row  h-20 justify-center bg-slate-300 border-2 rounded-xl shadow-md overflow-hidden">
            <div className="text-2xl m-3 p-2 font-bold">Payment</div>
          </div>
          {/* main section*/}
          <div className=" flex flex-row justify-center gap-2">
            <div className="w-3/6 m-8 p-1 h-full border-4 border-button-color-hover rounded-xl shadow-md overflow-hidden">
              <div className="flex flex-col gap-4 m-6 p-1 justify-center ">
                <div className="text-2xl m-2  font-semibold">
                  Get Ready to Explore!!! DownLoad Your Invoice{" "}
                </div>
                <div className=" flex flex-row justify-center">
                  
                  <PDFDownloadLink
                    document={<Invoice bookingObj={bookingObj} />}
                    filename="invoice.pdf"
                    style={{
                      textDecoration: "none",
                      padding: "10px",
                      color: "#4a4a4a",
                      backgroundColor: "white",
                      borderRadius: "20%",
                    }}
                  >
                    

                    {/* {({ blob, url, loading, error }) =>
                      loading ? "Loading document..." : "Download now!"
                    } */}
                    <FaFilePdf
                      size={40}
                      className="text-red-700 font-bold m-2 text-xl"
                    />
                  </PDFDownloadLink>
                  <PDFViewer className="w-96 h-96">
                      <Invoice bookingObj={bookingObj} />
                    </PDFViewer>
                </div>
              </div>

              {/* proceed to pay */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
