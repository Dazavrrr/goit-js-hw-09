const t=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]");let e=null;function a(){e?(clearInterval(e),e=null,t.disabled=!1):(t.disabled=!0,e=setInterval(o,1e3))}function r(){return`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`}function o(){const t=function(){const t=Math.floor(400*Math.random()),n=r(),e=r();return`linear-gradient(${t}deg, ${n}, ${e})`}();document.body.style.background=t}t.addEventListener("click",a),n.addEventListener("click",a);
//# sourceMappingURL=01-color-switcher.2bb8d8dd.js.map
