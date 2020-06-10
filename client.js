const socket = io("http://localhost:8000");
let choice = "";
let player = "1";

let multi = false;

p1 = new Array(9);
p2 = new Array(9);

let exists = new Array(9);

let activateAi = false;

let count = 0;

let Anotherid = null;

let open = true;

let playerProhibition = null;

//Listening event
socket.on("move", data=>{

		open = true;
		playerProhibition = data.player;
		document.getElementById(data.move).click();
		

})



//to Change the player
function changePlayer(p, id){
	let i = parseInt(id)
	if (p=="1"){
		document.getElementById("player").innerHTML = "player2: O"
		exists[parseInt(id)] = id;
		p1[parseInt(id)] = true;

	}

	else{
		document.getElementById("player").innerHTML = "player1: X";
		exists[parseInt(id)] = id;
		p2[parseInt(id)] = true;
		
	}
}


// After clicking on box
function selectBox(clicked_id){
if( (!(clicked_id in exists)) && open){
	if(player == "1"){

		
			document.getElementById(clicked_id).innerHTML = "<h2>X</h2>";
			changePlayer(player, clicked_id)
			player = "2";

			if(multi && playerProhibition!=2){
				socket.emit("clicked_move", {move:clicked_id, id:socket.id, player:2});
				open = false;
			}

			if(activateAi && player == "2"){
				let a = 0;
				let b = 8;

				while(count<4){

					let num =Math.round(a+((b-a)* Math.random()));
					let n =num.toString();


					if(!(n in exists)){
						console.log("clicked");
						document.getElementById(num).click();
						
						break;
					}


				}

				count = count+1;
			}
			
	}

	else{

			document.getElementById(clicked_id).innerHTML = "<h2>O</h2>";
			console.log(typeof(clicked_id))
			changePlayer(player, clicked_id)
			player = "1";
			if(multi && playerProhibition!=1){

				socket.emit("clicked_move", {move:clicked_id, id:socket.id, player:1});
				open = false;
			}



			

	}
}
	

	//Winning conditions 
	if((p1[0] && p1[1] && p1[2]) || (p1[3] && p1[4] && p1[5]) || (p1[6] && p1[7] && p1[8]) || (p1[0] && p1[3] && p1[6]) || (p1[1] && p1[4] && p1[7]) || (p1[2] && p1[5] && p1[8]) || (p1[0] && p1[4] && p1[8]) || (p1[2] && p1[4] && p1[6])){

		document.getElementById("ai").innerHTML = "player1 wins";
	}

	if((p2[0] && p2[1] && p2[2]) || (p2[3] && p2[4] && p2[5]) || (p2[6] && p2[7] && p2[8]) || (p2[0] && p2[3] && p2[6]) || (p2[1] && p2[4] && p2[7]) || (p2[2] && p2[5] && p2[8]) || (p2[0] && p2[4] && p2[8]) || (p2[2] && p2[4] && p2[6])){

		document.getElementById("ai").innerHTML = "player2 wins";
	}


}

function playWithAi(){

	for(let i=0; i<9; i++){

		document.getElementById(i).innerHTML = "";
	}

	exists = new Array(9);

	document.getElementById("ai").innerHTML = "Now player2 is ai"
	activateAi = true;

}



function reset(){
	location.reload();

}

function multiplayer(){

	multi = true;
	document.getElementById("connectMulti").innerHTML = `Your code: ${socket.id}`

}

function connectMulti(){

	multi = true;
	document.getElementById("connectMulti").innerHTML = "<input type='text' id='input1'><button type='submit'>submit</button>";
}


const form  = document.getElementById("connectMulti");

form.addEventListener("submit", event=>{

	event.preventDefault();
	const id = document.getElementById("input1").value;
	multi = true;
	Anotherid = id;

})





