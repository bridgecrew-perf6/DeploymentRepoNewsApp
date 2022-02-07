import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store'
import { INewsTable, ICategoryTable,ISourceTable } from './news.interface';

export interface atValue {
	id: number;
	value: string;
}
const initialState = {
	IndividualNews: {} as INewsTable,

	AllNews: [] as INewsTable[],
	News_page: 1,
	News_loader: false,
	News_pagination: true,
	News_search: '',
	News_error: '',

    AllCategory : [] as ICategoryTable[],
    Category_loader : false,
    Category_error : '',

	AllSource : [] as ISourceTable[],
	Source_loader : false,
	Source_error : ''

	
};

export const NewsSlice = createSlice({
	name: 'News',
	initialState: initialState,
	reducers: {
		update_news: (state, action) => {
			const { arr_response, page_no, pagination } = action.payload;
			state.AllNews = arr_response;
			state.News_pagination = pagination;
			state.News_page = page_no;
			state.News_loader = false;
			state.News_error = '';
		},
		update_news_loader: (state, action) => {
			const { loader } = action.payload;
			state.News_loader = loader;
		},

		update_news_error: (state, action) => {
			const { error } = action.payload;
			state.News_error = error;
		},
        update_category : (state, action) => {
            const {arr_response} = action.payload;
            state.AllCategory = arr_response
        },
        update_category_loader : (state, action) => {
            const {loader} = action.payload;
            state.Category_loader = loader
        },
        update_category_error : (state, action) => {
            const {error} = action.payload;
            state.Category_error = error
        },
		update_source : (state, action) => {
            const {arr_response} = action.payload;
            state.AllSource = arr_response
        },
		update_source_loader : (state, action) => {
            const {loader} = action.payload;
            state.Source_loader = loader
        },
		update_source_error : (state, action) => {
            const {error} = action.payload;
            state.Source_error = error
        },
	},
});

export const {
	update_news,
	update_news_loader,
	update_news_error,
    update_category,
    update_category_loader,
    update_category_error,
	update_source,
	update_source_loader,
	update_source_error
} = NewsSlice.actions;
export const NewsData = (state: RootState) => state;
export default NewsSlice.reducer;