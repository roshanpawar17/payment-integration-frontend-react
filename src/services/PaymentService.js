import { myAxios } from "./Helper";

export function getAmount(amount){
    return myAxios.post("/getamount",amount)
}