const main = document.getElementById('main');
const addUserBtn = document.getElementById('add_user');
const doubleBtn = document.getElementById('double');
const showMillioneBtn = document.getElementById('show-millioners');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

getRandomUser()
getRandomUser()
getRandomUser()
getRandomUser()

let data = [];

//fetch random user and add money
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api/')
    const data = await res.json();

    const user = data.results[0];
    const newUser={
        name:`${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random()* 100000),
    };
    addData(newUser);
}

//add new obj to data arr
function addData(obj){
    data.push(obj);
    updateDom();

}

//filter only millioners
function showMillioners(){
    data = data.filter((user)=>
        user.money > 1000000
    )
    updateDom();
}

//function to doublem monye
function doubleMoney(){
    data = data.map((user)=>{
        return {...user, money: user.money * 2};
    })
    updateDom();
}
//sort by richest
function sortByRichest(){
    data.sort((a, b)=>b.money-a.money)
    updateDom();
}
//calculate wealth
function calculateWealth(){
    const wealth = data.reduce((acc, user)=>(acc+=user.money), 0);
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML  = `<h3> Total wealth is : <strong>${formatMoney(wealth)}</strong></h3>`

    main.appendChild(wealthElement);
}
function updateDom(providedData = data ){
    //clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element);
    });
} 
//format number as Money
function formatMoney(number){
    return '$'+ number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//add eventListener
addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillioneBtn.addEventListener('click', showMillioners);
sortBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calculateWealth);
