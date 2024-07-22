"use client";
import React, { useEffect } from 'react'
import SideNav from './_components/sideNav'
import DashboardHeader from './_components/dashboardHeader'
import { db } from '@/utils/dbconfig'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation';

//childeren prop refers to the page.jsx component as in next.js layout components wrap page components
function DashboardLayout({children}) {
  const {user} = useUser();

  const router = useRouter();

  useEffect(() => {
    user && checkUserBudgets();
  }, [user])
  const checkUserBudgets=async()=> {
    const result = await db.select()
    .from(Budgets)
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));




    if(result?.length==0){
      router.push('/dashboard/budgets')
    }
  }
  
  return (
    <div>
        <div className='fixed md:w-64  md:block '>
            <SideNav/>
        </div>
        <div className='md:ml-64 '>
          <DashboardHeader/>
            {children}
        </div>

        
    </div>
  )
}

export default DashboardLayout
