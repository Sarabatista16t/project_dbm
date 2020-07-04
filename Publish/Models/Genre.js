var database = require("../Database/sqlite-wrapper.js")('./Publish/Database/projeto/projeto.db')
 
const schemaGenre = require('../Schemas/Schema-Genre.json');

const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', () => { return faker });

class Genre {
 constructor (id,genre) {
     
    this.genre = genre;
    this.id = id;

        Object.defineProperty(this,"genre", { enumerable: false });
        Object.defineProperty(this,"id", { enumerable: false });

}

//Generate an object from the json faker from the correspondent schema
static create() {
 return Object.assign(new Genre(), jsf.generate(schemaGenre));
}



static all (callback){
    database.where("SELECT * FROM Genre", [], Genre, callback)
}
 
static get(id, callback){
    database.where("SELECT * FROM Genre WHERE id = ?", [id], Genre, callback)
}
static delete(id, callback) {
    database.run("DELETE FROM Aluno WHERE id = ?", [id], callback)
}

save(callback){
    console.log("QWERT")
    console.log("ID"+this.id)
    if(this.id){
        console.log("IF")
        database.run("UPDATE Genre SET  genre =?   WHERE id = ?", [ this.genre, this.id], callback)
    }else{
                console.log("else")

        database.run("INSERT INTO Genre ( genre ) values (?)", [ this.genre  ]) 
    }
} 

}

module.exports = Genre