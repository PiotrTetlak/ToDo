const {readFile, writeFile} = require('fs').promises;
const {join} = require('path');
const {v4: uuid} = require('uuid');


class Db {
    constructor(dbFileName) {
        this.dbFileName = join(__dirname, '../data', dbFileName);
        this._load();
    }

    async _load() {
        this._data = JSON.parse(await readFile(this.dbFileName, 'utf8'));
    }

    _save() {
        writeFile(this.dbFileName, JSON.stringify(this._data, 'utf8'));
    }

    create(todo) {
        const id = uuid();
        const check = false;
        this._data.push({
            id,
            todo,
            check,
        });
        this._save();
    }

    delete(id) {
        this._data = this._data.filter(obj => obj.id !== id);
        this._save();
    }

    update(id, todo, check) {

        this._data = this._data.map(obj => {
            if (obj.id === id) {
                return {
                    id,
                    todo,
                    check,
                };
            } else {
                return obj;
            }
        });
        this._save();
    }

    getOne(id) {
        return this._data.find(obj => obj.id === id);
    }
}

const db = new Db('list.json');

module.exports = {
    db,
};