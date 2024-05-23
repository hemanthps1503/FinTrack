import {configureStore} from '@reduxjs/toolkit'
import { expenseslice } from './reducer'
import apislice from './apislice.js'

export const store =configureStore({
    reducer:{
        expense:expenseslice,
        [apislice.reducerPath]:apislice.reducer
    },
    middleware:getdefaultmiddleware=>getdefaultmiddleware().concat(apislice.middleware)
})