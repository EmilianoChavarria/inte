
'use client';

import { Carousel } from 'flowbite-react';

function Car() {
  return (
    <div className="flex justify-center mb-2 h-screen">
      <div className="h-54 w-11/12/12 sm:h-64 sm:w-11/12 xl:h-72 mt-4">
        <Carousel>
          <img className="h-54 sm:h-64 xl:h-96 2xl:h-96 object-cover" src="https://www.marriott.com/content/dam/marriott-digital/xe/global-property-shared/en_us/photo/07-2018-photoshoot/unlimited/assets/xe-bjxxo-exterior257305-6667-10898.jpeg" alt="..." />
          <img className="h-54 sm:h-64 xl:h-96 2xl:h-96 object-cover" src="https://cdn.forbes.com.mx/2020/07/hoteles-Grand-Velas-Resorts-e1596047698604.jpg" alt="..." />
          <img className="h-54 sm:h-64 xl:h-96 2xl:h-96 object-cover" src="https://media-cdn.tripadvisor.com/media/photo-s/29/11/23/98/hotel-exterior.jpg" alt="..." />
          <img className="h-54 sm:h-64 xl:h-96 2xl:h-96 object-cover" src="https://www.eluniversal.com.mx/resizer/pAcZ4pKhVCS9ncmDXERDsqrXGQs=/1100x666/cloudfront-us-east-1.images.arcpublishing.com/eluniversal/SENJGS64ZNC6BHWRLOEVJ3NU6E.jpg" alt="..." />
          <img className="h-54 sm:h-64 xl:h-96 2xl:h-96 object-cover" src="https://i0.wp.com/foodandpleasure.com/wp-content/uploads/2021/03/hoteles-en-puebla-azultalavera.jpeg?fit=1280%2C866&ssl=1" alt="..." />
        </Carousel>
      </div>
    </div>
  );
}

export default Car;
