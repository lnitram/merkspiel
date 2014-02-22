/* *
 * Merkspiel
 * (c) 2014, Martin Leuschner
 * https://github.com/lnitram/merkspiel
 *  */

var back="img/back.jpg";
var image_path = "img/";
var gesamt = 15;
var warten = 1000;

var karten = Array();
var karte1 = null;
var karte2 = null;
var weiter = true;
var gefunden = 0;
var versuche = 0;

function initSpielfeld() {
  var spielfeld = document.getElementById("merkspiel");
  clearSpielfeld(spielfeld);
  mischeKarten(gesamt);
  gefunden = 0;
  versuche = 0;
  weiter = true;

  for (var i = 0; i<(gesamt*2);i++) {
    var karte = document.createElement("img");
    karte.onclick = kartenKlick;

    var src = document.createAttribute("src");
    src.nodeValue = back;

    var name = document.createAttribute("name");
    name.nodeValue=karten[i];

    karte.setAttributeNode(src);
    karte.setAttributeNode(name);
    spielfeld.appendChild(karte);
  }
  updateStatus();
}


function clearSpielfeld(spielfeld) {
  spielfeld.innerHTML = "";
}

function kartenKlick() {
  if (!weiter) return;
  this.src=image_path + this.name;
  if(karte1 == null) {
    karte1 = this;
    karte1.onclick="";
  } else {
    karte2 = this;
    karte2.onclick="";
    weiter = false;
    checkKarten();
  }
}

function checkKarten() {
  versuche++;
  if(karte1.name == karte2.name) {
    gefunden++;
    weiter = true;
    karte1 = null;
    karte2 = null;
  } else {
    karte1.onclick=kartenKlick;
    karte2.onclick=kartenKlick;
    window.setTimeout("umdrehen()",warten)
  }
  updateStatus();
}

function umdrehen() {
    karte1.src=back;
    karte2.src=back;
    karte1 = null;
    karte2 = null;
    weiter = true;
}

function updateStatus() {
  var statusEl = document.getElementById("status");
  statusEl.innerHTML = "Gefunden: " + gefunden + "/" + gesamt;
  var versuchEl = document.getElementById("versuch");
  versuchEl.innerHTML = "Versuche: " + versuche;
  if(gefunden == gesamt) alert("Glückwunsch! Geschafft!");
}

function mischeKarten(anzahl) {
   karten=Array();
   var gefunden = false;
   for (var i=0;i<anzahl;i++) {
     filename = "karte" + (i+1) + ".jpg";
     while (!gefunden) {
       var pos = Math.round(((gesamt*2)-1)*(Math.random()));
       if(!karten[pos]) gefunden = true;
     }
     karten[pos] = filename;
     gefunden = false;
     while (!gefunden) {
       var pos = Math.round(((gesamt*2)-1)*(Math.random()));
       if(!karten[pos]) gefunden = true;
     }
     karten[pos] = filename;
     gefunden = false;
   }
}
