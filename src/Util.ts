export const Util = {
    indent(text: string): string {
        return text.split("\n").map( t => "    " + t ).join("\n")
    },
    randString(length: number): string {
        var charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        var result = ""
        for (var i = 0;i < length;i++) {
            result += charSet.charAt(Math.floor(Math.random() * charSet.length))
        }
        return result
    }
}