"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import { db } from "@/utils/dbconfig";
import { sql, getTableColumns, desc, eq } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import BarChartDashboard from "./budgets/_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

function Dashboard() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);

  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`SUM(${Expenses.price})`.mapWith(Number),
        totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, sql`${Budgets.id} = ${Expenses.budgetId}`)
      .where(
        sql`${Budgets.createdBy} = ${user?.primaryEmailAddress?.emailAddress}`
      )
      .groupBy(sql`${Budgets.id}`)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
    getAllExpenses();
  };

  //Used to retrive all expenses belonging to the user

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        createdAt: Expenses.createdAt,
        price: Expenses.price,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.createdAt));
    setExpensesList(result);
  };

  return (
    <div className=" p-5">
      <h2 className="font-bold text-3xl">Hi,{user?.firstName} </h2>
      <p className="text-gray-500">
        Here's what happening with our money,Let manage four expense
      </p>
      <CardInfo budgetList={budgetList} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-6">
        <div className="md:col-span-2">
          <BarChartDashboard budgetList={budgetList} />

          <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
          />
        </div>

        <div>
          {budgetList?.length > 0 ? (
            <div className="grid gap-4 ">
              {budgetList.map((budget, index) => (
                <BudgetItem budget={budget} key={index} />
              ))}
            </div>
          ) : (
            <div className="mt-7 grid grid-row-1 md:grid-row-2 lg:grid-row-3 gap-5">
              {[1, 2, 3].map((item, index) => (
                <div className="h-[120px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
