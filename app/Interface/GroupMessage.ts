import {UserFull} from "@/app/Interface/UserFull";

export interface GroupMessage{
    id:number
    date:string
    content:string
    author: UserFull
}
