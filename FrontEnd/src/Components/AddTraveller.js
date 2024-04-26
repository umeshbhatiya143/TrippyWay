import React from "react";
import Alert from "./Alert";

const AddTraveller = ({
  handleIncrementTraveller,
  handleDecrementTraveller,
  setOpenAddTraveller,
  noOfTravelller,  
  id,
  error,
  showError,
}) => {

    const handleClose=()=>{
        setOpenAddTraveller(false)
    }
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h1 className="text-3xl font-bold mb-4 text-center">Add Traveller</h1>

        <div className="grid gap-4">
          {/* Adult */}
          <div>
            {/* <div className="text-center">Adult</div> */}
            <div className="flex justify-center items-center">
              <button
                className="bg-button-color-hover hover:bg-button-color text-white px-4 py-2 rounded-l"
                onClick={() => handleDecrementTraveller(id)}
              >
                -
              </button>
              <span className="mx-4">{noOfTravelller}</span>
              <button
                className="bg-button-color-hover hover:bg-button-color text-white px-4 py-2 rounded-r"
                onClick={() => handleIncrementTraveller(id)}
              >
                +
              </button>
            </div>
          </div>

          {/* Children */}
          {/* <div>
            <div className="text-center">Children</div>
            <div className="flex justify-center items-center">
              <button
                className="hover:bg-button-color-hover bg-button-color text-white px-4 py-2 rounded-l"
                onClick={() => handleDecrementChildTraveller(id)}
              >
                -
              </button>
              <span className="mx-4">{children}</span>
              <button
                className="hover:bg-button-color-hover bg-button-color text-white px-4 py-2 rounded-r"
                onClick={() => handleIncrementChildTraveller(id)}
              >
                +
              </button>
            </div>
          </div> */}
        </div>

        <div className="mt-4">
          <button onClick={handleClose} className="bg-button-color-hover hover:bg-button-color hover:bg-opacity-75 transition-colors duration-300 text-white font-bold py-2 px-4 rounded-full w-full">
            SUBMIT
          </button>
        </div>

        {showError && <Alert message={error} type="error" />}
      </div>
    </div>
  );
};

export default AddTraveller;
