var xlsx = require('node-xlsx');
let db=require("./exceldata.data.js");

function readExcelData(){
	console.log("yes i am in");
	let path=process.cwd().split("/");
	path.push("data2.xlsx");
	path=path.join("/");
	let obj=xlsx.parse(path);
	getDataFromExcel(obj,path)
}

function getDataFromExcel(obj,path,index){
	index=index||0;
	
	
	// console.log(JSON.stringify(obj[0].data[2]));
	// console.log(makeObject(obj[0].data[index]));
	let prepare_data=makeObject(obj[0].data[index]);
	savedata(prepare_data,"testCollection",index).then(result=>{
		
		// console.log("save data=",obj[0].data.length,index);
		if(obj[0].data.length>index){
			getDataFromExcel(obj,path,index+1);	
		}
		else{
			console.log("data dumping complete");
		}
		
	},err=>{
		// console.log("some err",err);
	});
}



// [
// "Database Status",
// 1;"Name",
// 2:"Priority Status (1/5, 2/5, 3/5, 4/5, Priority stands for 5/5)",
// 3:"Owner's Name",
// 4:"Owner Number",
// 5:"Manager's Name",
// 6:"Manager Number",
// 7:"Address",
// 8:"Locality [Format: Area, City]",
// 9:"Description",
// 10:"Facebook ID",
// 11:"Genre [Format: Genre1, Genre2]",
// 12:"Type, Pub, Bars, Lounge, Club, Micro-Brewery [Format: Type]",
// 13:"Timings [Format: Monday To Sunday; 1100 hrs - 0400 hrs]",
// 14:"Pricing; Average Person Cost [Format: INR 1500 Per Person]",
// 15:"More Info, Dance Floor, Car Parking, Smoking Area, Private Area, Food Type (Multi-Cuisine, Chinese, Italian, Continental), Bar Available, Roof-Top / Outdoor Area)"
// ]



function makeObject(obj){
	// console.log("ovj=",obj);
	// console.log();
	try{
		if(obj!=undefined && obj[10]!=undefined && obj[0]!="Delete"){
			var newObj={};
			newObj._key=calculate_key(obj);
			newObj.name=obj[1];
			newObj.priority=obj[2];
			newObj.owner_name=obj[3];
			newObj.owner_number=obj[4];
			newObj.contact_person=obj[5];
			newObj.contact_phone=obj[6];
			newObj.address=obj[7];
			newObj.location=obj[8];
			newObj.description=obj[9];
			newObj.facebookurl=obj[10];
			newObj.fbid=calculate_key(obj);
			newObj.genre=obj[11];
			newObj.profile_type="Party Spot";
			newObj.time=obj[13];
			newObj.price=obj[14];
			newObj.min=obj[14];
			newObj.max=obj[14];
			newObj.more=obj[15];
			newObj.createdat=new Date().getTime();
			newObj.rsm= {
				"email": "suport@goparties.com",
				"name": "Tarun",
				"phone": "+91 97 1197 1244"
			};


			return newObj;
		}
		return undefined;
	}
	catch(err){
		console.log("eror=",err);
		return undefined;
	}
	return undefined;
}


function calculate_key(obj){
	arr=(obj[10].split("/"));
	index=arr.indexOf("facebook.com");
	
	if(index<0){
		index=arr.indexOf("www.facebook.com");
	}
	return arr[index+1];
	// key1=(obj[10].split("/"))[(obj[10].split("/")).length-2];
	// if(key!=undefined && key!="" && key.indexOf("rf")<0){
	// 	return key;
	// }
	// return key1;
}




function savedata(data,collection,index){
	
	return new Promise(function(resolve,reject){
		if(data!="" && data!=undefined){
			db.updateData(data,collection)
			.then(result=>{
				console.log("fire=",index,data._key);
			// console.log("result=",result);
			resolve(result);
		},err=>{
			// reject(err);
			console.log("err=",index,data._key);
			// console.log(err);
			resolve(true);
		});
		}
		else{
			resolve(true);
		}
	})
}




module.exports={
	readExcelData
}