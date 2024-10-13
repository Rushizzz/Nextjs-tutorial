// Home.tsx
"use client";

import Navbar from "../components/navbar";
import Form from "../components/Form"; // Adjust path as necessary
import Footer from "../components/Footer"; // Adjust path as necessary
import { LanguageProvider } from '../context/LanguageContext'; // Adjust path as necessary

export default function Home() {
  return (
    <LanguageProvider>
      <div className="bg-gray-100">
        <Navbar />
        <Form />
        <Footer />
      </div>
      
    </LanguageProvider>
  );
}