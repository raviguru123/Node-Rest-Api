let db=require("../../../database.js").arangodb;

module.exports={

	getAllData:function(collectionName,limitStart,limitEnd){
		return new Promise(function(resolve,reject){
			var query="";
			if(limitStart!=undefined && limitEnd!=undefined){
				query='for q in @@collection limit @@limitStart,@@limitEnd return q';
				query=query.replace('@@limitStart',limitStart);
				query=query.replace('@@limitEnd',limitEnd);	
			}
			
			else
				query='for q in @@collection return q';
			query=query.replace('@@collection',collectionName);
			db.query(query).then(result=>{
				resolve(result._result);
			},error=>{
				reject(error);
			});
		});
	},
	saveData:function(data,collectionName){
		return new Promise(function(resolve,reject){
			var query = 'upsert {"_key":"@@key"} insert @@data update @@data in @@collection return NEW';
			query = query.replace('@@key',data._key);
			query = query.replace(/@@data/g,JSON.stringify(data));
			query = query.replace('@@collection',collectionName);
			db.query(query).then(meta=>{
				resolve(meta);
			},
			error=>{
				// console.log("err=",error);
				reject(error);
			});

		});
	},
	updateData:function(data,collectionName){
		return new Promise(function(resolve,reject){
			var query = 'upsert {"_key":"@@key"} insert @@data update @@data in @@collection return NEW';
			query = query.replace('@@key',data._key);
			query = query.replace(/@@data/g,JSON.stringify(data));
			query = query.replace('@@collection',collectionName);
			//console.log("query",query);
			
			// db1.query(query).then(doc=>{
			// },
			// error=>{
			// });
			
			db.query(query).then(meta=>{
				//console.log("meta",meta);
				resolve(meta);
			},
			error=>{
				reject(error);
			});


		});
	}
};


