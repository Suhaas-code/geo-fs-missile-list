// ==UserScript==
// @name         GeoFS GMRP Missile List
// @author         thesupremeguy
// @version         v1.3
// @description         A draggable box containing the GMRP missile list, updated to 2nd March 2026.
// @icon         https://www.google.com/s2/favicons?sz=64&domain=geo-fs.com
// @match        https://www.geo-fs.com/geofs.php*
// @grant        none
// ==/UserScript==


(function () {
    "use strict";

    let data = [
        ["aa10ea","CHAFF"],["aa10r","CHAFF"],["aa12","CHAFF"],["aa9","CHAFF"],["aam4","CHAFF"],
        ["adder","CHAFF"],["aim120","CHAFF"],["aim7","CHAFF"],["aim9c","CHAFF"],
        ["alamo","CHAFF"],["amraam","CHAFF"],["amos","CHAFF"],["astramk1","CHAFF"],["astra","CHAFF"],
        ["aspide","CHAFF"],["aleniaaspide","CHAFF"],
        ["derby","CHAFF"],["gokdogan","CHAFF"],["iz380","CHAFF"],
        ["k13r","CHAFF"],["aa2d","CHAFF"],["atoll","CHAFF"],
        ["matrar511","CHAFF"],["matrasuper530","CHAFF"],["mbdamicaem","CHAFF"],
        ["meteor","CHAFF"],["mica-em","CHAFF"],["micaem","CHAFF"],
        ["peregrine","CHAFF"],["pl11","CHAFF"],["pl15","CHAFF"],
        ["r23r","CHAFF"],["aa7","CHAFF"],["apex","CHAFF"],
        ["r27ea","CHAFF"],["r27r","CHAFF"],
        ["r33","CHAFF"],["r511","CHAFF"],["r77","CHAFF"],
        ["r40rd","CHAFF"],["aa6","CHAFF"],["acrid","CHAFF"],
        ["rdarter","CHAFF"],["sparrow","CHAFF"],
        ["skysword2","CHAFF"],["super530","CHAFF"],["tc2","CHAFF"],

        ["aa10t","FLARE"],["aa8","FLARE"],["aam3","FLARE"],["aim132","FLARE"],["aim9","FLARE"],
        ["aphid","FLARE"],["asraam","FLARE"],["bozdogan","FLARE"],["irist","FLARE"],
        ["maa1a","FLARE"],["maa1b","FLARE"],["magic2","FLARE"],["matramagic2","FLARE"],
        ["matrar510","FLARE"],["matrar530","FLARE"],["mbdamicair","FLARE"],["merlin","FLARE"],
        ["micair","FLARE"],["mica-ir","FLARE"],["piranha","FLARE"],["pl9","FLARE"],
        ["python5","FLARE"],["rafaelpython5","FLARE"],
        ["r27t","FLARE"],["r510","FLARE"],["r530","FLARE"],
        ["r60","FLARE"],["sidewinder","FLARE"],["skysword1","FLARE"],["tc1","FLARE"],
        ["r73","FLARE"],["aa11","FLARE"],["archer","FLARE"]
    ];

    data.sort((a, b) => a[0].localeCompare(b[0]));

    const box = document.createElement("div");
    box.id = "cmDragBox";
    box.innerHTML = data.map(([m, c]) =>
        `<span class="${c}">${m}</span>`
    ).join(" ");

    const style = document.createElement("style");
    style.textContent = `
        #cmDragBox {
            position: fixed;
            bottom: 40px;
            right: 40px;
            background: #000000;   /* opaque black */
            color: white;
            padding: 7px 10px;
            font-size: 12.5px;     /* slightly larger */
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
    `;

    document.body.appendChild(style);
    document.body.appendChild(box);

    // --- Drag logic ---
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
        box.style.bottom = "auto";
        box.style.right = "auto";
    });
})();
