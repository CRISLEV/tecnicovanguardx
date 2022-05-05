const fs = require('fs')

const getNewId = (array) => {
    let newID = 0;
    array.length == 0 ? newID = 1 : newID = array[array.length - 1].id + 1;
    return newID;
}

const newDate = () => new Date().toString()

function validateArray(array, id) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id == id)
        if (!row) {
            reject({
                message: 'ID already exists',
                status: 404
            })
        }
        resolve(row)
    })
}

function saveData(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => { if (err) console.log(err) })
}

module.exports = { getNewId, newDate, validateArray, saveData }