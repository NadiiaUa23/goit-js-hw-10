import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as n,i as a}from"./assets/vendor-77e16229.js";n("#datetime-picker",{enableTime:!0,dateFormat:"Y-m-d H:i"});document.getElementById("datetime-picker");const t=document.querySelector("[data-start]");document.querySelector("[data-days]");document.querySelector("[data-hours]");document.querySelector("[data-minutes]");document.querySelector("[data-seconds]");let o;t.disabled=!0;n("#datetime-picker",{onClose:function(e,c,s){o=e[0],o<=new Date?(a.error({title:"Error",message:"plese choose a date in the future"}),t.disabled=!0):t.disabled=!1}});t.addEventListener("click",function(){if(o-new Date<=0){a.error({title:"Error",message:"plese choose a date in the future"});return}});function r(e){const u=Math.floor(e/864e5),i=Math.floor(e%864e5/36e5),l=Math.floor(e%864e5%36e5/6e4),m=Math.floor(e%864e5%36e5%6e4/1e3);return{days:u,hours:i,minutes:l,seconds:m}}console.log(r(2e3));console.log(r(14e4));console.log(r(2414e4));
//# sourceMappingURL=commonHelpers.js.map
