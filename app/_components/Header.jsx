"use client";
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

const Header = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className='p-5 flex justify-between items-center border shadow-md'>
      <Image
        src={'/expense_tracker_logo.svg'}
        alt='logo'
        width={100}
        height={100}
      />
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href={'/sign-in'}>
          <Button className="bg-blue-600">Get started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;

