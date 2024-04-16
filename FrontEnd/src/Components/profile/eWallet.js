import React, { useState } from 'react';
import { FaWallet, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const Wallet = () => {
    const [balance, setBalance] = useState(100.0); // Initial mock balance
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState('');

    const handleTransaction = (type) => {
        const parsedAmount = parseFloat(amount);
        if (!parsedAmount) {
            alert('Please enter a valid amount.');
            return;
        }

        const newBalance =
            type === 'add' ? balance + parsedAmount : balance - parsedAmount;
        if (newBalance < 0) {
            alert('Insufficient balance for this transaction.');
            return;
        }

        const newTransaction = {
            id: transactions.length + 1,
            type: type === 'add' ? 'Deposit' : 'Withdrawal',
            amount: parsedAmount,
            date: new Date().toLocaleDateString(),
        };

        setBalance(newBalance);
        setTransactions([...transactions, newTransaction]);
        setAmount('');
    };

    return (
        <div className="p-8 bg-gray-100 rounded-md shadow-md">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-deep-purple mb-2">Wallet Balance</h2>
                <FaWallet className="mx-auto text-5xl text-dark-cyan mb-4" />
                <p className="text-xl text-custom-black mt-2"><span>&#8377;</span>{balance.toFixed(2)}</p>
            </div>

            <div className="flex justify-between items-center mb-8">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-grow border-2 border-dark-cyan rounded-l-md p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                    placeholder="Enter amount"
                />
                <button
                    onClick={() => handleTransaction('add')}
                    className="bg-dark-cyan flex items-center hover:bg-deep-purple text-custom-white font-bold py-2 px-6 rounded-md shadow transition-colors duration-300 ease-in-out"
                >
                    <FaPlusCircle className="mr-2" /> Add
                </button>
                <button
                    onClick={() => handleTransaction('withdraw')}
                    className="bg-dark-cyan flex items-center hover:bg-deep-purple text-custom-white font-bold py-2 px-6 rounded-md shadow transition-colors duration-300 ease-in-out ml-2"
                >
                    <FaMinusCircle className="mr-2" /> Withdraw
                </button>
            </div>

            <div className="mt-6">
                <h3 className="text-xl font-semibold text-dark-cyan mb-3">Transaction History</h3>
                <div className="overflow-auto bg-white rounded-md shadow-inner p-3">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="pb-2 pl-2 border-b-2 border-gray-300">Date</th>
                                <th className="pb-2 pl-2 border-b-2 border-gray-300">Type</th>
                                <th className="pb-2 pl-2 border-b-2 border-gray-300">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.id} className="border-b">
                                    <td className="pt-2 pb-2 pl-2">{transaction.date}</td>
                                    <td className="pt-2 pb-2 pl-2">{transaction.type}</td>
                                    <td className={`pt-2 pb-2 pl-2 ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                    <span>&#8377;</span>{transaction.amount.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                            {transactions.length === 0 && (
                                <tr className="border-t">
                                    <td colSpan="3" className="pt-2 pb-2 text-center text-gray-500">No transactions recorded.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
