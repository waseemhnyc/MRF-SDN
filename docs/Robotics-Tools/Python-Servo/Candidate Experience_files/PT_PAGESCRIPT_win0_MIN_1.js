
var gFocusObj = null;var bRichTextEnabled = 0;var gRichTextField = null;var bTimer=null;var objBeforeOrAfterFocusSave = null; var objToBeFocus = null; var gcurSearchRowId = "";var gActiveBtn = null;if (window.showhide == null)
{
window.showhide = function (obj, bShow)
 {
 if (obj == null)
 return; if (!isFModeLayout())
 obj.style.zIndex = 99991; if (bShow)
 {
 var scrollY = ptCommonObj2.getScrollY(); var x = ptCommonObj2.getScrollX(); if (browserInfoObj2.isIE && ("ltr"==="rtl"))
 x = obj.parentNode.scrollWidth - obj.parentNode.clientWidth - obj.parentNode.scrollLeft; x = (x > 0) ? (0-x) : x; if (obj.parentNode.tagName.toLowerCase() !== "body") {
 var topCoord = getPgltTopY(obj);  scrollY = topCoord.y; x = topCoord.x; }
 if (scrollY != 0 || obj.style.top != "") 
  obj.style.top = scrollY+'px'; obj.style.right = x+'px';   obj.style.visibility = "visible"; obj.style.display = "block"; }
 else
 {
 obj.style.visibility = "hidden"; obj.style.display = "none"; }
 }
}

function getPgltTopY(obj) 
{
 
 if (top.ptalPage && top.ptalPage.isAccessibilityMode)
 return 1;  var topY = ptCommonObj2.getScrollY(); var topX = ptCommonObj2.getScrollX(); if (window.ptalPageletArea || (parent && parent.ptalPageletArea))
 var objGP = document.getElementById(this.ptalPageletArea.ptalPagelet.hoverElementId); else
 var objGP= ptUtil.getGrandParent(obj);   if (objGP.style.height != "" && browserInfoObj2.isIE) {
 
 topY = objGP.scrollTop; if ("ltr" === "ltr")
 topX = (objGP.scrollLeft > 0) ? -objGP.scrollLeft : 0; else
 topX = (objGP.offsetLeft > 0 && ((objGP.scrollWidth-objGP.scrollLeft) == objGP.clientWidth))? 0: (0-(objGP.scrollWidth-objGP.scrollLeft-objGP.clientWidth));  }else {
 var gpScrollTop = objGP.scrollTop;  var p = obj.parentNode; while (p && (p.tagName.toLowerCase()!=="li" && p.tagName.toLowerCase()!=="body")) {
 if (p.tagName.toLowerCase() == "div" && p.id.indexOf("WSRPDIV") >= 0)
 break;  p = p.parentNode; }
 if (p) {
 if (p.tagName.toLowerCase()== "body") {
 return {x:topX, y:topY};  }
 
 var pgltTop = 0, pgltHeader = ptUtil.getElemsByClass("PTPAGELETHEADER", p, "table"); if (pgltHeader[0]) {
 pgltTop = pgltHeader[0].offsetHeight + 4; } else { 
 pgltHeader = ptUtil.getElemsByClass("PTPAGELETBODY", p, "table")[0];  if (!pgltHeader) {
 pgltHeader = p;  }
 pgltTop = pgltHeader.offsetTop + 4; }

 if (p.tagName.toLowerCase() === "li" && objGP.style.height != "") {
 
 
 topY = (gpScrollTop <=0 ) ? 0 : gpScrollTop;  topX = (objGP.scrollLeft > 0) ? (0-objGP.scrollLeft) : 0; } else {
 if (p.id.indexOf("WSRPDIV") >= 0) {
 var tempY = ptCommonObj2.getPosition(p).y; topY = (tempY > topY) ? tempY : topY; }
 else { 
 topY = (topY > p.offsetTop) ? (topY - p.offsetTop) : (gpScrollTop ? gpScrollTop + pgltTop : pgltTop); }
 if ((p.offsetLeft + p.offsetWidth) > document.body.clientWidth) {
 topX = (p.offsetLeft + p.offsetWidth) - document.body.clientWidth - document.body.scrollLeft; topX = (topX < 0)? 0 : topX; } else {
 if ("ltr" === "rtl") {
 topX = (p.offsetLeft > 0 && ((document.body.scrollWidth-document.body.scrollLeft) >= document.body.clientWidth))? 0: (0-p.offsetLeft); }else
 topX = 0;  }
 }
 } 
 }
 return {x:topX, y:topY}; }

function setSaveText_win0(txt)
{
var saveobj = document.getElementById("SAVED_win0");if (saveobj)
 {
 if (txt == "") txt = 'Saving...';  document.getElementById("ptStatusText_win0").innerHTML = txt; showhide(saveobj, true); document.getElementById("saveWait_win0").style.display = ""; }
}

function processing_win0(opt,waittime)
{
var waitobj = document.getElementById("WAIT_win0");var saveobj = document.getElementById("SAVED_win0");var saveWaitObj = document.getElementById("saveWait_win0");updateWindowTitleFromFakeBC(); if (opt == 0)
{
 showhide(waitobj, false); showhide(saveobj, false); return;}
if (opt == 1)
{
 if (saveobj && (saveobj.style.visibility != "hidden") && (saveobj.style.display != "none")
 && (saveWaitObj.style.display != "none"))
 return; showhide(waitobj, true); showhide(saveobj, false); if(typeof bTimer != "undefined" && bTimer != null)
 clearTimeout(bTimer); return;}
if (opt == 2)
{
 showhide(waitobj, false); setSaveText_win0('Saved'); if (saveWaitObj)
 saveWaitObj.style.display = "none"; bTimer = setTimeout("processing_win0(0)",waittime);  if ((typeof top.ptaiAguide=='object') && top.ptaiAguide.ptaiItemId!=null && top.ptaiAguide.ptaiItemId)
 {AgPostMessage();}
}
}

function isAltKey(evt)
{
if (!evt && window.event)
 evt = window.event;if (!evt)
 return false;if (evt.altKey)
 return true;if (evt.modifiers)
 return (evt.modifiers & Event.ALT_MASK) != 0;return false;}

function isCtrlKey(evt)
{
if (!evt && window.event)
 evt = window.event;if (!evt)
 return false;if (evt.ctrlKey)
 return true;if (evt.modifiers)
 return (evt.modifiers & Event.CONTROL_MASK) != 0;return false;}

function isShiftKey(evt)
{
if (!evt && window.event)
 evt = window.event;if (!evt)
 return false;if (evt.shiftKey)
 return true;if (evt.modifiers)
 return (evt.modifiers & Event.SHIFT_MASK) != 0;return false;}

function getKeyCode(evt)
{
if (!evt && window.event)
 evt = window.event;if (!evt)
 return 0;if (evt.keyCode)
 return evt.keyCode;if (evt.which)
 return evt.which;return 0;}

function cancelBubble(evt)
{
if (!evt && window.event)
 evt = window.event;if (!evt)
 return;if (typeof evt.cancelBubble != "undefined")
 evt.cancelBubble = true;if (typeof evt.stopPropagation != "undefined" && evt.stopPropagation)
 evt.stopPropagation();}

function isPromptKey(evt)
{
if (isAltKey(evt) && getKeyCode(evt) == "5".charCodeAt(0))
{
 cancelBubble(evt); return true;}
return false;}

function getEventTarget(evt)
{
if (!evt && window.event)
 evt = window.event;if (!evt)
 return null;if (evt.srcElement)
 return evt.srcElement;if (evt.target)
 return evt.target;return null;}

function getModifiers(evt)
{
var res = "";if (isAltKey(evt))
 res += "A";if (isCtrlKey(evt))
 res += "C";if (isShiftKey(evt))
 res += "S";return res;}

var nLastKey_win0 = 0;var oLastKeyEvent = null;var gKeyDownTarget = null;function doKeyDown_win0(evt)
{
oLastKeyEvent = evt;var target = getEventTarget(evt);gKeyDownTarget = target;if (!isFModeLayout() && !PT_handleTabKeyForModalDialog(evt))
 return false;if (target && target.form && target.form.name != "win0")
 return findHandler("doKeyDown_" + target.form.name, evt);nLastKey_win0 = getKeyCode(evt);var bKeyUp = target && target.getAttribute('onkeyup') != null;if (isFModeLayout() && nLastKey_win0 == 13 && bKeyUp)
 evt.preventDefault();if (nLastKey_win0 != "\t".charCodeAt(0)) {

if (isGridNav(evt))
 ptGridObj_win0.doArrowNavGrid(evt);if (isTypeAheadEl(evt))
 ptTAObj_win0.KeyUpDown(evt);if(browserInfoObj2.isSafari && nLastKey_win0 == 27){
 var evt2=document.createEvent('Event'); evt2.initEvent('keypress',true,true); evt2.keyCode=evt.keyCode;  target.dispatchEvent(evt2); }

 return true;}

if (isCtrlKey(evt))
 return tryFocus(oFirstTab_win0);if (isAltKey(evt) || (isShiftKey(evt) && !isGridNav(evt)))
 return true;if (target == oLastTab_win0)
{
if (oFirstTB_win0)
 {
 if (!bTabOverTB_win0)
 return true; }
if (oFirstPg_win0)
 {
 if (!bTabOverPg_win0)
 return tryFocus(oFirstPg_win0); }
if (bTabOverNonPS_win0 || oFirstTB_win0 != null || oFirstPg_win0 != null)
 return tryFocus(oFirstTab_win0);return true;}
if (target == oLastTB_win0)
{
 if (oFirstPg_win0)
 {
 if (!bTabOverPg_win0)
 return tryFocus(oFirstPg_win0); }
 if (bTabOverNonPS_win0 || oFirstPg_win0 != null)
 return tryFocus(oFirstTab_win0); return true;}

if (target == oLastPg_win0)
{
 if (bTabOverNonPS_win0)
 return tryFocus(oFirstTab_win0); return true;}


if (nLastKey_win0 == "\t".charCodeAt(0) && isTypeAheadEl(evt))
{
 ptTAObj_win0.KeyUpDown(evt); return true;}

}

function getLastKey_win0()
{
var nTemp = nLastKey_win0;nLastKey_win0 = 0;return nTemp;}

function doKeyUp_win0(evt)
{
var target = getEventTarget(evt);if (isFModeLayout() && target && (target.getAttribute('onkeyup') != null
 || target.getAttribute('onkeydown') != null))
 return;if (!isFModeLayout() && !PT_handleTabKeyForModalDialog(evt))
 return false;if (target && target.form && target.form.name != "win0")
 return findHandler("doKeyUp_" + target.form.name, evt);var key = getKeyCode(evt);var keyChar = String.fromCharCode(key);if (isCtrlKey(evt) && key == 220) 
 {
 ptConsole2.active(); return false; }
if (keyChar == "\r" && (!(isButton(target) || isRowAct(target)) || !isFModeLayout()) || key == 27)
 {
 
 if (target != null && target.id.indexOf("$delete") != -1)
 {
 if(!evt)return; return; }
 if (key == 27)
 {
 if (typeof (bDoModal_win0) != "undefined" && bDoModal_win0 && modalID != null) 
 doUpdateParent(document.win0, '#ICCancel');  else if (isFModeLayout() && bInModal)
 submitAction_win0(document.win0, '#ICCancel'); return; } 
 if (isFModeLayout() && key == 27)
 closeLastModal(evt, target); return; }

if (!routeKeyEvent(evt))
 return false;var bAlt = isAltKey(evt);var bCtrl = isCtrlKey(evt);var bNotMine = false;if (bAlt)
 {
 if (bCtrl || altKey_win0.indexOf(keyChar) < 0)
 {
 if (keyChar == "9" || key == 220 || key == 186)
 return true; else if(keyChar == "2")
 if(bCtrl)
 bNotMine = true; else
 bNotMine = false; else if(keyChar == "3" || keyChar == "4")
 if(bCtrl)
 bNotMine = true; else
 bNotMine = false; else
 bNotMine = true; }
 }
else if (bCtrl)
 {
 if (key == 88 || key == 120) 
 {
 ptConsole2.deactive(); return false; }
 keyChar = String.fromCharCode(key | 0x40); if (ctrlKey_win0.indexOf(keyChar) < 0)
 bNotMine = true; }
else if ((key == 32 || key == 13) && (isButton(target)) || (key == 13 && isRowAct(target)))
 {
 bNotMine = false; }
else
 {
 if (baseKey_win0.indexOf(keyChar) < 0)
 bNotMine = true; }

if (bNotMine) {

 
 if (bAlt || bCtrl) {
 
 
 var navFrame = parent.frames["NAV"]; if (!navFrame) {
 navFrame = parent.frames["UniversalHeader"]; } 
 if (navFrame && navFrame.parentKeyHandler && !isCrossDomain(navFrame)) {
 navFrame.parentKeyHandler(window, key, bAlt, bCtrl);  } else if (parent.ptIframe && parent.ptIframe.parentKeyHandler && !isCrossDomain(parent)) {
 parent.ptIframe.parentKeyHandler(window,key,bAlt,bCtrl); } else if (parent.parent.ptIframe && parent.parent.ptIframe.parentKeyHandler && !isCrossDomain(parent.parent)) {
 parent.parent.ptIframe.parentKeyHandler(window,key,bAlt,bCtrl); }
 }
 if (isGridNav(evt)) 
 ptCommonObj2.terminateEvent(evt); if (isTypeAheadEl(evt)) 
 ptTAObj_win0.GiveOptions(evt); return true;}


var code = getModifiers(evt) + keyChar;if (target && target.name)
 document.win0.ICFocus.value = target.name;if (code == "A8")
 if (!doDeleteKey_win0(target))
 return false;if (code == "A\xbf")
{
 if (window.FindString_win0
 && document.win0.ICFind
 && findScroll(target))
 {
 if (!FindString_win0(document.win0.ICFind))
 return false; }
else
 return false
}

if (code == "A7")
 if (!doInsertKey_win0(target))
 return false;if (code == "A\xbc" || code == "A\xbe" || code == "A\xde")
 if (!activeLink(target,code))
 return false;if (code == 'A5')
{
var id_s = target.id.split("$")[0];var occ_s = target.id.split("$")[1];var pid = id_s+"$prompt";if (occ_s && typeof occ_s != "undefined")
pid +="$"+occ_s;var pobj = document.getElementById(pid);var operation = "";if (!pobj || typeof pobj == "undefined" ) {
 pid = id_s+"$spellcheck"; if (occ_s && typeof occ_s != "undefined")
 pid +="$"+occ_s; pobj = document.getElementById(pid); if (pobj && typeof pobj != "undefined" ) operation = "$spellcheck"; }

if (!pobj || typeof pobj == "undefined" ) {
 pid = target.id+"$prompt"; pobj = document.getElementById(pid); if (!pobj || typeof pobj == "undefined" )
 return false;}
}

if (key == 13 && !ptCommonObj2.isSearchPage(target.form)
 || (key == 32 || key == 13) && isButton(target)
 || key == 13 && isRowAct(target)) 
{ 
 if (target.getAttribute('onclick') != null && (target.getAttribute('href') == null || key == 32 && target.getAttribute('href') == 'javascript:void(0);')) {
 if (isFModeLayout() && target != gKeyDownTarget) return;  target.onclick(); return; }
 else if (modalZoomName != null) {
 doUpdateParent(document.win0, '#ICReturn'); return; }
 else if (isFModeLayout()) { 
 if (target != gKeyDownTarget || key == 13 && typeof target.tagName != "undefined" && (target.tagName == "a" || target.tagName == "A"))
 return; var sScript = target.getAttribute('href'); var bScript = (isOnClickCancelBubble(target) && sScript != null && sScript.indexOf("javascript:") != -1) ? true : false; if (bScript) eval(sScript); return; } 
 else if (typeof event != "undefined")
 submitAction_win0(document.win0, event.srcElement.id); else 
 submitAction_win0(document.win0, evt.target.id);}else
{
if (target && target.form)
 addchg_win0(target);if (code == 'A5'){
 submitAction_win0(document.win0, "#KEY" + code + operation, target.id);}else if(bAlt){
 if(key == 49) 
 setSaveText_win0('Saving...', true, false);  if(altKey_win0.indexOf(keyChar) >= 0 || keyChar == "2" || keyChar == "3" || keyChar == "4"){
 var tmpToolPB = null; if(keyChar == "2" && (((tmpToolPB = document.getElementById("#ICList")) == null) || tmpToolPB.disabled))
 return false; if(keyChar == "3" && (((tmpToolPB = document.getElementById("#ICNextInList")) == null) || tmpToolPB.disabled))
 return false; if(keyChar == "4" && (((tmpToolPB = document.getElementById("#ICPrevInList")) == null) || tmpToolPB.disabled))
 return false; if(keyChar == "2" || keyChar == "3" || keyChar == "4"){
 var url = "javascript:submitAction_win0(document.win0, \'#KEY" + code + "\')"; if (!saveWarning("", null, "", url))
 return false; }
 if( !ptCommonObj2.isSearchPage(target.form) && (code == "A\xbc" || code == "A\xbe" || code == "A\xde") && gActiveBtn && target.name == null)
 {
 document.win0.ICFocus.value = gActiveBtn.name
 submitAction_win0(document.win0, gActiveBtn.name); }
 else
 submitAction_win0(document.win0, "#KEY" + code);  }
}else{
 submitAction_win0(document.win0, "#KEY" + code);}
}

return false;}

function delPageBarAndTabs()
{
var obj = document.getElementById('win0divPAGEBAR');if(obj != null && typeof obj != 'undefined')
 obj.innerHTML = "";obj = document.getElementById('win0divPSPANELTABS');if(obj != null && typeof obj != 'undefined')
 obj.innerHTML = "";obj = document.getElementById('win0divPSPANELTABLINKS');if(obj != null && typeof obj != 'undefined')
 obj.innerHTML = "";}

function activeLink(obj, akey)
{
var scrl = findScroll(obj);var btnid;if (!scrl) {
 
 if (akey == "A\xbc")
 btnid = "#ICPrevPage"; else if (akey == "A\xbe")
 btnid = "#ICNextPage"; else
 return false; var btn = document.getElementById(btnid); if (btn)
 return true; else
 return false; }
if (akey == "A\xbc")
 btnid = "\$hup\$";else if (akey == "A\xbe")
 btnid = "\$hdown\$";else if (akey == "A\xde")
 btnid = "\$hviewall\$";btnid = scrl.id.replace(/\$scroll[im]?\$/,btnid);var btn = document.getElementById(btnid);gActiveBtn=btn;if (btn)
 return true;return false;}

function findHandler(handlerName, evt)
{
var obj = window[handlerName];if (typeof obj == "function")
 return obj(evt);return true;}

function keyHandler(keyCode, bIsAlt, bIsCtrl)
{
return keyHandler_win0(keyCode, bIsAlt, bIsCtrl);}

function keyHandler_win0(keyCode, bIsAlt, bIsCtrl)
{
var keyChar = String.fromCharCode(keyCode);var code = "";if (bIsAlt)
{
 code = "A"; if (bIsCtrl || altKey_win0.indexOf(keyChar) < 0)
 return false;}
else if (bIsCtrl)
{
 code = "C"; keyChar = String.fromCharCode(keyCode | 0x40); if (ctrlKey_win0.indexOf(keyChar) < 0)
 return false;}
else
 return false;code += keyChar;if (code == "A8" || code == "A\xbf" || code == "A7")
 return false;if (target && target.form)
 addchg_win0(target);submitAction_win0(document.win0, "#KEY" + code);return true;}

function doDeleteKey_win0(obj)
{
if (!window.DeleteCheck2_win0)
 return false;var scroll = findScroll(obj);if (!scroll)
 return false;var bFocusable = true;if((obj.nodeName == 'BODY' || obj.id.length == 0) && preID_win0!= null ) {
 var temp = obj.ownerDocument.getElementById(preID_win0); if(typeof temp != 'undefined')
 obj=temp; bFocusable = false;}
if (scroll.id.search(/^(.*)(\$scroll[im]?\$)(.*)$/,"$fdelete$") < 0)
 buttonid = scroll.id;else
 buttonid = RegExp["$1"] + "$fdelete$" + RegExp["$3"];if (document.getElementById(buttonid))
 return DeleteCheck2_win0(buttonid);if(bFocusable) {
if (obj.id == null || obj.id.search(/\$(\d*)(\$\$\d*)?$/) < 0)
 return false;}
else {
 if (obj.id == null || obj.id.search(/tr(.*)\$(\d*)_row(\d*)?/) < 0)
 return false;}
var row = bFocusable ? RegExp.$1 : RegExp.$3 - 1 ;if (buttonid.search(/^(.*)(\$fdelete\$)(.*)$/) < 0)
 return false;buttonid = RegExp["$1"] + "$delete$" + row + "$$" + RegExp["$3"];if (document.getElementById(buttonid))
 return DeleteCheck2_win0(buttonid);return false;}

function doInsertKey_win0(obj)
{
if (!window.AddMultiple_win0)
 return false;var scroll = findScroll(obj);if (!scroll)
 return false;var bHasInsertBtn = false;if (scroll.id.search(/^(.*)(\$scroll[im]?\$)(.*)$/,"$fnew$") < 0)
 buttonid = scroll.id;else
 buttonid = RegExp["$1"] + "$fnew$" + RegExp["$3"];if (document.getElementById(buttonid))
 bHasInsertBtn = true;if (obj.id == null || obj.id.search(/\$(\d*)(\$\$\d*)?$/) < 0)
 return false;var row = RegExp.$1;if (buttonid.search(/^(.*)(\$fnew\$)(.*)$/) < 0)
 return false;buttonid = RegExp["$1"] + "$new$" + row + "$$" + RegExp["$3"];if (!bHasInsertBtn)
{
 if(document.getElementById(buttonid))
 bHasInsertBtn = true;}
if (!bHasInsertBtn)
{
 
 buttonid = RegExp["$1"] + "$newm$" + row + "$$" + RegExp["$3"]; if(document.getElementById(buttonid))
 bHasInsertBtn = true;}
if (bHasInsertBtn)
{
 if (scroll.id.match(/\$scrollm\$/))
 return AddMultiple_win0(document.win0.ICAddCount); if (scroll.id.match(/\$scrolli\$/))
 return true;}
return false;}

function findScroll(obj)
{
var temp = null;if(obj.nodeName == 'BODY' && preID_win0 != null ) {
 temp = obj.ownerDocument.getElementById(preID_win0); if(typeof temp != 'undefined')
 obj=temp;}

while (obj)
{
 if (typeof obj.id != "undefined")
 if (obj.id.match(/\$scroll/))
 return obj; if (typeof obj.parentNode != "undefined")
 obj = obj.parentNode; else if (typeof obj.offsetParent != "undefined")
 obj = obj.offsetParent; else
 return null;}
}

if (window.doKeyPress_win0 == null)
{
window.doKeyPress_win0 = function (evt)
 {
 oLastKeyEvent = evt; var event = evt ? evt : window.evt; var target = getEventTarget(event); if (target && target.form)
 addchg_win0(target); if (isFModeLayout() && target && (target.getAttribute('onkeyup') != null
 || target.getAttribute('onkeydown') != null))
 return; if (target && target.form && target.form.name != "win0")
 return findHandler("doKeyPress_" + target.form.name, event); var key = getKeyCode(event); var keyChar = String.fromCharCode(key); if (key==27) 
 {
 if (!(glObjTr.isEmpty(glObjTr.sOpen))){
 glObjTr.removePrevMenu(event); return true; }

 if(typeof window.bEscOnCal != 'undefined' && window.bEscOnCal == true){
 window.bEscOnCal = false; return; }

 
 if (!isFModeLayout() && MOpopupObj_win0 && typeof(MOpopupObj_win0.bIs_shown) != "undefined" && MOpopupObj_win0.bIs_shown)
 return MOpopupObj_win0.StopAccess(event);  if (typeof (bDoModal_win0) != "undefined" && bDoModal_win0)
 return true; else if (isTypeAheadEl(event)) 
 return true; }

 if (keyChar != "\r" && key != 27)
 return true;   var objGridZoom = document.getElementById("ICZoomGrid"); if (objGridZoom && typeof objGridZoom != "undefined")
 {
 if (keyChar == "\r" && !(target.href || typeof target.onclick == "function") && objGridZoom.value == 1 && target.id != "ICOKZG")
 return true; }


 
 if (!routeKeyEvent(event))
 return false; if (target && key != 27)
 {
 if (!isOnClickCancelBubble(target) && (typeof target.onclick == "function" || target.href)
 && target.type != "radio" && target.type != "checkbox")
 return true; if (target.type == "textarea")
 return true; if (key != 13 && isOnClickCancelBubble(target))
 return true; }
 var code = getModifiers(event) + keyChar; if (target && target.name)
 document.win0.ICFocus.value = target.name;   if (key == 13) {
 if (isTypeAheadEl(event) && ptTAObj_win0.IsGrabHighlighted()) {
 return false; } 

 if (isFModeLayout() && isPopupRequest(target.form, target.id))
 return false; var sScript = target.getAttribute('href'); var bSubmitScript = (sScript != null && sScript.indexOf("javascript:") != -1) ? true : false; if (bSubmitScript) { eval(sScript); return false; }
 }

 submitAction_win0(document.win0, "#KEY" + code); return false; }
}


function isOnClickCancelBubble(target)
{
 if (!target || typeof target.onclick != "function") return false; var sString = String(target.onclick); if (sString.indexOf("javascript:cancelBubble(event);") == -1)
 return false; return true;}

var oFirstTab_win0 = null;var oLastTab_win0 = null;var oFirstTB_win0 = null;var oLastTB_win0 = null;var oFirstPg_win0 = null;var oLastPg_win0 = null;var nFirstTBIndex = 5000; var nFirstPgIndex = 10000;function checkTabIndex(obj)
{
if (obj.tabIndex && obj.tabIndex >= 0)
{
 if (obj.tabIndex < nFirstTBIndex)
 {
 if (oLastTab_win0 == null || obj.tabIndex > oLastTab_win0.tabIndex)
 oLastTab_win0 = obj; if (oFirstTab_win0 == null || obj.tabIndex < oFirstTab_win0.tabIndex)
 oFirstTab_win0 = obj; }
 else if (obj.tabIndex < nFirstPgIndex)
 {
 if (oLastTB_win0 == null || obj.tabIndex > oLastTB_win0.tabIndex)
 oLastTB_win0 = obj; if (oFirstTB_win0 == null || obj.tabIndex < oFirstTB_win0.tabIndex)
 oFirstTB_win0 = obj; }
 else
 {
 if (oLastPg_win0 == null || obj.tabIndex > oLastPg_win0.tabIndex)
 oLastPg_win0 = obj; if (oFirstPg_win0 == null || obj.tabIndex < oFirstPg_win0.tabIndex)
 oFirstPg_win0 = obj; }
}
}

function setEventHandlers_win0(sFirst, sLast, bMac)
{
var focus1, focus2;focus1 = function (evt) {doFocus_win0(this, true, true);};focus2 = function (evt) {doFocus_win0(this, false, true);};fchange = function(evt) {addchg_win0(this); };var i;if (sFirst!="")
{
 var docanchors = null; if (isFModeLayout())
 docanchors = document.querySelectorAll('A,.psc_rowact[tabindex]'); else
 docanchors = document.anchors; var docanclen = docanchors.length; for (i = 0; i < docanclen; ++i)
 {
 if (docanchors[i].id == sFirst) break; }
 for (++i; i < docanclen; ++i)
 {
 var anc = docanchors[i]; if (anc.id == sLast) break; checkTabIndex(anc); checkAccessKeys(anc); if (typeof anc.onfocus != "function")
 anc.onfocus = focus1; }
}

var frm = document.win0;if (!frm) return;var frmlen = frm.length;objBeforeOrAfterFocusSave = null; var objBefore = null; var bAfter = 0; var b = navigator.userAgent.toLowerCase();var bIE = browserInfoObj2.isIE;var bIE8 = (bIE && b.indexOf("trident/4.0;") != -1) ? 1:0; for (i = 0; i < frmlen; ++i)
{
 var frmi = frm[i];  if (frmi.type=="hidden") 
 continue;    if (bIE8 && objToBeFocus && !objBeforeOrAfterFocusSave && !frmi.isDisabled &&
 !(frmi.offsetParent && frmi.offsetParent.offsetParent && frmi.offsetParent.offsetParent.offsetParent &&
 frmi.offsetParent.offsetParent.className == "PSPAGECONTAINER" && frmi.offsetParent.offsetParent.offsetParent.style.visibility == "hidden") ) 
 {
 if (frmi.id != objToBeFocus)
 {
 objBefore = frmi; if (bAfter && objBefore) 
 {
 objBeforeOrAfterFocusSave = objBefore; bAfter = 0; }
 }
 else 
 {
 if (objBefore)
 objBeforeOrAfterFocusSave = objBefore; else
 bAfter = 1; }
 } 
 
 checkTabIndex(frmi); checkAccessKeys(frmi); if (typeof frmi.onblur != "function") {
 frmi.onblur = fchange; }

 if (typeof frmi.onchange != "function") {
 frmi.onchange = fchange; }

 if (typeof frmi.onfocus != "function")
 { 
 if (!isOnClickCancelBubble(frmi) && typeof frmi.onclick == "function")
 frmi.onfocus = focus1; else
 frmi.onfocus = focus2; }
}
}
if (window.setKeyEventHandler_win0 == null)
{
 window.setKeyEventHandler_win0 = function ()
 {
 if (typeof(baseKey_win0) != "undefined")
 {
 document.onkeyup = doKeyUp_win0; if (baseKey_win0.indexOf("\r") >= 0 || baseKey_win0.indexOf("\x1b") >= 0)
 document.onkeypress = doKeyPress_win0; }
 document.onkeydown = doKeyDown_win0; }
}
var oTop = null;var oBottom = null;if (window.routeKeyEvent == null)
 {
 window.routeKeyEvent = function(evt)
 {
 if (!isAltKey(evt) || isCtrlKey(evt))
 return true; var key = getKeyCode(evt); var keyChar = String.fromCharCode(key); if (keyChar == "9" && oTop != null)
 {
 oTop.focus(); return false; }
 if (key == 220 && oBottom != null)
 {
 oBottom.focus(); return false; }
 return true; }
 }
if (window.checkAccessKeys == null)
{
window.checkAccessKeys = function(obj)
{
 var attr = obj.getAttribute("PSaccesskey"); if (attr == "9")
 oTop = obj; else if (attr == "\\")
 oBottom = obj;}
}

function setFocus_win0(fldname, indx, oDoc0)
{

if (isFModeLayout()&& isTouchKeyboard()) return;if (isFModeLayout() && (fldname.indexOf("$hdown") != -1 || fldname.indexOf("$srt") != -1)) {
 if (gKeyDownTarget) 
 fldname = gKeyDownTarget.id; else {
 DoTabbing(null, null, true); return; }
}

gRichTextField = fldname;if(typeof CKEDITOR != 'undefined')
 {
 for ( var instanceName in CKEDITOR.instances )
 {
 if (instanceName == fldname)
 {
 bRichTextEnabled = 1; gRichTextField = fldname; }
 }
 }

if (bRichTextEnabled == 0)
 {
 var oDoc = null; if (!oDoc0 || typeof oDoc0 == "undefined")
 oDoc = document; else
 oDoc = oDoc0;  var obj = null; if (oDoc.win0)
 {
 obj = oDoc.win0.elements[fldname]; if (!obj)
 obj = oDoc.win0[fldname]; }
 
 if (!obj)
 obj = oDoc.getElementById(fldname);  if (!obj) 
 { 
 findFocusableElement(fldname); return false;  }
 
 if (indx >= 0 && obj.length && indx < obj.length)
 obj = obj[indx]; if (isFModeLayout()) 
 expandParent(obj); if (!oDoc0 || typeof oDoc0 == "undefined")
 return !tryFocusNew(obj); else
 return !tryFocus0New(obj); }
}


function findFocusableElement(fldname)
{
 var currentNode = document.getElementById(document.win0.name+"div"+fldname); if(currentNode)
 {
 var element ; var b = navigator.userAgent.toLowerCase();  var bIE = browserInfoObj2.isIE; var bIE8 = (bIE && b.indexOf("trident/4.0;") != -1) ? 1:0; if(!bIE8)
 {
 if(currentNode.parentNode.parentNode.parentNode.parentNode.nodeName == "TABLE")
 {
 
 var nodeList = currentNode.parentNode.parentNode.parentNode.parentNode.querySelectorAll("input, a, textarea"); if(nodeList) {
 for (var i = 0; i < nodeList.length; i++)
 {
 element = nodeList[i]; if( element && element.tabIndex > 0 && element.type != "hidden")
 { try{
 tryFocus0New(element);  break;  }
 catch(e){
 return; }

 }
 } 
 }
 }
 }
 else
 {
 
 var element ; for (var i = 0; i < document.win0.elements.length; i++)
 {
 element = document.win0.elements[i]; if( element && element.tabIndex > 0 && element.type != "hidden" ) 
 { 
 try{
 tryFocus0New(element);  break;  }
 catch(e){
 return; }
 }
 } 
 }

 }


 return false;}


function tryFocusNew(obj)
{
if (!tryFocus0New(obj))
 gFocusObj = obj;return;}


function tryFocus0New(obj)
{
 if (obj && typeof obj.focus != "undefined" && !obj.disabled && obj.style.visibility!="hidden")
 {
 var bIE = browserInfoObj2.isIE; var bNeedDelay = bIE;  var tgName = null;  if (typeof obj.tagName != "undefined")
 tgName = (obj.tagName).toLowerCase();  var objType = null; if (typeof obj.type != "undefined")
 objType = (obj.type).toLowerCase();   if (bNeedDelay && tgName != null && objType != null)
 {
 if (!(tgName.indexOf("select") ==0 || tgName.indexOf("input") ==0 || tgName==="a"))
 bNeedDelay = 0; else if (tgName.indexOf("input") == 0)
 {
 if (!(objType.indexOf("checkbox") ==0 || objType.indexOf("radio") ==0 || objType.indexOf("text") ==0 || objType.indexOf("password") ==0) ) 
 bNeedDelay = 0; }
 }

 
 if (!bNeedDelay || obj.id == "" || tgName == null || objType == null)
 {
 if (obj.focus)
 {
 try { 
 obj.focus(); }
 catch (err) {
 return true; }
 }
 else if (obj.setActive){
 obj.setActive(); }
 }
 else 
 {
 MTop().bSetFocusComplete = false; setTimeout(function(){delayFocus(obj.id);}, 0);  } 
 
 if (window.focusHook)
 focusHook(obj); var gn = isGridEl(null,obj.id); if (gn != null)
 ptGridObj_win0.doScrollOnFocus(gn, obj); return false; }
return true;}

function tryFocus(obj)
{
if (!tryFocus0(obj))
 gFocusObj = obj;return;}

function tryFocus0(obj)
{
if (obj && typeof obj.focus != "undefined" && !obj.disabled && obj.style.visibility!="hidden")
 {
 if (obj.focus)
 {
 try { 
 obj.focus(); }
 catch (err) {
 return true; }
 }
 else if (obj.setActive)
 obj.setActive();  if (window.focusHook)
 focusHook(obj); var gn = isGridEl(null,obj.id); if (gn != null)
 ptGridObj_win0.doScrollOnFocus(gn, obj); return false; }
 
return true;}


function setFocusSecPageMessage_win0()
{
var obj;if ((typeof bAccessibility_win0 != 'undefined') && (bAccessibility_win0)) 
 {
 obj = document.getElementById("MessageTitle_win0"); if (obj)
 return tryFocus(obj); }
obj = document.getElementById("#ICOK");if (obj)
 return tryFocus(obj);obj = document.getElementById("#ICYes");if (obj)
 return tryFocus(obj);obj = document.getElementById("#ICAbort");if (obj)
 return tryFocus(obj);obj = document.getElementById("#ICRetry");if (obj)
 return tryFocus(obj);}


function delayFocus(id) 
{ 
if (id == "")
 return;var obj = document.getElementById(id);var tgName = obj.tagName;if (tgName.indexOf("SELECT") >=0) 
 { 
 if (objBeforeOrAfterFocusSave)
 try {
 objBeforeOrAfterFocusSave.focus();  }
 catch (err)
 {} 
 }
else if (tgName.indexOf("INPUT") >=0) 
 {
 var idArray = id.split("$"); var tmp = idArray[0]; idArray.shift(); var promptId = tmp.concat("$prompt$", idArray.join()); var fObject = document.getElementById(promptId);  var popupId = tmp.concat("$popup"); var fObject2 = document.getElementById(popupId);  if (fObject)
 fObject.focus(); else if(fObject2)
 fObject2.focus(); else
 {
 if (objBeforeOrAfterFocusSave)
 {
 try {
 objBeforeOrAfterFocusSave.focus(); }
 catch (err)
 {} 
 }
 }
 }


if (obj.focus)
 {
 try {
 obj.focus();  } 
 catch (err)
 {} 
 }
else if (obj.setActive)
 obj.setActive(); MTop().bSetFocusComplete = true;}


if (typeof CKEDITOR != 'undefined') CKEDITOR.on( 'instanceReady', function( ev )
{
 ev.editor.dataProcessor.writer.setRules( 'p',
 {
 indent : false,
 breakBeforeOpen : false,
 breakAfterOpen : false,
 breakBeforeClose : false,
 breakAfterClose : false
 });for ( var instanceName in CKEDITOR.instances )
{
if (instanceName == gRichTextField)
{
CKEDITOR.instances[instanceName].focus();}
}
});function keyPressHandler(e)
{
 var kCode = (window.event) ? event.keyCode : e.keyCode;  return kCode;}


function UpdateEditorLinkedField()
{
 for ( var instanceName in CKEDITOR.instances )
 {
 if (document.getElementById(instanceName) != null)
 replaceImageSource(instanceName); }
}


function positionWAIT_win0(){
var waitobj = null;var savedobj = null;var objFrame = top.frames['TargetContent'];if (objFrame) {
 waitobj = objFrame.document.getElementById("WAIT_win0"); savedobj = objFrame.document.getElementById("SAVED_win0");}
else {
 waitobj = document.getElementById("WAIT_win0"); savedobj = document.getElementById("SAVED_win0");}

if (waitobj && waitobj.style.display != "none" && waitobj.style.visibility != "hidden")
 keepObjTopRight(waitobj);if (savedobj && savedobj.style.display != "none" && savedobj.style.visibility != "hidden")
 keepObjTopRight(savedobj);}

function isGridEl(evt,objid)
{
if (typeof ptGridObj_win0 == "undefined" || !ptGridObj_win0)
 return null;if (typeof gridList_win0 == "undefined" || typeof gridFieldList_win0 == "undefined")
 return null;var obj = null;var id = '';var nRowCnt = 0;var idarr = '';if (!objid || typeof objid == "undefined") {
 obj = getEventTarget(evt); if (!obj || !obj.id) return null; id = obj.id; nRowCnt = 0; idarr = id.split("$"); if (idarr.length<2) return null; if (isNaN(idarr[1]))
 nRowCnt = idarr[2]; else
 nRowCnt = idarr[1];}
else {
 id = objid; idarr = id.split("$"); if (idarr.length<2) return null; nRowCnt = idarr[1];}

for (var i = 0; i < gridList_win0.length; i++)
{
var gn = gridList_win0[i][0];var gc = document.getElementById('divgc'+gn);if (!gc || typeof gc == "undefined") continue;var gfields = gridFieldList_win0[i];for (var j = 0; j < gfields.length; j++)
{
 var gfield = gfields[j].replace(/%c/,nRowCnt); if (id==gfield)
 return gn;}
}
return null;}



function getGridRowID(oContrl)
{
 var obj = oContrl; var bGrid = false; if (!obj)
 return null; if (!obj.id)
 return null;  while (obj && obj.tagName != 'HTML' && obj.tagName != 'FORM')
 {
 if (obj.tagName == "TD")
 {
 if (obj.className.indexOf("GRIDROW") != -1 || obj.className.indexOf("GRIDODDROW") != -1 || obj.className.indexOf("GRIDEVENROW") != -1) 
 {
 bGrid = true; obj = obj.parentNode; continue; }
 else
 return null; }
 
 
 else if (bGrid && (obj.nodeName).indexOf("TR")==0 && ( (obj.id).indexOf("tr")==0 || (obj.id).indexOf("ftr")==0) ) 
 {
 if (isMoreThanOneGridRow(obj)) 
 return obj.id; else
 return null; }
 else
 obj = obj.parentNode; } 
 

 return null;}


function getNextSibling(obj)
{
 if (!obj)
 return null; var oElement = obj.nextSibling; while (oElement) 
 {
 if (oElement.nodeType == 1)
 return oElement;  else
 oElement = oElement.nextSibling; } 

 return null;}


function getPrevSibling(obj)
{
 if (!obj)
 return null; var oElement = obj.previousSibling; while (oElement) 
 {
 if (oElement.nodeType == 1)
 return oElement;  else
 oElement = oElement.previousSibling; } 

 return null;}



function isMoreThanOneGridRow(oRowObject)
{
 if (!oRowObject)
 return false;  var nCnt=1; var objNextSib = getNextSibling(oRowObject); var objPrevSib = getPrevSibling(oRowObject); if (objNextSib && (objNextSib.nodeName).indexOf("TR")==0 && ((objNextSib.id).indexOf("tr") == 0 || (objNextSib.id).indexOf("ftr") == 0) )
 nCnt++; if (objPrevSib && (objPrevSib.nodeName).indexOf("TR")==0 && ((objPrevSib.id).indexOf("tr") == 0 || (objPrevSib.id).indexOf("ftr") == 0) )
 nCnt++; return (nCnt > 1 ? 1 : 0);}

function isGridNav(evt)
{
var gn = this.isGridEl(evt);if (typeof ptGridObj_win0 != "undefined" && ptGridObj_win0 && gn != null)
{
 evt= (evt)? evt: ((event)? event:null); var key = getKeyCode(evt); if (isShiftKey(evt) && key<=40 && key>=37)
 return true;}
return false;}



function initTypeAheadEl(el) {
 var oWin = window; var oDoc = document; var form = el.form; var pId = el.id + "$prompt"; if (document.getElementById(pId))
 icAction = pId; else if (ptCommonObj2.isSearchSearchPage(form)) 
 icAction = '#ICSrchTypAhd'; else 
 {
 var nsuffixIndex = el.id.lastIndexOf('$'); if (nsuffixIndex > -1)
 {
 var fname = el.id.slice(0, nsuffixIndex); var nsuffix = el.id.slice(nsuffixIndex + 1, el.id.length); }
 else
 var fname = el.id; icAction = fname + "$prompt"; if (nsuffixIndex > -1)
 icAction += "$" + nsuffix; }
 var serverScript = "ptTAObj_win0.oWin.pAction_win0(ptTAObj_win0.oDoc.win0,'" + icAction + "');"; el.obj = oWin.ptTAObj_win0.SetProperties(el, 0, form.ICTypeAheadID, serverScript, true, false, false, true, true, 500);  }

 function removeOccursNum(fname) {
 
 var i1 = fname.indexOf('$');  if (i1 < 0) 
 return fname; if (fname.length == i1+1) 
 return fname; var i2 = fname.indexOf('$', i1+1);  if (i2 < 0) 
 return fname.substring(0, i1); if (fname.length == i2+1) 
 return fname; return fname.substring(0, i2+1);  }


 function isTypeAheadEvtTgt(el,kCode) {
 if (el && el.form && !el.form.ICTypeAheadID) return false; if(typeof kCode != 'undefined'){
 if (!el || el.type != 'text' || (el.value == "" && kCode == 9)) return false; }else{
 if (!el || el.type != 'text' || el.value == "") return false; }
 if (typeof el.obj != 'undefined')
 return true; else if (typeof PFieldList_win0 != 'undefined' && PFieldList_win0) {
 var fname = removeOccursNum(el.id); for (var i = 0; i < PFieldList_win0.length; i++) {
 if (fname == PFieldList_win0[i][0] || el.id == PFieldList_win0[i][0]) {
 initTypeAheadEl(el); return true; }
 }
 }
 if (ptCommonObj2.isSearchSearchPage(el.form)) {
 if (typeof EFieldList_win0 != 'undefined' && EFieldList_win0) {
 for (var i = 0; i < EFieldList_win0.length; i++) {
 if (fname == EFieldList_win0[i][0] || el.id == EFieldList_win0[i][0]) {
 initTypeAheadEl(el); return true; }
 }
 }
 }
 return false; }


function isTypeAheadEl(evt)
{
 var el = getEventTarget(evt); var kCode = getKeyCode(evt); return isTypeAheadEvtTgt(el,kCode);}

function isTypeAheadField(id)
{
 var el = document.getElementById(id); return isTypeAheadEvtTgt(el);}

function GenerateABN() {

 
 var abnContainer = document.getElementById("ptabncontainer"); if (abnContainer) {

 
 var abnBCContainer = document.getElementById("ptabnbccontainer");  var abnFlyOutContainer = document.getElementById("ptabnfocontainer");  if (abnBCContainer)
 {
 var abnBCData = abnBCContainer.removeChild(abnBCContainer.firstChild); abnBCContainer.parentNode.removeChild(abnBCContainer); }

 
 if (abnFlyOutContainer)
 {
 var abnFlyOutData = abnFlyOutContainer.parentNode.removeChild(abnFlyOutContainer); }

 
 if (abnContainer) {
 var abnData = abnContainer.removeChild(abnContainer.firstChild); abnContainer.parentNode.removeChild(abnContainer); }

 try {
 if (!isCrossDomain(parent) && typeof(parent.ptIframe) !== "undefined") {
 if (typeof(parent.pthNav) !== "undefined") {
 
 parent.pthNav.abn.updateBC(abnBCData, abnFlyOutData); parent.pthNav.abn.addData(abnData); }
 }
 } catch (e) {}
 }

}

function UpdateBreadCrumbs() {

 bcUpdater.updateBreadCrumbs(document.win0); bcUpdater.removeRemoteData();  backNavigation.setCookie(); if (!isFModeLayout()) {
 updClassicHistory()
 }

}


function GetDomData(form, szTC, szActionName) {
 
 if (typeof bGenDomInfo == 'undefined' || bGenDomInfo == null || !bGenDomInfo)
 return;   var divHiddenFields = document.querySelector("#" + "win0" + "divPSHIDDENFIELDS")
 if (typeof refererURL != 'undefined' && refererURL && divHiddenFields) {
 var urlParts = refererURL.split("?");  if (urlParts.length > 1 && divHiddenFields) {
 var qsStringParams = urlParts[1].split("&"); for (var i = 0; i < qsStringParams.length; i++) {
 var qsNameValue = qsStringParams[i].split("=");  var inputEl = divHiddenFields.querySelector("#" + qsNameValue[0]); if (typeof inputEl == "undefined" || !inputEl) { inputEl = document.createElement("input"); } 
 inputEl.setAttribute("type", "hidden"); inputEl.setAttribute("name", qsNameValue[0]);  inputEl.setAttribute("id", qsNameValue[0]); inputEl.setAttribute("value", qsNameValue[1]); divHiddenFields.appendChild(inputEl); } 
 }
 }

 form.target = szTC; form.ICAction.value = szActionName; submitAction_win0(form, szActionName);}

function GenerateFakeBC() {

 
 var bcContainer; try {
 if(top.frames['TargetContent'] && top.frames['TargetContent'].document)
 bcContainer = top.frames['TargetContent'].document.getElementById("pt_fakeBC"); }
 catch (e) {}

 if (bcContainer) {

 
 var abnBCData = bcContainer.removeChild(bcContainer.firstChild); bcContainer.parentNode.removeChild(bcContainer); try {
 if (!isCrossDomain(parent) && typeof(parent.ptIframe) !== "undefined") {
 if (typeof(parent.pthNav) !== "undefined") {
 
 parent.pthNav.FakeBCUpdate(abnBCData);  }
 }
 } catch (e) {}
 return; } 
}


function bcUpdateForPTF() {
 try { 
 var dn = top.document.domain;  try { 
 if (typeof(top.pthNav) !== "undefined") { 
 top.pthNav.doBCUpdateForPTF(); } 
 } catch (ex2) {} 
 } catch (ex1) {}
}

function preSubmitWorkCenter_win0(arg1, arg2) {
 var isWorkCenter = top.document.getElementById('ptalPgltAreaFrame'); if(!isWorkCenter || !arg1) {return true; }

 
 if(parent.ptIframe || (top.ptalPage.isAccessibilityMode && parent.parent.ptIframe) ) 
 return preSubmitCheckWorkCenter_win0(arg1,arg2,true);}

function preSubmitCheckWorkCenter_win0(arg1,arg2,bPtreplace) {
if(bPtreplace)
{
if (browserInfoObj2.isIE) {
 if (arg1 != null && typeof arg1.document != "undefined")
 curAnchorObj = arg1.document.getElementById(arg2); }
 else {
 if (arg1 != null && typeof arg1.ownerDocument != "undefined")
 curAnchorObj = arg1.ownerDocument.getElementById(arg2); } 
 
 if((typeof curAnchorObj === 'undefined') || !curAnchorObj)
 return true; var anchorType = curAnchorObj.getAttribute("ptlinktgt"); if(anchorType == null) return true; if((anchorType) && (anchorType !== 'pt_replace')) 
 return true;}

if ( ( parent.ptIframe && parent.ptIframe.isWorkCenterDirty() ) || ( top.ptalPage.isAccessibilityMode && parent.parent.ptIframe && parent.parent.ptIframe.isWorkCenterDirty()) ) { 
 var cancelFn = function(arg1, arg2) { 
 var tgtFrameForm = top.frames['TargetContent'].document.forms[0];  if(tgtFrameForm && (tgtFrameForm.ICChanged)) 
 tgtFrameForm.ICChanged.value='-1';  submitAction_win0(arg1, arg2); return;  }
 
 if ( (parent.ptIframe && parent.ptIframe.saveWarningForWorkCenter(cancelFn,null ,1,arg1, arg2)) || 
 (top.ptalPage.isAccessibilityMode && parent.parent.ptIframe && parent.parent.ptIframe.saveWarningForWorkCenter(cancelFn,null ,1,arg1, arg2)) )
 return false; }
return true;}
function preSubmitProcessSpellcheck_win0(form, name) {
 var spellcheckobj = document.getElementById('SPELLCHECKSTRING'); if (spellcheckobj && spellcheckobj != 'undefined' && RTEspellcheck == true) {
 var spellcheckstring = spellcheckobj.value; if (name == "#ICOK" || name == "#ICCANCEL")
 spellcheckobj.value = ReplaceRTESpellSpaces(spellcheckstring); }
}

function preSubmitProcessCKEDITOR_win0(form, name) {
 if (typeof CKEDITOR != 'undefined') UpdateEditorLinkedField();}

function preSubmitProcess_win0(form, name) {
 if ((name.indexOf('$delete') > 0 || name.indexOf('$srt') > 0) && typeof (preID_win0) != 'undefined' && preID_win0 != null) 
 preID_win0 = null;  if (form == null) {
 form = document.forms['win0']; form.style.display = 'block'; }
 preSubmitProcessSpellcheck_win0(form, name); preSubmitProcessCKEDITOR_win0(form, name);     if (!isFModeLayout()) {
 if (typeof bcUpdater.getStoredData(bcUpdater.isMenuCrefNav) == 'undefined' || bcUpdater.getStoredData(bcUpdater.isMenuCrefNav) == null) {
 name == "#GetDomInfo" ? bcUpdater.setStoredData(bcUpdater.isMenuCrefNav, "N") : bcUpdater.setStoredData(bcUpdater.isMenuCrefNav, "P"); }
 }
}

function isLoaderInProcess()
{
if (loader != null && loader.GetInProcess())
 return true;return false;}

function aAction0_win0(form, name, params, bAjax, bPrompt)
{
if (isFModeLayout() && isPopupRequest(form, name)) return;if (typeof bSearchDialog_win0 != 'undefined' && !bDoModal_win0 && bSearchDialog_win0 && form.ICAction.value.indexOf("\x1b") >=0) 
 {
 processing_win0(0, 3000); return; }


if (loader != null && loader.GetInProcess2() && loader.formname != null && form.name != null && loader.formname == form.name) return;if (loader != null && loader.GetInProcess())
 {
 if ((loader.GetWaitingICAction() == "" && loader.GetInProcessICActionValue() != name && name == "#ICSave") ||
 (loader.formname != null && form.name != null && loader.formname != form.name)) 
 loader.SetWaitingObject(form, name, params, bAjax, bPrompt); return;  }

if (typeof ptGridObj_win0 != 'undefined' && ptGridObj_win0)
 ptGridObj_win0.saveScrollPos();form.ICResubmit.value=nResubmit;form.ICAction.value=name;form.ICXPos.value = ptCommonObj2.getScrollX();form.ICYPos.value = ptCommonObj2.getScrollY();bcUpdater.getAdvSrchLblFrmCriteria(name, form);var waitingObjList = null;if (loader != null && loader.GetWaitingICAction() != "") 
 waitingObjList = loader.GetWaitingObjectList();if (typeof bAjax != "undefined" && !bAjax && (typeof params == "undefined" || params == null || params == "") && (typeof popupObj_win0.isModalWidget == "undefined" || !popupObj_win0.isModalWidget))
 form.submit();else if (typeof params == "undefined" || !params)
 loader=new net2.ContentLoader(postUrl_win0,form,name,null,null,null,null,null,bAjax, bPrompt);else
 loader=new net2.ContentLoader(postUrl_win0,form,name,null,null,null,params,null,bAjax, bPrompt);if (waitingObjList != null)
 loader.WaitingObjQueue = waitingObjList;}

function pAction_win0(form, name, efieldname)
{
if(typeof CKEDITOR != 'undefined')UpdateEditorLinkedField();if ((loader != null) && (loader.GetInProcess())) return;form.ICAction.value = name;form.ICXPos.value = ptCommonObj2.getScrollX();form.ICYPos.value = ptCommonObj2.getScrollY();if (typeof form.ICTypeAheadID != 'undefined' && form.ICTypeAheadID.value != '') {
 
 if (pm)
 pm.updateTypeaheadMsgEvent(name); var flag = form.ICActionPrompt.value; form.ICActionPrompt.value = 'false'; var ret = aAction_win0(form, name, "", true, 1); form.ICActionPrompt.value = flag; return ret;}
else {
 
 if (pm)
 pm.updatePromptMsgEvent(name); form.ICActionPrompt.value = 'true'; return aAction_win0(form, name, "", true, true);}
}

function mAction_win0(form, name, height, width, title, bModalElement, bSizeOnLoad)
{
 form.ICAction.value = name; form.ICXPos.value = ptCommonObj2.getScrollX(); form.ICYPos.value = ptCommonObj2.getScrollY(); aAction_win0(form, name, null, true, false);}





function changeKeyList_win0(obj, form, name, params)
{
 aAction_win0(form, name, params); var searchObj = document.getElementById('PT_SEARCH'); addClass(searchObj, 'side'); addClose(searchObj); SetSearchStatus(obj, form);}



function updateFromPrompt_win0(obj, form, name, params) {
 aAction_win0(form, name, params);}

function updateFromInPrompt_win0(obj, form, name, params) {
 var res = []; var arr1 = document.querySelectorAll(".ps_prompt-resultsgrid .ps_grid-body .psc_on"); for (var i = 0; i < arr1.length; i++)
 res.push(arr1[i].parentElement.parentElement.parentElement.querySelector(".ps_box-value").firstChild.nodeValue); var objHidden = document.getElementById("PT_WORK_PT_PROMPT_TEMP_IN"); objHidden.value = res.join(","); addchg_win0(objHidden); aAction_win0(form, name, params);}



function doModalURL(url, options) {
 var moptions = 'bCrossDomain@1;bPIA@0;bClose@1;bCenter@1;sTitle@Page Title;'; if (ptConsole2.isActive() && !bPerf)
 ptConsole2.append((new Date()).valueOf() + "doModalURL url:\n" + url + "\n"); moptions += options; window.modWin = showModalDialog_pt(url, window, moptions);}

function doModeless(url, options) { 
 var moptions = 'bModeless@1;bPIA@1;closeUrl@' + modalCloseUrl + ';closeAlt@' + modalCloseAlt + ';resizeUrl@' + modalResizeUrl + ';resizeAlt@' + modalResizeAlt + ';moveAlt@' + modalMoveAlt + ';'; if (options == -1 || options.indexOf("bCrossDomain@1") == -1) {
 if (url.indexOf('?') == -1) 
 url += '?ICDoModeless=1'; else
 url += '&ICDoModeless=1'; }
 if (ptConsole2.isActive() && !bPerf)
 ptConsole2.append((new Date()).valueOf() + "modeless url:\n" +url +"\n");  if (typeof MTop().window.modLessWinArr == 'undefined') 
 MTop().window.modLessWinArr = new Array();  moptions += options; window.modLessWin = showModalDialog_pt(url, window, moptions);  function checkForReadiness() 
 {
 if (window.modLessWin && window.modLessWin.contentWindow)
 {
 try {
 if (window.modLessWin.contentWindow.document.readyState == "complete")
 { 
 setModWinID = setModlessWinParent(); return; }
 setTimeout(checkForReadiness, 1000);  }
 catch (err)
 {
 setTimeout(checkForReadiness, 1000); }
 }
 }

 setTimeout(checkForReadiness, 1000); try {
 MTop().window.modLessWinArr.push(window.modLessWin);  } catch(e) {
 }
}




function doTransfer(url) {
 loader2 = new net2.ContentLoader(url, null, null,'GET');}

function doModlessOnLoad_win0() {
if (window.name.length == 0)
 window.name = "win0";document.win0.target = window.name;}


function doModal(url, bPrompt, oParentWin, sCancelName, form, name, sPopupOptions, sResponseHTML) {
 
 if (typeof(oParentWin.modWin) != 'undefined' && oParentWin.modWin != null) {
 closeModal(oParentWin.modWin.modalID);  oParentWin.modWin = null; }

 var options = 'bPIA@1;';  var bPopup = 0; if (isFModeLayout()) {
 var sOptionsDefault = "bCenter@1;bAutoClose@0;bHeader@0;"; options += sOptionsDefault; if (sPopupOptions) {
 if (sPopupOptions.length > 0 && sPopupOptions.indexOf("bCenter") == -1 && sPopupOptions.indexOf("sPopupParentId") == -1 && sPopupOptions.indexOf("sPopupParentQS") == -1)
 options += "bPopup@1;sPopupParentId@" + name + ";"; options += sPopupOptions; }
 bPopup = 1; }
 if (!bPopup)
 options += 'closeUrl@' + modalCloseUrl + ';closeAlt@' + modalCloseAlt + ';resizeUrl@' + modalResizeUrl + ';resizeAlt@' + modalResizeAlt + ';moveAlt@' + modalMoveAlt + ';'; if (bPrompt == 1) {
 options += "bClose@1;"; }

 if (typeof sCancelName != "undefined" && sCancelName != null && sCancelName.length > 0) {
 if (isFModeLayout())
 options += 'sCancelName@' + sCancelName + ';'; else 
 options += 'bClose@1;sCancelName@' + sCancelName + ';'; }
 
 var nWaitMSec = 1000;  var bWriteReponse = false; if (isFModeLayout() && !browserInfoObj2.isIE && typeof sResponseHTML != "undefined")
 bWriteReponse = true; if (bWriteReponse)
 url = "about:blank"; else {
 if (ptConsole2.isActive() && !bPerf)
 ptConsole2.append((new Date()).valueOf() + "modal url:\n" + url + "\n"); }
 window.modWin = showModalDialog_pt(url, window, options, null, null, form, name); if (bWriteReponse) {
 nWaitMSec = 50; window.modWin.contentDocument.write(sResponseHTML); setModWinID = setModWinParentPIA(); }
 function isModalReady() {
 if (bWriteReponse) {
 try {
 if (typeof window.modWin.bLoadCompleted != "undefined" && window.modWin.bLoadCompleted) {
 window.modWin.onLoadExt_win0(); return; }
 setTimeout(isModalReady, nWaitMSec); }
 catch (err) {
 setTimeout(isModalReady, nWaitMSec); }
 }
 else if (window.modWin && window.modWin.contentWindow) {
 try {
 if (window.modWin.contentWindow.document.readyState == "complete") {
 setModWinID = setModWinParentPIA(); return; }
 setTimeout(isModalReady, nWaitMSec); }
 catch (err) {
 setTimeout(isModalReady, nWaitMSec); }
 }
 }

 setTimeout(isModalReady, nWaitMSec);}

function setWinParent_win0() {
 
 
}

function setModWinParentPIA() {
 if (setModWinParent())
 document.win0.ICResubmit.value = 0;}

function doCancelMsg() {
 aAction_win0(document.win0, '#ICCancel');}

function isModalCancel(name) {
 if (window.modalID) {
 if (name.indexOf(getCancelId(window.modalID)) != -1) 
 return true; }
}

function getCancelId (modid) {
 var modObj = MTop().document.getElementById("ptMod_" + modid); if (modObj.sCancelName.length > 0) return modObj.sCancelName; var sCloseId = '#ICCancel'; if (!document.getElementById(sCloseId) && document.getElementById("#ICReturn"))
 sCloseId = '#ICReturn'; return sCloseId;}

function doCancel(sCancelName) {

 var sCloseId= ''; if (typeof sCancelName != 'undefined' && sCancelName.length > 0)
 sCloseId = sCancelName; else {
 sCloseId= '#ICCancel';  }
 if (typeof window.bMFormSubmit != 'undefined') {
 if (!window.bMFormSubmit) 
 document.win0.ICAction.value = "None"; else {
 winParent.modWinClosed = null; return; }
 }
 
 if (browserInfoObj2.isIE && typeof window.modWin != 'undefined' && window.modWin != null) {
 var win = window.modWin; if (win.document) {
 var fm = win.document.win0; if (!fm) fm = window.document.win0; fm.ICAction.value = sCloseId; document.win0.ICAction.value = "None"; }
 }
 try {
 document.win0.target = winParent.name; if (document.win0.ICAction.value != "None") return; if (typeof window.bMFormSubmit != 'undefined')
 winParent.modWinClosed = null; winParent.nResubmit = 0;  if (window.document.win0.enctype.indexOf('multipart') != -1 && typeof window.bMFormSubmit != 'undefined' && !window.bMFormSubmit) {
 winParent.document.win0.ICAction.value = "None"; winParent.MTop().ptCommonObj2.hidePopupMask(); closeModal(modalID); }
 
 else if (sCloseId != "#ICCancel")
 aAction_win0(document.win0, sCloseId); else
 {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + modalID); if ((typeof modObj != 'undefined') && modObj && modObj.bRCFModal && 
 (typeof(winParent.aAction_win0) == 'undefined'))
 {
 try
 {
 closeModal(modalID); }
 catch (err) {}
 if (typeof window.modWin != 'undefined')
 window.modWin = null; if (typeof winParent!= 'undefined' && typeof winParent.modWin != 'undefined')
 winParent.modWin = null; }
 else
 winParent.aAction_win0(document.win0, sCloseId); }
 if (winParent.winParent)
 ptCommonObj2.hidePopupMask(winParent); else
 ptCommonObj2.hidePopupMask(MTop()); }
 catch (err) {
 closeModal(); }
}

function closeModWin_win0() {
 if ((typeof window.modWinClosed != 'undefined') && window.modWinClosed) {
 window.modWin = null; window.modWinClosed = false; return; }
 if (window.modWin) {
 try {
 window.modWin.document.win0.ICAction.value = '#ICCancel'; closeModal(window.modWin.modalID); }
 catch (err) {
 }
 }
 window.modWin = null;}


function onParentUnload_win0() {
 if ((typeof window.modWin != 'undefined') && window.modWin) closeModWin_win0();}

function doModalOnLoad_win0(bStartUp, bFileDetach, bNoParent) {
 if (isFModeLayout() && bNoParent) {
 window.bDoModal = true; return; }
 mTop = MTop();  try
 {
 if (!mTop || typeof mTop.oParentWin == 'undefined' || !mTop.oParentWin) return; }
 catch (err) {
 return; }
 if (bStartUp || bFileDetach) {
 winParent = mTop.oParentWin; dialogArguments = mTop.oParentWin; modalID = mTop.modId; window.name = "modWin_" + mTop.modId;  if (bStartUp) {
 if (modalZoomName != null) {
 var zObj = winParent.document.getElementById(modalZoomName); if (zObj) zObj.style.display = 'none'; }
 if ((mTop.modlessId == -1 || mTop.modlessId != mTop.modId) 
 && typeof winParent.document.win0 != 'undefined')
 winParent.processing_win0(0, 3000); resizeModalDialog_pt(modalID); } 
 } 
 else if (modalID != null) {
 if (modalZoomName != null) {
 var zObj = document.getElementById(modalZoomName); if (zObj && zObj.innerHTML.indexOf("CKEDITOR") == -1) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + modalID); resizeZoomGrid(modalZoomName,ptCommonObj2.getWidth(modObj), ptCommonObj2.getHeight(modObj)); }
 }
 resizeModalDialog_pt(modalID, true); }

 if (window.document.win0.enctype.indexOf('multipart') != -1)
 window.bMFormSubmit = false;}

function doUpdateParent(form, name) {
 if (typeof winParent == 'undefined' || winParent == null ) {
 submitAction_win0(document.win0, name); return; }
 if (winParent.bDefer && name.indexOf("#ICCancel") != -1 && bPromptPage_win0) {
 winParent.bCleanHtml = false; winParent.loader = null; winParent.document.win0.ICStateNum.value = document.win0.ICStateNum.value; winParent.aAction_win0(winParent.document.win0, '#ICCancel'); var cObj = winParent.document.getElementById("pt_modals"); if(cObj) cObj.style.display = "none"; } else {
 processing_win0(1, 3000); form.target = winParent.name; form.ICAction.value = name; if (typeof CKEDITOR != 'undefined') UpdateEditorLinkedField(); winParent.loader = null; if (pm)
  pm.updateParentMsgData(winParent,name);  winParent.aAction_win0(form, name); }
}

function doModalMFormSubmit_win0(form, name) {
 if (name.indexOf("#ICCancel") != -1) {
 if (winParent) {
 winParent.bCleanHtml = false; winParent.loader = null; winParent.document.win0.ICStateNum.value = document.win0.ICStateNum.value; winParent.aAction_win0(winParent.document.win0, '#ICCancel'); window.winParent.modWin = null; closeModal(window.modalID); }
 else {
 document.win0.cmd.value = ""; bCleanHtml = false; loader = null; aAction_win0(document.win0, '#ICCancel'); }
 return; }
 window.bMFormSubmit = true;  submitAction_win0(form, name); doModalMFormClose_win0();}

function doModalMFormClose_win0() {
 if (winParent) {
 winParent.bUpLoadProgress = true; winParent.nResubmit = 1; winParent.document.win0.ICStateNum.value = document.win0.ICStateNum.value; winParent.loader = null; winParent.aAction_win0(winParent.document.win0, 'Resubmit'); if (typeof window.winParent != 'undefined' && window.winParent.winParent != null)
 ptCommonObj2.hideParModalMask(window.winParent);  else
 ptCommonObj2.hidePopupMask(MTop()); hideModal(window.modalID); }
 else {
 bUpLoadProgress = true; nResubmit = 1; document.win0.cmd.value = ""; aAction_win0(document.win0, 'Resubmit'); } 
}

function doUpdateFirstParent(form, name, firstParent) {
 form.target = firstParent.name; form.ICAction.value = name; if (typeof CKEDITOR != 'undefined') UpdateEditorLinkedField(); firstParent.loader = null; firstParent.aAction_win0(form, name); if (typeof window.winParent != 'undefined' && window.winParent.winParent != null)
 ptCommonObj2.hidePopupMask(window.winParent); else
 ptCommonObj2.hidePopupMask(MTop()); hideModal(window.modalID);}

function resizeZoomGrid(id, w, h) {
 if (typeof gridList_win0 == 'undefined') 
 return; var nMinHeight = 140;  var exp = "win0" + "div";  var gNameParts = id.split(exp); var gToolBar = "win0" + "divG" + gNameParts[1]; var gSParts = gNameParts[1].split("$"); var gName = gSParts[0]; var gSID = gSParts[0] + "$scrolli$" + gSParts[1]; var gNavBar = exp + gSParts[0] + "GP$" + gSParts[1];  var gScrollAreaID = "divgbr" + gNameParts[1];  var gScrollAreaHdrID = "divghrc" + gNameParts[1]; var gFrozenAreaID = "divgbl" + gNameParts[1];  var mRight = document.getElementById(gScrollAreaID); var mRightHdr = document.getElementById(gScrollAreaHdrID); var bIsVSVisible = false; if (mRight && mRightHdr) 
 { 
 oColHeader = mRightHdr.children[0].children[0].children[0].children[0]; oLastColHeader = oColHeader.children[oColHeader.children.length - 1]; if (oLastColHeader.children[0].tagName == 'SPAN' && (oLastColHeader.children[0].innerHTML == '<NOBR>&nbsp;</NOBR>') || (oLastColHeader.children[0].innerHTML == '<nobr>&nbsp;</nobr>'))
 bIsVSVisible = true; }
 
 if (!bIsVSVisible) 
 return; if (mRight && mRightHdr) 
 {
 var nMaxBodyHeight = mRight.children[0].offsetHeight;  if (browserInfoObj2.isIE)
 nMaxBodyHeight = nMaxBodyHeight - 5; if (nMaxBodyHeight < 140) 
 nMinHeight = nMaxBodyHeight; if (browserInfoObj2.isSafari)
 nMaxBodyHeight = mRight.offsetHeight; var nHdrHeight = mRightHdr.offsetHeight; var nOthHeight = 150; var nMaxTmpHeight = h - nOthHeight; var nMaxHeight = nMinHeight; if (nMaxTmpHeight > 0 && nMaxTmpHeight < nMaxBodyHeight && nMaxTmpHeight > nMinHeight)
 nMaxHeight = nMaxTmpHeight; else if (nMaxTmpHeight > nMaxBodyHeight)
 nMaxHeight = nMaxBodyHeight; var oS = null; var nGridNewHeight = 0;    var oS1 = document.getElementById(gSID);  if (oS1 == null)
 {
 gSID = gSParts[0] + "$scrollm$" + gSParts[1]; oS1 = document.getElementById(gSID); if (oS1 == null)
 {
 gSID = gSParts[0] + "$scroll$" + gSParts[1]; oS1 = document.getElementById(gSID); if (oS1 == null)
 return; }
 } 

 oS1.id = gSID+"zzzz";  oS = document.getElementById(gSID);  if (!oS)
 oS = oS1; oS1.id = gSID;  nGridNewHeight = oS.offsetHeight + nMaxHeight - ptCommonObj2.getPixValue(mRight.style.height);  mRight.style.height = nMaxHeight + 'px';   if (browserInfoObj2.isIE)
 oS.style.height = nGridNewHeight + 'px';  else if (browserInfoObj2.isSafari) 
 oS.style.height = nGridNewHeight + 'px';  else
 {
 oS.style.height = nGridNewHeight + 6 + 'px';  var oTabElm = document.getElementById("tblpstabs");  var oTabTd = document.querySelector('td.PSGRIDTABBACKGROUND'); if (oTabElm && oTabTd)
 oTabTd.style.height = oTabElm.offsetHeight + 'px'; var oNavElm = document.getElementById(gNavBar); if (oNavElm)
 oNavElm.parentNode.style.height = oNavElm.offsetHeight + 'px'; }
 } 
 
 var mLeft = document.getElementById(gFrozenAreaID);  if (mLeft) 
 mLeft.style.height = (mRight.offsetHeight) + 'px';  var mToolBar = document.getElementById(gToolBar); if (mToolBar)
 mToolBar.style.width = (mLeft.offsetWidth + mRight.offsetWidth) + 'px'; }


function AgPostMessage(){ 
 var iframes=parent.parent.document.getElementsByTagName('iframe'); for(i=0;i<iframes.length;i++){ 
 
 if(/ptalPgltAreaFrame/.test(iframes[i].id)){
 try { 
 if (top.ptaiAguide.ptaiPostProc!=null && top.ptaiAguide.ptaiPostProc) {
 pm.postMessage(top.ptaiAguide.ptaiItemId+",save", ((iframes[i].contentWindow.document) ? iframes[i].contentWindow.document : iframes[i].contentDocument).location.href, iframes[i].contentWindow); }
 else {
 if (top.ptaiAguide.ptaiSaveNextBtnId!=null && top.ptaiAguide.ptaiSaveNextBtnId && top.ptaiAguide.ptaiButtonAction!=null && top.ptaiAguide.ptaiButtonAction=='next') {
 top.ptaiAguide.ptaiButtonAction=""; pm.postMessage(top.ptaiAguide.ptaiItemId+",next"+","+top.ptaiAguide.ptaiListId, ((iframes[i].contentWindow.document) ? iframes[i].contentWindow.document : iframes[i].contentDocument).location.href, iframes[i].contentWindow); }
 }
 } catch(e) {alert(e);}
 }
 } 
}

function goToServer_Ch(strCntr)
{

strCntr+="A";submitAction_win0(document.win0,strCntr);}





var bIsPagelet_win0 = "false", sPageletName_win0 = "";ResetGlyph_win0 = function() {
 if (typeof(sGlyphList_win0) !== "undefined" && sGlyphList_win0 !== "") {
 HideGlyph(sGlyphList_win0); }
}

setPageletInfoInCtxmenu_win0 = function(isPagelet,sPgltName) {
 bIsPagelet_win0 = (isPagelet === "false") ? "false" : "true"; sPageletName_win0 = (typeof(sPgltName) !== "undefined" && sPgltName && sPgltName !== "") ? sPgltName : "";}


window.PT_typeahead = function(){};PT_typeahead.prototype = { 
init:function(oWin,oDoc,oForm,url_up,url_dn,url_close,nDelayTime){
 this.oWin = oWin; this.oDoc = oDoc; this.oForm = oForm; this.url_up = url_up; this.url_dn = url_dn; this.url_close = url_close; this.arrOptions=new Array();  this.arrHeaders=new Array();  this.arrMatches=new Array();  this.strLastValue=""; this.bMadeRequest; this.theTextBox=null; this.objLastActive; this.currentValueSelected=-2; this.bNoResults = false; this.nDelayTime=nDelayTime; this.isDelayTiming =true; this.isTiming =true; this.isOpera=(navigator.userAgent.toLowerCase().indexOf('opera')!=-1); this.countForId=0; this.currentTotalRow=0;  this.startPos=0; this.maxRange=3;  this.ndisplay=1;  this.bScrolldownImage=0;  this.bStartNewList = 0;  this.promptWidth=0; this.opValue=-1; this.bodyScrollTop=0; this.bodyScrollLeft=0; this.noMatchingDataMessage = "No matching values were found.";if (isFModeLayout())
{
 this.undeStart="<span class='psc_strong'>"; this.undeEnd = "</span>"; this.selectSpanStart="<span class='ps_box-value' "; this.selectSpanEnd='</span>';  this.tableStart = "<table class='ps_grid-flex ps_grid-typeahead psc_grid-highlightrow'>"; this.tableEnd = "</table>"; this.trHStart = "<tr class='ps_grid-head-row'>"; this.trStart = "<tr class='ps_grid-row'>"; this.trEnd="</tr>"; this.tdStart = "<td class='ps_grid-cell'>"; this.tdEnd = "</td>"; this.thStart = "<th scope='col' class='ps_grid-col'><div class='ps_box_grid-col'>"; this.thEnd="</div></th>"; }
else
{
 this.undeStart="<span class='spanMatchText'>"; this.undeEnd="</span>"; this.selectSpanStart="<span style='width:100%;display:block' class='spanNormalElement' onmouseover='ptTAObj_win0.SetHighColor(this)' "; this.selectSpanEnd='</span>';  this.tableStart="<table class='PSSRCHRESULTSTITLE' id='ttable' dir=\'"+'ltr'+"' cellpadding='1' cellspacing='0'>"; this.tableEnd="</table>";  this.trStart="<tr align=\'"+'left'+"\'>"; this.trEnd="</tr>"; this.tdScrollStart="<td class='PSSRCHRESULTSEVENROW' align='center' colspan='"; this.tdODDStart="<td class='PSSRCHRESULTSODDROW' nowrap='nowrap'>"; this.tdEVENStart="<td class='PSSRCHRESULTSEVENROW' nowrap='nowrap'>"; this.tdEnd="</td>"; this.thStart="<th scope='col' class='PSTARESULTSHDR' nowrap='nowrap'><span class='PSTARESULTSHDR'>"; this.thEnd="</span></th>"; this.header="<tr align=\'"+'left'+"\'><th scope='col' class='PSTARESULTSHDR' ><span class='PSTARESULTSHDRR' name='#ICSortCol0'>User ID</span></th><th scope='col' class='PSTARESULTSHDR' ><span class='PSTARESULTSHDR' name='#ICSortCol1'>Description</span></th></tr>";  }
 this.bTabPressed = false; this.bKeyUp = false; this.bKeyDown = false; this.UnsupportedKeycode = '[?)(|}{]';  this.SpecialKeycode = '*+';  this.bFoundSpecialKeycode = false;  this.lastIntKey = -1; this.bGrabHighlighted = false;  this.typeAheadProcessedValue = "";  this.currentTypeAheadField = "";  this.bStaledResult = false;  this.bLostFocus = true;  this.bInProcess = false;  this.BACKSPACE = 8; this.TAB = 9; this.ENTER = 13; this.SHIFT = 16; this.CTRL = 17; this.ALT = 18; this.CAPLOCK = 20; this.ESCAPE = 27;  this.END = 35;  this.LEFTARROW = 37; this.UPARROW = 38; this.RIGHTARROW = 39; this.DOWNARROW = 40; this.EQUALSIGN = 187; this.FORWARDSLASH = 191; this.OPENBRACKET = 219; this.BACKSLASH = 220; this.CLOSEBRACKET = 221; var ptObj = oDoc.getElementById("pt_typeahead0"); if (ptObj)
 ptObj.style.display = 'none'; }
};var ptTAObj_win0 = new PT_typeahead();function CreateRCMenu4PVG(sPvtGridName,nContext,nLeft,nTop,sActions,sPvgData,BulkActions)
{
var strAction = sPvtGridName+"$PVGCTXMENU~";strAction += nContext+"~"+nLeft+"~"+nTop;if (typeof BulkActions != "undefined" && BulkActions)
strAction += "~"+BulkActions;var ch9=String.fromCharCode(9);var elemPVGAct = document.getElementById("ICPVGActMenu"); if (elemPVGAct)
 elemPVGAct.value = sActions;var elemPVGData = document.getElementById("ICPVGData"); if (elemPVGData)
 elemPVGData.value = sPvgData; submitAction_win0(document.win0,strAction);}

InvokePageAppCls = function(sServname,sData)
{
var sFormName = "win0";var form = document.forms[sFormName];if (typeof form.ICAPPCLSDATA != 'undefined') 
 form.ICAPPCLSDATA.value = sData;var sAppServname = "$APPCLS#"+sServname;submitAction_win0(document.win0,sAppServname);}

IsRCFConfigured4PVG = function(FormName, sPvtGridName, nContext, sPvgData) {
try {
 if (!FormName) return false ; var strAction = sPvtGridName + "$PVGRCFMENUQRY~"; strAction += nContext; var form = document.forms[FormName]; form.ICAction.value = strAction; if (typeof form.ICPVGData != 'undefined')
 form.ICPVGData.value = sPvgData; var resPTxt = ""; var xmlDoc = null; var sLoader = new net2.ContentLoader(postUrl_win0, form, null, "post",function(){},
 null, null, "application/x-www-form-urlencoded",
 1, 0, null, false); if (sLoader == null || sLoader.req == null) return false; if (window.ActiveXObject)
 {
 if (sLoader.req.responseXML.parseError.errorCode == 0 && sLoader.req.responseXML.xml != "") 
 xmlDoc = sLoader.req.responseXML; else { 
 xmlDoc = sLoader.createIEXMLParser(); xmlDoc.async = "false"; try { 
 xmlDoc.loadXML(sLoader.req.responseText); }
 catch (e) {
 return false; }
 }
 
 }
 else
 {
 var parser=new DOMParser(); xmlDoc = parser.parseFromString(sLoader.req.responseText, "text/xml"); if (xmlDoc.documentElement.nodeName=="parsererror") {
 var sText = sLoader.req.responseText; if (sText.indexOf("\u001E") != -1) {
 bRecSep = 1; sText = sText.replace(/\u001E/g, "&#30;");  }
 if (sText.indexOf("\u0001") != -1) {
 bSOH = 1; sText = sText.replace(/\u0001/g, "&#1;");  }

 xmlDoc=parser.parseFromString(sText,"text/xml"); if (xmlDoc.documentElement.nodeName=="parsererror") {
 return false; }
 }
 } 
 var scriptList = xmlDoc.getElementsByTagName("GENSCRIPT"); if (scriptList)
 {
 for (var i = 0; i < scriptList.length; i++) {
 var sTmp = (scriptList[i].firstChild.data).toLowerCase(); sLoader = null; if (sTmp == "true") 
 return true; else
 return false; }
 }
 sLoader = null; return false;}
catch (e) {
 return false; }
}




function doFolder(form, pid, fid) {
 gobj = document.getElementById(fid); obj = gobj.children[0]; if (gobj.children.length > 1)
 obj = gobj.children[1]; if (obj && obj.children.length > 0) {
 if (obj.children[0].tagName != "IMG") {
 if (isHidden(obj.children[0]))
 {
 removeHide(obj.children[0]); addClass(obj.parentNode.children[0], "ps_dash"); }
 else {
 addHide(obj.children[0]); }
 return; }
 else if (obj.children.length > 1 && obj.children[0].tagName == "IMG") {
 if (isHidden(obj.children[0])){ 
 removeHide(obj.children[0]); removeClass(obj.parentNode.children[0], "ps_dash"); addHide(obj.children[1]); } else{
 removeHide(obj.children[1]); addHide(obj.children[0]); addClass(obj.parentNode.children[0], "ps_dash"); }
 return; }
 }
 var objHidden = document.getElementById(pid); if (objHidden.tagName == "INPUT")
 objHidden.value = fid; addchg_win0(objHidden); submitAction_win0(form, pid);}

function findFirstTab(tabSelect)
{
var tabList = tabSelect.parentNode;while (tabList.getAttribute("role") != "tablist")
 tabList = tabList.nextElementSibling || tabList.nextSibling;  var eTab = tabList.firstElementChild || tabList.firstChild;while (eTab)
 {
 if (eTab.getAttribute("role") == "tab" || (eTab.firstElementChild || eTab.firstChild).getAttribute("role") == "tab")
 break; else
 eTab = eTab.nextElementSibling || eTab.nextSibling; }
return eTab;}

function findLastTab(tabSelect)
{
var tabList = tabSelect.parentNode;while (tabList.getAttribute("role") != "tablist")
 tabList = tabList.nextElementSibling || tabList.nextSibling;  var eTab = tabList.lastElementChild || tabList.lastChild;while (eTab)
 {
 if (eTab.getAttribute("role") == "tab" || (eTab.firstElementChild && eTab.firstElementChild.getAttribute("role") == "tab"))
 break; else
 eTab = eTab.previousElementSibling || eTab.previousSibling; } 
return eTab;}

function selectTab(el)
{
if (el.getAttribute("role") == "tab") 
 el.focus(); else 
 (el.firstElementChild || el.firstChild).focus();}

function doTabNav(event)
{
var bEventContinue= true;var tabSelect;var newTab = null;var currentTarget = event.currentTarget || event.srcElement;if (currentTarget.tagName == 'LI') 
 tabSelect = currentTarget;else 
 tabSelect = currentTarget.parentNode;switch (event.keyCode)
 {
 case 13: 
 case 32: 
 bEventContinue = false; if (currentTarget.getAttribute("aria-selected") != "true")
 {
 document.win0.ICFocus.value = (tabSelect.firstElementChild || tabSelect.firstChild).id; currentTarget.onclick(); }
 break;  case 39: 
 case 40: 
 newTab = tabSelect.nextElementSibling || tabSelect.nextSibling; if (newTab && newTab.getAttribute("aria-selected") == "true") 
 break; else
 {
 if (newTab && newTab.firstElementChild && newTab.firstElementChild.getAttribute("role") != "tab")
 newTab = newTab.nextElementSibling || newTab.nextSibling;  if (newTab)
 {
 var eTab = newTab.firstElementChild || newTab.firstChild; if (eTab && eTab.getAttribute("role") == "tab")
 break; }
 }
 
 case 36: 
 newTab = findFirstTab(tabSelect); break;  case 37: 
 case 38: 
 newTab = tabSelect.previousElementSibling || tabSelect.previousSibling; if (newTab && newTab.getAttribute("aria-selected") == "true") 
 break; else
 {
 if (newTab && (newTab.firstElementChild || newTab.firstChild).getAttribute("role") != "tab")
 newTab = newTab.previousElementSibling || newTab.previousSibling;  if (newTab)
 {
 var eTab = newTab.firstElementChild || newTab.firstChild; if (eTab && eTab.getAttribute("role") == "tab")
 break; }
 }
 
 case 35: 
 newTab = findLastTab(tabSelect); }
 
if (newTab != 'undefined' && newTab != null)
 {
 selectTab(newTab); bEventContinue=false; }

return bEventContinue;}

function doTabNavExt(event)
{
var bReturn = false;var tabSelect = null;var currentTarget = event.currentTarget || event.srcElement;if (currentTarget.tagName == 'LI')
 tabSelect = currentTarget;else 
 tabSelect = currentTarget.parentNode; switch (event.keyCode)
 {
 case 13: 
 case 32: 
 bReturn = false; tabSelect = null; if (currentTarget.id.indexOf("ICTAB_SCROLL_R") == 0)
 document.win0.ICFocus.value = currentTarget.id.replace("_R", "_L"); else if (currentTarget.id.indexOf("ICTAB_SCROLL_L") == 0)
 document.win0.ICFocus.value = currentTarget.id.replace("_L", "_R"); else if (currentTarget.id.indexOf("ICTAB_HIDE") == 0)
 document.win0.ICFocus.value = currentTarget.id; currentTarget.onclick(); break; case 36: 
 tabSelect = findFirstTab(tabSelect); break; case 35: 
 tabSelect = findLastTab(tabSelect); break; default:
 bReturn = true; tabSelect = null; }
 
if (tabSelect != null && tabSelect != 'undefined')
 selectTab(tabSelect); return bReturn;}

function InvokeFieldChange_win0(sFldName)
{
 submitAction_win0(document.win0, sFldName);}
function onRCService(url,nOpenMode,nFluidComponent,szServType,strLabel,strFldID,bBulkAction,szParamXML)
{

processing_win0(1, 3000);var sFormName = "win0";OpenRCService(url,nOpenMode,nFluidComponent,szServType,strLabel,strFldID,bBulkAction,szParamXML,sFormName);if (nOpenMode == "0")
 processing_win0(0, 3000);}






var TOOLS_RETURN = "#ICReturn"; function isZoom()
{
 var bZoom = false; var oframe = null; var oWin = null; var returnButton = null; var topmostModalDialogIdCount = PT_GetTopmostModalDialogIdCount(); oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + topmostModalDialogIdCount); if (!oframe) {
 return bZoom; }

 oWin = oframe.contentWindow; if (!oWin) 
 return bZoom; returnButton = oWin.document.getElementById(TOOLS_RETURN); if (!returnButton) 
 return bZoom;  bZoom = true; return bZoom;}


function isChangedForAutosave()
{
 var changed = null; var objFrame = null;  if (document.win0)
 changed = checkFormChanged(document.win0, null);  if ((changed == null || !changed) && top.frames) {
 objFrame = top.frames['TargetContent']; if (objFrame)
 changed=checkFrameChanged(objFrame); }

 if ((changed == null || !changed) && top.frames) {
 changed = checkAnyFrameChanged(top.frames); }

 if (changed == null)
 return false; else
 return true;}


function getAutoSaveButton()
{
 var bFound = false; var array_PTTRANSPARENT = null; if (top.frames) {
 objFrame = top.frames['TargetContent']; if (objFrame) {
 array_PTTRANSPARENT = objFrame.document.getElementsByClassName("PTTRANSPARENT"); } 
 }
 for (var i=0; array_PTTRANSPARENT != null && i < array_PTTRANSPARENT.length; i++) {
 if (/_ICAUTOSAVE$/.test(array_PTTRANSPARENT[i].id)) {
 bFound = true; break; }
 }

 if (bFound) {
 return objFrame.document.getElementById(array_PTTRANSPARENT[i].id); } else {
 return null; }
}


function isAutoSaveEnabled() 
{
 var bAutoSaveEnabled = false; if (getAutoSaveButton()) {
 
 if (isChangedForAutosave()) {
 bAutoSaveEnabled = true; } 
 }

 return bAutoSaveEnabled;}


function getICAutoSave() 
{
 var autoSave = null; autoSave = getAutoSaveButton(); if (autoSave == null) {
 return autoSave; }

 
 if (isChangedForAutosave()) {
 return autoSave; } else {
 return null; }
}


function submitSave(saveButton) 
{
 if (saveButton == null)
 return; var bZoom = isZoom(); setSaveText_win0('Saving...', true, false); bAutoSave = true; if (bZoom) {
 var topmostModalDialogIdCount = PT_GetTopmostModalDialogIdCount(); var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + topmostModalDialogIdCount); if (!oframe) return; var oWin = oframe.contentWindow; if (typeof oWin != 'undefined' && oWin != null ) {
 var icReturn = oWin.document.getElementById(TOOLS_RETURN); if ((icReturn != null) && (typeof oWin.document.win0.ICAutoSave != "undefined" )) {
 oWin.document.win0.ICAutoSave.value = '1'; icReturn.click(); } 
 }
 }
 
 if (!bZoom) {
 submitAction_win0(document.win0, saveButton); } else {
 
 setTimeout(function(){submitAction_win0(document.win0,saveButton)}, 5000);  }
 }


function autoSave() 
{
 var TOOLS_SAVEBUTTON_ID = "#ICSave"; var autoSave = null;  var saveButton = null; var saveButtonID = null; if (!isAutoSaveEnabled())
 return; autoSave = getICAutoSave(); if (autoSave != null) {
 saveButtonID = autoSave.value;  if (saveButtonID == null || saveButtonID == '\xa0') {
 saveButton = document.getElementById(TOOLS_SAVEBUTTON_ID); if (saveButton != null)
 saveButtonID = saveButton.id; }
 if (saveButtonID != null) 
 submitSave(saveButtonID); } else {
 if (isZoom()) {
 submitSave(TOOLS_SAVEBUTTON_ID); }
 }
}





function isButton(obj)
{
 if (!obj) return false; var sRole = (obj.getAttribute("role")) ? obj.getAttribute("role") : ""; if (sRole.indexOf("button") != -1) return true; return false;}

function isRowAct(obj) 
{
 if (!obj) return false; var sRole = (obj.getAttribute("crole")) ? obj.getAttribute("crole") : ""; if (sRole.indexOf("rowact") != -1)
 return true; return false;}

function updateWindowTitleFromFakeBC() {

 if (top == null || top.document == null)
 return; var ptFakeBC = document.getElementById('pt_fakeBC'); if (typeof(ptFakeBC) != 'undefined' && ptFakeBC != null)
 {
 var ptFakeBCAnchor = ptFakeBC.getElementsByTagName('a')[0]; if (typeof(ptFakeBCAnchor) != 'undefined' && ptFakeBCAnchor != null)
 {
 top.document.title = ptFakeBCAnchor.innerHTML; }
 }
}

function DisplayNUIRCMenu_win0(FieldName,nLeft,nTop,sMenu) {

 if (typeof (MTop().modId) != 'undefined' && MTop().modId != -1)
 {
 var modObj = MTop().document.getElementById("ptMod_" + MTop().modId); if (modObj && modObj.bRCFModal)
 doCloseModal(MTop().modId); }

 var mDivObj = document.getElementById('win0' + 'div' + FieldName + '$divpop'); if (!mDivObj)
 mDivObj = document.getElementById(FieldName + '$divpop'); if (!mDivObj)
 {
 var mDivRCObj = document.getElementById('PTRCF_NUI$Ctxmenu'); if (!mDivRCObj)
 {
 mDivRCObj = document.createElement('div'); mDivRCObj.id = "PTRCF_NUI$Ctxmenu"; mDivRCObj.innerHTML = sMenu; }
 mDivObj = mDivRCObj.firstChild; }
 if (isFModeLayout() && mDivObj && mDivObj.innerHTML != "") {
 processing_win0(0, 3000); resetMenu(mDivObj); var sClass = mDivObj.getAttribute("class"); sClass = sClass.replace(" psc_hidden", ""); mDivObj.setAttribute("class", sClass); if (typeof(nLeft) != 'undefined' && typeof(nTop) != 'undefined')
 {
 var sOptions = mDivObj.getAttribute('options'); sOptions += "nrcfLeft@"+nLeft+";nrcfTop@"+nTop+";"; mDivObj.setAttribute("options", sOptions); }
 addDivPopup(mDivObj, window, mDivObj.getAttribute('options')); playDivPopup(); return; }
}


function DisplayNUIRCMenu(FieldName,sMenu,nLeft,nTop) {
 DisplayNUIRCMenu_win0(FieldName,nLeft,nTop,sMenu);}

InvokeAppClsService_win0 = function(sFldName,sService,sData)
{
var nPos = sFldName.lastIndexOf("$");var szBase = sFldName;if (nPos != -1)
 {
 if (nPos == sFldName.length-1)
 {
 szBase = sFldName; szBase += "$APPCLS#"+sService; }
 else
 {
 szBase = sFldName.substring(0,nPos); szBase += "$APPCLS#"+sService; szBase += sFldName.substring(nPos,sFldName.length); }
 }
else
 szBase = sFldName+"$APPCLS#"+sService;var sFormName = "win0";var form = document.forms[sFormName];if (typeof form.ICAPPCLSDATA != 'undefined') 
 form.ICAPPCLSDATA.value = sData;submitAction_win0(document.win0,szBase);}
