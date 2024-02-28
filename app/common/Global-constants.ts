import {User} from "@/app/Interface/User";

export class GlobalConstants{
    public static baseUrl = "https://slackbis.thibautstachnick.com/api/"
    //replace later with secureStore
    public static token = ""
    public static actualUser: User

    public static isLoggedIn(){
        return GlobalConstants.token != "";
    }
}
