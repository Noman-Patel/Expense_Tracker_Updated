import React from "react";


const Hero = () => {
  return (
    <section className="bg-gray-900 text-white flex items-center felx-col">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-customRed via-customYellow  to-customGreen bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Manage your daily expenses
            <span className="sm:block"> Control your money </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Start creating your budget and take control of your finances
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="#"
            >
              Get Started
            </a>

            
          </div>
        </div>
      </div>
      <video width={2000} height={7000} controls>
          <source  src="/DEMO.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
    </section>
  );
};

export default Hero;
