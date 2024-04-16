
'use client';

import { Carousel } from 'flowbite-react';
import image from "../assets/img/2.png";
import image1 from "../assets/img/3.png"; 
import image2 from "../assets/img/4.png";
import image3 from "../assets/img/5.png";
import image4 from "../assets/img/6.png";

function Car() {
  return (
    <div className="flex justify-center mb-2">
      <div className="h-54 w-11/12/12 sm:h-64 sm:w-11/12 xl:h-72 mt-4">
        <Carousel>
          <img className="h-54 sm:h-64 xl:h-72 2xl:h-72 object-cover" src={image} alt="..." />
          <img className="h-54 sm:h-64 xl:h-72 2xl:h-72 object-cover" src={image2} alt="..." />
          <img className="h-54 sm:h-64 xl:h-72 2xl:h-72 object-cover" src={image3} alt="..." />
          <img className="h-54 sm:h-64 xl:h-72 2xl:h-72 object-cover" src={image4} alt="..." />
          <img className="h-54 sm:h-64 xl:h-72 2xl:h-72 object-cover" src={image1} alt="..." />
        </Carousel>
      </div>
    </div>
  );
}

export default Car;
