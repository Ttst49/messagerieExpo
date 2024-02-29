import {UserFull} from "@/app/Interface/UserFull";
import {GroupMessage} from "@/app/Interface/GroupMessage";

export interface GroupMessageResponse{
    id:number
    content:string
    author: UserFull
    date:string
    groupMessage: GroupMessage
}
