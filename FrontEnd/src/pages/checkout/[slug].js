import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TravellerForm from "@/Components/TravellerForm/TravellerForm";
import Alert from "@/Components/Alert";
import { useSelector, useDispatch } from "react-redux";
import { toggleLogin, loginUser, logoutUser } from "@/store/slices";

const CheckOut = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { slug } = router.query;
  const [openForm, setOpenform] = useState(false);
  const [travellerDetails, setTravellerDetails] = useState([]);
  const [showError, setShowError] = useState(false);
  const [noOfTraveller, setNoOfTraveller] = useState(localStorage.getItem("noOfTraveller"))
  //const [showSuccess ,setShowSuccess]=useState(false)
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (details) => {
    setTravellerDetails(details);
  };
  const toggleForm = () => {
    setOpenform(!openForm);
  };

  useEffect(()=> {
    if(isLoggedIn === false){
      router.push('/')
    }
  })
  
  const handleTravellerDetails = (details) => {
    const existingIndex = travellerDetails.findIndex(
      (detail) => detail.index === details.index
    );

    if (existingIndex !== -1) {
      // If the index exists, update the corresponding object
      setTravellerDetails((prevDetails) => {
        return prevDetails.map((detail, index) => {
          if (index === existingIndex) {
            // Replace the existing object with the updated one
            return details;
          }
          return detail;
        });
      });
    } else {
      // If the index doesn't exist, add the new object to the array
      setTravellerDetails((prevDetails) => [...prevDetails, details]);
    }
  };
  const handleProceedToPay = () => {
    let flag = false;
    if (travellerDetails.length === 0) {
      flag = true;
    }
    if (!flag) {
      const serializedTravellerDetails = encodeURIComponent(JSON.stringify(travellerDetails));
      router.push(`/Payment?travellerDetails=${serializedTravellerDetails}&packageId=${encodeURIComponent(slug)}`);
    } else {
      setShowError(true);
      setErrorMessage("Please fill all the details");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setShowError(false);
    }, 5000); // 10000 milliseconds = 10 seconds
  }, [showError]);

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="flex flex-row justify-center h-20 bg-white border-2 rounded-xl shadow-md overflow-hidden">
        <div className="text-2xl m-3 p-2 ">Traveller Details</div>
      </div>
      {/* <div className="flex w-full justify-center ">
      < className="w-[70%] flex flex-col gap-4"> */}
      <div className="flex w-full justify-center m-5">
        <div className="w-[70%]  flex flex-col m-2 bg-white border-2 p-2 shadow-md overflow-hidden my-4 ">
          <div className="text-xl font-bold m-3 p-1">
            {localStorage.getItem("currentBookingName")}
          </div>

          {/*Link to Adult form */}
          <>
            <div className="bg-white border-2 p-2 shadow-md overflow-hidden m-5 ">
              <ul>
                <li className="text-red-600">
                  * Adults should be above 18years
                </li>
                <li className="text-red-600">
                  * children should be above 5 years
                </li>
              </ul>
            </div>

            <TravellerForm

              handleTravellerDetails={handleTravellerDetails}
              travellerDetails={travellerDetails}
              handleSubmit={handleSubmit}
              noOfTraveller={noOfTraveller}
            />

            <div className="m-3">

              <button
                onClick={handleProceedToPay}
                className="bg-deep-purple  hover:bg-opacity-75 transition-colors duration-300 text-white font-bold py-2 px-4 rounded-r"
              >
                Proceed To Pay
              </button>
            </div>

            {showError && <Alert message={errorMessage} type="error" />}
          </>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
