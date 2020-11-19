var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect('mongodb+srv://xxxxx:xxxxx@cluster0.mlaoa.mongodb.net/dj?retryWrites=true&w=majority',
    options,
    function(err){
        console.log(err)
    })


module.exports = mongoose;