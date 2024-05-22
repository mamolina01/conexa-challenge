import Link from 'next/link'
import React from 'react'

export const Footer = () => {
    return (
        <div className=" py-5 flex justify-center items-center sm:text-lg gap-2">
            <Link href="https://matiasnmolina.com" target='_blank' className='text-green-900 font-medium' >
                Matias Molina
            </Link>
            <span className='text-black'>
                | Frontend Developer
            </span>
        </div>
    )
}
