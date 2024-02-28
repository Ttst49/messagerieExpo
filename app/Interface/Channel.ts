import {UserFull} from "@/app/Interface/UserFull";
import {ChannelMessages} from "@/app/Interface/ChannelMessages";

export interface Channel{
    adminChannelMembers: UserFull[]
    channelMembers: UserFull[]
    channelMessages: ChannelMessages[]
    createdAt: string
    id:number
    name:string
    owner: UserFull
}
