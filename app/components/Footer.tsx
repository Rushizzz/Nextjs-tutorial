
"use client";
import translations from '../public/translations';
import { useLanguage } from '../context/LanguageContext';
import qrcode from "../assets/icons/qr code.png"
import Image from 'next/image';

export default function Footer() {
    const { language } = useLanguage();
    
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between">
                {/* Contact Information */}
                <div className="mb-6 md:mb-0 ml-4">
                    <h2 className="text-lg font-bold mb-2">Contact Us</h2>
                    <p>A108 Adam Street</p>
                    <p>+91 7758026057</p>
                    <p>info@example.com</p>
                </div>

                {/* Location */}
                <div className="mb-6 md:mb-0 ml-4">
                    <h2 className="text-lg font-bold mb-2">Location</h2>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15163.83819972304!2d74.60138659177247!3d18.16577723166194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc39ff91bbd5a8d%3A0xd7dc3e270d8c18ab!2sHotel%20Amardeep!5e0!3m2!1sen!2sin!4v1728384433322!5m2!1sen!2sin"
                      width="300"
                      height="200"
                      style={{ border: 'none' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    ></iframe>
                </div>

                {/* QR Code Section */}
                <div className="flex flex-col items-start ml-4">
                    <h2 className="text-lg font-bold mb-2">Scan QR Code</h2>
                    <Image 
                        src={qrcode}
                        alt="Join our WhatsApp group" 
                        className="w-32 h-32 mb-2"
                    />
                    <p className="text-center text-sm">Join our WhatsApp group by scanning this QR!</p>
                </div>
            </div>
        </footer>
    );
}