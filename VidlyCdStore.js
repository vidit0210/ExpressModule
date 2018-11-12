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
                    code:Joi.string.required()};
     let result = Joi.validate(request,schema);
    return result;
}
app.get('/api/genre',(req,res)=>{
    res.send('Welcome to Genre');
    console.log('Got Simple Get Request!');
})
app.post()
app.listen(3000,()=>console.log('Listening to Port 3000'));