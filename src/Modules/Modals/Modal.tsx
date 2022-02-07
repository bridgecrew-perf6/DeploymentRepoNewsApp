import React, { useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { useAppDispatch } from '../../store/hooks'
import { fetch_news_data} from '../store/actions'
import { useHistory } from 'react-router-dom'

interface Modaltype {
    setOpenModal: any,
    setCategorySearch: any,
    setSubcategorySearch: any,
    setSourceSearch: any,
    setSentiment: any,
}
const Modal: React.FC<Modaltype> = ({ setOpenModal, setCategorySearch, setSubcategorySearch, setSourceSearch, setSentiment }) => {
    const dispatch = useAppDispatch()
    let history = useHistory()

    const [helper, setHelper] = useState<boolean>(false)
    const [result, setResult] = useState<any>()
    const [sourceresult, setSourceResult] = useState<any>()
    const NewsData = useAppSelector((state) => state.news)
    const { AllCategory, AllSource } = NewsData
    const [selectThing, setSelectThing] = useState('Category')
    // const [listthing,setListthing] = useState<any>([])
    const [CategoryFilterArray, setCategoryFilterArray] = useState<any>([])
    const [SubCategoryFilterArray, setSubCategoryFilterArray] = useState<any>([])
    const [SourceFilterArray, setSourceFilterArray] = useState<any>([])
    const delete_category_fx = (id: any) => {
        setCategoryFilterArray(CategoryFilterArray.splice(id, 1))
    }
    const delete_source_fx = (id: any) => {
        setSourceFilterArray(SourceFilterArray.splice(id, 1))
    }
    const AddCategory = (key: any) => {
        result.forEach((item: any, id: any) => {
            if (id === key) {
                setCategoryFilterArray((prev: any) => [...prev, item])
                setCategorySearch((prev: any) => [...prev, item.iptc_code])
            }
        })
    }
    const AddSubCategory = (key: any) => {
        console.log('Result', result)
        result?.sub_categories.forEach((item: any, id: any) => {
            if (id === key) {
                setSubCategoryFilterArray((prev: any) => [...prev, item])
            }
        })
    }

    const AddSource = (key: any) => {
        console.log('Source Result', sourceresult)
        sourceresult.forEach((item: any, id: any) => {
            if (id === key) {
                setSourceFilterArray((prev: any) => [...prev, item])
                setSourceSearch((prev: any) => [...prev, item])
            }
        })
    }
    const Search = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHelper(true)

        if (selectThing === 'Category') {
            setResult(AllCategory?.filter(item => item.category.includes(e.target.value)))

            // for(let i = 0; i < result?.length; i++){
            //     console.log(i)
            //     if(result[i]=== true){
            //         console.log('truesh')
            //         setListthing(AllCategory[i].category)
            //     }
            // }
        }
        if (selectThing === 'Source') {
            setSourceResult(AllSource?.filter(item => item.name.includes(e.target.value)))
        }

    }
    console.log("listings", result, helper, selectThing)
    return (
        <div style={{ backgroundColor: 'white', width: '650px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2%', borderRadius: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Advanced Search</span>
                <svg onClick={() => setOpenModal(false)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#323232" />
                </svg>
            </div>
            {/* <div>
                <button style={{ marginTop: '5%' }} className="button_adv_search">Add New Filter</button>
            </div> */}
            <div className="select_container" style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: '5%', alignItems: 'center' }}>
                <select onChange={(e) => setSelectThing(e.target.value)} id="">
                    <option value="Category">Category</option>
                    <option value="Sentiment">Sentiment</option>
                    <option value="Source">Source</option>
                </select>
                <span>Is</span>
                {
                    selectThing === "Category" ?
                        <div style={{ position: 'relative' }}>
                            <input className="select_container" type="text" onChange={Search} />
                            {
                                helper &&

                                <div style={{ backgroundColor: 'white', position: 'absolute', boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px`, height: '200px', overflow: 'scroll', padding: '8%', borderRadius: '5px', width: '200px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', width: '100%' }}>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Search Item</span>
                                        <svg onClick={() => setHelper(false)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#323232" />
                                        </svg>
                                    </div>

                                    {
                                        result?.map((item: any, k: any) => {
                                            console.log("these are the cateogries", item);
                                            return (
                                                <div className="item_selection" style={{ display: 'flex', flexDirection: 'column' }} onClick={() => AddCategory(k)} key={k}>
                                                    <span>{item.category}</span>
                                                    {item.sub_categories.length > 0 &&
                                                        item.sub_categories.map((item: any, key: any) => {
                                                            return (
                                                                <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                                                    <span onClick={() => { AddSubCategory(key) }} style={{ marginLeft: '15%' }}>{item.category}</span>
                                                                </div>

                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                        :
                        selectThing === 'Sentiment' ?
                            <div className="select_container">
                                <select onChange={(e) => setSentiment(e.target.value)} name="" id="">
                                    <option value="Postive">Postive</option>
                                    <option value="Neutral">Neutral</option>
                                    <option value="Negative">Negative</option>
                                </select>
                            </div>
                            :
                            <div>
                                <input className="select_container" type="text" onChange={Search} />
                                {
                                    helper &&

                                    <div style={{ backgroundColor: 'white', position: 'absolute', boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px`, height: '200px', overflow: 'scroll', padding: '1%', borderRadius: '5px', width: '200px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', width: '100%' }}>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Search Item</span>
                                            <svg onClick={() => setHelper(false)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#323232" />
                                            </svg>
                                        </div>

                                        {
                                            sourceresult?.map((item: any, k: any) => {
                                                console.log("these are the cateogries", item);
                                                return (
                                                    <div className="item_selection" style={{ display: 'flex', flexDirection: 'column' }} onClick={() => AddSource(k)} key={k}>
                                                        <span>{item.name}</span>

                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </div>


                }

            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: 'white', border: '1px solid #e0e0e0', borderRadius: '5px', marginTop: '5%', padding: '2%', width: '95%', height: '10vh', alignItems: 'flex-start', overflow: 'scroll' }}>

                {
                    CategoryFilterArray?.map((item: any, key: any) => {
                        return (
                            <div style={{ backgroundColor: '#344CB7', margin: '1%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2%', borderRadius: '10px', maxWidth: '200px' }} >
                                {item.category}
                                <svg onClick={delete_category_fx} width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white" />
                                </svg>
                            </div>
                        )
                    })
                }
                {
                    SubCategoryFilterArray?.map((item: any, key: any) => {
                        return (
                            <div>
                                {item.category}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white" />
                                </svg>
                            </div>
                        )
                    })
                }
                {
                    SourceFilterArray?.map((item: any, key: any) => {
                        return (
                            <div style={{ backgroundColor: '#344CB7', margin: '1%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2%', borderRadius: '10px', maxWidth: '200px' }}>
                                {item.name}
                                <svg onClick={delete_source_fx} width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white" />
                                </svg>
                            </div>
                        )
                    })
                }
            </div>
            <div style={{ display: 'flex',justifyContent: 'space-around',width :'100%',marginTop: '5%'}}>
                <button className='button_adv_search' onClick={() => setOpenModal(false)} >Submit</button>
                {/* Outside Blah! */}
                <button className='button_adv_search' onClick={() => {fetch_news_data(history, dispatch,'iphone');setOpenModal(false)}}>Clear Filters</button>
            </div>

        </div>
    )
}

export default Modal
