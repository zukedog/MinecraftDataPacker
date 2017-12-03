var nsFolders = ["functions","loot_tables","structures","advancements","recipes"];
var DataPacks=[];

function download(adress){
	DataPacks[adress].zip.generateAsync({type:"blob"})
	.then(function(content) {
		// see FileSaver.js
		saveAs(content, DataPacks[adress].name+".zip");
	});
}



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
		var ns = this.zip.folder("/data/"+nsName);
		for(var i=0; i<nsFolders.length; i++){
			ns.folder(nsFolders[i]);
		}
	};
}


function load(){
	$(".submit").click(function(){
		download(0);
	});
	console.log("Ready");
	
	
//resize testing
	var m_pos;
	var dv_width;
	function resize(e){
		var dx = m_pos - e.x + dv_width;
		$("#right_panel").width(dx);
	}
	
	var resize_el = document.getElementById("resize");
	resize_el.addEventListener("mousedown",function(e){
		m_pos = e.x;
		dv_width = $("#right_panel").width();
		document.addEventListener("mousemove", resize, false);
	}, false);
	document.addEventListener("mouseup", function(){
		document.removeEventListener("mousemove", resize, false);
	}, false);
//end resize testing
	
}

$(document).ready(load);


$(window).on("resize", function(){
	console.log("Resized");

	
});



newDataPack("Test","An awesome datapack",3);
DataPacks[0].newNamespace("Test");
//download(0);




