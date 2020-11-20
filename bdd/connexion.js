var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect('mongodb+srv://invite:75g9OxajpGUFMuh4@cluster0.mlaoa.mongodb.net/dj?retryWrites=true',
    options,
    function(err){
        console.log(err)
    })


module.exports = mongoose;