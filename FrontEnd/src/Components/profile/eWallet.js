import React, { useState } from 'react';

const Ewallet = () => {
    const [balance, setBalance] = useState(500); // Initial balance

    const handleDeposit = () => {
        // Simulate deposit logic (add $100 to the balance)
        setBalance(prevBalance => prevBalance + 100);
    };

    const handleWithdraw = () => {
        // Simulate withdraw logic (subtract $100 from the balance if there are sufficient funds)
        if (balance >= 100) {
            setBalance(prevBalance => prevBalance - 100);
        } else {
            alert("Insufficient funds!");
        }
    };

    return (
        <div className="w-full p-8 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">E-Wallet</h2>
            <div className="flex items-center justify-between mb-4">
                <p className="text-lg">Balance: ${balance}</p>
                <div>
                    <button onClick={handleDeposit} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md mr-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Deposit</button>
                    <button onClick={handleWithdraw} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Withdraw</button>
                </div>
            </div>
        </div>
    );
};

export default Ewallet;
