const connection = require("../config/connection");

function createQmarks(num) {
    const arr = [];
    for(var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function translateSql(obj) {
    const arr = [];
    for (var key in obj) {
        var value = obj[key];
        if (Object.hasOwnProperty.call(obj, key)) {
            if(typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'" ;
            }
            arr.push(key + "=" + value)
        }
    }
    return arr.toString();
}

const orm = {
    selectAll: function(table, cb) {
        const dbquery = "SELECT * FROM" + TABLE + ";";

        connection.query(dbQuery, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    insertOne: function(table, cols, vals, cb) {
        const dbQuery = 
        "INSERT INTO " +
        table +
        " (" +
        cols.toString() +
        //turns columns into strings
        ") " +
        "VALUES (" +
        createQmarks(vals.length) +
        //creates question mark
        ") ";

        console.log(dbQuery);
        connection.query(dbQuery, vals, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
updateOne: function(table, objColVals, condition, cb) {
    const dbQuery =
    "UPDATE" +
    table +
    " SET " +
    translateSql(objColVals) +
    " WHERE " +
    condition;

    console.log(dbQuery);
        connection.query(dbQuery, vals, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
},
deleteOne: function(table, condition, cb) {
    const dbQuery = "DELETE FROM " + table + " WHERE " + condition;
    console.log(dbQuery);

    connection.query(dbQuery, function(err,res) {
        if (err) {
            throw err;
        }
        cb(res);
    });
}

};