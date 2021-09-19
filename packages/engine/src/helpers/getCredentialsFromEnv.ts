export default function () {
    const USERNAME = process.env["USERNAME"]!;
    const PASSWORD = process.env["PASSWORD"]!;
    const SLEEP = process.env["SLEEP"]!;

    return {
        username: USERNAME,
        password: PASSWORD,
        sleep: SLEEP
    }
}
