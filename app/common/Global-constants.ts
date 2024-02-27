import {User} from "@/app/Interface/User";

export class GlobalConstants{
    public static baseUrl = "https://slackbis.thibautstachnick.com/api/"
    public static token = ""
    public static actualUser: User

    public static isLoggedIn(){
        return GlobalConstants.token != "";
    }
}
