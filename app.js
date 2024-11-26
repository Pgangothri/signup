const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const https=require('https');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
   // res.send("running");

})
app.post("/",function(req,res){
   const firstname=req.body.fname;
   const lastname=req.body.lname;
   const Email=req.body.email; 
   //console.log(firstname,lastname,Email)
   const data={
    members:[
        {
            email_address:Email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstname,
                LNAME:lastname,
            }

        }

    ]
   }
   const jsonData=JSON.stringify(data);
   const url="https://us21.api.mailchimp.com/3.0/lists/f3044d4fb9";
   const options={
    method:"POST",
    auth:"gangothri:c4b9b0044751562edfed4f1c79741c41-us21",
   }
  const request= https.request(url,options,function(response){
    if(response.statusCode==200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
        console.log(JSON.parse(data));
    })

   })
  // request.write(jsonData);
   request.end()


})
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT||3000,function(){
    console.log("port started");
})
//c4b9b0044751562edfed4f1c79741c41-us21
//f3044d4fb9