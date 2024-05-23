import React from 'react'
import {Doughnut} from 'react-chartjs-2'
import {Chart,ArcElement} from 'chart.js'
import Labels from './labels';
import {chart_Data,gettotal} from '../helper/helper.js'
import {default as api} from '../store/apislice.js'


Chart.register(ArcElement);

  

const graph = () => {
  const {data,isFetching,isSuccess,isError}=api.useGetlabelsQuery();
    let graphdata;
    
    
 


    if(isFetching){
      graphdata=<div>Fetching</div>

    }else if(isSuccess){
      chart_Data(data);
      graphdata= <Doughnut {...chart_Data(data)}>

      </Doughnut>
        

    }else if(isError){

      graphdata=<div>Error</div>
    }

  return (
    <div className='flex justify-content max-w-xs mx-auto'>
        <div className='item'>
        <div className='chart relative'>
        {graphdata}
        <h3 className='mb-4 font-bold title'> Total
        <span className='block text-3xl text-emerald-400'>${gettotal(data)??0}</span></h3>
    </div>
    <div className='flex flex-col py-10 gap-4'>
        <Labels></Labels>

    </div>
    </div>
    </div>
    
  )
}

export default graph