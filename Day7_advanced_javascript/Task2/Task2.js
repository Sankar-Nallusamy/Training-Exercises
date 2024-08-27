
async function handlesubmit(){
    const city=document.getElementById("city-name").value;
    try
    {
        let data=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ec86243f0dc002d794268935c21c9df6`,{"method":"GET","headers":{}});
    if(data.status!==200)
        throw "error in fetching data"
    document.getElementById("error-msg").style.display="none"
    data=await data.json();
    const name=document.getElementById("city");
    const temp=document.getElementById("temperature");
    const humidity=document.getElementById("humidity");
    const icon=document.getElementById("icon");
    name.innerHTML=data.name
    temp.innerHTML=`${(data.main.temp-273).toFixed(2)}°C`
    humidity.innerHTML=data.main.humidity
    icon.src=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    }
    catch
    {
        document.getElementById("error-msg").style.display="block"
    }
}