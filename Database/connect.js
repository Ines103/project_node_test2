const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mimi_projet2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('db connected'))
    .catch((error) => console.log(error)
    )