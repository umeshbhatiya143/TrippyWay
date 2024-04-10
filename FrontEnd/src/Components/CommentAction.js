import React from 'react'

const CommentAction = ({handleClick , type }) => {
  return (
    <div onClick={handleClick} className='items-center text-gray-800 w-16 h-8 m-2 p-1 text-[15px] hover:cursor-pointer hover:bg-slate-300'>
      {type}
    </div>
  )
}

export default CommentAction
