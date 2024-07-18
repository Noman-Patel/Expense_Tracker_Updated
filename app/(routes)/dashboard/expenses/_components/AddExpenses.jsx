import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbconfig";
import { Budgets, Expenses } from "@/utils/schema";
import { Loader } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpenses({budgetId,user,refreshData}) {
    const[name,setName] = useState();
    const[price,setPrice] = useState();
    const[loading,setLoading] = useState(false)

    const addNewExpense =async() =>{
      setLoading(true)
        const result = await db.insert(Expenses).values({
            name:name,
            price:price,
            budgetId:budgetId,
            createdAt:moment().format('MM/DD/YYYY')
        }).returning({insertedId:Budgets.id})


        setPrice('')
        setName('')
        if(result){
          setLoading(false)
          refreshData()
          toast('New Expenses Added!')
        }
        setLoading(false)
    }

  return (
    <div className="border p-5 rounded-lg">
      <h2>Add expenses</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g Home Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expenses amount</h2>
        <Input
          placeholder="e.g 10000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <Button disabled={!(name&&price) || loading} 
      onClick={() => addNewExpense()}
      className="mt-3 w-full bg-customRed">
        {
          loading ? 
          <Loader className="animate-spin"/> : 'Add New Expense'
        }
      </Button>
    </div>
  );
}

export default AddExpenses;
