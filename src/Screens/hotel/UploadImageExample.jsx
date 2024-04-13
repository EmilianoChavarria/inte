import React from 'react'
import FileUploadComponent from '../../components/apis/hotels/Form'
import Get from '../../components/apis/hotels/Get'
import Component from '../../components/Navbar'
import ModalHotel from '../../components/apis/hotels/modalHotel'

export const UploadImageExample = () => {
    return (
        <>
            <Component />
            <div className='flex flex-row'>
                <div className='w-full mt-4'>
                    <ModalHotel />
                </div>
                {/* <div>
                    <Get />
                </div> */}
            </div>

        </>
    )
}
