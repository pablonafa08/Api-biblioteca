'use strict'
const app = require('./app');
const mongoose = require('mongoose');

app.set('port', process.env.PORT || 3000);

mongoose.connect('mongodb://uk3vi8dw75td3eg:L7sAcO3agHy3bgYFSIuc@bf6cd8ielnidzgq-mongodb.services.clever-cloud.com:27017/bf6cd8ielnidzgq', { useNewUrlParser: true }, (err) => {
    if (!err) {
        app.listen(app.get('port'), () => {
            console.log(`El servidor corre en el http://localhost:${app.get('port')}`);
        });
    } else {
        console.log(err);
    }
});







// mongoose.connect('mongodb://localhost:27017/zoo', { useNewUrlParser: true }, (err) => {
//     if (!err) {
//         app.listen(app.get('port'), () => {
//             console.log(`El servidor corre en el http://localhost:${app.get('port')}`);
//         });
//     }
// });