!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["best-react-pagination"]=t():e["best-react-pagination"]=t()}(self,(function(){return(()=>{"use strict";var e={743:function(e,t,l){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var s=a(l(689)),n=l(40);t.default=function(e){var t=e.isDefaultStyles,l=e.itemListClass,a=e.children;return s.default.createElement("ul",{className:l,style:t?n.defaultStyles.itemListClass:void 0},a)}},175:function(e,t,l){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=l(743);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return a(s).default}})},775:function(e,t,l){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var s=a(l(689)),n=l(40);t.default=function(e){var t=e.isDefaultStyles,l=e.itemClass,a=e.itemStyle,u=e.onClick,i=e.children;return s.default.createElement("li",{className:l,style:t?n.defaultStyles[a]:void 0,onClick:u},i)}},541:function(e,t,l){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=l(775);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return a(s).default}})},989:function(e,t,l){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var s=a(l(689)),n=l(40);t.default=function(e){var t=e.isDefaultStyles,l=e.wrapperClass,a=e.children;return s.default.createElement("div",{className:l,style:t?n.defaultStyles.wrapperClass:void 0},a)}},704:function(e,t,l){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=l(989);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return a(s).default}})},40:(e,t)=>{var l;Object.defineProperty(t,"__esModule",{value:!0}),t.defaultStyles=t.defaultStylesEnum=void 0,(l=t.defaultStylesEnum||(t.defaultStylesEnum={})).wrapperClass="wrapperClass",l.itemListClass="itemListClass",l.itemClass="itemClass",l.selectedItemClass="selectedItemClass",l.disableItemClass="disableItemClass",t.defaultStyles={wrapperClass:{position:"sticky",display:"flex",justifyContent:"center",alignItems:"center",width:"100%",bottom:0,fontSize:"16px"},itemListClass:{padding:"10px 0"},itemClass:{display:"inline",cursor:"pointer",padding:"6px 12px",borderRadius:"4px",margin:"0 2px",backgroundColor:"#45c954",userSelect:"none"},selectedItemClass:{display:"inline",cursor:"pointer",padding:"6px 12px",borderRadius:"4px",margin:"0 2px",backgroundColor:"#48bbff",userSelect:"none"},disableItemClass:{display:"inline",cursor:"not-allowed",padding:"6px 12px",borderRadius:"4px",margin:"0 2px",userSelect:"none"}}},741:function(e,t,l){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Item=t.ItemList=t.Wrapper=void 0;var s=l(704);Object.defineProperty(t,"Wrapper",{enumerable:!0,get:function(){return a(s).default}});var n=l(175);Object.defineProperty(t,"ItemList",{enumerable:!0,get:function(){return a(n).default}});var u=l(541);Object.defineProperty(t,"Item",{enumerable:!0,get:function(){return a(u).default}})},876:(e,t)=>{function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var l=0,a=new Array(t);l<t;l++)a[l]=e[l];return a}Object.defineProperty(t,"__esModule",{value:!0}),t.range=void 0,t.range=function(e){return(t=Array(e).keys(),function(e){if(Array.isArray(e))return l(e)}(t)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(t)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?l(e,t):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).map((function(e){return e}));var t}},708:function(e,t,l){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var s=a(l(689)),n=l(40),u=l(741),i=l(876);t.default=function(e){var t=e.paginationStart,l=e.currentIndex,a=e.totalPages,r=e.setIndex,m=e.isDefaultStyles,f=e.wrapperClass,d=void 0===f?"":f,o=e.itemListClass,c=void 0===o?"":o,y=e.itemClass,S=void 0===y?"":y,p=e.selectedItemClass,C=void 0===p?"":p,E=e.disableItemClass,v=void 0===E?"":E,I=e.customLeftArrow,b=void 0===I?"<":I,_=e.customRightArrow,D=void 0===_?">":_,g=e.className;return a<=1?s.default.createElement(u.Wrapper,{wrapperClass:g||d,isDefaultStyles:m},s.default.createElement(u.ItemList,{itemListClass:c,isDefaultStyles:m},s.default.createElement(u.Item,{itemClass:v,itemStyle:n.defaultStylesEnum.disableItemClass,isDefaultStyles:m},b),s.default.createElement(u.Item,{itemClass:v,itemStyle:n.defaultStylesEnum.disableItemClass,isDefaultStyles:m},"1"),s.default.createElement(u.Item,{itemClass:v,itemStyle:n.defaultStylesEnum.disableItemClass,isDefaultStyles:m},D))):a>1&&a<4?s.default.createElement(u.Wrapper,{wrapperClass:g||d,isDefaultStyles:m},s.default.createElement(u.ItemList,{itemListClass:c,isDefaultStyles:m},(0,i.range)(a).map((function(e){var a=0===t?e:e+1;return l===a?s.default.createElement(u.Item,{itemClass:C,itemStyle:n.defaultStylesEnum.selectedItemClass,isDefaultStyles:m,key:e},e+1):s.default.createElement(u.Item,{itemClass:C,itemStyle:n.defaultStylesEnum.itemClass,isDefaultStyles:m,onClick:function(){return r(a)},key:e},e+1)})))):4===a?s.default.createElement(u.Wrapper,{wrapperClass:g||d,isDefaultStyles:m},s.default.createElement(u.ItemList,{itemListClass:c,isDefaultStyles:m},l>(0===t?0:1)?s.default.createElement(u.Item,{itemClass:S,itemStyle:n.defaultStylesEnum.itemClass,isDefaultStyles:m,onClick:function(){return r(l-1)}},b):s.default.createElement(u.Item,{itemClass:v,itemStyle:n.defaultStylesEnum.disableItemClass,isDefaultStyles:m},b),(0,i.range)(a).map((function(e){var a=0===t?e:e+1;return l===a?s.default.createElement(u.Item,{itemClass:C,itemStyle:n.defaultStylesEnum.selectedItemClass,isDefaultStyles:m,key:e},e+1):s.default.createElement(u.Item,{itemClass:C,itemStyle:n.defaultStylesEnum.itemClass,isDefaultStyles:m,key:e,onClick:function(){return r(a)}},e+1)})),l<(0===t?3:4)?s.default.createElement(u.Item,{itemClass:S,itemStyle:n.defaultStylesEnum.itemClass,isDefaultStyles:m,onClick:function(){return r(l+1)}},D):s.default.createElement(u.Item,{itemClass:v,itemStyle:n.defaultStylesEnum.disableItemClass,isDefaultStyles:m},D))):s.default.createElement(u.Wrapper,{wrapperClass:g||d,isDefaultStyles:m},s.default.createElement(u.ItemList,{itemListClass:c,isDefaultStyles:m},l>(0===t?0:1)?s.default.createElement(u.Item,{itemClass:S,itemStyle:n.defaultStylesEnum.itemClass,isDefaultStyles:m,onClick:function(){return r(l-1)}},b):s.default.createElement(u.Item,{itemClass:v,itemStyle:n.defaultStylesEnum.disableItemClass,isDefaultStyles:m},b),l>(0==t?2:3)?s.default.createElement(u.Item,{itemClass:S,itemStyle:n.defaultStylesEnum.itemClass,isDefaultStyles:m,onClick:function(){return r(0===t?0:1)}},"1"):null,l<(0===t?3:4)?(0,i.range)(4).map((function(e){var a=0===t?e:e+1;return l===a?s.default.createElement(u.Item,{itemClass:C,itemStyle:n.defaultStylesEnum.selectedItemClass,isDefaultStyles:m,key:e},e+1):s.default.createElement(u.Item,{itemClass:S,itemStyle:n.defaultStylesEnum.itemClass,isDefaultStyles:m,onClick:function(){return r(a)},key:e},e+1)})):null,l>(0===t?2:3)?s.default.createElement(u.Item,{itemClass:v,itemStyle:n.defaultStylesEnum.disableItemClass,isDefaultStyles:m},"..."):null,l>(0===t?2:3)&&(0===t?l:l-1)<a?s.default.createElement(s.default.Fragment,null,l===(0===t?a-2:a-1)&&s.default.createElement(u.Item,{itemClass:S,itemStyle:n.defaultStylesEnum.itemClass,isDefaultStyles:m,onClick:function(){return r(0===t?a-4:a-3)}},a-3),l===(0===t?a-1:a)&&s.default.createElement(s.default.Fragment,null,s.default.createElement(u.Item,{itemClass:S,itemStyle:n.defaultStylesEnum.itemClass,isDefaultStyles:m,onClick:function(){return r(0===t?a-4:a-3)}},a-3),s.default.createElement(u.Item,{itemClass:S,itemStyle:n.defaultStylesEnum.itemClass,isDefaultStyles:m,onClick:function(){return r(0===t?a-3:a-2)}},a-2)),s.default.createElement(u.Item,{itemClass:S,itemStyle:n.defaultStylesEnum.itemClass,isDefaultStyles:m,onClick:function(){return r(l-1)}},0===t?l:l-1),s.default.createElement(u.Item,{itemClass:C,itemStyle:n.defaultStylesEnum.selectedItemClass,isDefaultStyles:m},0===t?l+1:l),l<(0===t?a-1:a)?s.default.createElement(u.Item,{itemClass:S,itemStyle:n.defaultStylesEnum.itemClass,isDefaultStyles:m,onClick:function(){return r(l+1)}},0===t?l+2:l+1):null):null,l<(0===t?a-3:a-2)?s.default.createElement(u.Item,{itemClass:v,itemStyle:n.defaultStylesEnum.disableItemClass,isDefaultStyles:m},"..."):null,l<(0===t?a-2:a-1)?s.default.createElement(u.Item,{itemClass:S,itemStyle:n.defaultStylesEnum.itemClass,isDefaultStyles:m,onClick:function(){return r(0===t?a-1:a)}},a):null,(0===t?l+1:l)<a?s.default.createElement(u.Item,{itemClass:S,itemStyle:n.defaultStylesEnum.itemClass,isDefaultStyles:m,onClick:function(){return r(l+1)}},D):s.default.createElement(u.Item,{itemClass:v,itemStyle:n.defaultStylesEnum.disableItemClass,isDefaultStyles:m},D)))}},689:e=>{e.exports=require("react")}},t={};return function l(a){var s=t[a];if(void 0!==s)return s.exports;var n=t[a]={exports:{}};return e[a].call(n.exports,n,n.exports,l),n.exports}(708)})()}));