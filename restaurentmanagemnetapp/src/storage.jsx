const KEY="evalData";
const DEFAULT_IMAGE="https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg";
export function ensureInit(){
    if (!localStorage.getItem(KEY)){
        localStorage.setItem(KEY,JSON.stringify([]));
    }
}
export function getRestaurants(){
    ensureInit();
    const data=JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(data)?data:[];
}
export function setRestaurants(arr){
    localStorage.setItem(KEY,JSON.stringify(arr));
}
export function autoId(){
    const list =getRestaurants();
    const maxId=list.reduce(
        (m,r)=>(r.restaurantID>m?r.restaurantID:m),0
    );
    return maxId+1;
}
export function defaultImageUrl(){
    return DEFAULT_IMAGE;
}