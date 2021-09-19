export default function():boolean {
    const undefinedOrNullOrEmpty = undefined || null || "";
    if(
        process.env.USERNAME !== (undefinedOrNullOrEmpty) &&
        process.env.PASSWORD !== (undefinedOrNullOrEmpty) &&
        process.env.SLEEP !== undefinedOrNullOrEmpty
    ) return true;
    return false;
}