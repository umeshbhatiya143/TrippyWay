import React, { useState ,useEffect} from "react";
import Alert from "../Alert";

const DetailsForm = ({index,travellerDetails ,handleAddDetails}) => {
  const [openError, setOpenError] = useState(false);
  const [errormessage, setErrorMessage] = useState("");
  const [successMessage,setSuccessMessage]=useState("");
  const [openSuccess,setOpenSuccess]=useState(false)
 // console.log("state opening",detailsPerPackage);
  const initialFormValues = travellerDetails.find(detail => detail.index === index) || {
    index: index,
    firstname: "",
    lastname: "",
    adhaarnumber: "",
    dateofbirth: new Date().toISOString().slice(0, 10),
    gender: ""
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };
  const handleValidation = () => {
    const {firstname, lastname,adhaarnumber, dateofbirth, gender } =
      formValues;
    if 
      (firstname == "" ||
      lastname == "" ||
      dateofbirth == ""||
      gender == ""|| adhaarnumber==""
    
    ) {
      setOpenError(true);
      setErrorMessage("Fill all the required fields !");
      return false
    }
    const today = new Date();
    const selectedDate = new Date(dateofbirth);
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
  
    if (selectedDate > today) {
      setOpenError(true);
      setErrorMessage("Date of birth cannot be in the future!");
      return false;
    }
  
    if (selectedDate > fiveYearsAgo) {
      setOpenError(true);
      setErrorMessage("Travellers must be at least 5 years old!");
      return false;
    }
    const aadhaarRegex = /^\d{12}$/;
  if (!aadhaarRegex.test(adhaarnumber)) {
    setOpenError(true);
    setErrorMessage("Enter a valid 12-digit Aadhaar number!");
    return false;
  }
    return true
  };
  const handleSubmit = (e) => {
    console.log("handlesubmit");
    e.preventDefault();
   const submit= handleValidation();
    if(submit){
      handleAddDetails(formValues);
      setOpenSuccess(true)
      setSuccessMessage("Information Added")
    }
   
   
  };
  useEffect(() => {
    setTimeout(() => {
      setOpenError(false);
      setOpenSuccess(false)
    }, 5000); // 10000 milliseconds = 10 seconds
  }, [openError,openSuccess]);

 console.log("state after reopening",formValues);
  return (
    // <sect className="  flex justify-center items-center">
      <div className=" bg-white p-10 m-2 rounded-lg border border-gray-200 flex flex-col  gap-2 ">
        <h3 className="text-2xl font-bold mb-1 text-deep-purple">
          Add Details
        </h3>
        <hr></hr>
        <h4 className="text-xl font-semibold">package number 1</h4>
        {/* <h6 className="font-medium">Traveller 1</h6> */}

        <form className="w-full" action="">
          <div className="grid md:grid-cols-2  sm:grid-cols-1 w-full gap-6">
            {/* <div className="flex flex-col gap-1.5 font-medium">
              <label htmlFor="title">Title:</label>
              <select
                id="title"
                name="title"
                className="bg-gray-100 border-none p-2.5 rounded-lg"
                value={formValues.title}
                onChange={handleChange}
              >
                <option value="">Select Title</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="Ms">Ms</option>
              </select>
            </div> */}
            <div className="flex flex-col w-full gap-1.5 font-medium">
              <label htmlFor="name">Firstname:</label>
              <input
                required
                type="text"
                id="firstname"
                name="firstname"
                placeholder="firstname"
                className="bg-gray-100 border-none p-2.5 rounded-lg "
                value={formValues.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full gap-1.5 font-medium">
              <label htmlFor="lastname">Lastname:</label>
              <input
                required
                type="lastname"
                id="lastname"
                name="lastname"
                placeholder="lastname"
                className="bg-gray-100 border-none p-2.5 rounded-lg"
                value={formValues.lastname}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full gap-1.5 font-medium">
              <label htmlFor="lastname">Adhaar Number:</label>
              <input
                required
                type="adhaarnumber"
                id="adhaarnumber"
                name="adhaarnumber"
                placeholder="adhaarnumber"
                className="bg-gray-100 border-none p-2.5 rounded-lg"
                value={formValues.adhaarnumber}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full gap-1.5 font-medium">
              <label htmlFor="dateofbirth">Date Of Birth:</label>
              <input
                required
                type="date"
                id="dateofbirth"
                name="dateofbirth"
                className="bg-gray-100 border-none p-2.5 rounded-lg"
                value={formValues.dateofbirth}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full gap-1.5 font-medium">
              <label htmlFor="gender">Gender</label>
              <select
                required
                id="gender"
                name="gender"
                className="bg-gray-100 border-none p-2.5 rounded-lg"
                value={formValues.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* <div className="flex flex-col w-full gap-1.5 font-medium">
              <label htmlFor="nationality">Nationality</label>
              <input
                required
                type="nationality"
                id="nationality"
                name="nationality"
                placeholder="nationality"
                className="bg-gray-100 border-none p-2.5 rounded-lg"
                value={formValues.nationality}
                onChange={handleChange}
              />
            </div> */}
            {/* <div className="flex flex-col w-full gap-1.5 font-medium">
              <label htmlFor="contact">Passport Number</label>
              <input
                type="passportnumber"
                id="passportnumber"
                name="passportnumber"
                placeholder="passport number"
                className="bg-gray-100 border-none p-2.5 rounded-lg"
                value={formValues.passportnumber}
                onChange={handleChange}
              /> */}
            {/* </div>
            <div className="flex flex-col w-full gap-1.5 font-medium">
              <label htmlFor="contact">Passport Expirt Date</label>
              <input
                type="date"
                id="passportexpirydate"
                name="passportexpirydate"
                className="bg-gray-100 border-none p-2.5 rounded-lg"
                value={formValues.passportexpirydate}
                onChange={handleChange}
              />
            </div> */}
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-deep-purple  hover:bg-opacity-75 transition-colors duration-300 h-10 m-3 text-white font-bold py-2 px-4 rounded"
            >
              ADD
            </button>
            {openError && <Alert message={errormessage} type="error" />}
            {openSuccess && <Alert message={successMessage} type="success"/>}
          </div>
        </form>
      </div>
    
  );
};

export default DetailsForm;
