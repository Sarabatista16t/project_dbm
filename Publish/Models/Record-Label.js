var database = require("../Database/sqlite-wrapper.js")('./Publish/Database/projeto/projeto.db')
 
const schemaRecord_Label = require('../Schemas/Schema-Record-Label.json');

const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', () => { return faker });

class Record_Label {
 constructor (id,name,id_company) {
     
    this.name = name;
    this.id_company = id_company;
    this.id = id;

        Object.defineProperty(this,"name", { enumerable: false });
        Object.defineProperty(this,"id_company", { enumerable: false });
        Object.defineProperty(this,"id", { enumerable: false });

}

//Generate an object from the json faker from the correspondent schema
static create() {
 return Object.assign(new Record_Label(), jsf.generate(schemaRecord_Label));
}



static all (callback){
    database.where("SELECT * FROM Record_Label", [], Record_Label, callback)
}
 
static get(id, callback){
    database.where("SELECT * FROM Record_Label WHERE id = ?", [id], Record_Label, callback)
}
static delete(id, callback) {
    database.run("DELETE FROM Aluno WHERE id = ?", [id], callback)
}

save(callback){
    console.log("QWERT")
    console.log("ID"+this.id)
    if(this.id){
        console.log("IF")
        database.run("UPDATE Record_Label SET  name =? ,  id_company =?   WHERE id = ?", [ this.name, this.id_company, this.id], callback)
    }else{
                console.log("else")

        database.run("INSERT INTO Record_Label ( name,  id_company ) values (?,?)", [ this.name ,  this.id_company  ]) 
    }
} 

}

module.exports = Record_Label