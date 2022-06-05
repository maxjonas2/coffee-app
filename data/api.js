import data from './coffee-stores'; 

const urlMap = {'coffeeShops' : data}

export function getData(url){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(urlMap[url]);
        }, 1000);
    })
}