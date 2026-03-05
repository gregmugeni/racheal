/*
===================================
LOAD AUCTION ITEMS FROM SERVER
===================================
*/

async function loadAuctions(){

const res = await fetch("/api/auctions");
const data = await res.json();

const container = document.getElementById("auctionList");

data.forEach(item=>{

const card = document.createElement("div");
card.className="card";

card.innerHTML=`

<img src="${item.image}">

<h3>${item.name}</h3>

<p>${item.price}</p>

`;

container.appendChild(card);

});

}

loadAuctions();