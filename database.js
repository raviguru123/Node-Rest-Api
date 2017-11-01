let ArrangoDatabase=require("arangojs").Database;
let config=require("./config.js");


let arangodb=new ArrangoDatabase({
	url:"http://root:poiqwe@localhost:8529/",
	databaseName:"goparties"
});


module.exports={
	arangodb
}

