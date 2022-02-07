export type INewsTable = {
    date: string,
    sentiment: string,
    title: string,
    content: string,
    url: string,
    id: string,
    parent_classification: string,
    child_classification: string,
    publication: string,
}


export type ICategoryTable = {
    category: string,
    iptc_code: string,
    sub_categories: ISubCategory,
}

interface ISubCategory {
    iptc_code: string,
    category: string
}


export type ISourceTable = {
    id: number,
    name: string,
    domain: string
}