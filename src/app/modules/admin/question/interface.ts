import { ImageCroppedEvent } from 'ngx-image-cropper';


export interface ResponseSetup {
    statusCode: number,
    data: DataSetup
}

export interface DataSetup {
    id : number,
    type_id : number,
    sex_id : number,
    code : string,
    image : string,
    sur_name : string,
    given_name : string,
    lattin_name : string,
    phone : string,
    email : string,
    facebook : string,
    telegram : string,
    pob : string,
    dob : string,
    address : string,
    contact_name : string,
    contact_phone : string,
    contact_email : string,
    contact_facebook : string,
    contact_telegram : string,
    contact_address : string,
    type : { id: number, name: string },
    sex  : { id: number, name: string },
}

export interface Create {
    sex_id : number,
    image : string,
    sure_name : string,
    given_name : string,
    lattin_name : string,
    phone : string,
    email : string,
    facebook : string,
    telegram : string,
    card_no: string;
    pob : string,
    dob : string,
    address : string,
    contact_name : string,
    contact_phone : string,
    contact_email : string,
    contact_facebook : string,
    contact_telegram : string,
    contact_address : string,
    // type : { id: number, name: string },
    // sex  : { id: number, name: string },
    // files: File[]
}


export interface List {
    data            : DataSetup[],
    pagination      : {
        current_page    : number,
        per_page        : number,
        total_items     : number,
        total_pages     : number
    }
}


export interface Quiz {
    id : number,
    sex_id : number,
    image : string,
    sur_name : string,
    given_name : string,
    lattin_name : string,
    phone : string,
    email : string,
    facebook : string,
    telegram : string,
    passport: string;
    card_no: string;
    pob : string,
    dob : string,
    address : string,
    contact_name : string,
    contact_phone : string,
    contact_email : string,
    contact_facebook : string,
    contact_telegram : string,
    contact_address : string,
    // type : { id: number, name: string },
    // sex  : { id: number, name: string },
}
