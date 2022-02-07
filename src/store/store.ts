
   
import { configureStore } from '@reduxjs/toolkit';
// import permissionsSlice from '../Components/modules/login/store/slice';
import NewsSlice from '../Modules/store/slice'


export const store = configureStore({
	reducer: {
		news: NewsSlice,
		
	},
	devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
