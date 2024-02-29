import {UserFull} from "@/app/Interface/UserFull";
import {PrivateMessage} from "@/app/Interface/PrivateMessage";

export interface PrivateConversation{
    id:number
    privateMessages: PrivateMessage[]
    relatedToProfileA: UserFull
    relatedToProfileB: UserFull
}
