var sqlitewrapper = require("../Database/sqlite-wrapper.js")('./Publish/Database/projeto/projeto.db')
 
const schemaSong_Artist = require('../Schemas/Schema-Song_Artist.json');

const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', () => { return faker });

class Song_Artist {
 constructor (id,id_artist,id_song) {
     
    this.id_artist = id_artist;
    this.id_song = id_song;
    this.id = id;

        Object.defineProperty(this,"id_artist", { enumerable: false });
        Object.defineProperty(this,"id_song", { enumerable: false });
        Object.defineProperty(this,"id", { enumerable: false });

}
static create() {
 return Object.assign(new Song_Artist(), jsf.generate(schemaSong_Artist));
}
/////////////
static all (callback){
    sqlitewrapper.where("SELECT * FROM Song_Artist", [], Song_Artist, callback)
}
 
static get(id, callback){
    sqlitewrapper.where("SELECT * FROM Song_Artist WHERE id = ?", [id], Song_Artist, callback)
}
static delete(id, callback) {
    sqlitewrapper.run("DELETE FROM Aluno WHERE id = ?", [id], callback)
}

save(callback){
    console.log("QWERT")
    console.log("ID"+this.id)
    if(this.id){
        console.log("IF")
        sqlitewrapper.run("UPDATE Song_Artist SET  id_artist =? ,  id_song =?   WHERE id = ?", [ this.id_artist, this.id_song, this.id], callback)
    }else{
                console.log("else")

        sqlitewrapper.run("INSERT INTO Song_Artist ( id_artist,  id_song ) values (?,?)", [ this.id_artist ,  this.id_song  ]) 
    }
} 

}

module.exports = Song_Artist