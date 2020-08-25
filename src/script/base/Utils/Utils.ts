export default class Utils {
    constructor() { }

    
    public static objToParams(obj: any): string {
        if (obj == null) return ''
        let arr = []
        for (var key in obj) {
            arr.push(key + '=' + obj[key]);
        }
        let str = arr.join('&');
        arr = null;
        return str
    }

}