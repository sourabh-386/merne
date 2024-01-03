import { configureStore } from '@reduxjs/toolkit'

//reducers
import { EmpPageSlice } from '../REDUCER/Emp_reducer'
import { LoginPageSlice } from '../REDUCER/Login_reducer'
import { OtherSlice } from '../REDUCER/Other_reducer'
import { ApiRes } from '../REDUCER/Api_response_reducer'

import { setupListeners } from '@reduxjs/toolkit/query'

//api
import { api } from '../Api/LoginPageApi'
import { dataApi } from '../Api/Sending_data_api'
import { jobApi } from '../Api/JobDataApi'

//redux persist
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session';

import { combineReducers } from '@reduxjs/toolkit'


const persistConfig = {
    key: 'root',
    storage: storageSession,
}


const reducer = combineReducers({
    Reducer1: EmpPageSlice.reducer,
    Reducer2: LoginPageSlice.reducer,
    Reducer3: OtherSlice.reducer,
    Reducer4: ApiRes.reducer,
    [api.reducerPath]: api.reducer,
    [dataApi.reducerPath]: dataApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,

});

const persistedReducer = persistReducer(persistConfig, reducer)

export const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware, dataApi.middleware,jobApi.middleware)

})

export const persistor = persistStore(Store)

setupListeners(Store.dispatch)