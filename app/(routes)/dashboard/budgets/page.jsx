import React from 'react'
import BudgetList from './_components/BudgetList'

function Budget(){
  return (
    <div className='p-10 m-8'>
        <h2 className='font-bold text-3xl mt-7'>My budgets</h2>
        <BudgetList/>
    </div>
  )
}

export default Budget
