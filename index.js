import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import Notes from './Notes.js';
import Middleware from './Middleware.js'
const app = express();

// SET
app.set('port', process.env.PORT || 3001);
app.set('json spaces', 2);


// MIDDLEWARE
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(Middleware);


// INDEX ROUTE

app.get('/', (req, res) => {

    const content = `
    <style>
     body{
      overflow:hidden;
      background:linear-gradient(to left,#FF00B6,#FF7000,#8fff00,#00B6FF,#fff000);
     }
    .content{
        display:flex;
        width:100%;
        min-height:100vh;
        align-items:center;
        justify-content:center;
        
    }
    a{
        text-decoration:none;
        background:#111;
         padding:10px 50px;
         box-shadow:1px 2px 6px rgba(0,0,0,0.2);
         font-family:consolas,sans-serif;
         text-transform:uppercase;
         letter-spacing:1px;
         border-radius:16px;
         color:#999;
         font-weight:600;
         transition:background 0.5s ease-in-out;
    }
    a:hover{
        background:#D1E2C2;
    }
    </style>
    <div class="content"><a href="/notes">Notes</a></div>`;

    res.send(content);

});




//SHOW NOTES
app.get('/notes', (req, res) => {

    Notes.length !== 0 ? res.send(Notes) : res.status(404).send('Not Found');
});

// SHOW NOTE
app.get('/notes/:id', (req, res) => {

    const id = Number(req.params.id);
    const note = Notes.find(note => note.id === id);
    note ? res.send(note) : res.status(404).send('Not found');

});

// SAVE NOTE(S)
app.post('/notes/', (req, res) => {

    const { content } = req.body;


    // body.map(({ content }, i) => {

    //     Notes.push({
    //         id: Notes.length + 1,
    //         content: `${content}_${i+1}`,
    //         date: new Date().toISOString(),
    //         important: Math.random < 0.5
    //     });
    // });

    Notes.push({
        id: Notes.length + 1,
        content: content,
        date: new Date().toISOString(),
        important: Math.random < 0.5
    });

    res.status(201).send(Notes);
});

//UPDATE NOTE
app.put('/notes/:id', (req, res) => {

    const id = Number(req.params.id);
    const body = req.body;

    Notes.find(note => {
        if (note.id === id) {

            note.content = body.content;
            note.date = new Date().toISOString();
            note.update = true
        }

    });

    res.send(Notes);

});

//DELETE NOTE
app.delete('/notes/:id', (req, res) => {

    const id = Number(req.params.id);
    Notes.filter((note, i) => {
        if (note.id === id) {
            Notes.splice(i, 1);
        }
    });

    res.send(Notes);
});

app.use((req, res) => {



    res.status(404).json({ error: 'not found' });
});

// GETTING UP SERVER

(_ => {
    try {
        app.listen(app.get('port'), _ => console.log(`listening on PORT ${app.get('port')}`));

    } catch (error) {
        console.log(error);
    }
})();