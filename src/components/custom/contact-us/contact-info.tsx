"use client";

import { FC } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const contactData = [
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    text: "The Villa Hotel, Yaddehimulla rd, Unawatuna, Galle",
  },
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    text: "+94 912227253",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    text: "thevillauna@gmail.com",
  },
];

export const ContactInfo: FC = () => {
  return (
    <div className="flex w-full h-auto flex-col gap-y-6 md:w-1/2">
      {contactData.map((data, key) => (
        <div key={key} className="relative flex items-center">
          {data.icon}
          <div className="ml-3 flex-col text-base md:ml-5">
            <h3 className="font-medium text-green-600">{data.title}</h3>
            <p className="text-sm font-medium italic">{data.text}</p>
          </div>
        </div>
      ))}

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.8926374614794!2d80.24393526026765!3d6.009477597792124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae172ef9e7b6327%3A0x847162e2dab43ba!2sThe%20Villa!5e0!3m2!1sen!2slk!4v1714838889995!5m2!1sen!2slk"
        className="h-full w-full rounded-md border min-h-72"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};
