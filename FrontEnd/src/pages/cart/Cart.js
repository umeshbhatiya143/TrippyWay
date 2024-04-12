import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import AddTraveller from "@/Components/AddTraveller";

const Cart = () => {
  const [openAddTraveller, setOpenAddTraveller] = useState(false);
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
    },
  ];
  const [pack, setPackage] = useState(pkg);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [bill, setBill] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setShowError(false);
    }, 2000); // 10000 milliseconds = 10 seconds
  }, []);

  // const slideContent = [
  //   {
  //     image: "/slide1.jpg",
  //   },
  //   {
  //     image: "/slide2.jpg",
  //   },
  //   {
  //     image: "/slide3.jpg",
  //   },
  // ];
  console.log(openAddTraveller);
  const handleIncrementAdultTraveller = (id) => {
    console.log(id);
    setPackage(
      pack.map((packageItem) => {
        if (packageItem.id === id) {
          // Increment the adult property by 1 for the package with the matching id
          return {
            ...packageItem,
            adult: packageItem.adult + 1,
          };
        }
        return packageItem;
      })
    );
  };
  const handleDecrementAdultTraveller = (id) => {
    setPackage(
      pack.map((packageItem) => {
        if (packageItem.adult == 2) {
          setShowError(true);
          setError("The traveller cannot be less than 2 in this package");
          return { ...packageItem };
        }
        if (packageItem.id === id) {
          // Increment the adult property by 1 for the package with the matching id
          // if(packageItem.adult==2){

          //   setShowError(true);
          //   setError("The traveller cannot be less than 2 in this package");
          //   return;
          // }
          return {
            ...packageItem,
            adult: packageItem.adult - 1,
          };
        }
        return packageItem;
      })
    );
  };
  const handleIncrementChildTraveller = (id) => {
    setPackage(
      pack.map((packageItem) => {
        if (packageItem.id === id) {
          // Increment the adult property by 1 for the package with the matching id
          return {
            ...packageItem,
            children: packageItem.children + 1,
          };
        }
        return packageItem;
      })
    );
  };

  const handleDecrementChildTraveller = (id) => {
    setPackage(
      pack.map((packageItem) => {
        if (packageItem.children == 0) {
          setShowError(true);
          setError("Value cannot be less than 0 ");
          return { ...packageItem };
        }
        if (packageItem.id === id) {
          // Increment the adult property by 1 for the package with the matching id
          return {
            ...packageItem,
            children: packageItem.children - 1,
          };
        }
        return packageItem;
      })
    );
  };
  const handleRemovePackage = (id) => {
    setPackage((prevPackages) => prevPackages.filter((pack) => pack.id !== id));
  };

  useEffect(() => {
    // Calculate the bill for each package
    const updatedBill = pack.map((packageItem) => {
      //const discountedPrice = (packageItem.price*0.5) - (packageItem.price*0.5 * packageItem.discount) / 100;

      const bill =
        packageItem.price * 0.5 * packageItem.adult +
        packageItem.price * 0.5 * 0.5 * packageItem.children;
      const discountedBill = bill - (bill * packageItem.discount) / 100;
      const taxedBill = discountedBill - (discountedBill * 18) / 100;
      return {
        title: packageItem.title,
        discount: packageItem.discount,
        id: packageItem.id,
        originalPrice: bill,
        discountedPrice: discountedBill,
        taxedPrice: taxedBill,
      };
    });
    const totalBillSum = updatedBill.reduce(
      (acc, curr) => acc + curr.taxedPrice,
      0
    );
    // Update the bill state
    setBill(updatedBill);
    setTotalPrice(totalBillSum.toFixed(2));
  }, [pack]);

  return (
    <div>
      {/* Proceed to checkout section*/}
      <div className="flex flex-row justify-between h-20 bg-white border-2 rounded-xl shadow-md overflow-hidden">
        <div className="text-2xl m-3 p-2">Package Cart</div>
        <button className="bg-deep-purple hover:bg-opacity-75 transition-colors duration-300 h-10 m-3 text-white font-bold py-2 px-4 rounded-l">
          Proceed To Checkout
        </button>
      </div>
      <div className="flex flex-row gap-1 justify-center ">
        {/* package add to cart */}
        <div className="w-4/6 m-2 p-1">
          {pack.map((pkg) => (
            <div className="w-full mx-auto bg-white border-2 rounded-xl shadow-md overflow-hidden my-4">
              <div className="md:flex p-4 gap-6">
                <div>
                  <div className="md:flex-shrink-0 w-80 h-60 overflow-hidden">
                    <Swiper
                      modules={[Navigation]}
                      navigation={true}
                      slidesPerView={1}
                      loop={true}
                      className="h-60 relative" // Ensure the Swiper itself has a fixed height
                    >
                      {pkg.imageUrl.map((slide, index) => (
                        <SwiperSlide key={index}>
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            {" "}
                            {/* Added bg-gray-200 as a placeholder background */}
                            <img
                              src={slide}
                              alt={`Slide ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  {/* No of Traveller */}
                  {/* {(pkg.type=="honeymoon")}
                <div className="m-2 flex flex-row gap-2 justify-around text-gray-700 font-semibold">
                  <div>Adults </div>
                  <div>Children</div>
                </div> */}
                  <div className="flex flex-col gap-2 m-3 items-center">
                    <h4 className="text-xl font-semibold ">Traveller</h4>
                    <div className="text-gray-800">
                      Adult: {" " + pkg.adult}
                    </div>
                    <div className="text-gray-800">
                      Children:{" " + pkg.children}
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="uppercase tracking-wide text-lg text-dark-cyan font-semibold">
                    {pkg.title}
                  </div>
                  <p className="block mt-1 text-sm leading-tight font-medium text-black ">
                    {pkg.duration}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    {pkg.shortDescription}
                  </p>
                  <div className="mt-4">
                    <div className="text-lg font-bold text-gray-900">
                      <s className="text-red-600">{pkg.price}</s>
                    </div>
                    <div className="text-teal-600">{pkg.discount}% Off</div>
                    <div className="text-lg font-bold text-gray-900">
                      {/* Calculate discounted price and format */}
                      {(
                        pkg.price -
                        pkg.price * (pkg.discount / 100)
                      ).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-gray-700 font-semibold">Cities:</h3>
                    <p className="text-gray-700">{pkg.cities.join(" ➜ ")}</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex mt-4">
                    <button
                      onClick={() => {
                        handleRemovePackage(pkg.id);
                      }}
                      title="Click to remove this package from cart"
                      className="bg-deep-purple hover:bg-opacity-75 transition-colors duration-300 text-white font-bold py-2 px-4 rounded-l"
                    >
                      REMOVE
                    </button>
                    {pkg.type != "honeymoon" && (
                      <>
                        <button
                          title="Click to customize the number of traveller"
                          className="bg-dark-cyan hover:bg-opacity-75 transition-colors duration-300 text-white font-bold py-2 px-4 rounded-r"
                          onClick={() => {
                            setOpenAddTraveller(!openAddTraveller);
                          }}
                        >
                          CUSTOMIZE
                        </button>
                        {openAddTraveller && (
                          <div className="fixed inset-0 bg-black bg-opacity-5 flex justify-center items-center">
                            <AddTraveller
                              handleIncrementAdultTraveller={
                                handleIncrementAdultTraveller
                              }
                              handleDecrementAdultTraveller={
                                handleDecrementAdultTraveller
                              }
                              handleIncrementChildTraveller={
                                handleIncrementChildTraveller
                              }
                              handleDecrementChildTraveller={
                                handleDecrementChildTraveller
                              }
                              setOpenAddTraveller={setOpenAddTraveller}
                              adult={pkg.adult}
                              children={pkg.children}
                              id={pkg.id}
                              error={error}
                              showError={showError}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/*price details */}
        <div className="w-2/6 mt-5 mb-5 p-4  bg-white border-2 rounded-xl shadow-md overflow-hidden">
          {/* Total price */}
          <div className="flex flex-row m-2 gap-x-1 justify-center">
            <div className="text-3xl font-bold mb-4">Total Price</div>
            <div className="text-4xl font-bold text-dark-cyan mb-6">
              &#8377; {totalPrice}
            </div>
          </div>

          {/* Bill items */}
          <div className="grid grid-cols-1 gap-6 p-3">
            {bill.map((item) => (
              <div key={item.id} className="border-b-2 border-gray-200 pb-4">
                <div className="text-lg font-semibold mb-2">{item.title}</div>
                <div className="flex flex-row justify-between mb-2 mr-2">
                  <div className="text-sm">Original Price:</div>
                  <div className="text-sm">&#8377; {item.originalPrice}</div>
                </div>
                <div className="flex flex-row justify-between mb-2 mr-2">
                  <div className="text-sm">Discount:</div>
                  <div className="text-sm">{item.discount}%</div>
                </div>
                <div className="flex flex-row justify-between mb-2 mr-2">
                  <div className="text-sm">Discounted Price:</div>
                  <div className="text-sm">&#8377; {item.discountedPrice}</div>
                </div>
                <div className="flex flex-row justify-between mb-2 mr-2">
                  <div className="text-sm">Taxes & GST :</div>
                  <div className="text-sm">18%</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="text-lg font-bold">Total Price:</div>
                  <div className="text-lg font-bold">
                    &#8377; {item.taxedPrice}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
