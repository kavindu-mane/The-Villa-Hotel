import { FC } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import backgroundImage from "../../../../../public/images/img_12.jpg";

const ContactUs: FC = () => {
    return (
        <>
            <section className="contact min-h-screen p-5 md:p-20 flex justify-center items-center flex-col bg-cover" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="content max-w-screen-md mx-auto text-center">
                    <h2 className="text-3xl font-semibold text-black">Get In Touch</h2>
                    <p className="font-light text-black">Feel free to reach out to us with any questions, comments, or inquiries you may have. We're here to help!</p>
                </div>
                <div className="container flex flex-col md:flex-row justify-center items-center mt-8 w-full">
                    <div className="contactInfo w-full md:w-1/2 flex flex-col">
                        <div className="box relative p-5 md:p-10 lg:p-20 flex items-center">
                        <FaMapMarkerAlt  className="icon text-3xl"/>
                            <div className="text ml-3 md:ml-5 text-black text-base flex-col font-light">
                                <h3 className="font-medium text-green-600">Address</h3>
                                <p>The Villa Hotel, Yaddehimulla rd,<br/> Unawatuna,<br/> Galle</p>
                            </div>
                        </div>
                        <div className="box relative p-5 md:p-10 lg:p-20 flex items-center">
                        <FaPhoneAlt  className="icon text-3xl"/>
                            <div className="text ml-3 md:ml-5 text-black text-base flex-col font-light">
                                <h3 className="font-medium text-green-600">Phone</h3>
                                <p>+94 912227253</p>
                            </div>
                        </div>
                        <div className="box relative p-5 md:p-10 lg:p-20 flex items-center">
                        <FaEnvelope  className="icon text-3xl"/>
                            <div className="text ml-3 md:ml-5 text-black text-base flex-col font-light">
                                <h3 className="font-medium text-green-600">Email</h3>
                                <p>thevillauna@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="contactForm w-full md:w-1/2 p-10 lg:p-20 bg-white">
                        <form action="">
                            <h2 className="text-3xl text-green-600 font-medium">Send Message</h2>
                            <div className="inputBox relative mt-5 md:mt-10 w-full">
                                <label>Full Name</label>
                                <input className="w-full py-1 px-0 text-base my-2 border-b-2 border-gray-700 focus:border-black outline-none resize-none " type="text" name="" placeholder="Enter your full name" required />
                            </div>
                            <div className="inputBox relative mt-5 md:mt-10 w-full">
                                <label>Email</label>
                                <input className="w-full py-1 px-0 text-base my-2 border-b-2 border-gray-700 focus:border-black outline-none resize-none" type="text" name="" placeholder="Enter your email" required />
                            </div>
                            <div className="inputBox relative mt-5 md:mt-10 w-full">
                                <label>Message</label>
                                <textarea className="w-full py-1 px-0 text-base my-2 border-b-2 border-gray-700 focus:border-black outline-none resize-none" placeholder="Type your message here..." required></textarea>
                            </div>
                            <div className="inputBox relative mt-5 md:mt-10 w-full">
                                <input className="w-full py-1 px-0 text-base my-2 border-b-2 border-gray-700 focus:border-black outline-none resize-none w-24 bg-green-600 text-white border-none cursor-pointer py-2 px-4 " type="submit" name="" value="Send" />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            
        </>
    )
}

export default ContactUs;