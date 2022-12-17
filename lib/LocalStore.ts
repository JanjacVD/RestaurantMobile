import AsyncStorage from "@react-native-async-storage/async-storage";
export function setBaseUrl(url: string){
    AsyncStorage.setItem('base-url', url).catch(e => console.log(e))
}
export async function getBaseUrl():Promise<string>{
    return 'https://4907-188-129-99-200.eu.ngrok.io/api/v1'
    const baseUrl = await AsyncStorage.getItem('base-url').catch(e => console.log(e))
    return baseUrl || 'http://127.0.0.1:8000/'
}