var sqlitewrapper = require("../Database/sqlite-wrapper.js")('./Publish/Database/projeto/projeto')
 
const schemaSocialMedia = require('../Schemas/Schema-SocialMedia.json');

const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', () => { return faker });

class SocialMedia {
 constructor (id,name,link) {
     
    this.name = name;
    this.link = link;

    Object.defineProperty(this, "Artist_id", { enumerable: false, writable: true });
    Object.defineProperty(this,"id", { enumerable: false, writable: true });

}
static create() {
 return Object.assign(new SocialMedia(), jsf.generate(schemaSocialMedia));
}
/////////////
static all (callback){
    sqlitewrapper.where("SELECT * FROM SocialMedia", [], SocialMedia, callback)
}
 
static get(id, callback){
    sqlitewrapper.where("SELECT * FROM SocialMedia WHERE id = ?", [id], SocialMedia, callback)
}
static delete(id, callback) {
    sqlitewrapper.run("DELETE FROM SocialMedia WHERE id = ?", [id], callback)
}
static many(model,id, callback){
    let tablename = ('SocialMedia' < model) ? 'SocialMedia'+ "_" + model : model + "_" +'SocialMedia' ;
    sqlitewrapper.where("SELECT * FROM SocialMedia INNER JOIN  "+tablename+" ON "+tablename+".SocialMedia_id = SocialMedia.id WHERE  "+tablename+"."+model+"_id = ?", [id],SocialMedia, callback);
}

static top(property,order,limit,callback){
    sqlitewrapper.where("SELECT * FROM SocialMedia ORDER BY "+property+" "+order+" LIMIT "+limit, [], SocialMedia, callback);
}

save(callback){
    if(this.id){
        let attr = [];
       attr.push('name =  ?'); attr.push('link =  ?');
        let values = '?,?,'
        let params =  [ this.name ,  this.link  ];
        let manymany = [];
        if(this.Artist_id)  {
            if('1-M' == '1-M'){
            attr.push('Artist_id =  ?');
            values += '?,';
            params.push(this.Artist_id)
            }else if('1-M' == 'M-M'){
                if(Array.isArray(this.Artist_id)){
                    manymany.push({stmt:"INSERT INTO Artist_SocialMedia (SocialMedia_id, Artist_id) values "+ Array(this.Artist_id.length).fill("(?,?)").join(","), params: repeatValues(this.Artist_id, this.id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Artist_SocialMedia (SocialMedia_id, Artist_id) values (?,?)",  params: [this.id, this.Artist_id]}); 
                }
            }
        }
        params.push(this.id);
        values = values.slice(0, -1);
        var l = "UPDATE SocialMedia SET "+attr.join(',')+" WHERE id = ?";
        sqlitewrapper.run(l,params,()=>{
            if(manymany.length>0){
                aux(manymany,callback)
               
            }else{
                callback()
            }
            
        })
    }else{
        let attr = [];
 attr.push( 'name'); attr.push( 'link');
        let values = '?,?,'
        let params =  [ this.name ,  this.link  ];
        let manymany = [];
        if(this.Artist_id)  {
            if('1-M' == '1-M'){
            attr.push('Artist_id');
            values += '?,';
            params.push(this.Artist_id)
            }
        }
        values = values.slice(0, -1);
        var l = "INSERT INTO SocialMedia ("+attr.join(',')+") values ("+values+")";
   
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
        if(obj.Artist_id)  {
           if('1-M' == 'M-M'){
                if(Array.isArray(obj.Artist_id)){
                    manymany.push({stmt:"INSERT INTO Artist_SocialMedia (SocialMedia_id, Artist_id) values "+ Array(obj.Artist_id.length).fill("(?,?)").join(","), params: repeatValues(obj.Artist_id, id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Artist_SocialMedia (SocialMedia_id, Artist_id) values (?,?)",  params: [id, obj.Artist_id]}); 
                }
            }
        }
        return manymany
    }
}
    
} 
 
module.exports = SocialMedia