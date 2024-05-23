
import React from 'react'
import {default as api} from '../store/apislice.js'
import { getLabels} from '../helper/helper.js';



const labels = () => {
    const {data,isFetching,isSuccess,isError}=api.useGetlabelsQuery();
    let transactions;
    
    
 


    if(isFetching){
        transactions=<div>Fetching</div>

    }else if(isSuccess){

        
        
        transactions=getLabels(data,'type').map((v,i)=><Labelcomponent key={i} data={v}></Labelcomponent>)
        

    }else if(isError){

        transactions=<div>Error</div>
    }
    
  return (
    <>
    {transactions}
    
    </>
  )
}

function Labelcomponent({data}){
    if(!data)return <></>;
    return (
        <div className='labels flex justify-between'>
            <div className='flex gap-2'>
                <div className='w-2 h-2 rounded py-3 ' style={{background:data.color ??'#f9c74f'}}></div>
                <h3 className='text-md'>
                    {data.type ?? ''}
                </h3>
            </div>
            <h3 className='font-bold'>{Math.round(data.percent)??0}%</h3>
        </div>
)
        
    }


export default labels