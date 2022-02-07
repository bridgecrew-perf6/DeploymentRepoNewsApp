import React from 'react'
import './style.css'
import DOMPurify from 'dompurify'
// import Favicon from 'react-favicon'
import dayjs from 'dayjs'
interface NewsInfoTypes  {
    title : string;
    content : string;
    publication : string;
    date : string;
    url : string;
}

const NewsInfo : React.FC<NewsInfoTypes>= ({title,content,publication,date,url}) => {
    
    
    return (
        <div style={{padding : '5% 10% 0% 10% '}}>
            <div>
                <span className="News_title_head">{title}</span>
            </div>
            <div style={{display : 'flex',alignItems : 'center',justifyContent : 'space-between'}}>
                <div>
                    {/* <Favicon url={url}/> */}
                    <span style={{fontSize : '1.05rem',color: '#4a6ac5'}}>{publication}</span>
                </div>
                <div>
                    <span style={{fontSize : '1.05rem',color : '#737477'}}>{dayjs(date).format('MMMM DD , YYYY')}</span>
                </div>
            </div>
            <div  style={{marginTop: '5%',lineHeight: '30px',height : '70vh',overflow : 'scroll',overflowX: 'hidden',paddingRight :'40px'}}dangerouslySetInnerHTML={{__html : DOMPurify.sanitize(content)}}/>
        </div>
    )
}

export default NewsInfo
