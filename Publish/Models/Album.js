var sqlitewrapper = require("../Database/sqlite-wrapper.js")('./Publish/Database/projeto/projeto.db')
 
const schemaAlbum = require('../Schemas/Schema-Album.json');

const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', () => { return faker });

class Album {
 constructor (id,title,description,image,release_date,id_artist,id_producer,id_record_label) {
     
    this.title = title;
    this.description = description;
    this.image = image;
    this.release_date = release_date;
    this.id_artist = id_artist;
    this.id_producer = id_producer;
    this.id_record_label = id_record_label;
    this.id = id;

        Object.defineProperty(this,"title", { enumerable: false });
        Object.defineProperty(this,"description", { enumerable: false });
        Object.defineProperty(this,"image", { enumerable: false });
        Object.defineProperty(this,"release_date", { enumerable: false });
        Object.defineProperty(this,"id_artist", { enumerable: false });
        Object.defineProperty(this,"id_producer", { enumerable: false });
        Object.defineProperty(this,"id_record_label", { enumerable: false });
        Object.defineProperty(this,"id", { enumerable: false });

}
static create() {
 return Object.assign(new Album(), jsf.generate(schemaAlbum));
}
/////////////
static all (callback){
    sqlitewrapper.where("SELECT * FROM Album", [], Album, callback)
}
 
static get(id, callback){
    sqlitewrapper.where("SELECT * FROM Album WHERE id = ?", [id], Album, callback)
}
static delete(id, callback) {
    sqlitewrapper.run("DELETE FROM Aluno WHERE id = ?", [id], callback)
}

save(callback){
    console.log("QWERT")
    console.log("ID"+this.id)
    if(this.id){
        console.log("IF")
        sqlitewrapper.run("UPDATE Album SET  title =? ,  description =? ,  image =? ,  release_date =? ,  id_artist =? ,  id_producer =? ,  id_record_label =?   WHERE id = ?", [ this.title, this.description, this.image, this.release_date, this.id_artist, this.id_producer, this.id_record_label, this.id], callback)
    }else{
                console.log("else")

        sqlitewrapper.run("INSERT INTO Album ( title,  description,  image,  release_date,  id_artist,  id_producer,  id_record_label ) values (?,?,?,?,?,?,?)", [ this.title ,  this.description ,  this.image ,  this.release_date ,  this.id_artist ,  this.id_producer ,  this.id_record_label  ]) 
    }
} 

}

module.exports = Album