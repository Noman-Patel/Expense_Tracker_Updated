import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({budgetList}){
  return (
    <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-lg'>
        Activity
      </h2>
      <ResponsiveContainer width={'80%'} height={400}>
        <BarChart

          data={budgetList}
          margin={{
            top:7,
          }}
          >
            <XAxis dataKey='name'/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="totalSpend" stackId="a" fill="#1F84Ef"/>
            <Bar dataKey="amount" stackId="a" fill="#06E07F" />


        </BarChart>
      </ResponsiveContainer>

    </div>
  )
}

export default BarChartDashboard
