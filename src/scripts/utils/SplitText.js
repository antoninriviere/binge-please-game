/* eslint-disable */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;!function(e){"use strict";var t=e.GreenSockGlobals||e,i=function(e){var i,n=e.split("."),s=t;for(i=0;i<n.length;i++)s[n[i]]=s=s[n[i]]||{};return s},n=i("com.greensock.utils"),s=function(e){var t=e.nodeType,i="";if(1===t||9===t||11===t){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)i+=s(e)}else if(3===t||4===t)return e.nodeValue;return i},r=document,l=r.defaultView?r.defaultView.getComputedStyle:function(){},o=/([A-Z])/g,d=function(e,t,i,n){var s;return(i=i||l(e,null))?(e=i.getPropertyValue(t.replace(o,"-$1").toLowerCase()),s=e||i.length?e:i[t]):e.currentStyle&&(i=e.currentStyle,s=i[t]),n?s:parseInt(s,10)||0},h=function(e){return e.length&&e[0]&&(e[0].nodeType&&e[0].style&&!e.nodeType||e[0].length&&e[0][0])?!0:!1},p=function(e){var t,i,n,s=[],r=e.length;for(t=0;r>t;t++)if(i=e[t],h(i))for(n=i.length,n=0;n<i.length;n++)s.push(i[n]);else s.push(i);return s},a=")eefec303079ad17405c",f=/(?:<br>|<br\/>|<br \/>)/gi,u=r.all&&!r.addEventListener,c="<div style='position:relative;display:inline-block;"+(u?"*display:inline;*zoom:1;'":"'"),g=function(e){e=e||"";var t=-1!==e.indexOf("++"),i=1;return t&&(e=e.split("++").join("")),function(){return c+(e?" class='"+e+(t?i++:"")+"'>":">")}},y=n.SplitText=t.SplitText=function(e,t){if("string"==typeof e&&(e=y.selector(e)),!e)throw"cannot split a null element.";this.elements=h(e)?p(e):[e],this.chars=[],this.words=[],this.lines=[],this._originals=[],this.vars=t||{},this.split(t)},x=function(e,t,i){var n=e.nodeType;if(1===n||9===n||11===n)for(e=e.firstChild;e;e=e.nextSibling)x(e,t,i);else(3===n||4===n)&&(e.nodeValue=e.nodeValue.split(t).join(i))},m=function(e,t){for(var i=t.length;--i>-1;)e.push(t[i])},v=function(e,t,i,n,o){f.test(e.innerHTML)&&(e.innerHTML=e.innerHTML.replace(f,a));var h,p,u,c,y,v,T,b,_,w,C,S,L,H,N=s(e),B=t.type||t.split||"chars,words,lines",A=-1!==B.indexOf("lines")?[]:null,M=-1!==B.indexOf("words"),W=-1!==B.indexOf("chars"),R="absolute"===t.position||t.absolute===!0,j=R?"&#173; ":" ",E=-999,k=l(e),O=d(e,"paddingLeft",k),V=d(e,"borderBottomWidth",k)+d(e,"borderTopWidth",k),G=d(e,"borderLeftWidth",k)+d(e,"borderRightWidth",k),$=d(e,"paddingTop",k)+d(e,"paddingBottom",k),q=d(e,"paddingLeft",k)+d(e,"paddingRight",k),I=d(e,"textAlign",k,!0),P=e.clientHeight,Q=e.clientWidth,z="</div>",Z=g(t.wordsClass),D=g(t.charsClass),F=-1!==(t.linesClass||"").indexOf("++"),J=t.linesClass,K=-1!==N.indexOf("<"),U=!0,X=[],Y=[],et=[];for(F&&(J=J.split("++").join("")),K&&(N=N.split("<").join("{{LT}}")),h=N.length,c=Z(),y=0;h>y;y++)if(T=N.charAt(y),")"===T&&N.substr(y,20)===a)c+=(U?z:"")+"<BR/>",U=!1,y!==h-20&&N.substr(y+20,20)!==a&&(c+=" "+Z(),U=!0),y+=19;else if(" "===T&&" "!==N.charAt(y-1)&&y!==h-1&&N.substr(y-20,20)!==a){for(c+=U?z:"",U=!1;" "===N.charAt(y+1);)c+=j,y++;(")"!==N.charAt(y+1)||N.substr(y+1,20)!==a)&&(c+=j+Z(),U=!0)}else"{"===T&&"{{LT}}"===N.substr(y,6)?(c+=W?D()+"{{LT}}</div>":"{{LT}}",y+=5):c+=W&&" "!==T?D()+T+"</div>":T;for(e.innerHTML=c+(U?z:""),K&&x(e,"{{LT}}","<"),v=e.getElementsByTagName("*"),h=v.length,b=[],y=0;h>y;y++)b[y]=v[y];if(A||R)for(y=0;h>y;y++)_=b[y],u=_.parentNode===e,(u||R||W&&!M)&&(w=_.offsetTop,A&&u&&w!==E&&"BR"!==_.nodeName&&(p=[],A.push(p),E=w),R&&(_._x=_.offsetLeft,_._y=w,_._w=_.offsetWidth,_._h=_.offsetHeight),A&&(M!==u&&W||(p.push(_),_._x-=O),u&&y&&(b[y-1]._wordEnd=!0),"BR"===_.nodeName&&_.nextSibling&&"BR"===_.nextSibling.nodeName&&A.push([])));for(y=0;h>y;y++)_=b[y],u=_.parentNode===e,"BR"!==_.nodeName?(R&&(S=_.style,M||u||(_._x+=_.parentNode._x,_._y+=_.parentNode._y),S.left=_._x+"px",S.top=_._y+"px",S.position="absolute",S.display="block",S.width=_._w+1+"px",S.height=_._h+"px"),M?u&&""!==_.innerHTML?Y.push(_):W&&X.push(_):u?(e.removeChild(_),b.splice(y--,1),h--):!u&&W&&(w=!A&&!R&&_.nextSibling,e.appendChild(_),w||e.appendChild(r.createTextNode(" ")),X.push(_))):A||R?(e.removeChild(_),b.splice(y--,1),h--):M||e.appendChild(_);if(A){for(R&&(C=r.createElement("div"),e.appendChild(C),L=C.offsetWidth+"px",w=C.offsetParent===e?0:e.offsetLeft,e.removeChild(C)),S=e.style.cssText,e.style.cssText="display:none;";e.firstChild;)e.removeChild(e.firstChild);for(H=!R||!M&&!W,y=0;y<A.length;y++){for(p=A[y],C=r.createElement("div"),C.style.cssText="display:block;text-align:"+I+";position:"+(R?"absolute;":"relative;"),J&&(C.className=J+(F?y+1:"")),et.push(C),h=p.length,v=0;h>v;v++)"BR"!==p[v].nodeName&&(_=p[v],C.appendChild(_),H&&(_._wordEnd||M)&&C.appendChild(r.createTextNode(" ")),R&&(0===v&&(C.style.top=_._y+"px",C.style.left=O+w+"px"),_.style.top="0px",w&&(_.style.left=_._x-w+"px")));0===h&&(C.innerHTML="&nbsp;"),M||W||(C.innerHTML=s(C).split(String.fromCharCode(160)).join(" ")),R&&(C.style.width=L,C.style.height=_._h+"px"),e.appendChild(C)}e.style.cssText=S}R&&(P>e.clientHeight&&(e.style.height=P-$+"px",e.clientHeight<P&&(e.style.height=P+V+"px")),Q>e.clientWidth&&(e.style.width=Q-q+"px",e.clientWidth<Q&&(e.style.width=Q+G+"px"))),m(i,X),m(n,Y),m(o,et)},T=y.prototype;T.split=function(e){this.isSplit&&this.revert(),this.vars=e||this.vars,this._originals.length=this.chars.length=this.words.length=this.lines.length=0;for(var t=this.elements.length;--t>-1;)this._originals[t]=this.elements[t].innerHTML,v(this.elements[t],this.vars,this.chars,this.words,this.lines);return this.chars.reverse(),this.words.reverse(),this.lines.reverse(),this.isSplit=!0,this},T.revert=function(){if(!this._originals)throw"revert() call wasn't scoped properly.";for(var e=this._originals.length;--e>-1;)this.elements[e].innerHTML=this._originals[e];return this.chars=[],this.words=[],this.lines=[],this.isSplit=!1,this},y.selector=e.$||e.jQuery||function(t){var i=e.$||e.jQuery;return i?(y.selector=i,i(t)):"undefined"==typeof document?t:document.querySelectorAll?document.querySelectorAll(t):document.getElementById("#"===t.charAt(0)?t.substr(1):t)},y.version="0.3.4"}(_gsScope),function(e){"use strict";var t=function(){return(_gsScope.GreenSockGlobals||_gsScope)[e]};"function"==typeof define&&define.amd?define([],t):"undefined"!=typeof module&&module.exports&&(module.exports=t())}("SplitText");
/* eslint-enable */