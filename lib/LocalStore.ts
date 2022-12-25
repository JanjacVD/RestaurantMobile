import AsyncStorage from "@react-native-async-storage/async-storage";
export function setBaseUrl(url: string){
    AsyncStorage.setItem('base-url', url).catch(e => console.log(e))
}
export async function getBaseUrl():Promise<string>{
    return 'http://192.168.1.10:8000/api/v1'
    const baseUrl = await AsyncStorage.getItem('base-url').catch(e => console.log(e))
    return baseUrl || 'http://127.0.0.1:8000/'
}