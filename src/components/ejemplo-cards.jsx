import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { URL } from '../ip';

export const EjemploCards = () => {
    const [cities, setCities] = useState([]);
    const [error, setError] = useState(null);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            slidesToSlide: 1
        }
    };

    useEffect(() => {
        fetch(URL+'api/hotel/getCities')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('No se encontraron ciudades');
                }
            })
            .then(data => {
                if (data.data) {
                    setCities(data.data);
                } else {
                    throw new Error('No se encontraron ciudades');
                }
            })
            .catch(error => {
                setError(error.message);
                console.error('Error fetching cities:', error);
            });
    }, []);

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <Carousel
            swipeable={false}
            showDots={false}
            responsive={responsive}
            infinite={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={"desktop"}
            dotListClass="custom-dot-list-style"
        >
            {cities.map((city, index) => (
                <div className='flex justify-center text-center' key={index}>
                    <Card href={`/hotelview/${city}`} className="w-64 my-4 transition ease-in-out delay-150 hover:scale-110" style={{ height: '100px'}}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {city}
                        </h5>
                    </Card>
                </div>
            ))}
        </Carousel>
    );
};
