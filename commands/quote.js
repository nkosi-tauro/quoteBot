 
module.exports = message => {
    let text="";//intial set
 //for loop which runs three times
   fetch("https://api.quotable.io/random") //fetch api for 3 random chuck norris jokes
     .then(res => res.json()) //read the json
     .then((data) => { 
           
        let text = `${data.content} —${data.author}`; 
        message.reply(text)
        console.log(text)
        
         })
 
};