var sqlitewrapper = require("../Database/sqlite-wrapper.js")('./Publish/Database/projeto/projeto')
 
const schemaSong = require('../Schemas/Schema-Song.json');

const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', () => { return faker });

class Song {
 constructor (id,title,duration) {
     
    this.title = title;
    this.duration = duration;

    Object.defineProperty(this, "Genre_id", { enumerable: false, writable: true });
    Object.defineProperty(this, "Album_id", { enumerable: false, writable: true });
    Object.defineProperty(this,"id", { enumerable: false, writable: true });

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
    sqlitewrapper.run("DELETE FROM Song WHERE id = ?", [id], callback)
}
static many(model,id, callback){
    let tablename = ('Song' < model) ? 'Song'+ "_" + model : model + "_" +'Song' ;
    sqlitewrapper.where("SELECT * FROM Song INNER JOIN  "+tablename+" ON "+tablename+".Song_id = Song.id WHERE  "+tablename+"."+model+"_id = ?", [id],Song, callback);
}

static top(property,order,limit,callback){
    sqlitewrapper.where("SELECT * FROM Song ORDER BY "+property+" "+order+" LIMIT "+limit, [], Song, callback);
}

save(callback){
    if(this.id){
        let attr = [];
       attr.push('title =  ?'); attr.push('duration =  ?');
        let values = '?,?,'
        let params =  [ this.title ,  this.duration  ];
        let manymany = [];
        if(this.Genre_id)  {
            if('M-M' == '1-M'){
            attr.push('Genre_id =  ?');
            values += '?,';
            params.push(this.Genre_id)
            }else if('M-M' == 'M-M'){
                if(Array.isArray(this.Genre_id)){
                    manymany.push({stmt:"INSERT INTO Genre_Song (Song_id, Genre_id) values "+ Array(this.Genre_id.length).fill("(?,?)").join(","), params: repeatValues(this.Genre_id, this.id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Genre_Song (Song_id, Genre_id) values (?,?)",  params: [this.id, this.Genre_id]}); 
                }
            }
        }
        if(this.Album_id)  {
            if('M-M' == '1-M'){
            attr.push('Album_id =  ?');
            values += '?,';
            params.push(this.Album_id)
            }else if('M-M' == 'M-M'){
                if(Array.isArray(this.Album_id)){
                    manymany.push({stmt:"INSERT INTO Album_Song (Song_id, Album_id) values "+ Array(this.Album_id.length).fill("(?,?)").join(","), params: repeatValues(this.Album_id, this.id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Album_Song (Song_id, Album_id) values (?,?)",  params: [this.id, this.Album_id]}); 
                }
            }
        }
        params.push(this.id);
        values = values.slice(0, -1);
        var l = "UPDATE Song SET "+attr.join(',')+" WHERE id = ?";
        sqlitewrapper.run(l,params,()=>{
            if(manymany.length>0){
                aux(manymany,callback)
               
            }else{
                callback()
            }
            
        })
    }else{
        let attr = [];
 attr.push( 'title'); attr.push( 'duration');
        let values = '?,?,'
        let params =  [ this.title ,  this.duration  ];
        let manymany = [];
        if(this.Genre_id)  {
            if('M-M' == '1-M'){
            attr.push('Genre_id');
            values += '?,';
            params.push(this.Genre_id)
            }
        }
        if(this.Album_id)  {
            if('M-M' == '1-M'){
            attr.push('Album_id');
            values += '?,';
            params.push(this.Album_id)
            }
        }
        values = values.slice(0, -1);
        var l = "INSERT INTO Song ("+attr.join(',')+") values ("+values+")";
   
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
        console.log(elem)
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
        if(obj.Genre_id)  {
           if('M-M' == 'M-M'){
                if(Array.isArray(obj.Genre_id)){
                    manymany.push({stmt:"INSERT INTO Genre_Song (Song_id, Genre_id) values "+ Array(obj.Genre_id.length).fill("(?,?)").join(","), params: repeatValues(obj.Genre_id, id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Genre_Song (Song_id, Genre_id) values (?,?)",  params: [id, obj.Genre_id]}); 
                }
            }
        }
        if(obj.Album_id)  {
           if('M-M' == 'M-M'){
                if(Array.isArray(obj.Album_id)){
                    manymany.push({stmt:"INSERT INTO Album_Song (Song_id, Album_id) values "+ Array(obj.Album_id.length).fill("(?,?)").join(","), params: repeatValues(obj.Album_id, id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Album_Song (Song_id, Album_id) values (?,?)",  params: [id, obj.Album_id]}); 
                }
            }
        }
        return manymany
    }
}
    
} 
 
module.exports = Song