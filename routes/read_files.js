var fs=require("fs");
var exceldata=require("./miscellaneous/transferDataFromExcelToDatabase/exceldata.js");


function readAllFiles(){
	// console.log("current directory path",process.cwd());
	// console.log("__dirname",__dirname);
	// console.log("process.argv",process.argv);
	exceldata.readExcelData();
}




// fs.watch(__dirname,function(event,filename){
// 	console.log("file changes",filename);
// });




module.exports={
	readAllFiles
}
