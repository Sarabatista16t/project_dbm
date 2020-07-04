var database = require("../Database/sqlite-wrapper.js")('./Publish/Database/projeto/projeto.db')
 
const schemaArtist = require('../Schemas/Schema-Artist.json');

const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', () => { return faker });

class Artist {
 constructor (id,name,nickname,id_record_label) {
     
    this.name = name;
    this.nickname = nickname;
    this.id_record_label = id_record_label;
    this.id = id;

        Object.defineProperty(this,"name", { enumerable: false });
        Object.defineProperty(this,"nickname", { enumerable: false });
        Object.defineProperty(this,"id_record_label", { enumerable: false });
        Object.defineProperty(this,"id", { enumerable: false });

}

//Generate an object from the json faker from the correspondent schema
static create() {
 return Object.assign(new Artist(), jsf.generate(schemaArtist));
}



static all (callback){
    database.where("SELECT * FROM Artist", [], Artist, callback)
}
 
static get(id, callback){
    database.where("SELECT * FROM Artist WHERE id = ?", [id], Artist, callback)
}
static delete(id, callback) {
    database.run("DELETE FROM Aluno WHERE id = ?", [id], callback)
}

save(callback){
    console.log("QWERT")
    console.log("ID"+this.id)
    if(this.id){
        console.log("IF")
        database.run("UPDATE Artist SET  name =? ,  nickname =? ,  id_record_label =?   WHERE id = ?", [ this.name, this.nickname, this.id_record_label, this.id], callback)
    }else{
                console.log("else")

        database.run("INSERT INTO Artist ( name,  nickname,  id_record_label ) values (?,?,?)", [ this.name ,  this.nickname ,  this.id_record_label  ]) 
    }
} 

}

module.exports = Artist