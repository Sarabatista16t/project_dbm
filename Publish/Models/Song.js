var sqlitewrapper = require("../Database/sqlite-wrapper.js")('./Publish/Database/projeto/projeto.db')
 
const schemaSong = require('../Schemas/Schema-Song.json');

const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', () => { return faker });

class Song {
 constructor (id,title,duration,id_album,id_genre) {
     
    this.title = title;
    this.duration = duration;
    this.id_album = id_album;
    this.id_genre = id_genre;
    this.id = id;

        Object.defineProperty(this,"title", { enumerable: false });
        Object.defineProperty(this,"duration", { enumerable: false });
        Object.defineProperty(this,"id_album", { enumerable: false });
        Object.defineProperty(this,"id_genre", { enumerable: false });
        Object.defineProperty(this,"id", { enumerable: false });

}
static create() {
 return Object.assign(new Song(), jsf.generate(schemaSong));
}
/////////////
static all (callback){
    sqlitewrapper.where("SELECT * FROM Song", [], Song, callback)
}
 
static get(id, callback){
    sqlitewrapper.where("SELECT * FROM Song WHERE id = ?", [id], Song, callback)
}
static delete(id, callback) {
    sqlitewrapper.run("DELETE FROM Aluno WHERE id = ?", [id], callback)
}

save(callback){
    console.log("QWERT")
    console.log("ID"+this.id)
    if(this.id){
        console.log("IF")
        sqlitewrapper.run("UPDATE Song SET  title =? ,  duration =? ,  id_album =? ,  id_genre =?   WHERE id = ?", [ this.title, this.duration, this.id_album, this.id_genre, this.id], callback)
    }else{
                console.log("else")

        sqlitewrapper.run("INSERT INTO Song ( title,  duration,  id_album,  id_genre ) values (?,?,?,?)", [ this.title ,  this.duration ,  this.id_album ,  this.id_genre  ]) 
    }
} 

}

module.exports = Song