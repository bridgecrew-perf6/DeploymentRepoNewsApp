import React, { useState, useEffect } from 'react'
import NewsInfo from './NewsInfo'
// import IndiNews from './Individualnews.json'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import { useHistory } from 'react-router-dom'
import { fetch_news_data ,fetch_category,fetch_source } from '../store/actions'
import { useAppDispatch ,useAppSelector} from '../../store/hooks'
import Modal from '../Modals/Modal'
const Index = () => {

    let history = useHistory()
    const dispatch = useAppDispatch()
    const NewsData = useAppSelector((state) => state.news)
    const {AllNews} = NewsData

    const [search, setSearch] = useState<string>('Iphone')
    const [startdate,setStartdate] = useState<string>('')
    const [enddate,setEnddate] = useState<string>('')
    const [activenews, setActivenews] = useState<any>()
    const [newsfull,setNewsfull] = useState<any>()
    const [openModal,setOpenModal] = useState<boolean>(false)
    const [categorySearch,setCategorySearch] = useState([])
    const [subcategorySearch,setSubcategorySearch] = useState([])
    const [sourceSearch,setSourceSearch] = useState([])
    const [sentiment,setSentiment] = useState('')
    let categoryfinal = categorySearch.concat(subcategorySearch)

    console.log('categorySearch  Subcategorysearch final:',categorySearch,subcategorySearch,categoryfinal)
    const Indinews = (newsfullid : any)=>{
        AllNews?.map((item)=>{
            if(newsfullid === item?.id){
            return(setNewsfull(item))
            }
            else {
                return('hello')
            }
            
        })
    }
    console.log('start date ==>',startdate)
    console.log('the is source search',sourceSearch);
    let sourceid = sourceSearch.reduce((acc : any,item : any) =>  `${acc}${item.id},`,"")
    sourceid=sourceid.substring(0, sourceid.length - 1);
    console.log("b",sourceid)
    let categoryid = categorySearch.reduce((acc : any,item : any) =>  `${acc}${item},`,"")
    categoryid=categoryid.substring(0, categoryid.length - 1);
    console.log("b",categoryid)
    useEffect(() =>{
        
        fetch_news_data(history, dispatch,search,sentiment,startdate,enddate,sourceid,categoryid)
        fetch_category(history,dispatch)
        fetch_source(history, dispatch)
    },[dispatch,search,history,startdate,enddate,sourceid,categoryid,sentiment]
    )
    return (
        <div style={{position: 'relative'}}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Topbar setOpenModal={setOpenModal} search={search} setSearch={setSearch} />
            <div style={{ display: 'flex' }}>
                <Sidebar Indinews={Indinews} setStartdate={setStartdate} setEnddate={setEnddate} activenews={activenews} setActivenews={setActivenews}/>
                <NewsInfo title={newsfull?.title} content={newsfull?.content} publication={newsfull?.publication} date={newsfull?.date} url={newsfull?.url} />
            </div>
        </div>
        {
            openModal && 
            <div style={{position : 'absolute',top : 0 ,left : 0 ,display : 'flex',alignItems : 'center',justifyContent : 'center',height : '100vh' , width : '100vw',backgroundColor : 'rgba(0,0,0,0.6)'}}>
                    <Modal setSentiment={setSentiment} setSubcategorySearch={setSubcategorySearch} setSourceSearch={setSourceSearch} setCategorySearch={setCategorySearch}setOpenModal={setOpenModal}/>
            </div>
        }
        </div>
    )
}

export default Index
