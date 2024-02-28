import {UserFull} from "@/app/Interface/UserFull";
import {GroupMessage} from "@/app/Interface/GroupMessage";

export interface Group{
    id:number
    name:string
    adminMembers: UserFull[]
    groupMembers: UserFull[]
    groupMessages: GroupMessage[]
    owner: UserFull
}
