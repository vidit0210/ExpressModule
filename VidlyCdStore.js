const Joi = require('joi');
const Express = require('express');
const app = Express();
app.use(Express.json());

const data = [
    {id:1,genre:'Action',code:'A'},
    {id:2,genre:'Drama',code:'D'}
];

function verify(request){
    const schema = {genre:Joi.string().required(),
                    code:Joi.string().required()};
     let result = Joi.validate(request,schema);
    return result;
}
app.get('/api/genre',(req,res)=>{
    res.send('Welcome to Genre');
    console.log('Got Simple Get Request!');
})
app.post('/api/genre',(req,res)=>{
    console.log(data);
    const {error} =verify(req.body);
    if(error){return res.status(200).send(error.details.message[0]) };
    const add ={
        id:data.length+1,
        genre:req.body.genre,
        code:req.body.code
    };
    data.push(add);
    res.send(data);
    console.log("Added Data is",data);
});

app.put('/api/genre/:id',(req,res)=>{
    const result = verify(req.body);
    if(result.error){ return res.status(400).send(error.details.message[0])};
    let search = data.find(s=>s.id==req.params.id);
    if(!search){res.send('Item Not Found')}
    search.genre = req.body.genre;
    search.code= req.body.code;
    res.send(data);
    console.log("Put Command Worked Well")
})

app.delete('/api/genre/:id',(req,res)=>{
    //search for the Element if it Exits or not
    let search = data.find(s=>s.id==req.params.id);
    if(!search){
        return res.send('Item not found');
    }
    let index = data.findIndex(search);
    data.splice(index,1);
    res.send('Data Deleted');
    console.log(data);
})

app.listen(3000,()=>console.log('Listening to Port 3000'));