import Request from "../../store/request"
// import { History } from 'history'
import { GET_NEWS,CATEGORIES,SOURCES } from '../../store/endpoint'
import { update_news, update_news_loader, update_news_error , update_category ,update_category_loader,update_category_error,update_source,update_source_loader,update_source_error} from './slice'
// const API_SECRET_KEY = process.env.API_KEY
let API_SECRET_KEY = `IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`
export const fetch_news_data = (history: any, dispatch: any, search: string, sentiment? : string, startdate? : string, enddate? : string, sourceid? : any, categoryid? : any, loader = true) => {
    let api_url = `${GET_NEWS}?`
    // let new_url = `${api_url}&startdate=${startdate}&enddate=${enddate}&sentiment=${sentiment}&source_id=${sourceid}&categoryid=${categoryid}`
    // let url= new URL(new_url);
    // let params = new URLSearchParams(url.search);
    // console.log('params',params.get('source_id'));
console.log('categoryid',categoryid);
    // api_url =  `${api_url}/&startdate=${params.get('startdate') !== null && params.get('startdate')}&enddate=${params.get('enddate') !== null && params.get('enddate')}&source_id=${params.get('source_id') !== null && params.get('source_id')}&category_id=${params.get('category_id') !== null && params.get('category_id')}&sentiment=${params.get('sentiment') !== null && params.get('sentiment')}`
    // console.log(sourceid.forEach((item : any) => `${item},`))
    const params = new URLSearchParams();
    params.set('q',search)
        startdate && params.set("startdate",startdate);
    enddate && params.set("enddate",enddate);
    sentiment && params.set("sentiment",sentiment);
    sourceid && params.set("source_id",sourceid);
    categoryid && params.set("category_id",categoryid);

 api_url =`${api_url}${params.toString()}`
// uppvalue && a.set("upp", uppvalue)
    // api_url =`${api_url}${params.get('startdate') !== '' ? `&startdate=${params.get('startdate')}` : ''}${params.get('enddate') !== '' ? `&enddate=${params.get('enddate')}` : ''}${params.get('source_id') !== '' ? `&source_id=${params.get('source_id')}` : ''}${params.get('sentiment') !== '' ? `&sentiment=${params.get('sentiment')}` : ''}`
    // if (startdate) {
    //     api_url = `${api_url}&startdate=${startdate}`
    // }
    // if (enddate) {
    //     api_url = `${api_url}&enddate=${enddate}`
    // }
   
    // if (sentiment) {
    //     api_url = `${api_url}&sentiment=${sentiment}`
    // }
    // if (sourceid) {
    //     // for(let i = 0 ; i < sourceid.length ; i++) {
    //         api_url = `${api_url}&source_id=${sourceid.forEach((item : any) => `${item},`)}`
    //     // }
    // }
    // if (categoryid) {
    //     api_url = `${api_url}&category_id=${categoryid.forEach((item : any) => `${item},`)}`
    // }

    console.log('the final url',api_url);
    let final_url = `${api_url}&x-api-key=${API_SECRET_KEY}`
    dispatch(update_news({ loader: loader }))
    Request('get', final_url, '', history)?.then(res => {
        const { response, statusCode } = res
        console.log("this is the response", response)
        if (statusCode === 200) {
            dispatch(
                update_news(
                    {
                        arr_response: response.result.data
                    }
                )
            )
        }
        else {
            dispatch(update_news_loader({ loader: false }))
            dispatch(update_news_error({ error: 'Something Went Wrong' }))
        }
    })
}


export const fetch_category = (history: any, dispatch: any , loader = true) => {
    let api_url = `${CATEGORIES}`
    


    let final_url = `${api_url}?x-api-key=${API_SECRET_KEY}`
    dispatch(update_category({ loader: loader }))
    Request('get', final_url, '', history)?.then(res => {
        const { response, statusCode } = res
        console.log("this is the response", response)
        if (statusCode === 200) {
            dispatch(
                update_category(
                    {
                        arr_response: response
                    }
                )
            )
        }
        else {
            dispatch(update_category_loader({ loader: false }))
            dispatch(update_category_error({ error: 'Something Went Wrong' }))
        }
    })
}

export const fetch_source = (history: any, dispatch: any , loader = true)  =>{
    let api_url = `${SOURCES}`
    let final_url = `${api_url}?x-api-key=${API_SECRET_KEY}`
    dispatch(update_source({ loader: loader }))
    Request('get', final_url, '', history)?.then(res => {
        const { response, statusCode } = res
        console.log("this is the response", response)
        if (statusCode === 200) {
            dispatch(
                update_source(
                    {
                        arr_response: response.sources
                    }
                )
            )
        }
        else {
            dispatch(update_source_loader({ loader: false }))
            dispatch(update_source_error({ error: 'Something Went Wrong' }))
        }
    })

}