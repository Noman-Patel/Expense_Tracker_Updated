"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { LayoutDashboardIcon, PiggyBank, ReceiptIcon, ShieldCheckIcon } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'


function sideNav(){
  const  menuList=[
    {
    id:1,
    name:"Dashboard",
    icon:LayoutDashboardIcon,
    path:'/dashboard'
    },
    {
      id:2,
      name:"Budgets",
      icon:PiggyBank,
      path:'/dashboard/budgets'
    },
    {
      id:3,
      name:"Expenses",
      icon:ReceiptIcon,
      path:'/dashboard/expenses'
    }
  ]

  const path = usePathname()

  useEffect(() =>{
    console.log(path)
  },[path])
  
  return (
    <div className='h-screen p-5 border shadow-sm'>
      <Image src='/expense_tracker_logo.svg' 
      alt='logo'
      width={100}
      height={100}
      />

      <div className='mt-5'>
        {menuList.map((menu,index) =>(
          <Link href={menu.path}>
            <h2 className={`flex gap-2 items-center text-gray-500 font-medium p-5 mb-1
                            cursor-pointer rounded-md hover:text-customBlue hover:bg-blue-300
                            ${path==menu.path && 'text-customBlue bg-blue-100'}`}>
              <menu.icon size={20} />
              {menu.name}
            </h2>
          </Link>
          
        ))}
      </div>
      <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
        <UserButton/>
        Profile
      </div>
    </div>
  )
}

export default sideNav
