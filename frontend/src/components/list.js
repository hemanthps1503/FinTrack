import React from 'react'
import  'boxicons';
import {default as api} from '../store/apislice.js'


const list = () => {
    const {data,isFetching,isSuccess,isError}=api.useGetlabelsQuery();
    const [deletetransaction]=api.useDeletetransactionMutation();
    let transactions;

    const handlerclick= async (e)=>{
        const id = e.target.dataset.id;
        if (!id) return;
        try {
            await deletetransaction({ _id: id });
        } catch (error) {
            console.error('Failed to delete transaction:', error);
        }
    };
    if(isFetching){
        transactions=<div>Fetching</div>

    }else if(isSuccess){
        transactions=data.map((v,i)=><Transaction key={i} category={v} handler={handlerclick}></Transaction>)

    }else if(isError){

        transactions=<div>Error</div>
    }
  




  return (
    <div className='flex flex-col py-6 gap-3'>
        <h1 className='py-4 font-bold text-xl'>History</h1>
       {transactions}
        
    </div>
  )
}

function Transaction({category,handler}){
    if(!category)return null;
    return( 
        <div className='item flex justify-center bg-gray-50 py-2 rounded-r' style={{borderRight:`8px solid ${category.color ?? "#e5e5e5"}`}}>
            <button className='px-3' onClick={handler}><box-icon data-id={category._id ??''}  color={category.color ?? "#e5e5e5"}size="15"  name="trash"></box-icon></button>
            <span className='block w-full'>{category.name??''}</span>
        </div>
    )
}

export default list