const Express = require('express');
const app = Express();
const Joi = require('joi'); //For Validation of Incoming Data

app.use(Express.json()); //For Parsing JSON Objects to the Server

//Making Dummy Data


const train_data = [
    {id: 1, name: "Vidit", surname: "Shah", age: 22},
    {id: 2, name: "V", surname: "Shah", age: 22}];

function verify(reques_body) {
    const schema = {
        name: Joi.string().min(3).required(),
        surname: Joi.string().min(3).required(),
        age: Joi.required()
    };
    let result = Joi.validate(reques_body, schema);
    return result;

}

app.get('/train/irctc', (req, res) => {
    res.send(train_data);
});
app.post('/train/irctc', (req, res) => {
    let result = verify(req.body);
    if (result.error) {
        return res.send(200).error.details.message[0]
    }
    let ticket = {
        id: train_data.length + 1,
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age
    };
    train_data.push(ticket);
    res.send(train_data);
});
app.put('/train/irctc/:id', (req, res) => {
    let result = verify(req.body);
    if (result.error) {
        res.status(400).send(error.details.message[0])
    }
    let search = train_data.find(s => s.id == req.params.id);
    if (!search) {
        return res.send('Item not found')
    }
    search.name = req.body.name;
    search.surname = req.body.surname;
    search.age = req.body.age;
    res.send(train_data);

});
app.delete('/train/irctc/:id', (req, res) => {
    let search = train_data.find(s => s.id == req.params.id);
    if (!search) {
        res.status(400).send('Id not found')
    }
    let index = train_data.indexOf(search);
    train_data.splice(index, 1);
    res.send(train_data);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening to Port", port));