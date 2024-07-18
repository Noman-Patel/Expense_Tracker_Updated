import { UserButton } from '@clerk/nextjs'
import React from 'react'

function dashboardHeader(){
  return (
    <div className='p-5 border-bottom shadow-md flex justify-between'>
        <div>
            
        </div>

        <div>
            <UserButton/>
        </div>
    </div>
  )
}

export default dashboardHeader
