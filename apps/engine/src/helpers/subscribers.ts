import PubSub from "pubsub-js";
import messages from "../common/messages";

const resetLogin = async (ig: any) => {
    PubSub.subscribe('LOGOUT', async () => {
        await ig.account.logout();
        messages.loggedOut();
    })
}

const stopServer = async () => {
    PubSub.subscribe('STOP_SERVER', async () => {
        messages.graceExit()
        process.exit(1);
    })
}

export default function(ig: any){
    //Start Subscribing
    resetLogin(ig);
    stopServer();
}