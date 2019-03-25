//modules
//var pools = require("../models/pools");
var Virtuals = require("./virtuals");
var Auth = require("./auth");


var request = {
    host: "bigipve.vinlab.com"
};

var Token = new Auth({
    host: request.host,
});
var vsList = new Virtuals({});
// Auth.getToken(request)
Token.getToken(request, function(err, response){
    if(err){
        console.log(err)
    };
    //console.log(response)
    request.token = response
    var vsList = new Virtuals({
        host: request.host,
        token: request.token,
        query: "?$top=5"
    });
    vsList.getVirtuals(request, function(err,response){
        if(err){
            console.log(err)
        };
        console.log(JSON.stringify(response))
    }
    )
}
)