import {User} from "@/app/Interface/User";
import {Request} from "@/app/Interface/Request"

export interface UserFull{
    id:number
    lastName:string
    name:string
    relatedTo:User
    requests: Request[]
    visibility: boolean
}
