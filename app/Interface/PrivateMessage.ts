import {UserFull} from "@/app/Interface/UserFull";
import {PrivateConversation} from "@/app/Interface/PrivateConversation";
import {PrivateMessageResponse} from "@/app/Interface/PrivateMessageResponse";

export interface PrivateMessage{
    id:number
    author: UserFull
    content:string
    privateConversation: PrivateConversation
    date:string
    privateMessageResponses: PrivateMessageResponse[]
}
