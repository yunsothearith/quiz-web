export interface List {
    data: Item[],
    pagination: {
        currentPage: number,
        perPage: number,
        totalPages: number,
        totalItems: number
    }

}

export interface Item {
    id: number;
    name: string,
}

export interface ReqItem {
    name: string,
}

export interface CreateItem extends ReqItem {
    name : string,
}

export interface UpdateItem extends ReqItem {
    name : string,
}

