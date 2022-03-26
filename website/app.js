
const generate = document.querySelector("#generate");
const city = document.getElementById('#city');
const name = document.querySelector(".name")
const feelings = document.querySelector("#feelings");
const feeling = document.querySelector(".feelings");
const temp = document.querySelector("#temp");
const dateNow = document.querySelector("#dateNow");
const d = new Date();
const date = d.toDateString();
const example = "https://api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key}";
const baseURI = "https://api.openweathermap.org/data/2.5/weather?zip=";
const key = "&appid=3a4521251b064ec0e8998c6f984d498d&units=imperial";

generate.addEventListener("click", (event)=> {
  event.preventDefault();
  const madeURI = `${baseURI}${zip.value}${key}`;
  getData(madeURI)
  .then((data) => {
    cureData(data)
    .then((info)=>{
      postData("/add", info)
      .then((data) =>{
        retrieveData("/all")
        .then((data)=>{
          updateUI(data);
        });
      });
    });
  });
});

// get request, retrieve data friom API to server
const getData = async (url) => {
  try{
    const result = await fetch(url);
    const data = await result.json();
    if (data.cod == 200){
    console.log(data);
    return data;
    }else{
      console.log(data.message);
      return data;
    }

  }catch(e){
    console.log(e);
  }
};

// cure the data to return only what is necessary to the server

const cureData = async (data)=>{
  try{
    if (data.message){
      return data;
    }else{
    const info = {
      date, 
      feelings: feelings.value,
      temp: data.main.temp,
      name: data.name,
    };
    
    return info;
  }

  }catch(err){
    console.error(err);
  }
};

const postData = async(url="", data={}) => {
  try{
    const result = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),

    });
    return result;
  }catch(err){
    console.error(err);
  }
};

const retrieveData = async (url) => {
  const data = await fetch(url);
  try {
    const response = await data.json();
    
    return response;
  }catch(err){
    console.error(err);
  }
}

 
const updateUI = async (data) => {
  const response = await data;
  if(response.date){
    document.querySelector("#error").style.display = "none";
    name.innerHTML = response.name;
    dateNow.innerHTML = response.date;
    temp.innerHTML = response.temp;
    // light humor, please do not take literally
    feeling.innerHTML = response.feelings? response.feelings: "Bitch I made a text box, use it!!"
  }else{
    document.querySelector("#error").style.display = "block";
    document.querySelector(".outputs").style.display = "none";
    document.querySelector('#error').innerHTML = response.message;
  }
};