import Image from 'next/image'
import loadingImage from '/public/loading.png'


export const Loading = () => {
    return (
        <div className='bg-neutral-300 flex flex-col justify-center items-center bg-opacity-95 absolute top-0 left-0 w-full h-full'>
            <Image src={loadingImage} alt="loading" className='' />
            <p className='text-neutral-600 text-xl'>Loading characters...</p>
        </div>
    )
}
