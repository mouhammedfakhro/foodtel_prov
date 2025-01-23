import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className='flex justify-end pr-20 h-10 items-center'>
      <Link href="/admin" className="relative group text-white">
        Hantera bokningar
        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
      </Link>
    </div>
  );
};

export default Header;
