export const Util = {
    indent(text: string): string{
        return text.split("\n").map( t => "    " + t ).join("\n");
    }
}