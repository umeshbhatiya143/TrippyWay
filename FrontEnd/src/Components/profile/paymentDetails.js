import React, { useState } from 'react';

const PaymentDetails = () => {
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, type: 'Credit Card', lastFourDigits: '1234' },
        { id: 2, type: 'Debit Card', lastFourDigits: '5678' },
        // Add more payment methods as needed
    ]);

    return (
        <div className="w-full p-8 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {paymentMethods.map(method => (
                    <div key={method.id} className="bg-white rounded-lg shadow-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">{method.type}</h3>
                        <p className="text-sm text-gray-600 mb-2">Ending in {method.lastFourDigits}</p>
                        {/* Additional details for payment method if needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentDetails;
