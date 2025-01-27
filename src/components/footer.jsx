import React from 'react';

const Footer = () => {
  return (
    <>
      <div className="sm:flex hidden  flex-wrap justify-between px-6 sm:px-12 lg:px-36 py-8 bg-gray-200 shadow-lg">
        {/* Popular Categories */}
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h1 className="font-bold text-lg sm:text-xl">POPULAR CATEGORIES</h1>
          <div className="mt-4 space-y-2">
            <p>Cars</p>
            <p>Flats for rent</p>
            <p>Mobile phones</p>
            <p>Jobs</p>
          </div>
        </div>

        {/* Trending Searches */}
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h1 className="font-bold text-lg sm:text-xl">TRENDING SEARCHES</h1>
          <div className="mt-4 space-y-2">
            <p>Cars</p>
            <p>Flats for rent</p>
            <p>Mobile phones</p>
            <p>Jobs</p>
          </div>
        </div>

        {/* About Us */}
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h1 className="font-bold text-lg sm:text-xl">ABOUT US</h1>
          <div className="mt-4 space-y-2">
            <p>Cars</p>
            <p>Flats for rent</p>
            <p>Mobile phones</p>
            <p>Jobs</p>
          </div>
        </div>

        {/* OLX */}
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h1 className="font-bold text-lg sm:text-xl">OLX</h1>
          <div className="mt-4 space-y-2">
            <p>Cars</p>
            <p>Flats for rent</p>
            <p>Mobile phones</p>
            <p>Jobs</p>
          </div>
        </div>

        {/* Follow Us */}
        <div className="w-full  sm:w-auto">
          <h1 className="font-bold text-lg sm:text-xl">FOLLOW US</h1>
          <div className="mt-4 space-y-2">
            <p>Cars</p>
            <p>Flats for rent</p>
            <p>Mobile phones</p>
            <p>Jobs</p>
          </div>
        </div>


      </div>


      
      <div className="sm:hidden flex justify-center gap-x-2 p-2  sm:w-auto">
        <p>App store</p>
        <p>App store</p>
        <p>App store</p>

         
        </div>
    </>
  );
};

export default Footer;
