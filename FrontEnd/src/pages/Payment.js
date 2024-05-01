import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useSelector, useDispatch } from "react-redux";
import { toggleLogin, loginUser, logoutUser } from "@/store/slices";
import Invoice from "@/Components/Invoice";
import { toast } from "react-toastify";

const Payment = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  //const [booking, setBooking] = useState(false);
  const [bill, setBill] = useState({});
  const userData = useSelector((state) => state.auth.userData);
  const [name, setName] = useState("");
  const [bookingDetail, setBookingDetail] = useState('')

  const { travellerDetails, packageId } = router.query;

  // Deserialize the query string into travellerDetails
  const decodedTravellerDetails = travellerDetails ? JSON.parse(decodeURIComponent(travellerDetails)) : [];
  const decodedpackageId = decodeURIComponent(packageId)

  const toastOptions = {
    position: "top-right",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    // Calculate the bill for each package
    const originalPrice = parseInt(localStorage.getItem("originalPrice")) || 0;
    const noOfTraveller = parseInt(localStorage.getItem("noOfTraveller")) || 0;
    const discount = parseInt(localStorage.getItem("discount")) || 0;


    const bill = originalPrice * noOfTraveller;
    const discountedBill = Math.floor(bill - (bill * discount) / 100);
    const taxedBill = discountedBill + (discountedBill * 18) / 100;

    const paymentBill = {
      title: localStorage.getItem("currentBookingName"),
      discount: discount,
      originalPrice: bill,
      discountedPrice: discountedBill,
      taxedPrice: taxedBill,
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
      })
      const data = await response.json();
      setName(data.user.name)
      // console.log(data);

    }
    catch (err) {
      console.log(err);
    }
  };




  const billingAddress = {
    name: "John Doe",
    address_line1: "1234 Main Street",
    address_line2: "Apartment 101",
    city: "Bangalore",
    state: "Karnataka",
    postal_code: "560001",
    country: "India",
  };


  const bookingOBj = {
    "orderId": "123xdty",
    "userId": "User123",
    "price": 12000,
    "gst": 18,
    "packageId": "",
    "PackageName": " 4 days trip for Manali",
    "address": {
      "address1 ": "House no 12,xyz",
      "address2": "line 2 mn",
      "city": "abc",
      "state": "UP",
      "postalCode": "800010",
      "country": "India"
    }
  }

  const updateUserProfile = async (pkgId, bookingId) => {
    // setIsLoading(true)

    try {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_HOST}/api/users/${userData.userId}`
      );
      const params = { fields: "cart,bookings" }; // Define fields you want to fetch
      url.search = new URLSearchParams(params).toString();

      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        res = await res.json();

        const updatedBookings = [...res.user.bookings, bookingId];
        const updatedCart = res.user.cart.filter((_id) => _id !== pkgId);
        // console.log(updatedCart);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/users/${userData.userId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart: updatedCart, bookings: updatedBookings }),
          }
        );
        toast.success("Package removed from cart successfully", toastOptions);

        const updatedData = {
          userId: userData.userId,
          token: userData.token,
          cart: updatedCart,
          bookings: updatedBookings
        };
        dispatch(loginUser(updatedData));
      });
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to remove package in cart", toastOptions);
    }
  };

  const paymentHandler = async (event) => {
    const amount = bill.taxedPrice *100;
    const currency = "INR";
    const receiptId = "1234567899";

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/order`, {
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

    //predefined template
    var option = {
      key: "",
      amount,
      currency,
      name: "TourWay",
      description: "Test Transaction",
      image: "../logo2.jpeg",
      //passing the orderid geberated above
      order_id: order.id,
      handler: async function (response) {
        //we have to check whether transaction is succesful to reduce fraud
        const body = { ...response };

        await fetch(`${process.env.NEXT_PUBLIC_HOST}/validate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then(async (res) => {
            const paymentIds = await res.json();

            const bookingData = {
              user: userData.userId,
              package: decodedpackageId,
              packageTitle: localStorage.getItem("currentBookingName"),
              numberOfTravellers: decodedTravellerDetails.length,
              TravelersDetail: decodedTravellerDetails,
              journeyStatus: "upcoming",
              totalPrice: bill.taxedPrice,
              gst: 18,
              bookingStatus: "confirmed",
              paymentStatus: "completed",
              paymentDetails: {
                orderId: paymentIds.orderId,
                paymentId: paymentIds.paymentId
              },

            }
            setBookingDetail({
              ...bookingData, address: {
                "address1 ": "House no 12,xyz",
                "address2": "line 2 mn",
                "city": "abc",
                "state": "UP",
                "postalCode": "800010",
                "country": "India"
              },
              gstNo: "GST456763"
            })

            await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/bookings/create`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bookingData),
            })
              .then(async (res) => {
                const res2 = await res.json();
                // remove package from cart and add booking id in bookings
                updateUserProfile(decodedpackageId, res2.bookingId);
              })
          })
          .then(() => {

            alert("package booked successfully, please keep scrolling")
            // router.push('/holidays')
          })

        // const jsonResponse = await validateResponse.json();

        // console.log("jsonResponse", jsonResponse);
        // alert("transaction successful");
        //After successful payment move to home page
        router.push("/");
        
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

  useEffect(()=>{
    console.log(bookingDetail)
  }, [bookingDetail])

  return (
    <>
      
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
                      <div className="text-sm">&#8377; {bill.originalPrice}</div>
                    </div>
                    <div className="flex flex-row justify-between mb-2 mr-2">
                      <div className="text-sm">Discount:</div>
                      <div className="text-sm">{bill.discount}%</div>
                    </div>
                    <div className="flex flex-row justify-between mb-2 mr-2">
                      <div className="text-sm">Discounted Price:</div>
                      <div className="text-sm">&#8377; {bill.discountedPrice}</div>
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
      
      {/* {booking && (
        <div>
          {/* subheading */}
          {/* <div className="flex flex-row  h-20 justify-center bg-white border-2 rounded-xl shadow-md overflow-hidden">
            <div className="text-2xl m-3 p-2">Payment</div>
          </div> */} 
          {/* main section*/}
          {/* <div className=" flex flex-row justify-center gap-2">
            <div className="w-3/6 m-8 p-1  bg-white border-2 rounded-xl shadow-md overflow-hidden">
              <div className="flex flex-col  m-3 p-1">
                <div>The package name is booked </div>
                <div className=" flex flex-row justify-center"> */}
                  {/* <PDFDownloadLink
                    document={<Invoice bookingOBj={bookingDetail} />}
                    filename="invoice.pdf"
                    style={{
                      textDecoration: "none",
                      padding: "10px",
                      color: "#4a4a4a",
                      backgroundColor: "white",
                      border: "1px solid #4a4a4a",
                      width: "40%",
                    }}
                  >

                    {/* {({ blob, url, loading, error }) =>
                      loading ? "Loading document..." : "Download now!"
                    } */}
                    {/* download
                  </PDFDownloadLink>  */}

                {/* </div>
              </div> */}

              {/* proceed to pay */}
            {/* </div>

          </div> */}
          {/* <PDFViewer>
                    <Invoice bookingOBj={bookingOBj}/>
                  </PDFViewer> */}
        {/* </div>
      )} */}
    </>
  );
};

export default Payment;
