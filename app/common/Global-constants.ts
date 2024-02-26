export class GlobalConstants{
    public static baseUrl = "https://slackbis.thibautstachnick.com/api/"
    public static token = ""

    public static isLoggedIn(){
        return GlobalConstants.token != "";
    }
}
