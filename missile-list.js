// ==UserScript==
// @name         GeoFS GMRP Missile List
// @namespace    https://github.com/Suhaas-code/geo-fs-missile-list/blob/main/missile-list.js
// @author       thesupremeguy
// @version      v1.8
// @description  A draggable box containing the GMRP missile list.
// @icon         https://www.google.com/s2/favicons?sz=64&domain=geo-fs.com
// @match        https://www.geo-fs.com/geofs.php*
// @grant        none
// ==/UserScript==

(function () {
"use strict";

/* ---------- Customization ---------- */

// 0 = opaque, 10 = fully transparent
const transparency = 4;

// Change this if you want a different logo
const LOGO = "https://static.wikia.nocookie.net/geofsaviation/images/8/8d/Roundel_of_the_United_Arab_Emirates.svg.png";


let data = [
["aa10ea","CHAFF"],["aa10r","CHAFF"],["aa12","CHAFF"],["aa9","CHAFF"],["aam4","CHAFF"],
["adder","CHAFF"],["aim120","CHAFF"],["aim174b","CHAFF"],["aim7","CHAFF"],["aim9c","CHAFF"],
["alamo","CHAFF"],["aleniaaspide","CHAFF"],["amraam","CHAFF"],["amos","CHAFF"],["aspide","CHAFF"],
["astra","CHAFF"],["astramk1","CHAFF"],
["derby","CHAFF"],["fakour90","CHAFF"],["gokdogan","CHAFF"],["iz380","CHAFF"],
["k13r","CHAFF"],["aa2d","CHAFF"],["atoll","CHAFF"],
["matrar511","CHAFF"],["matrasuper530","CHAFF"],["mbdamicaem","CHAFF"],
["meteor","CHAFF"],["mica-em","CHAFF"],["micaem","CHAFF"],
["peregrine","CHAFF"],["pl11","CHAFF"],["pl12","CHAFF"],["pl15","CHAFF"],
["r23apex","CHAFF"],["aa7","CHAFF"],["apex","CHAFF"],
["r27ea","CHAFF"],["r27r","CHAFF"],
["r33","CHAFF"],["r37","CHAFF"],["r511","CHAFF"],["r77","CHAFF"],
["r40rd","CHAFF"],["aa6","CHAFF"],["acrid","CHAFF"],
["rdarter","CHAFF"],["sparrow","CHAFF"],
["skysword2","CHAFF"],["super530","CHAFF"],["tc2","CHAFF"],

["aa10t","FLARE"],["aa8","FLARE"],["aam3","FLARE"],["aim132","FLARE"],["aim9","FLARE"],
["aphid","FLARE"],["archer","FLARE"],["asraam","FLARE"],["bozdogan","FLARE"],["irist","FLARE"],
["maa1a","FLARE"],["maa1b","FLARE"],["magic2","FLARE"],["matramagic2","FLARE"],
["matrar510","FLARE"],["matrar530","FLARE"],["mbdamicair","FLARE"],["merlin","FLARE"],
["mica-ir","FLARE"],["micair","FLARE"],
["piranha","FLARE"],["pl9","FLARE"],
["python5","FLARE"],["rafaelpython5","FLARE"],
["r27t","FLARE"],["r510","FLARE"],["r530","FLARE"],
["r60","FLARE"],["r73","FLARE"],["r73archer","FLARE"],
["sidewinder","FLARE"],["skysword1","FLARE"],["tc1","FLARE"],
["v3eadarter","FLARE"]
];

const opacity = Math.max(0, Math.min(10, transparency));
const bgOpacity = 1 - (opacity / 10);


/* ---------- Sorting ---------- */

function getSortedData() {
    return data.slice().sort((a, b) =>
        a[0].toLowerCase().localeCompare(b[0].toLowerCase())
    );
}

function renderList() {
    const sorted = getSortedData();
    return sorted.map(([m, c]) =>
        `<span class="${c}">${m}</span>`
    ).join(" ");
}


/* ---------- Box ---------- */

const box = document.createElement("div");
box.id = "cmDragBox";


/* ---------- Intro Message ---------- */

box.innerHTML = `
<div id="cmInfo">
    <img src="${LOGO}" id="cmLogo">
    <span class="FLARE">red is flare</span><br>
    <span class="CHAFF">blue is chaff</span><br>
    right-control to hide the box<br>
    edit transparency in script settings
</div>
`;

setTimeout(() => {
    box.innerHTML = renderList();
}, 5000);


/* ---------- Style ---------- */

const style = document.createElement("style");
style.textContent = `
#cmDragBox {
    position: fixed;
    top: 40px;
    right: 40px;
    background: rgba(0,0,0,${bgOpacity});
    color: white;
    padding: 7px 10px;
    font-size: 12.5px;
    border-radius: 6px;
    width: 280px;
    line-height: 16px;
    z-index: 999999;
    cursor: move;
    user-select: none;
}

#cmDragBox span {
    margin-right: 6px;
    font-weight: 600;
    white-space: nowrap;
}

.CHAFF { color: #4ab3ff; }
.FLARE { color: #ff5b5b; }

#cmInfo {
    font-weight: 600;
    line-height: 18px;
    text-align: center;
}

#cmLogo {
    width: 42px;
    display: block;
    margin: 0 auto 6px auto;
}
`;

document.body.appendChild(style);
document.body.appendChild(box);


/* ---------- Dragging ---------- */

let isDown = false;
let offsetX = 0;
let offsetY = 0;

box.addEventListener("mousedown", (e) => {
    isDown = true;
    offsetX = e.clientX - box.offsetLeft;
    offsetY = e.clientY - box.offsetTop;
    e.preventDefault();
});

document.addEventListener("mouseup", () => {
    isDown = false;
});

document.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    box.style.left = (e.clientX - offsetX) + "px";
    box.style.top = (e.clientY - offsetY) + "px";
    box.style.right = "auto";
});


/* ---------- Hide Toggle ---------- */

document.addEventListener("keydown", (e) => {
    if (e.code === "ControlRight") {
        box.style.display = box.style.display === "none" ? "block" : "none";
    }
});

})();
