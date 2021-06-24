const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWxla2h5YXJveSIsImEiOiJja3E0d2NsM2kwcmxuMnBvNmtyM3h2aG15In0.2c88FUinCyLKcIgNoVi6EQ'

    request({url,json:true},(error,{body})=>{
        if (error){
            callback('Unable to connect to weather services',undefined)
        }
        else if(body.features[0].length===0){
            callback('Incorrect location',undefined)

        }
        else{
            callback(undefined,{
                location:body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude:body.features[0].center[1]

            })
        }

    }
    )
}

module.exports=geocode