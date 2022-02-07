import React from 'react'
// import data from './datas.json'
import dayjs from 'dayjs'
// import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import {useAppSelector} from '../../store/hooks'
interface SidebarTypes { 
    activenews : any;
    setActivenews : any;
    Indinews : any;
    setStartdate : any;
    setEnddate : any;
}
const Sidebar: React.FC<SidebarTypes>= ({activenews,setActivenews,Indinews,setStartdate,setEnddate}) => {
   
    const NewsData = useAppSelector((state) => state.news)
    const {AllNews} = NewsData
    return (
        <div style={{ minWidth: '350px', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1%', borderRight: '1px solid #e8e8f0'}}>
            <div style={{ display: 'flex', gap: '30px',marginTop: '10%'}}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{color: '#737477', fontSize: '0.87rem'}}>Date From</span>
                    <input onChange={(e)=>setStartdate(e.target.value)} type="date" style={{ height: '3vh', borderRadius: '5px', border: '1px solid #737477' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{color: '#737477', fontSize: '0.87rem'}}>Date To</span>
                    <input type="date" onChange={(e)=>setEnddate(e.target.value)} style={{ height: '3vh', borderRadius: '5px', border: '1px solid #737477' }} />
                </div>
            </div>

            {/* <DateRangePicker
        ranges={[selectionRange]}
        // onChange={handleSelect}
      /> */}
            <div style={{ marginTop: '10%',height: '79vh',overflow :'scroll' }}>
                {
                    AllNews?.map((item, k) => {
                        return (
                            <div key={k} onClick={() => {setActivenews(k);Indinews(item.id)}} style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid #e8e8f0', padding: '2%' }}>
                                <span style={{ color: '#737477', fontSize: '1.05rem' }}>{dayjs(item.date).format('MMMM DD , YYYY')}</span>
                                <span style={{ marginTop: '2%' }} className={activenews === k ? "news_title_active" : "news_title"}>{item.title}</span>
                                <div style={{ display: 'flex', marginTop: '2%', gap: '5px', alignItems: 'center' }}>
                                    <div style={{ backgroundColor: item.sentiment === 'Neutral' ? 'grey' : item.sentiment === 'Positive' ? 'green' : 'red', width: '20px', height: '20px', borderRadius: '50%' }}></div>
                                    <span style={{ color: '#737477' }}>{item.publication}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar
