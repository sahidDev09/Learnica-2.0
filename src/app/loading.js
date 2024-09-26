import React from 'react'

function Loading () {
  return (
    <div className=' lg:ml-[660px] ml-50 justify-center mt-24 items-center'>
        <span className="loading loading-spinner loading-xs"></span>
        <span className="loading loading-spinner loading-sm"></span>
        <span className="loading loading-spinner loading-md"></span>
        <span className="loading loading-spinner loading-lg"></span>
    </div>
  )
}

export default Loading