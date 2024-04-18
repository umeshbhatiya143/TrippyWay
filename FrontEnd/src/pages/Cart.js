import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/router";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import AddTraveller from "@/Components/AddTraveller";
import { useSelector, useDispatch } from 'react-redux'
import { toggleLogin, loginUser, logoutUser } from '@/store/slices'
import { toast } from 'react-toastify';

const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData)

  const [openAddTraveller, setOpenAddTraveller] = useState(false);
  // const [pkg, setPkg] = useState([])

  const toastOptions = {
    position: "top-right",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  }

  // const pkg = [
  //   {
  //     id: "1",
  //     imageUrl: ["../../slide1.jpg", "../../slide2.jpg", "../../slide3.jpg"], // Replace with your image path
  //     title: "Soothing Kumarakom, Munnar, Alleppey Honeymoon Package",
  //     duration: "7 Days & 6 Nights",
  //     shortDescription:
  //       "Explore the serene beauty of Kumarakom with this honeymoon package. Includes stay, meals, and sightseeing.",
  //     //price: "₹22,900",
  //     originalPrice: "₹26,024",
  //     price: 26024,
  //     discount: 12, // in percentage
  //     cities: ["Kochi", "Munnar", "Thekkady", "Kumarakom", "Alleppey"],
  //     adult: 2,
  //     children: 0,
  //     type: "honeymoon",
  //   },
  //   {
  //     id: "2",
  //     imageUrl: ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg"], // Replace with your image path
  //     title: "Soothing Kumarakom, Munnar, Alleppey family Package",
  //     duration: "7 Days & 6 Nights",
  //     shortDescription:
  //       "Explore the serene beauty of Kumarakom with this  package. Includes stay, meals, and sightseeing.",
  //     //price: "₹22,900",
  //     originalPrice: "₹26,024",
  //     price: 26024,
  //     discount: 12, // in percentage
  //     hotelRatings: ["3 Star", "4 Star", "5 Star"],
  //     cities: ["Kochi", "Munnar", "Thekkady", "Kumarakom", "Alleppey"],
  //     type: "family",
  //     adult: 2,
  //     children: 1,
  //   },
  //   {
  //     id: "3",
  //     imageUrl: ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg"], // Replace with your image path
  //     title: "Soothing Kumarakom, Munnar, Alleppey family Package",
  //     duration: "7 Days & 6 Nights",
  //     shortDescription:
  //       "Explore the serene beauty of Kumarakom with this  package. Includes stay, meals, and sightseeing.",
  //     originalPrice: "₹26,024",
  //     price: 26024,
  //     discount: 12, // in percentage
  //     hotelRatings: ["3 Star", "4 Star", "5 Star"],
  //     cities: ["Kochi", "Munnar", "Thekkady", "Kumarakom", "Alleppey"],
  //     type: "group",
  //     adult: 2,
  //     children: 0,
  //   },
  // ];
  const [pack, setPackage] = useState([]);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [bill, setBill] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setShowError(false);
    }, 2000); // 10000 milliseconds = 10 seconds
  }, []);


  const fetchPackage = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/packages/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      // console.log(data.package)
      // setPack(data.package)
      // const price = data.package.price
      // const discount = data.package.discount
      // setTotalPrice(totalPrice+ (Math.floor(price - (price * (discount) / 100))))
      return data.package
    } catch (error) {
      console.log(error)
    }
  };

  const fetchPackages = async () => {
    const packages = await Promise.all(userData.cart.map((pkgId) => {
      return fetchPackage(pkgId);
    }));
    setPackage(packages)
  }

  useEffect(() => {
    fetchPackages()
    // console.log(pkg)
  }, [])

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

  const updateUserProfile = async (pkgId) => {
    // setIsLoading(true)

    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_HOST}/api/users/${userData.userId}`);
      const params = { fields: 'cart' }; // Define fields you want to fetch
      url.search = new URLSearchParams(params).toString();

      await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(async res => {
          res = await res.json();

          const updatedCart = res.user.cart.filter(_id => _id !== pkgId);
          console.log(updatedCart)
          const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/${userData.userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart: updatedCart }),
          });
          if (!response.ok) throw new Error('Failed to update profile');
          toast.success('Package removed from cart successfully', toastOptions);

          const updatedData = {
            userId: userData.userId,
            token: userData.token,
            cart: updatedCart
          }
          dispatch(loginUser(updatedData))
        })

    } catch (error) {
      console.error(error.message);
      toast.error('Failed to remove package in cart', toastOptions);
    }
  };

  const handleRemovePackage = (id) => {
    setPackage((prevPackages) => prevPackages.filter((pack) => pack._id !== id));
    updateUserProfile(id)
  };

  useEffect(() => {
    // Calculate the bill for each package
    const updatedBill = pack.map((packageItem) => {
      //const discountedPrice = (packageItem.price*0.5) - (packageItem.price*0.5 * packageItem.discount) / 100;

      const bill = packageItem.price
      // packageItem.price * 0.5 * packageItem.adult +
      // packageItem.price * 0.5 * 0.5 * packageItem.children;

      const discountedBill = (Math.floor(bill - (bill * (packageItem.discount) / 100)))
      const taxedBill = discountedBill + (discountedBill * 18) / 100;
      return {
        title: packageItem.title,
        discount: packageItem.discount,
        id: packageItem._id,
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



  const handleCheckout = () => {
    router.push('/CheckOut')
  }

  return (
    <div className="p-4 px-40">
      {/* Proceed to checkout section*/}
      <div className="flex flex-row justify-between h-20 bg-white border-2 rounded-xl shadow-md overflow-hidden">
        <div className="text-2xl m-3 p-2">Package Cart</div>
        <button onClick={handleCheckout} className="bg-deep-purple hover:bg-opacity-75 transition-colors duration-300 h-10 m-3 text-white font-bold py-2 px-4 rounded-l">
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
                      {pkg.images.map((slide, index) => (
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
                    {pkg.duration} days
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    {pkg.description.substring(0, 200)}...
                  </p>
                  <div className="flex mt-4 flex-col gap-1">
                    <div className="text-teal-600 text-sm">{pkg.discount}% Off</div>
                    <div className="items-center font-sans md:text-2xl font-bold">
                      <span>&#8377;</span>
                      {Math.floor(pkg.price - (pkg.price * (pkg.discount) / 100))}
                      <sup className="text-red-600 text-bold">*</sup>
                      <div className="ml-4 relative inline-block">
                        <span className="relative z-10 text-deep-purple text-[18px]">{pkg.price}</span>
                        <div className="absolute w-full h-0.5 bg-deep-purple top-1/2 transform -translate-y-1/2"></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-gray-700 font-semibold">Cities:</h3>
                    <p className="text-gray-700">{pkg.destinations.join(" ➜ ")}</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex mt-4">
                    <button
                      onClick={() => {
                        handleRemovePackage(pkg._id);
                      }}
                      title="Click to remove this package from cart"
                      className="bg-deep-purple hover:bg-opacity-75 transition-colors duration-300 text-white font-bold py-2 px-4 rounded-l"
                    >
                      REMOVE
                    </button>
                    {/* {pkg.type != "honeymoon" && ( */}
                    <>
                      {/* <button
                        title="Click to customize the number of traveller"
                        className="bg-dark-cyan hover:bg-opacity-75 transition-colors duration-300 text-white font-bold py-2 px-4 rounded-r"
                        onClick={() => {
                          setOpenAddTraveller(!openAddTraveller);
                        }}
                      >
                        CUSTOMIZE
                      </button> */}
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
                    {/* )} */}
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
