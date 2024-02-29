import {UserFull} from "@/app/Interface/UserFull";
import {PrivateMessage} from "@/app/Interface/PrivateMessage";

export interface PrivateMessageResponse{
    id: number
    content:string
    author: UserFull
    date:string
    relatedToPrivateMessage: PrivateMessage
}
