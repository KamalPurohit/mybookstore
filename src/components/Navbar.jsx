import React from 'react'
import { ImBooks } from "react-icons/im";
import { Link, useNavigate, useNavigation } from 'react-router-dom';


const Navbar = () => {
  return (
    <div className='bg-primary w-100 flex h-20 items-center px-4 justify-between border-b border-secondary'>
      <Link to="/" className='text-2xl font-medium max-sm:text-xl'>My BookStore</Link>
      <Link to="/shelf" className='bg-pop text-secondary px-4 p-2 roudned-xl hover:underline font-medium rounded-md max-sm:text-sm  flex gap-2 items-center'><ImBooks className='w-5 h-5'/>My Bookshelf</Link>
    </div>
  )
}

export default Navbar
