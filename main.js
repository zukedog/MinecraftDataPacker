var nsFolders = ["functions","loot_tables","structures","advancements","recipes"];


var zip = new JSZip();
zip.file("Hello.txt", "Hello World\n");


function download(adress){
	DataPacks[adress].zip.generateAsync({type:"blob"})
	.then(function(content) {
		// see FileSaver.js
		saveAs(content, DataPacks[adress].name+".zip");
	});
}

var DataPacks=[];

function newDataPack(name,description,format){
	
	var tempPack = new pack(name);
	tempPack.zip.file("pack.mcmeta",'"pack": {"pack_format": '+format+',"description": "'+description+'"}');
	tempPack.zip.folder("data");
	DataPacks.push(tempPack);
}
	
function pack(name){
	this.name=name;
	this.zip= new JSZip();
	this.newNamespace = function(nsName){
		console.log("namespace: "+nsName);
		var ns = this.zip.folder("/data/"+nsName);
		for(var i=0; i<nsFolders.length; i++){
			ns.folder(nsFolders[i]);
		}
		
	};
	
}


newDataPack("Test","An awesome datapack",3);
DataPacks[0].newNamespace("Test");
//download(0);

function load(){
	$(".submit").click(function(){
		download(0);
	});
	console.log("Ready");
	
}

$(document).ready(load);
$(window).on("resize", function(){
	console.log("Hi");
});





