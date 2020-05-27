let para = document.querySelector("#para");

document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const area=document.querySelector('input').value;
    console.log(area);
    para.textContent="loading...."
fetch("/weather?location="+area).then((response) => {
  response.json().then((data) => {
    if (data.error) {
      return para.textContent = "PLAESE ENTER VALID LOCATION";
    }
    const {temperature,location,description} = {
      temperature:data.temperature,
      location:data.location,
      description:data.description
    }
    var output =`"The temperature of ${location} is ${temperature} degree(C) and the condition of weather is ${description}"`;
    console.log(output);
    para.textContent = output;
  })
})
})
