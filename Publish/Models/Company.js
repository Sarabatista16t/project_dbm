var sqlitewrapper = require("../Database/sqlite-wrapper.js")('./Publish/Database/projeto/projeto.db')
 
const schemaCompany = require('../Schemas/Schema-Company.json');

const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', () => { return faker });

class Company {
 constructor (id,name,address) {
     
    this.name = name;
    this.address = address;
    this.id = id;

        Object.defineProperty(this,"name", { enumerable: false });
        Object.defineProperty(this,"address", { enumerable: false });
        Object.defineProperty(this,"id", { enumerable: false });

}
static create() {
 return Object.assign(new Company(), jsf.generate(schemaCompany));
}
/////////////
static all (callback){
    sqlitewrapper.where("SELECT * FROM Company", [], Company, callback)
}
 
static get(id, callback){
    sqlitewrapper.where("SELECT * FROM Company WHERE id = ?", [id], Company, callback)
}
static delete(id, callback) {
    sqlitewrapper.run("DELETE FROM Aluno WHERE id = ?", [id], callback)
}

save(callback){
    console.log("QWERT")
    console.log("ID"+this.id)
    if(this.id){
        console.log("IF")
        sqlitewrapper.run("UPDATE Company SET  name =? ,  address =?   WHERE id = ?", [ this.name, this.address, this.id], callback)
    }else{
                console.log("else")

        sqlitewrapper.run("INSERT INTO Company ( name,  address ) values (?,?)", [ this.name ,  this.address  ]) 
    }
} 

}

module.exports = Company