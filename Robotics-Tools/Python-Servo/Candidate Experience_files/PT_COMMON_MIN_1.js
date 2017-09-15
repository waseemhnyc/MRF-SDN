

var gFocusId = null;var bLocalModal = false;function PT_createStandardObjects()
{
 browserInfoObj2 = new PT_browserInfo();  browserInfoObj2.init(); ptCommonObj2 = new PT_common();  ptConsole2 = new PT_console();  ptRC2 = new PT_RC();  ptLongEditCounter = new PT_LONGEDIT_COUNTER(); }

function PT_console()
{
this.el = null;this.enabled = false;this.activated = false;}

PT_console.prototype = {
isActive: function() {
return this.activated;},
isEnabled:function(){
if (this.el && this.enabled) return true;return false;},
enable:function(){
if (this.isEnabled()) return;this.enabled = true;this.el = document.getElementById("pt_console");var oBody = document.body;oObj = document.createElement("div");oObj.setAttribute("id", "pt_console");oBody.appendChild(oObj);this.el = document.getElementById("pt_console");this.el.consoleModal=this;this.el.innerHTML="<input type=button id='COPYCONSOLE' value='Copy' onclick='ptConsole2.copy();' alt='copy to clipboard' title='copy to clipboard'><input type=button id='CLEARCONSOLE' onclick='ptConsole2.clear();' value='Clear' alt='clear console' title='clear console'><input type=button id='HIDECONSOLE' onclick='ptConsole2.hide();' value='Hide' alt='hide console' title='hide console'><input type=button id='CLOSECONSOLE' onclick='ptConsole2.deactive();' value='Close' alt='close console' title='close console'>";},
active:function(){
if (!this.enabled) return false;if (!this.el)
{
this.el = document.getElementById("pt_console");if (!this.el) return null;}
if (this.el.innerHTML == "")
 this.el.innerHTML="<input type=button id='COPYCONSOLE' value='Copy' onclick='ptConsole2.copy();' alt='copy to clipboard' title='copy to clipboard'><input type=button id='CLEARCONSOLE' onclick='ptConsole2.clear();' value='Clear' alt='clear console' title='clear console'><input type=button id='HIDECONSOLE' onclick='ptConsole2.hide();' value='Hide' alt='hide console' title='hide console'><input type=button id='CLOSECONSOLE' onclick='ptConsole2.deactive();' value='Close' alt='close console' title='close console'>";this.show();this.activated = true;},
deactive:function(){
if (!this.enabled) return false;this.hide();if (this.el)
 this.el.innerHtml = "";this.el = null;this.activated = false;},
show:function(){
if (!this.el) return false;if (isFModeLayout()) 
 removeHide(this.el);else {
 this.el.style.zIndex = 99999; this.el.style.display = "block"; this.el.style.top = 75 + 'px'; this.el.style.left = (ptCommonObj2.getViewportWidth(window) - this.el.clientWidth - 10) + 'px'; }
},
hide:function(){
if (!this.el) return false;if (isFModeLayout())
 addHide(this.el);else
 this.el.style.display = "none";},

copy:function(){
if (!this.el) return false;var txt='';for (var i=0; i<this.el.childNodes.length; i++) {
 var node=this.el.childNodes[i]; if (node.nodeName.toLowerCase() == 'div')
 {
 if (node.lastChild.nodeName.toLowerCase() == 'textarea')
 txt=txt+node.lastChild.value+'\n\n'; }
 }
if (browserInfoObj2.isIE)
 clipboardData.setData("Text", txt);else 
 this.append(txt);},
clear:function(){
if (!this.el) return false;while(this.el.lastChild && this.el.lastChild.type!='button') {
this.el.removeChild(this.el.lastChild);}
},
append:function(msg){
if (!this.el) return false;var txtNode=document.createElement('textarea');txtNode.className='debugtext';txtNode.readOnly = 'true';txtNode.value=msg;var domEl=document.createElement('div');domEl.appendChild(txtNode);domEl.className='debugtext';this.el.appendChild(domEl);}
} 

function PT_browserInfo()
{
 this.browser='';  this.isOpera=false;  this.isIE=false;  this.isFF=false;  this.isNetscape;  this.isMozilla = false; this.isSafari = false; this.version='';  this.isMacOS=false; this.isSafari2x = false; this.isiPad = false; this.isiOS5 = false;}

PT_browserInfo.prototype = {
init:function(){
this.browser = navigator.userAgent.toLowerCase();this.isOpera = (this.browser.toLowerCase().indexOf('opera')>=0)?true:false;this.isFF = (this.browser.toLowerCase().indexOf('firefox')>=0)?true:false;this.isNetscape = (this.browser.toLowerCase().indexOf('netscape')>=0)?true:false;this.isIE = ((this.browser.toLowerCase().indexOf('msie')>=0)||(this.browser.toLowerCase().indexOf('trident')>=0))?true:false; if (this.isIE) {
 if (this.browser.toLowerCase().indexOf('msie')>=0) 
 this.version = navigator.appVersion.replace(/.*?MSIE (\d\.\d).*/g,'$1')/1; else if (this.browser.toLowerCase().indexOf('trident/7.0') >= 0) 
 this.version = 11;}
this.isSafari = /webkit/.test(this.browser);this.isMozilla = /mozilla/.test(this.browser) && !/(compatible|webkit)/.test(this.browser);this.isSafari2x = this.Safari2x(this.browser);this.isiPad = (this.browser.toLowerCase().indexOf('ipad')>=0)?true:(this.browser.toLowerCase().indexOf('iphone')>=0)?true:false;this.isiOS5 = /os 5/i.test(this.browser);},




Safari2x : function (userAgent) {
 if (userAgent == null)
 return false; var bSafari2x = false; var WEBKITBUILD412 = 412.0;  var WEBKITBUILD419DOT3 = 419.3;  var WEBKITSTR = "applewebkit/";  var HTMLSTR = " (khtml";  var webKitBuild = 0;  var i = userAgent.toLowerCase().indexOf(WEBKITSTR); var j = userAgent.toLowerCase().indexOf(HTMLSTR); if (i >= 0 && j >= 0) {
 var b = i + WEBKITSTR.length;  var webKitBuildLen = j - b;  webKitBuild = userAgent.substring(b, b + webKitBuildLen);  if (webKitBuild >= WEBKITBUILD412 && webKitBuild <= WEBKITBUILD419DOT3)
 bSafari2x = true; }
 return bSafari2x;}
} 

function printThis(){
window.print();}


function PT_common()
{}

PT_common.prototype = {


isHTMLTemplate : typeof(bPSHTMLtemplate) !== "undefined" && bPSHTMLtemplate,

 
cancelEvent : function()
 {
 return false; },


 getViewportHeight: function(oWin) {
 if (!oWin) oWin = window; if (oWin.innerHeight != oWin.undefined)
 return oWin.innerHeight; if (oWin.document.compatMode == 'CSS1Compat')
 return oWin.document.documentElement.clientHeight; if (oWin.document.body)
 return oWin.document.body.clientHeight; return oWin.undefined; },
 
 getViewportWidth: function(oWin) {

 if (!oWin) oWin = window; if (oWin.innerWidth != oWin.undefined)
 return oWin.innerWidth; if (oWin.document.compatMode == 'CSS1Compat')
 return oWin.document.documentElement.clientWidth; if (oWin.document.body)
 return oWin.document.body.clientWidth; return oWin.undefined; },


getMouseCoords : function(ev)
{
 
 
 if('ltr'=='rtl' && browserInfoObj2.isIE)
 {
 var scLeft= parseInt((document.body.scrollWidth - document.body.clientWidth- document.body.scrollLeft),10); var newX=ev.clientX; if (scLeft > 0 && ev.clientX>=scLeft)
 newX = ev.clientX - scLeft;  if(ev.pageX || ev.pageY)
 return {x:newX, y:ev.pageY}; else
 return {x:newX, y:ev.clientY + document.body.scrollTop - document.body.clientTop}; }

 if(ev.pageX || ev.pageY)
 return {x:ev.pageX, y:ev.pageY}; return { x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, y:ev.clientY + document.body.scrollTop - document.body.clientTop };},


getMouseOffset : function(target, ev)
{
 ev = ev || window.event;  var docPos = this.getPosition(target); var mousePos = this.getMouseCoords(ev); return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};},




getPosition2 : function(e, formName)
{
 var left = 0; var top = 0; var oParent=null; var SGRIDLEFTSIDE = "divgbl";  var SGRIDRIGHTSIDE = "divgbr";  var SGRIDLEFTSIDE_FIREFOX = "tdgbl";  var SGRIDRIGHTSIDE_FIREFOX = "tdgbr";  var bFound=false; var nLen=0; while (e.offsetParent)
 {
 if (e.tagName!='HTML')
 {
 if ('ltr' =='rtl')
 {
 if (!(e.offsetLeft<0 && e.scrollLeft ==0)) 
 left += e.offsetLeft; }
 else 
 left += e.offsetLeft;  top += e.offsetTop; if ('ltr' != 'rtl') 
 {
 if (!bFound && (e.id.search(SGRIDLEFTSIDE) == 0 || e.id.search(SGRIDRIGHTSIDE) == 0) )
 nLen = SGRIDLEFTSIDE.length; else if (!bFound && (e.id.search(SGRIDLEFTSIDE_FIREFOX) == 0 || e.id.search(SGRIDRIGHTSIDE_FIREFOX) == 0) ) 
 nLen = SGRIDLEFTSIDE_FIREFOX.length; if (!bFound && nLen >0) 
 {
 bFound = true; var gridID = e.id.substring(nLen); nLen=0; var sScript = "var oScrollPos = ptGridObj_" + formName +".getScrollPos(gridID);"; eval(sScript);  top -= oScrollPos.y; if (e.id.search(SGRIDRIGHTSIDE) == 0 || e.id.search(SGRIDRIGHTSIDE_FIREFOX) == 0) 
 left -= oScrollPos.x; } 
 } 
 } 
 else
 oParent=e.offsetParent; e = e.offsetParent; } 
 
 if ('ltr' =='rtl')
 {
 if (!(e.offsetLeft<0 && e.scrollLeft ==0)) 
 left += e.offsetLeft; }
 else
 left += e.offsetLeft; top += e.offsetTop; return {x:left, y:top};},


getPosition : function(e)
{
 if (e == null) return {x:0, y:0}; var left = 0; var top = 0; var oParent=null; while (e.offsetParent)
 {
 if (e.tagName!='HTML')
 {
 if ('ltr' =='rtl')
 {
 if (!(e.offsetLeft<0 && e.scrollLeft ==0)) 
 left += e.offsetLeft; }
 else 
 left += e.offsetLeft; top += e.offsetTop; }
 else
 oParent=e.offsetParent; e = e.offsetParent; }
 
 if ('ltr' =='rtl')
 {
 if (!(e.offsetLeft<0 && e.scrollLeft ==0)) 
 left += e.offsetLeft; }
 else
 left += e.offsetLeft; top += e.offsetTop; return {x:left, y:top};},


getTopPos : function(inputObj)
{
 if (inputObj == null)
 return 0; var returnValue = inputObj.offsetTop; while((inputObj = inputObj.offsetParent) != null){
 if(inputObj.tagName!='HTML'){
 returnValue -=inputObj.scrollTop; returnValue += inputObj.offsetTop; if(document.all)returnValue+=inputObj.clientTop; }
 }
 

 return returnValue;},

getLeftPos:function(inputObj)
{
 if (inputObj == null)
 return 0; var returnValue = inputObj.offsetLeft; if (inputObj.offsetParent)
 {
 while((inputObj = inputObj.offsetParent) != null){
 if(inputObj.tagName!='HTML'){
 returnValue -=inputObj.scrollLeft; returnValue += inputObj.offsetLeft; if(document.all)returnValue+=inputObj.clientLeft; }
 }
 }

 return returnValue;},

getEV: function (id, doc) {
 if (typeof doc == "undeifned" || !doc)
 doc = document; var el = document.getElementById(id); if (el && (typeof el.value != "undefined") && el.value)
 return el.value; else
 return "";},

getNV:function(el)
{
 var nv = ""; if (el == null || el.disabled)
 return nv; var elid = (el.id !== "") ? el.id : el.name;  switch(el.type)
 {
 case "button":
 if (el.checked)
 nv = elid + "=" + encodeURIComponent(el.value)+"&"; break; case "radio":
 if (el.checked)
 nv = elid + "=" + encodeURIComponent(el.value)+"&"; break; case "select-one":
 if (el.selectedIndex>-1)
 nv = elid + "=" + encodeURIComponent(el.options[el.selectedIndex].value)+"&"; break; case "select-multiple":
 var i=0; for (i=0;i<el.options.length;i++)
 {
 if (el.options[i].selected)
 nv += (elid + "=" + encodeURIComponent(el.options[i].value)+"&"); }
 break; default:
 if ((typeof el.value == "undefined" || el.type=="") && isFModeLayout()) {
 var sState = (el.getAttribute("ps_state")) ? el.getAttribute("ps_state") : ""; nv = elid + "=" + encodeURIComponent(sState) + "&"; }
 else
 nv = elid + "=" +encodeURIComponent(el.value)+"&"; }
 return nv;},

setActiveFocus:function()
{
 var b = navigator.userAgent.toLowerCase(); if (b.indexOf("msie")!=-1)
 {
 var cObj = document.activeElement; if (cObj)
 {
 
 cObj.setActive(); cObj.focus(); }
 }
},

tryFocus:function(obj)
{
if (!this.tryFocus0(obj)) 
 gFocusId = obj.id;return;},

tryFocus0:function(obj)
{
if (obj && typeof obj.focus != "undefined" && !obj.disabled && obj.style.visibility!="hidden")
{
 var b = navigator.userAgent.toLowerCase(); try { 
 obj.focus(); }
 catch (err) {
 return true; }
 
 if (b.indexOf("msie")!=-1)
 try {
 
 obj.setActive(); } catch(e){} 

 if (window.focusHook)
 focusHook(obj); return false;}
return true;},



setResizeCursor:function(evt){var o=getEO(evt);if (o && o != "undefined") o.style.cursor='E-resize';},


getEO:function(evt)
{
try {
 if (!evt)
 evt = event; }
catch (err) {
 if (!evt)
 evt = window.event; }
finally {
 if (!evt)
 return null; if (browserInfoObj2.isIE)
 return evt.srcElement; else
 return evt.target; }
},


isICQryDownload:function(form, name)
{
if (name.indexOf('#ICQryDownload') > -1)
 return true;if (name == '#KEY\r' && form.ICType.value == 'Query' && (typeof (form.ICTypeAheadID) == 'undefined' || form.ICTypeAheadID.value == '') && ((form.ICXML && form.ICXML.value == '1' ) 
 || (form.ICExcel && form.ICExcel.value == '1') || (form.ICEXCEL && form.ICEXCEL.value==0 ) ))
 return true;else
 return false;},


isAJAXReq:function(form, name)
{

if (isFModeLayout() && !name)
 return true;if (isFModeLayout() && typeof window.bDoModal != 'undefined' && window.bDoModal && !window.winParent && !isAccessibleLayout()) {
 return false;}

if (form.enctype && form.enctype.indexOf('multipart') != -1 && name.indexOf("#ICOK") != -1)
 return false;if (typeof window.bUIMsg != 'undefined' && window.bUIMsg)
 return false;if (!name)
 return false;if (typeof window.winParent != 'undefined' && window.winParent != null) 
 return true;var BrType = new PT_browserInfo();BrType.init();var bSfr=BrType.isSafari;if(bSfr)
 {

 
 if( name.indexOf('$alic')!=-1
 || name.indexOf('$agdn')!=-1
 || name.indexOf('$mvsk')!=-1
 || name.indexOf('$area')!=-1
 || name.indexOf('$right_arrow')!=-1
 || name.indexOf('$left_arrow')!=-1
 || name.indexOf('$expand')!=-1
 )
 {
 return false; }

 }

if (name.indexOf('ICQryName') != -1
 || name.indexOf("ICCustPage") != -1
 || name.indexOf("#ICCancelCustPage") != -1
 || name.indexOf("#ICSaveCustPage") != -1
 || name.indexOf("#ICRestDflt") != -1

 )
 {
 return false; }
else if (this.isICQryDownload(form, name))
 {
 return false; }
else
 {
 return true; }
},



isSearchSearchPage:function(form)
{
 if (form)
 {
 var searchMsg = "Search"; var oElement = form.elements["#ICSearch"]; var cElement = form.elements["#ICCancel"]; if (cElement != null) 
 return false; if (oElement != null && oElement.value.indexOf(searchMsg)==0 && searchMsg.length==oElement.value.length)
 return true; }
},


isSearchPage:function(form)
{
 if (form)
 {
 var oElement = form.elements["#ICSearch"]; if (oElement != null)
 return true; }
},



getAbsolutePosition:function(element) 
{
 var r = { x: element.offsetLeft, y: element.offsetTop }; if (element.offsetParent) {
 var tmp = this.getAbsolutePosition(element.offsetParent); r.x += tmp.x; r.y += tmp.y; }
 return r;},

getRelativeCoordinates:function(event, reference) 
{
 var x = 0; var y = 0; event = event || window.event; var el = event.target || event.srcElement; if (!window.opera && typeof event.offsetX != 'undefined') {
 
 var pos = { x: event.offsetX, y: event.offsetY };  var e = el; while (e) {
 e.mouseX = pos.x; e.mouseY = pos.y; pos.x += e.offsetLeft; pos.y += e.offsetTop; e = e.offsetParent; }

 
 var e = document.getElementById(reference); var offset = { x: 0, y: 0 }
 while (e) {
 if (typeof e.mouseX != 'undefined') {
 x = e.mouseX - offset.x; y = e.mouseY - offset.y; break; }
 offset.x += e.offsetLeft; offset.y += e.offsetTop; e = e.offsetParent; }

 
 e = el; while (e) {
 e.mouseX = undefined; e.mouseY = undefined; e = e.offsetParent; }
 }
 else {
 
 var pos = this.getAbsolutePosition(document.getElementById(reference)); x = event.pageX - pos.x; y = event.pageY - pos.y; }

 
 return { x: x, y: y };},



moveUnivSrchDiv:function()
{
 if (!parent.updSrchGrpList) {
 return; }

 try {
 var elemPortal = document.getElementById("ptus_portal"); var univSrch = "ptus_universalSrch"; var usDiv = document.getElementById(univSrch); if (elemPortal && elemPortal.parentNode)
 usDiv = elemPortal.parentNode; if (usDiv) {
 if (usDiv.parentNode.id != 'pthdr2srchgbl') { 
 srchhdr = parent.document.getElementById("pthdr2srchgbl"); if (!srchhdr) {
 var searchHdrElems = parent.document.getElementsByName("searchhdr"); if (searchHdrElems) {
 srchhdr = searchHdrElems[0]; }
 }
 
 if (srchhdr) { 
 
 usDiv = usDiv.parentNode.removeChild(usDiv);   if (!isCrossDomain(top)) {
 
 var tmp = parent.document.getElementById(univSrch); if (tmp)
 tmp.parentNode.removeChild(tmp);  var newNode = parent.document.createElement("div"); newNode.style.visibility="hidden"; newNode.style.display = "none"; newNode.innerHTML = usDiv.innerHTML;  newNode.id = univSrch;  srchhdr.appendChild(newNode);  parent.updSrchGrpList();  }
 } 
 }
 }
 } catch (e) {
 alert(e.message); }
},



expandOrCollapseSearchCriteria:function(form)
{
 var elemAdv = document.getElementById(form.name+'divSEARCHADV'); if (elemAdv && elemAdv.style.display == 'none')
 this.expandSearchCriteria(form, false); else
 this.expandSearchCriteria(form, true);},



expandSearchCriteria:function(form, bExpand)
{
 var elemAbove = document.getElementById(form.name+'divSEARCHABOVE'); var elemAdv = document.getElementById(form.name+'divSEARCHADV'); var elemBelow = document.getElementById(form.name+'divSEARCHBELOW'); var elemImgCollapse = document.getElementById('collapseSrchCriteria'); var elemImgExpand = document.getElementById('expandSrchCriteria'); var elemImgSrchInstructions = document.getElementById('srchInstructions'); var elemTblPsTabs = document.getElementById('tblpstabs');  if (bExpand) {
 if (elemAbove) {
 elemAbove.style.display="block"; }
 if (elemAdv) {
 elemAdv.style.display="block"; }
 if (elemBelow) {
 elemBelow.style.display="block"; }
 if (elemImgExpand) {
 elemImgExpand.style.display="inline-block"; tryFocus(elemImgExpand); }
 if (elemImgCollapse) {
 elemImgCollapse.style.display="none"; }
 if (elemImgSrchInstructions) {
 
 elemImgSrchInstructions.style.display="block"; }
 }
 else {
 if (elemAbove) {
 elemAbove.style.display="none"; }
 if (elemAdv) {
 elemAdv.style.display="none"; }
 if (elemBelow) {
 elemBelow.style.display="none"; }
 if (elemImgExpand) {
 elemImgExpand.style.display="none"; }
 if (elemImgCollapse) {
 elemImgCollapse.style.display="inline-block"; tryFocus(elemImgCollapse); }
 if (elemImgSrchInstructions) {
 elemImgSrchInstructions.style.display="none"; }
 }

 
 var elemSrchCriteria = document.getElementById(form.name+'divSrchCriteria'); var elemTblSrchFlds = document.getElementById(form.name+'tblSrchFlds'); var elemTblSrchKeyword = document.getElementById(form.name+'tblSrchKeyword'); var elemKeywordSrchHelp = document.getElementById('keywordsrchhelp'); if (elemSrchCriteria && (elemTblSrchFlds || elemTblSrchKeyword || elemKeywordSrchHelp)) {
 var tblWidth0 = 0; var tblWidth1 = 0; var tblWidth2 = 0; if (elemTblSrchKeyword)
 tblWidth0 = elemTblSrchKeyword.offsetWidth; if (elemTblSrchFlds)
 tblWidth1 = elemTblSrchFlds.offsetWidth; var wid = tblWidth0; if (tblWidth1 > tblWidth0)
 wid = tblWidth1;   if ((wid <= 0) && (elemKeywordSrchHelp))
 wid = elemKeywordSrchHelp.offsetWidth; if (wid > 10)
 elemSrchCriteria.style.width = wid; }
 
 
 var elemTblKeywrodSrchHelp = document.getElementById('tblkeywordsrchhlp');  var elemTabs = document.getElementById('PSTAB'); if (elemTblKeywrodSrchHelp && elemTabs) 
 elemTblKeywrodSrchHelp.width = elemTabs.offsetWidth; },



generateABNSearchResults:function(form)
{
 try {
 var globalSearch = false; var abnSearchResults = document.getElementById(form.name+'divabnsearchresults'); if (!abnSearchResults) {
 abnSearchResults = document.getElementById(form.name+'divabnsearchresultsGbl'); if (!abnSearchResults)
 abnSearchResults = document.getElementById('win0divabnsearchresultsGbl');  if (abnSearchResults)
 globalSearch = true; }
 if (abnSearchResults) {

 var abntbl = document.getElementById("ptabndt"); var abnlist = document.getElementById("ptabndatalist"); if (abntbl || abnlist) { 
 
 if (!globalSearch) {
 var abnSearchResultsGbl = abnSearchResults.cloneNode(true); abnSearchResultsGbl.id = form.name+'divabnsearchresultsGbl'; abnSearchResultsGbl = abnSearchResults.parentNode.appendChild(abnSearchResultsGbl); abnSearchResults = abnSearchResults.parentNode.removeChild(abnSearchResults); abnSearchResultsGbl = abnSearchResultsGbl.parentNode.removeChild(abnSearchResultsGbl); abnSearchResults.style.display = "block"; abnSearchResultsGbl.style.display = "block"; }
 else {
 abnSearchResults = abnSearchResults.parentNode.removeChild(abnSearchResults); abnSearchResults.style.display = "block"; var abnSearchResultsGbl = abnSearchResults; }
 
 
 var doclocation = document.location.href; var index = doclocation.indexOf('?'); var actionurl = ''; if (index > 0) {
 actionurl = doclocation.substr(0,index); }
 else {
 actionurl = doclocation; }
 
 
 
 if (this.isClass(abnSearchResults,"ptabncustom")) {
 
 if (typeof(top.pthNav) !== "undefined" && top.pthNav.abn.search) {
 top.pthNav.abn.search.add(actionurl,abnSearchResults,this.setABNCustomSearchFormParams(form)); }
 if (typeof(top.searchGbl) !== "undefined") {
 top.searchGbl.add(actionurl,abnSearchResultsGbl, this.setABNCustomSearchFormParams(form)); }
 } else { 
 if (!globalSearch && typeof(top.pthNav) !== "undefined" && top.pthNav.abn.search) { 
 top.pthNav.abn.search.add(actionurl,abnSearchResults); if (typeof(top.searchGbl) !== "undefined") {
 top.searchGbl.add(actionurl,abnSearchResultsGbl); }
 }
 else if (typeof(top.searchGbl) !== "undefined") { 
 top.searchGbl.add(actionurl,abnSearchResultsGbl); }
 }
 }
 }
 } catch (e) {}
},


setABNCustomSearchFormParams:function(form)
{
 var customSearchParams = "{\"ptCustomSearch\":["; var bFirstParam = true; for (var i = 0; i < form.elements.length; i++) { 
 var tempId = form.elements[i].id; if ((tempId == "#ICIncludeHistory" || tempId == "#ICCorrectHistory" ||
 tempId == "#ICMatchCase") && !form.elements[i].checked) {
 continue; } else { 
 if (form.elements[i].tagName == "INPUT" &&
 (form.elements[i].type == "checkbox" || form.elements[i].type == "radio") ) {
 if (!form.elements[i].checked) {
 continue; }
 }
 if (tempId == "ICRefresh" || tempId == "okbuttonModal" || form.elements[i].type == "button") {
 continue; } 
 }
 
 
 if (!bFirstParam) { customSearchParams += ","; }
 bFirstParam = false;   var paramValue = form.elements[i].value; if (tempId == "ICAction")
 paramValue = "";  var paramValue = form.elements[i].value; customSearchParams += this.getCustomSearchNV(form.elements[i].name, paramValue); } 
 
 if (!bFirstParam) { customSearchParams += ","; }

 customSearchParams += this.getCustomSearchNV('ICABNSEARCHRESULT', '1'); customSearchParams += ']}'; return customSearchParams;},


getCustomSearchNV:function(paramName, paramValue)
{
 return "{\"name\":\"" + paramName + "\",\"value\":\"" + paramValue + "\"}";},


submitABNAction:function(form,name)
{
 if (!/\/h\/\?tab=/.test(location)) { 
 parent.pthNav.abn.search.doSubmitABN(name); } else {
 pthNav.abn.search.doSubmitABN(name); }
},


isClass:function(el,cName) {
 if (!el) { return false; }

 
 var classes = el.className; if (!classes) { return false; }
 
 
 if (classes === cName) { return true; }

 
 var whiteSpace = /\s+/; if (!whiteSpace.test(classes)) { return false; }

 
 
 var c = classes.split(whiteSpace); for (var i = 0; i < c.length; i++) {
 if (c[i] === cName) { return true; }
 }
 return false;},

clearABNSearchResults:function() {
 try { 
 var dn = top.document.domain; try { 
 if (typeof(top.pthNav) !== "undefined" && 
 typeof(top.pthNav.abn) !== "undefined" && 
 typeof(top.pthNav.abn.search) !== "undefined") { 
 top.pthNav.abn.search.clearData(true); } 
 } catch (ex2) {} 
 } catch (ex1) {}
},

isPromptReq:function(name)
{
if (name && (name.indexOf("$prompt")!=-1 || name == '#KEYA5'))
 return true;else
 return false;},

expcolGrp:function(id,colurl,colalt,expurl,expalt)
{
var objGrp = document.getElementById("divgrp"+id);var objimg = document.getElementById(id+"$img");if (objGrp.style.display=="none")
{
 objGrp.style.display="block"; objimg.src = colurl; objimg.title = colalt; objimg.alt = colalt;}
else
{
 objGrp.style.display="none"; objimg.src = expurl; objimg.title = expalt; objimg.alt = expalt;}
},



getParam:function(url,name)
{
 var queryString = null; if (url.indexOf("?")!=-1)
 queryString = new String(url.substring(url.indexOf("?")+1,url.length)); var paramList = null; if (queryString)
 paramList = queryString.split("&"); if (paramList)
 {
 for (var j = 0; j < paramList.length; j++)
 {
 var tmp = new String(paramList[j]); if (tmp.indexOf(name+"=")!=-1)
 {
 return tmp.substring(tmp.indexOf(name+"=")+name.length+1,tmp.length); }
 }
 }
 return null;},
canFocus:function(obj)
{
if (!obj) return false;if (!obj.type && !obj.href) return false;if (obj && typeof obj.focus != "undefined" && !obj.disabled && obj.style.visibility!="hidden")
 return true;else
 return false;},
getPixValue:function(v)
{
if (v && (v.indexOf('px')!=-1 || v.indexOf('em')!=-1 ))
 return new Number(v.substring(0,v.length-2).valueOf());else
 return new Number(v.valueOf());},
 getHeight: function(o) {
 if (!o || typeof o == 'undefined') return 0; var h = o.style.height; if (typeof h != 'undefined' && h != "")
 return this.getPixValue(h); else if (typeof o.height != 'undefined' && o.height != "")
 return o.height; else return 0;},
getWidth: function(o) {
 if (!o || typeof o == 'undefined') return 0; var w = o.style.width; if (typeof w != 'undefined' && w != "")
 return this.getPixValue(w); else if (typeof o.width != 'undefined' && o.width != "")
 return o.width; else return 0;},
terminateEvent:function(e)
{
e = e || window.event;if (e.stopPropagation != undefined) e.stopPropagation();else if (e.cancelBubble != undefined) e.cancelBubble = true;if (e.preventDefault != undefined) e.preventDefault();else e.returnValue = false;},










fadeElement:function(elID, fade, min_opacity, max_opacity, speed, istep){
 var step; var t = 0; if ((typeof(istep) == "undefined") || (istep == null))
 istep=1; if (fade) {
 
 for (step = max_opacity; step >= min_opacity; step=step-istep) {
 setTimeout("ptCommonObj2.setOpaq('" + elID + "', " + step + ")", (t*speed));  t++; }
 }else {
 
 for (step = min_opacity; step <= max_opacity; step=step+istep) {
 setTimeout("ptCommonObj2.setOpaq('" + elID + "', " + step + ")", (t*speed));  t++; }
 }
 return t;},

setOpaq:function(elID, opacity) {
 var el = document.getElementById(elID); el.style.opacity = (opacity / 100); el.style.filter="alpha(opacity=" + opacity + ")"; if(browserInfoObj2.isIE && browserInfoObj2.version <= 8){
 if(opacity === 100){
 el.style.removeAttribute("filter"); }
 }
},

 showPopupMask: function(oWin, id, bModaless, sStyle) {
 if (typeof oWin == 'undefined') return; if (typeof bModaless == 'undefined') bModaless = false; this.setMaskSize(oWin, id, sStyle); this.popMask.style.display = "block"; },
 setMaskSize: function(oWin, id, sStyle) {
 if (typeof oWin == 'undefined') return; var nMaxMaskHeight = 10266;  var popHeight = nMaxMaskHeight; if (typeof id == 'undefined') id = 'pt_modalMask'; this.popMask = oWin.document.getElementById(id); if (sStyle) replaceClass(this.popMask, 'ps_modalmask', sStyle); if (typeof this.popMask == 'undefined' || this.popMask == null) {
 var oBody = oWin.document.body; var oObj = oWin.document.createElement("div"); oObj.setAttribute("id", "pt_modalMask"); oBody.appendChild(oObj); this.popMask = oWin.document.getElementById("pt_modalMask"); }
 if (this.popMask) {
 var theBody = oWin.document.getElementsByTagName("BODY")[0]; var fullHeight = ptCommonObj2.getViewportHeight(oWin); var fullWidth = ptCommonObj2.getViewportWidth(oWin);  this.overflow = theBody.style.overflow; theBody.style.overflow = 'hidden'; if (fullHeight > theBody.scrollHeight)
 popHeight = fullHeight; else
 popHeight = theBody.scrollHeight;  if (popHeight > nMaxMaskHeight) 
 popHeight = nMaxMaskHeight;  var popWidth = theBody.scrollWidth; if (isFModeLayout())
 {
 this.popMask.style.height= "100%"; this.popMask.style.width = "100%"; }
 else
 {
 if (!(browserInfoObj2.isiPad && browserInfoObj2.isSafari))
 popWidth = popWidth + 18;  this.popMask = oWin.document.getElementById(id); this.popMask.style.height = popHeight + "px"; this.popMask.style.width = popWidth + "px"; }
 }
 },

 hidePopupMask: function(oWin, id, bModaless, sStyle) {
 if (typeof oWin == 'undefined') return; if (typeof bModaless == 'undefined') bModaless = false; if (typeof id == 'undefined') id = 'pt_modalMask'; this.popMask = oWin.document.getElementById(id); if (this.popMask) {
 if (sStyle) replaceClass(this.popMask, sStyle, 'ps_modalmask'); if (isFModeLayout() && isClass(this.popMask, 'ps_masktrans')) replaceClass(this.popMask, 'ps_masktrans', 'ps_modalmask'); this.popMask.style.display = "none"; var theBody = oWin.document.getElementsByTagName("BODY")[0];  if (typeof getPTDialog() != 'undefined' && typeof getPTDialog().overflow != 'undefined' && getPTDialog().overflow.length>0)
 theBody.style.overflow = getPTDialog().overflow; else
 theBody.style.overflow = ""; } 
 },

 getParModMaskChld: function(id) {
 var modTblObj = MTop().document.getElementById("ptModTable_"+id); var chldModTblObj = modTblObj.childNodes; for(var i = 0; i < chldModTblObj.length; i++){
 if(chldModTblObj.item(i).id == 'pt_modalMask'){
 this.popMask = chldModTblObj.item(i); return true; }
 }
 return false; },

 isChldModalExist: function(id) {
 var parModObj = MTop().document.getElementById("pt_modals"); var modObjs = parModObj.childNodes;  for(var i = 0; i < modObjs.length; i++){
 var posOfID = modObjs.item(i).id.indexOf("_", 0);  if (posOfID > 0){ 
 var chldModID = modObjs.item(i).id.substring(posOfID+1);  if(chldModID > id){
 var modMask = modObjs.item(i); if ((modMask.style.display != 'undefined' && modMask.style.display != null) && modMask.style.display != "none")
 return true; }
 }
 }
 return false; },

 hideModMask: function(id)
 {
 var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); var pWin = null; try
 {
 var oWin = oframe.contentWindow; pWin = oWin.winParent; }
 catch (e)
 {
 pWin = null; }
 
 ptCommonObj2.hidePopupMask(pWin); },


 setParModMask: function(oWin, id) {
 if (typeof oWin == 'undefined') return; var modTblObj = oWin.document.getElementById("ptModTable_"+id); var popHeight = modTblObj.scrollHeight;  if (browserInfoObj2.isFF)
 popHeight = popHeight+30; var popWidth = modTblObj.scrollWidth; if (!this.getParModMaskChld(id)){
 var oObj = oWin.document.createElement("div"); oObj.setAttribute("id", "pt_modalMask"); oObj.setAttribute("style", "height: "+popHeight+"px; width: "+popWidth+"px; display: block"); modTblObj.appendChild(oObj); }
 else{
 this.popMask.style.height = popHeight + "px"; this.popMask.style.width = popWidth + "px"; this.popMask.style.display = "block"; }
 },

 hideParModalMask: function(oWin, id, bModaless) {
 if (typeof oWin == 'undefined') return; id = oWin.modalID; if (typeof bModaless == 'undefined') bModaless = false; var modTblObj = MTop().document.getElementById("ptModTable_"+id); this.getParModMaskChld(id); if (this.popMask) {
 this.popMask.style.display = "none"; modTblObj.style.overflow = ""; } 
 else {
 ptCommonObj2.hideModMask(window.modalID); }
 },
 
 getScrollX: function() { return browserInfoObj2.isSafari ? window.scrollX : document.body.scrollLeft; },
 getScrollY: function() { return browserInfoObj2.isSafari ? window.scrollY : document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop; }
} 


function PT_RC()
{}

PT_RC.prototype = {
 
 isEnabled:function() {

 var bIsEnabled = false;  if ( (window.top.document.getElementById('ptifrmtarget') == null) &&
 (window.top.document.getElementById('TargetContentFrame') == null) ) {
 return bIsEnabled; }

 
 try {
 if (typeof window.top.ptrc.onAddChangeEvent != 'function') {
 return bIsEnabled; }
 } catch (ex) { return false; } 
 bIsEnabled = true; return bIsEnabled; },

 
 isFrame:function() {
 return (window.top.document.getElementById('TargetContentFrame') != null) ? true : false; },

 
 isIFrame:function() {
 return ((window.top.document.getElementById('ptifrmtarget') != null) ? true:false); }
}


function PT_LONGEDIT_COUNTER()
{} 

PT_LONGEDIT_COUNTER.prototype = {

 LONG_EDIT_MAX : "longEditMax", 
 LONG_EDIT_CNT : "longEditCnt", 
 LONG_EDIT_CNT_SUFFIX : "_lec", 
 NO_MAX : 0, 
 LONG_EDIT_CNT_SC : "PSTEXT PSLONGEDITCNT", 
 LONG_EDIT_CNT_SC_OVER : "PSLONGEDITCNT_OVER PSLONGEDITCNT", 
 
 
 longEditCheck:function(longEdit) {
 if (longEdit == null) return;  var longEditLimit = longEdit.getAttribute(this.LONG_EDIT_MAX); if (longEditLimit == this.NO_MAX) return;  var longEditCnt = document.getElementById(longEdit.getAttribute(this.LONG_EDIT_CNT)); if (longEditCnt == null) return;  var bExceedLimit = longEdit.value.length > longEditLimit;  if (bExceedLimit) { 
 longEditCnt.className = this.LONG_EDIT_CNT_SC_OVER; } else {
 longEditCnt.className = this.LONG_EDIT_CNT_SC; }

 longEditCnt.innerHTML = longEditLimit - longEdit.value.length; },

 
 onLoadLongEditCounter:function () {

 var textareas = document.getElementsByTagName('textarea'); var textarea = null; var longEditLimit = this.NO_MAX; var longEditCntId = null; for (var i=0; i < textareas.length; i++)
 {
 textarea = textareas[i]; if (textarea.getAttribute(this.LONG_EDIT_MAX) != null && textarea.getAttribute(this.LONG_EDIT_CNT) == null)
 {
 longEditLimit = textarea.getAttribute(this.LONG_EDIT_MAX); if (longEditLimit == this.NO_MAX) break;   longEditCntId = textarea.id + this.LONG_EDIT_CNT_SUFFIX; textarea.setAttribute(this.LONG_EDIT_CNT, longEditCntId); textarea.setAttribute("aria-controls", longEditCntId); textarea.onkeyup = function() { 
 ptLongEditCounter.longEditCheck(this);  };  ptLongEditCounter.longEditCheck(textarea); }
 }
 }
}
 
var ptLongEditCounter = new PT_LONGEDIT_COUNTER();function ChangeElementProp(elmtId, propty, val) {
 var elm = ptUtil.id(elmtId); elm.setAttribute(propty, val);}

function ExpandSearchSidePanel(contId, leftpaneId, showFltrsId, collapseImg, expandImg, hideFilters, showFilters) {
 var elmLeftPaneId = ptUtil.id(leftpaneId); ptUtil.removeClass(elmLeftPaneId, 'psc_force-hidden'); var elmContId = ptUtil.id(contId); ptUtil.addClass(elmContId, 'ps_box_horizontal'); var elmShowFltrs = ptUtil.id(showFltrsId); elmShowFltrs.href = "javascript:CollapseSearchSidePanel('" + contId + "', '" + leftpaneId + "', '" + showFltrsId + "', '" + collapseImg + "', '" + expandImg + "', '" + hideFilters + "', '" + showFilters + "');";  var elmImg = elmShowFltrs.getElementsByTagName('img')[0]; elmImg.src = collapseImg; elmImg.alt = hideFilters; elmImg.title = hideFilters;}


function CollapseSearchSidePanel(contId, leftpaneId, showFltrsId, collapseImg, expandImg, hideFilters, showFilters) {
 var elmLeftPaneId = ptUtil.id(leftpaneId); ptUtil.addClass(elmLeftPaneId, 'psc_force-hidden'); var elmContId = ptUtil.id(contId); ptUtil.removeClass(elmContId, 'ps_box_horizontal'); var elmShowFltrs = ptUtil.id(showFltrsId); elmShowFltrs.href = "javascript:ExpandSearchSidePanel('" + contId + "', '" + leftpaneId + "', '" + showFltrsId + "', '" + collapseImg + "', '" + expandImg + "', '" + hideFilters + "', '" + showFilters + "');"; var elmImg = elmShowFltrs.getElementsByTagName('img')[0]; elmImg.src = expandImg; elmImg.alt = showFilters; elmImg.title = showFilters;}


function ShowMoreFacetValues(multiSelect, facetGbId, facetGridId, moreId, lessId) {
 var elemMore = ptUtil.id(moreId); ptUtil.addClass(elemMore, 'psc_force-hidden'); var elemLess = ptUtil.id(lessId); ptUtil.removeClass(elemLess, 'psc_force-hidden'); var elemFacetValuesGb = ptUtil.id(facetGbId); var elemFacetValuesGrid = ptUtil.id(facetGridId); var nGridHeight = 2 * elemFacetValuesGrid.offsetHeight; var nPrntWidth = elemFacetValuesGrid.parentNode.offsetWidth; if (multiSelect) {
 ptUtil.addClass(elemFacetValuesGb, 'pts_nui_facetgb_ms_more'); ptUtil.addClass(elemFacetValuesGrid, 'pts_nui_facetarea_ms_more'); ptUtil.removeClass(elemFacetValuesGb, 'pts_nui_facetarea_ms'); ptUtil.removeClass(elemFacetValuesGrid, 'pts_nui_facetarea_ms'); }
 else {
 ptUtil.addClass(elemFacetValuesGb, 'pts_nui_facetgb_ss_more'); ptUtil.addClass(elemFacetValuesGrid, 'pts_nui_facetarea_ss_more'); ptUtil.removeClass(elemFacetValuesGb, 'pts_nui_facetarea_ss'); ptUtil.removeClass(elemFacetValuesGrid, 'pts_nui_facetarea_ss'); }
 elemFacetValuesGrid.style.width = nPrntWidth + "px"; elemFacetValuesGrid.style.height = nGridHeight + "px"; elemLess.childNodes[0].childNodes[0].focus(); }

function ShowLessFacetValues(multiSelect, facetGbId, facetGridId, moreId, lessId) {
 var elemMore = ptUtil.id(moreId); ptUtil.removeClass(elemMore, 'psc_force-hidden'); var elemLess = ptUtil.id(lessId); ptUtil.addClass(elemLess, 'psc_force-hidden'); var elemFacetValuesGb = ptUtil.id(facetGbId); var elemFacetValuesGrid = ptUtil.id(facetGridId); var nGridHeight = elemFacetValuesGrid.offsetHeight/2; if (multiSelect) {
 ptUtil.addClass(elemFacetValuesGb, 'pts_nui_facetarea_ms'); ptUtil.addClass(elemFacetValuesGrid, 'pts_nui_facetarea_ms'); ptUtil.removeClass(elemFacetValuesGb, 'pts_nui_facetgb_ms_more'); ptUtil.removeClass(elemFacetValuesGrid, 'pts_nui_facetarea_ms_more'); }
 else {
 ptUtil.addClass(elemFacetValuesGb, 'pts_nui_facetarea_ss'); ptUtil.addClass(elemFacetValuesGrid, 'pts_nui_facetarea_ss'); ptUtil.removeClass(elemFacetValuesGb, 'pts_nui_facetgb_ss_more'); ptUtil.removeClass(elemFacetValuesGrid, 'pts_nui_facetarea_ss_more'); }
 elemFacetValuesGrid.style.height = nGridHeight + "px"; elemMore.childNodes[0].childNodes[0].focus();}

function getYScroll(){
return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;}

function getXScroll(){
return window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0;}


function ptLoadingStatus_empty(display)
{
clearupTimeout2(); var objFrame = top.frames['TargetContent'];var waitobj = null;if ((typeof(window.parent.popupObj_empty) != "undefined") &&
 window.parent.popupObj_empty.isShown) {
 
 waitobj = document.getElementById("WAIT_empty");}
else if (objFrame) {
 try{
 waitobj = objFrame.document.getElementById("WAIT_empty"); }
 catch (err) 
 {
 return true; }
}
else {
 waitobj = document.getElementById("WAIT_empty");}

if (!waitobj)
 waitobj = top.document.getElementById("WAIT_empty");  if (waitobj) {
 if ((typeof display == "undefined") || (display != 0)) {
 if (/\/h\/\?tab=/.test(location)) {
 
 positionHP_WAIT(waitobj)
 }
 else
 waitobj.style.top = getYScroll();  var x = getXScroll(); waitobj.style.right = (x > 0) ? (0 - x) : x; waitobj.style.display="block"; waitobj.style.visibility="visible"; }
 else {
 waitobj.style.display="none"; waitobj.style.visibility="hidden"; }
 }
}

function positionWAIT_empty(){
var waitobj = null;var savedobj = null;var objFrame = top.frames['TargetContent'];if (objFrame) {
 waitobj = objFrame.document.getElementById("WAIT_empty");}
else {
 waitobj = document.getElementById("WAIT_empty"); savedobj = document.getElementById("SAVED_empty");}

if (waitobj && waitobj.style.display != "none" && waitobj.style.visibility != "hidden")
 keepObjTopRight(waitobj);if (savedobj && savedobj.style.display != "none" && savedobj.style.visibility != "hidden")
 keepObjTopRight(savedobj);}
function keepObjTopRight(waitobj) {
 waitobj.style.position = "absolute"; if (window.frames.length)
 waitobj.style.top = document.body.scrollTop + "px"; else {
 if (document.body.scrollTop >= 50)
 waitobj.style.top = document.body.scrollTop + "px"; else
 waitobj.style.top = 50 + "px"; }
 waitobj.style.right = (document.body.scrollLeft > 0) ? ((0-document.body.scrollLeft) + "px") : (document.body.scrollLeft + "px");}

function positionHP_WAIT(waitObj){

 var wp = document.getElementById("ptpglts"); var wpSib = ptUtil.getNextSibling(waitObj,"table"); if (wp && (!wpSib || (wpSib.id!=="ptpglts"))) {
 var wobj = waitObj.parentNode.removeChild(waitObj); wp.parentNode.insertBefore(wobj, wp); wobj.style.top=""; }
}

function searchProcessing(dispSetting){

 try {
 if (window["TargetContent"]) { 
 
 var formName = window["TargetContent"].document.forms[0].name;  if (!/empty/.test(formName)) { 
 var procFunc = window['TargetContent']['processing_'+formName]; procFunc.call(procFunc,dispSetting,3000); return; }
 } else if (bPSHTMLtemplate){ 
 
 var processingImg = document.getElementById("processing");  if (processingImg) {
 waitLoading = processingImg.parentNode; if (waitLoading && (waitLoading.id.indexOf("WAIT_") != -1)) {
 waitLoading.style.display = dispSetting ? "block" : "none"; waitLoading.style.visibility = dispSetting ? "visible" : "hidden"; return; } 
 }
 }
 } catch (ex) {}
 
 
 var waitLoading; if (typeof parent.frames["UniversalHeader"] != "undefined") { 
 
 waitLoading = parent.frames["UniversalHeader"].document.getElementById("WAIT_empty"); if (waitLoading) waitLoading.style.top=0;  } 
 else 
 waitLoading = top.document.getElementById("WAIT_empty");  if (waitLoading) {
 if (/\/h\/\?tab=/.test(location)) 
 positionHP_WAIT(waitLoading); waitLoading.style.display = dispSetting ? "block" : "none"; } 
} 


if (typeof(ptCommonObj2) === "undefined") 
{
var browserInfoObj2;var ptCommonObj2; var ptConsole2;var ptRC2;var gSrchRsltPageNum = 1;var srchUrls = new Array(10);for (var i = 0; i < 10; i++) {
 srchUrls[i] = new Array(10); for (var j = 0; j < 10; j++)
 srchUrls[i][j] = "";}

var raFormatedString1 = "";var raFormatedString2 = "";var raFormatedString3 = "";var raFormatedString4 = "";var raFormatedString5 = "";var raFormatedString6 = "";var raFormatedString7 = "";var raFormatedString8 = "";var raFormatedString9 = "";var raFormatedString10 = "";var gSrchRaFldId = "";var g_bAccessibilityMode = false;PT_createStandardObjects(); }



if (typeof(ptEvent) === "undefined") {
var ptEvent = {
 fnList : [],
 huid: 100,
 hList: {},
 done: false,
 init : function () {

 if (!ptEvent.done) {
 ptEvent.done = true; if (ptEvent.fnList) {
 for ( var i = 0, fl = ptEvent.fnList.length; i < fl; i++ ) {
 ptEvent.fnList[i].apply(document); }
 ptEvent.fnList = null; }

 
 ptEvent.add(window, "unload", ptEvent.remove);  if (browserInfoObj2.isMozilla || browserInfoObj2.isSafari) {
 document.removeEventListener( "DOMContentLoaded", ptEvent.init, false ); }
 }
 },

 load : function (f) {

 if (ptEvent.done) {
 f.apply(document); } else {
 ptEvent.fnList.push(f); }
 },

 onDOMLoad : function (f) {
 ptEvent.load(f); },

 
 add : function (element, type, data) {

 
 
 if (browserInfoObj2.isIE && element.setInterval != undefined)
 element = window; if (data) {
 handler = data; handler.data = data; }

 
 if ( !handler.huid )
 handler.huid = this.huid++;  if (!element.events) {
 element.events = {}; }

 if (!element.handle) {
 element.handle = function() { 

 
 var retVal;   if (typeof ptEvent == "undefined") {
 return retVal; }
 
 retVal = ptEvent.handle.apply(element,arguments); return retVal; }; }

 
 var handlers = element.events[type];  if (!handlers) {
 handlers = element.events[type] = {};    if (element.attachEvent) {
 element.attachEvent("on" + type, element.handle); } else if (element.addEventListener) {
 element.addEventListener(type, element.handle, false); }
 }

 
 handlers[handler.huid] = handler; },

 
 remove : function (element, type, handler) {

 var elEvents = element.events, ret; if (elEvents) {

 
 if (type && type.type) {
 handler = type.handler; type = type.type; }
 
 if (!type) {
 for (type in elEvents) {
 this.remove( element, type ); }
 } else if (elEvents[type]) {

 
 if (handler) {
 delete elEvents[type][handler.huid]; } else {
 
 
 for (handler in element.events[type]) {
 delete elEvents[type][handler]; }
 }
 
 
 for (ret in elEvents[type]) { 
 break; }

 if (!ret) {

 if (element.detachEvent) {
 element.detachEvent("on" + type,element.handle); } else if (element.removeEventListener) {
 element.removeEventListener(type,element.handle,false); }

 ret = null; delete elEvents[type]; }
 }
 
 
 for ( ret in elEvents ) {
 break; }

 if ( !ret ) {
 element.handle = element.events = null; }
 }
 },

 
 handle : function (event) {

 var retVal;  event = ptEvent.fix(event || window.event || {});  var c = this.events && this.events[event.type]; var args = [].slice.call(arguments,1); args.unshift(event); for (var j in c) {
 
 

 var temp = c[j]; args[0].handler = c[j]; args[0].data = c[j].data;  var hRetVal = c[j].apply( this, args );  if ( retVal !== false ) {
 retVal = hRetVal; }
 
 if ( hRetVal === false ) {
 event.preventDefault(); event.stopPropagation(); }
 }

 
 if (browserInfoObj2.isIE) {
 event.target = event.preventDefault = event.stopPropagation = 
 event.handler = event.data = null; }
 return retVal; },

 
 fix : function (event) {

 
 if (!event.target && event.srcElement)
 event.target = event.srcElement;  if (event.pageX == undefined && event.clientX != undefined) {
 if (typeof document == "undefined" || typeof document == "unknown") return event; var e = document.documentElement, b = document.body; event.pageX = event.clientX + (e.scrollLeft || b.scrollLeft); event.pageY = event.clientY + (e.scrollTop || b.scrollTop); }
 
 
 if (browserInfoObj2.isSafari && event.target.nodeType == 3) {

 
 
 var originalEvent = event; event = {}; event = originalEvent;   event.target = originalEvent.target.parentNode; }
 
 
 if (!event.preventDefault)
 event.preventDefault = function () { event.returnValue = false; };  if (!event.stopPropagation)
 event.stopPropagation = function () { event.cancelBubble = true; }; return event; }
}; new function () {
 
 if (browserInfoObj2.isMozilla || browserInfoObj2.isSafari) {
 document.addEventListener( "DOMContentLoaded", ptEvent.init, false );  } else if (browserInfoObj2.isIE && window == top) {
 (function(){
 if (ptEvent.done) { return; }

 try {
 
 document.documentElement.doScroll("left"); } catch( error ) {
 setTimeout( arguments.callee, 0 ); return; }
 
 ptEvent.init(); })(); }
 ptEvent.add(window,"load",ptEvent.init);}; } 


var ptUtil = {
 
 
 
 
 id : function (s) {
 if (typeof s == "string") { return document.getElementById(s); }
 return s; },

 
 
 
 
 
 getElems : function (pNode,crit) {

 var elems = []; var elName; var cName; var id; var t; if (!pNode || !crit) return elems;   var re = /^([a-z0-9_-]+)(.)([a-z0-9\\*_-]*)/i; var m = re.exec(crit); if (m && m[2] === ".") {
 elName = m[1]; cName = m[3]; } else {
 
 re = /^([a-z0-9_-]+)(#)([a-z0-9\\*_-]*)/i; m = re.exec(crit); if (m && m[2] === "#") {
 elName = m[1]; id = m[3]; } else {
 
 elName = crit; }
 }
 
 if (elName || cName) {
 var cNode; for (var i = 0; i < pNode.childNodes.length; i++) {
 cNode = pNode.childNodes[i];  if (cNode.nodeType === 1) {
 
 if (elName && cName) {
 if (cNode.nodeName.toLowerCase() === elName && 
 ptUtil.isClassMember(cNode,cName)) {
 elems.push(cNode); }
 } else if (elName && cNode.nodeName.toLowerCase() === elName) {
 elems.push(cNode); } else if (ptUtil.isClassMember(cNode,cName)) { 
 elems.push(cNode); }
 
 
 t = ptUtil.getElems(cNode,crit); if (t[0]) elems = elems.concat(t); }
 }
 } else if (id) {
 
 elems.push(ptUtil.id(id)); }
 return elems; },

 
 
 
 
 appendHTML : function (pNode,html,cNodeTag) {
 
 if (!pNode || !html) return; if (cNodeTag) {
 
 var elems = ptUtil.getElems(pNode,cNodeTag); for (var i = 0; i < elems.length; i++) {
 ptUtil.appendNodeFromHTML(elems[i],html); } 
 } else {
 ptUtil.appendNodeFromHTML(pNode,html); }
 },

 appendNodeFromHTML : function (n,html) {
 
 
 if ( html && typeof html == "string" ) {

 var div = document.createElement("div"); div.innerHTML = html;  if (!browserInfoObj2.isIE && div.childNodes.length > 1)
 {
 if (browserInfoObj2.isFF)
 div = div.lastChild; else
 div.childNodes[1]; }
 else
 div = div.firstChild; n.appendChild(div); }
 }, 

 
 
 
 
 
 
 swapClass : function (pNode,fClass,tClass,cNodeTag) {

 
 if (!pNode || !fClass || !tClass) return;  if (cNodeTag) {
 var elems = ptUtil.getElems(pNode,cNodeTag); for (var i = 0; i < elems.length; i++) {
 ptUtil.removeClass(elems[i],fClass); ptUtil.addClass(elems[i],tClass); }
 } else {
 ptUtil.removeClass(pNode,fClass); ptUtil.addClass(pNode,tClass); }
 },

 
 
 
 addClass : function (el, cName) {
 
 if (el && !ptUtil.isClassMember(el,cName)) {

 if (el.className) {
 
 el.className = el.className.replace(/^\s+|\s+$/g, ""); el.className += " " + cName; } else {
 el.className += "" + cName; }
 }
 },

 
 
 
 removeClass : function (el, cName) {

 
 
 
 if (el) {
 el.className = el.className.replace(new RegExp("\\b"+ cName+"\\b\\s*", "g"), ""); }
 },

 
 
 
 isClassMember : function (el, cName) {

 if (!el) { return false; }

 
 var classes = el.className; if (!classes) { return false; }
 
 
 if (classes === cName) { return true; }

 
 var whiteSpace = /\s+/; if (!whiteSpace.test(classes)) { return false; }

 
 
 var c = classes.split(whiteSpace); for (var i = 0; i < c.length; i++) {
 if (c[i] === cName) { return true; }
 }
 return false; },

 
 getElemsByClass : function (searchClass,node,tag) {

 var classElems = []; if (!node) { node = document; }

 if (!tag) { tag = "*"; }

 var els = node.getElementsByTagName(tag); var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)"); for (var i = 0, j = els.length; i < j; i++) {
 if (pattern.test(els[i].className) ) { classElems.push(els[i]); }
 }
 return classElems; },

 
 
 
 getCSSValue : function (el,prop) {
 if (!el) { return null; }
 var cssProp = prop; var retVal = null;  if (cssProp === "float") {
 cssProp = browserInfoObj2.isIE ? "styleFloat" : "cssFloat"; }
 
 if (el.style[cssProp]) {
 retVal = el.style[cssProp];  } else if (el.currentStyle) {
 retVal = el.currentStyle[cssProp];   if ( !/^\d+(px)?$/i.test(retVal) && /^\d/.test(retVal) ) {

 
 var left = el.style.left, rsLeft = el.runtimeStyle.left;  el.runtimeStyle.left = el.currentStyle.left; el.style.left = retVal || 0; retVal = el.style.pixelLeft + "px";  el.style.left = left; el.runtimeStyle.left = rsLeft; }

 
 } else if (document.defaultView && document.defaultView.getComputedStyle) {
 retVal = document.defaultView.getComputedStyle(el,"")[cssProp]; }
 return retVal; },

 
 
 
 
 setCSSValue : function (el,prop,value) {

 var cssProp = prop; if (cssProp === "float") {
 cssProp = browserInfoObj2.isIE ? "styleFloat" : "cssFloat"; }

 el.style[cssProp] = value; },

 
 winSize : function () {

 var de = document.documentElement; var height = window.innerHeight || self.innerHeight || (de && de.clientHeight) || document.body.clientHeight; var width = window.innerWidth || self.innerWidth || (de && de.clientWidth) || document.body.clientWidth; return {height:height, width:width}; }, 

 
 getNextSibling : function (node,nodeType,styleClass) {

 if (!node) { return null; }
 
 var sibling = node.nextSibling; while (sibling) {
 if (sibling.nodeName.toLowerCase() === nodeType) {
 if (styleClass && styleClass !== "") {
 if (this.isClassMember(sibling,styleClass)) {
 return sibling; }
 } else { 
 return sibling; }
 }
 sibling = sibling.nextSibling; }
 return null; },

 
 getPrevSibling : function (node,nodeType,styleClass) {

 if (!node) { return null; }
 
 var sibling = node.previousSibling; while (sibling) {
 if (sibling.nodeName.toLowerCase() === nodeType) {
 if (styleClass && styleClass !== "") {
 if (this.isClassMember(sibling,styleClass)) {
 return sibling; }
 } else { 
 return sibling; }
 }
 sibling = sibling.previousSibling; }
 return null; },

 
 getGrandParent : function (pNode) {
 if (pNode.parentNode) 
 return pNode.parentNode.parentNode; else
 return null; },

 
 getFirstChild : function (node) {
 var firstChild; if (node.firstElementChild) {
 firstChild = node.firstElementChild; } else {
 firstChild = node.firstChild; while (firstChild && firstChild.nodeType !== 1) {
 firstChild = firstChild.nextSibling; }
 }
 return firstChild; },

 
 getKeyCode : function (evt) {

 if (!evt && window.event) { evt = window.event; }
 if (!evt) { return 0; }
 if (evt.keyCode) { return evt.keyCode; }
 if (evt.which) { return evt.which; }
 return 0; },

 
 isAltKey : function (evt) {

 if (!evt && window.event) { evt = window.event; }
 if (!evt) { return false; }
 if (evt.altKey) { return true; }
 if (evt.modifiers) { return (evt.modifiers & Event.ALT_MASK) != 0; }
 return false; },

 
 isCtrlKey : function (evt) {

 if (!evt && window.event) { evt = window.event; }
 if (!evt) { return false; }
 if (evt.ctrlKey) { return true; }
 if (evt.modifiers) { return (evt.modifiers & Event.CONTROL_MASK) != 0; }
 return false; },

 
 isShiftKey : function (evt) {

 if (!evt && window.event) { evt = window.event; }
 if (!evt) { return false; }
 if (evt.shiftKey) { return true; }
 if (evt.modifiers) { return (evt.modifiers & Event.SHIFT_MASK) != 0; }
 return false; }
}; function getNumberofRTEInstances(){
var x = 0;for(var instances in CKEDITOR.instances){x++;}
return x;}

PTRTE_CheckImages = function (URI, UrlID, EditorField)
{
 
 if ((typeof URI == "undefined") || (URI == "")) URI = location.href; if ((typeof UrlID == "undefined") || (UrlID == "")) UrlID = "PT_RTE_IMG_DB_LOC";  var baseUri = URI.replace("/psp/", "/psc/"); var serverUri = baseUri.split("/psc/")[0]; baseUri = serverUri + baseUri.match(/\/ps(c|p)\/([^\/]*)?\/?([^\/]*)?\/?([^\/]*)?\//)[0]; var URLoc = baseUri + "s/WEBLIB_PTRTE.ISCRIPT1.FieldFormula.IScript_RTE_IMAGE_ATTACH?URLId=" + UrlID; var psSiteName = (URI.split("/"))[4]; if(psSiteName.indexOf("_") != -1) {
 var lIndex = psSiteName.lastIndexOf("_"); var lastStr = psSiteName.substr(lIndex+1); if(typeof(lastStr) != 'undefined' && lastStr != "" && !isNaN(lastStr)) {
 psSiteName = psSiteName.substr(0, lIndex); }
 }

 
 var objEditorField = null; if ((typeof EditorField != "undefined") && (EditorField != "")) {
 objEditorField = document.getElementById(EditorField); }
 if (objEditorField == null) {
 objEditorField = document.body; }

 
 var objImages = objEditorField.getElementsByTagName('img');  if (typeof document.body.RTFImages == "undefined") document.body.RTFImages = new Array(0);  var imgStr = ""; for (var i=0; i<objImages.length; i++) {
 var img = objImages[i]; if ((!img.id) || (!img.src)) continue; var tempval = img.id.split("###"); var ImgID = tempval[0]; var filename = tempval[1]; if ((UrlID == ImgID) && !img.PTRTEImageVerified) {
 img.PTRTEImageVerified = "PENDING"; imgStr = imgStr + "&Params=" + filename; document.body.RTFImages.push(img);  tempval = img.src.split("/"); img.oracletempimagesrc = serverUri + "/cs/" + psSiteName + "/cache/" + tempval[tempval.length-1]; }
 }

 
 if (imgStr != "") {
 var PTRTELoader = new net2.ContentLoader(
 URLoc + imgStr,
 null, null, "GET",
 function () {
 
 
 if (typeof document.body.RTFImages != "undefined") {
 for (var i=0; i<document.body.RTFImages.length; i++) {
 var img = document.body.RTFImages[i]; if ((img) && (typeof img.oracletempimagesrc != "undefined")) {
 if (img.src != img.oracletempimagesrc) {
 img.src = img.oracletempimagesrc; } else {
 img.src = img.oracletempimagesrc + "?reload"; }
 img.PTRTEImageVerified = "DONE"; }
 }
 }
 },
 function () {
 
 },
 null,
 "application/x-www-form-urlencoded"
 ); }
} 



function versionInfo()
{
 this.xhtml=""; this.version=""; this.importance="";}


function detectDoctype(currDoc) {
 var re=/\s+(X?HTML)\s+([\d\.]+)\s*([^\/]+)*\//gi; var myversionInfo=new versionInfo(); if (!currDoc)
 currDoc = document; if ((typeof currDoc.namespaces != "undefined") && currDoc.all[0].nodeName.toLowerCase() !== "html" && currDoc.all[0].nodeValue !== null) {
 if (currDoc.all[0].nodeValue.toLowerCase().indexOf("doctype") > -1)
 re.exec(currDoc.all[0].nodeValue); else
 return false; } else { 
 if (((browserInfoObj2.isIE && browserInfoObj2.version > 8) || !browserInfoObj2.isIE) && currDoc.doctype !== null)
 re.exec(currDoc.doctype.publicId); else
 return false; }
 myversionInfo.xhtml=RegExp.$1; myversionInfo.version=RegExp.$2; myversionInfo.importance=RegExp.$3;  if (myversionInfo !== null) 
 return true; else
 return false;}


function PT_isModalDialogPresent() {
 var mTop = MTop(); if (!mTop) return false; var divModal = mTop.document.getElementById("pt_modals"); if (typeof divModal == 'undefined' || divModal == null)
 return false; if (divModal.offsetWidth > 0)
 return true; return false;}
function PT_GetTopmostModalDialogIdCount() {
 var mTop = MTop(); if (!mTop) return -1; var divModal = mTop.document.getElementById("pt_modals"); if (typeof divModal == 'undefined' || divModal == null) return -1; var modalDivList = divModal.getElementsByTagName('div'); if (typeof modalDivList == 'undefined' || modalDivList == null) return -1; var maxModalIndex = -1; for (var i = 0; i < modalDivList.length; ++i) {
 var idValue = modalDivList[i].id; if (typeof idValue == 'undefined' || idValue == null)
 continue; if (idValue.indexOf("ptModTable_") != -1) {
 var tmp = ""; tmp = idValue.split("ptModTable_"); if (tmp != "") {
 if (tmp[1] != "undefined" && tmp[1] != "") {
 var modalIndex = parseInt(tmp[1]); if (!isNaN(modalIndex)) {
 if (modalIndex > maxModalIndex)
 maxModalIndex = modalIndex; }
 }
 }
 }
 }
 return maxModalIndex;}
function PT_GetModalDialog(idCount) {
 if (idCount < 0) return null; var mTop = MTop(); if (!mTop) return null; var otb = mTop.document.getElementById("ptModTable_" + idCount); return otb;}
function PT_isNodeInModalDialog(domNode, idCount) {
 var modalDialog = PT_GetModalDialog(idCount); if (typeof modalDialog == 'undefined' || modalDialog == null)
 return true; var tmpDomNode = domNode; while (typeof tmpDomNode != 'undefined' && tmpDomNode != null) {
 if (tmpDomNode === modalDialog)
 return true; tmpDomNode = tmpDomNode.parentNode; }
 return false;}
function PT_handleTabKeyForModalDialog(evt) {
 try {
 if (PT_isModalDialogPresent()) {
 if (!evt && window.event) evt = window.event; if (!evt) return false; var mTop = MTop(); if (!mTop) return true; var topmostModalDialogIdCount = PT_GetTopmostModalDialogIdCount(); if (ptUtil.getKeyCode(evt) == 9 && !ptUtil.isAltKey(evt) && !ptUtil.isCtrlKey(evt)) {
 if (!PT_isNodeInModalDialog(mTop.document.activeElement, topmostModalDialogIdCount)) {
 if (evt.returnValue) evt.returnValue = false; if (evt.preventDefault) evt.preventDefault(); var topmostModal = PT_GetModalDialog(topmostModalDialogIdCount); if (topmostModal) {
 var modCloseLnk = mTop.document.getElementById('ptModCloseLnk_' + topmostModalDialogIdCount); if (modCloseLnk)
 ptCommonObj2.tryFocus0(modCloseLnk); else {
 var modalFrame = mTop.document.getElementById(mTop.PTMODFRAME_ + topmostModalDialogIdCount); if (modalFrame)
 ptCommonObj2.tryFocus0(modalFrame); else {
 var inputElements = topmostModal.getElementsByTagName('input'); if (typeof inputElements == 'undefined' || inputElements == null)
 ptCommonObj2.tryFocus0(topmostModal); else {
 var focused = false; for (var i = 0; i < inputElements.length; ++i) {
 if (inputElements[i].tabIndex > -1) {
 ptCommonObj2.tryFocus0(inputElements[i]); focused = true; break; }
 }
 if (!focused) ptCommonObj2.tryFocus0(topmostModal); }
 }
 }
 return false; }
 }
 }
 }
 }
 catch (e) {
 }
 return true;}



function isFModeLayout() {
 if (typeof bFMode == 'undefined') return false; if (bFMode) return true; return false;}


function PT_Dialog()
{ }

PT_Dialog.prototype = {
 init: function(closeUrl, closeAlt) {
 this.arrModalMsgs = new Array(); this.arrModalDialogs = new Array(); this.arrModelessDialogs = new Array(); this.arrDivPopup = new Array(); this.cObj = MTop().document.getElementById("pt_modals"); if (typeof this.cObj == 'undefined' || this.cObj == null) {
 var oBody = MTop().document.body; oObj = document.createElement("div"); oObj.setAttribute("id", "pt_modalMask"); oBody.appendChild(oObj); oObj = document.createElement("div"); oObj.setAttribute("id", "pt_modalMaskCover"); oBody.appendChild(oObj); oObj = document.createElement("div"); oObj.setAttribute("id", "pt_modals"); oObj.setAttribute("CLASS", "PSMODAL"); oBody.appendChild(oObj); this.cObj = MTop().document.getElementById("pt_modals"); this.cObj.innerHTML = "<div id='ptModalShadow' class='popupDragFrame' style='cursor:nw-resize'>&nbsp;</div>"; MTop().document.onkeyup = PT_handleTabKeyForModalDialog; MTop().document.onkeydown = PT_handleTabKeyForModalDialog; } else {
 this.cObj.style.display = "block"; }
 this.idCount = 0; this.zIndexBase = 9999; MTop().modlessId = -1; MTop().hideModId = -1; MTop().PTMODFRAME_ = "ptModFrame_";  MTop().PTMOD_ = "ptMod_";  },
 processOptions: function(options, modObj, sHostUrl) {
 if (typeof options == "undefined") return; var optionArr = options.split(";"); modObj.strCurrUrl = null; modObj.bRCFModal = false; modObj.sStyle = 'PSMODALTABLE'; if (isFModeLayout())
 modObj.sStyle = 'ps_modal_container'; modObj.sMaskStyle = 'ps_modalmask'; modObj.bModeless = false; modObj.bClose = false; modObj.sCancelName = ''; modObj.bResize = false; modObj.bHeader = true; modObj.sTitle = ''; modObj.bPIA = false; modObj.bCrossDomain = false;  modObj.width = -1; modObj.height = -1; modObj.bPopup = false; modObj.sPopupParentId = ''; modObj.sPopupParentQS = ''; modObj.sCacheParentId = ''; modObj.bAutoClose = false; modObj.bAutoCloseWarn = false; modObj.nPopupBW = 10; modObj.nRPopupBW = 0; modObj.bTail = true; modObj.nTailW = 17; modObj.nTailH = 30; modObj.nTailMTop = 10; modObj.nTailMLeft = -25; modObj.bVertical = false; modObj.bGrouplet = false; modObj.sWidth = ""; modObj.sHeight = ""; modObj.bBack = false; modObj.sBackIdQS = ""; modObj.sBackTitle = "Back"; modObj.bFolder = false; modObj.bSidePage = false; modObj.bFullScreen = false; modObj.bCenter = false; modObj.bMask = true; modObj.bAnm = false;  modObj.nAlign = 0;  modObj.bTypeAhead = false; modObj.bMsg = false; modObj.bDivPopup = false; modObj.bBackCancel = false; modObj.bGridSort = false; modObj.bCustPos = false; modObj.nRCFLeft = -1; modObj.nRCFTop = -1; modObj.sortid = ""; modObj.bViewAtt = false; for (var i = 0; i < optionArr.length; i++) {
 var name = optionArr[i].split("@")[0]; var value = optionArr[i].split("@")[1]; switch (name) {
 case "strCurrUrl":
 modObj.strCurrUrl = value; break; case "closeUrl":
 modObj.closeUrl = convImgURLToABSUrl(value,sHostUrl, modObj.bCrossDomain, modObj.strCurrUrl); break; case "closeAlt":
 modObj.closeAlt = value; break; case "resizeUrl":
 modObj.resizeUrl = convImgURLToABSUrl(value,sHostUrl, modObj.bCrossDomain, modObj.strCurrUrl); modObj.bResize = true; break; case "resizeAlt":
 modObj.resizeAlt = value; break; case "moveAlt":
 modObj.moveAlt = value; break; case "bModeless":
 modObj.bModeless = (value.indexOf("0") != -1) ? false : true; break; case "bClose":
 modObj.bClose = (value.indexOf("0") != -1) ? false : true; break; case "bBack":
 modObj.bBack = (value.indexOf("0") != -1) ? false : true; break; case "bBackCancel":
 modObj.bBackCancel = (value.indexOf("0") != -1) ? false : true; break; case "bResize":
 modObj.bResize = (value.indexOf("0") != -1) ? false : true; break; case "bGrouplet":
 modObj.bGrouplet = (value.indexOf("0") != -1) ? false : true; break; case "bPIA":
 modObj.bPIA = (value.indexOf("0") != -1) ? false : true; break; case "bCrossDomain":
 modObj.bCrossDomain = (value.indexOf("0") != -1) ? false : true; break; case "sCancelName":
 modObj.sCancelName = value; break; case "bHeader":
 modObj.bHeader = (value.indexOf("0") != -1) ? false : true; break; case "sTitle":
 modObj.sTitle = value; break; case "width":
 modObj.width = new Number(value.valueOf()); break; case "height":
 modObj.height = new Number(value.valueOf()); break; case "bPopup":
 modObj.bPopup = (value.indexOf("0") != -1) ? false : true; if (modObj.bPopup) 
 modObj.bAutoClose = true; break; case "sPopupParentId":
 modObj.sPopupParentId = value; modObj.bCenter = false; modObj.bPopup = true; break;  case "sPopupParentQS":
 modObj.sPopupParentQS = value; modObj.bCenter = false; modObj.bPopup = true; break; case "bCache":
 modObj.bCache = (value.indexOf("0") != -1) ? false : true; break; case "sCacheParentId":
 modObj.sCacheParentId = value; break; case "bAutoClose":
 modObj.bAutoClose = (value.indexOf("0") != -1) ? false : true; break; case "bAutoCloseWarn":
 modObj.bAutoCloseWarn = (value.indexOf("0") != -1) ? false : true; break; case "bTail":
 modObj.bTail = (value.indexOf("0") != -1) ? false : true; break; case "nPopupBW":
 modObj.nPopupBW = new Number(value.valueOf()); break; case "nRPopupBW":
 modObj.nRPopupBW = new Number(value.valueOf()); break; case "nTailW":
 modObj.nTailW = new Number(value.valueOf()); break; case "nTailH":
 modObj.nTailH = new Number(value.valueOf()); break; case "nTailMTop":
 modObj.nTailMTop = new Number(value.valueOf()); break; case "nTailMLeft":
 modObj.nTailMLeft = new Number(value.valueOf()); break; case "bVertical":
 modObj.bVertical = (value.indexOf("0") != -1) ? false : true; modObj.bCustPos = true; break;  case "sStyle":
 modObj.sStyle = modObj.sStyle+" "+value; if (value.indexOf('typeahead') != -1) {
 modObj.bTypeAhead = true; modObj.bPopup = true; } else if (value.indexOf('ps_modal-gridsort') != -1)
 modObj.bGridSort = true; break; case "sMaskStyle":
 modObj.sMaskStyle = value; break; case "sWidth":
 modObj.sWidth = value; break; case "sHeight":
 modObj.sHeight = value; break; case "sBackIdQS":
 modObj.sBackIdQS = value; break; case "sBackTitle":
 modObj.sBackTitle = value; break;  case "bFolder":
 modObj.bFolder = (value.indexOf("0") != -1) ? false : true; break; case "bSidePage":
 modObj.bSidePage = (value.indexOf("0") != -1) ? false : true; break; case "bRCFModal":
 modObj.bRCFModal = true; break; case "sGlyphId":
 modObj.sGlyphId = value; break; case "bFullScreen":
 modObj.bFullScreen = (value.indexOf("0") != -1) ? false : true; if (modObj.bFullScreen) modObj.bPopup = false; modObj.sStyle = modObj.sStyle + " psc_modal-fullscreen"; break;  case "bViewAtt":
 modObj.bViewAtt = (value.indexOf("0") != -1) ? false : true; break; case "bCenter":
 modObj.bCenter = (value.indexOf("0") != -1) ? false : true; if (modObj.bCenter) modObj.bPopup = false; break; case "bMask":
 modObj.bMask = (value.indexOf("0") != -1) ? false : true; break; case "bAnm":
 modObj.bAnm = (value.indexOf("0") != -1) ? false : true; break; case "nAlign":
 modObj.nAlign = value; break; case "bMsg":
 modObj.bMsg = (value.indexOf("0") != -1) ? false : true; if (isFModeLayout())
 modObj.sStyle = modObj.sStyle + " ps_popup-msg"; break; case "bDivPopup":
 modObj.bDivPopup = (value.indexOf("0") != -1) ? false : true; break; case "nrcfLeft":
 modObj.nRCFLeft = new Number(value.valueOf()); break; case "nrcfTop":
 modObj.nRCFTop = new Number(value.valueOf()); break; case "sortid":
 modObj.sortid = value; }
 }
 if (isFModeLayout() && isAccessibleLayout()) { 
 modObj.bHeader = true; if (modObj.sTitle == '')
 modObj.sTitle = sPopupTitle; } 
 },

 showModalDialog: function(url, oParentWin, options, msg, onclose, form, name, pollContent, mDivObj) {
 if (!this.arrModalDialogs)
 this.init(); MTop().oParentWin = oParentWin; MTop().modId = this.idCount; this.closeModalMsg(null, this.idCount - 1); modObj = document.createElement("div"); modObj.setAttribute("id", MTop().PTMOD_ + this.idCount); if (typeof msg != "undefined" && msg)
 options = options+"bMsg@1;"
 if (typeof mDivObj != "undefined" && mDivObj)
 options = options+"bDivPopup@1;"
 this.processOptions(options, modObj, url);  if (modObj.bFolder) {
 this.processOptions(options, mDivObj, url); var gpObj = this.getParentPopup(mDivObj); if (gpObj) {
 pObj = gpObj.children[0]; if (gpObj.children.length > 1)
 pObj = gpObj.children[1]; if (pObj.children.length > 0)
 addHide(pObj.children[0]); if (pObj.parentNode.children.length > 1)
 addClass(pObj.parentNode.children[0], "ps_dash"); pObj.appendChild(mDivObj); }
 modObj = null; return; }
 this.checkRemoveModeless(this.bModeless); if (this.bModeless) {
 modObj.bRemove = false; MTop().modlessId = MTop().modId; }
 if (typeof onclose != "undefined" && onclose)
 modObj.onclose = onclose; if (typeof form != "undefined" && form)
 modObj.form = form; if (typeof name != "undefined" && name)
 modObj.name = name; modObj.oParentWin = oParentWin; if (oParentWin)
 var currDoc = oParentWin.document; else
 var currDoc = document; modObj.bCustMove = false; modObj.bCustResize = false; modObj.bCustResizeDone = false;  modObj.oParentWin.bProcess = true; var dWidth = 1; var dHeight = 1; if (modObj.width != -1)
 dWidth = modObj.width; if (modObj.height != -1)
 dHeight = modObj.height;  var sHtml = ""; sHtml += "<div id='ptModTable_" + this.idCount + "' class='" + modObj.sStyle + "'";  if (isFModeLayout()) { 
 sHtml += ">"; if (modObj.bPopup) { 
 sHtml += "<div id='ptModWrap" + this.idCount+"' class='ps_mod_wrap'><div id='ptArrow1_"+ this.idCount+"'></div>";  sHtml += "<a class='ps-anchor' id='ICFirstAnchor_mod' tabindex='0' onfocus=\"javascript:DoTabbing(event,'ptModWrapc" + this.idCount + "');\"></a>"; sHtml += "<div class='ps_mod_wrapc' id='ptModWrapc" + this.idCount + "'>"; }
 if (modObj.bHeader) {
 sHtml += "<div id='ptModHeader_" + this.idCount + "' class='ps_modal_header psc_hidden'>"; var sTitleHtml = ""
 if (isFModeLayout() && isAccessibleLayout())
 sTitleHtml = "<h1 class='ps_pagetitle'>"; if (modObj.bBack)
 sTitleHtml += "<span id='ptModTitle_" + this.idCount + "'></span>"; else
 sTitleHtml += "<span id='ptModTitle_" + this.idCount + "' class='PTPOPUP_TITLE'></span>"; if (isFModeLayout() && isAccessibleLayout())
 sTitleHtml += "</h1>"; if (modObj.bBack){
 sHtml += "<div class='ps_box-button psc_image_only ps_popup-back'></div>"; sHtml += "<div id='ptModTitleBar_" + this.idCount + "' CLASS='ps_modal_title'>"+sTitleHtml+"</div>"; }
 else {
 sHtml += "<div id='ptModTitleBar_" + this.idCount + "' CLASS='ps_modal_title'"; if (modObj.bViewAtt)
 sHtml += " onclick='javascript:doCloseModal(" + this.idCount + ");'"; sHtml += ">" + sTitleHtml + "</div>"; }
 if (modObj.bClose || modObj.bModeless) {
 sHtml += "<div id='ptModClose_" + this.idCount + "' class='ps_modal_close'><div class='ps_box-button psc_modal-close'><span class='ps-button-wrapper' title='" + modObj.closeAlt + "'>"; sHtml += "<a class='ps-button' role='button' alt='" + modalCloseAlt + "' title='" + modalCloseAlt + "' id='ptModCloseLnk_" + this.idCount + "' onclick='javascript:cancelBubble(event);' href='javascript:"; if (modObj.bModeless)
 sHtml += "closeModal(" + this.idCount + ");'/>"; else
 sHtml += "doCloseModal(" + this.idCount + ");'/>"; sHtml += "<img id='ptModCloseImg_" + this.idCount + "' src='" + modalCloseUrl + "' alt='" + modalCloseAlt + "'/></a></span></div></div>"; }
 sHtml += "</div>"; }

 var sScrollingNo = "";  if (!modObj.bViewAtt && (isIPad() || isIPhone()))
 sScrollingNo += " scrolling='no'"; if (modObj.bDivPopup) {
 sHtml += "<div id='ptModContent_" + this.idCount + "' CLASS='ps_modal_content'"; if (modObj.sWidth != "")
 sHtml += "style='width:" + modObj.sWidth + ";'"; sHtml += "></div>"; }
 else if (modObj.bMsg) {
 sHtml += "<a class='ps-anchor' id='ICFirstAnchor_mod' tabindex='0' onfocus=\"javascript:DoTabbing(event,'ptModContent_" + this.idCount + "');\"></a>"; sHtml += "<div id='ptModContent_" + this.idCount + "' CLASS='ps_modal_content'>" + msg + "</div>"; sHtml += "<a class='ps-anchor' id='ICLastAnchor_mod' tabindex='0' onfocus=\"javascript:DoTabbing(event,'ptModContent_" + this.idCount + "');\"></a>"; }
 else {
 sHtml += "<div id='ptModContent_" + this.idCount + "' CLASS='ps_modal_content'><iframe frameborder=0 id='" + MTop().PTMODFRAME_ + this.idCount + "' name='" + MTop().PTMODFRAME_ + this.idCount + "' src='" + url + "' width=" + dWidth + " height=" + dHeight + sScrollingNo + "></iframe></div>"; }
 if (!modObj.bMsg && !modObj.bPopup && modObj.bResize)
 sHtml += "<div id='ptModBottom_" + this.idCount + "' class='ps_modal_bottom'><img id='ptModResize_" + this.idCount + "' class='PSMODALRESIZE' src='" + modObj.resizeUrl + "' alt='" + modObj.resizeAlt + "'/></div>"; if (modObj.bPopup) { 
 sHtml += "</div><div id='ptArrow2_" + this.idCount + "'></div>"; sHtml += "<a class='ps-anchor' id='ICLastAnchor_mod' tabindex='0' onfocus=\"javascript:DoTabbing(event,'ptModWrapc" + this.idCount + "');\"></a>"; sHtml += "</div>"; }
 }
 else { 
 if (modObj.sWidth == "") {
 var fullWidth = ptCommonObj2.getViewportWidth(); var fullHeight = ptCommonObj2.getViewportHeight(); if (fullHeight > 160) fullHeight -= 80;  var isStandards = detectDoctype(currDoc) ? true : false; var mtopDoc = isStandards ? MTop().document.documentElement : MTop().document.body; var mtopDocScrollTop = MTop().document.documentElement.scrollTop || MTop().document.body.scrollTop; var default_top = (fullHeight - dHeight) / 2 + mtopDocScrollTop + 'px'; var default_left = (fullWidth - dWidth) / 2 + mtopDoc.scrollLeft + 'px'; sHtml += " style='top:" + default_top + ";left:" + default_left + ";'"; } 
 sHtml += ">"; if (modObj.bHeader) {
 
 sHtml += "<div id='ptModHeader_" + this.idCount + "' class='PSMODALHEADER'>"; sHtml += "<div id='popupTitleBarLeftImage'>&nbsp;</div>"; sHtml += "<div style='float:left;height:22px;'>"; sHtml += "<div id='ptModTitleBar_" + this.idCount + "' alt='" + modObj.moveAlt + "' title='" + modObj.moveAlt + "' style='float:left;' CLASS='PSMODALTITLE'><span id='ptModTitle_" + this.idCount + "' class='PTPOPUP_TITLE'></span></div>"; if (modObj.bClose || modObj.bModeless) {
 sHtml += "<div id='ptModControl_" + this.idCount + "' style='float:right;' class='PSMODALCLOSE'><a class='PSMODALCLOSEANCHOR' style='border:none;padding:0px;margin:0px;text-decoration:none;' alt='" + modObj.closeAlt + "' title='" + modObj.closeAlt + "' id='ptModCloseLnk_" + this.idCount + "' href='javascript:"; if (modObj.bModeless || modObj.bCrossDomain)
 sHtml += "closeModal(" + this.idCount + ");'/>"; else
 sHtml += "doCloseModal(" + this.idCount + ");'/>"; sHtml += "<img id='ptModClose_" + this.idCount + "' src='" + modObj.closeUrl + "' alt='" + modObj.closeAlt + "' style='border:none;'/></a></div>"; } 
 sHtml += "</div>"; sHtml += "<div id='popupTitleBarRightImage'>&nbsp;</div>"; sHtml += "</div>"; }
 
 if (url)
 url = url.replace(/'/g, '%27'); if (modObj.bMsg)
 sHtml += "<div id='ptModContent_" + this.idCount + "' CLASS='PSMODALCONTENT'>" + msg + "</div>"; else { 
 if (detectDoctype(currDoc)) 
 {
 sHtml += "<div id='ptModContent_" + this.idCount + "' CLASS='PSMODALCONTENT'><iframe frameborder=0 id='" + MTop().PTMODFRAME_ + this.idCount + "' name='" + MTop().PTMODFRAME_ + this.idCount + "' src='" + url + "'"; if (modObj.width != -1) 
 sHtml += " width=" + dWidth; if (modObj.height != -1)
 sHtml += " height=" + dHeight; sHtml += "></iframe></div>"; } 
 else 
 sHtml += "<div id='ptModContent_" + this.idCount + "' CLASS='PSMODALCONTENT'><iframe frameborder=0 id='" + MTop().PTMODFRAME_ + this.idCount + "' name='" + MTop().PTMODFRAME_ + this.idCount + "' src='" + url + "' width=" + dWidth + " height=" + dHeight + "></iframe></div>"; }

 if (!modObj.bMsg && modObj.bResize)
 sHtml += "<div id='ptModBottom_" + this.idCount + "' class='PSMODALBOTTOM'><img id='ptModResize_" + this.idCount + "' class='PSMODALRESIZE' src='" + modObj.resizeUrl + "' alt='" + modObj.resizeAlt + "'/></div>"; }
 sHtml += "</div>"; modObj.style.visibility = "hidden"; modObj.innerHTML = sHtml; this.cObj.appendChild(modObj); modObj = MTop().document.getElementById(MTop().PTMOD_ + this.idCount); modObj.style.zIndex = this.zIndexBase + this.idCount * 10; if (modObj.bDivPopup) {
 var oContent = MTop().document.getElementById("ptModContent_" + this.idCount); oContent.appendChild(mDivObj); }

 var oresize = MTop().document.getElementById("ptModResize_" + this.idCount); var oshadow = MTop().document.getElementById("ptModalShadow");  if (oresize && !browserInfoObj2.isIE)
 oresize.style.cssFloat = 'right'; if ('ltr' == 'rtl') 
 {
 if (oresize)
 oresize.style.cursor = 'ne-resize';  oshadow.style.cursor = 'ne-resize';  }
 if (isFModeLayout()) { 
 this.cObj.style.display = "inline"; this.cObj.style.backgroundColor = "#ffffff"; }
 else {
 this.cObj.style.display = "block"; this.cObj.style.backgroundColor = "transparent"; }
 var id = this.idCount; this.idCount++;   if (modObj.bMask && (modObj.width != -1 || modObj.sWidth != ""))
 this.showMask(modObj, id); if (modObj.bDivPopup) {
 var oContent = MTop().document.getElementById("ptModContent_" + id); oContent.appendChild(mDivObj); this.resizeModalDialog(id, true); return modObj; } else if (modObj.bMsg) {
 oParentWin.modWin = modObj; this.resizeModalDialog(id); return modObj; }
 else if (modObj.bModeless) {
 if (!(browserInfoObj2.isFF || browserInfoObj2.isSafari))
 this.resizeModalDialog(id, true, modObj.width, modObj.height); return modObj; }
 else {
 var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); if (typeof pollContent !== "undefined" && pollContent && !modObj.bCrossDomain) {
 (function testForContent() {
 if (oframe) {
 try {
 obj = oframe.contentWindow.document.body; } catch (ex) {
 oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); setTimeout(testForContent,0); return; }
 } else {
 oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); setTimeout(testForContent,0); return; }
 return oframe; })(); } else {
 if (!modObj.bPIA)
 this.resizeModalDialog(id); return oframe; }
 }
 },

 addMsg: function(msg, window, options) {
 if (!this.arrModalDialogs) this.init(); var msgReq = new Array(msg, window, options); this.arrModalMsgs.push(msgReq); },

 isAnyMsg: function() {
 if (!this.arrModalMsgs) return false; if (this.arrModalMsgs.length > 0) return true; return false; },
 playMsg: function() {
 if (!this.isAnyMsg()) return; var msgReq = this.arrModalMsgs.shift(); showModalDialog_pt(null, msgReq[1], msgReq[2], msgReq[0]); },
 addDivPopup: function(mObj, win, options, scrollId, bFrame) {
 if (!this.arrDivPopup) this.init(); var popReq = new Array(mObj, win, options, scrollId, bFrame); this.arrDivPopup.push(popReq); },
 isAnyDivPopup: function() {
 if (!this.arrDivPopup) return false; if (this.arrDivPopup.length > 0) return true; return false; }, 
 playDivPopup: function() {
 if (!this.isAnyDivPopup()) return; var popReq = this.arrDivPopup.shift(); var mDivObj = popReq[0]; var bFrame = (typeof popReq[4] == "undefined" || !popReq[4]) ? false : true; if (mDivObj)
 removeHide(mDivObj); if (bFrame && popReq[2].indexOf("bDivPopup@1") == -1) {
 var oframe = this.showModalDialog("about:blank", popReq[1], popReq[2], null, null, null, null, null); var respHTML = mDivObj.innerHTML;  oframe.contentDocument.write(respHTML);   }
 else
 this.showModalDialog(null, popReq[1], popReq[2], null, null, null, null, null, mDivObj); if (mDivObj)
 {
 var scrollId = popReq[3]; if (!scrollId && mDivObj.firstChild)
 scrollId = mDivObj.firstChild.id; if (scrollId) {
 var otb = MTop().document.getElementById("ptModTable_" + MTop().modId); scrollInit(mDivObj.firstChild.id, true, 0, 0, 0, otb.clientWidth, true); }
 }
 },
 setFocusFMode: function (id) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); var objs = modObj.querySelectorAll(".ps-button"); var obj= MTop().document.getElementById(objs[0].id); if (objs.length > 0)
 ptCommonObj2.tryFocus0(obj); },
 setPopupFocus: function (id) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); var oContent = MTop().document.getElementById("ptModContent_" + id); var oTitle = MTop().document.getElementById("ptModTitle_" + id); var oClose = MTop().document.getElementById("ptModCloseLnk_" + id); if (isAccessibleLayout() && oTitle) {
 oTitle.tabIndex = 0; if (!ptCommonObj2.tryFocus0(oTitle)) return; } else if (oClose) {
 if (!ptCommonObj2.tryFocus0(oClose)) return; }
 var otb = MTop().document.getElementById("ptModTable_" + id); var oWrap = otb.querySelector(".ps_mod_wrapc"); if (oWrap) {
 var elements = oWrap.querySelectorAll(".psc_rowact, INPUT, A, SELECT, BUTTON"); for (var i = 0; i < elements.length; i++) {
 var el = elements[i]; if (!ptCommonObj2.tryFocus0(el)) return el; } 
 }
 oContent.tabIndex = 0; ptCommonObj2.tryFocus0(oContent); return; }, 
 isInModal: function (id, target) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (!modObj || modObj.bMsg) return false; var oContent = MTop().document.getElementById("ptModContent_" + id); var oTitle = MTop().document.getElementById("ptModTitle_" + id); if (oTitle && target == oTitle) return true; var otb = MTop().document.getElementById("ptModTable_" + id); if (otb) {
 var elements = otb.querySelectorAll("*"); for (var i = 0; i < elements.length; i++) {
 var el = elements[i]; if (el == target) {
 return true; }
 } 
 }
 return false; },
 setMsgFocus: function(id) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (modObj.oParentWin.gFocusObj != null) {
 modObj.oParentWin.gFocusObj.blur(); modObj.parentfocusElID = modObj.oParentWin.gFocusObj.id; }
 var oContent = MTop().document.getElementById("ptModContent_" + id); var elements = oContent.getElementsByTagName('*'); for (var i = 0; i < elements.length; i++) {
 var el = elements[i]; switch (el.type) {
 case "button":
 case "radio":
 case "input":
 case "select":
 case "textarea":
 if (!ptCommonObj2.tryFocus0(el)) return el; break; default:
 }
 } 
 ptCommonObj2.tryFocus0(oContent); return oContent; },
 getMsgCancelId: function(id, cancelId) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); var oContent = MTop().document.getElementById("ptModContent_" + id); var elements = oContent.getElementsByTagName('*'); for (var i = 0; i < elements.length; i++) {
 var el = elements[i]; switch (el.type) {
 case "button":
 if (el.id == cancelId) return el.id; break; default:
 }
 }
 return null; },
 isParentModal: function(oParentWin) {
 if (typeof oParentWin.modalID != 'undefined' && oParentWin.modalID != null) 
 return true; return false; },
 isParentLive: function(oParentWin) {
 if (!this.isParentModal(oParentWin)) return true; var tmp = ""; if (oParentWin.name.indexOf("modWin_") != -1)
 tmp = oParentWin.name.split("modWin_"); else if (oParentWin.name.indexOf(MTop().PTMODFRAME_) != -1)
 tmp = oParentWin.name.split(MTop().PTMODFRAME_); else if (oParentWin.name.indexOf(MTop().PTMOD_) != -1)
 tmp = oParentWin.name.split(MTop().PTMOD_); if (tmp == "") return false; if (tmp[1] != "undefined" && tmp[1] != "") {
 pmodObj = MTop().document.getElementById(MTop().PTMOD_ + tmp[1]); if (typeof pmodObj.bRemove != 'undefined' && pmodObj.bRemove) return false; }
 return true; },
 isParentModeless: function(oParentWin) {
 if (typeof oParentWin == 'undefined' || oParentWin == null) 
 return false; var tmp = oParentWin.name.split(MTop().PTMODFRAME_); if (tmp[1] != "undefined" && tmp[1] != "" && tmp[1] == MTop().modlessId)
 return true; return false; },
 isModeless: function(id) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (typeof modObj != 'undefined' && modObj)
 return modObj.bModeless; else
 return false; },
 isWinModeless:function(win) {
 return this.isParentModeless(win); },
 restoreModeless: function() {
 if (MTop().modlessId > -1) {
 var modlessObj = MTop().document.getElementById(MTop().PTMOD_ + MTop().modlessId); if (modlessObj)
 modlessObj.style.display = "block"; }
 },
 hideModeless: function() {
 if (MTop().modlessId > -1) {
 var modlessObj = MTop().document.getElementById(MTop().PTMOD_ + MTop().modlessId); if (modlessObj)
 modlessObj.style.display = "none"; }
 },
 checkRemoveModeless: function(bOpenModeless) {
 if (bOpenModeless)
 this.closeModalDialog(MTop().modlessId); if (MTop().modlessId != -1) {
 var modelessObj = MTop().document.getElementById(MTop().modlessId); if (modelessObj && modelessObj.bRemove) {
 alert(modelessObj.bRemove + ' ' + bOpenModeless);  modelessObj.innerHTML = ""; this.cObj.removeChild(mmodelessObj); }
 }
 },
 closeModalMsg: function(obj, id) {
 var modObj = null; if (typeof id != "undefined")
 modObj = MTop().document.getElementById(MTop().PTMOD_ + id); else {
 try {
 modObj = obj.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;  }
 catch (e) { return; }
 }
 if (!modObj || !modObj.bMsg) return; modObj.oParentWin.modWin = null; if (modObj.oParentWin.winParent) {
 this.AddHandler(modObj.oParentWin.modalID); if (isFModeLayout())
 ptCommonObj2.hidePopupMask(modObj.oParentWin); else
 ptCommonObj2.hideParModalMask(modObj.oParentWin); }
 else {
 if (this.isParentModeless(modObj.oParentWin))
 ptCommonObj2.hidePopupMask(modObj.oParentWin); else {
 this.restoreModeless(); ptCommonObj2.hidePopupMask(MTop()); }
 }
 if (modObj.parentfocusElID != null && this.isParentLive(modObj.oParentWin))
 ptCommonObj2.tryFocus0(modObj.oParentWin.document.getElementById(modObj.parentfocusElID)); modObj.innerHTML = ""; this.cObj.removeChild(modObj); if (typeof modObj.oParentWin.modalID != 'undefined' && modObj.oParentWin.modalID != null) {
 var pmodObj = MTop().document.getElementById(MTop().PTMOD_ + modObj.oParentWin.modalID); MTop().oParentWin = pmodObj.oParentWin; MTop().modId = modObj.oParentWin.modalID; }
 else {
 MTop().oParentWin = null; MTop().modId = -1; this.cObj.style.display = "none"; }
 this.playMsg(); },
 getTypeAheadModalId: function () {
 for (var id = MTop().modId; id > -1; id--) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (modObj && modObj.bTypeAhead)
 return id; }
 return ""; },
 getGridSortModalId: function () {
 for (var id = MTop().modId; id > -1; id--) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (modObj && modObj.bGridSort)
 return id; }
 return ""; },
 doCloseModalDialogAll: function () {
 var bReturn = true; for (var id = MTop().modId; id > -1; id--) {
 if (!this.doCloseModalDialog(id)); bReturn = false; }
 return bReturn;  }, 
 doCloseModalDivPopup: function (id) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (modObj && modObj.bDivPopup) return this.closeModalDialog0(id); return; },
 doCloseModalDialog: function(id) { 
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (!modObj) return true;  if (isFModeLayout() && isAccessibleLayout() || modObj.bViewAtt) unhidePtWrapper(); if (modObj.bDivPopup) { window.bDoModal = false; this.closeModalDialog0(id); return true;}
 if (modObj.bMsg) { this.closeModalMsg(modObj, id); return true; }
 if (modObj.bPIA && (modObj.bModeless || modObj.bAutoCloseWarn)) {
 var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); if (oframe) {
 oWin = oframe.contentWindow; var bChanged = checkFrameChanged(oWin); if (bChanged) {
 var saveCancelEvent = 'javascript:doCloseModal0(' + id + ')'; if (modObj.bGrouplet) saveCancelEvent = 'javascript:closeModal0(' + id + ')'; oWin.psConfirmSW("", saveCancelEvent, oWin); return false; }
 }
 }
 
 if (modObj.bGrouplet) 
 this.closeModalDialog0(id); else
 this.doCloseModalDialog0(id); return true; },
 doCloseModalDialog0: function(id) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (!modObj) return; if (modObj.bPIA) {
 var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); var oWin = oParentWin; if (oframe) {
 oWin = oframe.contentWindow; oWin.doCancel(modObj.sCancelName); }
 else {
 if (this.getMsgCancelId(id, "#ICCancel"))
 oWin.doCancelMsg(); else
 this.closeModalMsg(null, id); }
 } else if (modObj.bClose || modObj.bModeless) return this.closeModalDialog(id); },
 getFirstParentWin: function() {
 for (var id = MTop().modId; id > -1; id--) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (modObj) {
 if (modObj.oParentWin.winParent == null) return modObj.oParentWin; }
 }
 },
 getFirstModObj: function() {
 for (var id = MTop().modId; id > -1; id--) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (modObj) {
 if (modObj.oParentWin.winParent == null) return modObj; }
 }
 },
 closeHideModal: function() {
 if (typeof MTop().hideModId == 'undefined' || MTop().hideModId == -1) return false; this.closeModalDialog(MTop().hideModId); return true; },
 hideModalDialog: function(id) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (!modObj) return; MTop().hideModId = id; modObj.style.display = "none"; },
 closeModalAll: function() {
 for (var id = MTop().modId; id > -1; id--) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (modObj) {
 modObj.innerHTML = ""; this.cObj.removeChild(modObj); try{
 if (typeof modObj.onclose != "undefined") {
 modObj.onclose(); }
 }catch(e){}
 }
 }
 if(this.cObj)
 this.cObj.style.display = "none"; MTop().oParentWin = null; MTop().modId = -1; MTop().hideModId = -1; ptCommonObj2.hidePopupMask(MTop()); },

 closeModalDialog: function(id) {
 if (typeof id == 'undefined') 
 {
 this.closeModalAll(); return; }

 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (!modObj)
 return;  var oWin = null; if (!modObj.bCrossDomain) 
 {
 var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); oWin = oframe.contentWindow; } 
 
 if (modObj.bPIA && modObj.bModeless) 
 {
 var bChanged = checkFrameChanged(oWin); if (bChanged) 
 {
 var saveCancelEvent = 'javascript:closeModal0(' + id + ')'; return oWin.psConfirmSW("", saveCancelEvent, oWin); }
 }
 this.closeModalDialog0(id); },

 closeModalDialog0: function(id) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (modObj.bDivPopup) {
 var oContent = MTop().document.getElementById("ptModContent_" + id); var mDivObj = oContent.firstChild;  addHide(mDivObj); var objP = null; if (modObj.sCacheParentId.length > 0) 
 objP = modObj.oParentWin.document.getElementById(modObj.sCacheParentId); else {
 objP = modObj.oParentWin.document.getElementById(modObj.sPopupParentId); if (objP)
 objP = objP.parentNode; }
 if (objP) {
 objP.appendChild(mDivObj); }
 if (!modObj.bCache)
 mDivObj.innerHTML = ""; }
 if (modObj.onclose && typeof modObj.onclose != "undefined") {
 eval(modObj.onclose); }

 if (typeof modObj.sGlyphId != "undefined") {
 if(modObj.oParentWin.document.getElementById("Glyph_"+modObj.sGlyphId) != null)
 modObj.oParentWin.document.getElementById("Glyph_"+modObj.sGlyphId).focus(); }

 var bModeless = modObj.bModeless;  if (modObj.bGrouplet || !modObj.bModeless && id != MTop().hideModId) {
 var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); var pWin = null;  try
 {
 var oWin = oframe.contentWindow; pWin = oWin.winParent; }
 catch (e) 
 {
 pWin=null; }
 if (pWin && pWin.winParent) {
 this.AddHandler(pWin.modalID); if (isFModeLayout())
 ptCommonObj2.hidePopupMask(pWin); else
 ptCommonObj2.hideParModalMask(pWin); }
 else {
 this.restoreModeless(); var popMask = document.getElementById('pt_modalMask'); if (!isFModeLayout() || isFModeLayout() && !popMask.bTypeAhead)
 ptCommonObj2.hidePopupMask(MTop()); }
 }

 if (bModeless) {
 modObj.style.display = "none"; modObj.style.zIndex = "-1"; modObj.bRemove = true; var theBody = MTop().document.getElementsByTagName("BODY")[0]; theBody.style.overflow = "auto"; theBody.style.zIndex = "1"; } else {
 if (!modObj.bCrossDomain && typeof modObj.bRCFModal != 'undefined' && !modObj.bRCFModal && typeof oWin != 'undefined' && oWin != null && typeof oWin.modalID != 'undefined') {
 var tmpModalID = oWin.modalID; }
 modObj.innerHTML = ""; if (typeof this.cObj != 'undefined' && this.cObj)
 this.cObj.removeChild(modObj); if (pWin != null && modObj.bRCFModal && !isFModeLayout())
 pWin.modWin = null; if (typeof modObj.bRCFModal != 'undefined' && !modObj.bRCFModal && typeof oWin != 'undefined' && oWin != null && typeof oWin.modalID != 'undefined') {
 oWin.modalID = tmpModalID; }
 }
 if (id == MTop().hideModId) {
 try { 
 if (!bLocalModal && typeof modObj.oParentWin.winParent != 'undefined' && modObj.oParentWin.winParent != null) {
 var pmodObj = MTop().document.getElementById(MTop().PTMOD_ + modObj.oParentWin.modalID); MTop().oParentWin = modObj.oParentWin; MTop().modId = modObj.oParentWin.modalID; }
 else {
 MTop().oParentWin = null; MTop().modId = -1; this.cObj.style.display = "none"; }
 } catch (ex) {
 MTop().oParentWin = null; MTop().modId = -1; this.cObj.style.display = "none"; }
 MTop().hideModId = -1; }
 else if (bModeless)
 MTop().modlessId = -1; else {
 if (!bLocalModal && typeof modObj.oParentWin.modalID != 'undefined' && modObj.oParentWin.modalID != null) {
 var pmodObj = MTop().document.getElementById(MTop().PTMOD_ + modObj.oParentWin.modalID); MTop().oParentWin = pmodObj.oParentWin; MTop().modId = modObj.oParentWin.modalID; }
 else {
 MTop().oParentWin = null; MTop().modId = -1; if (typeof modObj.bRCFModal != 'undefined' && !modObj.bRCFModal)
 this.cObj.style.display = "none"; }
 }
 },

 
 resizeModalAll: function () {
 for (var id = MTop().modId; id > -1; id--) {
 this.resizeModalDialog(id); }
 },

 resizeModalDialog: function(id, bCenter, w, h) {
 if(MTop().bSetFocusComplete == false){
 var thisObject = this; setTimeout(function(){
 thisObject.resizeModalDialog(id, bCenter, w, h)}, 0); return; }
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (!modObj) return; if (modObj.width != -1 && modObj.height != -1) {
 w = modObj.width; h = modObj.height; }
 var oheader = MTop().document.getElementById("ptModHeader_" + id); var oTitle = MTop().document.getElementById("ptModTitle_" + id); var otb = MTop().document.getElementById("ptModTable_" + id); if (otb.style.width && otb.style.width.length > 0) {
 otb.style.width = ''; otb.style.height = ''; }
 var obottom = MTop().document.getElementById("ptModBottom_" + id); var oresize = MTop().document.getElementById("ptModResize_" + id); var oContent = MTop().document.getElementById("ptModContent_" + id); var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); var oMsg = MTop().document.getElementById("alertmsg"); var oBtn = MTop().document.getElementById("okbutton"); var oWin = null; var fullWidth = ptCommonObj2.getViewportWidth(); var fullHeight = ptCommonObj2.getViewportHeight(); var currDoc = null; var nMinScrollH = 0, nMinScrollW = 0; if (browserInfoObj2.isiPad && oframe) {
 modObj.bPopup = false; modObj.bCenter = true; }

 if (modObj.bPopup) {
 var rObj = this.getParentPopup(modObj); if (!rObj && modObj.nRCFLeft == -1)
 modObj.bPopup = false; else {
 var nLeft = 0; var nTop = 0; var nBottom = 0; var nRight = 0; if (rObj)
 {
 var pos = rObj.getBoundingClientRect(); nLeft = pos.left; nTop = pos.top; nBottom = pos.bottom; nRight = pos.right; }
 else
 {
 nLeft = nRight = modObj.nRCFLeft; nTop = nBottom = modObj.nRCFTop; }
 }
 }
 if(typeof oBtn == "undefined" || oBtn == null)
 oBtn = MTop().document.getElementById("alertbutton"); if (oframe) {
 oWin = oframe.contentWindow; try {
 if (!modObj.bCrossDomain)
 currDoc = oWin.document; } catch (e) {return;}
 }
 bCenter = (typeof bCenter == "undefined") ? true : bCenter;  if (bCenter && !modObj.bCustResize) {
 w = (typeof w == "undefined") ? 0 : w; h = (typeof h == "undefined") ? 0 : h; if (!modObj.bMsg && oframe) {
 oframe.style.width = w + 'px'; oframe.style.height = h + 'px'; }
 if (modObj.bCrossDomain) {
 w = (w == -1) ? parseInt(fullWidth * 0.4, 10) : w; h = (h == -1) ? parseInt(fullHeight * 0.5, 10) : h; }
 if (browserInfoObj2.isiPad && browserInfoObj2.isSafari) {
 
 w = (w <= 0) ? parseInt(fullWidth * 0.8, 10) : w; h = (h <= 0) ? parseInt(fullHeight * 0.5, 10) : h; }
 var h_win = h; if (fullHeight > 160) fullHeight -= 50; if ((modObj.width != -1 && modObj.height != -1) && modObj.bDivPopup)
 {}
 else if (modObj.bMsg || modObj.bDivPopup) {
 w = otb.scrollWidth; h = otb.scrollHeight; }
 else if (!modObj.bCrossDomain) {
 try {
 if (detectDoctype(currDoc))
 w = oWin.document.documentElement.scrollWidth; else
 w = oWin.document.body.scrollWidth; } catch (e) {}
 var aObj = oWin.document.getElementById("ACE_width"); var w2 = 0; if (aObj && typeof aObj.width !== "undefined" && aObj.width != "")
 w2 = new Number(aObj.width).valueOf(); try {
 if (detectDoctype(currDoc) || !browserInfoObj2.isIE)
 h = oWin.document.documentElement.scrollHeight; else
 h = oWin.document.body.scrollHeight; if (isFModeLayout()){
 nMinScrollH = Math.min(fullHeight, h); nMinScrollW = Math.min(fullWidth, w); }
 offw = w - oWin.document.body.clientWidth; offh = h - oWin.document.body.clientHeight; } catch(e) {
 
 if (browserInfoObj2.isiPad && browserInfoObj2.isSafari) {
 h = h_win; offw = w; offh = h; }
 }

 var minW = 0;  var minH = 0;     var specModalPage = oWin.document.body.innerHTML.indexOf("javascript:DatePrompt_win") != -1 || oWin.document.body.innerHTML.indexOf("a name=\"PROMPT_XLAT1\"") != -1 ; if (!modObj.bMsg && !modObj.bCustResizeDone && specModalPage && (w < 350 || h < 350))
 {
 minW = 400; if (h < 350)
 minH = 350;  else 
 minH = h;  }

 if (MTop().RTEModal){
 h += 135 * MTop().RTEInstances ; MTop().RTEModal = false; }
 if (oWin.modalZoomName != null) {
 var zObj = oWin.document.getElementById(oWin.modalZoomName); if (zObj && zObj.innerHTML.indexOf("CKEDITOR") != -1) {
 w += 48; h += 90; } else if (zObj) {
 var aObj; if (browserInfoObj2.isIE)
 aObj = zObj.firstChild; else
 aObj = zObj.firstElementChild; if (aObj && typeof aObj.width !== "undefined" && aObj.width != "")
 {
 w2 = new Number(aObj.width).valueOf(); if (browserInfoObj2.isiPad && browserInfoObj2.isSafari)
 w = w2; }
 }
 }
 if (w < minW) w = minW; if (h < minH) h = minH; }

 var maxW = fullWidth; var maxH = fullHeight; if (w > maxW) 
 {
 if (! (browserInfoObj2.isiPad && browserInfoObj2.isSafari))
 w = maxW; }
 if (h > maxH) h = maxH; }
 var isStandards = detectDoctype(currDoc) ? true : false;  var mtopDoc = isStandards ? MTop().document.documentElement : MTop().document.body;  if (!modObj.bCustMove) {
 if (!modObj.bPopup) {
 if (isFModeLayout()) {
 if (h > maxH) {
 h = Math.max(maxH - 10, nMinScrollH - 5); }
 if (w > maxW ) {
 w = Math.max(maxW - 5, nMinScrollW - 5); }
 }
 var mtopDocScrollTop = MTop().document.documentElement.scrollTop || MTop().document.body.scrollTop; if (h != maxH)
 otb.style.top = (fullHeight - h) / 2 + mtopDocScrollTop + 'px'; else 
 otb.style.top = 25 + mtopDocScrollTop + 'px'; if (w != maxW) {
 
 
 
 if ("ltr" === "rtl" && browserInfoObj2.isIE &&
 (document.compatMode != "CSS1Compat" || (document.documentMode && document.documentMode == 7))) {
 var sLeft = parseInt((document.body.scrollWidth - document.body.clientWidth- document.body.scrollLeft),10); otb.style.left = (fullWidth - w) / 2 + sLeft + "px"; } else {
 if (isFModeLayout())
 otb.style.left = (fullWidth - (w + modObj.nPopupBW * 2)) / 2 + mtopDoc.scrollLeft + 'px'; else {
 var tleft = (fullWidth - w) / 2 + mtopDoc.scrollLeft; if(tleft < 0 )
 tleft = 3; otb.style.left = tleft + 'px'; }

 }
 } else {
 otb.style.left = 40 + mtopDoc.scrollLeft + 'px'; w = maxW - 80; }
 }
 if (!isFModeLayout() && h == maxH && !modObj.bPopup)
 h = maxH - 50; if (!isFModeLayout() && w == maxW && !modObj.bPopup)
 w = maxW - 80; }
 
 if (oheader) {
 if (isFModeLayout())
 removeHide(oheader); else
 oheader.style.display = 'block'; }
 if (modObj.bBackCancel)
 this.setModalDialogBack(id, "", modObj.sBackTitle, modObj.bBackCancel); this.setModalDialogTitle(id); if (!modObj.bCustResize) {
 try {
 var heightFlag = browserInfoObj2.isIE ? oWin.document.body.clientHeight <= oWin.document.body.scrollHeight : oWin.document.body.clientHeight < oWin.document.body.scrollHeight; if (!modObj.bCrossDomain && !modObj.bMsg && oWin.modalZoomName == null && heightFlag) {
 w += 18; }
 } catch (e) {}
 
 if (modObj.bFullScreen) {
 if (modObj.bViewAtt) {
 hidePtWrapper(); }
 otb.style.left = 0; otb.style.top = 0; w = ptCommonObj2.getViewportWidth();  h = ptCommonObj2.getViewportHeight();  if (!oframe || !isFModeLayout()) {
 otb.style.width = w + 'px'; otb.style.height = h + 'px'; }
 if (oheader) {
 
 h -= oheader.clientHeight; }
 if (!modObj.bMsg && oframe) {
 oframe.style.width = w + 'px'; oframe.style.height = h + 'px'; }
 oContent.style.height = h + 'px'; } else { 

 if (!isFModeLayout()) w = w + 14; if (isFModeLayout()) h = h + 3; h2 = h; if (oheader) h2 += oheader.clientHeight; if (oresize) h2 += oresize.clientHeight; if (!oframe || !isFModeLayout())
 {
 if (modObj.bRCFModal)
 {
 otb.style.width = "auto"; otb.style.minWidth = "0px"; }
 else
 otb.style.width = (w + 2) + 'px'; }
 if (obottom)
 obottom.style.width = oContent.style.width;  if (modObj.bMsg && !isFModeLayout())
 {}
 else if (!oframe || !isFModeLayout()) 
 otb.style.height = h2 + 'px'; if (!modObj.bMsg) {
 if (oframe) {
 oframe.style.width = w + 'px'; oframe.style.height = h + 'px'; }
 if (!modObj.bCrossDomain) {
 h_win = h - ptCommonObj2.getHeight(oTitle); try {
 oWin.document.body.scrollTop = 0; oWin.document.body.scrollLeft = 0; } catch (e) {}
 }
 }
 }
 }
 
 this.positionPopup(modObj, otb, id); if (modObj.bMask && modObj.width == -1)
 {
 if (!modObj.bModeless)
 this.showMask(modObj, id);  else if (!isFModeLayout())
 {
 if (!modObj.bPopup)
 this.AddHandler(id);  }
 }



 if (isFModeLayout() && modObj.bAutoClose) {
 var oModParent = modObj.oParentWin; var popMask = oModParent.document.getElementById('pt_modalMask'); popMask.addEventListener("click", autoClose, false); if (modObj.bFullScreen && oheader)
 oheader.addEventListener("click", autoClose, false); }

 modObj.oParentWin.bProcess = false; this.setModalDialogTitle(id); if (modObj.bMsg && !isFModeLayout()) this.setMsgFocus(id); if (isFModeLayout() && isAccessibleLayout()) hidePtWrapper(); modObj.style.visibility = "";   var otb = MTop().document.getElementById("ptModTable_" + id);  if (modObj.nRight > 0)otb.style.right = modObj.nRight + 'px'; if (isFModeLayout()) {
 if (modObj.bMsg || modObj.bDivPop)
 this.setFocusFMode(id); else if (modObj.bPopup && !modObj.bTypeAhead) { 
 this.setPopupFocus(id); }
 }
 modObj.bCustResizeDone = false;  return true; },
 getParentPopup: function(modObj)
 {
 var rObj = null; if (!modObj.bPopup) return rObj; if (modObj.sPopupParentId.length > 0)
 {
 rObj = document.getElementById(modObj.sPopupParentId); if (!rObj)
 {
 try{
 var Doc=(modObj.ownerDocument.contentWindow) ? modObj.ownerDocument.contentWindow.document : modObj.ownerDocument.activeElement.contentDocument; rObj = Doc.getElementById(modObj.sPopupParentId); }
 catch (err) 
 {
 return null; }
 }
 }
 else if (modObj.sPopupParentQS.length > 0)
 rObj = document.querySelector(modObj.sPopupParentQS); return rObj; }, 

positionPopup: function (modObj, otb, id) {
 if (!isFModeLayout() || !modObj.bPopup || modObj.bFullScreen || modObj.bCenter) return;  var fullWidth = ptCommonObj2.getViewportWidth() - 20; var fullHeight = ptCommonObj2.getViewportHeight() - 20; var rObj = this.getParentPopup(modObj); if (!rObj && modObj.nRCFLeft == -1) return; if (isTouchKeyboard() && modObj.bTypeAhead)
 otb.style.height = (otb.clientHeight - 300) + 'px'; if (otb.clientWidth > fullWidth)
 otb.style.width = fullWidth-5 + 'px'; modObj.nRight = 0; var eArrowLeft = null; var eArrowRight = null; if (modObj.bTail) {
 eArrowLeft = otb.querySelector("#ptArrow1_" + id); eArrowRight = otb.querySelector("#ptArrow2_" + id); }

 var nTMTop = (modObj.bTail) ? modObj.nTailMTop : 0; var nTW = (modObj.bTail) ? modObj.nTailW : 0; var nTH = (modObj.bTail) ? modObj.nTailH : 0; var nBW = modObj.nPopupBW; var nParentLeft = 0; var nParentTop = 0; var nParentBottom = 0; var nParentRight = 0; if (rObj)
 {
 var pos = rObj.getBoundingClientRect(); nParentLeft = pos.left; nParentTop = pos.top; nParentBottom = pos.bottom; nParentRight = pos.right; }
 else if (modObj.nRCFLeft != -1)
 {
 nParentRight = nParentLeft = modObj.nRCFLeft; nParentBottom = nParentTop = modObj.nRCFTop; }
 else
 return; var nRW = nParentRight - nParentLeft; var nLeft = nParentLeft - otb.clientWidth - (nParentRight - nParentLeft); var nRight = fullWidth - (nParentRight + otb.clientWidth); var nTop = nParentBottom - otb.clientHeight; var nBottom = fullHeight - (nParentBottom + otb.clientHeight); var bLeft = (nLeft > 0 && nLeft > nRight) ? true : false; var bRight = (nRight > 0 && nLeft <= nRight) ? true : false; var bUp = (nTop > 0 && nTop > nBottom) ? true : false; var bDown = (nBottom > 0 && nTop <= nBottom) ? true : false; if (!modObj.bCustPos) {
 if (bLeft || bRight) 
 modObj.bVertical = false; else if (bUp || bDown)
 modObj.bVertical = true; else {
 modObj.bVertical = true; if (nBottom > nTop)
 bDown = true; else
 bUp = true; }
 }

 if (modObj.bTail) {
 if (modObj.bVertical) {
 addClass(otb.firstElementChild, "ps_popup-vertical"); addClass(eArrowLeft, "ps_arrow_top"); addClass(eArrowRight, "ps_arrow_bottom"); }
 else {
 addClass(otb.firstElementChild, "ps_popup-horizontal"); addClass(eArrowLeft, "ps_arrow_left"); addClass(eArrowRight, "ps_arrow_right"); }
 }
 if (!modObj.bVertical) {
 var nW1 = fullWidth - (nParentRight + otb.clientWidth); var nW2 =nParentLeft - otb.clientWidth; var nH1 = fullHeight - (nParentTop + otb.clientHeight); var nH2 = nParentBottom - otb.clientHeight; if (bRight) {
 if (modObj.bAnm) addClass(modObj.firstChild, 'psc_easel'); if (modObj.bTail) {
 otb.style.left = nParentRight + nTW/2 + 'px'; eArrowLeft.style.display = "block"; }
 else
 otb.style.left = nParentRight + 'px'; }
 else {
 if (modObj.bAnm) addClass(modObj.firstChild, 'psc_easer'); var nLeft = nParentLeft - otb.clientWidth - (nParentRight - nParentLeft)/2; nLeft = (nLeft >= 0) ? nLeft : 0; if (modObj.bTail) {
 eArrowRight.style.marginRight = -(nTW + nBW)+'px'; eArrowRight.style.display = "block"; otb.style.left = nLeft + 'px'; }
 else
 otb.style.left = nLeft + 'px'; }
 var nTop = nParentBottom - otb.clientHeight; if (nTop < 0) nTop = 0; if (modObj.bTail) {
 var nTop = nParentTop + (nParentBottom - nParentTop) * 2 - otb.clientHeight; if (nTop < 0) nTop = 0; otb.style.top = nTop + 'px'; var nMTop = nParentTop - nTop + (nParentBottom - nParentTop) / 2; if (modObj.nRCFLeft != -1)
 nMTop -= 16; if (bRight) 
 eArrowLeft.style.top = nMTop + 'px'; else
 eArrowRight.style.top = nMTop - nTW + 'px'; } else
 otb.style.top = nTop + 'px';  if (modObj.bSidePage)
 modObj.nRight = nParentRight - nParentLeft; return; }
 if (modObj.bVertical) {
 var nPosCenter = nParentLeft + (nParentRight - nParentLeft) / 2; var nLeft = nPosCenter - otb.clientWidth / 2; if (modObj.nAlign == 1)
 nLeft = nParentLeft; if (nLeft < 0) nLeft = nParentRight - otb.clientWidth; if ((nLeft + otb.clientWidth) > fullWidth) nLeft = fullWidth - otb.clientWidth -4; if (nLeft < 10) nLeft = 10; otb.style.left = nLeft + 'px'; if (modObj.bTypeAhead) {
 bDown = true; var nH1 = fullHeight - (nParentBottom + otb.clientHeight); var nH2 = nParentTop - otb.clientHeight; if ((nParentBottom + otb.clientHeight) > fullHeight && (nH2 > nH1))
 bDown = false; } 
 if (bDown) {
 if (modObj.bAnm) addClass(modObj.firstChild, 'psc_easet'); if (modObj.bTail) {
 var nTRight = nLeft + otb.clientWidth - nParentRight + (nParentRight - nParentLeft) / 2 - 2; if (nTRight < 0) nTRight = 5; eArrowLeft.style.right = nTRight + 'px'; eArrowLeft.style.display = "block";  otb.style.top = nParentBottom + (nTH - nBW)/2 + 'px'; }
 else {
 nTop = nParentBottom; if ((nParentBottom + otb.clientHeight) > fullHeight)
 nTop = nParentBottom - ((nParentBottom + otb.clientHeight) - fullHeight); if (nTop < 0) nTop = 0; otb.style.top = nTop + 'px'; }
 if (modObj.bTypeAhead) {
 nHeight = fullHeight - nParentBottom - 10; otb.style.height = nHeight + 'px'; }
 }
 else
 {
 if (modObj.bAnm) addClass(modObj.firstChild, 'psc_easeb'); if (modObj.bTail) {
 eArrowRight.style.left = nParentLeft - nLeft + (nParentRight - nParentLeft) + 'px'; eArrowRight.style.marginTop = '1px'; eArrowRight.style.display = "block"; if (nTop < 0) {
 nHeight = Math.min(fullHeight, otb.clientHeight, nParentTop); otb.style.height = nHeight + 'px'; otb.style.top = 0 + 'px'; }
 else 
 otb.style.top = nTop - (nTH + nBW) + 'px'; }
 else {
 var nHeight = otb.clientHeight + nTop; if (modObj.bTypeAhead) {
 nTop = nTop - (nParentBottom - nParentTop); nHeight -= (nParentBottom - nParentTop + 5); if (nTop < 0) 
 nHeight = nParentTop - 5; var objH = document.getElementById('PT_HEADER'); if (objH) {
 var posH = objH.getBoundingClientRect();  nHeight = nParentTop - (posH.bottom+22); nTop = posH.bottom; }
 otb.style.height = nHeight + 'px'; } else if (nTop < 0) {
 nTop = 0; otb.style.height = nHeight + 'px'; }
 otb.style.top = nTop + 'px'; }
 } 
 }
},
showMask: function(modObj, id) {
 var oWin = null; var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); if (oframe)
 oWin = oframe.contentWindow; if (!modObj.bPopup)
 this.AddHandler(id); var oModParent = null; var oParentWin = modObj.oParentWin; if (modObj.bCrossDomain) {
 if (!modObj.bModeless)
 oModParent = MTop(); }
 else {
 oParentWin = modObj.oParentWin; var bPModeless = this.isParentModeless(oParentWin); if (!oParentWin.winParent && !modObj.bModeless && !bPModeless) {
 this.hideModeless(); }
 if (!oParentWin.ptConsole2.isActive() && !modObj.bModeless) {
 if (oParentWin.winParent) {
 this.RemoveHandler(oParentWin.modalID); oModParent = oParentWin; }
 else {
 if (bPModeless)
 oModParent = oParentWin; else{
 oModParent = MTop(); }
 }
 }
 }
 if (!oModParent) oModParent = modObj.oParentWin; if (isFModeLayout()) 
 ptCommonObj2.showPopupMask(oModParent, 'pt_modalMask', modObj.bModeless, modObj.sMaskStyle); else {
 if(oParentWin.winParent)
 ptCommonObj2.setParModMask(MTop(), oModParent.modalID); else
 ptCommonObj2.showPopupMask(MTop()); }
 },
getModalDialogTitle: function(id) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); if (modObj.sTitle.length > 0)
 return modObj.sTitle; else {
 try {
 var oTitleText = null; if (modObj.bMsg)
 oTitleText = MTop().document.getElementById("msgTitle"); else
 oTitleText = oframe.contentWindow.document.getElementsByTagName("title")[0]; if (typeof oTitleText != 'undefined' && oTitleText){
 var sTitle = ""; if (modObj.bMsg)
 sTitle = oTitleText.innerHTML; else {
 var oObj = document.createElement("div"); oObj.innerHTML = (typeof oTitleText.text != "undefined") ? oTitleText.text : oTitleText.innerHTML; var sTitle = ""; if (browserInfoObj2.isIE)
 sTitle = oObj.outerText; else
 sTitle = oObj.textContent; }
 return sTitle; }
 } catch (e) {
 return ""; }
 }
 },
setModalDialogBack: function (id, sBackIdQS, sBackTitle, bBackCancel) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); var oheader = MTop().document.getElementById("ptModHeader_" + id); if (typeof bBackCancel != "undefined" && bBackCancel) {
 modObj.sBackIdQS = sBackIdQS; modObj.sBackTitle = sBackTitle; modObj.sBackTitle = bBackCancel; oheader.children[0].innerHTML = "<span class='ps-button-wrapper' title='" + modObj.sBackTitle + "'><a class='ps-button' role='button' href=\"javascript:closeLastModal();\" onclick=\"javascript:closeLastModal();\">" + modObj.sBackTitle + "</a></span>"
 }
 else if (typeof sBackIdQS == "undefined")
 oheader.children[0].innerHTML = ""; else {
 modObj.sBackIdQS = sBackIdQS; modObj.sBackTitle = sBackTitle; oheader.children[0].innerHTML = "<span class='ps-button-wrapper' title='" + modObj.sBackTitle + "'><a class='ps-button' role='button' href=\"javascript:backMenu('" + sBackIdQS + "')\" onclick=\"javascript:backMenu('" + sBackIdQS + "')\"><img src='" + modalBackUrl + "' alt='" + modalBackAlt + "'></a></span>"
 }
 },
setModalDialogTitle: function(id, sTitle) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); var oTitleBar = MTop().document.getElementById("ptModTitleBar_" + id); if (!oTitleBar) return; var oContent = MTop().document.getElementById("ptModContent_" + id); var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); var oTitle = MTop().document.getElementById("ptModTitle_" + id); var oTitleText = null; if (typeof sTitle != "undefined" && sTitle.length > 0){
 if(isAccessibleLayout() && sTitle.indexOf("folder")>-1){
 var slen = sTitle.length; oTitle.innerHTML = sTitle.substring(0,slen-7); }
 else
 oTitle.innerHTML = sTitle;  }
 else if (modObj.sTitle.length > 0)
 oTitle.innerHTML = modObj.sTitle; else {
 try {
 var oTitleText = null; if (modObj.bMsg){
 oTitleText = MTop().document.getElementById("msgTitle"); if(oTitleText != null)
 oTitleText.parentNode.removeChild(oTitleText); }
 else
 oTitleText = oframe.contentWindow.document.getElementsByTagName("title")[0]; if (typeof oTitleText != 'undefined' && oTitleText){
 var sTitle = ""; if (modObj.bMsg)
 sTitle = oTitleText.innerHTML; else {
 var oObj = document.createElement("div"); oObj.innerHTML = (typeof oTitleText.text != "undefined" && oTitleText.text.length > 0) ? oTitleText.text : oTitleText.innerHTML; var sTitle = ""; if (browserInfoObj2.isIE)
 sTitle = oObj.outerText; else
 sTitle = oObj.textContent; }
 oTitle.innerHTML = sTitle; }
 } catch (e) {
 oTitle.innerHTML = ""; }

 }
 var octl = MTop().document.getElementById("ptModControl_" + id); if (octl) octl.style.cssFloat = 'right'; var newWidth = (oContent.clientWidth - 21);  if (browserInfoObj2.isIE) 
 newWidth = newWidth - 3; if (newWidth > 0 && !isFModeLayout())
 oTitleBar.style.width = newWidth + 'px';  },

 showModelessDialog: function(url, obj, option) {
 },

 setEvent: function(obj) {
 ptEvent.add(obj, "mouseup", getPTDialog().onmouseup); ptEvent.add(obj, "mousemove", getPTDialog().onmousemove); ptEvent.add(obj, "dragstart", getPTDialog().cancelEvent); ptEvent.add(obj, "selectstart", getPTDialog().cancelEvent); },

 removeEvent: function(obj) {
 ptEvent.remove(obj, "mouseup", getPTDialog().onmouseup); ptEvent.remove(obj, "mousemove", getPTDialog().onmousemove); ptEvent.remove(obj, "dragstart", getPTDialog().cancelEvent); ptEvent.remove(obj, "selectstart", getPTDialog().cancelEvent); },
 cancelEvent: function(e) {
 return false; },
 onmouseup: function() {
 var id = getPTDialog().moveId; var shadowObj = MTop().document.getElementById("ptModalShadow"); if (!shadowObj.bMousedown) return; shadowObj.bMousedown = false; var XYposition = ptCommonObj2.getPosition(shadowObj); var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); var oHeader = MTop().document.getElementById("ptModHeader_" + id); var otb = MTop().document.getElementById("ptModTable_" + id); var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); var oWin = null; if (oframe)
 oWin = oframe.contentWindow; if (shadowObj.bMove) {
 otb.style.left = XYposition.x + 'px'; otb.style.top = XYposition.y + 'px'; shadowObj.bMove = false; modObj.bCustMove = true; } 
 else if (shadowObj.bResize && modObj.bCustResizeDone) {
 getPTDialog().resizeModalDialog(id, false, ptCommonObj2.getWidth(shadowObj), ptCommonObj2.getHeight(shadowObj));  if (!modObj.bCrossDomain && oWin && oWin.modalZoomName != null) {
 var zObj = oWin.document.getElementById(oWin.modalZoomName); if (zObj && zObj.innerHTML.indexOf("CKEDITOR") == -1)
 oWin.resizeZoomGrid(oWin.modalZoomName,ptCommonObj2.getWidth(modObj), ptCommonObj2.getHeight(modObj)); } 
 shadowObj.bResize = false; }
 shadowObj.style.left = "0px"; shadowObj.style.top = "0px"; shadowObj.style.width = "0px"; shadowObj.style.height = "0px"; shadowObj.style.zIndex = -1; shadowObj.style.display = "none"; getPTDialog().removeEvent(document); if (!modObj.bCrossDomain) {
 var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); if (oframe) {
 var oWin = oframe.contentWindow; var oDoc = oWin.document; getPTDialog().removeEvent(oDoc); }
 } 
 
 if (modObj.bModeless) {
 ptCommonObj2.hidePopupMask(top, 'pt_modalMaskCover', true); }
 document.body.style.cursor = "auto"; },
 onmousemove: function(e) {
 e = e || window.event; var mousePos = ptCommonObj2.getMouseCoords(e); var shadowObj = MTop().document.getElementById("ptModalShadow"); var x = mousePos.x; var y = mousePos.y;  if (typeof shadowObj.bMousedown == 'undefined' || !shadowObj.bMousedown) return; var xdiff = parseInt((x - shadowObj.mouse_x) + 0); var ydiff = parseInt((y - shadowObj.mouse_y) + 0); shadowObj.mouse_x = x; shadowObj.mouse_y = y; if (xdiff == 0 && ydiff == 0) return; if (shadowObj.bMove) {
 shadowObj.style.left = xdiff + shadowObj.offsetLeft + "px"; shadowObj.style.top = ydiff + shadowObj.offsetTop + "px"; }
 else if (shadowObj.bResize) {
 modObj.bCustResize = false; var isIEQuirks = browserInfoObj2.isIE && document.compatMode != "CSS1Compat";  var newWidth = xdiff + (isIEQuirks ? shadowObj.offsetWidth :shadowObj.clientWidth );  var newHeight = ydiff + (isIEQuirks ? shadowObj.offsetHeight : shadowObj.clientHeight);  if (newWidth > 0)
 shadowObj.style.width = newWidth + "px";  if (newHeight > 0)
 shadowObj.style.height = newHeight + "px";  modObj.bCustResizeDone = true;  }
 },

 onMouseDown: function(e) {
 e = e || window.event; var eObj = ptCommonObj2.getEO(e); var mousePos = ptCommonObj2.getMouseCoords(e); var x = mousePos.x; var y = mousePos.y; if (e.clientY >= mousePos.y) {
 
 y = e.clientY + (document.documentElement.scrollTop > 0 ? document.documentElement.scrollTop : document.body.scrollTop);  }
 var id = eObj.id.split("_")[1]; var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); var shadowObj = MTop().document.getElementById("ptModalShadow"); var otb = MTop().document.getElementById("ptModTable_" + id); var oHeader = MTop().document.getElementById("ptModHeader_" + id); var oBottom = MTop().document.getElementById("ptModBottom_" + id); var sizeBottom = oBottom ? (oBottom.offsetHeight - 5) : 0;  if (modObj.bModeless) {
 ptCommonObj2.showPopupMask(top, 'pt_modalMaskCover', true); }
 shadowObj.mouse_x = x; shadowObj.mouse_y = y; getPTDialog().moveId = id; shadowObj.style.left = otb.offsetLeft + "px"; shadowObj.style.top = otb.offsetTop + "px"; shadowObj.style.width = ptCommonObj2.getWidth(otb) + "px"; shadowObj.style.height = ptCommonObj2.getHeight(otb) + oHeader.offsetHeight + sizeBottom + "px"; shadowObj.style.zIndex = modObj.style.zIndex + 10; shadowObj.style.display = "block"; shadowObj.bMousedown = true; shadowObj.mouseOffset = ptCommonObj2.getMouseOffset(modObj, e); getPTDialog().setEvent(document); if (!modObj.bCrossDomain) {
 var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + id); if (oframe) {
 oWin = oframe.contentWindow; var oDoc = oWin.document; getPTDialog().setEvent(oDoc); }
 }
 
 },
 RemoveHandler: function(id) {
 var oTitleBar = MTop().document.getElementById("ptModTitleBar_" + id); if (!oTitleBar) return; var obottom = MTop().document.getElementById("ptModBottom_" + id); var octl = MTop().document.getElementById("ptModControl_" + id); var oresize = MTop().document.getElementById("ptModResize_" + id); if (obottom) {
 obottom.style.height = "0px"; oresize.style.display = "none"; }
 oTitleBar.onmousedown = null; if (octl) octl.style.display = "none"; oTitleBar.style.cursor = "auto"; },
 AddHandler: function(id) {
 if (isFModeLayout()) return; var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); modObj.bMove = false; modObj.bMousedown = false; modObj.bResize = false; var oTitleBar = MTop().document.getElementById("ptModTitleBar_" + id); var oTitle = MTop().document.getElementById("ptModTitle_" + id); var octl = MTop().document.getElementById("ptModControl_" + id); if (octl) octl.style.display = "block"; var shadowObj = MTop().document.getElementById("ptModalShadow"); if (oTitleBar) {
 oTitleBar.style.cursor = "move"; oTitleBar.onmousedown = function (e) { 
 document.body.style.cursor = "move"; var shadowObj = MTop().document.getElementById("ptModalShadow"); shadowObj.bMove = true; shadowObj.style.cursor = ""; getPTDialog().onMouseDown(e); }
 }
 var obottom = MTop().document.getElementById("ptModBottom_" + id); if (obottom) {
 var oresize = MTop().document.getElementById("ptModResize_" + id); oresize.style.display = "block"; if ((browserInfoObj2.isiPad && browserInfoObj2.isSafari)) {
 obottom.style.display = "none"; obottom.style.height = "0px"; } else {
 obottom.style.display = "block"; obottom.style.height = "14px"; }
 obottom.onmousedown = function(e) { 
 var shadowObj = MTop().document.getElementById("ptModalShadow"); shadowObj.bResize = true; shadowObj.style.cursor = ('ltr'=='ltr') ? 'nw-resize' : 'ne-resize'; getPTDialog().onMouseDown(e); }
 }
 if (modObj.bFullScreen) {
 window.onorientationchange = function () {
 if (typeof (modObj.orientation) === "undefined") {
 if (window.orientation == -90 || window.orientation == 90) {
 modObj.orientation = "landscape"; } else {
 modObj.orientation = "portrait"; }
 MTop().resizeModalDialog_pt(id); }
 if ((window.orientation == -90 || window.orientation == 90) && (modObj.orientation == "portrait")) {
 modObj.orientation = "landscape"; MTop().resizeModalDialog_pt(id); }

 if ((window.orientation == 0 || window.orientation == 180) && (modObj.orientation == "landscape")) {
 modObj.orientation = "portrait"; MTop().resizeModalDialog_pt(id); }
 }
 }
 }
}

function showModal(url, parentWin, options, msg, onclose, bResize, pollContent, bBulkAction) {
 if (ptConsole2.isActive() && !bPerf)
 ptConsole2.append((new Date()).valueOf() + "modal url:\n" + url + "\n"); if (typeof(parentWin.modWin) != 'undefined' && parentWin.modWin != null && (options.indexOf("bRCFModal@1") == -1)) {
 try {
 closeModal(parentWin.modWin.modalID); } catch( error ) {}
 parentWin.modWin = null; }
 
 if ((typeof(modalCloseUrl) == "undefined" || !modalCloseUrl) && top.document.getElementById("ptifrmtgtframe") && top.TargetContent) {
 var contentFrame = top.TargetContent; modalCloseUrl = contentFrame.modalCloseUrl; modalCloseAlt = contentFrame.modalCloseAlt; modalResizeUrl = contentFrame.modalResizeUrl; modalResizeAlt = contentFrame.modalResizeAlt; modalMoveAlt = contentFrame.modalMoveAlt; }
 if (typeof options !== "undefined" && options) {
 options = options + 'closeUrl@' + modalCloseUrl + ';closeAlt@' + modalCloseAlt + ';resizeUrl@' + modalResizeUrl + ';resizeAlt@' + modalResizeAlt + ';moveAlt@' + modalMoveAlt + ';';  } else {
 options = 'closeUrl@' + modalCloseUrl + ';closeAlt@' + modalCloseAlt + ';resizeUrl@' + modalResizeUrl + ';resizeAlt@' + modalResizeAlt + ';moveAlt@' + modalMoveAlt + ';'; }
 
 parentWin.modWin = showModalDialog_pt(url, parentWin, options, msg, onclose, null, null, pollContent); if (typeof(pollContent) !== "undefined" && pollContent !== null && pollContent) {
 setModWinParent(); } else {
 var nDelay = 1000; if (!browserInfoObj2.isIE) { nDelay = 2000; }
 if (typeof bResize != 'undefined' && bResize) { nDelay = 0; }
 parentWin.setModWinID = window.setTimeout('setModWinParent();', nDelay); }

 if (typeof(bBulkAction) !== 'undefined' && bBulkAction !== null && bBulkAction)
 return parentWin.modWin;}

function setModlessWinParent() {
 setModWinParent(window.modLessWin);}

function setModWinParent(modlessWin) {
 if (MTop().modId == -1) return; var modWin = window.modWin; var bModless = false; if (typeof modlessWin != 'undefined') { modWin = modlessWin; bModless = true; }
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + MTop().modId); var bPIA = modObj.bPIA; var obj = null; var pId = null; var owin = null; var modErrObj = null; if (modObj.bCrossDomain) {
 getPTDialog().resizeModalDialog(MTop().modId, true, modObj.width, modObj.height); return; }
 try {
 obj = modWin.contentWindow.document.body; var id = modWin.id; pId = id.split("_")[1]; if (!bPIA) { 
 modWin.contentWindow.winParent = window; modWin.contentWindow.dialogArguments = window; modWin.contentWindow.modalID = pId; modWin.contentWindow.name = "modWin_" + pId; }
 owin = modWin.contentWindow;  if (bModless)
 window.modlessWin = owin; else
 window.modWin = owin; var modDoc = modWin.contentWindow.document; modErrObj = modDoc.getElementById("PSMODAL_FATAL"); if (typeof setModWinID != 'undefined' && setModWinID != null)
 window.clearTimeout(setModWinID); if (modErrObj) {
 pWin = getFirstParentWin(); var formname = modObj.form.name; oForm = pWin.document.getElementById(formname); var modObj = getFirstModObj; var name = modObj.name; var sTxt = modErrObj.innerHTML; var xmlResponse = sTxt.substring(5, sTxt.length - 5); if (ptConsole2.isActive() && !bPerf)
 ptConsole2.append((new Date()).valueOf() + " modal FATAL ERROR abort response:\n" + xmlResponse); closeModal(); var sScript = 'var postUrl=postUrl_' + oForm.name + ';'; eval(sScript); loader = new pWin.net2.ContentLoader(postUrl, oForm, name, null, null, null, null, null, true, true, null, false, xmlResponse); } 
 else {
 modErrObj = modDoc.getElementById("PSMODAL_ERR"); if (modErrObj) { 
 var sTxt = modErrObj.innerHTML; var xmlResponse = sTxt.substring(5, sTxt.length - 5); if (ptConsole2.isActive() && !bPerf)
 ptConsole2.append((new Date()).valueOf() + " modal abort response:\n" +xmlResponse); closeModal(pId);  var sScript = 'var postUrl=postUrl_' + modObj.form.name + ';'; eval(sScript); loader = new net2.ContentLoader(postUrl, modObj.form, modObj.name, null, null, null, null, null, true, true, null, false, xmlResponse); } 
 else if (pId && owin && (!bPIA)) {
 MTop().resizeModalDialog_pt(pId);  }
 }
 }
 catch (err) {
 
 if (bModless)
 setModWinID = window.setTimeout('setModlessWinParent();', 100000); else
 setModWinID = window.setTimeout('setModWinParent();', 100000); return; }
}

function showModalDialog_pt(url, obj, options, msg, onclose, form, name, pollContent) {
 return getPTDialog().showModalDialog(url, obj, options, msg, onclose, form, name, pollContent);}

function resizeModalDialog_pt(id, bReload) {

 if(typeof CKEDITOR != "undefined"){
 MTop().RTEModal = true; MTop().RTEInstances = getNumberofRTEInstances(); }
 else
 MTop().RTEModal = false; if (typeof bReload != 'undefined' && bReload) {
 return getPTDialog().resizeModalDialog(id, true); }

 return getPTDialog().resizeModalDialog(id);}

function resizeModalAll() {
 return getPTDialog().resizeModalAll();}

function hideModal(id) {
 return getPTDialog().hideModalDialog(id);}
function closeHideModal(id) {
 if (typeof(getPTDialog()) != "undefined" && getPTDialog())
 return getPTDialog().closeHideModal(id);}

function closeModalAll() {
 return getPTDialog().closeModalAll();}

function closeModal(id) {
 return getPTDialog().closeModalDialog(id);}

function closeModal0(id) {
 return MTop().ptDialog.closeModalDialog0(id);}

function closeLastModal(evt, target, oParentWin) {
 if (bLocalModal)
 doCloseLocalModals(); if (window.modalID == MTop().modId) return; if (target && getPTDialog().isInModal(MTop().modId, target)) return; getPTDialog().doCloseModalDialog(MTop().modId); var target = ptCommonObj2.getEO(evt); if (target)
 target.removeEventListener("click", autoClose, false);  if (isFModeLayout()) {
 var histElement; var histElementString = sessionStorage.getItem("pt_doback_popped_element_nui"); if (typeof histElementString != undefined && histElementString && (target.parentElement.id == "#ALERTYES" || target.parentElement.id == "#ICYes$span")) {
 histElement = JSON.parse(histElementString); AddToHistory(histElement.label, '', '', histElement.pageName, histElement.stateNum, 0); }
 sessionStorage.removeItem("pt_doback_popped_element_nui"); }
 
 if (!isAnyModal()) {
 if (typeof oParentWin != "undefined" && oParentWin)
 ptCommonObj2.tryFocus0(oParentWin.gFocusObj); else
 ptCommonObj2.tryFocus0(gFocusObj); } 
}

function isAnyModal(){
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + MTop().modId); if (!modObj) return false; return true;}

function autoCloseTypeAhead(evt) {
 var id = getPTDialog().getTypeAheadModalId(); if (id.length == 0) return; getPTDialog().doCloseModalDialog(id); setLocalModal(false);}

function autoCloseGridSort(evt) {
 var id = getPTDialog().getGridSortModalId(); if (id.length == 0) return; getPTDialog().doCloseModalDialog(id); setLocalModal(false);}

function doCloseLocalModals() {
 if (!bLocalModal) return; doCloseModalDialogAll(); setLocalModal(false);}

function autoClose(evt)
{
 var target = ptCommonObj2.getEO(evt); if(doCloseModalDialogAll()){ 
 if (target)
 target.removeEventListener("click", autoClose, false); if (bLocalModal) setLocalModal(false); }
}

function setLocalModal(bFlag) {
 bLocalModal = bFlag;}

function doCloseModalDialogAll() {
 return getPTDialog().doCloseModalDialogAll();}

function doCloseModal(obj) {
 var id; if(typeof(obj) == "object")
 id = obj.id.split("_")[1]; else
 id = obj; getPTDialog().doCloseModalDialog(id);  if (isFModeLayout() && isTouchKeyboard())
 initScrolls();}

function doCloseModal0(id) {
 return getPTDialog().doCloseModalDialog0(id);}

function getFirstParentWin() {
 return getPTDialog().getFirstParentWin();}

function getFirstModObj() {
 return getPTDialog().getFirstModObj();}

function getModObjHeight(id) {
 var otb = MTop().document.getElementById("ptModTable_" + id); if (otb)
 return otb.clientHeight; else
 return -1;}

function getModObjHeaderHeight(id) {
 var obj = MTop().document.getElementById("ptModHeader_" + id); if (obj)
 return obj.clientHeight; else
 return -1;}

function addMsg(msg, oParentWin, options)
{ 
 if (typeof oParentWin == 'undefined') {
 oParentWin = window; options = 'closeUrl@' + modalCloseUrl + ';closeAlt@' + modalCloseAlt + ';resizeUrl@' + modalResizeUrl + ';resizeAlt@' + modalResizeAlt + ';moveAlt@' + modalMoveAlt + ';'; }
 return getPTDialog().addMsg(msg, oParentWin, options);}

function isAnyMsg() {
 if (getPTDialog())
 return getPTDialog().isAnyMsg(); else
 return false;}
function playMsg() {
 getPTDialog().doCloseModalDivPopup(MTop().modId); return getPTDialog().playMsg();}

function isLastMsgModal() {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + MTop().modId); if (!modObj || !modObj.bMsg) return false; return true;}

function addDivPopup(mObj, oParentWin, options, scrollId, bFrame) {
 return getPTDialog().addDivPopup(mObj, oParentWin, options, scrollId, bFrame);}

function isAnyDivPopup() {
 return getPTDialog().isAnyDivPopup();}
function playDivPopup() {
 return getPTDialog().playDivPopup();}

function showModalMessage(msg, obj, option) {
 return getPTDialog().showModalMessage(msg, obj, option);}

function closeMsg(obj,id) {
 return getPTDialog().closeModalMsg(obj,id);}

function isModeless(id) {
 return getPTDialog().isModeless(id);}

function isWinModeless(win) {
 return getPTDialog().isWinModeless(win);}
function setModalDialogBack(id, sBackIdQS, sBackTitle) {
 return getPTDialog().setModalDialogBack(id, sBackIdQS, sBackTitle);}

function setModalDialogTitle(sTitle, sBackIdQS, sBackTitle) {
 setModalDialogBack(MTop().modId, sBackIdQS, (typeof sBackTitle == "undefined") ? 'Back' : sBackTitle); return getPTDialog().setModalDialogTitle(MTop().modId, sTitle);}

function getModalDialogTitle() {
 return getPTDialog().getModalDialogTitle(MTop().modId);}

function MTop() {
 if (isFModeLayout() && bLocalModal)
 return window; try {
 
 
 if (typeof top.gFocusId != 'undefined' && top.document.getElementsByTagName("BODY")[0] != null)
 return top; else if (typeof top.ModalTop != 'undefined' && !top.ModalTop)
 return top.ModalTop; }
 catch (err) {
 }
 return getTargetFrame(top.frames);}

function getPTDialog() { 
 if (!isFModeLayout())
 return MTop().ptDialog; if (bLocalModal)
 return window.ptDialogLocal; else 
 return MTop().ptDialog;}

function getTargetFrame(frames) {
 for (var j = 0; j < frames.length; ++j) {
 var objFrame = frames[j]; if (objFrame && typeof objFrame.gFocusId != 'undefined' && (objFrame.name == "TargetContent" || objFrame.name == "rightF")) {
 top.ModalTop = window; return objFrame; }
 if (objFrame.frames.length > 0 && !isCrossDomain(objFrame))
 return getTargetFrame(objFrame.frames); }
}


if (window == top) 
 ptDialog = new PT_Dialog();else if ((typeof top.gFocusId == 'undefined' || top.document.getElementsByTagName("BODY")[0] == null) && (window.name == "TargetContent" || window.name == "rightF"))
 ptDialog = new PT_Dialog();function CopyUrlToClipboard(msg) {
if (!browserInfoObj2.isIE) { return; }

if (!msg || msg == "undefined") { msg = strCurrUrl; }
clipboardData.setData("Text", msg);}


function getContextRoot(strURL){
 var root = ""; var rootIdx = strURL.indexOf("://"); if (rootIdx != -1) {
 root = strURL.substr(rootIdx+3); var srvlet = String(root).match(/\/ps(c|p)\//);  if (srvlet != null) {
 rootIdx = root.indexOf("/"); if (rootIdx != -1) 
 root = root.substr(rootIdx, srvlet.index - rootIdx); }
 }
 return root;}


function getptBaseURI()
{
 var ptBaseURI = ""; var nPos = String(location).indexOf('\/psp\/'); if (nPos != -1)
 {
 ptBaseURI = String(location).substr(nPos,String(location).length); var addressLoc = String(ptBaseURI).match(/\/ps(c|p)\/?([^\/]*)?\/?([^\/]*)?\/?([^\/]*)?\//); if (addressLoc)
 ptBaseURI = addressLoc[0].replace('\/psp\/','\/psc\/'); else 
 ptBaseURI = ""; }
 else 
 ptBaseURI = String(location).match(/\/ps(c|p)\/?([^\/]*)?\/?([^\/]*)?\/?([^\/]*)?\//)[0].replace('psp','psc');  ptBaseURI = getContextRoot(String(location)) + ptBaseURI; return ptBaseURI;}


function post_to_url(TgtLoc, path, paramstring, method) {
 method = method || "POST";  if (TgtLoc == "_top")
 {
 var form = top.document.createElement("form"); form.setAttribute("method", method); form.setAttribute("action", path);  var strKey = paramstring.substr(0, 14); var strVal = paramstring.substr(15); var hiddenField = top.document.createElement("input");  hiddenField.setAttribute("type", "hidden"); hiddenField.setAttribute("name", strKey); hiddenField.setAttribute("value", strVal); form.appendChild(hiddenField); top.document.body.appendChild(form);  form.submit(); }
 else
 {
 var loader = new net2.ContentLoader(path, null, null, "POST", 
 function()
 {
 var newurl = this.req.getResponseHeader("Location"); path = newurl; }, null, paramstring, "application/x-www-form-urlencoded", 1, 0, null, false); var form = document.createElement("form"); form.setAttribute("method", method); form.setAttribute("action", path);  form.setAttribute("target", '_blank');  var strKey = paramstring.substr(0, 14); var strVal = paramstring.substr(15); var hiddenField = document.createElement("input");  hiddenField.setAttribute("type", "hidden"); hiddenField.setAttribute("name", strKey); hiddenField.setAttribute("value", strVal); form.appendChild(hiddenField); document.body.appendChild(form); form.submit();  } 
}


function OpenCrefInUniNav (Tgtobj,TgtLoc,bBulkAction,strBulkData,nFluidComponent){ 
 
 var ptSearchURI = ""; var ptUnBaseURI = ""; var ExternalURL = "FALSE"; var XPortal = "FALSE"; if (TgtLoc == "")
 TgtLoc = "_top";  var nUrlPos = String(Tgtobj).indexOf('\/psp\/');  if(nUrlPos === -1)
 var nUrlContPos = String(Tgtobj).indexOf('\/psc\/');   if(nUrlContPos === -1)
 ExternalURL = "TRUE";  var PortalLocation = top.document.location.href; if(PortalLocation == "")
 PortalLocation = location;  var URLArr= String(PortalLocation).split("/");  var SrchURLArr= String(Tgtobj).split("/"); if(URLArr.length >= 5 && SrchURLArr.length >= 5){
 if(URLArr[5] !== SrchURLArr[5])
 XPortal = "TRUE"; }

 if(ExternalURL != "TRUE" && XPortal != "TRUE") {
 var UnsiteName = ""; for(var ai = 0; ai < 6; ai++ ){
 if(ai==3) {
 if ((((bBulkAction != 'undefined' && bBulkAction != null) && bBulkAction == 1) && isFModeLayout()) ||
 ((typeof(nFluidComponent) != 'undefined') && nFluidComponent == 1))
 ptUnBaseURI = ptUnBaseURI+"psc"+"/"; else
 ptUnBaseURI = ptUnBaseURI+"psp"+"/"; }else {
 if(ai==4) {
 UnsiteName = URLArr[ai]; if(TgtLoc == "_blank"){
 var UnsiteNamenew =""; var UnsiteNametemp = UnsiteName.lastIndexOf("_"); var UnsiteNameNewWin = UnsiteName.substring(UnsiteNametemp + 1,UnsiteName.length); if(isNaN(UnsiteNameNewWin)) {
 UnsiteNamenew = UnsiteName + "_newwin"; URLArr[ai] = UnsiteNamenew; }
 else {
 UnsiteNamenew = UnsiteName.substring(0,UnsiteNametemp); UnsiteNamenew = UnsiteNamenew + "_newwin"; URLArr[ai] = UnsiteNamenew; }
 }
 }
 ptUnBaseURI = ptUnBaseURI + URLArr[ai]+"/"; }}

 for(var bi = 6; bi < (SrchURLArr.length); bi++ ){ 
 if((SrchURLArr.length-1) === bi) {
 ptSearchURI = ptSearchURI + SrchURLArr[bi];  }else {
 ptSearchURI = ptSearchURI + SrchURLArr[bi]+"/";  }}
 ptUnBaseURI = ptUnBaseURI + ptSearchURI ; var paramExist = Tgtobj.indexOf('?'); var unParam = "?cmd=uninav"; var temploc = ""; if ((bBulkAction != 'undefined' && bBulkAction != null) && bBulkAction == 1){
 var url = ptUnBaseURI+unParam; post_to_url(TgtLoc, url, strBulkData);  } else { 
 if(paramExist != -1){
 unParam = "&cmd=uninav"; }
 if(TgtLoc == "_blank"){
 temploc = "window.open('"+ptUnBaseURI+unParam+"','_blank')"; } else {
 var TgtLocIndx = String(TgtLoc).indexOf('_'); if(TgtLocIndx == 0){ 
 TgtLoc = String(TgtLoc).slice(1);}
 temploc = TgtLoc+".document.location = '"+ptUnBaseURI+unParam+"'"; }
 eval(temploc); }
 } else { 
 TgtLoc = "_blank"; window.open(Tgtobj,TgtLoc);  }
}



function openSrchRsltURL(openURL){ 

 
 
 if (bcUpdater && typeof bcUpdater != 'undefined' &&
 top.pthNav && typeof top.pthNav != 'undefined' &&
 (openURL.search("/psp/") > 0 || openURL.search("/psc/") > 0)) {

 bcUpdater.setStoredData(bcUpdater.isMenuCrefNav, "F"); top.pthNav.isMenuCrefNav = "F";  if (typeof bcUpdater.getStoredData(bcUpdater.searchText) != 'undefined' && bcUpdater.getStoredData(bcUpdater.searchText) != null) {
 openURL += "&sesSrchTxt="; openURL += escape(bcUpdater.getStoredData(bcUpdater.searchText)); }
 if (typeof bcUpdater.getStoredData(bcUpdater.searchText) != 'undefined' && bcUpdater.getStoredData(bcUpdater.searchText) != null) {
 openURL += "&sesCrefID="; openURL += bcUpdater.getStoredData(bcUpdater.sesCrefID); }
 }

 if (typeof ptalPage != 'undefined' && ptalPage){ 
 openURL = openURL.replace('\/psp\/','\/psc\/');  tgt= "TargetContent"; window.open(openURL, tgt); }
 else
 OpenCrefInUniNav(openURL, ""); }





var pm = new Object();(function($){
 
 
 var p_interval_id,
 p_previous_hash,
 p_cache_number = 1,
 
 
 rm_callback,
 
 
 window = this,
 FALSE = !1,
 
 
 postMessage = 'postMessage',
 addEventListener = 'addEventListener',
 
 p_accept_message,

 p_handler,

 p_messagehandler,

 p_message,

 p_messageEventDeferred = false,

 p_messageEventsApplied = false,

 p_objFrameArr = new Array(),

 postMessage_supported = window[postMessage] 
 

 $.isFunction = function( obj ) 
 {
 return Object.prototype.toString.call(obj) === "[object Function]"; };   $[postMessage] = function(msg, target_url, target) 
 {
 if (!target_url) 
 return;   msg = typeof msg === 'string' ? msg : $.param( msg );   target = target || parent; if (postMessage_supported) 
 {
 var temp_url = target_url.replace( /([^:]+:\/\/[^\/]+).*/, '$1' ); target[postMessage]( msg, temp_url); }
 else 
 {
 if (target_url) 
 target.location = target_url.replace( /#.*$/, '' ) + '#' + (+new Date) + (p_cache_number++) + '&' + msg; }
 }; $.getFrame = function(fName){
 var frame; if (fName == "" || fName == "top") 
 frame = parent; else if (fName == "RCArea")
 frame = top.frames['RelatedContent'].frames[fName]; else
 frame = top.frames[fName]; return frame;};$.getForm = function(theFrame, pName){
 var theForm;  var fDoc = theFrame.document; var pglt = fDoc.getElementById(pName); if (pglt && typeof pglt != "undefined")
 theForm = pglt.getElementsByTagName('form')[0]; else 
 if (pName.indexOf("ptpglt") != 0 )
 theForm = fDoc.getElementsByTagName('form')[0]; return theForm;};$.getFormField = function(fDoc, fldName, msgFldNames) {
 var fldArr = fDoc.getElementsByName(fldName); var msgFldArr = msgFldNames.split(","); var fldObj, msgFld; if (typeof fldArr == 'undefined' || fldArr.length == 0)
 {
 fldObj = fDoc.getElementById(fldName); if (typeof fldObj != 'undefined' && fldObj != null)
 fldArr = new Array(fldObj); }

 
 for (var j = 0; j < msgFldArr.length; j++)
 { 
 msgFld = fDoc.getElementById(msgFldArr[j]); if (typeof msgFld == 'undefined' || !msgFld)
 return null; if (typeof msgFld.form != 'undefined' && msgFld.form != null)
 break; } 
 
 fldObj = null;   if ((msgFld.form == 'undefined' || msgFld.form == null) && (fldArr.length > 0))
 fldObj = fldArr[0]; else if (fldArr.length > 0)
 {
 for (var i = 0; i < fldArr.length; i++)
 {
 
 
 if (typeof fldArr[i].form != 'undefined' && fldArr[i].form != null && fldArr[i].form.name == msgFld.form.name) 
 { 
 fldObj = fldArr[i]; break; }
 else if (fldArr[i].form == 'undefined' || fldArr[i].form == null) 
 fldObj = fldArr[i];  }
 }
 return fldObj;};$.isPageletSubscribed = function(eName)
{
 for (var x = 0; x < p_message_data.length; x++)
 {
 if (p_message_data[x][5] == eName && p_message_data[x][2] == "S")
 return true; }
 return false;};$.removeExistingEventHandler = function(fld, eventName) 
{
 var eventObject; var eventValue; if (fld.addEventListener) {
 eventObject = fld.attributes.getNamedItem("onchange"); if (eventObject != null) eventValue = eventObject.value; fld.removeEventListener(eventName, p_handler, false); } else {
 eventName = "on" + eventName; eventObject = fld.attributes.getNamedItem(eventName); if (eventObject != null) eventValue = eventObject.value; fld.detachEvent(eventName, p_handler); }
 return eventValue;};$.getJSONMessageData = function(theFrame, fldDataNames)
{
 var message = "{"; var fldId; var theDoc = theFrame.document; fieldNames = fldDataNames.split(","); for (var i = 0; i < fieldNames.length; i++)
 {
 try {
 fldId = theDoc.getElementById(fieldNames[i]); } catch(e) {}
 if (!fldId || typeof fldId == 'undefined')
 continue; if (i) message += ","; message += "'" + fldId + "' : '" + fldId.value + "'"; }
 message += "}"
 return message;};$.getStringMessageData = function(theFrame, eName, fldDataNames)
{
 var message = eName; var fldId;  var theDoc = theFrame.document || theFrame.contentDocument || theFrame.contentWindow.document; fieldNames = fldDataNames.split(","); for (var i = 0; i < fieldNames.length; i++)
 {
 try {
 fldId = theDoc.getElementById(fieldNames[i]); } catch(e) {}
 if (!fldId || typeof fldId == 'undefined')
 continue; message += ".,.";  if (fldId.nodeName.toLowerCase() == "label") {
 message += fldId.innerHTML.replace(":", ""); }
 else if (fldId.firstChild && (fldId.className.search("GRIDCOLUMNHDR") > -1)) {
 message += fldId.firstChild.nodeValue; } 
 else {
 if (fldId.tagName.toLowerCase() == "span" || fldId.tagName.toLowerCase() == "a") 
 message += fldId.innerText ? fldId.innerText: fldId.textContent;  else
 message += fldId.value; }
 
 }
 return message;};$.getIWCEventData = function(eventName, eventType)
{
 var iwcArray = new Array(); for (var x = 0; x < p_message_data.length; x++)
 {
 if (eventName == p_message_data[x].eventName && p_message_data[x].eventType == eventType)
 iwcArray.push(p_message_data[x]); }
 return iwcArray;};$.getFldPubEventData = function(fldName)
{
 if (typeof p_message_data != 'undefined') { 
 for (var x = 0; x < p_message_data.length; x++) 
 {
 if (fldName == p_message_data[x].htmlFieldName && p_message_data[x].eventType == "P") 
 return p_message_data[x]; }
 }
 return null;};$.getDelayedFldPubEvent = function(fldName)
{ 
 if (typeof p_message_data != 'undefined') { 
 for (var x = 0; x < p_message_data.length; x++)
 { 
 if (fldName == p_message_data[x].htmlFieldName && p_message_data[x].eventType == "P") 
 return p_message_data[x].p_message;  }
 }
 return null;};$.setDelayedFldPubEvent = function(fldName, iwcEvent)
{
 if (typeof p_message_data != 'undefined' && p_message_data.length > 0) { 
 for (var x = 0; x < p_message_data.length; x++)
 {
 if (fldName == p_message_data[x].htmlFieldName && p_message_data[x].eventType == "P") {
 p_message_data[x].p_message=iwcEvent; return; }
 
 }
 } 
};$.attachEvent = function(theFrame, eventName, fldName, eventJSName, fldDataNames)
{
 p_handler = function(event) 
 {
 $.GetMessageFrames(); if ((eventOnChange != null && eventOnChange.nodeValue != null) ||
 (eventOnClick != null && eventOnClick.nodeValue != null))
 {
 var iwcData = $.getIWCEventData(eventName, "P"); if (iwcData.length) {
 $.p_message = iwcData[0].p_message;  }
 }
 else
 {
 var message = $.getStringMessageData(theFrame, eventName, fldDataNames); var thisFrame; while (p_objFrameArr.length)
 {
 try 
 {
 thisFrame = p_objFrameArr.shift(); $.postMessage(message, thisFrame.location.href, thisFrame.window); }
 catch(e) {}
 }
 }
 }; var eventOnClick; var eventOnChange; var p_messageAfterEvent = ""; var fld; if (eventJSName == "C")
 eventJSName = "change"
 else {
 if (eventJSName == "L")
 eventJSName = "click"
 else 
 return p_messageAfterEvent; }

 if ($.isLevelZeroField(fldName)) {
 
 fld = $.getFormField(theFrame.document, fldName, fldDataNames); if (!fld || typeof fld == 'undefined')
 return p_messageAfterEvent; eventOnClick = fld.attributes.getNamedItem("onclick"); eventOnChange = fld.attributes.getNamedItem("onchange");   p_messageAfterEvent = $.attachEventToFldOcc(fld, p_handler, eventOnClick, eventOnChange, theFrame, eventName, eventJSName, fldDataNames); }
 else {
 
 var occIdx = 0; fld = theFrame.document.getElementById(fldName + occIdx); if (!fld || typeof fld == 'undefined')
 return p_messageAfterEvent; while ( fld ) {
 eventOnClick = fld.attributes.getNamedItem("onclick"); eventOnChange = fld.attributes.getNamedItem("onchange");  p_messageAfterEvent = $.attachEventToFldOcc(fld, p_handler, eventOnClick, eventOnChange, theFrame, eventName, eventJSName, fldDataNames); ++occIdx; fld = theFrame.document.getElementById(fldName + occIdx); }

 }

 return p_messageAfterEvent;}; $.attachEventToFldOcc = function(fld, p_handler, eventOnClick, eventOnChange,
 theFrame, eventName, eventJSName, fldDataNames) 
{
 var messageAfterEvent = ""; if ((fld.tagName.toLowerCase() == "a") || (eventOnChange != null && eventOnChange.nodeValue != null) ||
 (eventOnClick != null && eventOnClick.nodeValue != null)) {
 messageAfterEvent = "pm.eventAfterAJAX('" + theFrame.name + "', '" + eventName + "', '" + fldDataNames + "');"
 }
 else {
 if (fld.addEventListener) {
 fld.addEventListener(eventJSName, p_handler, false); } 
 else {
 eventJSName = "on" + eventJSName; fld.attachEvent(eventJSName, p_handler); }
 } 

 return messageAfterEvent;};$.isLevelZeroField = function(fldId) 
{
 if (fldId.charAt(fldId.length - 1) != '$')
 return true; return false;}; $.eventAfterAJAX = function(fName, eName, fldDataNames)
{
 var message; var theFrame = $.getFrame(fName); if (theFrame != 'undefined' && theFrame != null)
 message = $.getStringMessageData(theFrame, eName, fldDataNames);  else
 message = eName; if (!p_objFrameArr.length)
 $.GetMessageFrames(); while (p_objFrameArr.length)
 {
 var thisFrame; try 
 {
 thisFrame = p_objFrameArr.shift(); $.postMessage(message, thisFrame.location.href, thisFrame.window); }
 catch(e) {}
 }
 $.p_messageEventDeferred = false; };$.eventAfterTypeahead = function(fName, eName, fldDataNames)
{
 $.eventAfterAJAX(fName, eName, fldDataNames);};$.attachHandler = function(theFrame)
{
 
 var fDoc = theFrame.document; p_messagehandler = function(event) {
 
 var eventDataField, eventFunc; var eventDataValues = event.data.split(".,.");  sEventName = eventDataValues[0];  var iwcData = $.getIWCEventData(sEventName, "S");  if (!iwcData.length) 
 return; for (var x = 0; x < iwcData.length; x++)
 {
 var rtfldDataNames = iwcData[x].eventData; var rtfldEvent = iwcData[x].htmlFieldName; $.updateDOMFields(rtfldDataNames, eventDataValues, fDoc); if (rtfldEvent != null)
 { 
 if (rtfldEvent.indexOf("javascript:") == 0) 
 eventFunc = rtfldEvent; else
 eventDataField = fDoc.getElementById(rtfldEvent); }

 if (eventDataField != null)
 {
 var clickEvent = eventDataField.attributes.getNamedItem("onclick"); if (clickEvent && clickEvent.nodeValue != null && 
 (clickEvent.nodeValue).indexOf("cancelBubble") < 0) 
 eventDataField.onclick();  else
 {
 var submitStr = null; if (eventDataField.tagName.toLowerCase() == "a" && typeof eventDataField.href != 'undefined' &&
 eventDataField.href != null && (eventDataField.href).indexOf("javascript:") == 0) 
 submitStr = eventDataField.href;  else if (typeof eventDataField.form != 'undefined' && eventDataField.form != null)
 submitStr = "submitAction_" + eventDataField.form.name + "(document.getElementById('" + rtfldEvent + "').form, '" + rtfldEvent + "');";  if (submitStr != null)
 eval(submitStr); }
 }

 if (eventFunc != null) {
 eval(eventFunc);  } 

 if (iwcData[x].fieldEventType == "F") 
 {
 var refreshBtn = fDoc.getElementById("rfrsh_" + iwcData[x].crefId);  if (refreshBtn == null) 
 {
 if (rtfldDataNames != null && rtfldDataNames != "")
 {
 var refreshParams = $.getRefreshParams(rtfldDataNames, eventDataValues);  ptalPageletArea.reloadPagelet(iwcData[x].crefId, "", refreshParams); }
 else
 ptalPageletArea.reloadPagelet(iwcData[x].crefId, "", ""); }
 else
 {
 if (rtfldDataNames != null)
 $.refreshWithParams(refreshBtn, rtfldDataNames, eventDataValues); else
 refreshBtn.onclick();  }
 }
 }

 }

 var source_origin = fDoc.location.protocol + "//" + fDoc.location.host; $.accept_message(p_messagehandler, source_origin, 200);};$.getRefreshParams = function(fieldNames, eventDataValues)
{
 var paramStr = ""; var rtfieldNames = fieldNames.split(","); for (var i = 0; i < rtfieldNames.length; i++)
 paramStr = "&" + rtfieldNames[i] + "=" + eventDataValues[i+1]; return paramStr;};$.refreshWithParams = function(refreshBtn, fieldNames, fieldValues)
{
 var refreshParams = $.getRefreshParams(fieldNames, fieldValues);  var refEvent = refreshBtn.attributes.getNamedItem("onclick").nodeValue; var strEventArr = refEvent.split(","); var urlStr = strEventArr[1].replace(/'/g, ""); var newUrlStr = urlStr + refreshParams; var newRefEvent = refEvent.replace(urlStr, newUrlStr); eval(newRefEvent.split(";")[0]);};$.updateDOMFields = function(fieldNames, eventDataValues, fDoc)
{
 var fieldFound = false; var scriptFound = false; var rtfieldNames = fieldNames.split(","); var rtfieldObj = new Array(rtfieldNames.length); var fldName, fldValue, splitFld; var fldLen = eventDataValues.length - 1;  var eventObject; var submitStr;   fldLen = fldLen < rtfieldNames.length ? fldLen : rtfieldNames.length; for (var i = 0; i < fldLen; i++)
 {
 
 splitFld = rtfieldNames[i].split("|"); if (splitFld.length > 1) 
 {
 fldName = splitFld[1]; fldValue = splitFld[0] + "|" + eventDataValues[i+1];  }
 else
 {
 fldName = splitFld[0]; fldValue = eventDataValues[i+1];  }

 
 rtfieldObj[i] = fDoc.getElementById(fldName); if (rtfieldObj[i] && typeof rtfieldObj[i] != 'undefined' && !rtfieldObj[i].disabled)
 {
 $.updateFieldData(rtfieldObj[i], fldValue);    eventObject = rtfieldObj[i].attributes.getNamedItem("onchange");  if (!scriptFound && eventObject != null && eventObject.nodeValue != null)
 {
 submitStr = "submitAction_" + rtfieldObj[i].form.name + "(document.getElementById('" + fldName + "').form, '" + fldName + "');"; scriptFound = true; }
 }
 }

 
 if (scriptFound) 
 eval(submitStr);};$.updateFieldData = function(fieldObject, fieldValue)
{
 if (fieldObject.type == "select")
 {
 for (var i = 0; i < fieldObject.options.length; i++)
 {
 if (fieldObject.options[i].value == fieldValue)
 fieldObject.options[i].selected = true; }
 }
 else
 fieldObject.value = fieldValue.replace(/^\s+|\s+$/g,'') == '' ? '' : fieldValue;  sScript = "addchg_"+ fieldObject.form.name+"(fieldObject);"; eval(sScript); };$.GetFramesWithMessages = function(frames)
{
 if (frames)
 {
 for (var j=0; j < frames.length; ++j)
 {
 p_objFrameArr.push(frames[j]);  if ((!isCrossDomain(frames[j])) && (frames[j].frames))
 $.GetFramesWithMessages(frames[j].frames); } 
 }
};$.removeURLDefaultPort = function(url)
{
 
 var rtnURL = url; var result = url.match(/(\w+):\/\/([\w.]+):*(\d*)\/*(\S*)/);  if (result != null) { 
 var protocol = result[1];  var host = result[2];  var port = result[3]; var path = result[4];   if (typeof port != 'undefined' && port != null && 
 ((port == 80 && protocol.toLowerCase() === "http") ||
 (port == 443 && protocol.toLowerCase() === "https"))) {
 
 if (typeof path != 'undefined' && path != null && path.length != 0)
 rtnURL = protocol + "://" + host + "/" + path; else
 rtnURL = protocol + "://" + host; }
 }
 
 return rtnURL;};$.accept_message = p_accept_message = function( callback, source_origin, delay ) 
{
 if (postMessage_supported) 
 { 
 if ( callback ) 
 { 
 rm_callback && p_accept_message();  rm_callback = function(e) 
 {
 if ( ( typeof source_origin === 'string' && 
 $.removeURLDefaultPort(e.origin).toLowerCase() !== $.removeURLDefaultPort(source_origin).toLowerCase() )
 || ( $.isFunction( source_origin ) && 
 source_origin( e.origin ) === FALSE ) 
 ) 
 {
 
 var targetFrame = top.document.getElementById("ptifrmtgtframe"); if (targetFrame && typeof (targetFrame != 'undefined' ) )
 {
 var targetDoc = targetFrame.contentWindow.document; if (targetDoc && typeof (targetDoc != 'undefined' ))
 {
 var targetOrigin = targetDoc.location.origin; if (targetOrigin && typeof (targetOrigin != 'undefined' ) && e.origin === targetOrigin)
 {
 callback( e ); return; }
 }
 }
 
 var pageletFrame = top.document.getElementById("ptalPgltAreaFrame"); if (pageletFrame && typeof (pageletFrame != 'undefined' ) )
 {
 var pageletDoc = pageletFrame.contentWindow.document; if (pageletDoc && typeof (pageletDoc != 'undefined' ))
 {
 var pageletOrigin = pageletDoc.location.origin; if (pageletOrigin && typeof (pageletOrigin != 'undefined' ) && e.origin === pageletOrigin)
 {
 callback( e ); return; }
 }
 }
 return FALSE; }
 callback( e ); }; }
 
 if (window[addEventListener]) 
 {
 window[ callback ? addEventListener : 'removeEventListener' ]( 'message', rm_callback, FALSE ); } 
 else 
 {
 window[ callback ? 'attachEvent' : 'detachEvent' ]( 'onmessage', rm_callback ); }
 
 } 
 else 
 { 
 
 
 
 
 p_interval_id && clearInterval( p_interval_id ); p_interval_id = null;  if ( callback ) 
 {
 delay = typeof source_origin === 'number' ? source_origin : typeof delay === 'number' ? delay : 100;  p_interval_id = setInterval(function()
 {
 var docHash = document.location.hash,
 re = /^#?\d+&/; if ( docHash !== p_previous_hash && re.test( docHash ) ) {
 p_previous_hash = docHash; callback({ data: docHash.replace( re, '' ) }); }
 }, delay ); }
 }
};$.GenerateMessageEvents = function()
{ 
 if (typeof $.p_message_data == "undefined" || $.p_message_data == null) 
 $.p_message_data = p_message_data;  if (typeof $.p_message_data == "undefined") return; for (var x = 0; x < $.p_message_data.length; x++)
 {
 if ($.p_message_data[x].eventType == "P") 
 {
 $.p_message_data[x].p_message = $.attachEvent(window,
 $.p_message_data[x].eventName, 
 $.p_message_data[x].htmlFieldName, 
 $.p_message_data[x].fieldEventType, 
 $.p_message_data[x].eventData);  $.setDelayedFldPubEvent($.p_message_data[x].htmlFieldName, $.p_message_data[x].p_message); }
 }
 $.p_message_data = null;};$.GenerateMessageEventsTC = function()
{
 p_message_data = top.p_message_data; if (typeof p_message_data == "undefined") return; for (var x = 0; x < p_message_data.length; x++)
 {
 if (p_message_data[x].eventApplied) continue; if (p_message_data[x].eventType == "P") 
 p_message_data[x].p_message = $.attachEvent(window,
 p_message_data[x].eventName, 
 p_message_data[x].htmlFieldName, 
 p_message_data[x].fieldEventType, 
 p_message_data[x].eventData); }
};$.GetMessageFrames = function()
{
 if (top.frames.length)
 $.GetFramesWithMessages(top.frames); p_objFrameArr.push(parent);};$.GenerateEvents = function()
{
 IWCSubscribeServerEvents(); $.GenerateMessageEvents(); $.attachHandler(window);};$.getFunctionName = function(fn) 
{
 if (fn == null) 
 return null; var rgx = /^function\s+([^\(\s]+)/
 var matches = rgx.exec(fn.toString()); return matches ? matches[1] : "(anonymous)"
};$.updateMessageEvents = function(fldName)
{
 
 var lastPos = fldName.lastIndexOf("$"); var occurIdx; var tmpFldName = fldName; if (postMessage_supported)
 $.p_message = sessionStorage.getItem('IWCEvent');  if ($.p_message == null || $.p_message.length == 0)
 {
 
 if (lastPos > 0 && lastPos < (fldName.length -1)) {
 occurIdx = fldName.substring(lastPos+1); if (/^\d+$/.test(occurIdx))
 tmpFldName = fldName.substring(0, lastPos+1);  }

 $.p_message = $.getDelayedFldPubEvent(tmpFldName);  }

 if ($.p_message != null && $.p_message.length > 0 && ($.p_message.indexOf("pm.eventAfterTypeahead") != 0)) 
 {
 var temp_mesg = $.p_message; $.p_message = ""; sessionStorage.setItem('IWCEvent', ''); $.setDelayedFldPubEvent(fldName, "");  eval(temp_mesg); }
 if (typeof p_message_data != "undefined" && p_message_data.length > 0)
 $.GenerateMessageEvents(); };$.updateParentMsgData = function(pWin,fName)
{ 
 if (typeof pWin != 'undefined' && pWin != null && typeof pWin.p_message_data != 'undefined' && pWin.p_message_data != null)
 {
 var iwcEventRcd = $.getFldPubEventData(fName); if (iwcEventRcd && iwcEventRcd.p_message != "")
 {
 for (var x = 0; x < pWin.p_message_data.length; x++) 
 {
 if (fName == pWin.p_message_data[x].htmlFieldName && pWin.p_message_data[x].eventType == "P") 
 pWin.p_message_data[x].p_message = iwcEventRcd.p_message; }
 }
 } 
};$.updatePromptMsgEvent = function(lookUpName)
{ 
 var promptName = (lookUpName.split("$prompt"))[0]; var iwcEventRcd = $.getFldPubEventData(promptName); var messageAfterEvent = ""; var promptFld; var eventOnClick; var eventOnChange;    if (iwcEventRcd && postMessage_supported)
 {
 promptFld = $.getFormField(window.document, promptName, iwcEventRcd.eventData); if (typeof promptFld != 'undefined' && promptFld) { 
 messageAfterEvent = "pm.eventAfterAJAX('" + window.name + "', '" + iwcEventRcd.eventName + "', '" + iwcEventRcd.eventData + "');"
 sessionStorage.setItem('IWCEvent', messageAfterEvent);  }
 }
};$.updateTypeaheadMsgEvent = function(name)
{ 
 var typeaheadName = (name.split("$prompt"))[0]; var iwcEventRcd = $.getFldPubEventData(typeaheadName); var messageAfterEvent = ""; var fld; var eventOnClick; var eventOnChange;   if (sessionStorage != null) {
 $.p_message = sessionStorage.getItem('IWCEvent'); if ($.p_message != null && $.p_message.length > 0 && ($.p_message.indexOf("pm.eventAfterTypeahead") == 0))
 sessionStorage.setItem('IWCEvent', ''); }

 
 if (iwcEventRcd && postMessage_supported)
 {
 fld = $.getFormField(window.document, typeaheadName, iwcEventRcd.eventData); if (typeof fld != 'undefined' && fld) {
 eventOnClick = fld.attributes.getNamedItem("onclick"); eventOnChange = fld.attributes.getNamedItem("onchange");     if ((eventOnChange == null || eventOnChange.nodeValue == null) &&
 (eventOnClick == null || eventOnClick.nodeValue == null))
 {
 messageAfterEvent = "pm.eventAfterTypeahead('" + window.name + "', '" + iwcEventRcd.eventName + "', '" + iwcEventRcd.eventData + "');"
 sessionStorage.setItem('IWCEvent', messageAfterEvent); }
 }
 }
};$.updateEventAfterTypeahead = function()
{
 
 if (postMessage_supported) {
 $.p_message = sessionStorage.getItem('IWCEvent'); if ($.p_message != null && $.p_message.length > 0 && ($.p_message.indexOf("pm.eventAfterTypeahead") == 0)) {
 var temp_mesg = $.p_message; $.p_message = ""; sessionStorage.setItem('IWCEvent', ''); eval(temp_mesg); }
 }
};$.updateEventAfterDatePrompt = function()
{
 
 if (postMessage_supported) {
 $.p_message = sessionStorage.getItem('IWCEvent'); if ($.p_message != null && $.p_message.length > 0 && ($.p_message.indexOf("pm.eventAfterTypeahead") != 0)) {
 var temp_mesg = $.p_message; $.p_message = ""; sessionStorage.setItem('IWCEvent', ''); eval(temp_mesg); }
 }
};})(pm);function IWCRecord (crefId, htmlFldName, eventName, eventType, eventData, fldEventType)
{
this.crefId = crefId;this.htmlFieldName = htmlFldName;this.eventName = eventName;this.eventType = eventType;this.eventData = eventData;this.fieldEventType = fldEventType;this.p_message = " ";};var glObjTr = {};glObjTr.oGntt= new Object();glObjTr.oMyArray = new Array();glObjTr.sOpen = "";glObjTr.aSource = [];glObjTr.nTm = "";glObjTr.aHash = [];glObjTr.ch127 = String.fromCharCode(127);glObjTr.ch177 = String.fromCharCode(177);glObjTr.chDv = String.fromCharCode(9);glObjTr.dc = "";glObjTr.nLenNd = 0;glObjTr.nLenStr = 0;glObjTr.bUseTopDoc = 0;glObjTr.bCrtCtxMn= 0;glObjTr.occNmb=""; glObjTr.sRALkId=""; glObjTr.oOrgChr=new Object();glObjTr.oRBChr=new Object();glObjTr.oDVT=new Object();glObjTr.iType = 4;glObjTr.nDocMode = 7;glObjTr.bEnterKey=false;glObjTr.oFcusItm="";glObjTr.bChrtRtMn=0;glObjTr.bChrtMn=0;glObjTr.nTop = 0;glObjTr.nLeft=0;glObjTr.nChrtScrlTp = 0;glObjTr.nChrtScrlLf=0;glObjTr.nMnMaxLfPs =0;glObjTr.nMnMaxTpPs =0;glObjTr.oInvkRtMenuId ="";glObjTr.bAccessible =false;glObjTr.iParam = 6;glObjTr.sPersSrchDivId ="";glObjTr.findObjTreePT = function (sUCn) {
 for (var s in this.oMyArray) {
 if (this.oMyArray[s].ID == sUCn) {
 break; }
 }
 return this.oMyArray[s];}


glObjTr.addProcTree = function (obj) {
 this.oMyArray.push(obj);}

glObjTr.procTree = function (sUCn) {
 this.ID = sUCn;}


glObjTr.procTree.prototype.crtAssocArray = function (sSrv, nPrm) {
 glObjTr.nLenStr = sSrv.length; var len = 0,
 len1 = 0,
 len2 = 0,
 len3 = 0,
 len4 = 0,
 len5 = 0; var a1 = sSrv.split(glObjTr.chDv + glObjTr.chDv); var nTestNode = 0; var a2, a3, a4, a5, sDdID, sCont, sParId, sCom = "",
 sIndex = ""; var aCont = new Array(); var aTreeStruct = new Array(); len = a1.length; if (len < 2) {
 alert(" the input string is not formated correctly return 0"); }
 for (var i = 0; i < len; i++) {
 if (a1[i].indexOf(glObjTr.chDv) < 0) {
 sDdID = a1[i]; sCont = a1[i + 1]; if (sCont.indexOf(glObjTr.ch127 + glObjTr.ch127) < 0) 
 return 1; len1 = sCont.length; if (sCont.lastIndexOf(glObjTr.ch127 + glObjTr.ch127) + 2 == len1) {
 sCont = sCont.substr(0, len1 - 2); } 
 else
 return 2; a2 = sCont.split(glObjTr.ch127 + glObjTr.ch127); len2 = a2.length; for (var p = 0; p < len2; p++) {
 a3 = a2[p].split(glObjTr.chDv); if (a3.length != 2) 
 return 3; sParId = a3[0]; sCont = a3[1]; sIndex = sDdID + glObjTr.ch127 + sParId; aTreeStruct[sIndex] = []; if (sCont.indexOf(',') < 0) 
 return 4; aCont.length = 0; a4 = sCont.split(glObjTr.ch127); len4 = a4.length; nTestNode = nTestNode + len4; for (var w = 0; w < len4; w++) {
 a5 = a4[w].split(','); len5 = a5.length; if (len5 < nPrm) 
 return 5; if (len5 > nPrm) 
 a5.length = nPrm; aTreeStruct[sIndex].push(a5); }
 }
 } 
 else {
 continue; }
 }
 glObjTr.nLenNd = nTestNode; return aTreeStruct;}


glObjTr.changeBkg = function (o) {
 if (o.className == "PT_ORG_ACTION_BG") 
 o.className = "PT_ORG_ACTION_HVR_BG"; else if (o.className == "PT_ORG_ACTION_HVR_BG") 
 o.className = "PT_ORG_ACTION_BG";}


glObjTr.showActionMenu = function () {
 var argv = this.showActionMenu.arguments; var sParentId = argv[0]; var nLeft = argv[1]; var nTop = argv[2]; var nParametrs = argv[3]; var nType = argv[4];  var sSrcStr = argv[5]; var sId = argv[6]; var sNId = ""; var nDescr = ""; glObjTr.iParam =parseInt(nParametrs); glObjTr.iType = parseInt(nType);  if (glObjTr.iType < 3) {
 sNId = argv[7]; nDescr = argv[8]; }

 var sCntr = sParentId; var index = sParentId.indexOf("$$"); if (index > 1) {
 var temp; temp = sParentId.substring(0, sParentId.indexOf('$')); sCntr = temp; }

 glObjTr.sPersSrchDivId =""
 var indexSearch= sParentId.indexOf("relatedActionsPers"); if (indexSearch > -1) {
 glObjTr.bUseTopDoc = 1; glObjTr.nDocMode = window.top.document.documentMode; }
 else {
 glObjTr.bUseTopDoc = 0; }

 if(glObjTr.bUseTopDoc)
 {
 if (sParentId.indexOf("relatedActionsPersGbl") > -1)
 {
 glObjTr.sPersSrchDivId="ptabndata_GBL"; }
 else
 {
 var oOpen = window.top.document.getElementById(sParentId); while (oOpen) 
 {
 oOpen = oOpen.parentNode; var sTmpId=oOpen.id; if (sTmpId.indexOf("ptabndata_") > -1)
 {
 glObjTr.sPersSrchDivId=sTmpId; break; }
 }
 }
 }

 if (this.isEmpty(glObjTr.nDocMode)) { 
 glObjTr.nDocMode=7; }
 var oProcTree = new glObjTr.procTree(sCntr); glObjTr.addProcTree(oProcTree); var oOrgMn = glObjTr.findObjTreePT(sCntr); glObjTr.aHash = oOrgMn.crtAssocArray(sSrcStr, nParametrs); var oBr = new PT_browserInfo(); oBr.init(); var bIEBr = oBr.isIE;  var sAct="click"; if(oBr.isiPad){
 sAct="touchstart"; }
 var sNdDscCtr = "";  if (glObjTr.iType < 3) {
 sNdDscCtr = sNId + "$" + nDescr; }
 var sNewRootMnID = sCntr + "$$" + unescape(sId) + this.ch127 + "#rt#" + "$" + sNdDscCtr; if (glObjTr.sOpen != "") {
 var oOpen; if (!glObjTr.bUseTopDoc)
 oOpen = document.getElementById(glObjTr.sOpen); else
 oOpen = window.top.document.getElementById(glObjTr.sOpen); if (this.isEmpty(oOpen)) {
 if ((glObjTr.sOpen == sNewRootMnID) && (glObjTr.iType > 2)) {
 glObjTr.sOpen = ""; return;  }
 glObjTr.sOpen = ""; }
 }
 if (glObjTr.sOpen != "") { 
 if (!this.removePrevMenu(sNewRootMnID,1)) {
 glObjTr.sOpen = ""; return;  }
 glObjTr.sOpen = sNewRootMnID; } 
 else if (glObjTr.sOpen == "") 
 glObjTr.sOpen = sNewRootMnID; if ((glObjTr.iType < 3)||(glObjTr.iType == 5))
 {
 glObjTr.bChrtMn=1; glObjTr.nTop = nTop; glObjTr.nLeft=nLeft; }

 glObjTr.bAccessible=glObjTr.bEnterKey; var sIdI = "#rt#"; var sIdCh = ""; var o = ""; this.createMenu(sId, sParentId, nType, sIdI, sIdCh, sNId, nDescr, nLeft, nTop, bIEBr, o); if (glObjTr.iType > 2){
 glObjTr.bCrtCtxMn=1; }

 if(!glObjTr.bUseTopDoc){
 ptEvent.add(document, sAct, glObjTr.removePrevMenu); }
 else{
 ptEvent.add(window.top.document, sAct, glObjTr.removePrevMenu); }

}


glObjTr.createMenu = function (sIdEsc, sParentId, nType, sIdIEsc, sIdCh, sNId, nDescr, nLeft, nTop, bIE, o) {
 if (!(this.isEmpty(o))) 
 o.blur(); var sId = unescape(sIdEsc); var sCntr = sParentId; var index = sParentId.indexOf("$$"); if (index > 1) {
 var temp; temp = sParentId.substring(0, sParentId.indexOf('$')); sCntr = temp; }
 var sNdDscCtr = ""; var sIdI=sIdIEsc; if (glObjTr.iType < 3) {
 sNdDscCtr = sNId + "$" + nDescr;  sIdI=unescape(sIdIEsc); }
 var bIEm9=0; if(bIE)
 {
 bIEm9=(window.document.documentMode>8)?1:0; }
 var sSearch = ""; sSearch = sId + this.ch127 + sIdI; var aLoc = glObjTr.aHash[sSearch]; var len = aLoc.length; var aDescr = new Array(); var aClass = new Array(); var aIdItem = new Array(); var aFolder = new Array(); var aULPar = new Array(); var aTypePar = new Array(); var aTltip = new Array(); var MyCommaRegEx = new RegExp(this.ch177, "g"); for (var a = 0; a < len; a++) {
 var aItem = new Object(); aItem = aLoc[a]; aItem[0] = aItem[0].replace(MyCommaRegEx, ","); aItem[2] = aItem[2].replace(MyCommaRegEx, ","); aIdItem.push(aItem[0]); aClass.push(aItem[1]); aDescr.push(aItem[2]); if (glObjTr.iType > 2) 
 {
 aItem[3] = aItem[3].replace(MyCommaRegEx, ","); aULPar.push(aItem[3]); aTypePar.push(aItem[4]); }
 if(glObjTr.iParam>5)
 {
 aItem[5] = aItem[5].replace(MyCommaRegEx, ","); aTltip.push(aItem[5]); }
 var Mystr = sId + this.ch127 + aItem[0]; if (glObjTr.aHash.isParent(Mystr)) 
 aFolder.push("1"); else
 aFolder.push("0"); }
 if (sIdCh != "") 
 {
 var oParnt; if (!glObjTr.bUseTopDoc)
 oParnt = document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdCh + "$" + sIdI); else
 oParnt = window.top.document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdCh + "$" + sIdI); if (oParnt) {
 var oParOfParnt = oParnt.parentNode; var nlCh = oParOfParnt.children.length; for (var j = 0; j < nlCh; j++) {
 oParOfParnt.children[j].className = "PT_ORG_ACTION_BG"; }
 oParnt.className = "PT_ORG_ACTION_SLCT_BG"; nTop = oParnt.offsetTop + 6; if (!nTop) 
 nTop = 1; if(glObjTr.iType == 4)
 {
 nLeft = oParnt.offsetWidth -5; }
 else
 {
 nLeft = oParnt.offsetLeft + oParnt.offsetWidth - 5; }
 }
 }
 var sIdLvl = sCntr + "$$" + sId + this.ch127 + sIdI; var oDiv; if (!glObjTr.bUseTopDoc)
 oDiv = document.getElementById(sIdLvl); else 
 oDiv = window.top.document.getElementById(sIdLvl); if (oDiv && oDiv.parentNode) {
 var oParTr; if (!glObjTr.bUseTopDoc)
 oParTr = document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdCh + "$" + sIdI); else
 oParTr = window.top.document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdCh + "$" + sIdI); if (oParTr) {
 oParTr.className = "PT_ORG_ACTION_HVR_BG"; }
 oDiv.parentNode.removeChild(oDiv); if (bIE&&(!bIEm9)) {
 var sOpenShdowId = sIdLvl + "$$1"; var oOpenShadow = document.getElementById(sOpenShdowId); if (oOpenShadow) {
 oOpenShadow.parentNode.removeChild(oOpenShadow); }
 }

 if ((glObjTr.iType < 3)||(glObjTr.iType == 5))
 {
 checkController(sCntr); this.moveMenuVisible(sCntr); } 

 return; }

 var oMainObj; if (!glObjTr.bUseTopDoc)
 oMainObj=document.getElementById(sParentId); else
 oMainObj=window.top.document.getElementById(sParentId); if (!glObjTr.bUseTopDoc) 
 var MyList = document.createElement("DIV"); else 
 var MyList = window.top.document.createElement("DIV"); if(nType==4 && glObjTr.bUseTopDoc) {
 var oMainObjDiv=oMainObj.parentNode; oMainObj=oMainObjDiv; }
 
 if((nType==3)||(nType==6)||((nType==4)&&(!glObjTr.bUseTopDoc))) { 
 oMainObj=document.body; }

 if (sIdCh == "") {
 MyList.id = sCntr + "$$" + sId + this.ch127 + sIdI + "$" + sNdDscCtr; } 
 else {
 MyList.id = sCntr + "$$" + sId + this.ch127 + sIdI; }
 MyList.className = "RADIUS_DROPDOWN_CORNER SHADOW_DROPDOWN"; if ((glObjTr.iType > 2)&&(glObjTr.iType < 5)) 
 {
 MyList.className = "RADIUS_MENU_DROPDOWN_CORNER SHADOW_MENU_DROPDOWN"; }

 MyList.style.textAlign = "left";  MyList.style.position = "absolute"; MyList.style.top = nTop + "px"; if(glObjTr.iType == 4)
 {
 MyList.setAttribute('SMN', "1"); if(sIdCh == "")
 {
 MyList.style.left = nLeft + "px"; }
 else 
 {
 MyList.style.right = nLeft + "px"; }
 }
 else
 {
 MyList.style.left = nLeft + "px"; }
 
 MyList.style.zIndex = 12000; MyList.style.cursor = "default"; if (glObjTr.sOpen == "") {
 alert("Root menu id is not set?"); return; }
 if (!bIE || glObjTr.nDocMode == 8 ||bIEm9) { 
 MyList.setAttribute('PSMNU', glObjTr.sOpen); }

 var ariaLabel= "" ; var regExp = /^win\d+div/; var formContainerName = ""; if (sParentId) 
 {
 formContainerName = regExp.exec(sParentId); }
 if(glObjTr.oInvkRtMenuId)
 {
 if(formContainerName)
 ariaLabel = glObjTr.oInvkRtMenuId +"_"+ formContainerName;  else
 ariaLabel = glObjTr.oInvkRtMenuId ; }

 MyList.setAttribute('role', "menu"); MyList.setAttribute('aria-labelledby', ariaLabel); var sMyInnerHTML = ""; sMyInnerHTML += "<table role=\'presentation\' SMN=1 cellspacing=\'0px\' cellpadding=\'0px\' border=0 style=\'border-collapse:collapse;margin-top:8px;margin-bottom:10px; "; if(bIE&&(!bIEm9))
 {
 sMyInnerHTML += " margin-left:2px; "; }
 sMyInnerHTML += "\'>";  var sVal = ""; var sIdIt = ""; var bCloseWindow = false; var sClassIt = "PT_ACTION_LIST_ITEM"; var nListLen = aDescr.length; for (var f = 0; f < nListLen; f++) {
 sClassIt = aClass[f]; sIdIt = aIdItem[f]; if (glObjTr.iType < 3) {
 sIdIt = escape(aIdItem[f]); }
 sTrClass = "PT_ORG_ACTION_BG"; var sTrId = sCntr + "$$" + sSearch + "$" + sIdIt; var sTooltiptxt=""; if(glObjTr.iParam>5)
 {
 sTooltiptxt=aTltip[f]; }
 if ((aDescr[f] == "--") || (aTypePar[f] == "S")) 
 {
 sMyInnerHTML += "<tr MSG=1 onclick=\"glObjTr.preventEventPropagation(event);\" id=" + sTrId + " >";  sMyInnerHTML += "<th colspan=2><hr color='#BBBBBB'></th>"; sMyInnerHTML += "</tr>"; } 
 else if (aTypePar[f] == "H") 
 {
 if ((this.isEmpty(sClassIt))) {
 sClassIt = "PT_MENU_ACTION_LISTHEAD"; }
 sMyInnerHTML += "<tr MSG=1 onclick=\"glObjTr.preventEventPropagation(event);\" id=" + sTrId + " ><td MSG=1 style=\cursor:default;\'><div MSG=1 id=\'" + sCntr + "$" + sIdI + "$" + "DDBLSTID" + f + "$$0\' style=\'cursor:default;\' class=\'" + sClassIt + "\'>";  sVal = aDescr[f]; if (this.isEmpty(sVal)) {
 sVal = "&nbsp;"; }
 sMyInnerHTML += sVal; sMyInnerHTML += "</div></td>"; if (browserInfoObj2.isiPad && !bCloseWindow && glObjTr.iType>2){ 
 sMyInnerHTML += "<td><div class='ptipadclosemenu' style=\"float:right; display:inline; padding-right:10px\" onclick='CloseContextMenuHandler();'></div></td>"; bCloseWindow = true; }
 sMyInnerHTML += "</tr>"; } 
 else if (aTypePar[f] == "M") 
 {
 if ((this.isEmpty(sClassIt))) {
 sClassIt = "PT_MENU_ACTION_LISTITEM"; }
 sMyInnerHTML += "<tr MSG=1 onclick=\"glObjTr.preventEventPropagation(event);\" id=" + sTrId + " ><td MSG=1 style=\cursor:default;\'><div MSG=1 id=\'" + sCntr + "$" + sIdI + "$" + "DDBLSTID" + f + "$$0\' style=\'cursor:default;\' class=\'" + sClassIt + "\'>"; sVal = aDescr[f]; if (this.isEmpty(sVal)) {
 sVal = "&nbsp;"; }
 sMyInnerHTML += sVal; sMyInnerHTML += "</div></td></tr>"; } 
 else if (aTypePar[f] == "N")
 {
 if (this.isEmpty(sClassIt)) {
 sClassIt = "PT_ACTION_LIST_ITEM"; if ((glObjTr.iType>2)&& (glObjTr.iType<5))
 {
 sClassIt = "PT_MENU_ACTION_LISTITEM"; if ((sIdCh == "") && (nType == "3")) 
 sClassIt = "PT_MENU_ACTION_LISTITEM_L0"; }
 }
 sMyInnerHTML += "<tr MSG=1 onclick=\"glObjTr.preventEventPropagation(event);\" id=" + sTrId + " STP=\'"+sTooltiptxt+"\'" +"\' onmouseover=\'glObjTr.getDescTooltip(this, event);\' onmouseout=\'glObjTr.closeDescTooltip(this);\'><td MSG=1 style=\cursor:default;\'><div MSG=1 id=\'" + sCntr + "$" + sIdI + "$" + "DDBLSTID" + f + "$$0\' style=\'cursor:default; color:Grey;\' class=\'" + sClassIt + "\'>"; sVal = aDescr[f]; if (this.isEmpty(sVal)) {
 sVal = "&nbsp;"; }
 sMyInnerHTML += sVal; sMyInnerHTML += "</div></td></tr>"; } 
 else 
 {
 if (nType == "1") 
 {
 if (this.isEmpty(sClassIt)) {
 sClassIt = "PT_READONLY_LIST_ITEM"; }
 sMyInnerHTML += "<tr id=" + sTrId + " class=\'" + sTrClass + "\' ddbrd=\"1\" style=\'margin:0px;padding:0px;\' onclick=\'glObjTr.preventEventPropagation(event);\' onmouseover=\'glObjTr.changeBkg(this);\' onmouseout=\'glObjTr.changeBkg(this);\'><td ddbrd=\"1\" style=\'border-top:0px;margin:0px;padding:0px;align:top;\'><div ddbrd=\"1\" id=\'" + sCntr + "$" + sIdI + "$" + "DDBLSTID" + f + "$$0\' style=\'cursor:default;padding-top:0px;valign:top;\' class=\'" + sClassIt + "\'"
 if (aFolder[f] == "0") 
 {
 sMyInnerHTML += " >"; } 
 else 
 {
 sMyInnerHTML += " onmousedown=\"glObjTr.createMenu(\'" + escape(sId) + "\',\'" + sCntr + "\',\'" + nType + "\',\'" + sIdIt + "\',\'" + sIdI + "\',\'" + sNId + "\',\'" + nDescr + "\',\'" + nLeft + "\', \'" + nTop + "\',"+bIE+", this);\">"; }
 } 
 else 
 {
 if (this.isEmpty(sClassIt)) {
 sClassIt = "PT_ACTION_LIST_ITEM"; if ((glObjTr.iType>2)&& (glObjTr.iType<5))
 {
 sClassIt = "PT_MENU_ACTION_LISTITEM"; if ((sIdCh == "") && (nType == "3")) 
 sClassIt = "PT_MENU_ACTION_LISTITEM_L0"; }
 }
 if (aFolder[f] == "0") 
 {
 sMyInnerHTML += "<tr SMN=1 id=" + sTrId + " STP=\'"+sTooltiptxt+"\'" + " style=\'margin:0px;padding:0px;\' class=\'" + sTrClass + "\' onmouseover=\'glObjTr.getDescTooltip(this, event);\' onmouseout=\'glObjTr.closeDescTooltip(this);\'><td style=\'border-top:0px;margin:0px;padding:0px;align:top;cursor:pointer;\'><div SMN=1 id=\'" + sCntr + "$" + sIdI + "$" + "DDBLSTID" + f + "$$0\' style=\'cursor:pointer;padding-top:0px;valign:top;\' class=\'" + sClassIt + "\'"
 if (nType == "2") {
 sMyInnerHTML += " onmousedown=\"MainLink(\'ddb" + chM + nDescr + chM + sIdIt + "\',\'" + sNId + "\',\'" + sCntr + "\');\" >"; sMyInnerHTML += "<a href=\"#\" role=\"menuitem\" id=\'" + sCntr + "$" + sIdI + "$" + "DDBLSTATAG" + f + "$$0\' style=\"text-decoration:none; color:#000000;display:block;\" onkeydown=\"glObjTr.keyDwn(\'" + escape(sId) + "\',\'" + sCntr + "\',\'" + nType + "\',\'" + sIdIt + "\',\'" + sIdI + "\',\'" + sIdCh + "\',\'" + sNId + "\',\'" + nDescr + "\',\'" + nLeft + "\', \'" + nTop + "\',"+bIE+",this, event);\" onclick=\"javascript:MainLink(\'ddb" + chM + nDescr + chM + sIdIt + "\',\'" + sNId + "\',\'" + sCntr + "\'\);\">"; } 
 else {
 sMyInnerHTML += ">"; if (aULPar[f] == "") {
 aULPar[f] = "javascript:void(0)"; }
 sMyInnerHTML += "<a SMN=1 href=" + aULPar[f] + " role=\"menuitem\" id=\'" + sCntr + "$" + sIdI + "$" + "DDBLSTATAG" + f + "$$0\' style=\"text-decoration:none; color:#000000; display:block;\" onkeydown=\"glObjTr.keyDwn(\'" + escape(sId) + "\',\'" + sCntr + "\',\'" + nType + "\',\'" + sIdIt + "\',\'" + sIdI + "\',\'" + sIdCh + "\',\'" + sNId + "\',\'" + nDescr + "\',\'" + nLeft + "\', \'" + nTop + "\',"+bIE+",this, event);\" >";  }
 } 
 else 
 {
 sMyInnerHTML += "<tr SMN=1 onclick=\"glObjTr.preventEventPropagation(event);\" AC=1 FD=1 id=" + sTrId + " STP=\'"+sTooltiptxt+"\'" +" style=\'margin:0px;padding:0px;\' class=\'" + sTrClass + "\' onmouseover=\'glObjTr.getDescTooltip(this);\' onmouseout=\'glObjTr.closeDescTooltip(this);\'><td SMN=1 AC=1 FD=1 style=\'border-top:0px;margin:0px;padding:0px;align:top;cursor:pointer;\'><div AC=1 FD=1 id=\'" + sCntr + "$" + sIdI + "$" + "DDBLSTID" + f + "$$0\' style=\'cursor:pointer;padding-top:0px;valign:top;\' class=\'" + sClassIt + "\'"
 sMyInnerHTML += " >"; sMyInnerHTML += "<a SMN=1 AC=1 FD=1 href=\"#\" aria-haspopup=\"true\" role=\"menuitem\" id=\'" + sCntr + "$" + sIdI + "$" + "DDBLSTATAG" + f + "$$0\' ATG=\"1\" style=\"text-decoration:none; color:#000000;display:block;\" onkeydown=\"glObjTr.keyDwn(\'" + escape(sId) + "\',\'" + sCntr + "\',\'" + nType + "\',\'" + sIdIt + "\',\'" + sIdI + "\',\'" + sIdCh + "\',\'" + sNId + "\',\'" + nDescr + "\',\'" + nLeft + "\', \'" + nTop + "\',"+bIE+",this, event);\" onclick=\"glObjTr.createMenu(\'" + escape(sId) + "\',\'" + sCntr + "\',\'" + nType + "\',\'" + sIdIt + "\',\'" + sIdI + "\',\'" + sNId + "\',\'" + nDescr + "\',\'" + nLeft + "\', \'" + nTop + "\',"+bIE+",this);\">";  }
 }
 sVal = escape(aDescr[f]); if (this.isEmpty(sVal)) {
 sVal = "&nbsp;"; }
 sMyInnerHTML += sVal; if (nType != "1") 
 {
 sMyInnerHTML += "</a>"; }
 sMyInnerHTML += "</div></td>"; sMyInnerHTML += "<td AC=1 style=\'border-top:0px;margin:0px;padding:0px;align:top;cursor:pointer;\'>"; if (aFolder[f] == "1") 
 {

 if(glObjTr.iType == 4)
 {
 sMyInnerHTML += "<div SMN=1 AC=1 class='ptactmenuleftarrow'>"; }
 else
 {
 sMyInnerHTML += "<div SMN=1 AC=1 class='ptactmenurightarrow'>"; }
 if(!glObjTr.bAccessible)
 {
 sMyInnerHTML += "<a AC=1 SMN=1 href=\"#\" style=\"text-decoration:none; display:block;\" onclick=\"glObjTr.createMenu(\'" + escape(sId) + "\',\'" + sCntr + "\',\'" + nType + "\',\'" + sIdIt + "\',\'" + sIdI + "\',\'" + sNId + "\',\'" + nDescr + "\',\'" + nLeft + "\', \'" + nTop + "\',"+bIE+",this);\">";  }
 }
 else
 {
 sMyInnerHTML += "<div SMN=1 AC=1>"; if(!glObjTr.bAccessible)
 {
 if(nType=="2")
 sMyInnerHTML += "<a AC=1 href=\"#\" style=\"text-decoration:none; display:block;\" onclick=\"javascript:MainLink(\'ddb" + chM + nDescr + chM + sIdIt + "\',\'" + sNId + "\',\'" + sCntr + "\'\);\">"; else if(glObjTr.iType>2)
 sMyInnerHTML += "<a SMN=1 AC=1 href=" + aULPar[f] + " style=\"text-decoration:none; display:block;\">"; }
 }
 if(!glObjTr.bAccessible)
 {
 sMyInnerHTML += "&nbsp;"; if (nType != "1")
 {
 sMyInnerHTML += "</a>"; } 
 }
 if(glObjTr.bAccessible)
 {
 sMyInnerHTML += "&nbsp;"; }
 sMyInnerHTML += "</div>"; sMyInnerHTML += "</td></tr>"; }
 }
 sMyInnerHTML += "</table>"; MyList.align = "center"; MyList.innerHTML = sMyInnerHTML; if (sIdCh != "") {
 if (sIdCh == "#rt#") {
 if (!glObjTr.bUseTopDoc)
 oMainObj = document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdCh + "$" + sNdDscCtr); else
 oMainObj = window.top.document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdCh + "$" + sNdDscCtr); } 
 else {
 if (!glObjTr.bUseTopDoc)
 oMainObj = document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdCh); else
 oMainObj = window.top.document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdCh); }
 }

 var oDivToolTip; if (!glObjTr.bUseTopDoc)
 oDivToolTip=document.getElementById("Mnt"); else
 oDivToolTip=window.top.document.getElementById("Mnt"); if(!(this.isEmpty(oDivToolTip)))
 {
 var oPar=oDivToolTip.parentNode; oPar.removeChild(oDivToolTip); }

 var oLast = oMainObj.lastChild; if (!(this.isEmpty(oLast))) {
 if (oLast.tagName == "DIV") {
 var sI = oLast.id; if (!sI.indexOf(sCntr + "$$" + sId + this.ch127)) {
 oMainObj.removeChild(oLast); if (bIE &&(!bIEm9)) {
 var sOpenShdowId = sI + "$$1";  var oOpenShadow; if (!glObjTr.bUseTopDoc)
 oOpenShadow = document.getElementById(sOpenShdowId); else
 oOpenShadow = window.top.document.getElementById(sOpenShdowId); if (oOpenShadow) {
 oOpenShadow.parentNode.removeChild(oOpenShadow); }
 }
 }
 }
 }
 oMainObj.appendChild(MyList); for (f = 0; f < nListLen; f++) {
 if (nType != "1") 
 {
 var olistItem; if (!glObjTr.bUseTopDoc)
 olistItem = document.getElementById(sCntr + "$" + sIdI + "$DDBLSTATAG" + f + "$$0"); else
 olistItem = window.top.document.getElementById(sCntr + "$" + sIdI + "$DDBLSTATAG" + f + "$$0"); }
 if (nType == "1") 
 {
 var olistItem; if (!glObjTr.bUseTopDoc)
 olistItem = document.getElementById(sCntr + "$" + sIdI + "$DDBLSTID" + f + "$$0"); else
 olistItem = window.top.document.getElementById(sCntr + "$" + sIdI + "$DDBLSTID" + f + "$$0"); }
 sDesc = aDescr[f]; if ((olistItem) && (!(this.isEmpty(sDesc)))) {
 if (bIE) {
 var oldText = olistItem.innerText; olistItem.innerText = unescape(oldText); } 
 else {
 var oldText = olistItem.textContent; olistItem.textContent = unescape(oldText); }
 }
 }
 if (glObjTr.iType == 3)
 {
 this.adjustMenu(MyList); }

 
 var mId = MyList.id; var oTreeMenu; var oTreeMenu; if (!glObjTr.bUseTopDoc)
 oTreeMenu = document.getElementById(mId); else 
 { 
 oTreeMenu = window.top.document.getElementById(mId); } 


 if((glObjTr.iType == 4)&& !(this.isEmpty(oTreeMenu)))
 {
 if(sIdCh == "")
 {
 var nTreeMenuWidth=oTreeMenu.offsetWidth; oTreeMenu.style.left = nLeft -nTreeMenuWidth - 8 + "px"; }
 this.adjustSearchMenu(oTreeMenu); }

 if (bIE && !(this.isEmpty(oTreeMenu))&& (!bIEm9)){
 var radSize = parseInt(oTreeMenu.currentStyle['-moz-border-radius']); if(!glObjTr.bUseTopDoc)
 var oTreeMenushadow = document.createElement("div"); else 
 var oTreeMenushadow = window.top.document.createElement("div"); oTreeMenushadow.id = mId + "$$1"; oTreeMenushadow.style.position = "absolute"; oTreeMenushadow.style.top = oTreeMenu.offsetTop; oTreeMenushadow.style.left = oTreeMenu.offsetLeft; oTreeMenushadow.style.zIndex = 0; if ((glObjTr.iType < 3)||(glObjTr.iType ==5)) 
 {
 oTreeMenushadow.style.width = (oTreeMenu.offsetWidth + 7) + "px"; oTreeMenushadow.style.height = (oTreeMenu.offsetHeight + 2) + "px"; } 
 else 
 {
 oTreeMenushadow.style.width = (oTreeMenu.offsetWidth + 5) + "px"; oTreeMenushadow.style.height = (oTreeMenu.offsetHeight + 2) + "px"; }
 if(glObjTr.iType == 4)
 {
 oTreeMenushadow.setAttribute('SMN', "1"); }

 var oParNode = oTreeMenu.parentNode; oParNode.insertBefore(oTreeMenushadow, oTreeMenu); var sTreeMenushadow = oTreeMenu.currentStyle['-moz-box-shadow']; var aTreeMenushadow = sTreeMenushadow.split(" "); oTreeMenushadow.style.backgroundColor = aTreeMenushadow[3]; this.RoundVMLShadow(oTreeMenushadow, radSize); this.RoundVML(oTreeMenu, radSize); var mSId=mId+"$$1";  var oTreeMenuAfterVML; var oTreeMenuShadowAfterVML; if (!glObjTr.bUseTopDoc)
 {
 oTreeMenuAfterVML = document.getElementById(mId);  oTreeMenuShadowAfterVML = document.getElementById(mSId); }
 else 
 { 
 oTreeMenuAfterVML = window.top.document.getElementById(mId); oTreeMenuShadowAfterVML = window.top.document.getElementById(mSId); }
 if(!(this.isEmpty(oTreeMenuAfterVML)))
 {
 oTreeMenuAfterVML.style.zIndex = 12000; }
 if(!(this.isEmpty(oTreeMenuShadowAfterVML)))
 {
 oTreeMenuShadowAfterVML.style.zIndex = 12000; }
 }

 
 var oFirsListItem;  if (!glObjTr.bUseTopDoc)
 oFirsListItem = document.getElementById(sCntr + "$" + sIdI + "$DDBLSTID0" + "$$0"); else
 oFirsListItem = window.top.document.getElementById(sCntr + "$" + sIdI + "$DDBLSTID0" + "$$0");  if ((glObjTr.bEnterKey)&&(!this.isEmpty(oFirsListItem)))
 {
 while(oFirsListItem.getAttribute("MSG"))
 {
 var oNextItem = bIE? (oFirsListItem.parentNode.parentNode).nextSibling : (oFirsListItem.parentNode.parentNode).nextElementSibling;  if(this.isEmpty(oNextItem))
 break; oFirsListItem=oNextItem.childNodes[0].childNodes[0]; } 

 if(!(this.isEmpty(oFirsListItem))) 
 {
 var oFcsItem=oFirsListItem.childNodes[0]; glObjTr.bEnterKey=false;  setTimeout(function(){glObjTr.setFcsItm(oFcsItem);},100);  }
 }

 if ((glObjTr.iType < 3)||(glObjTr.iType ==5))
 {
 glObjTr.bChrtMn=1; if (sIdCh == "") 
 {
 glObjTr.bChrtRtMn=1; }
 checkController(sCntr);  var oMainChart=document.getElementById(sCntr+"$OR1C$$0"); var oRoundTreeMenu = document.getElementById(mId); var myOrgChart=glObjTr.oOrgChr[sCntr]; var nTpPgltCh1C=0; if(myOrgChart.nPglt<1)
 {
 nTpPgltCh1C=oMainChart.offsetTop; }
 else
 nTpPgltCh1C=myOrgChart.PgltTop(oMainChart, 0); var nMnTpPos=GetElementTop(oRoundTreeMenu)+oRoundTreeMenu.offsetHeight-nTpPgltCh1C+10; var nMnLfPos=GetElementleft(oRoundTreeMenu)+oRoundTreeMenu.offsetWidth-oMainChart.offsetLeft+10; glObjTr.nMnMaxLfPs=nMnLfPos; if (sIdCh == "") 
 {
 glObjTr.nMnMaxTpPs =nMnTpPos; }
 if(nMnTpPos>glObjTr.nMnMaxTpPs)
 {
 glObjTr.nMnMaxTpPs=nMnTpPos;  }

 this.moveMenuVisible(sCntr); } 

}

glObjTr.setFcsItm = function (oItem) {
 oItem.focus(); }


glObjTr.removePrevMenu = function (sIdOpn,bF) {
 var oBr = new PT_browserInfo(); oBr.init(); var bIE = oBr.isIE; var bIEm9=0; if(bIE)
 {
 bIEm9=(window.document.documentMode>8)?1:0; }
 var sAct="click"; var bFlag=glObjTr.isEmpty(bF)?0:bF; if(oBr.isiPad){ 
 
 if(!bFlag&&((glObjTr.isEmpty(event)||(event.type!="touchstart")||(event.touches&&event.touches.length>1) || 
 (typeof(event.target.className) != 'undefined' && event.target.className != "ptipadclosemenu"))))
 return;  sAct="touchstart";  } 


 if (((typeof sIdOpn == "object")||(glObjTr.isEmpty(sIdOpn))))
 {
 var ev = !bIE ? sIdOpn : event; if (glObjTr.isEmpty(ev) && glObjTr.bUseTopDoc) {
 ev=sIdOpn; }
 var Mysource = !bIE ? ev.target : ev.srcElement; if(!Mysource.getAttribute)
 {
 return; }
 if(bIE && ((glObjTr.iType==4)|| (glObjTr.iType==6)|| (glObjTr.iType==3))&&(Mysource.getAttribute("FD")))
 {
 glObjTr.preventEventPropagation(ev); }
 var nKey=ev.keyCode; if ((Mysource.getAttribute("AC"))&&(nKey!=27)&&(!Mysource.getAttribute("SMN"))) {
 return; }
 
 if ((Mysource.getAttribute("AC"))&&(ev.type=='click')&&(Mysource.getAttribute("SMN"))) { 
 return; }
 }
 var elmns; if (!glObjTr.bUseTopDoc)
 elmns = document.getElementsByTagName("DIV"); else 
 elmns = window.top.document.getElementsByTagName("DIV");  var nLelm = elmns.length; var sOpner = ""; var bRet = 1; if (nLelm) {
 for (var K = 0; K < nLelm; K++) {
 if (elmns[K].getAttribute("PSMNU")) {
 sOpner = elmns[K].getAttribute("PSMNU"); if (sOpner === sIdOpn) {
 bRet = 0; }
 var sMid = elmns[K].id; elmns[K].parentNode.removeChild(elmns[K]); glObjTr.sOpen = ""; if (bIE &&(!bIEm9)) {
 var sOpenShdowId = sMid + "$$1"; var oOpenShadow; if (!glObjTr.bUseTopDoc)
 oOpenShadow = document.getElementById(sOpenShdowId); else 
 oOpenShadow = window.top.document.getElementById(sOpenShdowId);  if (oOpenShadow) {
 oOpenShadow.parentNode.removeChild(oOpenShadow); }
 }

 if ((glObjTr.iType < 3)||(glObjTr.iType == 5))
 {
 var sCntr=sMid.substring(0,sMid.indexOf('$')); checkController(sCntr); glObjTr.moveMenuVisible(sCntr); var oMainObj=document.getElementById(sCntr+"$OR1C$$0"); oMainObj.scrollTop=glObjTr.nChrtScrlTp; oMainObj.scrollLeft=glObjTr.nChrtScrlLf; glObjTr.nChrtScrlTp =0; glObjTr.nChrtScrlLf=0; } 

 break; }
 }
 glObjTr.bCrtCtxMn=0; glObjTr.bChrtMn=0; glObjTr.nTop = 0; glObjTr.nLeft=0; glObjTr.sRALkId=""; if(!glObjTr.bUseTopDoc){
 ptEvent.remove(document, sAct, glObjTr.removePrevMenu); }
 else{
 ptEvent.remove(window.top.document, sAct, glObjTr.removePrevMenu); if (glObjTr.sOpen == "" && sOpner.indexOf("relatedActionsPersGbl") >= 0) {
 glObjTr.sOpen = sOpner;  }
 }

 if((!glObjTr.isEmpty(glObjTr.oInvkRtMenuId))&&(glObjTr.bAccessible))
 {
 var oRtmenuParentObj=document.getElementById(glObjTr.oInvkRtMenuId); if(!glObjTr.isEmpty(oRtmenuParentObj))
 {
 oRtmenuParentObj.focus(); glObjTr.oInvkRtMenuId=""; }
 }

 return bRet; } 
 else {
 glObjTr.bCrtCtxMn=0;  glObjTr.bChrtMn=0; glObjTr.nTop = 0; glObjTr.nLeft=0; glObjTr.sRALkId=""; if(!glObjTr.bUseTopDoc){
 ptEvent.remove(document, sAct, glObjTr.removePrevMenu); }
 else{
 ptEvent.remove(window.top.document, sAct, glObjTr.removePrevMenu); }

 if((!glObjTr.isEmpty(glObjTr.oInvkRtMenuId))&&(glObjTr.bAccessible))
 {
 var oRtmenuParentObj=document.getElementById(glObjTr.oInvkRtMenuId); if(!glObjTr.isEmpty(oRtmenuParentObj))
 {
 oRtmenuParentObj.focus(); glObjTr.oInvkRtMenuId=""; }
 }

 return bRet; }

}


glObjTr.RoundVML = function (oForC, radSize) {
 var vObj = oForC; var width = vObj.offsetWidth + "px"; var height = vObj.offsetHeight + "px"; var classID = vObj.className; var nZindObj=vObj.style.zIndex;  var sZindObj=""; if(!this.isEmpty(nZindObj))
 {
 sZindObj =" z-index:"+nZindObj+";"; } 
 var arcSize = radSize / Math.min(vObj.offsetWidth, vObj.offsetHeight); if (arcSize == 0) {
 oForC.style.zIndex = 0; return; }
 vObj.style.visibility = "visible"; var strokeColor = vObj.currentStyle.borderColor; var strokeWeight = vObj.currentStyle.borderWidth; vObj.style.border = 'none'; var fillColor = vObj.currentStyle.backgroundColor; var fillSrc = vObj.currentStyle.backgroundImage.replace(/^url\("(.+)"\)$/, '$1'); vObj.style.background = 'transparent'; var margin = vObj.currentStyle.margin; vObj.style.margin = '0'; var styleFloat = vObj.currentStyle.styleFloat; vObj.style.styleFloat = 'none'; var clear = vObj.currentStyle.clear; vObj.style.clear = 'none'; var position = 'absolute'; vObj.style.position = 'absolute'; var left = vObj.currentStyle.left; vObj.style.left = '0px'; var right = vObj.currentStyle.right; vObj.style.right = '0px'; var top = vObj.currentStyle.top; vObj.style.top = '0px'; var bottom = vObj.currentStyle.bottom; vObj.style.bottom = '0px'; var oId = vObj.id; var sShadowId = oId + "$$1"; var oShadow; if (!glObjTr.bUseTopDoc)
 oShadow = document.getElementById(sShadowId); else
 oShadow = window.top.document.getElementById(sShadowId); if (!(this.isEmpty(oShadow))) {
 oShadow.style.visibility = "visible"; }
 vObj.id = ""; var sRes=""; var bIEm8=(window.document.documentMode>7)?1:0; if(bIEm8)
 {
 sRes='<?import namespace="v" implementation="#default#VML" ?>'; }
 sRes += '<div id=' + oId + ' SMN=1 PSMNU="' + glObjTr.sOpen + '" class="' + classID + '" style="background: transparent; border: none; padding: 0px; margin: ' + margin + '; float: ' + styleFloat + '; clear: ' + clear + '; position: ' + position + '; left: ' + left + '; right: ' + right + '; top: ' + top + '; bottom: ' + bottom + '; width: auto; height: auto;'+sZindObj+';">';  sRes += '<v:roundrect arcsize="' + arcSize + '" strokecolor="' + strokeColor + '" strokeweight="' + strokeWeight + '" style="display:inline-block; width:' + width + '; height:' + height + '; padding: ' + strokeWeight + ';">';  sRes += '<v:fill color="' + fillColor + '" type="gradient"/>'; sRes += vObj.outerHTML + '</v:roundrect></div>'; vObj.outerHTML = sRes;}


glObjTr.RoundVMLShadow = function (vObj, radSize) {
 var width = vObj.offsetWidth; var height = vObj.offsetHeight; var arcSize = (radSize + 4) / Math.min(vObj.offsetWidth, vObj.offsetHeight); var margin = vObj.currentStyle.margin; vObj.style.margin = '0px'; var styleFloat = vObj.currentStyle.styleFloat; vObj.style.styleFloat = 'none'; var clear = vObj.currentStyle.clear; vObj.style.clear = 'none'; var bottom = vObj.currentStyle.bottom; vObj.style.bottom = '0px'; var strokeColor = vObj.currentStyle.borderColor; var classID = vObj.className; vObj.style.border = 'none'; var fillColor = vObj.currentStyle.backgroundColor; vObj.style.background = 'transparent'; vObj.style.margin = '0px'; var position = 'absolute'; vObj.style.position = 'absolute'; var left = vObj.currentStyle.left; vObj.style.left = '0px'; var right = vObj.currentStyle.right; vObj.style.right = '0px'; var top = vObj.currentStyle.top; vObj.style.top = '0px'; var oId = vObj.id; vObj.id = ""; var nRel = width / height;  var PopFocus="95%,95%"; if(nRel<0.6)
 {
 PopFocus="95%,99%"; }
 height += 2; var sRes=""; var bIEm8=(window.document.documentMode>7)?1:0;  if(bIEm8)
 {
 sRes='<?import namespace="v" implementation="#default#VML"?>'; }
 sRes += '<div id="' + oId + '" SMN=1 class="' + classID + '" style="background: transparent; border: none; padding: 0px; margin: ' + margin + '; float: ' + styleFloat + '; clear: ' + clear + '; position: ' + position + '; left: ' + left + '; right: ' + right + '; top: ' + top + '; bottom: ' + bottom + '; width: auto; height: auto;">'; sRes += '<v:roundrect arcsize="' + arcSize + '" strokecolor="' + strokeColor + '" stroked="0" style="display:inline-block;width:'+width+'px; height:'+height+'px; ">'; sRes+='<v:fill method="linear sigma" opacity="90%" color="' + fillColor + '" color2="#D0D0D0" o:opacity2="0.1" angle="0" focus="100%" focusposition="-.01,-.01" focussize=\"'+PopFocus+'\" type="gradientRadial" />'; sRes += vObj.outerHTML + '</v:roundrect></div>'; vObj.outerHTML = sRes;}


function getScrollXY() {
 var scrOfX = 0, scrOfY = 0; if( typeof( window.pageYOffset ) == 'number' ) {
 
 scrOfY = window.pageYOffset; scrOfX = window.pageXOffset; } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
 
 scrOfY = document.body.scrollTop; scrOfX = document.body.scrollLeft; } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
 
 scrOfY = document.documentElement.scrollTop; scrOfX = document.documentElement.scrollLeft; }
 return [ scrOfX, scrOfY ];}



glObjTr.adjustMenu = function (menuEle) {
 var menuHeight = menuEle.offsetHeight; var menuWidth = menuEle.offsetWidth; var scrollLeftTop = getScrollXY(); var e = menuEle; var x = 0, y = 0;  while(e) {
 x += e.offsetLeft || 0; y += e.offsetTop || 0; e = e.offsetParent; }


 menuEle.style.display = "none";   var docHeight = ptCommonObj2.getViewportHeight(); var docWidth = ptCommonObj2.getViewportWidth(); var tWidth = menuWidth; var mParent = menuEle.parentNode; var isSecondLevel = false; var parentTop = 0;   if(mParent && mParent.className.indexOf("SHADOW_MENU_DROPDOWN") != -1) {
 tWidth += mParent.offsetWidth; isSecondLevel = true; tParent = mParent.parentNode; if(tParent && tParent.className.indexOf("SHADOW_MENU_DROPDOWN") != -1) {
 parentTop = parseInt(tParent.style.top);   parentTop = -tParent; } else {
 parentTop = parseInt(mParent.style.top); parentTop = -parentTop; }

 }

 if ("ltr" !== "ltr")
 {
 if(!isSecondLevel) {
 x = x-menuWidth; menuEle.style.left = x + "px"; } else {
 var tLeft = menuEle.style.left; tLeft = tLeft.substr(0, tLeft.length -2); x = tLeft - (tWidth-5); menuEle.style.left = x + "px"; }
 }

 
 
 if ("ltr" === "ltr") {
 if(x + menuWidth + 20 > docWidth) {
 var tLeft = menuEle.style.left; tLeft = tLeft.substr(0, tLeft.length -2); x = tLeft - (tWidth-5); if(x < 3 && !isSecondLevel)
 x = 3; menuEle.style.left = x + "px"; }
 } else {
 var tLeft = menuEle.style.left; tLeft = tLeft.substr(0, tLeft.length -2); if(tLeft < 0 && !isSecondLevel) {
 tLeft = parseInt(tLeft) + (tWidth+5); menuEle.style.left = tLeft + "px"; }
 }

 
 if(!isSecondLevel) {
 if(scrollLeftTop[1] <= 0 && (y + menuHeight) > docHeight) {
 var tTop = menuEle.style.top; tTop = tTop.substr(0, tTop.length -2); y = tTop - menuHeight; if(y < 3)
 y = 3; menuEle.style.top = y + "px"; } else if((y + menuHeight + scrollLeftTop[1] + 20) > (docHeight + scrollLeftTop[1])) {
 y = (y - menuHeight)+scrollLeftTop[1]; if(y < 3)
 y = 3; menuEle.style.top = y + "px"; } else if(scrollLeftTop[1] > 0)
 menuEle.style.top = (y + scrollLeftTop[1]) + "px"; } else {
 if((scrollLeftTop[1] <= 0 && (y + menuHeight) > docHeight) || (y + menuHeight) > (docHeight + scrollLeftTop[1])) {
 var tTop = menuEle.style.top; tTop = tTop.substr(0, tTop.length -2); y = tTop - menuHeight; if(y < parentTop)
 y = y + (-parseInt(mParent.style.top) - y); menuEle.style.top = y + "px"; }
 }
 menuEle.style.display = "";}



glObjTr.adjustSearchMenu = function (menuEle) {
 if(glObjTr.iType != 4)
 return; var menuHeight = menuEle.offsetHeight; var menuWidth = menuEle.offsetWidth; var scrollLeftTop = getScrollXY(); var e = menuEle; var x = 0, y = 0; var xPerSrch=0, yPerSrch=0, yPerSrchH, yPerSrchScrllH, yPerSrchScrllTp;  while(e) {
 x += e.offsetLeft || 0;  y += e.offsetTop || 0; e = e.offsetParent; }

 if(glObjTr.bUseTopDoc)
 {
 var oPersSrchDiv; if(!(glObjTr.isEmpty(glObjTr.sPersSrchDivId)))
 {
 oPersSrchDiv=window.top.document.getElementById(glObjTr.sPersSrchDivId); if(!(glObjTr.isEmpty(oPersSrchDiv)))
 {
 yPerSrchH=oPersSrchDiv.offsetHeight; yPerSrchScrllH=oPersSrchDiv.scrollHeight; yPerSrchScrllTp=oPersSrchDiv.scrollTop; }
 while(oPersSrchDiv) 
 {
 xPerSrch += oPersSrchDiv.offsetLeft || 0;  yPerSrch += oPersSrchDiv.offsetTop || 0; oPersSrchDiv = oPersSrchDiv.offsetParent; }
 }
 } 

 var tLeft = menuEle.style.left; tLeft = tLeft.substr(0, tLeft.length -2); var tTop = menuEle.style.top; tTop = tTop.substr(0, tTop.length -2); var tRight = menuEle.style.right; tRight = tRight.substr(0, tRight.length -2);  menuEle.style.display = "none";   var docHeight = ptCommonObj2.getViewportHeight(); var docWidth = ptCommonObj2.getViewportWidth(); var tWidth = menuWidth; var mParent = menuEle.parentNode; var bRtMenu=true;   if(mParent && mParent.className.indexOf("SHADOW_MENU_DROPDOWN") != -1) 
 {
 bRtMenu=false; }

 
 if(!bRtMenu)
 {
 if(glObjTr.bUseTopDoc)
 {
 if(x <xPerSrch) 
 {
 menuEle.style.right = tRight-menuWidth -20 + "px"; }
 }
 else
 {
 if(x <scrollLeftTop[0]) 
 {
 menuEle.style.right = tRight-menuWidth -30 ; + "px"; }
 }
 }

 
 if(glObjTr.bUseTopDoc)
 {
 if((y + menuHeight) > yPerSrchH+yPerSrch+yPerSrchScrllTp-8) 
 { 
 if(bRtMenu&&((tTop-menuHeight)<0))
 {
 menuEle.style.top = 0 + "px";  }
 else
 {
 menuEle.style.top = tTop-menuHeight + "px"; }
 }
 }
 else
 {
 if((y + menuHeight) > docHeight+scrollLeftTop[1]-8) 
 { 
 if(bRtMenu)
 {
 menuEle.style.top = y-menuHeight + "px"; }
 else
 {
 menuEle.style.top = tTop-menuHeight + "px"; }
 }
 }

 var tTop = menuEle.style.top; tTop = tTop.substr(0, tTop.length -2); var pTop = mParent.style.top; pTop = pTop.substr(0, pTop.length -2); tTop = tTop + pTop; if(tTop < 0) {
 tTop = 10; menuEle.style.top = tTop + "px"; }

 menuEle.style.display = "";}


glObjTr.getDescTooltip = function (mObj, e)
 {
 glObjTr.changeBkg(mObj); var oBr = new PT_browserInfo(); oBr.init(); var bIE = oBr.isIE; var bMozila=oBr.isMozilla
 var bIEm9=0; if(bIE)
 bIEm9=(window.document.documentMode>8)?1:0; var ev = bMozila ? e : event; var IsNeed = mObj.getAttribute("STP");  if (!glObjTr.isEmpty(IsNeed))
 {
 var TlT = document.createElement("DIV"); TlT.id = "Mnt";  TlT.innerHTML = IsNeed + "&nbsp;&nbsp;"; TlT.className = "PT_RATBOX_TOOLTIP"; TlT.style.position = "absolute"; TlT.style.display = "block"; TlT.style.zIndex = 200000; var TDivNode = mObj.parentNode.parentNode.parentNode; glObjTr.AddToObj(TDivNode, TlT);  var bPgl = 0; var bP = 0; var nLeft = mObj.offsetLeft; var nTop = mObj.offsetTop; if(bIE && !bIEm9)
 {
 var xPP = ev.clientX + document.body.scrollLeft; var yPP = ev.clientY + document.body.scrollTop; if (bPgl)
 {
 xPP = ev.x; yPP = ev.y; }
 TlT.style.left =( xPP - 12)+"px"; TlT.style.top = (yPP - (4 + TlT.offsetHeight) - 46 )+"px";   }
 else
 {
 TlT.style.left = nLeft - 10+"px"; TlT.style.top = nTop - 25+"px";  }
 var biPad=0; if (biPad)
 {
 TlT.style.top = nTop + 35 +"px"; setTimeout(function () {closeDescTooltip(mObj); }, 5000); }
 }
 }


glObjTr.closeDescTooltip = function (mObj)
 {
 glObjTr.changeBkg(mObj); var oDivT=document.getElementById("Mnt"); if(oDivT)
 {
 var oPar=oDivT.parentNode
 oPar.removeChild(oDivT); }
 }


glObjTr.AddToObj = function(oParent,ChildO)
 { 
 var oDiv = document.getElementById(ChildO.id); if(oDiv&&oDiv.parentNode)
 {
 oDiv.parentNode.removeChild(oDiv);  }
 oParent.appendChild(ChildO); }


glObjTr.isEmpty = function (strIn) {
 var m_undef; if ((strIn == m_undef) || (strIn.length == 0)) 
 return 1; return 0;}


glObjTr.preventEventPropagation = function (ev) {
 if (ev.preventDefault) {
 ev.preventDefault(); }
 if (ev.stopPropagation) {
 ev.stopPropagation(); }
 ev.returnValue = false; ev.cancelBubble = true; ev.cancel = true;}


glObjTr.keyDwn = function (sIdEsc, sParentId, nType, sIdIEsc, sIdCh, sIdChPar, sNId, nDescr, nLeft, nTop, bIE, oItema, e) {
 var ev=!bIE?e:event; var key=ev.keyCode; var Mysource = !bIE ? ev.target : ev.srcElement; var sId = unescape(sIdEsc); var sCntr = sParentId; var index = sParentId.indexOf("$$"); if (index > 1) {
 var temp; temp = sParentId.substring(0, sParentId.indexOf('$')); sCntr = temp; }
 var sNdDscCtr = ""; var sIdI=sIdIEsc; if (glObjTr.iType < 3) {
 sNdDscCtr = sNId + "$" + nDescr;  sIdI=unescape(sIdIEsc); }
 var bIEm9=0; if(bIE)
 {
 bIEm9=(window.document.documentMode>8)?1:0; }
 if(key==38)
 { 
 var oPreItem = bIE? (oItema.parentNode.parentNode.parentNode).previousSibling : (oItema.parentNode.parentNode.parentNode).previousElementSibling; if(!(this.isEmpty(oPreItem))) 
 {
 while(oPreItem.getAttribute("MSG"))
 {
 oPreItem=bIE? oPreItem.previousSibling : oPreItem.previousElementSibling; if(this.isEmpty(oPreItem))
 break; } 
 }

 if(!(this.isEmpty(oPreItem)))
 {
 var oPreItemA =oPreItem.childNodes[0].childNodes[0].childNodes[0]; }

 if(!(this.isEmpty(oPreItemA)))
 {

 oPreItemA.focus(); } 
 glObjTr.preventEventPropagation(ev); }

 if((key==40)||(key==9))
 { 
 var oNextItem = bIE? (oItema.parentNode.parentNode.parentNode).nextSibling : (oItema.parentNode.parentNode.parentNode).nextElementSibling; if(!(this.isEmpty(oNextItem))) 
 {
 while(oNextItem.getAttribute("MSG"))
 {
 oNextItem=bIE? oNextItem.nextSibling : oNextItem.nextElementSibling; if(this.isEmpty(oNextItem))
 break; } 
 }

 if(!(this.isEmpty(oNextItem)))
 {
 var oNextItemA =oNextItem.childNodes[0].childNodes[0].childNodes[0];  }
 if(!(this.isEmpty(oNextItemA)))
 {
 oNextItemA.focus(); }
 glObjTr.preventEventPropagation(ev);  }

 if(key==13)
 { 
 if(!Mysource.getAttribute)
 {
 return; }
 if(Mysource.getAttribute("FD"))
 glObjTr.bEnterKey=true;  }
 if(((glObjTr.iType != 4)&&(key==37))||((glObjTr.iType == 4)&&(key==39)))
 { 
 var sIdSubMenu = sCntr + "$$" + sId + this.ch127 + sIdCh; var oDivMn ; if (!glObjTr.bUseTopDoc)
 {
 oDivMn = document.getElementById(sIdSubMenu); }
 else 
 {
 oDivMn = window.top.document.getElementById(sIdSubMenu); }
 if (oDivMn && oDivMn .parentNode) 
 {
 var oParTr; if (!glObjTr.bUseTopDoc)
 oParTr = document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdChPar + "$" + sIdCh); else
 oParTr = window.top.document.getElementById(sCntr + "$$" + sId + this.ch127 + sIdChPar + "$" + sIdCh); if (oParTr)
 {
 oParTr.className = "PT_ORG_ACTION_BG"; var oParA =oParTr.childNodes[0].childNodes[0].childNodes[0];  if(oParA)
 {
 oParA.focus();  }
 }
 oDivMn.parentNode.removeChild(oDivMn); if (bIE && (!bIEm9))
 {
 var sOpenShdowId = sIdSubMenu + "$$1"; var oOpenShadow = document.getElementById(sOpenShdowId); if (oOpenShadow) 
 {
 oOpenShadow.parentNode.removeChild(oOpenShadow); }
 }
 }
 glObjTr.preventEventPropagation(ev);  }

 if(((glObjTr.iType != 4)&&(key==39))||((glObjTr.iType == 4)&&(key==37)))
 { 
 if(Mysource.getAttribute("FD"))
 {
 glObjTr.bEnterKey=true; this.createMenu(escape(sId), sCntr, nType, sIdIEsc, sIdCh, sNId, nDescr, nLeft, nTop, bIE, oItema) 
 }
 glObjTr.preventEventPropagation(ev);  }
}

glObjTr.checkEnterKey = function (e){ 
 var oBr = new PT_browserInfo(); oBr.init(); var bIE = oBr.isIE; var ev=!bIE?e:event; var key=ev.keyCode; if(key==13)
 { 
 glObjTr.bEnterKey=true; }
}



Array.prototype.isParent = function (Mystr) {
 var s; var bRet = false; for (s in this) {
 if (s == Mystr) {
 bRet = true; break; }
 }
 return bRet;}


glObjTr.moveMenuVisible = function (sCntr) {
 if ((glObjTr.iType < 3)||(glObjTr.iType == 5))
 {
 var oMainObj=getObj(strCont+"$OR1C$$0"); if(this.isEmpty(oMainObj))
 return 0; if (glObjTr.bChrtMn)
 {
 var nCurrScrlTp=oMainObj.scrollTop; var nCurrScrlLf=oMainObj.scrollLeft; if(glObjTr.bChrtRtMn)
 {
 glObjTr.nChrtScrlTp =nCurrScrlTp; glObjTr.nChrtScrlLf=nCurrScrlLf; glObjTr.bChrtRtMn=0; }
 var nMaxScrlLf=glObjTr.nMnMaxLfPs-oMainObj.clientWidth; var nMaxScrlTp=glObjTr.nMnMaxTpPs-oMainObj.clientHeight; var nMinScrlLf=glObjTr.nLeft; var nMinScrlTp=glObjTr.nTop; if(nMinScrlLf<nCurrScrlLf)
 {
 oMainObj.scrollLeft=nMinScrlLf; }
 if(nMinScrlTp<nCurrScrlTp)
 {
 oMainObj.scrollTop=nMinScrlTp; }
 if(nMaxScrlLf>nCurrScrlLf)
 {
 oMainObj.scrollLeft=nMaxScrlLf; }
 if(nMaxScrlTp>nCurrScrlTp)
 {
 oMainObj.scrollTop=nMaxScrlTp; }
 glObjTr.bChrtMn=0; }
 }
}

var lastChildValid = function(node) {
 if (node.childNodes) {
 var listLength = node.childNodes.length; var validEl = null;  for (var i = 0; i < listLength; i++) { 
 var dNode = node.childNodes[(listLength - 1)- i];  if (dNode.nodeName !== "#text") {
 validEl = dNode; return validEl; }
 }
 if (validEl == null)
 return node.lastChild;  }
 else return node.lastChild;}
 
var firstChildValid = function(node) {
 if (node.childNodes) {
 var listLength = node.childNodes.length; var validEl = null; for (var i = 0; i < listLength; i++) {
 var dNode = node.childNodes[i];  if (dNode.nodeName !== "#text") {
 validEl = dNode; return validEl; }
 }
 if (validEl == null) 
 return node.firstChild;  }
 else return node.firstChild;}


try {
 if (typeof(top.ptIframe) == "undefined" && typeof(top.searchGbl) !== "undefined" && !top.searchGbl.sForm) {
 ptEvent.load(top.searchGbl.init); if (typeof(top.ptIframeHdr) !== "undefined") {
 ptEvent.load(top.ptIframeHdr.init); }
 }
}
catch(e) {}


function setRAActionUrl(srchUrl) {
 var elemId = "GSrchRaUrl1"; var elemUrl = document.getElementById(elemId); if (!elemUrl && !top.searchGbl.isHomepage && typeof(ptIframe) !== "undefined")
 elemUrl = window.frames["TargetContent"].document.getElementById(elemId);  else
 elemUrl = top.document.getElementById(elemId); if (elemUrl)
 elemUrl.value = srchUrl;}


function getRelatedActions(fldId) {
 var bIsHomePage = false; if (top && top.searchGbl)
 bIsHomePage = top.searchGbl.isHomepage; var relActionsStr = fldId + 'Str'; var elem = document.getElementById(relActionsStr); if (elem) {
 var raStrValue = elem.value; if ((elem.firstChild) && (typeof raStrValue == 'undefined'))
 raStrValue = elem.firstChild.data;    var rootMenu = 'DROPDOWNNAME1' + String.fromCharCode(9) + String.fromCharCode(9) + 
 '#rt#' + String.fromCharCode(9) + 'ID';  if (raStrValue.indexOf(rootMenu, 0) < 0) {
 var tmpRAStr = raStrValue; raStrValue = tmpRAStr.replace( 'DROPDOWNNAME1 #rt# ID', rootMenu); tmpRAStr = raStrValue;  var ch127ch127 = String.fromCharCode(127) + String.fromCharCode(127); var nMenuCount = 0; var nLen = 0; var nEndIndex = 0; do {
 nLen = tmpRAStr.length; nEndIndex = tmpRAStr.indexOf(ch127ch127, 0); tmpRAStr = tmpRAStr.substr((nEndIndex + 2), nLen); nMenuCount++; } while (nEndIndex < (nLen - 2))

 
 tmpRAStr = raStrValue; var processedRA = ""; for (var i = 0; i < nMenuCount; i++) {
 nEndIndex = tmpRAStr.indexOf(ch127ch127); processedRA = processedRA + tmpRAStr.substr(0, (nEndIndex + 2));  nLen = tmpRAStr.length; if (nEndIndex < (nLen - 2)) {
 tmpRAStr = tmpRAStr.substr((nEndIndex + 2), nLen); tmpRAStr = tmpRAStr.replace( ' ', String.fromCharCode(9)); }
 }
 raStrValue = processedRA; }

 
 var absCord = {x:0,y:0};  var referenceObj = document.getElementById(fldId);  if (!referenceObj)
 referenceObj = window.top.document.getElementById(fldId);  if ((fldId.indexOf("Pers") > -1) && referenceObj && (referenceObj.childNodes.length > 0)) { 
 if (!bIsHomePage || !browserInfoObj2.isIE)
 referenceObj = firstChildValid(referenceObj);  if (referenceObj) {
 absCord.x = referenceObj.offsetLeft;  absCord.y = referenceObj.offsetTop; if (bIsHomePage && (browserInfoObj2.isIE) && !detectDoctype(document)) {
 absCord.x = referenceObj.offsetLeft + 43;  absCord.y = referenceObj.offsetTop; }
 }
 } else { 
 absCord = ptCommonObj2.getAbsolutePosition(referenceObj);  absCord.y = absCord.y - referenceObj.offsetTop; } 

 
 if (glObjTr && raStrValue) { 
 glObjTr.bEnterKey=g_bAccessibilityMode; glObjTr.oInvkRtMenuId=fldId; glObjTr.showActionMenu(fldId, absCord.x, absCord.y, 6, 4, raStrValue, 'DROPDOWNNAME1');  } else {
 alert('An error occurred for homepage related actions. Please try accessing results on another page.'); }
 }
}

function isOutside(evt, parent) {
 var elem = evt.relatedTarget || evt.toElement || evt.fromElement; while (elem && elem !== parent)
 elem = elem.parentNode; if (elem !== parent)
 return true;}
 
function removeRelatedActionsImage(ev, fldId, rowNum) {
 var evnt = ev || window.event; var srchRsltTblId = "srchRsltTbl$" + rowNum;  var parentTbl = document.getElementById(srchRsltTblId); if (!parentTbl || fldId.indexOf("Pers") > -1) { 
 if (fldId.indexOf("Gbl") > -1)
 parentTbl = top.document.getElementById("persResultGbl$" + rowNum); else
 parentTbl = top.document.getElementById("persResult$" + rowNum); }
 if (isOutside(evnt, parentTbl)) {
 
 var relTarg = evnt.relatedTarget || evnt.toElement; if (relTarg && (!relTarg.getAttribute("SMN")) && (!relTarg.getAttribute("AC"))) {
 
 if (browserInfoObj2.isIE && relTarg.outerHTML && relTarg.innerHTML && 
 (relTarg.outerHTML != "") && (relTarg.innerHTML != "") && (!relTarg.innerText))
 return; var elem = document.getElementById(fldId); if (!elem) {
 elem = top.document.getElementById(fldId); }
 if (elem && elem.style.visibility=='visible') {
 if (glObjTr)
 glObjTr.removePrevMenu(evnt); gSrchRaFldId = ""; }
 }
 }
}

function showRelatedActionsImage(event, fldId, bVisible) {
 if ((gSrchRaFldId != fldId) && (gSrchRaFldId.length > 0)) {
 if (glObjTr)
 glObjTr.removePrevMenu(event); } 
 var elem = document.getElementById(fldId); if (!elem) {
 elem = top.document.getElementById(fldId); }
 if (bVisible) {
 var relActionsStr = fldId + 'Str'; var raStrElem = document.getElementById(relActionsStr); if (!raStrElem) {
 raStrElem = top.document.getElementById(relActionsStr); }
 if (elem && raStrElem) { 
 var raString = raStrElem.value; if ((typeof raString == 'undefined') && (raStrElem.childNodes.length > 0)) {
 raString = raStrElem.childNodes[0].data; }
 if (raString && raString.length > 0)
 elem.style.visibility='visible'; }
 gSrchRaFldId = fldId; } 
}


function setRelActionsElemValue(rowNum, raFormatedStrVar, raElemId, bProcessGbl) {
 
 var fldId = new Array(); if (raElemId.indexOf("relatedActionsPersGbl") > -1)
 fldId[0] = "relatedActionsPersGbl$" + rowNum; else if (raElemId.indexOf("relatedActionsPers") > -1)
 fldId[0] = "relatedActionsPers$" + rowNum; else
 fldId[0] = "relatedActions$" + rowNum;    if (raElemId.indexOf("relatedActionsPersGbl") < 0 && raElemId.indexOf("relatedActionsPers") < 0 && bProcessGbl) {
 fldId[0] = "relatedActions$" + rowNum; fldId[1] = "relatedActionsPersGbl$" + rowNum; }
 
 
 var raStrElem = ""; for (var i=0; i < fldId.length; i++) {
 var raElem = document.getElementById(fldId[i]); if (!raElem) {
 raElem = top.document.getElementById(fldId[i]); }
 var raValue = eval(raFormatedStrVar); if (raElem && (raValue.length != 0)) {
 var relActionsStr = fldId[i].concat("Str");  raStrElem = document.getElementById(relActionsStr); var elemArr = new Array(); if (!raStrElem && fldId[i].indexOf("relatedActionsPersGbl") > -1) {
 elemArr = ptUtil.getElemsByClass("relActString", top.document.getElementById("ptabnprevGbl_GBL"), "span");  if (elemArr.length > 0) {
 raStrElem = elemArr[rowNum]; }
 }
 else if (!raStrElem && fldId[i].indexOf("relatedActionsPers") > -1 && typeof top.pthNav !== "undefined" && top.pthNav.abn.search.currResults) {
 elemArr = ptUtil.getElemsByClass("relActString", top.document.getElementById("ptabnprev_" + top.pthNav.abn.search.currResults.objName), "span");  if (elemArr.length > 0) {
 raStrElem = elemArr[rowNum]; } 
 }
 else if (!raStrElem) {
 raStrElem = top.document.getElementById(relActionsStr); }
 }
 if (raStrElem) {
 raStrElem.value = raValue;  raElem.style.visibility='visible';  var raTdElem = document.getElementById("relatedActionsTd$" + rowNum); var srTdElem = document.getElementById("srchRsltTd$" + rowNum); if (raTdElem && srTdElem) {
 raTdElem.height = srTdElem.offsetHeight; }
 }
 }
 if (raElem && (raValue.length != 0))
 return true; return false;}




function processRelatedActionsResponse(nContentServerIndex, respText, raElemId, bProcessGbl, currPage) {
 if (!respText) 
 return; var xmlDoc = null; if (window.ActiveXObject) {
 xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); xmlDoc.async = "false"; xmlDoc.loadXML(respText); } else {
 var parser=new DOMParser(); xmlDoc = parser.parseFromString(respText, "text/xml"); }
 if (xmlDoc) {

 var scriptList = xmlDoc.getElementsByTagName("GENSCRIPT"); if (scriptList) {
 for (var i=0; i < scriptList.length; i++) {
 eval(scriptList[i].firstChild.data); }
 }

 
 
 var nIndex = (currPage - 1) * 10;  var nRowNum = nIndex; var nTmp = 1; for (var rowNum = nIndex; rowNum < (nIndex + 10); rowNum++) {
 if (srchUrls[nContentServerIndex][rowNum - nIndex] != "") {
 var raFormatedStrVar = "raFormatedString" + nTmp++; setRelActionsElemValue(rowNum, raFormatedStrVar, raElemId, bProcessGbl); }
 }
 } else {
 alert("xmldoc is null"); }


}

function getCurrPagePersSrch(dList) {
 currPage = 0; if (dList) {
 for (var i = 0, y = 0; i < dList.childNodes.length; i++) {
 if (dList.childNodes[i].className != "ptabnhide" && y == 0) {
 currPage = i + 1; y = 1;  }
 }
 }
 return currPage;}

function setupRelatedActions() {
 
 var RAFlagGbl = top.document.getElementById("RelatedActionsFlagPersGbl"); var RAFlagBC = top.document.getElementById("RelatedActionsFlagPers");  var nameArr = ["gbl"]; var idArr = {gbl: "", persGbl: "PersGbl", persBC: "Pers"}; var currPageArr = {gbl: 0, persGbl: 0, persBC: 0}; var bProcessArr = {gbl: false, persGbl: false, persBC: false}; var srchUrlsArr = {gbl: [], persGbl: [], persBC: []}; var nSrchRsltCountArr = {gbl: 0, persGbl: 0, persBC: 0};  if (typeof(top.pthNav) !== "undefined" && top.pthNav.abn.search.currResults) {
 bProcessArr["persBC"] = true; nameArr.push("persBC"); currPageArr["persBC"] = getCurrPagePersSrch(top.document.getElementById("ptabndatalist_" + top.pthNav.abn.search.currResults.objName)); }
 if (typeof(top.searchGbl) !=="undefined") {
 bProcessArr["persGbl"] = true; nameArr.push("persGbl"); currPageArr["persGbl"] = getCurrPagePersSrch(top.document.getElementById("ptabndatalist_GBL")); }
 currPageArr["gbl"] = gSrchRsltPageNum;  if (RAFlagGbl) { 
 if (RAFlagGbl.value == "true") {
 bProcessArr["gbl"] = false; bProcessArr["persBC"] = false; nameArr = ["persGbl"];  }
 } 
 if (RAFlagBC) {
 if (RAFlagBC.value == "true") {
 bProcessArr["gbl"] = false; bProcessArr["persGbl"] = false; nameArr = ["persBC"];  }
 } 
 
 for (var i = 0; i < nameArr.length; i++) {
 var nameStr = nameArr[i]; var idStr = idArr[nameStr]; var bProcessRA = false; var currPage = currPageArr[nameStr]; var nSrchRsltCount = 0; var bRAExists = false;  var nStartIndex = (currPage - 1) * 10; var tmpSrchUrls = [];  for (var j = nStartIndex; j < (nStartIndex + 10); j++) {
 var elemId = "srchRsltUrl" + idStr + "$" + j; var elemSrchUrl = document.getElementById(elemId); if (!elemSrchUrl)
 elemSrchUrl = top.document.getElementById(elemId);  if (elemSrchUrl) {
 var srchRsltUrl = elemSrchUrl.getAttribute('ra'); tmpSrchUrls[nSrchRsltCount] = srchRsltUrl; nSrchRsltCount = nSrchRsltCount + 1; bProcessRA = true; } else 
 break;   var RAStrVal = ""; var RAStr = document.getElementById("relatedActions" + idStr + "$" + j + "Str"); var RAElem = ""; if (!RAStr)
 top.document.getElementById("relatedActions" + idStr + "$" + j + "Str"); if (RAStr) {
 RAStrVal = RAStr.value; if ((typeof RAStrVal == 'undefined') && (RAStr.childNodes.length > 0)) {
 RAStrVal = RAStr.childNodes[0].nodeValue; }
 if (RAStrVal) {
 RAElem = top.document.getElementById("relatedActions" + idStr + "$" + j); if (RAElem) {
 RAElem.style.visibility = "visible"; }
 }
 }
 if (typeof (RAStrVal) !== "undefined" && RAStrVal) { 
 bRAExists = true;  } 
 }
 
 if (!bRAExists) {
 bProcessRA = true;  }
 else 
 bProcessRA = false;  bProcessArr[nameStr] = bProcessRA; srchUrlsArr[nameStr] = tmpSrchUrls; nSrchRsltCountArr[nameStr] = nSrchRsltCount; }
 var returnedArr = {bProcessArr: bProcessArr, currPageArr: currPageArr, srchUrlsArr: srchUrlsArr, nSrchRsltCountArr: nSrchRsltCountArr}; return returnedArr;}


function getSrchRsltRelatedActions() {

 var raDataArr = setupRelatedActions();  var bProcessArr = raDataArr["bProcessArr"]; var bProcess = bProcessArr["gbl"]; var bProcessBC = bProcessArr["persBC"]; var bProcessGbl = bProcessArr["persGbl"];  if (!bProcess && !bProcessBC && !bProcessGbl)
 return;  var srchRsltUrls = []; var raElemId = ""; var nSrchRsltCount = 0; var currPage = 0;      if (bProcess || (bProcess && bProcessGbl)) {
 srchRsltUrls = raDataArr["srchUrlsArr"]["gbl"]; raElemId = "relatedActions$" + ((gSrchRsltPageNum - 1) * 10); currPage = gSrchRsltPageNum; nSrchRsltCount = raDataArr["nSrchRsltCountArr"]["gbl"]; } 
 if (bProcessBC) {
 srchRsltUrls = raDataArr["srchUrlsArr"]["persBC"];; raElemId = "relatedActionsPers$" + ((raDataArr["currPageArr"]["persBC"] - 1) * 10); currPage = raDataArr["currPageArr"]["persBC"]; nSrchRsltCount = raDataArr["nSrchRsltCountArr"]["persBC"];; }
 if (bProcessGbl && !bProcess) {
 srchRsltUrls = raDataArr["srchUrlsArr"]["persGbl"]; raElemId = "relatedActionsPersGbl$" + ((raDataArr["currPageArr"]["persGbl"] - 1) * 10); currPage = raDataArr["currPageArr"]["persGbl"]; nSrchRsltCount = raDataArr["nSrchRsltCountArr"]["persGbl"];; }

 for (var i = 0; i < 10; i++)
 for (var j = 0; j < 10; j++)
 srchUrls[i][j] = "";  nContentServers = 0; var nProcessedCount = 0; for (var i = 0; i < nSrchRsltCount; i++) {
 
 if (nProcessedCount >= nSrchRsltCount)
 break; var srchRsltUrl = srchRsltUrls[i]; if ((!srchRsltUrl) || (srchRsltUrl == ""))
 continue; var prevContentServer = ""; for (var j = i; j < nSrchRsltCount; j++) { 
 
 srchRsltUrl = srchRsltUrls[j]; if ((!srchRsltUrl) || (srchRsltUrl == ""))
 continue; var srchRsltUrlArr = srchRsltUrl.split('/'); if (!srchRsltUrlArr) {
 alert(srchRsltUrl + " " + "That was not a valid URL format."); return; }

 var srchUrlHost = srchRsltUrlArr[2]; if (!srchUrlHost) {
 alert(srchRsltUrl + " " + "That was not a valid URL format."); return; }

 if (srchUrlHost.indexOf(':') < 0)
 srchUrlHost = srchUrlHost + ':80'; var externalUrl = false; var tmpPsc = srchRsltUrlArr[3]; if (!tmpPsc || ((tmpPsc != 'psp') && (tmpPsc != 'psc') && (tmpPsc != 'psreports'))) {
 srchRsltUrls[j] = ""; nProcessedCount++; externalUrl = true; if (nProcessedCount >= nSrchRsltCount)
 break; } 

 if (externalUrl == false) {
 var bAdd = true; if (prevContentServer == "") {
 prevContentServer = srchUrlHost;  nContentServers++; } else if ((prevContentServer.length != srchUrlHost.length) || 
 (prevContentServer.toString().toLowerCase() != srchUrlHost.toString().toLowerCase())) {
 bAdd = false; }
 
 if (bAdd) {
 srchUrls[nContentServers - 1][j] = srchRsltUrl; srchRsltUrls[j] = ""; nProcessedCount++; if (nProcessedCount >= nSrchRsltCount)
 break; }
 }
 }
 }
 
 if (nContentServers <= 0)
 return;  var doclocation = document.location.href; var actionurl = doclocation; var index = doclocation.indexOf('/h/?'); if (index > 0) {
 actionurl = doclocation.replace('/h/?', '/c/PORTAL_ADMIN.PTSF_GLOBAL_SEARCH.GBL?'); doclocation = actionurl; }
 var index = doclocation.indexOf('?'); if (index > 0) {
 actionurl = doclocation.substr(0, index); }

 var origUrl = actionurl;  var localURLArr= actionurl.split('/');   var localHost = localURLArr[2]; if (localHost.indexOf(':') < 0)
 localHost = localHost + ':80';  var portalName = ""; if (localURLArr.length > 6)
 portalName = localURLArr[5];  var localNodeName = ""; if (localURLArr.length > 7)
 localNodeName = localURLArr[6];   for (var i = 0; i < nContentServers; i++) {
 var srchRsltUrl = ""; for (var k = 0; k < 10; k++) {
 srchRsltUrl = srchUrls[i][k];  if (srchRsltUrl != "")
 break; }

 var srchURLArr = srchRsltUrl.split('/');  var srchUrlHost = srchURLArr[2]; if (!srchUrlHost) {
 alert(srchRsltUrl + " " + "That was not a valid URL format."); return; }
 if (srchUrlHost.indexOf(':') < 0)
 srchUrlHost = srchUrlHost + ':80';   var bRemoteRA = true; var respText = "";  if ((localHost.length == srchUrlHost.length) && 
 ((localHost.toLowerCase()).indexOf(srchUrlHost.toLowerCase()) == 0))
 bRemoteRA = false; actionurl = origUrl; var tmpActionUrl = actionurl; var fldId = raElemId; var elemAction = fldId; if (bRemoteRA) {
 
 index = tmpActionUrl.indexOf('\/psc\/'); if (index > 0)
 actionurl = tmpActionUrl.replace('\/psc\/', '\/psp\/');  var remotePortalName = srchURLArr[5];  if (portalName)
 tmpActionUrl = actionurl.replace(portalName, remotePortalName); else
 tmpActionUrl = actionurl.concat(remotePortalName + '\/');  var remoteNodeName = srchURLArr[6];   if (localNodeName)
 actionurl = tmpActionUrl.replace('\/' + localNodeName + '\/', '\/' + remoteNodeName + '\/'); else {
 actionurl = tmpActionUrl.concat(remoteNodeName + '\/c\/PORTAL_ADMIN.PTSF_GLOBAL_SEARCH.GBL'); }
 
 
 tmpActionUrl = actionurl.concat('?cmd=smartnav'); actionurl = tmpActionUrl.concat('&ICAction=' + fldId);  var nTmp = 1; for (var j = 0; j < 10; j++) {
 var tmpUrl = srchUrls[i][j]; if ((!tmpUrl) || (tmpUrl == "") || (tmpUrl.length <= 0))
 continue; var tmpAction1 = "&GSrchRaUrl"; var tmpAction2 = tmpAction1.concat(nTmp.toString()); nTmp++; tmpAction1 = tmpAction2.concat('='); tmpAction2 = tmpAction1.concat(encodeURIComponent(tmpUrl)); tmpActionUrl = actionurl.concat(tmpAction2); actionurl = tmpActionUrl; }

 actionurl = tmpActionUrl.concat('&ICAJAX=1'); var xmlHttpReq = false;  var nContentServerIndex = i;  if (window.XMLHttpRequest) { 
 xmlHttpReq = new XMLHttpRequest(); } else if (window.ActiveXObject) { 
 xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP"); }
 xmlHttpReq.open('POST', actionurl, true); xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); xmlHttpReq.onreadystatechange = function() {
 if (xmlHttpReq.readyState == 4) {
 respText = xmlHttpReq.responseText; processRelatedActionsResponse(nContentServerIndex, respText, raElemId, bProcessGbl, currPage); }
 }
 xmlHttpReq.send(null);  } else { 
 tmpActionUrl = actionurl.concat('?ICAction=' + fldId); var nTmp = 1; for (var j = 0; j < 10; j++) {
 var tmpUrl = srchUrls[i][j]; if ((!tmpUrl) || (tmpUrl == ""))
 continue; var tmpAction1 = "&GSrchRaUrl"; var tmpAction2 = tmpAction1.concat(nTmp.toString()); nTmp++; tmpAction1 = tmpAction2.concat('='); tmpAction2 = tmpAction1.concat(encodeURIComponent(tmpUrl)); actionurl = tmpActionUrl.concat(tmpAction2); tmpActionUrl = actionurl; }
 actionurl = tmpActionUrl.concat('&ICAJAX=1');   var sLoader = new net2.ContentLoader(actionurl, null, null, "",
 function() {
 respText = this.req.responseText;  processRelatedActionsResponse(i, respText, raElemId, bProcessGbl, currPage); }, null, null, "application/x-www-form-urlencoded", 
 true, false, null, false, null); if (respText == "") {
 respText = sLoader.req.responseText; processRelatedActionsResponse(i, respText, raElemId, bProcessGbl, currPage); }
 }
 }
}

function getGblSrchPageNum(act) {
 if ((typeof act == 'undefined') || (act == 'None') || (act == '') || (act == null) || (act.length == 0)) {
 gSrchRsltPageNum = 1; return; }

 var srchPage = 'PTUS_PAGING_WRK_PTUS_PAGE_TAB'; var index = act.indexOf(srchPage); if (index != 0) {
 gSrchRsltPageNum = 1; return; }

 var numStr = act.substr(index + srchPage.length, act.length);  var tmpImgIndex = numStr.indexOf('IMG'); if (tmpImgIndex >= 0) {
 gSrchRsltPageNum = gSrchRsltPageNum + 1; return; } 

 var num = parseInt(numStr); if (num != NaN) {
 if (num == 1) {
 gSrchRsltPageNum = gSrchRsltPageNum - 1; } else {
 gSrchRsltPageNum = num - 1; var tmpElem = null; while (!tmpElem) {
 var nIndx = (gSrchRsltPageNum - 1) * 10; tmpElem = document.getElementById('srchRsltUrl$' + nIndx); if (!tmpElem) {
 gSrchRsltPageNum++; if (gSrchRsltPageNum > 5)
 break;  }
 } 
 }
 }
}

function getAllRelatedActions() {
 window.status = "Get Related Actions"; raFormatedString1 = ""; raFormatedString2 = ""; raFormatedString3 = ""; raFormatedString4 = ""; raFormatedString5 = ""; raFormatedString6 = ""; raFormatedString7 = ""; raFormatedString8 = ""; raFormatedString9 = ""; raFormatedString10 = ""; gSrchRaFldId = ""; try {
 getSrchRsltRelatedActions(); } catch (e) {
 alert(e.message); }
 window.status = "";}




function isWorkCenter() {
return top.document.getElementById('ptalPgltAreaFrame');}

function isWorkCenterDashboard(sUrl) {
var workcenterframe = top.document.getElementById('ptalPgltAreaFrame');if( typeof workcenterframe == 'undefined' || workcenterframe == null || typeof sUrl == 'undefined' || sUrl == null || sUrl.length == 0) return false;if((sUrl.indexOf('/h/?tab=') != -1) || (sUrl.indexOf('IScript_HPCompRemove?tab') != -1)) return true;return false;}

function isPIAUrl(sUrl) {
 if (typeof sUrl == 'undefined' || sUrl == null || sUrl.length == 0) return false; if (sUrl.indexOf('/psc/') == -1 ) return false; return true;}

function isPIAComponentUrl(sUrl) {
 if (typeof sUrl == 'undefined' || sUrl == null || sUrl.length == 0) return false; if (sUrl.indexOf('/psc/') != -1 && sUrl.indexOf('/c/') != -1) return true; return false;}

function isPIAHtmlTempalteTarget(sUrl, hostWin, topWin, form) {
 if (!isPIAUrl(sUrl)) return false; if (typeof form == 'undefined' || form == null) return false; if (typeof form.ICType == 'undefined') return false; if (typeof form.action != 'undefined' && form.action.indexOf('/psp/') != -1) return true; return false;}

function isPortalUrl(sUrl) {
 if (typeof sUrl == 'undefined' || sUrl == null || sUrl.length == 0) return false;  var pspIndex = sUrl.indexOf('/psp/'); if (pspIndex == -1 ) return false; else {
 var queryIndex = sUrl.indexOf('?'); if (queryIndex != -1 && queryIndex < pspIndex) return false; }
 return true;}

function isPortalHomagPageUrl(sUrl) {
 if (typeof sUrl == 'undefined' || sUrl == null || sUrl.length == 0) return false; if (sUrl.indexOf('/psp/') != -1 && sUrl.indexOf('/h/') != -1) return true; return false;}

function isInFrame(sUrl, hostWin, topWin) {
 if (hostWin != topWin && !isUrlFrmModal(sUrl, hostWin)) return true; return false;}

function isPIAPagelet(sUrl, hostWin, topWin, form) {
 if (!isPIAUrl(sUrl)) return false; if (typeof form == 'undefined' || form == null) return false; if (typeof form.ICFromPagelet == 'undefined' || form.ICFromPagelet.value != 'true') return false; return true;}

function isHostWinPIA(sUrl, hostWin) {
 return isPIAUrl(hostWin.location.href);}

function isHostWinPortal(sUrl, hostWin) {
 return isPortalUrl(hostWin.location.href);}

function getPortalName(sUrl) {
 var portalName = null; if (!isPIAUrl(sUrl) && !isPortalUrl(sUrl)) return null; var pos = sUrl.indexOf('/psp/'); if (pos == -1) pos = sUrl.indexOf('/psc/'); var sArr = sUrl.substring(pos, sUrl.length).split('/'); if (sArr.length > 3)
 portalName = sArr[3]; return portalName;}

function getNodeName(sUrl) {
 var nodeName = null; if (!isPIAUrl(sUrl) && !isPortalUrl(sUrl)) return null; var pos = sUrl.indexOf('/psp/'); if (pos == -1) pos = sUrl.indexOf('/psc/'); var sArr = sUrl.substring(pos, sUrl.length).split('/'); if (sArr.length > 3)
 nodeName = sArr[4]; return nodeName;}

function getPSHome(sUrl) {
 var psHome = null; if (!isPIAUrl(sUrl) && !isPortalUrl(sUrl)) return null; var pos = sUrl.indexOf('/psp/'); if (pos == -1) pos = sUrl.indexOf('/psc/'); var sTmp = sUrl.substring(pos, sUrl.length); var sArr = sTmp.split('/'); if (sArr.length > 3) {
 psHome = trimWindowsNumber(sArr[2]); }
 return psHome;}

function trimWindowsNumber(psSiteName) {
 var nameArray = psSiteName.split('_'); if (nameArray.length > 1) {
 var lastStr = nameArray[nameArray.length - 1]; if (!isNaN(lastStr)) {
 nameArray.pop(); return nameArray.join('_'); }
 }
 return psSiteName;}


function getPSHomeSuffix(sUrl) {
 var psHome = null; if (!isPIAUrl(sUrl) && !isPortalUrl(sUrl)) return null; var pos = sUrl.indexOf('/psp/'); if (pos == -1) pos = sUrl.indexOf('/psc/'); var sTmp = sUrl.substring(pos, sUrl.length); var sArr = sTmp.split('/'); var sArr2 = sArr[2].split('_'); if (sArr2.length > 1)
 return "_"+sArr2[sArr2.length - 1]; else
 return "";}
function getUrlHost(sUrl) {
 if (!isPIAUrl(sUrl) && !isPortalUrl(sUrl)) return ""; var pos = sUrl.indexOf('/psp/'); if (pos == -1) pos = sUrl.indexOf('/psc/'); if (pos == -1) return ""; var serverURI = sUrl.substring(0, pos); return serverURI;}

function isRemoteNode(sUrl, hostWin) {
 if (getUrlHost(sUrl) != getUrlHost(hostWin.location.href))
 return true; if (getPSHome(sUrl) != getPSHome(hostWin.location.href))
 return true; return false;}

function isUrlFrmModal(sUrl, hostWin) {
 if (typeof hostWin.modalID != 'undefined' && hostWin.modalID != null)
 return true; return false;}

function isRelativeUrl(sUrl) {
 if (sUrl.indexOf('http') == 0) return false; return true;}

function convToABSUrl(sUrl, sHostUrl, bCrossDomain, strCurrUrl) {
 if (!isRelativeUrl(sUrl)) return sUrl; if (bCrossDomain)
 var sHostURI = getUrlHost(strCurrUrl); else
 var sHostURI = getUrlHost(sHostUrl); var sReturnUrl = sHostURI + sUrl; return sReturnUrl;}

function convToHostURI(sUrl, hostWin) {
 if (!isRemoteNode(sUrl, hostWin) && isHostWinPortal(sUrl, hostWin)) {
 return sUrl.replace('/psc/', '/psp/')
 } 

 var sHostUrl = hostWin.location.href; if (isPortalUrl(sUrl) && getPortalName(sUrl) != getPortalName(sHostUrl))
 return sUrl; var sHostURI = getUrlHost(sHostUrl); var sHostPSHome = getPSHome(sHostUrl); var sPSHomeSuffix = getPSHomeSuffix(sUrl); var sHostPortalName = getPortalName(sHostUrl); var sNodeName = getNodeName(sUrl); var pos = sUrl.indexOf(sNodeName); var sReturnUrl = sHostURI + '/psp/' + sHostPSHome+sPSHomeSuffix + '/' + sHostPortalName + '/' + sUrl.substring(pos, sUrl.length); return sReturnUrl;}


function getContentNode(sUrl){
 if(sUrl.indexOf('&contentNode') != -1){
 var r = sUrl.match('&contentNode=([^&]*)'); if(r){
 return r[1]; } 
 }else{
 return null; }
}


function convToRemoteDashboardURL(sUrl,hostWin) {

 var sHostUrl = hostWin.location.href; if (isUrlFrmModal(sUrl, window))
 return sHostUrl; var sPortalHostNode = getNodeName(sHostUrl); var sContentHostNode = getNodeName(sUrl); if(sPortalHostNode != sContentHostNode)
 {
 if (sContentHostNode == hostWin.ptNav2Info.UniNavPortalNode)
 sUrl = String(sUrl).replace('\/'+sContentHostNode+'\/','\/'+sPortalHostNode+'\/'); }

 if (isPortalUrl(sUrl) && getPortalName(sUrl) != getPortalName(sHostUrl))
 return sUrl;   var sContentNode = getContentNode(sUrl); if(sContentNode != null){
 var sPortalNode = getNodeName(sUrl); sUrl = String(sUrl).replace('\/'+sPortalNode+'\/','\/'+sContentNode+'\/');  }
 

 var sHostURI = getUrlHost(sHostUrl); var sHostPSHome = getPSHome(sHostUrl); var sHostPortalName = getPortalName(sHostUrl); var sNodeName = getNodeName(sHostUrl); var UniNavPortalNode = hostWin.ptNav2Info.UniNavPortalNode;  var pos = sUrl.indexOf(sNodeName); sUrl = encodeURIComponent(sUrl); sUrl = sUrl + "&unifieddashboard=y"; var sReturnURL = sHostURI + '/psp/' + sHostPSHome + '/' + sHostPortalName + '/' + UniNavPortalNode +'/'+ 'h/?tab=REMOTEUNIFIEDDASHBOARD' + '&remotedburl=' + sUrl; return sReturnURL; }


function isRemoteDashboardURL(sUrl,hostWin) {
 var sHostUrl = hostWin.location.href;  var sContentNode = getContentNode(sUrl); if(sContentNode != null){
 var sPortalNode = getNodeName(sUrl); if(sContentNode != sPortalNode)
 return true; }
 
 var hptabname = ""; if (typeof sUrl == 'undefined' || sUrl.length == 0 || sUrl == null) return false; var res = document.cookie.match('(^|;)?' + "HPTabName" + '=([^;]*)(;|$)'); if (res)
 hptabname = res[2]; if (hptabname != "REMOTEUNIFIEDDASHBOARD")
 return false;  if (isUrlFrmModal(sUrl, window))
 return true; if (typeof hostWin.ptNav2Info == "undefined" || hostWin.ptNav2Info.UniNavRequest == "false")
 return false; if ((sUrl.indexOf('/psp/') != -1 && sUrl.indexOf('/h/') != -1 && sUrl.indexOf('&pslnkid') != -1 ))
 return true; else
 return false;}


function preProcessUrl(sUrl, hostWin, topWin, form) {

 sReturnUrl = sUrl;  if(isRemoteDashboardURL(sUrl,top)) {
 sReturnUrl = convToRemoteDashboardURL(sUrl,top); return sReturnUrl; }

 
 if ( isPortalUrl(sUrl) && !isPortalHomagPageUrl(sUrl) && !isRelativeUrl(sUrl)) {
 if(isHostWinPortal(sUrl, top)){
 sReturnUrl = convToHostURI(sUrl, top); return sReturnUrl; }
 } 
 
 
 if (isWorkCenter() || isModeless(modalID) || isPortalHomagPageUrl(sUrl) || !isPIAComponentUrl(sUrl))
 return sReturnUrl;  if (isPIAUrl(sUrl) && isInFrame(sUrl, hostWin, topWin) && isHostWinPIA(sUrl, hostWin))
 return sReturnUrl;  if (isPIAUrl(sUrl) && isUrlFrmModal(sUrl, hostWin) && isHostWinPIA(sUrl, getFirstParentWin()))
 return sReturnUrl;  if (!isInFrame(sUrl, hostWin, topWin) && (isPIAPagelet(sUrl, hostWin, topWin, form) || isPIAHtmlTempalteTarget(sUrl, hostWin, topWin, form))) {
 sReturnUrl = convToHostURI(sUrl, hostWin); return sReturnUrl; }

 
 if (isPIAUrl(sUrl) && isUrlFrmModal(sUrl, hostWin) && isHostWinPortal(sUrl, getFirstParentWin())) {
 sReturnUrl = convToHostURI(sUrl, getFirstParentWin()); return sReturnUrl; }

 
 if (isPortalUrl(sUrl) && isHostWinPortal(sUrl, top)) {
 sReturnUrl = convToHostURI(sUrl, top); return sReturnUrl; }
 return sReturnUrl;}

function DoUrl(sOrigURL, form) {
 var bWorkCenter = isWorkCenter(); var sURL = preProcessUrl(sOrigURL, window, top, form); if (isPortalUrl(sURL)) {
 this.closeModal(); top.location.href = sURL; }
 else {
 window.location.href = sURL; }
}


function DoPortalUrl(sUrl) {
 
 if ( isPortalUrl(sUrl) && !isPortalHomagPageUrl(sUrl) && !isRelativeUrl(sUrl)) {
 if(isHostWinPortal(sUrl, top)){
 sReturnUrl = convToHostURI(sUrl, top); return sReturnUrl; } else {
 return sUrl; }
 } else {
 return sUrl; }
}

function StayInFrame() {
 var url = window.location.href; if (url.indexOf("PTNUI_NAVBAR") > 0)
 return true; if (url.indexOf("PTPN_POPUP_WINDOW") > 0)
 return true; return false;}

function DoUrlNUI() {
 if (window != top && isPortalUrl(top.location.href) && !StayInFrame())
 top.location.href = window.location.href;}

function getCookieValue(cName) 
{

var s, e, rv = "", ac = document.cookie;if (ac.length > 0) 
 {
 s = ac.indexOf(cName + "="); if (s !== -1) 
 {
 s += cName.length + 1;  e = ac.indexOf(";",s); if (e === -1) 
 { 
 e = document.cookie.length; }
 rv = decodeURIComponent(ac.substring(s,e)); }
 }
 return rv;}

function getRawCookieValue(cName) 
{

var s, e, rv = "", ac = document.cookie;if (ac.length > 0) 
 {
 s = ac.indexOf(cName + "="); if (s !== -1) 
 {
 s += cName.length + 1;  e = ac.indexOf(";",s); if (e === -1) 
 { 
 e = document.cookie.length; }
 rv = ac.substring(s,e); }
 }
 return rv;}

function setCookie(name,value,expires,path,domain,secure) 
{
 document.cookie = name + "=" + value +
 ((expires) ? "; expires=" + expires.toGMTString() : "") +
 ((path) ? "; path=" + path : "") +
 ((domain) && (domain != window.location.hostname) ? "; domain=" + domain : "") +
 ((secure) ? "; secure" : "");}

function isModalPage(formName) {
 var sScriptIsModal = 'var bIsModal = false; if (typeof(bDoModal_' + formName + ') != "undefined") {bIsModal=bDoModal_' + formName + ';}';  var sScriptIsJsModal = 'var bIsJsModal = false; if (typeof(bJSModal_' + formName + ') != "undefined") {bIsJsModal=bJSModal_' + formName + ';}'; eval(sScriptIsModal); eval(sScriptIsJsModal); if (bIsModal || bIsJsModal) { return true; }
 return false;}




var bcUpdater = {

 
 
 
 
 
 
 
 
 
 
 

 
 breadCrumbHTML : "breadCrumbHTML",
 isMenuCrefNav : "isMenuCrefNav",
 isRCService : "isRCService",
 isGlobalSearch : "isGlobalSearch",
 searchText : "searchText",
 bcKeyList : "bcKeyList",

 advSearchLbl : "",
 ptdynnavbc : "ptdynnavbc",
 ptglbsearch : "ptglbsearch",
 sesCrefID : "sesCrefID",
 bSessStorageSupp : true, 

addNUIToBC : function () {

 var ptHist = getHistoryObject(); if (!ptHist || ptHist.size() === 0 || !ptHist.getCurrNUI()) { return; }

 
 if (typeof refererURL != 'undefined' && refererURL && refererURL.search("abnds") > -1 && !isFModeLayout()) { return; }

 var bcScroll; try {
 bcScroll = top.document.getElementById("pthbcUlScroll"); if (!bcScroll) { bcScroll = this.createBcList(); }
 
 
 
 if (top.document.querySelector("a[data-pt-nui-bc]")) {
 while (bcScroll.children.length > 2) { bcScroll.removeChild(bcScroll.children[0]); }
 }

 } catch(ex) { return; }

 var frag, crefId, url, crefLabel;   var createSep = function(append) {
 var bcSep = document.createElement("li"); var sClass = "pthnavhiearchysep " + (browserInfoObj2.isIE ? "pthbcdispinline" : "pthbcdispiblock"); bcSep.className = sClass; bcSep.setAttribute("role", "presentation"); bcSep.innerHTML = "&nbsp;"; if (append) {
 frag.appendChild(bcSep); } else {
 frag.insertBefore(bcSep,frag.firstChild); }
 };   var createBC = function() {
 
 var bcLi = document.createElement("li"); bcLi.id = "pthnavbccref_" + crefId; var sClass = "" + "pthnavbarcref " + (browserInfoObj2.isIE ? "pthbcdispinline " : "pthbcdispiblock ") + bcUpdater.ptdynnavbc; bcLi.className = sClass;  var bcAnc = document.createElement("a"); bcAnc.id = "pthnavbccrefanc_" + crefId; bcAnc.className = "ptntop"; bcAnc.href = url; bcAnc.setAttribute("role", "menuitem"); bcAnc.setAttribute("data-pt-nui-bc", crefLabel); bcAnc.innerHTML = crefLabel; ptEvent.add(bcAnc,"keydown",parent.pthNav.onKeyPressBC); ptEvent.add(bcAnc,"click",function(e) {
 ptHist.setFromBC(); try {
 parent.pthNav.onClickCref(e); } catch (ex) {}
 }
 );   var bcDiv = document.createElement("div"); bcDiv.className = "pthnavcrefimg"; bcDiv.innerHTML = "&nbsp;"; bcLi.appendChild(bcAnc);  bcLi.appendChild(bcDiv);  frag.appendChild(bcLi); }; frag = document.createDocumentFragment(); var h = ptHist.getCurrNUI();  crefId = h.pageName;  url = h.url;   url = setQsParams(url, genUserQsParams(h)); crefLabel = h.label; createBC();   createSep(false); bcScroll.insertBefore(frag,bcScroll.firstChild); this.setStoredData(this.breadCrumbHTML, bcScroll.innerHTML); },

 updateBreadCrumbs : function(theForm) {

 
 if (this.updateNonPiaBreadcrumbs()) {
 return; }

 
 if (this.updateAppBreadCrumbs()) {
 return; } 

 
 var storedMenuCref = this.getStoredData(this.isMenuCrefNav);  if (typeof storedMenuCref === "undefined" || storedMenuCref !== "N") {
 this.removeStoredData("pt_history_last_nui"); }

 var bcList = top.document.getElementById("pthbcUlScroll"); if (!this.doBcUpdate(bcList, theForm)) {
 if (parent.pthNav) { 
 bcListUpdate = top.document.getElementById("pthbcUlScroll"); var bcArray; if(browserInfoObj2.isIE && browserInfoObj2.version == 11 && bcListUpdate) {
 var tmpEle = parent.document.createElement('div');  tmpEle.innerHTML = bcListUpdate.innerHTML;  bcArray = ptUtil.getElemsByClass("pthnavbarcref", tmpEle, "li");  } else {
 bcArray = ptUtil.getElemsByClass("pthnavbarcref", bcListUpdate, "li");  } 
 var curBcId = ""; for (i = 0; i < bcArray.length; i++) {
 
 
 if ((bcArray[i].id.indexOf("pthnavbccref") > -1) && (bcArray[i].className.indexOf("ptfakercfbc") < 0)) {
 curBcId = bcArray[i].id; }
 }
 if (parent.ptNav2Info && !parent.pthNav.portalObjName) {
 parent.ptNav2Info.selectedId = curBcId;  parent.pthNav.setPortalObjName(); }
 parent.pthNav.abn.search.resultsPromptCheck();  this.addNUIToBC(); } 
 return; }

 
 bcList = top.document.getElementById("pthbcUlScroll");  if (bcList != null) {
 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); }
 else {
 bcList = this.createBcList(); } 

 if (bcList) 
 {
 if (this.getStoredData(this.isGlobalSearch) == null) {
 if (this.removeBcElements(bcList, szCrefID)) 
 return; }

 this.appendBcElement(bcList, szCrefID, szCrefLabel); this.addNUIToBC(); }

 },

 
 updateNonPiaBreadcrumbs : function() {

 try {

 if (typeof top.pthNav == 'undefined' || !top.pthNav)
 return false;  var backCookie = backNavigation.getCookieValue(), bcList = top.document.querySelector("#pthbcUlScroll"); if (!backCookie || backNavigation.isPiaCookie(backCookie) || typeof bcList == 'undefined' || !bcList) { return false; }

 
 while (bcList.children.length > 2) { bcList.removeChild(bcList.children[0]); }

 
 var frag = document.createDocumentFragment(); frag = this.createBC(frag, backCookie.url, backNavigation.crefId, backCookie.label, function(e){backNavigation.expireNonPiaCref(e);}, backNavigation.nonPiaClass); frag = this.createSep(frag, false); bcList.insertBefore(frag, bcList.firstChild);  ptUtil.addClass(bcList.lastElementChild, this.ptdynnavbc);   this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); return true; } catch(e) {
 this.ErrorMessage(e, "updateNonPiaBreadcrumbs"); }

 },

 
 updateAppBreadCrumbs : function() {

 try {
 
 
 
 
 

 if (typeof top.pthNav == 'undefined' || !top.pthNav)
 return false; top.pthNav.bAppBcUpdate = false; var eAppBreadCrumbContainer = document.getElementById("pthnavappbc"); if (typeof szAppBC != 'undefined' && szAppBC) {
 
 if (typeof eAppBreadCrumbContainer != 'undefined' && eAppBreadCrumbContainer) {
 
 eAppBreadCrumbContainer.innerHTML = szAppBC; }
 else {
 
 var oBody = document.body; eAppBreadCrumbContainer = document.createElement("div"); eAppBreadCrumbContainer.setAttribute("id", "pthnavappbc"); if (browserInfoObj2.isIE)
 eAppBreadCrumbContainer.style.setAttribute('cssText',"display:none"); else
 eAppBreadCrumbContainer.setAttribute('style',"display:none"); eAppBreadCrumbContainer.innerHTML = szAppBC; oBody.appendChild(eAppBreadCrumbContainer); }
 }
 
 
 if (typeof eAppBreadCrumbContainer == 'undefined' || !eAppBreadCrumbContainer || eAppBreadCrumbContainer.children.length <= 0) {
 return false; }

 
 var eSep = eAppBreadCrumbContainer.removeChild(eAppBreadCrumbContainer.children[0]); var eAppBreadCrumb = eAppBreadCrumbContainer.removeChild(eAppBreadCrumbContainer.children[0]); eAppBreadCrumbContainer.parentNode.removeChild(eAppBreadCrumbContainer);  var storedMenuCref = this.getStoredData(this.isMenuCrefNav);  if (typeof storedMenuCref !== "undefined" && storedMenuCref == "T")
 this.setStoredData(this.isMenuCrefNav, "F");  var isDashBoard = document.getElementById("remotedashboard"); if (typeof isDashBoard != 'undefined' && isDashBoard != null)
 return false;  var szHref = strCurrUrl; if (szHref.indexOf("?") > -1)
 szHref += "&"; else
 szHref += "?"; szHref += "IsFolder=false"; if (eAppBreadCrumb.children[10].innerHTML != "UnknownValue") {
 szHref += "&"; szHref += eAppBreadCrumb.children[10].innerHTML;  }
 eAppBreadCrumb.children[0].href = szHref;  var bcList = top.document.getElementById("pthbcUlScroll"); if (bcList != null) {
 if (typeof this.getStoredData(this.breadCrumbHTML) != 'undefined' && this.getStoredData(this.breadCrumbHTML))
 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); else
 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML);  var eDupBC = top.document.getElementById(eAppBreadCrumb.id);  var szContentId = eAppBreadCrumb.children[5].innerHTML; if (typeof eDupBC == 'undefined' || !eDupBC) {
 var nNextBC = 2; var eBcElement = bcList.children[bcList.children.length - 1]; while (ptUtil.isClassMember(eBcElement, "pthnavbarcref")) {
 if (eBcElement.children[0].href.search(szContentId) > -1) {
 eDupBC = eBcElement; break; }
 else 
 {
 eBcElement = bcList.children[bcList.children.length - 1 - nNextBC]; nNextBC += 2; }
 }
 }

 
 if (typeof eDupBC != 'undefined' && eDupBC) {
 while (eDupBC.nextSibling) {
 bcList.removeChild(eDupBC.nextSibling); }
 
 bcList.removeChild(eDupBC);  bcList.removeChild(bcList.children[bcList.children.length - 1]);  this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); }

 
 this.setStoredData(this.breadCrumbHTML, this.getStoredData(this.breadCrumbHTML) + eSep.outerHTML + eAppBreadCrumb.outerHTML); bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); parent.pthNav.addBreadcrumbEvents(); this.addBcCrefEvents(bcList); }
 else {
 return false; }

 this.removeStoredData(this.isRCService); top.pthNav.bAppBcUpdate = true;   return true;  }
 catch (e) {
 this.ErrorMessage(e, "updateAppBreadCrumbs"); }
 
 },
 
 
 
 storeBcDomData : function() {
 
 
 
 
 try {
 var el = document.getElementById("ICBcDomData"); if (typeof el != 'undefined' && el) {
 el.value = "";  var bcList = top.document.getElementById("pthbcUlScroll"); if (typeof bcList != 'undefined' && bcList) {
  
 if(browserInfoObj2.isIE && browserInfoObj2.version == 11) { 
  var tmpEle = top.document.createElement('div'); tmpEle.innerHTML = bcList.innerHTML; bcList = tmpEle; }
 var nIdx = bcList.children.length - 1; var eBcElement = bcList.children[nIdx];   var szSep = "*"; var szUnknownValue = "UnknownValue"; while (ptUtil.isClassMember(eBcElement, "pthnavbarcref") || ptUtil.isClassMember(eBcElement, "pthnavbarfldr")) {
 var szUrlParts1 = eBcElement.children[0].href.split("/"); var szUrlParts2 = eBcElement.children[0].href.split("?");  if (nIdx < bcList.children.length - 1)
 el.value += szSep;    if (ptUtil.isClassMember(eBcElement, "ptappbc")) {
 this.genBcElementData(el, "C", eBcElement.children[2].innerHTML, eBcElement.children[3].innerHTML, 
 eBcElement.children[4].innerHTML, eBcElement.children[5].innerHTML, eBcElement.children[6].innerHTML, 
 eBcElement.children[7].innerHTML, eBcElement.children[8].innerHTML, eBcElement.children[9].innerHTML,
 szUrlParts2[0], eBcElement.children[10].innerHTML);  }
 
 else if (ptUtil.isClassMember(eBcElement, backNavigation.nonPiaClass)) {
 var qsParts0 = szUnknownValue;  if (typeof szQsParts != 'undefined' && szQsParts) { qsParts0 = szQsParts[0]; }
 this.genBcElementData(el, "C", eBcElement.id.substring(13), szUnknownValue, 
 szUnknownValue, qsParts0, szUnknownValue, eBcElement.children[0].innerHTML, 
 szUnknownValue, szUnknownValue, szUrlParts2[0], szUnknownValue);  } 
 
 else if (ptUtil.isClassMember(eBcElement, "pthnavbarcref")) {
 var szQsParts = szUrlParts1[8].split("?"); this.genBcElementData(el, "C", eBcElement.id.substring(13), szUrlParts1[5], 
 szUrlParts1[6], szQsParts[0], szUnknownValue, eBcElement.children[0].innerHTML, 
 szUnknownValue, szUnknownValue, szUrlParts2[0], szUnknownValue); }
 
 else {
 this.genBcElementData(el, "F", eBcElement.id.substring(9), szUrlParts1[5], 
 szUrlParts1[6], szUnknownValue, szUnknownValue, eBcElement.children[0].innerHTML, 
 szUnknownValue, szUnknownValue, eBcElement.children[0].href, szUnknownValue); }
 
 nIdx -= 2; eBcElement = bcList.children[nIdx]; }
 
 }
 else
 el.value = szUnknownValue;  } 
 
 
 
 } 
 catch (e) {
 this.ErrorMessage(e, "storeBcDomData"); }
 
 },


 
 genBcElementData : function(el, szBcElementType, szBcElementId, szPortalId, szNodeId, szContentId, szPageId, szLabel, szMode, szKeys, szUrl, szQs) {

 
 

 try {
 var szSep = "~"; el.value += szBcElementType; el.value += szSep; el.value += szBcElementId; el.value += szSep; el.value += szPortalId; el.value += szSep; el.value += szNodeId; el.value += szSep; el.value += szContentId; el.value += szSep; el.value += szPageId; el.value += szSep; el.value += szLabel; el.value += szSep; el.value += szMode; el.value += szSep; el.value += szKeys; el.value += szSep; el.value += szUrl; el.value += szSep; el.value += szQs; } 
 catch (e) {
 this.ErrorMessage(e, "genBcElementData"); }

 },
 

 doBcUpdate : function(bcList, theForm) {

 try {
 
 
 if (typeof(top.pthNav) == "undefined" || 
 typeof(parent.pthNav) == "undefined" ||
 typeof(strCurrUrl) == "undefined" || 
 !this.isSessionStorageSupported() ||
 (typeof(theForm) === "undefined") || !theForm) {
 return false; } 

 if (parent.pthNav.isHomepage) {
 return false; } 

 
 if (typeof bMenuSrchPage != 'undefined' && bMenuSrchPage) {
 this.setStoredData(this.isGlobalSearch, "BASIC"); this.setStoredData(this.searchText, szMenuSrchText); }
 
 
 if (typeof(strCurrUrl) != "undefined" && strCurrUrl.indexOf("ICAction=ICViewWorklist") > -1) {
 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); return false; }

 
 if (typeof this.getStoredData(this.isGlobalSearch) != null && this.getStoredData(this.isGlobalSearch) == "REFINESEARCH") {
 if (bcList == null || typeof bcList == "undefined") {
 
 bcList = this.createBcList(); }

 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); if ((bcList.children != null || typeof bcList.children != "undefined") && bcList.children.length > 2) {
 
 for (var j = bcList.children.length; j > 2; j--) {
 bcList.removeChild(bcList.lastChild); }
 }

 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); this.cleanGlobalSearchParams(); return false; }

 
 if (this.getStoredData(this.isGlobalSearch) != null) {
 this.setStoredData(this.sesCrefID, szCrefID); return true; } 

 
 if (typeof theForm.children[1] != "undefined" && theForm.children[1] &&
 typeof(theForm.children[1].firstChild) != "undefined" && theForm.children[1].firstChild &&
 theForm.children[1].firstChild.nodeName == "#text") {
 return false; }

 
 var sScriptIsModal = 'var bIsModal = false; if (typeof(bDoModal_' + theForm.name + ') != "undefined") {bIsModal=bDoModal_' + theForm.name + ';}'
 eval(sScriptIsModal); var sScriptIsJsModal = 'var bIsJsModal = false; if (typeof(bJSModal_' + theForm.name + ') != "undefined") {bIsJsModal=bJSModal_' + theForm.name + ';}'
 eval(sScriptIsJsModal); if (bIsModal || bIsJsModal) {
 return false; }

 
 var abnContainer = document.getElementById("ptabncontainer"); if (abnContainer) { 
 return false; }

 
 
 
 
 
 var ptalPgltAreaContainer = isWorkCenter(); var bWorkCenterUpdate = !(typeof nCrefBcUpdateType != 'undefined' && nCrefBcUpdateType == 2); if (ptalPgltAreaContainer && bWorkCenterUpdate) {
 return false; }

 
 if (typeof szCrefSesSrchTxt != "undefined" && szCrefSesSrchTxt != null && 
 typeof szCrefSesID != "undefined" && szCrefSesID != null && (!bcList || bcList.children.length < 1)) {

 
 if (!bcList) {
 bcList = this.createBcList(); }
 
 
 this.setStoredData(this.isGlobalSearch, "BASIC"); this.setStoredData(this.searchText, szCrefSesSrchTxt); this.appendBcElement(bcList, szCrefSesID, szCrefSesSrchTxt); bcList = top.document.getElementById("pthbcUlScroll");  if (this.getStoredData(this.isRCService) != null && this.getStoredData(this.isRCService) == "T") {
 this.removeStoredData(this.isRCService); return false; }

 }

 
 if (this.getStoredData(this.isRCService) != null && this.getStoredData(this.isRCService) == "T") {
 this.removeStoredData(this.isRCService); return false; }

 if (bcList == null) 
 return false;   var isDashBoard = document.getElementById("remotedashboard"); if (isDashBoard != null) {
 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); this.removeStoredData(this.isMenuCrefNav); return false; }
 
 var storedMenuCref = this.getStoredData(this.isMenuCrefNav);      if (typeof storedMenuCref !== "undefined" && storedMenuCref == "T") {
 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); this.setStoredData(this.isMenuCrefNav,"F"); return false; }

 
 if (typeof storedMenuCref !== "undefined" && storedMenuCref === "N") {
 this.removeStoredData(this.isMenuCrefNav);  var sHTML = this.getStoredData(bcUpdater.breadCrumbHTML); if (sHTML && sHTML !== "" && /ptndbrd/.test(sHTML)) {
 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); } else {
 this.setStoredData(this.breadCrumbHTML, "&nbsp;"); }
 return true; }

 
 if ((typeof storedMenuCref == 'undefined' || storedMenuCref == null) && bcList.innerHTML == "&nbsp;") {
 top.pthNav.isMenuCrefNav = "F"; }

 if ((typeof storedMenuCref == "undefined") || (storedMenuCref == null)) {
 
 if (top.pthNav.isMenuCrefNav == "T") {
 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); top.pthNav.isMenuCrefNav = "F"; return false; }
 }

 
 if (typeof nCrefBcUpdateType != 'undefined' && nCrefBcUpdateType == 0) {
 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); return false; }

 
 if (bIncInNavigation == "F") {
 if (typeof nCrefBcUpdateType == 'undefined' ||
 (typeof nCrefBcUpdateType != 'undefined' && nCrefBcUpdateType != 3)) {

 if (typeof this.getStoredData(this.breadCrumbHTML) !== "undefined") { 
 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); }

 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); return false; }
 }

 
 if (typeof bCrefCFAN != "undefined" && bCrefCFAN && bCrefCFAN == 1) {
 return false; }

 
 
 if (typeof this.getStoredData(this.breadCrumbHTML) == "undefined" || !this.getStoredData(this.breadCrumbHTML)) {
 if (typeof bcList != "undefined" && bcList) {
 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); }
 return false; }

 
 
 
 bcList = bcUpdater.replaceBreadCrumb(bcList, bcUpdater.getStoredData(bcUpdater.breadCrumbHTML)); if (typeof(bcList) != "undefined" && typeof(bcList.children) != "undefined" &&
 typeof(bcList.children[bcList.children.length - 1]) != "undefined" &&
 typeof(bcList.children[bcList.children.length - 1].children[0]) != "undefined" &&
 !ptUtil.isClassMember(bcList.children[bcList.children.length - 1], this.ptglbsearch)) {
 var strMatchUrl = strCurrUrl.split("?"); var strLastBcHref = bcList.children[bcList.children.length - 1].children[0].href;   if (ptUtil.isClassMember(bcList.children[bcList.children.length - 1],"ptfakercfbc")) {
 strMatchUrl[0] = strMatchUrl[0].replace(/psp/i, "psc"); } 

 if (document.getElementById("ICElementNum") != null) {
 var elemNum = document.getElementById("ICElementNum").value;  bcList = this.updateBCListState(elemNum, bcList); this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); }

 var strMatchUrlLocHref = null; if (typeof window.location.href && window.location.href) {strMatchUrlLocHref = window.location.href.split("?"); }
 if (strLastBcHref.search(strMatchUrl[0]) > -1 ||
 (strMatchUrlLocHref && strLastBcHref.search(strMatchUrlLocHref[0]) > -1) ||
 bcList.children[bcList.children.length - 1].id.search(szCrefID) > -1) {
 return false; }

 }

 if (this.getStoredData(this.isGlobalSearch) == null) {
 if (szCrefReged == "F") {
 
 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); return false; }

 if (szCrefVisible == "F") {
 
 if (typeof nCrefBcUpdateType == 'undefined' ||
 (typeof nCrefBcUpdateType != 'undefined' && nCrefBcUpdateType != 3)) {
 
 bcList = this.replaceBreadCrumb(bcList, this.getStoredData(this.breadCrumbHTML)); this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); return false; } 
 }
 }
 
 return true; }
 catch (e) {
 this.ErrorMessage(e, "doBcUpdate"); }

 },
 
 updateBCListState : function(elemNum, currBC){
 
 var newHref = ""; var currSite; var winNumURI = ""; var newWinNumURI = ""; for (var i=0; i < currBC.children.length; i++) { 
 if (ptUtil.isClassMember(currBC.children[i], "pthnavbarcref")){
 currSite = bcUpdater.getSiteName(currBC.children[i].firstChild.href).split("_");  winNumURI = "/" + currSite.toString().replace(",", "_") + "/"; newWinNumURI = (elemNum == 0) ? ("/" + currSite[0] + "/") : ("/" + currSite[0] + "_" + elemNum + "/"); if (winNumURI != newWinNumURI) {
 newHref = currBC.children[i].firstChild.href; newHref = newHref.replace(winNumURI, newWinNumURI); currBC.children[i].firstChild.href =newHref; }
 }
 } 
 return currBC; },

 getSiteName : function (crefURL) {
 var strURI = crefURL.match(/\/ps(c|p)\/([^\/]*)?\/?([^\/]*)?\/?([^\/]*)?\//)[0]; var uriParts = strURI.split("/"); return uriParts[2]; },


 setBcListWidth : function(node) {
 var eNavContainer = top.document.getElementById("pthnavcontainer"); var ePortalRootObj = top.document.getElementById("pthnavbc_PORTAL_ROOT_OBJECT"); var npthbcScrollWidth = 500; if (eNavContainer && typeof eNavContainer != 'undefined' &&
 ePortalRootObj && typeof ePortalRootObj != 'undefined') {
 if('ltr'=='ltr') {
 npthbcScrollWidth = eNavContainer.clientWidth - (ePortalRootObj.offsetLeft + ePortalRootObj.clientWidth + 49); }
 else {
 npthbcScrollWidth = eNavContainer.clientWidth - (eNavContainer.clientWidth - ePortalRootObj.offsetLeft + 49 ); }
 }
 
 eNavContainer = null; ePortalRootObj = null;  if (browserInfoObj2.isIE) {
 try {
 
 
 
 node.style.setAttribute('cssText',"width: " + npthbcScrollWidth + "px;"); }
 catch (e) {
 }
 }
 else {
 node.setAttribute('style',"width: " + npthbcScrollWidth + "px;"); }
 },

 
 createSep : function(frag, append) {

 var bcSep = document.createElement("li"); var sClass = "pthnavhiearchysep " + (browserInfoObj2.isIE ? "pthbcdispinline" : "pthbcdispiblock"); bcSep.className = sClass; bcSep.setAttribute("role", "presentation"); bcSep.innerHTML = "&nbsp;"; if (append) {
 frag.appendChild(bcSep); } else {
 frag.insertBefore(bcSep,frag.firstChild); }

 return frag; },

 
 createBC : function(frag, url, id, label, eventHandler, classId) {

 
 var bcLi = document.createElement("li"); bcLi.id = "pthnavbccref_" + id; var sClass; if (typeof refererURL != 'undefined' && refererURL && refererURL.search("abnds") > -1 && !isFModeLayout()) {
 sClass = classId;  } 
 else {
 sClass = "" + "pthnavbarcref " + (browserInfoObj2.isIE ? "pthbcdispinline " : "pthbcdispiblock ") + bcUpdater.ptdynnavbc; if (typeof classId != 'undefined' && classId) { sClass += " " + classId; }
 }

 bcLi.className = sClass;  var bcAnc = document.createElement("a"); bcAnc.id = "pthnavbccrefanc_" + id; bcAnc.className = "ptntop"; bcAnc.href = url; bcAnc.setAttribute("role", "menuitem"); bcAnc.setAttribute("data-pt-nui-bc", label); bcAnc.innerHTML = label; if (typeof eventHandler != 'undefined' && eventHandler) {
 ptEvent.add(bcAnc,"keydown", eventHandler); ptEvent.add(bcAnc,"click", eventHandler); }

 
 var bcDiv = document.createElement("div"); bcDiv.className = "pthnavcrefimg"; bcDiv.innerHTML = "&nbsp;"; bcLi.appendChild(bcAnc);  bcLi.appendChild(bcDiv);  frag.appendChild(bcLi); return frag;  },

 createBcList : function() {

 
 

 
 

 try {
 
 var divBcScroll = document.createElement('div'); divBcScroll.setAttribute('id',"pthbcScroll"); divBcScroll.setAttribute('class',"pthbcscroll");  this.setBcListWidth(divBcScroll);   divBcScroll.innerHTML = "<ul id=\"pthbcUlScroll\" dir=\"ltr\"></ul>"; var prntElement = top.document.getElementById("pthnavbc"); var siblingElement = top.document.getElementById("pthbcScrollNext"); if (prntElement)
 prntElement.insertBefore(divBcScroll, siblingElement); bcList = top.document.getElementById("pthbcUlScroll"); return bcList; }
 catch (e) {
 this.ErrorMessage(e, "createBcList"); }
 
 },

 removeBcElements : function(bcList, crefId) {

 
 
 

 try {
 
 if (typeof bcList == "undefined" || bcList == null) {
 return; } 
 
 var theBC = top.document.getElementById("pthnavbccref_" + crefId);  if (typeof theBC == 'undefined' || theBC == null) {

 if (typeof strCurrUrl != "undfined" && strCurrUrl) {
 var szCmpUrl = strCurrUrl.split("?"); }
 else {
 return; }

 var bcListLength = bcList.children.length; for (var nIdx = 0; nIdx < bcListLength; nIdx++) {
 if (typeof bcList.children[nIdx] != "undefined" && bcList.children[nIdx] && 
 ptUtil.isClassMember(bcList.children[nIdx], "pthnavbarcref") && !ptUtil.isClassMember(bcList.children[nIdx], "ptglbsearch")) {
 if (typeof bcList.children[nIdx].children[0] != "undefined" && bcList.children[nIdx].children[0]) {
 var szBcUrl = bcList.children[nIdx].children[0].href.split("?");  if (szCmpUrl[0] == szBcUrl[0]) {
 theBC = bcList.children[nIdx]; crefId = theBC.id.substring(13);  break; }
 }
 }
 }
 }
 
 if (typeof theBC != 'undefined' && theBC != null) {
 var theLastBc = bcList.lastChild; while (theLastBc.id != ("pthnavbccref_" + crefId)) {
 bcList.removeChild(theLastBc); theLastBc = bcList.lastChild; }

 
 
 
 
 if (ptUtil.isClassMember(theBC, this.ptdynnavbc) && 
 ((typeof nCrefBcUpdateDNRK != 'undefined' && nCrefBcUpdateDNRK && nCrefBcUpdateDNRK != 1) || (typeof nCrefBcUpdateDNRK == 'undefined' || !nCrefBcUpdateDNRK))) {
 var urlParts = theBC.firstChild.href.split("?"); theBC.firstChild.href = urlParts[0]; if (typeof szCrefQS != 'undefined' && szCrefQS != null) {
 
 theBC.firstChild.href += "?"; theBC.firstChild.href += szCrefQS; theBC.firstChild.href += "&IsFolder=false"; }
 else {
 theBC.firstChild.href += "?IsFolder=false"; }

 
 
 this.storeKeyList(); }

 
 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML);   this.cleanGlobalSearchParams();  parent.pthNav.addBreadcrumbEvents(); this.addBcCrefEvents(bcList);   if (parent.pthNav.abn.search.searchEnabled && (parent.pthNav.portalObjName != parent.pthNav.getPortalObjName(theBC.id))) {
 parent.pthNav.setPortalObjName(theBC.id);   if (!parent.pthNav.isHomepage) {
 
 var bcLiEl = top.document.getElementById(parent.pthNav.bcCrefPrefix + parent.pthNav.portalObjName); if (bcLiEl) {
 var bcList = top.document.getElementById("pthbcUlScroll"); var bcChild = ""; var promptArray = new Array(); if (bcList && bcList.childNodes.length > 0) {
 for (var i=0; i < bcList.childNodes.length; i++){ 
 bcChild = parent.pthNav.abn.search.getLastChild(bcList.childNodes[i]); if (bcChild != null && bcChild.id.indexOf("ptabnsp_") > -1) {
 promptArray.push(bcChild); }
 } 
 }
 if (promptArray.length > 1) {
 promptArray[0].parentNode.removeChild(promptArray[0]);  }
 }
 }
 }
 




 
 if (parent.pthNav)
 parent.pthNav.abn.search.resultsPromptCheck();  return true; }

 return false; }
 catch (e) {
 this.ErrorMessage(e, "removeBcElements"); }
 
 },

 appendBcElement : function(bcList, crefId, crefLabel) {

 
 

 try {
 
 if (isWorkCenter()) {
 
 
 
 
 return; } 

 
 var bcLI; if (browserInfoObj2.isIE) 
 bcLI = "<li class=\"pthnavhiearchysep pthbcdispinline\" role=\"presentation\">&nbsp;</li>"; else
 bcLI = "<li class=\"pthnavhiearchysep pthbcdispiblock\" role=\"presentation\">&nbsp;</li>";  bcLI += "<li id=\"pthnavbccref_";  bcLI += crefId; bcLI += "\"";  bcLI += "class=\""; if (browserInfoObj2.isIE) 
 bcLI += "pthnavbarcref pthbcdispinline"; else
 bcLI += "pthnavbarcref pthbcdispiblock"; if (this.getStoredData(this.isGlobalSearch) != null) {
 
 bcLI += " " + this.ptglbsearch; }
 else {
 
 bcLI += " " + this.ptdynnavbc; }

 bcLI += "\">";  var bcAncId = "id=\"" + "pthnavbccrefanc_" + crefId + "\"";  bcLI += "<a class=\"ptntop\"" + bcAncId + "role=\"menuitem\" href=\""; if (this.getStoredData(this.isGlobalSearch) != null) {
 if (typeof bMenuSrchPage != 'undefined' && bMenuSrchPage) {
 
 
 bcLI += "#\">";  }
 else {
 bcLI += "#\">"; }
 }
 else {
 var strBcURL; var newStrCurrURL = strCurrUrl; if (document.getElementById("ICElementNum") != null) {
 
 var elemNum = document.getElementById("ICElementNum").value; var currSite = bcUpdater.getSiteName(newStrCurrURL).split("_");  var winNumURI = "/" + currSite.toString().replace(",", "_") + "/"; var newWinNumURI = (elemNum == 0) ? ("/" + currSite[0] + "/") : ("/" + currSite[0] + "_" + elemNum + "/"); if (winNumURI != newWinNumURI) {
 
 newStrCurrURL = newStrCurrURL.replace(winNumURI, newWinNumURI); }
 }
 if (typeof szCrefQS != 'undefined' && szCrefQS != null) {
 
 if (newStrCurrURL.indexOf("?") > -1) {
 
 
 var strUrlParts = newStrCurrURL.split("?"); strBcURL = strUrlParts[0]; strBcURL += "?"; strBcURL += szCrefQS; strBcURL += "&"; strBcURL += strUrlParts[1]; strBcURL += "&"; }
 else {
 
 
 strBcURL = newStrCurrURL; strBcURL += "?"; strBcURL += szCrefQS; strBcURL += "&"; }
 }
 else {
 
 if (newStrCurrURL.indexOf("?") > -1) {
 strBcURL = newStrCurrURL; strBcURL += "&"; }
 else {
 strBcURL = newStrCurrURL; strBcURL += "?"; }
 }

 strBcURL += "IsFolder=false"; bcLI += strBcURL; bcLI += "\">";  }

 
 var eLabel = "Label Not Found", isAdvSearch = false; if (this.getStoredData(this.isGlobalSearch) == null) {
 if (typeof szCrefBcUpdateLabel != 'undefined') {
 
 eLabel = szCrefBcUpdateLabel; }
 else {
 eLabel = crefLabel; }
 }
 else { 
 if (this.getStoredData(this.isGlobalSearch) == "BASIC" || this.getStoredData(this.isGlobalSearch) == "SEARCHAGAIN") {

 

 if (this.getStoredData(this.searchText) == "-999999-" ||
 this.getStoredData(this.searchText) == "") { 
 eLabel = "\"...\""; }
 else {
 
 eLabel = "\"" + this.encodeString(this.snipLabel(this.getStoredData(this.searchText))) + "\"";  }
 }
 else { 
 eLabel = "\"...\""; isAdvSearch = true; }
 }

 bcLI += eLabel; bcLI += "</a>"; bcLI += "<div class=\"pthnavcrefimg\">&nbsp;</div></li>";  if (typeof nCrefBcUpdateType != 'undefined' && nCrefBcUpdateType == 1) {
 
 
 
 var bRemove = true; while (bRemove) {
 if (ptUtil.isClassMember(bcList.lastChild, "pthnavhiearchysep")) {
 bRemove = false; }
 bcList.removeChild(bcList.lastChild); }
 }
 
 
 
 this.removePersistedSrch(bcList);  if (this.getStoredData(this.isGlobalSearch) != null) {
 
 bcList = this.replaceBreadCrumb(bcList, bcLI); }
 else {
 
 this.appendKeyListToBcUrl(bcList); this.appendBreadCrumb(bcList, bcLI); }

 
 parent.pthNav.addBreadcrumbEvents(); this.addBcCrefEvents(bcList);  var theBC = top.document.getElementById("pthnavbccref_" + crefId); if (parent.pthNav.abn.search.searchEnabled && (parent.pthNav.portalObjName != parent.pthNav.getPortalObjName(theBC.id))) {
 parent.pthNav.setPortalObjName(theBC.id);   if (!parent.pthNav.isHomepage) {
 
 var bcLiEl = top.document.getElementById(parent.pthNav.bcCrefPrefix + parent.pthNav.portalObjName); if (bcLiEl) {
 var bcList = top.document.getElementById("pthbcUlScroll"); var bcChild = ""; var promptArray = new Array(); if (bcList && bcList.childNodes.length > 0) {
 for (var i=0; i < bcList.childNodes.length; i++){ 
 bcChild = parent.pthNav.abn.search.getLastChild(bcList.childNodes[i]); if (bcChild != null && bcChild.id.indexOf("ptabnsp_") > -1) {
 promptArray.push(bcChild); }
 } 
 }
 if (promptArray.length > 1) {
 promptArray[0].parentNode.removeChild(promptArray[0]);  }
 }
 }
 }


 
 if (parent.pthNav)
 parent.pthNav.abn.search.resultsPromptCheck();    if (isAdvSearch) { bcList.style.display = "none"; }

 
 this.setStoredData(this.breadCrumbHTML, bcList.innerHTML);  if (this.getStoredData(this.isGlobalSearch) != null && browserInfoObj2.isIE) {
 var bcScroll = top.document.getElementById("pthbcScroll"); if (typeof bcScroll.style.width != "unknown" && typeof bcScroll.style.width != "undefined") 
 bcScroll.style.width = "300px"; }
 
 
 this.cleanGlobalSearchParams(); }
 catch (e) {
 this.ErrorMessage(e, "appendBcElement"); }
 
 },

 addBcCrefEvents : function (bcList, bSetEvents) {

 

 try {
 if (!bcList) {
 return; }

 var bSetCrefEvnts = true; if (bSetEvents != null && typeof bSetEvents != "undefined") {
 bSetCrefEvnts = bSetEvents; }

 
 for (var i=0; i < bcList.children.length; i++) {
 
 if (bSetCrefEvnts && 
 ptUtil.isClassMember(bcList.children[i], "pthnavbarcref") &&
 !ptUtil.isClassMember(bcList.children[i], "ptglbsearch") && 
 !ptUtil.isClassMember(bcList.children[i], "ptfakercfbc")) {
 if (ptUtil.isClassMember(bcList.children[i], backNavigation.nonPiaClass)) {
 
 ptEvent.add(bcList.children[i].firstChild,"keydown", function(e){backNavigation.expireNonPiaCref(e);}); ptEvent.add(bcList.children[i].firstChild,"click", function(e){backNavigation.expireNonPiaCref(e);});  } else {
 ptEvent.add(bcList.children[i].firstChild,"keydown", parent.pthNav.onKeyPressBC); ptEvent.add(bcList.children[i].firstChild,"click", parent.pthNav.onClickCref); }
 }
 
 if (ptUtil.isClassMember(bcList.children[i], "ptglbsearch") &&
 typeof top.searchGbl != 'undefined' && top.searchGbl) {
 ptEvent.remove(bcList.children[i].firstChild, "keydown"); ptEvent.remove(bcList.children[i].firstChild, "click"); ptEvent.add(bcList.children[i].firstChild, "keydown", top.searchGbl.onKeyPress); ptEvent.add(bcList.children[i].firstChild,"click", top.searchGbl.onClickSrchAgain);  } 
 
 }
 }
 catch (e) {
 this.ErrorMessage(e, "addBcCrefEvents"); }
 
 },

 removePersistedSrch : function(bcList) {

 
 try {
 if (bcList == null || bcList.lastChild == null || bcList.lastChild.lastChild == null) {
 return; }

 if (ptUtil.isClassMember(bcList.lastChild.lastChild, "ptabnsrchpromptbc")) {
 bcList.lastChild.removeChild(bcList.lastChild.lastChild); }
 }
 catch (e) {
 this.ErrorMessage(e, "removePersistedSrch"); }
 
 },

 storeKeyList : function() {
 

 try {
 var sep = ""; var keyList = ""; this.removeStoredData(this.bcKeyList); if (typeof PIA_KEYSTRUCT != 'undefined') {
 for(var szKeyId in PIA_KEYSTRUCT) {
 if (typeof szKeyId != 'undefined') {

 keyList += sep;  keyList += szKeyId; keyList += "="; keyList += PIA_KEYSTRUCT[szKeyId]; sep = "&"; }
 }
 this.setStoredData(this.bcKeyList, keyList); }
 }
 catch (e) {
 this.ErrorMessage(e, "storeKeyList"); }
 
 },

 appendKeyListToBcUrl : function(bcList) {

 
 
 

 try {
 if (this.getStoredData(this.bcKeyList) == null) {
 return; }

 
 if (bcList.children.length > 0) {
 var eCurrentBC = bcList.children[bcList.children.length - 1].firstChild; }
 else {
 return; }
 
 if (!ptUtil.isClassMember(eCurrentBC.parentNode, this.ptdynnavbc)) {
 
 return; }

 if (eCurrentBC.href.indexOf("?") > -1) {
 eCurrentBC.href += "&";  }
 else {
 eCurrentBC.href += "?";  }
 eCurrentBC.href += this.getStoredData(this.bcKeyList); this.removeStoredData(this.bcKeyList); }
 catch (e) {
 this.ErrorMessage(e, "appendKeyListToBcUrl"); }
 
 },

 getAdvSrchLblFrmCriteria : function(name, form) {

 try {
 
 
 var eAdvSrchBtn = document.getElementById("PTUS_ADV_SRCH_PTUS_SRCH_BTN"); if (typeof eAdvSrchBtn == 'undefined' || !eAdvSrchBtn)
 return;    if (name != "PTUS_ADV_SRCH_PTUS_SRCH_BTN" &&
 name != "#KEY\r" && name != "#KEY\r\n" && name != "#KEY\n" &&
 name != "PTUS_ADV_SRCH_CLEAR_BUTTON") {
 return; }

 
 
 var isHidden = true, bcUlScroll; try {
 bcUlScroll = top.document.getElementById("pthbcUlScroll"); if (bcUlScroll && ptUtil.getCSSValue(bcUlScroll,"display") !== "none") { 
 isHidden = false;  }
 } catch (ex) {}
 
 var showBCList = function () {
 if (isHidden) { 
 try { 
 bcUlScroll.style.display = "block";  isHidden = false; } catch (ex) {} 
 } 
 };  if (name == "PTUS_ADV_SRCH_PTUS_SRCH_BTN" || name == "#KEY\r" || name == "#KEY\r\n" || name == "#KEY\n") {

 var sep = " | "; this.advSearchLbl = ""; if (form.PTUS_ADV_SRCH_PTUS_KEYWORDS.value != "") { 
 this.advSearchLbl += form.PTUS_ADV_SRCH_PTUS_KEYWORDS.value; showBCList(); }

 if (form.PTUS_ADV_SRCH_PTUS_EXACT_PHRASE.value != "") { 
 if (this.advSearchLbl != "") { this.advSearchLbl += sep; }
 this.advSearchLbl += form.PTUS_ADV_SRCH_PTUS_EXACT_PHRASE.value; showBCList(); }

 if (form.PTUS_ADV_SRCH_PTUS_ANY_WORDS.value != "") { 
 if (this.advSearchLbl != "") { this.advSearchLbl += sep; }
 this.advSearchLbl += form.PTUS_ADV_SRCH_PTUS_ANY_WORDS.value; showBCList(); }
 
 if (form.PTUS_ADV_SRCH_PTUS_EXCLUDE.value != "") { 
 if (this.advSearchLbl != "") { this.advSearchLbl += sep; }
 this.advSearchLbl += form.PTUS_ADV_SRCH_PTUS_EXCLUDE.value; showBCList(); }

 
 var advSearchTxt = this.snipLabel(this.advSearchLbl); this.advSearchLbl = this.encodeString(advSearchTxt); }
 else if (name == "PTUS_ADV_SRCH_CLEAR_BUTTON") {
 this.advSearchLbl = "..."; showBCList(); }
 
 this.setStoredData(this.searchText, advSearchTxt);   }
 catch (e) {
 this.ErrorMessage(e, "getAdvSrchLblFrmCriteria"); }
 
 },

 updateAdvSearchLbl : function() {

 try {
 
 if (typeof(top.pthNav) == "undefined" || 
 typeof(parent.pthNav) == "undefined") {
 
 return; }
 
 var bcList = top.document.getElementById("pthbcUlScroll");  if (this.advSearchLbl == "" ||
 typeof bcList.children[1] == 'undefined' ||
 typeof bcList.children[1].children[0] == 'undefined' || 
 !ptUtil.isClassMember(bcList.children[1],"ptglbsearch")) {
 
 this.cleanGlobalSearchParams(); return; }

 
 bcList.children[1].children[0].innerHTML = "\"" + this.advSearchLbl + "\"";  this.setStoredData(this.breadCrumbHTML, bcList.innerHTML); }
 catch (e) {
 this.ErrorMessage(e, "updateAdvSearchLbl"); } 
 
 },

 snipLabel : function(szInString) {
 var cutOff = 15; if (szInString.length > cutOff) {

 if (szInString.charAt(cutOff - 1) == " ") {
 szInString = this.advSearchLbl.substring(0, cutOff - 1) + "..."; }
 else if (this.advSearchLbl.charAt(cutOff - 1) == "|") {
 szInString = szInString.substring(0, cutOff - 2) + "..."; }
 else {
 szInString = szInString.substring(0, cutOff) + "..."; }
 } 

 return szInString; },

 addPersSrchEvents : function() {

 

 try {
 var bcScroll = top.document.getElementById("pthbcUlScroll"); var nIdx = 0; while (nIdx < bcScroll.children.length) {
 var bcLi = bcScroll.children[nIdx]; var bcLiPersSrch = bcLi.children[2]; if (ptUtil.isClassMember(bcLi,this.ptdynnavbc) && bcLiPersSrch != null) {
 ptEvent.add(bcLiPersSrch,"click",parent.pthNav.onClickPrompt); ptEvent.add(bcLiPersSrch.firstChild,"click",parent.pthNav.onClickPrompt); ptEvent.add(bcLiPersSrch.firstChild,"keydown",parent.pthNav.onKeyPressBC); }
 nIdx++; }
 }
 catch (e) {
 this.ErrorMessage(e, "addPersSrchEvents"); }
 
 },

 appendBreadCrumb : function(bcList, szBreadCrumb) {
 bcList.innerHTML += szBreadCrumb; },

 replaceBreadCrumb : function(bcList, szBreadCrumb) {
 if (bcList == null)
 return; try {

 if (bcList != null && bcList.nodeName.toLowerCase() == "div") {
 
 
 var parentNode = bcList.parentNode; var bcListNew = parent.document.createElement("ul"); bcListNew.setAttribute('id',"pthbcUlScroll"); bcListNew.setAttribute('dir',"ltr"); parentNode.replaceChild(bcListNew, bcList); bcListNew.innerHTML = szBreadCrumb;  parent.pthNav.addBreadcrumbEvents(); this.addBcCrefEvents(bcListNew);  this.setBcListWidth(bcListNew.parentNode);   return bcListNew; } 
 else {
 bcList.innerHTML = szBreadCrumb;  parent.pthNav.addBreadcrumbEvents(); this.addBcCrefEvents(bcList); this.setBcListWidth(bcList.parentNode);   return bcList; }
 }
 catch (e) {
 this.ErrorMessage(e, "replaceBreadCrumb"); }
 
 },

 setStoredData : function(szID, szValue) {
 if (!this.isSessionStorageSupported()) {
 return; }

 
 if (browserInfoObj2.isIE && browserInfoObj2.version <= 8 && szValue === "") { 
 szValue = " "; }
 
 try {
 sessionStorage[szID] = szValue; }catch(e){
 this.bSessStorageSupp = false; if (e.code == DOMException.QUOTA_EXCEEDED_ERR && sessionStorage.length == 0) 
 return;  else 
 throw e; }
 },

 getStoredData : function(szID) {
 if (!this.isSessionStorageSupported()) {
 return ""; } 
 
 return sessionStorage[szID]; },

 removeStoredData : function(szID) {
 if (!this.isSessionStorageSupported()) {
 return; } 
 
 sessionStorage.removeItem(szID); },

 clearStoredData : function() {
 sessionStorage.removeItem(this.breadCrumbHTML); sessionStorage.removeItem(this.isMenuCrefNav); sessionStorage.removeItem(this.isRCService); sessionStorage.removeItem(this.isGlobalSearch); sessionStorage.removeItem(this.searchText); sessionStorage.removeItem(this.bcKeyList);  if (top.pthNav && typeof top.pthNav != 'undefined') {
 top.pthNav.isMenuCrefNav = "F"; }
 },

 cleanGlobalSearchParams : function() {
 this.removeStoredData(this.isGlobalSearch); },

 removeRemoteData : function() {

 
 
 
 if (typeof bcUpdater.getStoredData(bcUpdater.isMenuCrefNav) != 'undefined' &&
 bcUpdater.getStoredData(bcUpdater.isMenuCrefNav) != null &&
 bcUpdater.getStoredData(bcUpdater.isMenuCrefNav) == "P") { 
 bcUpdater.removeStoredData(bcUpdater.isMenuCrefNav); }
 
 },
 
 isLocalStorageSupported : function() {
 if (typeof(localStorage) != "undefined") {
 return true; }

 return false; },

 isSessionStorageSupported : function() {
 if (this.bSessStorageSupp && (typeof(sessionStorage) != "undefined")) {
 return true; }
 this.bSessStorageSupp = false; return false; },

 encodeString : function(inValue) {
 
 var outValue = inValue; outValue = outValue.replace(/</g,"&lt;"); outValue = outValue.replace(/>/g,"&gt;"); return outValue; },

 decodeString : function(inValue) {
 
 var outValue = inValue; outValue = outValue.replace(/&lt;/g,"<"); outValue = outValue.replace(/&gt;/g,">"); return outValue; },
 
 ErrorMessage : function(e, inStr) {
 alert("Error in Breadcrumb Update function," + " " + inStr + ": " + e.message); } 

}

function convImgURLToABSUrl(value,sHostURL, bCrossDomain, strCurrUrl)
{
if (!isRelativeUrl(value)) return value;if (sHostURL != null && sHostURL != "")
 {
 var sHostSite = getPSHome(sHostURL); if (sHostSite!= null)
 {
 var sLocSite = ""; var UrlArray; UrlArray = String(value).split('/'); if (UrlArray.length >3)
 sLocSite = UrlArray[2]; if(sLocSite != sHostSite)
 value = String(value).replace('/'+sLocSite+'/','/'+sHostSite+'/'); }
 }

return convToABSUrl(value,sHostURL, bCrossDomain, strCurrUrl);}



function UpdateHistory(label, keyData, userData, pageName, valid, userQueryString)
 {
 var pt_history = getHistoryObject(); var histRec; if (pt_history.size()) {
 histRec = pt_history.pop(); if (label !== "") {
 histRec.label = label; }

 
 typeof histRec.isModal != "undefined" && histRec.isModal ? histRec.valid = 0 : histRec.valid = valid;  if (userQueryString !== "") {
 histRec.userQs = userQueryString; }

 pt_history.push(histRec); pt_history.save(); }
} 


function AddToHistory(label, keyData, userData, pageName, stateNum, elemNum, classicURL, dashboard) {
 
 if (typeof pageName != "undefined" && 
 (pageName == "PTNUI_NAVBAR" || pageName == "PTNUI_NAVBAR_PERS" || pageName == "PTNUI_ADDTILE" ||
 pageName == "PTNUI_GPLT_SRCH_NB" || pageName == "PTNUI_MENU_COMP")) return; if (typeof pageName != "undefined" && pageName == "PTPN_CAT_NOTIFY")return;   var url = ""; if (typeof sHistURL !== "undefined") { url = sHistURL; } 

 var isClassic = isDashboard = false; if (isFModeLayout()) { 
 bcUpdater.setStoredData(bcUpdater.isMenuCrefNav, "N"); bcUpdater.cleanGlobalSearchParams(); } else {
 if (typeof classicURL !== "undefined" && classicURL) {
 isClassic = true;  if (typeof dashboard !== "undefined" && dashboard) { 
 isDashboard = true;  url = classicURL; } 
 }
 }

 
 if (url.search("abnds") && isClassic) { url = url.replace("/psc/","/psp/"); } 

 var pt_history = getHistoryObject(),
 historyData = new historyNode (label, pageName, url, keyData, userData, 1, stateNum, elemNum, isClassic),
 backBtn = ptUtil.id("PT_WORK_PT_BUTTON_BACK"),
 histRec, 
 topRec;  pt_history = backNavigation.addNonPiaBackRec(pt_history);  if (!backNavigation.isInHistory(historyData)) {
 remoteDataGetter.createGetterComponents(historyData.url, "postBackHistoryMessage", backNavigation.addRemoteBackRec);  }
 
 if (isDashboard) { historyData.cURL = url; }
 historyData.isDashboard = isDashboard;  if (!isDashboard && typeof winName != "undefined" && winName && isModalPage(winName)) {
 historyData.valid = 0; historyData.isModal = 1;  }

 
 if (typeof historyData.isModal != "undefined" && historyData.isModal) { return; }

 if (pt_history.size()) {
 var isFromBC = pt_history.isFromBC(); histRec = pt_history.lastValid(pageName, url, historyData.isModal); topRec = pt_history.pop(); if (topRec) {

 if (isFromBC) { 
 pt_history.clearFromBC();  }

 
 
 if ((isFromBC || (topRec.isClassic && historyData.isClassic)) && !topRec.isDashboard) {
 topRec = pt_history.pop();   if (!topRec) {
 topRec = histRec = historyData; } else {
 histRec = pt_history.lastValid(pageName, url, historyData.isModal); }
 }

 pt_history.push(topRec);  if (topRec.url && topRec.url.split("?")[0] != url.split("?")[0] || topRec.pageName !== pageName) {
 pt_history.push(historyData); }

 
 var currPageRec = pt_history.pop(); if (currPageRec && currPageRec.userQs && currPageRec.userQs !== "") { currPageRec.userQs = ""; }
 pt_history.push(currPageRec); pt_history.save(); } 
 
 if (histRec && backBtn) {
 var objBackText = backBtn.querySelector(".ps-text"); var objBackImg = backBtn.querySelector(".ps-img"); if (histRec.label != "" && pt_history.size() > 1) {
 objBackText.innerHTML = histRec.label; backNavigation.setAltText(objBackImg); backNavigation.setTitle(objBackImg.parentNode.parentNode); backNavigation.setAriaLabel(objBackImg.parentNode, histRec.label);  removeClass(backBtn.parentNode.parentNode, "psc_disabled");  } else {
 objBackText.innerHTML = "Back"; if (typeof objBackImg != "undefined" && objBackImg) {
 backNavigation.setAltText(objBackImg); }
 } 
 }

 if ((backBtn && pt_history.size() <= 1) || (histRec && !histRec.valid)) {
 if (typeof backBtn != "undefined" && backBtn && 
 typeof backBtn.parentNode != "undefined" && backBtn.parentNode && 
 typeof backBtn.parentNode.parentNode != "undefined" && backBtn.parentNode.parentNode ) { 
 addClass(backBtn.parentNode.parentNode, "psc_disabled");  }
 }

 } else { 
 pt_history.push(historyData); pt_history.save(); if (backBtn) { 
 addClass(backBtn.parentNode.parentNode, "psc_disabled");  }
 }

 
 
 
 if (isFModeLayout()) { backNavigation.setCookie(historyData); }

} 

function fixUpBackButton() {
 var backBtn = ptUtil.id("PT_WORK_PT_BUTTON_BACK"), pt_history = getHistoryObject(); if (backBtn && pt_history) {
 var objBackText = backBtn.querySelector(".ps-text"), backRec = pt_history.nodes[pt_history.backIndex]; if (pt_history.size() > 1) {
 objBackText.innerHTML = backRec.label; removeClass(backBtn.parentNode.parentNode, "psc_disabled");  } else {
 objBackText.innerHTML = "Back"; var objBackImg = backBtn.querySelector(".ps-img"); if (typeof objBackImg != "undefined" && objBackImg) {
 objBackImg.setAttribute("alt", ""); }
 } 
 }
}

function updClassicHistory() {

 var h = getHistoryObject(); if (h.size() === 0) { return; }

 var n = h.getCurrClassic(); if (!n) { return; }

 var url = ""; if (typeof strCurrUrl !== "undefined") {
 var keyList = "", hasPageQS = false; if (strCurrUrl.indexOf("?") !== -1) {

 if (strCurrUrl.toLowerCase().indexOf("page=") !== -1) {
 hasPageQS = true;  }
 
 var qVars = strCurrUrl.split("?")[1].split("&"); for (var i = 0; i < qVars.length; i++) {
 if (qVars[i].toLowerCase().indexOf("page=") === -1) {
 keyList += qVars[i]; }
 }
 } 
 
 if (hasPageQS && keyList !== "") {
 url = strCurrUrl; } else {
 
 if (!hasPageQS) {
 if (keyList === "") { 
 url = strCurrUrl + "?page=" + n.pageName; } else {
 url = strCurrUrl + "&page=" + n.pageName; }
 }

 if (keyList === "") {
 if (typeof PIA_KEYSTRUCT !== "undefined") {
 try {
 for (var key in PIA_KEYSTRUCT) {
 keyList += "&";  keyList += key; keyList += "="; keyList += PIA_KEYSTRUCT[key]; }
 } catch (e) {}
 }
 url += keyList; }
 }
 
 var isPSP = false; try {

 if (!isCrossDomain(top)) { 
 if (typeof top.pthNav !== "undefined" && typeof parent.pthNav !== "undefined") {
 isPSP = true;  }
 } 
 } catch (ex) {}


 if (isPSP) {
 url = url.replace("/psc/","/psp/"); } else {
 url = url.replace("/psp/","/psc/"); }
 } 

 
 
 
 if (n.url.toLowerCase().indexOf("page=") === -1) {
 if (n.url.indexOf("?") === -1) {
 n.url += "?page=" + n.pageName; } else {
 n.url += "&page=" + n.pageName; }
 }

 if (url !== "") {
 n.cURL = url; } else {
 n.cURL = n.url; }

 h.save();}

function genUserQsParams(histRec) {
 try {
 var szQs = "", paramCnt = 1;  if (histRec && typeof histRec.userQs !== "undefined" && histRec.userQs && histRec.userQs !== "") {
 var qsObject = JSON.parse(histRec.userQs); if (typeof qsObject != "undefined" && qsObject) { 
 for (var paramId in qsObject) {
 if (paramCnt > 1) { szQs += "&"; }
 szQs += paramId; szQs += "="; szQs += encodeURIComponent(qsObject[paramId]); paramCnt++; }
 }
 }
 return szQs; } catch (e) {
 exceptionMessage(e, "genUserQsParams"); } 
}

function setQsParams(sUrl, szUserQs) {
 try { 
 if (typeof sUrl !== "undefined" && sUrl &&
 typeof szUserQs !== "undefined" && szUserQs && szUserQs !== "") {
 sUrl.indexOf("?") > -1 ? (sUrl.charAt(sUrl.length - 1) === "&" ? sUrl += szUserQs : sUrl += ("&" + szUserQs)) : (sUrl += ("?" + szUserQs));  }
 return sUrl;  } catch (e) {
 exceptionMessage(e, "setQsParams"); } 
}

function genUserPostParams(histRec, formName) {
 try { 
 divHiddenFields = document.querySelector("#" + formName + "divPSHIDDENFIELDS"); if (typeof divHiddenFields !== "undefined" && divHiddenFields && histRec && typeof histRec.userQs !== "undefined" && histRec.userQs && histRec.userQs !== "") {
 var qsObject = JSON.parse(histRec.userQs); if (typeof qsObject != "undefined" && qsObject) { 
 for (var paramId in qsObject) {
 
 inputEl = divHiddenFields.querySelector("#" + paramId); if (typeof inputEl == "undefined" || !inputEl) { inputEl = document.createElement("input"); }
 
 inputEl.setAttribute("type", "hidden"); inputEl.setAttribute("name", paramId);  inputEl.setAttribute("id", paramId); inputEl.setAttribute("value", encodeURIComponent(qsObject[paramId])); divHiddenFields.appendChild(inputEl); }
 }
 }
 } catch (e) {
 exceptionMessage(e, "genUserPostParams"); } 
}

function getHistoryObject()
{
 var histObj = new PT_Stack(); var historyStr = sessionStorage.getItem("pt_history"); if (historyStr && historyStr !== "") {
 var obj = JSON.parse(historyStr); histObj.nodes = obj.nodes; histObj.backIndex = obj.backIndex; }
 return histObj;}

function historyNode (label, pageName, url, keyData, userData, valid, stateNum, elemNum, isClassic) {
 this.label = label; this.pageName = pageName; this.url = url; this.keyData = keyData; this.userData = userData; this.valid = valid; this.stateNum = stateNum; this.elemNum = elemNum; this.isClassic = isClassic;}
 
function PT_Stack() 
{
 
 this.nodes = [];  this.backIndex = this.nodes.length; this.push = function(data) { 
 if (!data) { return; }
 this.nodes.push(data);  if (!data.isClassic) { 
 this.setCurrNUI(data);  } 
 }; this.pop = function() { return this.nodes.length ? this.nodes.pop() : null; }; this.unshift = function(el) { this.nodes.unshift(el); }; this.setBackIndex = function(idx) { this.backIndex = idx; };  this.print = function() { return this.nodes; };  this.size = function() { return this.nodes.length; }; this.save = function() { 
 try {
 sessionStorage.setItem("pt_history", JSON.stringify(this));  }catch(e){ return; }
 }; this.lastValid = function(pageName, url, bModal) {
 if (typeof bModal == 'undefined' || !bModal) { 
 for (var i = this.size() - 1; i >= 0; i--) {
 if (this.nodes[i].valid && 
 (pageName != this.nodes[i].pageName || 
 url.split("?")[0] != this.nodes[i].url.split("?")[0])) {
 this.backIndex = i; break; }
 }
 }
 return this.nodes[this.backIndex]; }; this.lastValidNUI = function(pageName, url) {
 for (var i = this.size() - 1; i >= 0; i--) {
 if (!this.nodes[i].isClassic && this.nodes[i].valid && 
 (pageName != this.nodes[i].pageName || 
 url.split("?")[0] != this.nodes[i].url.split("?")[0])) {
 this.backIndex = i; break; }
 }
 return this.nodes[this.backIndex]; };  this.getCurrNUI = function() {
 var h = sessionStorage.getItem("pt_history_last_nui"); return h && h !== "" ? JSON.parse(h) : null; };  this.setCurrNUI = function (h) {
 if (!h || !isFModeLayout()) { return; } 

 var url = keyList = "", currNUI = {}; currNUI.pageName = h.pageName;  currNUI.url = h.url;  currNUI.label = h.label;   if (typeof h.userQs != "undefined" && h.userQs && h.userQs != "") {
 currNUI.userQs = h.userQs; }

 
 try { 
 url = currNUI.url; } catch (ex) {}

 if (url !== "") { 
 url += keyList; currNUI.url = url;  }
 try {
 sessionStorage.setItem("pt_history_last_nui", JSON.stringify(currNUI));  } catch(e) {}
 }; this.setFromBC = function() {
 try {
 sessionStorage.setItem("pt_history_bc_to_nui", "true");  }catch(e){}
 }; this.isFromBC = function() {
 var v = sessionStorage.getItem("pt_history_bc_to_nui"); return v && v === "true" ? true : false; }; this.clearFromBC = function() {

 try {
 sessionStorage.removeItem("pt_history_bc_to_nui"); } catch (ex) {} 

 }; this.getCurrClassic = function() { 
 var cNode = null; for (var i = this.size() - 1; i >= 0; i--) {
 if (this.nodes[i].isClassic) {
 cNode = this.nodes[i]; break; }
 }
 return cNode; };  this.updatedBack = function() {
 for (var i = this.backIndex+1; i < this.nodes.length; i++)
 this.nodes.pop(); return this.nodes[this.backIndex]; };}

 function clearHistory() 
{
 var pt_history = getHistoryObject(); if (!pt_history || pt_history.size() <=1) return; var lastRec = pt_history.pop(); sessionStorage.removeItem("pt_history"); pt_history = getHistoryObject(); pt_history.push(lastRec); pt_history.save();}

function ClickAndHold(elem, action, start) {
 var t; elem.onmousedown = function() {
 t = setTimeout(action, start); } 

 elem.onmouseup = function () {
 clearTimeout(t); } 

 elem.onmouseout = function () {
 clearTimeout(t); }
}

function GetAllHistory()
{
 alert("test");}




function GetRCTgtContent(url, szParamXML)
{

 var loader = new net2.ContentLoader(url, null, null, "POST", 
 function()
 {
 var newurl = this.req.getResponseHeader("Location"); url = newurl; }, null, szParamXML, "application/x-www-form-urlencoded", 1, 0, null, false);  var loader = new net2.ContentLoader(url, null, null, "POST", 
 function()
 {
 
 var respHTML = this.req.responseText; if (respHTML != "")
 
 {
 var oIFrame = MTop().document.getElementById("ptifrmtgtframe");  oIFrame.contentDocument.write(respHTML);  oIFrame.contentDocument.close();  }
 }, 
 null, szParamXML, "application/x-www-form-urlencoded");}
function OpenRCService(url,nOpenMode,nFluidComponent,szServType,strLabel,strFldID,bBulkAction,szParamXML,sFormName)
{

function HideProcessing()
 {
 if (typeof(sFormName) != 'undefined' && sFormName != null && sFormName != "")
 {
 var sProcFn = "processing_"+sFormName+"(0, 3000);"; eval(sProcFn); }
 }

if (isFModeLayout()) closeLastModal();var nModID = MTop().modId;if ((typeof(szParamXML) != 'undefined') && (szParamXML != 'undefined' && szParamXML != null))
{
 var pos = szParamXML.indexOf("="); var key = szParamXML.substring(0, pos); var val = szParamXML.substring(pos+1); val = escape(val); szParamXML = key+"="+val; }

if (nOpenMode == "3")
 {
 var objFrame = top.frames['TargetContent']; if (objFrame == null)
 nOpenMode = 2;  }
if (nOpenMode == "0")
 {
 if (isFModeLayout() && nFluidComponent == 0)
 window.open(url,'_blank'); else
 OpenCrefInUniNav(url, '_blank',bBulkAction,szParamXML,nFluidComponent);  }
else if (nOpenMode == "2")
 {
 var url1 = url; if ((typeof bBulkAction == 'undefined' || bBulkAction == null) || !bBulkAction) 
 url1 = "javascript:window.open('"+url+"','_self')|javascript:CloseContextMenuHandler()"; if(saveWarning('TargetContent',null, '_top', url1, null, bBulkAction, szParamXML))
 {
 if (szServType == "UEXT")
 HideProcessing(); if (isFModeLayout() && nFluidComponent == 0)
 window.open(url,'_top'); else
 OpenCrefInUniNav(url, '_top',bBulkAction,szParamXML,nFluidComponent); }
 }
else if (nOpenMode == "3")
 {
 var url1 = url; var target = 'TargetContent'; if ((typeof bBulkAction == 'undefined' || bBulkAction == null) || !bBulkAction) {
 url1 = "javascript:window.open('"+url+"','TargetContent')|javascript:CloseContextMenuHandler()"; target = '_top'; }
 if(saveWarning('TargetContent',null, 'TargetContent', url1, null, bBulkAction, szParamXML))
 {
 if (szServType == "UPGE" && typeof parent.pthNav != 'undefined')
 {
 parent.pthNav.fakeBCReqCTXMenu = true; bcUpdater.setStoredData(bcUpdater.isRCService, "T"); }
 if (!bBulkAction) 
 window.open(url,'TargetContent'); else 
 GetRCTgtContent(url, szParamXML);  }
 }
else if (nOpenMode == "4") 
 {
 
 var options=""; if ((typeof(strLabel) != 'undefined') && strLabel && strLabel != '')
 {
 var sTitleText = strLabel; var h = String.fromCharCode(160); while(sTitleText.indexOf(h) != -1)
 sTitleText = sTitleText.replace(h," ");  options = 'sTitle@ '+ sTitleText + ';'; }
 
 if (szServType == "UEXT" || szServType == "POP" || szServType == "UQRY")
 options = options + 'bCrossDomain@1;'; else
 {
 if (url.indexOf("?") != -1)
 url = url+"&"; else
 url = url+"?"; url = url+"ICModalJS=1&ICRCFModalJS=1&ICDoModeless=1"; }
 if (szServType == "UPGE")
 options = options + 'bPIA@1;'; options = options + 'bClose@1;'; options = options + 'bRCFModal@1;'; options = options + 'sGlyphId@'+ strFldID + ';'; if (url)
 url = url.replace(/'/g, '%27'); var oIFrame;  if (bBulkAction != 'undefined' && bBulkAction != null && bBulkAction){
 
 var loader = new net2.ContentLoader(url, null, null, "POST", 
 function()
 {
 var newurl = this.req.getResponseHeader("Location"); url = newurl; }, null, szParamXML, "application/x-www-form-urlencoded", 1, 0, null, false); if (!browserInfoObj2.isIE){

 oIFrame = showModal("about:blank", window, options, null, null, true, null, true);  var loader = new net2.ContentLoader(url, null, null, "POST", 
 function()
 {
 
 var respHTML = this.req.responseText; if (respHTML != "")
 {
 oIFrame.contentDocument.write(respHTML);  oIFrame.contentDocument.close();  }
 }, 
 null, szParamXML, "application/x-www-form-urlencoded");  }
 else
 oIFrame = showModal(url, window, options, null, null, true, null, true); }
 else
 showModal(url,window,options,null,null,true); function checkForReadiness() 
 {
 if (window.modWin != null && window.modWin.contentWindow)
 {
 try {
 if (window.modWin.contentWindow.document.readyState == "complete")
 { 
 setModWinID = setModWinParentPIA(); if (bBulkAction != 'undefined' && bBulkAction != null && bBulkAction && browserInfoObj2.isIE)
 {
 
 var form = oIFrame.contentDocument.createElement("form"); form.setAttribute("method", "POST"); form.setAttribute("action", url);   var strKey = szParamXML.substr(0, 14); var strVal = szParamXML.substr(15); var hiddenField = oIFrame.contentDocument.createElement("input");  hiddenField.setAttribute("type", "hidden"); hiddenField.setAttribute("name", strKey); hiddenField.setAttribute("value", strVal);  form.appendChild(hiddenField); oIFrame.contentDocument.body.appendChild(form); form.submit(); }

 HideProcessing(); return; }
 setTimeout(checkForReadiness, 1000);  }
 catch (err)
 {
 setTimeout(checkForReadiness, 1000); }
 }
 else
 HideProcessing(); }
 if ((szServType != "UEXT" && szServType != "POP") && typeof(window) != "undefined" && window != null && 
 typeof(window.modWin) != "undefined" && window.modWin != null)
 checkForReadiness(); else
 HideProcessing(); }

if (window.top.document.getElementById("ptifrmpopup") && window.top.document.getElementById("ptifrmpopup").style.display != "none") { 
 if (typeof(top.searchGbl) != "undefined" && top.searchGbl.win && top.searchGbl.win.popup) {
 top.searchGbl.win.popup.close(); }
 if (typeof(top.pthNav) != "undefined" && top.pthNav.abn && top.pthNav.abn.search && top.pthNav.abn.search.win && top.pthNav.abn.search.win.popup) { 
 top.pthNav.abn.search.win.popup.close(); }
 }
if (isFModeLayout() && nOpenMode != "4")
 doCloseModal(nModID);}
function onRCService(url,nOpenMode,nFluidComponent,szServType,strLabel,strFldID,bBulkAction,szParamXML)
{
OpenRCService(url,nOpenMode,nFluidComponent,szServType,strLabel,strFldID,bBulkAction,szParamXML);}



var pnWebsocketobjs = [];var pnSubscriptionFilters = {};var pnRemoteNodes = null;function getSiteName() {
 var URI = location.href; var psSiteName = (URI.split("/"))[4]; psSiteName = (psSiteName.split("_"))[0]; return psSiteName;}

function OpenAsynConnection() {
 var asyncPush = top.asyncPush; if (typeof (asyncPush) == 'undefined') asyncPush = 0; if (typeof (asyncPush) != 'undefined' && asyncPush === 0) {
 var websocketUri; var URI = location.href; var portalName = getPortalName(URI); if (window.location.protocol == "http:") websocketUri = "ws://" + window.location.host + "/ws/" + getSiteName() + "/PSWebsockServlet" + "?portalName=" + portalName; else websocketUri = "wss://" + window.location.host + "/ws/" + getSiteName() + "/PSWebsockServlet" + "?portalName=" + portalName; SetupWebSocket(websocketUri, false); pm.WebSocketEnabled = 1; } else {
 pm.WebSocketEnabled = 0; }
}

function SetupWebSocket(connectionUri, isContentNode) {
 if ("WebSocket" in window) {
 try {
 var websocketobj = new WebSocket(connectionUri); websocketobj.servereventsarray = []; if (isContentNode === true) websocketobj.servereventsarray = pm.serverEventNames.concat(); websocketobj.isContentNode = isContentNode; websocketobj.initialized = false; pnWebsocketobjs.push(websocketobj); pm.wsIsReady = 0; websocketobj.onopen = function (evt) {
 OnWebSocketOpen(evt); }; websocketobj.onclose = function (evt) {
 OnWebSocketClose(evt); }; websocketobj.onmessage = function (evt) {
 OnWebSocketMessage(evt); }; websocketobj.onerror = function (evt) {
 OnWebSocketError(evt); }; websocketobj.sendmessage = function (message) {
 var subsriptionFilter = pnSubscriptionFilters[message]; if (typeof (subsriptionFilter) != "undefined" && ApplySubscriptionFilter(subsriptionFilter, this)) return; this.send(message); }; } catch (e) {}
 }
}

function OnWebSocketOpen(evt) {
 try {
 var pstokencookie = "PS_TOKEN:" + getCookieValue("PS_TOKEN"); for (var i = 0; i < pnWebsocketobjs.length; i++) {
 if (!pnWebsocketobjs[i].initialized) {
 pnWebsocketobjs[i].send(pstokencookie); pnWebsocketobjs[i].initialized = true;  for (var j = 0; j < pnWebsocketobjs[i].servereventsarray.length; j++) {
 pnWebsocketobjs[i].sendmessage(pnWebsocketobjs[i].servereventsarray[j]); }
 pnWebsocketobjs[i].servereventsarray.length = 0; }
 }
 } catch (e) {}
}

function OnWebSocketClose(evt) {}

function OnWebSocketMessage(evt) {
 try {
 var eventObject = eval("(" + evt.data + ")"); if (eventObject.EventName) {
 ServerPushEventHandler(eventObject.EventName, eventObject); } 
 } catch (e) {}
}

function OnWebSocketError(evt) {}

function setHTMLElementValue(aElementDivId, aValue) {
 var htmlElement = document.getElementById(aElementDivId); if (htmlElement.nodeName == "INPUT") htmlElement.value = aValue; else if (htmlElement.nodeName == "DIV") htmlElement.innerHTML = aValue; else if (htmlElement.nodeName == "SPAN") htmlElement.innerHTML = aValue;}

function getHTMLElementValue(aElementDivId) {
 var eHTMLElement = document.getElementById(aElementDivId); var sCurrentDivVal; if (eHTMLElement == null) return; if (eHTMLElement.nodeName == "INPUT") sCurrentDivVal = eHTMLElement.value; else if (eHTMLElement.nodeName == "DIV") sCurrentDivVal = eHTMLElement.innerHTML; else if (eHTMLElement.nodeName == "SPAN") sCurrentDivVal = eHTMLElement.innerHTML; return sCurrentDivVal;}

function SendWebSocketMessage(eventMessage) {
 var ajaxClient; if (pm.WebSocketEnabled == 1) {
 try {
 for (var i = 0; i < pnWebsocketobjs.length; i++) {
 if (pnWebsocketobjs[i].readyState == 1) pnWebsocketobjs[i].sendmessage(eventMessage); else pnWebsocketobjs[i].servereventsarray.push(eventMessage); }
 } catch (e) {}

 } else {
 try {
 if (ajaxClient == null || ajaxClient == undefined) {
 ajaxClient = new XMLHttpRequest(); }
 } catch (e) {

 try {
 if (ajaxClient == "undefined") {
 ajaxClient = new XMLHttpRequest(); }
 } catch (e) {
 ajaxClient = new ActiveXObject("MSXML2.XMLHTTP.6.0"); }
 }
 ajaxClient.onreadystatechange = function () {
 if (ajaxClient.readyState == 1) {
 pm.conIsReady = 1; } else if (ajaxClient.readyState == 3) {
 var eventMsg = ""; if (ajaxClient.responseText) eventMsg = ajaxClient.responseText.substring(ajaxClient.responseText.lastIndexOf("}{") + 1); if (eventMsg != "") {
 eventObject = eval("(" + eventMsg + ")"); ServerPushEventHandler(eventObject.EventName, eventObject); }
 } else {}
 }
 var nocache = new Date().getTime(); url = "http://" + window.location.host + "/aws/" + getSiteName() + "/NIOServlet"; url = url + "?event=" + eventMessage + "&cache=" + nocache; ajaxClient.open("GET", url, true); ajaxClient.send(null); }
}


function PnWindowSubscribe() {
 try {
 if (typeof (pm.wsIsPNW) == "undefined") {

 
 var subscriptionFilter = SetSubscriptionFilter("PUSHNOTIFICATIONWINDOW", true); subscriptionFilter.subscribeOnContentNodes = false; AddSubscriptionFilter(subscriptionFilter); SubscribeCollection("PUSHNOTIFICATIONWINDOW", UpdatePNUI); pm.wsIsPNW = 1; var parentNode = document.getElementById('PT_NOTIFY'); var parentNode_classic=top.document.getElementById('pthdr2notify_div'); if (parentNode != null || parentNode_classic!=null ) 
 javascript: doLoadNewNotification(); }
 } catch (e) {}
}

function UpdatePNUI(EventName, EventData) {
 try {
 var parentNode = document.getElementById('PT_NOTIFY'); var parentNode_classic=top.document.getElementById('pthdr2notify_div'); if (parentNode != null || parentNode_classic!=null) {
 NewNotification(EventData); }
 } catch (e) {}
}

function IWCServerEvent(aEventName, evtdataPrimaryKey, uiPrimaryKey, uiIsGrid) {
 this.evtName = aEventName; this.evtdataPrimaryKey = evtdataPrimaryKey; this.uiPrimaryKey = uiPrimaryKey; this.uiIsGrid = uiIsGrid; this.fieldMappings = {};}

IWCServerEvent.prototype.insert = function (key, value) {
 if (typeof (value) !== "undefined") {
 this.fieldMappings[key] = value; }
}

IWCServerEvent.prototype.updateUI = function (eventName, eventData) {
 try {
 var sJsonMapVal; var nChildCount; if (this.uiIsGrid === false) {
 var sFieldDivValue = GetJSONObjectValue(eventData, this.evtdataPrimaryKey); setHTMLElementValue(this.uiPrimaryKey, sFieldDivValue); for (var key in this.fieldMappings) {
 sFieldDivValue = GetJSONObjectValue(eventData, key); setHTMLElementValue(this.fieldMappings[key], sFieldDivValue); }
 } else {
 var parents = document.getElementsByClassName('PSLEVEL1GRIDODDROW'); var rowcount = parents.length; this.updateUIGrid(eventData, eventData.EventDataType, rowcount); }
 } catch (e) {}
}

IWCServerEvent.prototype.updateUIGrid = function (eventData, eventType, rowcount) {
 var jsonData = GetJSONObjectValue(eventData, this.evtdataPrimaryKey); if (eventType == "Rowset") {
 while (jsonData.child != null) {
 for (var i = 0; i < rowcount - 1; i++) {
 var sDivId = this.uiPrimaryKey + "$" + i; var sCurrentDivVal = getHTMLElementValue(sDivId); if (sCurrentDivVal == jsonData.child[this.evtdataPrimaryKey]) {
 for (var key in this.fieldMappings) {
 var sGridFieldDivId = this.fieldMappings[key] + "$" + i; var sGridFieldDivValue = jsonData.child[key]; setHTMLElementValue(sGridFieldDivId, sGridFieldDivValue); }
 break; }
 }
 jsonData = jsonData.child; }
 } else {
 for (var i = 0; i < rowcount - 1; i++) {
 var sDivId = this.uiPrimaryKey + "$" + i; var sCurrentDivVal = getHTMLElementValue(sDivId); if (sCurrentDivVal == jsonData) {
 for (var key in this.fieldMappings) {
 var sGridFieldDivId = this.fieldMappings[key] + "$" + i; var sGridFieldDivValue = GetJSONObjectValue(eventData, key); setHTMLElementValue(sGridFieldDivId, sGridFieldDivValue); }
 break; }
 }
 }
}

function IWCSubscribeServerEvents() {
 try {
 var bHasServerSub = true; var bIsGrid; for (var x = 0; x < p_message_data.length; x++) {
 if (p_message_data[x].eventType == 'T') {
 bIsGrid = false; var oIWCObject = null; var sMessage = p_message_data[x].eventData; if (sMessage.indexOf("G:") != -1) bIsGrid = true; sMessage = sMessage.substring(2, sMessage.length); var sMain = sMessage.split(" "); for (var i = 0; i < sMain.length; i++) {
 var sSingleMap = sMain[i].split("-"); if (oIWCObject === null) {
 oIWCObject = new IWCServerEvent(p_message_data[x].eventName, sSingleMap[0], sSingleMap[1], bIsGrid); } else oIWCObject.insert(sSingleMap[0], sSingleMap[1]); }
 if (typeof (pm.iwcServerEventObjects) === "undefined") pm.iwcServerEventObjects = new Array(); pm.iwcServerEventObjects.push(oIWCObject); Subscribe(p_message_data[x].eventName, UpdatePIAUI); }
 }
 } catch (e) {}
}


function ServerPushEventHandler(eventName, eventData) {
 try {
 if (eventData.hasOwnProperty("CollectionName")) eventName = "COLL:" + eventData.CollectionName; for (var i = 0; i <= pm.serverEventCount; i = i + 1) {
 if (pm.serverEventNames[i] == eventName) {
 var callback = pm.serverEventCallBacks[i]; callback(eventName, eventData); }
 }
 } catch (e) {}
}


function GetJSONObjectValue(eventObject, key) {
 if (key == "int") return eventObject.int; else if (key == "str") return decodeURIComponent(eventObject.str); else if (key == "dbl") return eventObject.dbl; else if (key == "ints") return eventObject.ints; else if (key == "dbls") return eventObject.dbls; else if (key == "strs") return eventObject.strs; else if (eventObject.EventDataType == "Map") {
 return decodeURIComponent(eventObject.Map[key]); } else if (eventObject.EventDataType == "Rowset") {
 var rowsetobj = new Object(); var childobj = rowsetobj; var rowset = eventObject.Rowset; var rowsetheader = null; for (var row in rowset) {
 if (row == "Header") rowsetheader = rowset[row]; else {
 var rowsetdata = rowset[row]; if (rowsetheader[0] == key) {
 childobj.child = new Object(); childobj = childobj.child; for (var i = 0; i < rowsetheader.length; i++)
 childobj[rowsetheader[i]] = decodeURIComponent(rowsetdata[i]); }
 }
 }
 return rowsetobj; }
}


function UpdatePIAUI(eventName, eventData) {
 if (pm.iwcServerEventObjects != "undefined") {

 for (var x = 0; x < pm.iwcServerEventObjects.length; x++) {
 if (pm.iwcServerEventObjects[x].evtName == eventName) pm.iwcServerEventObjects[x].updateUI(eventName, eventData); }
 }
}

function Subscribe(eventName, eventCallback) {
 try {
 if (!IsPNEnabled()) return; if (pnWebsocketobjs.length === 0) OpenAsynConnection(); if (typeof (pm.serverEventCount) != "undefined") {
 for (var x = 0; x <= pm.serverEventCount; x++) {
 if (pm.serverEventNames[x] == eventName) {
 var fCallBack = pm.serverEventCallBacks[x]; if (fCallBack.name === eventCallback.name) return; }
 }
 pm.serverEventCount = pm.serverEventCount + 1; } else {
 pm.serverEventCount = 0; pm.serverEventNames = new Array(); pm.serverEventCallBacks = new Array(); }

 pm.serverEventNames[pm.serverEventCount] = eventName; pm.serverEventCallBacks[pm.serverEventCount] = eventCallback; SendWebSocketMessage(eventName); } catch (e) {}
}

function SubscribeCollection(collectionName, eventCallback) {
 collectionName = "COLL:" + collectionName; Subscribe(collectionName, eventCallback);}

function SetSubscriptionFilter(subscriptionName, isCollection) {
 var subscriptionFilter = {}; subscriptionFilter.name = subscriptionName; if (isCollection === true) subscriptionFilter.name = "COLL:" + subscriptionName;  subscriptionFilter.subscribeOnContentNodes = true; return subscriptionFilter;}

function AddSubscriptionFilter(subscriptionFilter) {
 pnSubscriptionFilters[subscriptionFilter.name] = subscriptionFilter;}

function ApplySubscriptionFilter(subsriptionFilter, websocketObj) {
 var filterIsApplicable = false;   if (subsriptionFilter.subscribeOnContentNodes === false && websocketObj.isContentNode === true) filterIsApplicable = true; return filterIsApplicable;}

function IsPNEnabled() {
 var enablePN = true; if (typeof (disablePNSubscriptions) != 'undefined' && disablePNSubscriptions === 1) enablePN = false; return enablePN;}

function initializeRemoteNodes() {
 var xmlhttp; if (typeof (pnRemoteNodes) != 'undefined') {
 var remoteNodesObject = eval("(" + pnRemoteNodes + ")"); remoteNodesObject = remoteNodesObject.nodes; var baseUri = location.href; for (var i = 0; i < remoteNodesObject.length; i++) {
 var serverUri = baseUri.split(getPortalName(baseUri))[0]; serverUri = serverUri.replace("/psc/", "/psp/"); serverUri = serverUri + getPortalName(baseUri) + "/" + remoteNodesObject[i].name + "/s/WEBLIB_PTPP.ISCRIPT1.FieldFormula.IScript_SSOTester"; if (!isAlreadyLoggedIn(remoteNodesObject[i].host)) {
 sendAjaxRequest(serverUri, remoteNodesObject[i]); }
 else {
 setRemoteWebSocket(remoteNodesObject[i]); }
 }
 }
}

function setRemoteWebSocket(remoteNode) {
 
 var websocketUri; if (remoteNode.protocol == "http") websocketUri = "ws://" + remoteNode.host + "/ws/" + remoteNode.siteName + "/PSWebsockServlet"; else websocketUri = "wss://" + remoteNode.host + "/ws/" + remoteNode.siteName + "/PSWebsockServlet"; SetupWebSocket(websocketUri, true);}

function isAlreadyLoggedIn(hostName) {
 var loginList = getCookieValue("PS_LOGINLIST"); var nodes = loginList.split(" "); for (var i = 0; i < nodes.length; i++) {
 if (nodes[i].trim().toLowerCase().search(hostName.trim().toLowerCase()) > -1) {
 return true; }
 }
 return false;}

function sendAjaxRequest(url, remoteNode) {
 var sLoader = new net2.ContentLoader(url, null, null, "",

 function () {
 setRemoteWebSocket(remoteNode); }, null, null, "application/x-www-form-urlencoded", true, false, null, true, null);}




function selectTab(el)
{
if (el.getAttribute("role") == "tab")
el.focus();else
(el.firstElementChild || el.firstChild).focus();}
function doTabNav(event)
{
 var bEventContinue= true;var tabSelect;var newTab = null;var currentTarget = event.currentTarget || event.srcElement;if (currentTarget.tagName == 'LI')
 tabSelect = currentTarget;else
 tabSelect = currentTarget.parentNode; switch (event.keyCode)
 {
 case 13:
 case 32:
 bEventContinue = false; if (currentTarget.getAttribute("aria-selected") != "true")
 {
 
 
 var attr = currentTarget.getAttribute("href"); attr = attr.substring(11); eval(attr);  }
 break;  case 39:
 case 40:
 newTab = tabSelect.nextElementSibling || tabSelect.nextSibling; if (newTab && newTab.getAttribute("aria-selected") == "true")
 break; else
 {
 if (newTab && (newTab.firstElementChild || newTab.firstChild).getAttribute("role") != "tab")
 newTab = newTab.nextElementSibling || newTab.nextSibling; if (newTab)
 {
 var eTab = newTab.firstElementChild || newTab.firstChild;  if (eTab && eTab.getAttribute("role") == "tab")
 break; }
 }
 case 36:
 newTab = findFirstTab(tabSelect); break; case 37:
 case 38:
 newTab = tabSelect.previousElementSibling || tabSelect.previousSibling; if (newTab && newTab.getAttribute("aria-selected") == "true")
 break; else
 {
 if (newTab && (newTab.firstElementChild || newTab.firstChild).getAttribute("role") != "tab")
 newTab = newTab.previousElementSibling || newTab.previousSibling; if (newTab)
 {
 var eTab = newTab.firstElementChild || newTab.firstChild; if (eTab && eTab.getAttribute("role") == "tab")
 break;  }
 }
 case 35:
 newTab = findLastTab(tabSelect); }
 if (newTab != 'undefined' && newTab != null)
 {
 selectTab(newTab); bEventContinue=false; }
 return bEventContinue;}

function CloseRCFModal()
 {
}



var backNavigation = {

 psback : "psback",
 origin : "PIA",
 expireDuration : 12*60*60*1000,
 nonPiaPageId : "NONPIABACKPAGE",
 crefId : "THIRDPARTY", 
 nonPiaClass : "psnonpiacref",

 
 setCookie : function(histRec) {

 try {

 var setLabel = function() {
 var appLabel = document.querySelector("#app_label"), label = "LabelNotFound"; if (typeof PIA_KEYSTRUCT !== "undefined" && PIA_KEYSTRUCT && typeof appLabel !== 'undefned' && appLabel) {
 label = appLabel.innerHTML; } else if (typeof document.querySelector("#remotedashboard") != 'undefined' && document.querySelector("#remotedashboard")) { 
 
 if (typeof document.querySelector("#ptdashboardlabel") != 'undefined' && document.querySelector("#ptdashboardlabel") && 
 typeof document.querySelector("#ptdashboardlabel").innerHTML != 'undefined' && document.querySelector("#ptdashboardlabel").innerHTML &&
 document.querySelector("#ptdashboardlabel").innerHTML.length > 0) {
 
 label = document.querySelector("#ptdashboardlabel").innerHTML; } else {
 
 label = "Home"; } 
 } else if (typeof szCrefLabel !== 'undefined' && szCrefLabel && szCrefLabel != "") {
 label = szCrefLabel; }

 return label; }

 var setUrl = function() {
 var url = histRec.url, keyList = ""; if (typeof PIA_KEYSTRUCT !== "undefined" && PIA_KEYSTRUCT) {
 
 if (url.charAt(url.length - 1) == '&') { url = url.substr(0, url.length - 1); } 
 for (var key in PIA_KEYSTRUCT) {
 keyList += "&";  keyList += key; keyList += "="; keyList += PIA_KEYSTRUCT[key]; }
 url += keyList; } else {
 
 urlParts = url.split("?"); url = urlParts[0]; }
 return url; }

 var getLayout = function() {
 var reflayout = -1, i = -1;  if (!isFModeLayout()) {
 reflayout = "0";  var bcList = top.document.getElementById("pthbcUlScroll"); if (typeof bcList != "undefined" && bcList) {
 
 for (i = bcList.children.length - 1; i > -1; i -= 2) {
 var bcEl = bcList.children[i]; if (typeof bcEl != "undefined" && bcEl && 
 typeof bcEl.children[0] != "undefined" && bcEl.children[0] &&
 typeof bcEl.children[0].getAttribute("data-pt-nui-bc") != "undefined" && bcEl.children[0].getAttribute("data-pt-nui-bc")) { 
 reflayout = "1"; break; }
 }
 }
 } else {
 reflayout = "1";  var pt_history = getHistoryObject(), histRec = null; if (typeof pt_history != "undefined" && pt_history) { 
 histRec = pt_history.getCurrClassic(); if (typeof histRec != "undefined" && histRec) { reflayout = 0; } 
 }
 }

 return reflayout; }

 if (isFModeLayout()) { 
 cookieObject.setCookie(this.psback, this.setCookieValue(histRec.url, histRec.label, this.origin, getLayout()), this.expireDuration);  } else { 
 if (typeof histRec != 'undefined' && histRec) { 
 var url = setUrl(), label = histRec.label; if (typeof PIA_KEYSTRUCT == "undefined" || !PIA_KEYSTRUCT) { label = setLabel(); } 
 cookieObject.setCookie(this.psback, this.setCookieValue(histRec.url, histRec.label, this.origin, getLayout()), this.expireDuration);  } else { 
 cookieObject.setCookie(this.psback, this.setCookieValue(document.location.href, setLabel(), this.origin, getLayout()), this.expireDuration); }
 }

 } catch (e) {
 exceptionMessage(e, "backNavigation.setCookie"); } 

 },

 
 setCookieValue : function(url, label, origin, layout) {

 try {
 var value = {}; value.url = url; value.label = label.replace(/&amp;/g, ""); value.label = encodeURIComponent(value.label); value.origin = origin; value.layout = layout; return value; } catch (e) {
 exceptionMessage(e, "backNavigation.setCookieValue"); }

 },

 
 getCookieValue : function() {

 return cookieObject.getCookieValue(this.psback); },

 
 addNonPiaBackRec : function(h) {

 try {

 var backCookie = cookieObject.getCookieValue(this.psback); if (backCookie && !this.isPiaCookie(backCookie)) {
 var backHistory = new historyNode (backCookie.label, this.nonPiaPageId, backCookie.url, "", "", 1, 0, 0, 1); backHistory.isNonPiaBack = 1; h.push(backHistory); h.save(); }
 return h; } catch (e) {
 exceptionMessage(e, "backNavigation.addNonPiaBackRec"); } 

 },

 
 
 expireNonPiaBackRec : function(backRec, h) {

 try {

 if (!this.isPiaBackRec(backRec)) { 
 cookieObject.expireCookie(this.psback);  h.pop(); h.save(); this.removeStoredData(); }
 return h; } catch (e) {
 exceptionMessage(e, "backNavigation.expireNonPiaBackRec"); } 

 },

 
 expireNonPiaCref : function(e) {

 try {

 var anc = e.target || e.srcElement; if (this.isPiaCref(anc.parentNode)) { return; }

 cookieObject.expireCookie(this.psback); this.removeStoredData(); } catch (e) {
 exceptionMessage(e, "backNavigation.expireNonPiaCref"); } 


 },

 
 isPiaCookie : function(cookie) {

 try {

 if (typeof cookie.origin == "undefined" || !cookie.origin || cookie.origin.toUpperCase() != "PIA") { return false; }
 return true; } catch (e) {
 exceptionMessage(e, "backNavigation.isPiaCookie"); } 

 }, 

 
 isPiaBackRec : function(backRec) {

 try {

 if (typeof backRec.isNonPiaBack == "undefined" || backRec.isNonPiaBack == null || backRec.isNonPiaBack != 1) { return true; }
 return false; } catch (e) {
 exceptionMessage(e, "backNavigation.isPiaBackRec"); } 

 }, 

 
 isPiaCref : function(el) {

 try {

 if (ptUtil.isClassMember(el, this.nonPiaClass)) { return false; }
 return true; } catch (e) {
 exceptionMessage(e, "backNavigation.isPiaCref"); } 

 }, 

 
 
 removeStoredData : function() {

 try {
 sessionStorage.removeItem("isMenuCrefNav"); sessionStorage.removeItem("breadCrumbHTML"); sessionStorage.removeItem("pt_history_last_nui"); sessionStorage.removeItem("pt_history"); } catch (e) {
 exceptionMessage(e, "backNavigation.removeStoredData"); } 

 },

 
 addRemoteBackRec : function(event) {

 try {
 var eBackGetter = document.querySelector("#" + remoteDataGetter.iframeId);   if (eBackGetter && event.origin == eBackGetter.contentWindow.document.location.origin) {
 var backRec = JSON.parse(event.data), pt_history = getHistoryObject(), backBtn = ptUtil.id("PT_WORK_PT_BUTTON_BACK"); if (backRec && pt_history && backBtn) {
 
 pt_history.unshift(backRec); pt_history.setBackIndex(0); var backBtnTxt = backBtn.querySelector(".ps-text"); var objBackImg = backBtn.querySelector(".ps-img"); if (backRec.label != "" && pt_history.size() > 1) {
 backBtnTxt.innerHTML = backRec.label; this.setAltText(objBackImg); this.setTitle(objBackImg.parentNode.parentNode); this.setAriaLabel(objBackImg.parentNode, backRec.label); removeClass(backBtn.parentNode.parentNode, "psc_disabled");  } else {
 backBtnTxt.innerHTML = "Back"; if (typeof objBackImg != "undefined" && objBackImg) {
 this.setAltText(objBackImg); }
 }
 pt_history.save(); }

 
 remoteDataGetter.delGetterComponents(backNavigation.addRemoteBackRec); }
 } catch(e) {}

 },

 
 clearRemotePiaHistory : function(topRec, backRec) {

 try {
 if (this.isRemotePiaContent(topRec, backRec)) { 
 sessionStorage.removeItem("pt_history");  sessionStorage.removeItem("pt_history_last_nui"); }
 } catch(e) {}

 },

 
 isRemotePiaContent : function(refUrl, curUrl) { 
 try {
 
 if (refUrl.search("cmd=") < 0 && refUrl.split("/")[6] != curUrl.split("/")[6]) { return true; }
 return false;  } catch(e) {}
 },

 
 isInHistory : function(h) {

 try {
 var pt_history = getHistoryObject(); var topRec = pt_history.pop(); if (topRec && topRec.url.split("?")[0] == h.url.split("?")[0]) { return true; }
 return false; } catch(e) {}

 },

 setAltText : function(inObj) {
 try {
 
 if (typeof inObj != "undefined" && inObj && inObj.tagName.toUpperCase() == "IMG") { inObj.setAttribute("alt", ""); }
 } catch(e) {} 
 },

 setAriaLabel : function(inObj, histRecLabel) {
 if (typeof inObj != "undefined" && inObj && inObj.tagName.toUpperCase() == "A" && typeof histRecLabel != "undefined" && histRecLabel && histRecLabel != "") 
 { inObj.setAttribute("aria-label", "Back" + ": " + histRecLabel); }
 },

 setTitle : function(inObj) {
 try {
 if (typeof inObj == "undefined" || !inObj) { return; }
 var bAccessible = false; if (typeof winName != "undefined" && winName) { bAccessible = eval("bAccessibility_" + winName); } 
 if (bAccessible) {
 inObj.removeAttribute("title");  } else {
 inObj.setAttribute("title", "Back");  }
 } catch(e) {}
 }


}


var cookieObject = {

 expireDate : new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
 expiredString : "ExpiredCookie",

 
 setCookie : function(name, objValue, expireDuration) {

 try { 
 
 var createCookie = function() {
 var d = new Date(); d.setTime(d.getTime() + expireDuration);  if (typeof objValue.url != 'undefined' && objValue.url) {
 var theUrl = decodeURIComponent(objValue.url);  objValue.url = encodeURIComponent(theUrl); }

 var cv = JSON.stringify(objValue);  cv = cv.replace(/,/g," "); cv = cv.replace(/{/g,""); cv = cv.replace(/}/g,""); cv = '"' + cv + '"'; setCookie(name, cv, d, '/', document.domain, cookieObject.isSecure());  }

 if (typeof name !== "undefined" && name != null && typeof objValue !== "undefined" && objValue != null) { createCookie(); }

 } catch (e) {
 exceptionMessage(e, "cookieObject.setCookie"); }

 },

 
 getCookieValue : function(name) {

 try {
 
 var createCookieValue = function() { 
 var cv = getRawCookieValue(name).replace(/\" \"/g, '","'); cv = cv.substring(1,cv.length-1); cv = "{" + cv + "}";  var cvObj = JSON.parse(cv); if (typeof cvObj.url != 'undefined' && cvObj.url) { 
 cvObj.url = decodeURIComponent(cvObj.url); }

 if (typeof cvObj.label != 'undefined' && cvObj.label) { 
 cvObj.label = decodeURIComponent(cvObj.label); }

 return cvObj;  }

 if (typeof name !== "undefined" && name !== null && getRawCookieValue(name) !== "") { return createCookieValue(); }
 return null; } catch (e) {
 exceptionMessage(e, "cookieObject.getCookieValue"); }

 },

 
 expireCookie : function(name) {

 try {

 var setExpire = function() {
 setCookie(name, this.expiredString, cookieObject.expireDate, '/', document.domain, cookieObject.isSecure()); } 

 if (typeof name !== "undefined" && name!= null) { setExpire(); } 

 } catch (e) {
 exceptionMessage(e, "cookieObject.expireCookie"); }
 
 },

 
 isSecure : function() {

 try {

 var scheme = window.location.href.substr(0,5); var secure = (scheme == "https") ? true : null;  return secure; } catch (e) {
 exceptionMessage(e, "cookieObject.isSecure"); }

 }

}


var remoteDataGetter = {

 iframeId : "ptremotedatagetter",

 
 createGetterComponents : function(contentUrl, postFunctionId, msgEventHandler) { 
 try {
 var idx = refererURL.indexOf("/psc/"); if (idx < 0) { idx = referer.indexOf("/psp/"); } 
 if (idx > 0 && backNavigation.isRemotePiaContent(refererURL, contentUrl)) {

 
 var eRemoteDataGetter = document.createElement("iframe");  eRemoteDataGetter.setAttribute("name", this.iframeId);  eRemoteDataGetter.setAttribute("id", this.iframeId); eRemoteDataGetter.setAttribute("style", "display:none"); document.body.appendChild(eRemoteDataGetter);   var refererURLParts = refererURL.split("/"); eRemoteDataGetterUrl = refererURL.substr(0, idx) + "/psp/" + refererURLParts[4] + "/" + refererURLParts[5] + "/" + refererURLParts[6] + "/ptgetremotedata" + "?d=" + document.domain + "&postFunction=" + postFunctionId; eRemoteDataGetter.setAttribute("src", eRemoteDataGetterUrl);  window.top.addEventListener("message", msgEventHandler, false); } 
 } catch(e) {}
 },

 
 delGetterComponents : function(msgEventHandler) {
 var eBackGetter = document.querySelector("#" + this.iframeId); if (eBackGetter) { eBackGetter.parentNode.removeChild(eBackGetter); }
 window.removeEventListener("message", msgEventHandler); }

}


function exceptionMessage(e, inStr) {
 alert(inStr + " -> " + e.message);}



function exceptionMessageStack(e, fName) {
 var errMessage = "Function '" + fName + "' Error: " + e.message; if (typeof e.stack != "undefined" && e.stack) {
 errMessage += "\nError Stack:\n" + e.stack; }
 alert(errMessage); }
