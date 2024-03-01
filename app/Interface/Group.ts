import {UserFull} from "@/app/Interface/UserFull";
import {GroupMessage} from "@/app/Interface/GroupMessage";
import {User} from "@/app/Interface/User";

export interface Group{
    id:number
    name:string
    adminMembers: User[]
    groupMembers: UserFull[]
    groupMessages: GroupMessage[]
    owner: UserFull
}
