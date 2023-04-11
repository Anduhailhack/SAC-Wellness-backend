const {MongoDb} = require('./Mongo') //Intellisense shows error on windows but it should work
const {MySQL} = require('./MySQL') //Intellisense shows error on windows but it should work

const Database = function(dbms) {
    if (!dbms || dbms == 'mongo')
        this.dbms = new MongoDb(process.env.MONGO_CONNECTION)
    else if (dbms == 'mysql')
        this.dbms = new MySQL()
}

// Define the interfaces to be implemented by the specific database hundlers later

Database.prototype.addAdmin = function(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no) {
    this.dbms.addAdmin(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no)
}

module.exports = {Database}