import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

/**
 * Renders the primary Layout component for the public-facing area of the e-commerce application.
 * Parameters: None.
 * This component sets up a consistent page structure, including a sticky Header, dynamic content via React Router's Outlet, and a persistent Footer.
 */
const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
