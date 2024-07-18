//To make the route daynamic put the varible in [] for the file name
"use client";
import { db } from "@/utils/dbconfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq, sql, getTableColumns, desc } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpenses from "../_components/AddExpenses";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PenBox, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";

function ExpensesScreen({ params }) {
  const { user } = useUser();

  const [budgetInfo, setBudgetInfo] = useState();

  const [expensesList, setExpensesList] = useState([]);

  const  route = useRouter()

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  const getBudgetInfo = async () => {
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
      .where(eq(Budgets.id, params.id))
      .groupBy(sql`${Budgets.id}`);

    setBudgetInfo(result[0]);
    getExpenseList();
  };

  const getExpenseList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
    console.log(result);
  };

  const deleteBudget = async() => {
    const deleteExpenseResult = await db.delete(Expenses)
    .where(eq(Expenses.budgetId, params.id))
    .returning()

    if (deleteExpenseResult){
        const result = await db.delete(Budgets)
        .where(eq(Budgets.id, params.id))
        .returning();
        console.log(result)

    }

    toast('Budget Deleted')
    route.replace('/dashboard/budgets')

  }

  return (
    <div className="p-10 m-6">
      <h2 className="font-bold text-3xl flex justify-between items-center ">
        <span className="flex gap-2 items-center">
            <ArrowLeft onClick={() => route.back()} className="cursor-pointer"/>
            My expenses
        </span>

        <div className="flex gap-2 items-center">
            <EditBudget budgetInfo={budgetInfo}
            refershData={()=>getBudgetInfo()}/>
            
            <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="flex gap-2" variant="destructive">
                <Trash />
                Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    current budgets along with your expense and remove your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>

        </div>


        
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-7 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpenses
          budgetId={params.id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>
      <div className="mt-4">
        <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetInfo()}
            />

        
      </div>
    </div>
  );
}

export default ExpensesScreen;
