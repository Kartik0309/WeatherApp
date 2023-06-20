const key="a8f98cef521a9f556e8ebd4c45334e2e";
const yourWeather=document.querySelector("[data-userWeather]");
const searchWeather=document.querySelector('[data-searchWeather]')
let tab=1;
handleTab();

var form = document.querySelector("[data-searchForm]");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

function handleTab()
{
    if(tab===1)
    {
        document.querySelector('[data-searchForm]').classList.remove("active");
        document.querySelector('.grant-location-container').classList.add("active");
        searchWeather.classList.remove("current-tab");
        yourWeather.classList.add("current-tab");
    }
    if(tab===2)
    {
        document.querySelector('[data-searchForm]').classList.add("active");
        document.querySelector('.grant-location-container').classList.remove("active");
        searchWeather.classList.add("current-tab");
        yourWeather.classList.remove("current-tab");
    }
}
async function getWeather(long,lat)
{
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`);
    const res=await response.json();
    // console.log(res);
    document.querySelector("[data-cityName]").textContent=res.name;
    document.querySelector("[data-weatherDesc]").textContent=res.weather[0].main;
    document.querySelector("[data-temp]").textContent=`${res.main.temp} °C`;
    document.querySelector("[data-windspeed]").textContent=`${res.wind.speed} m/s`
    document.querySelector("[data-humidity]").textContent=`${res.main.humidity} %`;
    document.querySelector("[data-cloudiness]").textContent=`${res.clouds.all} %`;
    document.querySelector("[data-weatherIcon]").setAttribute('src',`http://openweathermap.org/img/w/${res.weather[0].icon}.png`);
    document.querySelector("[data-countryIcon]").setAttribute('src',`https://flagcdn.com/144x108/${res.sys.country.toLowerCase()}.png`);
    document.querySelector('.loading-container').classList.remove("active");   
    document.querySelector('.user-info-container').classList.add("active");
}

async function getWeatherCity(city)
{
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
    const res=await response.json();
    // console.log(res);
    document.querySelector("[data-cityName]").textContent=res.name;
    document.querySelector("[data-weatherDesc]").textContent=res.weather[0].main;
    document.querySelector("[data-temp]").textContent=`${res.main.temp} °C`;
    document.querySelector("[data-windspeed]").textContent=`${res.wind.speed} m/s`
    document.querySelector("[data-humidity]").textContent=`${res.main.humidity} %`;
    document.querySelector("[data-cloudiness]").textContent=`${res.clouds.all} %`;
    document.querySelector("[data-weatherIcon]").setAttribute('src',`http://openweathermap.org/img/w/${res.weather[0].icon}.png`);
    document.querySelector("[data-countryIcon]").setAttribute('src',`https://flagcdn.com/144x108/${res.sys.country.toLowerCase()}.png`);
    document.querySelector('.loading-container').classList.remove("active");   
    document.querySelector('.user-info-container').classList.add("active");
}




function getLocation() {
    const position = navigator.geolocation.getCurrentPosition(showPosition);    
}

function showPosition(position) {
    const lat= position.coords.latitude;
    const lon=position.coords.longitude;
    getWeather(lon,lat);
  }


yourWeather.addEventListener('click',()=>{
    if(!(tab===1))
    {
        tab=1;
        document.querySelector('.user-info-container').classList.remove("active");
        handleTab();
    }
})

searchWeather.addEventListener('click',()=>{
    if(!(tab===2))
    {
        tab=2;
        document.querySelector('.user-info-container').classList.remove("active");
        handleTab();
    }
})

const btnFindLoc=document.querySelector('[find]');
btnFindLoc.addEventListener('click',()=>{
    const ip=document.querySelector('[data-searchInput]');
    // document.querySelector('[data-searchForm]').classList.remove("active");
    document.querySelector('.loading-container').classList.add("active");
    console.log(ip.value);
    getWeatherCity(ip.value);

})

const btnGrantAccess=document.querySelector("[data-grantAccess]");
btnGrantAccess.addEventListener('click',()=>{
    document.querySelector('.grant-location-container').classList.remove("active");
    document.querySelector('.loading-container').classList.add("active");
    getLocation();
})