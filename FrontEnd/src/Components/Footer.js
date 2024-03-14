import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-4">About Us</h2>
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget turpis condimentum, sollicitudin lorem sit amet, dapibus nisi.</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-4">Services</h2>
                        <ul className="text-sm">
                            <li>Travel Planning</li>
                            <li>Hotel Booking</li>
                            <li>Activity Reservations</li>
                            <li>Travel Insurance</li>
                        </ul>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                        <p className="text-sm">123 Main Street, City, Country</p>
                        <p className="text-sm">Email: info@example.com</p>
                        <p className="text-sm">Phone: +1234567890</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-4">Follow Us</h2>
                        <div className="flex space-x-4">
                            <a href="#" className="text-xl"><i className="fab fa-facebook"></i></a>
                            <a href="#" className="text-xl"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="text-xl"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="text-xl"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center">
                <p className="text-sm">&copy; 2024 TrippyWay. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
