var sqlitewrapper = require("../Database/sqlite-wrapper.js")('./Publish/Database/projeto/projeto.db')
 
const schemaProducer = require('../Schemas/Schema-Producer.json');

const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', () => { return faker });

class Producer {
 constructor (id,name,id_company) {
     
    this.name = name;
    this.id_company = id_company;
    this.id = id;

        Object.defineProperty(this,"name", { enumerable: false });
        Object.defineProperty(this,"id_company", { enumerable: false });
        Object.defineProperty(this,"id", { enumerable: false });

}
static create() {
 return Object.assign(new Producer(), jsf.generate(schemaProducer));
}
/////////////
static all (callback){
    sqlitewrapper.where("SELECT * FROM Producer", [], Producer, callback)
}
 
static get(id, callback){
    sqlitewrapper.where("SELECT * FROM Producer WHERE id = ?", [id], Producer, callback)
}
static delete(id, callback) {
    sqlitewrapper.run("DELETE FROM Aluno WHERE id = ?", [id], callback)
}

save(callback){
    console.log("QWERT")
    console.log("ID"+this.id)
    if(this.id){
        console.log("IF")
        sqlitewrapper.run("UPDATE Producer SET  name =? ,  id_company =?   WHERE id = ?", [ this.name, this.id_company, this.id], callback)
    }else{
                console.log("else")

        sqlitewrapper.run("INSERT INTO Producer ( name,  id_company ) values (?,?)", [ this.name ,  this.id_company  ]) 
    }
} 

}

module.exports = Producer