import React from 'react'
interface TopbarTypes {
    search : string;
    setOpenModal : any;
    setSearch : any;
}
const Topbar : React.FC<TopbarTypes> = ({search,setSearch,setOpenModal}) => {
    return (
        <div style={{ display: 'flex', width: '98vw', backgroundColor: 'white', height: '3vh', gap: '20%', alignItems: 'center', padding: '1.2%', borderBottom: '1px solid #dbd1d1' }}>
            <span style={{ color: '#344CB7', fontSize: '1.5rem', fontWeight: 'bold' }}>News<span style={{ color: '#8b8a8a', fontSize: '1.5rem', fontWeight: 'bold' }}>Reader</span></span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                <div style={{ width: '300px', height: '3vh', border: '1px solid #8b8a8a',display: 'flex',alignItems: 'center',borderRadius :'5px'}}>
                    <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}style={{ width: '90%', height: '2.1vh', borderRadius: '5px',border : 'none',outline: 'none' }} />
                    <svg style={{cursor: 'pointer'}}width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 10L12 15L17 10H7Z" fill="#323232" />
                    </svg>
                </div>
                <button onClick={()=>setOpenModal(true)}className="button_adv_search">Advanced Search</button>
            </div>
        </div>
    )
}

export default Topbar
