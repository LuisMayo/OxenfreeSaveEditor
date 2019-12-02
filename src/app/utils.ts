export class Utils {
    static isJSObject(obj: unknown) {
        return typeof obj === 'object' && !Array.isArray(obj);
    }
}
