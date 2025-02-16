import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from './Features/authSlice'
import adminReducer from './Features/adminSlice'
import userReducer from './Features/userSlice'
import itemReducer from './Features/itemSlice'
import { logOutuser } from './Features/authSlice';


const persistConfig={
    key:'root',
    storage:storage,
   
}

const combinedReducers=combineReducers({
    auth:authReducer,
    admin:adminReducer,
    user:userReducer,
    item:itemReducer
}
)

const rootReducers=(state,action)=>{
    if(action.type== logOutuser.type){
        state=undefined
    }
    return combinedReducers(state,action)

}




const persistedReducers=persistReducer(persistConfig,rootReducers)



export const store= configureStore({
        reducer:persistedReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    
})

export const persistor=persistStore(store)
