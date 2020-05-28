var sqlitewrapper = require("../Database/sqlite-wrapper.js")('./Publish/Database/projeto/projeto.db')
 
const schemaRecord Label = require('../Schemas/Schema-Record Label.json');

const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', () => { return faker });

class Record Label {
 constructor (id,name,id_company) {
     
    this.name = name;
    this.id_company = id_company;
    this.id = id;

        Object.defineProperty(this,"name", { enumerable: false });
        Object.defineProperty(this,"id_company", { enumerable: false });
        Object.defineProperty(this,"id", { enumerable: false });

}
static create() {
 return Object.assign(new Record Label(), jsf.generate(schemaRecord Label));
}
/////////////
static all (callback){
    sqlitewrapper.where("SELECT * FROM Record Label", [], Record Label, callback)
}
 
static get(id, callback){
    sqlitewrapper.where("SELECT * FROM Record Label WHERE id = ?", [id], Record Label, callback)
}
static delete(id, callback) {
    sqlitewrapper.run("DELETE FROM Aluno WHERE id = ?", [id], callback)
}

save(callback){
    console.log("QWERT")
    console.log("ID"+this.id)
    if(this.id){
        console.log("IF")
        sqlitewrapper.run("UPDATE Record Label SET  name =? ,  id_company =?   WHERE id = ?", [ this.name, this.id_company, this.id], callback)
    }else{
                console.log("else")

        sqlitewrapper.run("INSERT INTO Record Label ( name,  id_company ) values (?,?)", [ this.name ,  this.id_company  ]) 
    }
} 

}

module.exports = Record Label