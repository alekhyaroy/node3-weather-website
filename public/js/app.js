

  

  const weatherForm=document.querySelector('form')
  const search=document.querySelector('input')
  const messageOne=document.querySelector('#message-1')
  const messageTwo=document.querySelector('#message-2')

 // messageOne.textContent=''

  weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault() 
    const location=search.value

    
    
    fetch('/weather?address='+location).then((response)=>{
      response.json().then((data)=>{
          if(data.error){
              return messageOne.textContent=data.error
          }
          messageTwo.textContent=('Temperature:'+ data.temperature +'Feels Like:'+ data.feels_like+'Observation time is'+data.observation_time)
      })
  })
  })