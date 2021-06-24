const path=require('path')
const express=require ('express')
const hbs=require('hbs')
const geocode=require('./geocode.js' )
const forecast=require('./forecast.js' )
const app=express()

const port=process.env.PORT||3000

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Alekhya Roy'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Alekhya Roy'
    })
        
} )

app.get('/help',(req,res)=>{
    res.render('help',{
       help:'This is a help page',
       title:'Help',
       name:'Alekhya Roy'
    })
        
} )




app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,response={})=>{
        if(error){
            return res.send({
                message:error 
            })
        }
        forecast(response.latitude,response.longitude,(error,forecastResponse)=>{
            if(error){
                return res.send({
                    message:error
                })
            }

            res.send({
                temperature:forecastResponse.temperature,
                feels_like:forecastResponse.feels_like,
                observation_time:forecastResponse.observation_time
            })
        })
    })
}) 
    
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 Page',
        name:'Alekhya Roy',
        message:'Help article not found'
    })

})
app.get('*',(req,res)=>{
    res.render('404',{
        name:'Alekhya Roy',
        message:'Page not found',
        title:'404 Page'
    })

})
app.listen(port,()=>{
    console.log('Server is up on port'+port)
})