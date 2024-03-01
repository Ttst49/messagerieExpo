import {UserFull} from "@/app/Interface/UserFull";

export interface Request{
    id:number
    recipient:UserFull
    sender:UserFull
}
