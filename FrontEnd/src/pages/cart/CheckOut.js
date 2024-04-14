import Alert from "@/Components/Alert";
import DetailsForm from "@/Components/TravellerForm/DetailsForm";
import TravellerForm from "@/Components/TravellerForm/TravellerForm";
import React, { useState,useEffect } from "react";
import {  useRouter } from "next/router"; 

const CheckOut = () => {
  const router=useRouter();
  const pkg = [
    {
      id: "1",
      imageUrl: ["../../slide1.jpg", "../../slide2.jpg", "../../slide3.jpg"], // Replace with your image path
      title: "Soothing Kumarakom, Munnar, Alleppey Honeymoon Package",
      duration: "7 Days & 6 Nights",
      shortDescription:
        "Explore the serene beauty of Kumarakom with this honeymoon package. Includes stay, meals, and sightseeing.",
      //price: "₹22,900",
      originalPrice: "₹26,024",
      price: 26024,
      discount: 12, // in percentage
      cities: ["Kochi", "Munnar", "Thekkady", "Kumarakom", "Alleppey"],
      adult: 2,
      children: 0,
      type: "honeymoon",
      travellerDetails: [],
    },
    {
      id: "2",
      imageUrl: ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg"], // Replace with your image path
      title: "Soothing Kumarakom, Munnar, Alleppey family Package",
      duration: "7 Days & 6 Nights",
      shortDescription:
        "Explore the serene beauty of Kumarakom with this  package. Includes stay, meals, and sightseeing.",
      //price: "₹22,900",
      originalPrice: "₹26,024",
      price: 26024,
      discount: 12, // in percentage
      hotelRatings: ["3 Star", "4 Star", "5 Star"],
      cities: ["Kochi", "Munnar", "Thekkady", "Kumarakom", "Alleppey"],
      type: "family",
      adult: 2,
      children: 1,
      travellerDetails: [],
    },
    {
      id: "3",
      imageUrl: ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg"], // Replace with your image path
      title: "Soothing Kumarakom, Munnar, Alleppey family Package",
      duration: "7 Days & 6 Nights",
      shortDescription:
        "Explore the serene beauty of Kumarakom with this  package. Includes stay, meals, and sightseeing.",
      originalPrice: "₹26,024",
      price: 26024,
      discount: 12, // in percentage
      hotelRatings: ["3 Star", "4 Star", "5 Star"],
      cities: ["Kochi", "Munnar", "Thekkady", "Kumarakom", "Alleppey"],
      type: "group",
      adult: 2,
      children: 0,
      travellerDetails: [],
    },
  ];
  const [pack, setPackage] = useState(pkg);
  const [openForms, setOpenForms] = useState({});
  //const [openForm, setOpenForm] = useState(false);
  //const [details, setDetails] = useState([]);
  const [showError ,setShowError]=useState(false)
  //const [showSuccess ,setShowSuccess]=useState(false)
  const [errorMessage ,setErrorMessage]=useState("")
 // const [successMessage ,setSuccessMessage]=useState("")

  const handleTravellerDetails = (arrayOfTravellers, packageId) => {
    setPackage((prevPack) => {
      return prevPack.map((packageItem) => {
        if (packageItem.id === packageId) {
          // Update the travellerDetails array for the matching package

          return {
            ...packageItem,
            travellerDetails: arrayOfTravellers,
          };
        }
        return packageItem;
      });
    });
  };

  const toggleForm = (packageId) => {
    setOpenForms((prevOpenForms) => ({
      ...prevOpenForms,
      [packageId]: !prevOpenForms[packageId],
    }));
  };
  const handleProceedToPay = () => {
    let flag=false;
    // pack.map((packageItem)=>{
    //   if(packageItem.travellerDetails.length===0){
    //     flag=true;
    //     r
    //   }
    // })
    for(var item of pack){
      if(item.travellerDetails.length===0 || item.travellerDetails.length!=(item.adult + item.children) ){
        flag=true;
        break;
      }
    }
    if(!flag){
      
      router.push("Payment");

    }
    else{
        setShowError(true);
        setErrorMessage("Please Fill all the details")
    }
    
  };

  
  useEffect(() => {
    setTimeout(() => {
      setShowError(false);
    }, 5000); // 10000 milliseconds = 10 seconds
  }, [showError]);
  console.log(pack);

  return (
    <div className="flex flex-col ">
      {pack.map((pkg) => (
        <div className="w-auto  m-2 bg-white border-2 p-2 shadow-md overflow-hidden my-4 ">
          <div className="text-xl font-bold">{pkg.title}</div>
          <div className="flex flex-col gap-2 m-3 ">
                    <div className="text-gray-800">
                      Adult: {" " + pkg.adult}
                    </div>
                    <div className="text-gray-800">
                      Children:{" " + pkg.children}
                    </div>
                  </div>
          {/*Link to Adult form */}
          <>
            <button className="bg-dark-cyan hover:bg-opacity-75 transition-colors duration-300 text-white font-bold py-2 px-4 rounded-r" onClick={() => toggleForm(pkg.id)}>
              {openForms[pkg.id] ? "Hide Traveller Form" : "Add Traveller"}
            </button>
            <div className="bg-white border-2 p-2 shadow-md overflow-hidden m-5 ">
              <ul>
                <li className="text-red-600">
                 * Adults should be above 18years
                </li>
                <li className="text-red-600">
                 * children  should be above 5 years
                </li>
              </ul>
            </div>
            {openForms[pkg.id] && (
              <TravellerForm
                packageid={pkg.id}
                packagename={pkg.title}
                handleTravellerDetails={handleTravellerDetails}
                travellerDetails={pkg.travellerDetails}
                adult={pkg.adult}
                children={pkg.children}
              />
            )}
          </>

          {/* {[...Array(pkg.adult + pkg.children)].map((_, index) => (
              <>
                <button
                  onClick={() => {
                    setOpenForm(true);
                  }}
                >
                  Add Travelller
                </button>
                {openForm && (
                  <DetailsForm
                    setOpenForm={setOpenForm}
                    id={pkg.id}
                    handleTravellerDetails={handleTravellerDetails}
                    travellerDetails={pkg.travellerDetails}
                  />
                )}
              </>
            ))} */}
        </div>
      ))}
      <button
        onClick={handleProceedToPay}
        className="bg-deep-purple w-60 hover:bg-opacity-75 transition-colors duration-300 h-10 m-3 text-white font-bold py-2 px-4 rounded-l"
      >
        Proceed To Pay
      </button>
      {showError && <Alert message={errorMessage} type="error" />}
      {/* <DetailsForm /> */}
    </div>
  );
};

export default CheckOut;
