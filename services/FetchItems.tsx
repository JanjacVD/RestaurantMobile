import axios from "axios";
import {getBaseUrl} from "../lib/LocalStore";

export async function getRequest(prefix: string, params? : object) {
  const baseUrl = await getBaseUrl();
  const result = axios.get(baseUrl + prefix, {
    headers: {
      Accept: "application/json",
    },
    params: params,
  });
  return result;
}
export async function postRequest({prefix, params} : PostRequestProps) {
  const baseUrl = await getBaseUrl();
  const result = axios.post(baseUrl + prefix, {
    headers: {
      Accept: "application/json",
    },
    params: {
      id:1,
      order:2
    }
  });
  return result;
}
export async function putRequest({prefix, params} : PostRequestProps) {
  const baseUrl = await getBaseUrl();
  const result = axios.put(baseUrl + prefix,params ,{
    headers: {
      Accept: "application/json",
    },
  });
  return result;
}
interface PostRequestProps{
  prefix: string;
  params?: object;
}