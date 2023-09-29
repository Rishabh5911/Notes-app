const express = require('express');
const app = express();
const cors = require('cors');
const Note = require('./models/Note');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(()=> console.log('DB connected')).catch(err=> console.log(err))


// create
app.post('/newNote', (req, res)=>{
    const title = req.body.title
    const note = req.body.note

    const newNote = new Note({
        title, note
    })
    newNote.save((err, data)=>{
        if(err){
            console.log(err)
        }
        res.send('OK')
    })
    console.log(newNote)
})

// read
app.get('/notes',(req,res) => {
    Note.find({},function(err,data){
        if(err){
            console.log(err)
        }
        else{
            res.json(data)
        }
    })
})


// delete
app.delete('/deleteNote/:id', (req, res)=>{
    Note.deleteOne({_id: req.params.id}, function(err){
        if(err){
            console.log(err)
        }else{
            res.send('deleted')
        }
    })
})

// update
app.put('/update/:id', async(req, res)=>{

    req.data = await Note.findByIdAndUpdate(req.params.id)
    let data = req.data
    data.title = req.body.title
    data.note = req.body.note
  

    try{
        data = await data.save()
        res.send('Updated')
    }
    catch(err){
        console.log(err)
    }
  
})


app.listen(PORT,() => {
    console.log(`Server Started at PORT ${PORT}`)
})

