const argv = require("minimist")(process.argv.slice(2));
import messages from "../common/messages";
import api from "../modules/api";
import dashboard from "../modules/dashboard";
import subscribers from "./subscribers";

export default function (ig: any){
  //DASHBOARD
  if (
    argv["dashboard"] && 
    argv["dashboard"] === "true" || 
    process.env.DASHBOARD_ENABLED === 'true') {
    dashboard();
    subscribers(ig);
  } else {
    messages.noDashboard()
  }

  //API
  if (
    argv["api"] &&
    argv["dashboard"] === "true" ||
    process.env.API_ENABLED === "true"
  ) {
    api();
    subscribers(ig);
  } else {
    messages.noApi()
  }
}
