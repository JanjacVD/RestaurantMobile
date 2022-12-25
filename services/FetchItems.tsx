import axios from "axios";
import {getBaseUrl} from "../lib/LocalStore";
const HEADERS = {
  Accept: "application/json",
  "Content-type": "application/json",
};
export async function getRequest(prefix: string, params?: object) {
  const baseUrl = await getBaseUrl();
  const result = axios.get(baseUrl + prefix, {
    headers: HEADERS,
    params: params,
  });
  return result;
}
export async function postRequest({prefix, params}: PostRequestProps) {
  const baseUrl = await getBaseUrl();
  const result = axios.post(baseUrl + prefix,null ,{
    headers: HEADERS,
    params: params,
  });
  return result;
}
export async function putRequest({prefix, params}: PostRequestProps) {
  const baseUrl = await getBaseUrl();
  const result = axios.put(baseUrl + prefix, params, {
    headers: HEADERS
  });
  return result;
}
export async function deleteRequest({prefix, params}: PostRequestProps) {
  const baseUrl = await getBaseUrl();
  const result = axios.delete(baseUrl + prefix, {
    headers: HEADERS,
    params:params
  })
  return result;
}
interface PostRequestProps {
  prefix: string;
  params?: object;
}
