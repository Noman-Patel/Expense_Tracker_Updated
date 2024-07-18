"use client"
"use client"

import { db } from '@/utils/dbconfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, sql,getTableColumns } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable';

 function Expense(){

    const {user} = useUser();

    const [budgetList,setBudgetList] = useState([]);

    const [expensesList,setExpensesList]=useState([]);

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
          getAllExpenses();
          }

          const getAllExpenses=async()=>{
            const result = await db.select({
                id:Expenses.id,
                name: Expenses.name,
                createdAt: Expenses.createdAt,
                price: Expenses.price
            }).from(Budgets)
            .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
            .orderBy(desc(Expenses.createdAt));
            setExpensesList(result);

        }

  return (
    <div className='px-4'>
        <h2 className='font-bold text-3xl mt-7'>My Expenses</h2>
        <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
        />
    </div>
    )
}

export default Expense
