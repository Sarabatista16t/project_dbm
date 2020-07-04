var sqlitewrapper = require("../Database/sqlite-wrapper.js")('./Publish/Database/projeto/projeto')
 
const schemaArtist = require('../Schemas/Schema-Artist.json');

const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', () => { return faker });

class Artist {
 constructor (id,name,nickname) {
     
    this.name = name;
    this.nickname = nickname;

    Object.defineProperty(this,"nickname", { enumerable: false });
    Object.defineProperty(this, "Album_id", { enumerable: false, writable: true });
    Object.defineProperty(this,"id", { enumerable: false, writable: true });

}
static create() {
 return Object.assign(new Artist(), jsf.generate(schemaArtist));
}
/////////////
static all (callback){
    sqlitewrapper.where("SELECT * FROM Artist", [], Artist, callback)
}
 
static get(id, callback){
    sqlitewrapper.where("SELECT * FROM Artist WHERE id = ?", [id], Artist, callback)
}
static delete(id, callback) {
    sqlitewrapper.run("DELETE FROM Artist WHERE id = ?", [id], callback)
}
static many(model,id, callback){
    let tablename = ('Artist' < model) ? 'Artist'+ "_" + model : model + "_" +'Artist' ;
    sqlitewrapper.where("SELECT * FROM Artist INNER JOIN  "+tablename+" ON "+tablename+".Artist_id = Artist.id WHERE  "+tablename+"."+model+"_id = ?", [id],Artist, callback);
}

static top(property,order,limit,callback){
    sqlitewrapper.where("SELECT * FROM Artist ORDER BY "+property+" "+order+" LIMIT "+limit, [], Artist, callback);
}

save(callback){
    if(this.id){
        let attr = [];
       attr.push('name =  ?'); attr.push('nickname =  ?');
        let values = '?,?,'
        let params =  [ this.name ,  this.nickname  ];
        let manymany = [];
        if(this.Album_id)  {
            if('1-M' == '1-M'){
            attr.push('Album_id =  ?');
            values += '?,';
            params.push(this.Album_id)
            }else if('1-M' == 'M-M'){
                if(Array.isArray(this.Album_id)){
                    manymany.push({stmt:"INSERT INTO Album_Artist (Artist_id, Album_id) values "+ Array(this.Album_id.length).fill("(?,?)").join(","), params: repeatValues(this.Album_id, this.id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Album_Artist (Artist_id, Album_id) values (?,?)",  params: [this.id, this.Album_id]}); 
                }
            }
        }
        params.push(this.id);
        values = values.slice(0, -1);
        var l = "UPDATE Artist SET "+attr.join(',')+" WHERE id = ?";
        sqlitewrapper.run(l,params,()=>{
            if(manymany.length>0){
                aux(manymany,callback)
               
            }else{
                callback()
            }
            
        })
    }else{
        let attr = [];
 attr.push( 'name'); attr.push( 'nickname');
        let values = '?,?,'
        let params =  [ this.name ,  this.nickname  ];
        let manymany = [];
        if(this.Album_id)  {
            if('1-M' == '1-M'){
            attr.push('Album_id');
            values += '?,';
            params.push(this.Album_id)
            }
        }
        values = values.slice(0, -1);
        var l = "INSERT INTO Artist ("+attr.join(',')+") values ("+values+")";
   
        sqlitewrapper.run(l,params,(res)=>{
            manymany = manyTo(this, attr, values, params , res.lastId);
            if(manymany.length>0){
                aux(manymany,callback)
               
            }else{
                callback()
            }
            
        })
  
     
   } 
   function aux(statements, callback){
        var call = callback;
        var elem = statements.pop()
        if(statements.length>0) call =  aux(statements,callback)
        sqlitewrapper.run(elem['stmt'],elem['params'] , call)
    
   }
     function repeatValues(arr, stat){
        var arrFinal = []
       arr.forEach((elem)=>{
            arrFinal.push(stat);
            arrFinal.push(elem)
        })
        return arrFinal;
    }    
    
function manyTo(obj,attr, values, params , id){
    var manymany = []
        if(obj.Album_id)  {
           if('1-M' == 'M-M'){
                if(Array.isArray(obj.Album_id)){
                    manymany.push({stmt:"INSERT INTO Album_Artist (Artist_id, Album_id) values "+ Array(obj.Album_id.length).fill("(?,?)").join(","), params: repeatValues(obj.Album_id, id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Album_Artist (Artist_id, Album_id) values (?,?)",  params: [id, obj.Album_id]}); 
                }
                manymany.push({stmt:"DELETE FROM Album_Artist WHERE Artist_id= ?", params: id })

            }
        }
        return manymany
    }
}
    
} 
 
module.exports = Artist