"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbconfig'
import BudgetItem from './BudgetItem'

function BudgetList(){

  const [budgetList,setBudgetList] = useState([]);

  const {user}=useUser()
  
  useEffect(() =>{
    user&&getBudgetList();
  },[user])
  const getBudgetList=async()=>{

    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`SUM(${Expenses.price})`.mapWith(Number),
      totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number)
    })
    .from(Budgets)
    .leftJoin(Expenses, sql`${Budgets.id} = ${Expenses.budgetId}`)
    .where(sql`${Budgets.createdBy} = ${user?.primaryEmailAddress?.emailAddress}`)
    .groupBy(sql`${Budgets.id}`)
    .orderBy(desc(Budgets.id));

    setBudgetList(result);
        console.log(result);
      }
  return (
    <div className='mt-7'> 
    
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      <CreateBudget
      refreshData={()=> getBudgetList()} />
      {budgetList?.length>0? budgetList.map((budget, index) => (
        <BudgetItem key={budget.id || index} budget={budget} />
      ))
    :[1,2,3,4].map((item,index)=>(
      <div key={index} className='w-full bg-slate-300 rounded-lg h-[150px] animate-bounce'> 
      </div>
    ))}
    </div>

    </div>
  )
}

export default BudgetList
