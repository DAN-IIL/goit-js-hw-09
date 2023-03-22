const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let a;function o(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}t.addEventListener("click",(()=>{a=setInterval(o,1e3)})),e.addEventListener("click",(()=>{a=clearInterval(a)}));
//# sourceMappingURL=01-color-switcher.0410baee.js.map
