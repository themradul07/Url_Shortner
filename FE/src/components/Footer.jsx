import React from 'react'

const Footer = () => {
    return (
        <div className='bottom-0 flex flex-col gap-4 justify-center text-white min-h-[30vh] items-center bg-slate-900'>
            <div className="logo font-bold text-2xl ">
                <span className='text-green-600'>&lt;</span>
                Light
                <span className='text-green-600'>Link/&gt;</span>
            </div>
            <div className='flex justify-center items-center gap-2'>
                <div>Made with</div> <img src="/heart.svg" alt="" /> <div>by Mradul</div>
            </div>
        </div>
    )
}

export default Footer