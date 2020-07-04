var sqlitewrapper = require("../Database/sqlite-wrapper.js")('./Publish/Database/projeto/projeto')
 
const schemaRecordLabel = require('../Schemas/Schema-RecordLabel.json');

const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', () => { return faker });

class RecordLabel {
 constructor (id,name,address) {
     
    this.name = name;
    this.address = address;

    Object.defineProperty(this,"address", { enumerable: false });
    Object.defineProperty(this, "Producer_id", { enumerable: false, writable: true });
    Object.defineProperty(this, "Artist_id", { enumerable: false, writable: true });
    Object.defineProperty(this, "Album_id", { enumerable: false, writable: true });
    Object.defineProperty(this,"id", { enumerable: false, writable: true });

}
static create() {
 return Object.assign(new RecordLabel(), jsf.generate(schemaRecordLabel));
}
/////////////
static all (callback){
    sqlitewrapper.where("SELECT * FROM RecordLabel", [], RecordLabel, callback)
}
 
static get(id, callback){
    sqlitewrapper.where("SELECT * FROM RecordLabel WHERE id = ?", [id], RecordLabel, callback)
}
static delete(id, callback) {
    sqlitewrapper.run("DELETE FROM RecordLabel WHERE id = ?", [id], callback)
}
static many(model,id, callback){
    let tablename = ('RecordLabel' < model) ? 'RecordLabel'+ "_" + model : model + "_" +'RecordLabel' ;
    sqlitewrapper.where("SELECT * FROM RecordLabel INNER JOIN  "+tablename+" ON "+tablename+".RecordLabel_id = RecordLabel.id WHERE  "+tablename+"."+model+"_id = ?", [id],RecordLabel, callback);
}

static top(property,order,limit,callback){
    sqlitewrapper.where("SELECT * FROM RecordLabel ORDER BY "+property+" "+order+" LIMIT "+limit, [], RecordLabel, callback);
}

save(callback){
    if(this.id){
        let attr = [];
       attr.push('name =  ?'); attr.push('address =  ?');
        let values = '?,?,'
        let params =  [ this.name ,  this.address  ];
        let manymany = [];
        if(this.Producer_id)  {
            if('1-M' == '1-M'){
            attr.push('Producer_id =  ?');
            values += '?,';
            params.push(this.Producer_id)
            }else if('1-M' == 'M-M'){
                if(Array.isArray(this.Producer_id)){
                    manymany.push({stmt:"INSERT INTO Producer_RecordLabel (RecordLabel_id, Producer_id) values "+ Array(this.Producer_id.length).fill("(?,?)").join(","), params: repeatValues(this.Producer_id, this.id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Producer_RecordLabel (RecordLabel_id, Producer_id) values (?,?)",  params: [this.id, this.Producer_id]}); 
                }
            }
        }
        if(this.Artist_id)  {
            if('1-M' == '1-M'){
            attr.push('Artist_id =  ?');
            values += '?,';
            params.push(this.Artist_id)
            }else if('1-M' == 'M-M'){
                if(Array.isArray(this.Artist_id)){
                    manymany.push({stmt:"INSERT INTO Artist_RecordLabel (RecordLabel_id, Artist_id) values "+ Array(this.Artist_id.length).fill("(?,?)").join(","), params: repeatValues(this.Artist_id, this.id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Artist_RecordLabel (RecordLabel_id, Artist_id) values (?,?)",  params: [this.id, this.Artist_id]}); 
                }
            }
        }
        if(this.Album_id)  {
            if('1-M' == '1-M'){
            attr.push('Album_id =  ?');
            values += '?,';
            params.push(this.Album_id)
            }else if('1-M' == 'M-M'){
                if(Array.isArray(this.Album_id)){
                    manymany.push({stmt:"INSERT INTO Album_RecordLabel (RecordLabel_id, Album_id) values "+ Array(this.Album_id.length).fill("(?,?)").join(","), params: repeatValues(this.Album_id, this.id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Album_RecordLabel (RecordLabel_id, Album_id) values (?,?)",  params: [this.id, this.Album_id]}); 
                }
            }
        }
        params.push(this.id);
        values = values.slice(0, -1);
        var l = "UPDATE RecordLabel SET "+attr.join(',')+" WHERE id = ?";
        sqlitewrapper.run(l,params,()=>{
            if(manymany.length>0){
                aux(manymany,callback)
               
            }else{
                callback()
            }
            
        })
    }else{
        let attr = [];
 attr.push( 'name'); attr.push( 'address');
        let values = '?,?,'
        let params =  [ this.name ,  this.address  ];
        let manymany = [];
        if(this.Producer_id)  {
            if('1-M' == '1-M'){
            attr.push('Producer_id');
            values += '?,';
            params.push(this.Producer_id)
            }
        }
        if(this.Artist_id)  {
            if('1-M' == '1-M'){
            attr.push('Artist_id');
            values += '?,';
            params.push(this.Artist_id)
            }
        }
        if(this.Album_id)  {
            if('1-M' == '1-M'){
            attr.push('Album_id');
            values += '?,';
            params.push(this.Album_id)
            }
        }
        values = values.slice(0, -1);
        var l = "INSERT INTO RecordLabel ("+attr.join(',')+") values ("+values+")";
   
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
        if(obj.Producer_id)  {
           if('1-M' == 'M-M'){
                if(Array.isArray(obj.Producer_id)){
                    manymany.push({stmt:"INSERT INTO Producer_RecordLabel (RecordLabel_id, Producer_id) values "+ Array(obj.Producer_id.length).fill("(?,?)").join(","), params: repeatValues(obj.Producer_id, id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Producer_RecordLabel (RecordLabel_id, Producer_id) values (?,?)",  params: [id, obj.Producer_id]}); 
                }
                manymany.push({stmt:"DELETE FROM Producer_RecordLabel WHERE RecordLabel_id= ?", params: id })

            }
        }
        if(obj.Artist_id)  {
           if('1-M' == 'M-M'){
                if(Array.isArray(obj.Artist_id)){
                    manymany.push({stmt:"INSERT INTO Artist_RecordLabel (RecordLabel_id, Artist_id) values "+ Array(obj.Artist_id.length).fill("(?,?)").join(","), params: repeatValues(obj.Artist_id, id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Artist_RecordLabel (RecordLabel_id, Artist_id) values (?,?)",  params: [id, obj.Artist_id]}); 
                }
                manymany.push({stmt:"DELETE FROM Artist_RecordLabel WHERE RecordLabel_id= ?", params: id })

            }
        }
        if(obj.Album_id)  {
           if('1-M' == 'M-M'){
                if(Array.isArray(obj.Album_id)){
                    manymany.push({stmt:"INSERT INTO Album_RecordLabel (RecordLabel_id, Album_id) values "+ Array(obj.Album_id.length).fill("(?,?)").join(","), params: repeatValues(obj.Album_id, id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Album_RecordLabel (RecordLabel_id, Album_id) values (?,?)",  params: [id, obj.Album_id]}); 
                }
                manymany.push({stmt:"DELETE FROM Album_RecordLabel WHERE RecordLabel_id= ?", params: id })

            }
        }
        return manymany
    }
}
    
} 
 
module.exports = RecordLabel