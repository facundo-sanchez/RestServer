const cors = require('cors');


// const corsOptions = {
//     origin: 'http://localhost:8081/',
//     optionSuccessStatus: 200
// }
let whiteList = ['http://localhost:8081','http://localhost:8989'];
let corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allow by cors'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = cors(corsOptions);
