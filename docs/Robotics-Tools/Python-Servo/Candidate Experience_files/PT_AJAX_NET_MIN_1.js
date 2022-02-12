



var gAJAXNet = null;function WaitingObjRec(objForm, ICAcation, arrParams, bAjax, bPrompt)
{
this.WaitingObjForm = objForm; this.WaitingICAction = ICAcation; this.WaitingArrParams = arrParams; this.WaitingbAjax = bAjax; this.WaitingbPrompt = bPrompt; };if (typeof(net2) === "undefined") 
{
var net2 = {};var promptFieldid = ""; var rteditorlist = ""; var bPerf = false; var bRecSep = 0; var bGrpSep = 0; var bFilSep = 0; var bUniSep = 0; var bSOH = 0; var bSUB = 0; var bFF = 0; net2.READY_STATE_UNINITIALIZED=0;net2.READY_STATE_LOADING=1;net2.READY_STATE_LOADED=2;net2.READY_STATE_INTERACTIVE=3;net2.READY_STATE_COMPLETE=4;net2.bInProcess=false; net2.InProcessElTagName=""; net2.InProcessICActionValue=""; net2.WaitingObjForm=null; net2.WaitingICAction=""; net2.WaitingArrParams=null; net2.WaitingbAjax=false; net2.WaitingbPrompt=false; net2._HASTYLE="_HAStyle";net2.ENDSCRIPT="%/script>";net2.ENDSTYLE="%/style>";net2.PSSTYLEREQ="/PSSTYLEREQ_";net2.PSHEIGHT = "height='";net2.EXCLUDEPORTALURL = "/s/WEBLIB_PT_NAV.ISCRIPT1.FieldFormula.IScript_PT_NAV_MRU_Update"; net2.ContentLoader=function(url,form,id,method,onload,onerror,params,contentType,bAjax,bPrompt, headerArray,isAsync, sXMLResponse)
{
this.bInProcess = false; this.InProcessElTagName = ""; this.InProcessICActionValue = ""; this.prevReadyState = net2.READY_STATE_UNINITIALIZED; this.form = null;this.url = null 
this.params = ""; this.bAlert=true; this.WaitingObjQueue = new Array(); this.bScript = false; this.arrScript = new Array(); this.arrSrcScript = new Array(); this.arrSrcScriptApp = new Array(); this.arrSrcCSSApp = ""; this.nScript = -1; this.nSrcScript = -1; this.nScriptfiles = 0; this.nScriptfileIndex = 0; this.oScript = ""; this.msgList;this.OnloadScriptList;this.objGrouplet = null;this.sortid = "";this.gXMLObj = null; this.gCleanData = ""; if (typeof ptConsole2 != 'undefined' && ptConsole2 && ptConsole2.isActive() && bPerf)
{
this.nStartAll = (new Date()).valueOf();ptConsole2.append((new Date()).valueOf() + " request start");}

this.url=(typeof url =="undefined" || !url) ? null: url;if (!this.url)
{
 alert("url is required."); return;}

this.bAlert=true;gFocusObj = null;this.req=null;this.formname = "";this.paramsModal = "";this.paramsModal2 = "";this.form = (typeof form == "undefined" || !form) ? null : form;if (this.form)
 this.formname = this.form.name;this.bInProcess=false;this.win = window;this.doc = document;if (browserInfoObj2.isIE) {
 if (this.form != null && typeof this.form.document != "undefined")
 this.doc = this.form.document; else if (this.form != null && typeof this.form.ownerDocument != "undefined")
 this.doc = this.form.ownerDocument; }
else {
 if (this.form != null && typeof this.form.ownerDocument != "undefined")
 this.doc = this.form.ownerDocument;}
this.contentType=(typeof contentType =="undefined" || !contentType) ? null: contentType;this.id=(typeof id =="undefined" || !id) ? null: id;if (isFModeLayout() && !this.id && (this.form || method && method.toUpperCase().indexOf("POST") !== -1)) 
 { 
 var sScript = "processing_" + this.form.name + "(0, 3000);"; eval(sScript); return; }
this.params=(typeof params =="undefined"|| !params) ? "": params;this.bAjax=(typeof bAjax =="undefined") ? 1: bAjax;this.bPrompt=(typeof bPrompt =="undefined") ? 0: bPrompt;this.bTypeAhead = false;this.bTypeAheadOnly = false;this.TAFieldID ="";this.TAFieldValue ="";if (this.form && typeof this.form.ICTypeAheadID != 'undefined' && this.form.ICTypeAheadID.value != '') 
{
this.bTypeAhead = true;this.bPrompt = false;this.TAFieldID = this.form.ICTypeAheadID.value;var TAField = document.getElementById(this.form.ICTypeAheadID.value);if (TAField != null) this.TAFieldValue = TAField.value;}
this.onerror=(typeof onerror =="undefined" || !onerror) ? this.defaultError: onerror;this.bCallBack = (typeof onload =="undefined" || !onload)? 0: 1;this.onload=(typeof onload =="undefined" || !onload) ? this.processXML: onload;this.headerArray=(typeof headerArray == "undefined" || !headerArray) ? null: headerArray;this.isAsync = typeof(isAsync) === "undefined" ? true : isAsync;this.sXMLResponse = (typeof sXMLResponse == "undefined" || !sXMLResponse) ? null : sXMLResponse;if (this.sXMLResponse) {
 this.processXML(); return;}

if (this.form || method && method.toUpperCase().indexOf("POST") !== -1) {
 if (!this.isResumitAndAllowed(this.form)) {

 return;}
 this.method="POST";} else {
 this.method="GET";}

if (!this.contentType && this.form && this.method.indexOf("POST")!=-1)
 this.contentType='application/x-www-form-urlencoded';if (!this.isPCModal()) {
 if (typeof CKEDITOR != 'undefined') UpdateEditorLinkedField(); if (!this.processPIAPostParams())
 return;  this.InProcessElTagName = ""; this.bInProcess = false; this.InProcessICActionValue ="";  this.SetWaitingObject(null,"",null,false,false); var url = this.form.action; if (typeof this.form.ICFromPagelet != 'undefined')
 url = this.form.ICContentURL.value; if (url.indexOf('?') == -1)
 url += '?ICDoModal=1&' + this.paramsModal2; else
 url += '&ICDoModal=1&' + this.paramsModal2; this.params = 'ICDoModal=1&' + this.params; this.loadXMLDoc(true);}
else
 this.loadXMLDoc();}

net2.ContentLoader.prototype={
isAnyHtmlArea: function() {
 if (this.form) {
 var bSearch = false; var sScript = "if ((typeof bSearchDialog_" + this.form.name + " != 'undefined') && bSearchDialog_" + this.form.name + ") bSearch = true; "; eval(sScript); if (!bSearch && (typeof bCleanHtml != "undefined") && !bCleanHtml) return true; }
 return false;},
isPCModal: function() {
 if (this.bPrompt) return false; if (this.id && (
 this.id.indexOf("$hmodal") != -1 ||
 this.id.indexOf("$hpers") != -1))
 return false; return true;},
isResumitAndAllowed:function(form)
{ 
if (this.bCallBack || !form || !form.ICAction || !form.ICResubmit || this.id.indexOf('Resubmit') != -1) return true;try {
 if (typeof window.modWin != 'undefined' && window.modWin != null && typeof window.modWin.bProcess != 'undefined' && window.modWin.bProcess) {
 var sScript = "processing_" + this.form.name + "(0, 3000);"; eval(sScript); return false; }
 } catch (e) {
 
 window.modWin = null; this.SetInProcess(false); this.SetWaitingObject(null,"",null,false,false); closeModalAll(); var sScript = "processing_" + this.form.name + "(0, 3000);"; eval(sScript); return true; }

 var sResubmit = ptCommonObj2.getEV("ICResubmit", this.doc); var nResubmit = new Number(sResubmit.valueOf()); if ((typeof this.win != 'undefined') && this.win.name == "PageletArea") {
 form.ICResubmit.value=0; return true; }
 if (nResubmit < 1) return true; var el = document.getElementById(form.ICAction.value);   if (!el || typeof el == 'undefined' || el.disabled)
 return true; switch(el.type)
 {
 case "text":
 form.ICResubmit.value=0; return true; case "textarea":
 form.ICResubmit.value=0; return true; case "checkbox":
 form.ICResubmit.value=0; return true; case "radio":
 form.ICResubmit.value=0; return true; case "select-one":
 form.ICResubmit.value=0; return true; case "select-multiple":
 form.ICResubmit.value=0; return true; default:
 return false; }
 return false; },

 
 createXMLHTTPRequest:function()
 {
 if (window.XMLHttpRequest) 
 return new XMLHttpRequest(); try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
 catch (e) {}
 try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
 catch (e) {}
 try { return new ActiveXObject("Msxml2.XMLHTTP"); }
 catch (e) {}
 try { return new ActiveXObject("Microsoft.XMLHTTP"); } 
 catch (e) {}
 
 
 throw new Error("This browser does not support XMLHttpRequest."); },

 createIEXMLParser:function()
 {
 try { return new ActiveXObject("Msxml2.DOMDocument.6.0"); }
 catch (e) {}
 try { return new ActiveXObject("Msxml2.DOMDocument.5.0"); }
 catch (e) {}
 try { return new ActiveXObject("Msxml2.DOMDocument.4.0"); }
 catch (e) {}
 try { return new ActiveXObject("MSXML2.DOMDocument.3.0"); }
 catch (e) {}
 try { return new ActiveXObject("Microsoft.XMLDOM"); } 
 catch (e) {throw new Error("This browser does not support XMLDOM Parser.");}
 },
 
 loadXMLDoc:function(bParamsDone)
 { 
 if (typeof ptConsole2 != 'undefined' && ptConsole2 && ptConsole2.isActive() && bPerf)
 ptConsole2.append((new Date()).valueOf() + " processPIAPostParams start");  if (typeof bParamsDone == 'undefined' || !bParamsDone) {
 if (!this.processPIAPostParams()) return; }

 this.SetInProcess(true, this.form); if (typeof ptConsole2 != 'undefined' && ptConsole2 && ptConsole2.isActive() && bPerf)
 ptConsole2.append((new Date()).valueOf() + " processPIAPostParams end and server start"); if (this.method.indexOf("GET")!=-1 && this.params.length>0)
 this.url +="?"+this.params;  if (typeof ptConsole2 != 'undefined' && ptConsole2 && ptConsole2.isActive() && !bPerf)
 ptConsole2.append((new Date()).valueOf() + " url:\n" + this.url + "\nparams:"+this.params.length+"\n" + this.params); try { this.req=this.createXMLHTTPRequest(); }
 catch(e)
 {
 alert(e); this.SetInProcess(false); this.SetWaitingObject(null,"",null,false,false); this.onerror.call(this); }

 if (this.req)
 {
 try 
 {
 var loader=this; this.req.onreadystatechange=function()
 {
 loader.onReadyState.call(loader); }

 if (browserInfoObj2.isSafari2x) { this.isAsync = false; }

 this.req.open(this.method,this.url,this.isAsync); if (this.isAsync && typeof this.req.withCredentials != 'undefined')
 this.req.withCredentials = "true"; if (this.contentType)
 {
 this.req.setRequestHeader('Content-Type', this.contentType); }

 
 if (this.headerArray) {
 for (var i=0; i<this.headerArray.length; i++){
 if (this.headerArray[i][0] && this.headerArray[i][1])
 this.req.setRequestHeader(this.headerArray[i][0], this.headerArray[i][1]); } 
 }

 nLastAction = 1; if (!this.bPrompt && typeof nResubmit != 'undefined' && !this.bCallBack)
 nResubmit++; this.req.send(this.params);  }
 catch (err)
 {
 try 
 {
 if (!this.isAsync && ((this.url).indexOf(net2.EXCLUDEPORTALURL) > -1)) {
 
 
 
 } else
 alert("Error in opening/sending request: - Error: " + err + " - Url:" + this.url + ", - URL Parameters: " + this.params); }
 catch (e)
 {
 alert("Error in opening/sending request url: " + this.url + ", URL Param: " + this.params); }
 
 this.sendErrorHandler(); return; }
 }
 },

 
 GetInProcess2:function()
 {
 return (this.InProcessElTagName=="A" && this.GetInProcess()) ? true : false; },

 
 GetInProcess:function()
 {
 return (this.bInProcess) ? true : false; },

 
 
 SetInProcess:function(bProcess,oForm)
 {
 this.bInProcess = bProcess; if (bProcess && typeof oForm != "undefined" && oForm != null)
 {
 var el = document.getElementById(oForm.ICAction.value); if (el != null)
 this.InProcessElTagName = el.tagName; else
 this.InProcessElTagName = ""; this.InProcessICActionValue = oForm.ICAction.value;  }

 if (!bProcess)
 {
 this.InProcessElTagName=""; this.InProcessICActionValue="";  }

 },

 GetInProcessICActionValue:function()
 {
 return (this.InProcessICActionValue); },
 
 GetWaitingObjectList:function()
 {
 return (this.WaitingObjQueue); },

 GetWaitingObject:function()
 {
 if (this.WaitingObjQueue.length > 0) {
 var obj = this.WaitingObjQueue.shift();  return {v:obj.WaitingObjForm,w:obj.WaitingICAction,x:obj.WaitingArrParams,y:obj.WaitingbAjax,z:obj.WaitingbPrompt}; }
 else
 return null; },
 
 SetWaitingObject:function(oForm,strAction,ArrParams,bAjax,bPrompt)
 {
 if (oForm == null || strAction == "")
 this.WaitingObjQueue = new Array();  else {
 
 var found = false; for (var i=0; i < this.WaitingObjQueue.length; i++) {
 if (this.WaitingObjQueue[i].WaitingObjForm.name == oForm.name) {
 found = true; break; }
 }
 
 if (found == false) { 
 var obj = new WaitingObjRec(oForm, strAction, ArrParams, bAjax, bPrompt); this.WaitingObjQueue.push(obj); }
 }
 },
 
 GetWaitingICAction:function()
 {
 return (this.WaitingObjQueue.length == 0) ? "" : this.WaitingObjQueue[0].WaitingICAction;  },

 onReadyState:function() {
 var req = this.req; try 
 { 
 if (req.readyState == net2.READY_STATE_COMPLETE ) 
 {
 
 
 try 
 {
 if (req.status == 200) 
 {
 try {
 this.onload.call(this); }
 catch (e)
 {
 exceptionMessageStack(e, "onReadyState"); return; }
 }
 else
 {
 
 
 
 if ((this.url).indexOf(net2.EXCLUDEPORTALURL) > -1) 
 return;    this.sendErrorHandler(); return; }
 } 
 catch(e) 
 {
  
 
 this.sendErrorHandler(); return; }
 } 
 } 
 catch(ex) 
 {
 
 this.sendErrorHandler(); return; }
 },
 
 clearRequestProcessFlags:function()
 {
 this.SetInProcess(false); nResubmit = 0; },
 
 sendErrorHandler:function()
 {
 if (!this.form) return; this.bAlert=false; this.clearRequestProcessFlags(); sScript = "processing_" + this.form.name + "(0)"; eval(sScript); this.onerror.call(this); this.bAlert=true; this.req.abort(); },
 
 defaultError:function()
 {
 this.clearRequestProcessFlags(); if (this.bAlert)
 {
 try
 {
 alert("Error fetching data!" +"\n\nreadyState:"+this.req.readyState + "\nheaders: "+this.req.getAllResponseHeaders()); }
 catch (e)
 {
 alert("Error fetching data due to network issue!"); }
 }
 },

 
 processPIAPostHiddenParams: function(sTmp, sTmpModal, sTmpModal2)
 {
 
 var hiddenObj = this.doc.getElementById(this.form.name + 'divPSHIDDENFIELDS');  if (hiddenObj)
 {
 var hChildNDs = hiddenObj.children; var end = hChildNDs.length; for (var i = 0; i < end; i++) 
 {
 var eObj = hChildNDs[i]; if (typeof eObj.id == 'undefined') 
 continue; var eId = eObj.id; if ((eId == "#ICIncludeHistory" || eId == "#ICCorrectHistory" || eId == "#ICMatchCase") && !eObj.checked)
 continue; if (eId.indexOf("$hnewpers$") != -1)
 {
 var gid = this.form.name + 'div' + eId.split("$")[0] + '$' + eId.split("$")[2]; var gObj = this.doc.getElementById(gid); if (!gObj) 
 continue; }
 
 if (eId == "#ICDataLang")
 eObj.id= encodeURIComponent(eObj.id); sTmp += ptCommonObj2.getNV(eObj); if (eId != "ICResubmit" && eId != "ICType" && eId != "ICElementNum" && eId != "ICStateNum")
 { }
 else {
 if (eId == "ICResubmit")
 sTmpModal += "ICResubmit=1&ICAJAX=1&"; else
 sTmpModal += ptCommonObj2.getNV(eObj); }

 if (eId.indexOf("$hnewpers$") != -1)
 continue;  sTmpModal2 += ptCommonObj2.getNV(eObj); } 
 } 
 
 return [sTmp, sTmpModal, sTmpModal2]; },

 
 processPIAPostChangedParams: function(sTmp, sTmpModal, sTmpModal2)
 {
 
 var sScript = "var chgFldArr = this.doc.chgFldArr_" + this.form.name + ";"; eval(sScript); if (this.bTypeahead && chgFldArr.length == 1 && this.TAFieldID == chgFldArr[0])
 { 
 this.bTypeAheadOnly = true; sTmp += "ICTypeAheadOnly=1&"; }

 
 while (chgFldArr.length > 0) 
 {
 var eId = chgFldArr.shift(); var eObj = null; var cId = this.form.name + "div" + eId; if (cId.indexOf("$selm") != -1)
 cId = this.form.name + "div" + eId.replace('$selm', '$selmh'); else if (cId.indexOf("$selall") != -1) 
 cId = this.form.name + "div" + eId.replace('$selall', '$selallh'); var cObj = this.doc.getElementById(cId); if (cObj) 
 {
 var ochangedObjects = cObj.children; var end = ochangedObjects.length; for (var i = 0; i < end; i++)
 {
 var eObjTmp = ochangedObjects[i]; if (typeof eObjTmp.id == 'undefined' || (eId != eObjTmp.id)) continue; eObj = eObjTmp; }
 }

 if (eObj == null)
 eObj = this.doc.getElementById(eId);  if (eObj == null)
 continue;  if ((eId == "#ICIncludeHistory" || eId == "#ICCorrectHistory" || eId == "#ICMatchCase") && !eObj.checked)
 continue; else { 
 if (eObj.tagName == "INPUT" && (eObj.type == "checkbox" || eObj.type == "radio")) 
 {
 var idArr = eObj.id.split("$"); var id = idArr[0]; var eObj2 = null; if (eObj.type == "checkbox") 
 {
 var eid = eObj.id; if (eid.indexOf("$selm") != -1)
 id = eid.replace('$selm', '$selmh'); else if (eid.indexOf("$selall") != -1) 
 id = eid.replace('$selall', '$selallh'); else
 id = eObj.id + "$chk"; if (cObj)
 {
 var ochangedChildNDs = cObj.children; var end = ochangedChildNDs.length; for (var i = 0; i < end; i++) 
 {
 var eObjTmp = ochangedChildNDs[i]; if (typeof eObjTmp.id == 'undefined' || (id != eObjTmp.id)) 
 continue; eObj2 = eObjTmp; }
 }
 if (eObj2 == null)
 eObj2 = this.doc.getElementById(id); if (eid.indexOf("$selm") == -1)
 {
 if (!eObj2 && idArr.length > 1) 
 {
 id = idArr[0]; for (var i = 1; i < idArr.length - 1; i++)
 id += '$' + idArr[i]; id += "$chk$" + idArr[idArr.length - 1]; if (cObj) 
 {
 var ochangedChildNDs = cObj.children; var end = ochangedChildNDs.length; for (var i = 0; i < end; i++) 
 {
 var eObjTmp = ochangedChildNDs[i]; if (typeof eObjTmp.id == 'undefined' || (id != eObjTmp.id)) continue; eObj2 = eObjTmp; }
 }
 if (eObj2 == null)
 eObj2 = this.doc.getElementById(id); }
 } 
 } 
 else if (eObj.type == "radio")
 {
 var tscript = 'var radioGrp = this.form.' + eObj.id; eval(tscript); for (var j = 0; j < radioGrp.length; j++) 
 {
 if (radioGrp[j].checked)
 eObj = radioGrp[j]; }
 id = eObj.id + "$rad"; if (cObj)
 {
 var ochangedChildNDs = cObj.children; var end = ochangedChildNDs.length; for (var i = 0; i < end; i++)
 {
 var eObjTmp = ochangedChildNDs[i]; if (typeof eObjTmp.id == 'undefined' || (id != eObjTmp.id)) continue; eObj2 = eObjTmp; }
 }
 if (eObj2 == null)
 eObj2 = this.doc.getElementById(id); if (!eObj2 && idArr.length > 1)
 {
 id = idArr[0]; for (var i = 1; i < idArr.length - 1; i++)
 id += '$' + idArr[i]; id += "$rad$" + idArr[idArr.length - 1]; if (cObj)
 {
 var ochangedChildNDs = cObj.children; var end = ochangedChildNDs.length; for (var i = 0; i < end; i++) 
 {
 var eObjTmp = ochangedChildNDs[i]; if (typeof eObjTmp.id == 'undefined' || (id != eObjTmp.id)) continue; eObj2 = eObjTmp; }
 }
 if (eObj2 == null)
 eObj2 = this.doc.getElementById(id); }
 } 
 
 if (eObj2) 
 {
 sTmp += ptCommonObj2.getNV(eObj2); sTmpModal2 += ptCommonObj2.getNV(eObj2); }

 if (!eObj.checked)
 continue; }
 sTmp += ptCommonObj2.getNV(eObj); sTmpModal2 += ptCommonObj2.getNV(eObj); }
 } 

 return [sTmp, sTmpModal, sTmpModal2]; },

 
 processPIAPostUncleanForm: function(sTmp, sTmpModal, sTmpModal2)
 {
 
 var sScript = "this.doc.chgFldArr_" + this.form.name + " = new Array();"; eval(sScript);  var frmElements = this.form.elements; var len = frmElements.length; for (var i = 0; i < len; i++) 
 {
 var eObj = frmElements[i]; var eId = eObj.id;  if (typeof eId != 'undefined') 
 {
 if (eId != "ICResubmit" && eId != "ICType" && eId != "ICElementNum" && eId != "ICStateNum")
 { }
 else {
 if (eId == "ICResubmit")
 sTmpModal += "ICResubmit=1&ICAJAX=1&"; else
 sTmpModal += ptCommonObj2.getNV(eObj); }
 }

 if ((eId == "#ICIncludeHistory" || eId == "#ICCorrectHistory" || eId == "#ICMatchCase") && !eObj.checked)
 continue; else { 
 if (eObj.tagName == "INPUT" && (eObj.type == "checkbox" || eObj.type == "radio")) 
 {
 if (!eObj.checked)
 continue; }
 }

 sTmp += ptCommonObj2.getNV(eObj); if (eId.indexOf("$hnewpers$") == -1)
 sTmpModal2 += ptCommonObj2.getNV(eObj); } 
 
 return [sTmp, sTmpModal, sTmpModal2]; },

 
 processPIAPostParams: function() 
 {
 if (!this.form)
 return true; var sTmp = ""; var sTmpModal = ""; var sTmpModal2 = "ICAJAX=1&";  if ((typeof bCleanHtml != "undefined") && bCleanHtml) 
 { 
 if (ptCommonObj2.isPromptReq(this.id) && this.id.indexOf("$prompt") !=-1 && !this.bTypeAhead) 
 {
 var aid = this.id.replace("$prompt", ""); sScript = "addchg_"+this.form.name+"(null,aid);"; eval(sScript); }

 
 var returnValues = this.processPIAPostHiddenParams(sTmp, sTmpModal, sTmpModal2); sTmp = returnValues[0]; sTmpModal = returnValues[1]; sTmpModal2 = returnValues[2];  var returnValues = this.processPIAPostChangedParams(sTmp, sTmpModal, sTmpModal2); sTmp = returnValues[0]; sTmpModal = returnValues[1]; sTmpModal2 = returnValues[2]; } 
 else {
 
 var returnValues = this.processPIAPostUncleanForm(sTmp, sTmpModal, sTmpModal2); sTmp = returnValues[0]; sTmpModal = returnValues[1]; sTmpModal2 = returnValues[2]; }

 if (this.params != "") 
 this.params += "&"; if (this.bAjax) 
 this.params += "ICAJAX=1";  else 
 this.params += "ICAJAX=0"; if (this.bPrompt) 
 this.params += "&ICSPROMPT=1"; if (typeof (bSearchDialog_empty) != "undefined" && bSearchDialog_empty)
 this.params += "&ICFRMSEARCH=1";   var bNavTypeDropDown = 0; if (!isCrossDomain(parent) && typeof (parent.ptIframe) != "undefined") 
 {
 if (typeof (parent.pthNav) != "undefined") 
 bNavTypeDropDown = 1; }

 if (bNavTypeDropDown) 
 this.params += "&ICNAVTYPEDROPDOWN=1";  else 
 this.params += "&ICNAVTYPEDROPDOWN=0"; if (sTmpModal != "") 
 this.paramsModal = sTmpModal; if (sTmpModal2 != "") 
 this.paramsModal2 = sTmpModal2; if (sTmp != "") 
 this.params += ("&" + sTmp);  if ((this.params).lastIndexOf("&") == ((this.params).length - 1))
 this.params = (this.params).substr(0, (this.params).length - 1); return true; },
 




reduceScrollareaHeight:function(id, data)
 {
 if (!id || id =="" || !data || data =="" || this.bTypeahead)
 return;  var icActionVal =this.GetInProcessICActionValue();  if (typeof icActionVal != "undefined" && icActionVal && icActionVal.indexOf("$new$") >= 0)
 return; if (data.indexOf("$scrolli$") < 0 && data.indexOf("$scroll$") < 0 && data.indexOf("$scrollm$") < 0 ) 
 return; var updateObj = document.getElementById(id);  if (!updateObj)
 return;  if (updateObj.children.length <1)
 return;    var scrollAreObj = updateObj.children[0];  if (!scrollAreObj)
 return;   if (scrollAreObj.className == "" || scrollAreObj.className == " " || (scrollAreObj.className).indexOf("SCROLLAREA")>=0 || (scrollAreObj.className).indexOf("GRIDWBO")>=0)
 {
 var parentObj = scrollAreObj.offsetParent; if (parentObj && parentObj.nodeName == "TD")
 {
 var prevSibling; if (browserInfoObj2.isIE) 
 {
 if (typeof parentObj.previousElementSibling =="undefined")
 prevSibling = parentObj.previousSibling; else 
 prevSibling = parentObj.previousElementSibling;  }
 else
 prevSibling = parentObj.previousElementSibling;   var newHeight = 0;  var newData; if (typeof String.prototype.trim != "function")
 newData = data; else 
 newData = data.trim(); var nEnd = newData.indexOf(">"); if (newData.indexOf("<") == 0 && nEnd > 0)
 {
 newData = newData.substr(0, nEnd+1); var nStart = newData.indexOf(net2.PSHEIGHT); if (nStart >=0)
 {
 newData = newData.substr(nStart+ (net2.PSHEIGHT).length); var nEnd = newData.indexOf("'"); newData = newData.substr(0,nEnd); newHeight = Number(newData); }
 }
 
 
 if (prevSibling && prevSibling.nodeName == "TD" && prevSibling.innerHTML == "")
 {
 if (newHeight >0)
 {
 if (prevSibling.height > newHeight)
 prevSibling.style.height = newHeight + "px"; }
 else if (prevSibling.height > 90)
 {
 prevSibling.style.height = 90 + "px"; } 
 }
 
 
 if (prevSibling && prevSibling.height > 228)
 this.reduceGroupboxHeight(prevSibling); }
 }
 },

 
 reduceGroupboxHeight:function(prevSibling) 
 {
 if (!prevSibling)
 return; if (prevSibling.offsetParent && prevSibling.offsetParent.offsetParent && prevSibling.offsetParent.offsetParent.offsetParent
 && prevSibling.offsetParent.offsetParent.offsetParent.offsetParent)
 {
 if (prevSibling.offsetParent.className == "PSGROUPBOX" && 
 prevSibling.offsetParent.offsetParent.className == "" &&
 prevSibling.offsetParent.offsetParent.offsetParent.className=="PSGROUPBOXWBO" &&
 prevSibling.offsetParent.offsetParent.offsetParent.offsetParent.nodeName=="TD")
 {
 var currentObj = prevSibling.offsetParent.offsetParent.offsetParent.offsetParent; var prevTdSibling; if (browserInfoObj2.isIE) 
 {
 if (typeof currentObj.previousElementSibling =="undefined")
 prevTdSibling = currentObj.previousSibling; else 
 prevTdSibling = currentObj.previousElementSibling;  }
 else
 prevTdSibling = currentObj.previousElementSibling;  if (prevTdSibling && prevTdSibling.nodeName == "TD" && prevTdSibling.innerHTML == "")
 {
 if (prevTdSibling.height > 90)
 prevTdSibling.style.height = 90 + "px"; }
 
 }
 }
 },
 

 
 convertCharToCharRef:function(sXMLText)
 {
 var sText = sXMLText; if (sText.indexOf("\u001E") != -1) {
 bRecSep = 1; sText = sText.replace(/\u001E/g, "&#30;");  }
 if (sText.indexOf("\u001D") != -1) {
 bGrpSep = 1; sText = sText.replace(/\u001D/g, "&#29;");  }
 if (sText.indexOf("\u001C") != -1) {
 bFilSep = 1; sText = sText.replace(/\u001C/g, "&#28;");  }
 if (sText.indexOf("\u001F") != -1) {
 bUniSep = 1; sText = sText.replace(/\u001F/g, "&#31;");  }
 if (sText.indexOf("\u0001") != -1) {
 bSOH = 1; sText = sText.replace(/\u0001/g, "&#1;");  }
 if (sText.indexOf("\u001A") != -1) {
 bSUB = 1; sText = sText.replace(/\u001A/g, "&#26;");  }
 if (sText.indexOf("\u000C") != -1) {
 bFF = 1; sText = sText.replace(/\u000C/g, "&#14;");  }

 return sText; },





























 processXML:function()
 {
 oDoc = document; var bModalErr = false; if (!this.sXMLResponse) {
 var val = getPSLoginCookieValue();  if (val == -1)
 {
 if (isSignout())
 self.location=DoPortalUrl(timeOutURL);  else
 window.parent.document.body.innerHTML=this.req.responseText; return; }
 if (typeof ptConsole2 != 'undefined' && ptConsole2 && ptConsole2.isActive() && bPerf)
 {
 this.nStartResponse = (new Date()).valueOf(); ptConsole2.append((new Date()).valueOf() + " server return. response:"+this.req.responseText.length); } 

 var ct = this.req.getResponseHeader("content-type"); var bModal = this.req.getResponseHeader('bModal'); var sCancelName = this.req.getResponseHeader('sCancelName'); var sPopupOptions = this.req.getResponseHeader('sPopupOptions'); this.bModal = bModal; this.bModalPopup = (bModal == 8) ? true : false; if (this.bModalPopup)
 bModal = 3; else
 sPopupOptions = ""; if (typeof ptConsole2 != 'undefined' && ptConsole2 && ptConsole2.isActive() && !bPerf) {
 this.nStartResponse = (new Date()).valueOf();  if (ct.indexOf("xml") != -1 || ct.indexOf("html") != -1)
 ptConsole2.append((new Date()).valueOf() + " bModal:" + bModal + "\n response:"+this.req.responseText.length+"\n" + this.req.responseText); else
 ptConsole2.append((new Date()).valueOf() + " bModal:" + bModal + "\n content type:" + ct); }

 if (bModal == 2 || bModal == 5) {
 if (bModal == 5 && typeof window.winParent != 'undefined' && window.winParent != null) {
 var bNotXML = 0; if (ct.indexOf("xml") == -1) {
 bNotXML = 1;  }
 sScript = "var win = getFirstParentWin();"; loader == null; sScript += "win.nResubmit++;win.aAction_" + this.form.name + "(this.form, 'Resubmit');"; pm.updateMessageEvents(this.id); eval(sScript); if(bNotXML)
 closeModalAll(); return; }
 else if (bModal == 2 && (typeof window.modWin == 'undefined' || window.modWin == null)
 && (typeof window.modWinClosed == 'undefined' || window.modWinClosed == null)
 && (typeof window.winParent != 'undefined') && window.winParent != null) {
 winParent.nResubmit++; loader == null; var sScript = "winParent.aAction_" + this.form.name + "(this.form, 'Resubmit');"; pm.updateMessageEvents(this.id); eval(sScript); return; }
 else {
 nResubmit = 0; try {
 var sScript = "this.form = oDoc." + this.form.name + ";"; eval(sScript); if (bModal == 5 && ct.indexOf("xml") == -1) {
 if (typeof window.winParent != 'undefined' && window.winParent != null) {
 alert("FATAL ERROR bModal=" + bModal + " - Partial page refresh should be returned, but not."); this.SetInProcess(false); this.SetWaitingObject(null, "", null, false, false); closeModal(); return; }
 else {
 bModal = ""; this.bModal = bModal; }
 }
 }
 catch (err) {
 if (typeof window.winParent != 'undefined' && window.winParent != null) {
 alert("FATAL ERROR bModal=" + bModal + " - Partial page refresh should be returned, but not."); this.SetInProcess(false); this.SetWaitingObject(null, "", null, false, false); closeModal(); return; }
 else {
 bModal = ""; this.bModal = bModal; }
 }
 }
 }

 bModalErr = this.req.responseText.indexOf("<div id='PSMODAL_ERR'") > 0; if (ct.indexOf("xml") == -1 && !bModalErr) { 
 if (bModal == 3 || bModal == 4 || bModal == 5 || bModal == 6) 
 { 
 if (isFModeLayout()) doCloseLocalModals(); var url = this.form.action; if (typeof this.form.ICFromPagelet != 'undefined')
 url = this.form.ICContentURL.value; var parentWin = window.winParent; if (bModal == 6) {
 parentWin = getFirstParentWin(); url += '?' + this.paramsModal; this.SetInProcess(false); this.SetWaitingObject(null,"",null,false,false); closeModalAll(); parentWin.modWin = null; parentWin.doModal(url, this.bPrompt, parentWin, sCancelName, this.form, this.id, sPopupOptions, this.req.responseText); return; }
 else if (bModal != 3 && parentWin != null && this.form) {
 if (typeof window.modWin != 'undefined' && window.modWin != null) {
 this.form.ICResubmit.value = "1"; this.form.submit(); return; }
 else { 
 winParent.doModal(url + '?' + this.paramsModal, this.bPrompt, winParent, sCancelName, this.form, this.id, sPopupOptions, this.req.responseText); return; }
 }
 else {
 if (bModal == 4)
 this.closeModal(); nResubmit = 0; loader = null;  doModal(url + '?' + this.paramsModal, this.bPrompt, window, sCancelName, this.form, this.id, sPopupOptions, this.req.responseText); return; }
 } 
 if (bModal == 2)
 {
 this.SetInProcess(false); this.SetWaitingObject(null,"",null,false,false); this.closeModal(); }
 if (typeof this.form.ICFromPagelet != 'undefined') {
 var sResubmitURL = this.req.getResponseHeader('sResubmitURL'); if (sResubmitURL)
 this.form.ICResubmitURL.value = sResubmitURL; }
 this.form.ICResubmit.value="1"; var bDoUpdateParent = (getFirstParentWin() && getFirstParentWin().name != "") ? true : false;  if (window.winParent != null && bModal != 7 && bDoUpdateParent) {
 doUpdateFirstParent(this.form, this.id, getFirstParentWin()); return; }
 else {
 if (isFModeLayout() && this.form.encoding.indexOf("multipart/form-data") != -1) {
 this.form.encoding = "application/x-www-form-urlencoded"; this.form.enctype = "application/x-www-form-urlencoded"; }
 this.form.submit(); if (ct.indexOf("html") == -1) {
 var sScript = "processing_" + this.form.name + "(0, 3000);"; eval(sScript); }
 this.SetInProcess(false); this.SetWaitingObject(null,"",null,false,false); return; }
 } 
 } 

 if (bModalErr)
 {
 
 var nLen = this.req.responseText.length;  var nPos = this.req.responseText.indexOf("<?xml");  var nStrLen= nLen - nPos - 26;  this.sXMLResponse = this.req.responseText.substr(nPos, nStrLen);  }
 
 var xmlDoc = null;  if (window.ActiveXObject)
 { 
 if (this.sXMLResponse) {
 xmlDoc = this.createIEXMLParser(); xmlDoc.async = "false"; var sText = this.convertCharToCharRef(this.sXMLResponse); xmlDoc.loadXML(sText); }
 else {
 
 var bHaveErr = false; if (this.req != null && this.req.responseXML == null) 
 bHaveErr = true; else if (typeof this.req.responseXML.parseError != 'undefined') {
 if (this.req.responseXML.parseError.errorCode != 0)
 bHaveErr = true; }
 else if (!browserInfoObj2.isIE) {
 if (this.req.responseXML.documentElement.nodeName != 'parsererror' || this.req.responseXML.getElementsByTagName('parsererror').length >0)
 bHaveErr = true; }

 if (!bHaveErr) 
 xmlDoc = this.req.responseXML; else { 
 xmlDoc = this.createIEXMLParser(); xmlDoc.async = "false"; try {
 if (this.req.responseText)
 var sText = this.convertCharToCharRef(this.req.responseText); else
 var sText = this.req.responseText; xmlDoc.loadXML(sText); }
 catch (e) {
 alert("invalid xml"); return; }
 }
 }
 }
 else
 { 
 var parser=new DOMParser(); if (this.sXMLResponse) {
 var sText = this.convertCharToCharRef(this.sXMLResponse); xmlDoc = parser.parseFromString(sText, "text/xml"); } else {
 
 
 if (this.req.responseText)
 var sText = this.convertCharToCharRef(this.req.responseText); else
 var sText = this.req.responseText; xmlDoc = parser.parseFromString(sText, "text/xml"); }
 if (xmlDoc.documentElement.nodeName=="parsererror" || xmlDoc.getElementsByTagName('parsererror').length > 0) {
 if (this.req.responseText)
 var sText = this.convertCharToCharRef(this.req.responseText); else
 var sText = this.req.responseText; xmlDoc=parser.parseFromString(sText,"text/xml"); if (xmlDoc.documentElement.nodeName=="parsererror" || xmlDoc.getElementsByTagName('parsererror').length > 0) {
 alert("xml is invalid"); return; }
 }
 } 
 
 var promptList = xmlDoc.getElementsByTagName("PFIELD");  var scriptList = xmlDoc.getElementsByTagName("GENSCRIPT"); var sysvar = xmlDoc.getElementsByTagName("SYSVAR"); this.msgList = xmlDoc.getElementsByTagName("GENMSG"); var fieldList = xmlDoc.getElementsByTagName("FIELD"); rteditorlist = xmlDoc.getElementsByTagName("RTEDITORSCRIPT");  var modalfield = xmlDoc.getElementsByTagName("MFIELD"); var jsList = xmlDoc.getElementsByTagName("GENJS");  var cssList = xmlDoc.getElementsByTagName("GENCSS");   if (sysvar && sysvar.length>0) 
 {
 for (var i=0; i < sysvar.length; i++) 
 eval(sysvar[i].firstChild.data); }

 if ((typeof bTransferAnimate != "undefined") && bTransferAnimate)
 transferAnimationIn(); if (scriptList) 
 {
 for (var i=0; i < scriptList.length; i++)
 {
 var sTmp = ""; if(scriptList[i].firstChild != null)
 sTmp = (scriptList[i].firstChild.data).toLowerCase();  if (sTmp.indexOf("document.location=") == 0 || sTmp.indexOf("document.location =") == 0) 
 {
 pm.updateMessageEvents(this.id); var sTmp2 = scriptList[i].firstChild.data; var pos = 19; var sOrigURL =sTmp2.substring(pos, sTmp2.length - 2); var sURL = preProcessUrl(sOrigURL, window, top, this.form); sURL = sURL.replace(/&REG/g,"&%52%45%47");    for (var j=0; j < scriptList.length; j++)
 {
 if (i == j)
 continue; var sTmp3= scriptList[j].firstChild.data; if (sTmp3.indexOf("PS_switch_user_url") != -1)
 {
 eval(sTmp3); sURL = PS_switch_user_url + "&ruri=" + encodeURIComponent(sURL); break; }
 }
 scriptList[i].firstChild.data = sTmp2.substring(0, pos) + sURL + sTmp2.substring(sTmp2.length - 2); this.DoUrlAJAX(sURL, scriptList); if (sURL.indexOf("mailto:") ==0)
 break; else 
 return; } 
 } 
 } 

 
 if (cssList && cssList.length > 0) 
 { 
 eval(cssList[0].firstChild.data); this.processIncludeCSS(); }

 this.nScript=-1; this.nSrcScript=-1; this.bScript=false; this.arrScript = new Array();   if (jsList && jsList.length > 0) 
 {
 var jsData = jsList[0].firstChild.data; jsData = jsData.replace("net2.arrSrcScriptApp", "this.arrSrcScriptApp"); eval(jsData); this.processIncludeJS(); }

 if (fieldList)
 {
 var sCleanData = "", sData = "", bAnyDirty = false; if (typeof ptConsole2 != 'undefined' && ptConsole2 && ptConsole2.isActive() && bPerf)
 ptConsole2.append((new Date()).valueOf() + " partial page refresh start");  saveFldArr = new Array(); if ((typeof bDefer != "undefined") && bDefer && !browserInfoObj2.isIE) {
 var sScript = "saveFldArr = this.doc.chgFldArr_" + this.form.name + ";"; eval(sScript); }

 
 
 
 
 
 if (this.bTypeAhead && typeof(saveTALostFocus) == "function")
 {
 var taLostFocus = saveTALostFocus(); }

 for (var flIdx=fieldList.length-1; flIdx > -1; flIdx--)
 {
 attrs=fieldList[flIdx].attributes; var id=attrs.getNamedItem("id").value;  if (this.doPopupAction(id, fieldList[flIdx])) continue; oid = id.substr(3 + this.form.name.length, id.length);  var classValue = "", pclassValue = "", bDirty = false; if (attrs.getNamedItem("bDirty")) {
 bDirty = true; bAnyDirty = true; }
 if (attrs.getNamedItem("class"))
 classValue = attrs.getNamedItem("class").value; if (attrs.getNamedItem("pclass"))
 pclassValue = attrs.getNamedItem("pclass").value; var obj = oDoc.getElementById(id); if (obj) {
 if (classValue.length > 0)
 obj.setAttribute("class", classValue);  if (pclassValue.length > 0) {
 if (obj.parentNode)
 obj.parentNode.setAttribute("class", pclassValue); }

 
 if (this.formname + "hdrdivPT_WORK_PT_BUTTON_BACK" == id) {
 var pt_history = getHistoryObject(); if (pt_history && pt_history.size() <= 1) { addClass(obj, "psc_disabled"); }
 }
 
 if (isFModeLayout() && (classValue.length > 0 || pclassValue.length > 0) && fieldList[flIdx].firstChild.data.length == 0)
 continue; if (obj.innerHTML.length == 0 && fieldList[flIdx].firstChild.data.length == 0)
 continue;   sCleanData = fieldList[flIdx].firstChild.data;  if (!isFModeLayout()) {
 
 try {
 this.reduceScrollareaHeight(id,sCleanData.substr(0,200));  }
 catch (e) {}
 }
 
 
 if ((typeof bCDATA != "undefined") && bCDATA && 
 (sCleanData.indexOf("&lt;![CDATA*") != -1 || sCleanData.indexOf("<![CDATA*") != -1) && 
 (sCleanData.indexOf("*]&gt;") != -1 || sCleanData.indexOf("*]>") != -1))
 sCleanData = this.restoreXMLData(sCleanData);  if (bRecSep == 1 && sCleanData.indexOf("&#30;") != -1)
 sCleanData = sCleanData.replace(/&#30;/g, "\u001E"); if (bGrpSep == 1 && sCleanData.indexOf("&#29;") != -1)
 sCleanData = sCleanData.replace(/&#29;/g, "\u001D"); if (bFilSep == 1 && sCleanData.indexOf("&#28;") != -1)
 sCleanData = sCleanData.replace(/&#28;/g, "\u001C"); if (bUniSep == 1 && sCleanData.indexOf("&#31;") != -1)
 sCleanData = sCleanData.replace(/&#31;/g, "\u001F"); if (bSOH == 1 && sCleanData.indexOf("&#1;") != -1)
 sCleanData = sCleanData.replace(/&#1;/g, "\u0001"); if (bSUB == 1 && sCleanData.indexOf("&#26;") != -1)
 sCleanData = sCleanData.replace(/&#26;/g, "\u001A"); if (bFF == 1 && sCleanData.indexOf("&#14;") != -1) 
 sCleanData = sCleanData.replace(/&#14;/g, "\u000C");  if (rteditorlist)
 {
 var RTArea = obj.getElementsByTagName('textarea'); if (RTArea.length >0)
 {
 var countrtarea; var ResponseDataObject= document.createElement('div'); ResponseDataObject.setAttribute('id','TempResponse'); ResponseDataObject.innerHTML = sCleanData; var RTAreanew = ResponseDataObject.getElementsByTagName('textarea'); for(var ii = 0; ii < RTArea.length; ii++)
 {
 countrtarea = 0; for(var jj=0; jj < RTAreanew.length; jj++)
 {
 if (RTArea[ii].id == RTAreanew[jj].id)
 countrtarea = countrtarea + 1; }
 if (countrtarea == 0 )
 { 
 if (typeof(CKEDITOR)!== "undefined") 
 {
 for ( var instanceName in CKEDITOR.instances)
 { 
 if (instanceName == RTArea[ii].id) {
 try {
 eval(CKEDITOR.instances[instanceName].destroy()); }catch(e){}
 }
 } 
 }
 }
 } 
 } 
 RTArea = null; ResponseDataObject = null; RTAreanew = null; } 

 
 var action = attrs.getNamedItem("action"); if ((typeof bCleanHtml == "undefined") || !bCleanHtml || bDirty) {

 if (typeof ptConsole2 != 'undefined' && ptConsole2 && ptConsole2.isActive() && bPerf)
 ptConsole2.append((new Date()).valueOf() + "call processScript start"); sData = this.processScript(id, sCleanData); if (sData && sData.length>0)
 sCleanData = sData; if (typeof ptConsole2 != 'undefined' && ptConsole2 && ptConsole2.isActive() && bPerf)
 ptConsole2.append((new Date()).valueOf() + "call processScript end"); }

 if (isFModeLayout() && id.indexOf("divPAGECONTAINER") != -1) {
 var id = getPTDialog().getGridSortModalId(); if (id.length != 0) { 
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + id); this.sortid = modObj.sortid; autoCloseGridSort(); }
 }

 if ((typeof bTransferAnimate != "undefined") && bTransferAnimate && id.indexOf("divPAGECONTAINER") != -1) {
 this.gXMLObj = obj; this.gCleanData = sCleanData; gAJAXNet = this; }
 else if (action) {
 this.doAction(action, sCleanData, obj); }
 else{

 obj.innerHTML = "";  obj.innerHTML = sCleanData; }

 sCleanData = null; sData = null;    if (typeof bHtml5Doc == "undefined" || bHtml5Doc == false)
 {
 
 if ((browserInfoObj2.isIE) && (oid != "QUERYRESULT") && (obj.firstChild != null) && (obj.firstChild.tagName != null) && 
 (((obj.firstChild.tagName).toUpperCase().indexOf("TABLE") >= 0))) 
 {
 if (!(window.document.dir == 'rtl' && (oid == "PAGECONTAINER" || oid == "PSPANELTABS")))
 {
 if (window.document.dir != 'rtl')
 obj.style.width = 0;   obj.style.width = obj.firstChild.offsetWidth; }
 }
 }
 } 
 } 
 
 if (bAnyDirty) bCleanHtml = false; if (!browserInfoObj2.isIE) {
 
 var sScript = "this.doc.chgFldArr_" + this.form.name + "=saveFldArr;"; eval(sScript);  }

 if (typeof(taLostFocus) == "function")
 {
 taLostFocus(); }

 if (typeof ptConsole2 != 'undefined' && ptConsole2 && ptConsole2.isActive() && bPerf)
 ptConsole2.append((new Date()).valueOf() + " partial page refresh end"); } 
 
 try {
 if (window.modWin && window.modWin.modalZoomName != null) {
 var zObj = window.document.getElementById(window.modWin.modalZoomName); if (zObj && zObj.style.display == "none") zObj.style.display = "block"; }
 } catch (e) {
 }
 
 
 
 if (this.bTypeahead && !this.bTypeAheadOnly)
 {
 var TAField = oDoc.getElementById(this.form.ICTypeAheadID.value); if (TAField != null && this.TAFieldValue != '' && TAField.value != this.TAFieldValue)
 TAField.value = this.TAFieldValue; }
 
 
 var sScript = "ptTAObj_" + this.formname + ".HideTheBox();";  sScript += "if (isFModeLayout() && !this.bTypeAhead) ptTAObj_" + this.formname + ".PositionTopClear();"; try {
 eval(sScript); } catch (e) {
 }

 if (this.msgList)
 {
 for (var i = 0; i < this.msgList.length; i++) {
 var msg = this.msgList[i].firstChild.data; addMsg(msg); }
 }


 if (typeof ptConsole2 != 'undefined' && ptConsole2 && ptConsole2.isActive() && bPerf)
 ptConsole2.append((new Date()).valueOf() + " scripts start"); if (scriptList)
 this.OnloadScriptList = scriptList; else 
 this.OnloadScriptList=""; if ((typeof bTransferAnimate != "undefined") && bTransferAnimate) return;  if (this.bScript) { 
 this.nScriptfileIndex=0; this.nScriptfiles = this.arrSrcScript.length; if (this.nScriptfiles == 0) {
 this.finalCall(); return; }
 this.getScriptfile(); }
 else {
 this.finalCall(); return; } 

if (typeof ptConsole2 != 'undefined' && ptConsole2 && ptConsole2.isActive() && bPerf)
 ptConsole2.append((new Date()).valueOf() + " scripts & request end"); },

doPopupAction: function (id, fieldData)
{
 var oDoc = document; var attrs = fieldData.attributes; var id = attrs.getNamedItem("id").value; if (!isFModeLayout()) return false; if (id.indexOf("modalPopup") == -1 && id.indexOf("ctxmenu") == -1 && id.indexOf("modalViewAttach") == -1) return false; var mObj = null; mObj = oDoc.getElementById(id); var sOptions = "", bFrame = false; if (id.indexOf("modalViewAttach") != -1) bFrame = true; if (id.indexOf("ctxmenu") != -1 && mObj)
 sOptions = mObj.getAttribute('options'); else {
 if (!mObj)
 mObj = oDoc.createElement('div'); mObj.setAttribute('id', this.id + '$divpop'); sOptions = "bPIA@1;bPopup@1;"; sOptions += attrs.getNamedItem("options").value; if (sOptions.indexOf("sPopupParent") == -1)
 sOptions += "sPopupParentId@" + this.id + ";"; }
 mObj.innerHTML = fieldData.firstChild.data; mObj.setAttribute('options', sOptions); doCloseLocalModals(); setLocalModal(true); addDivPopup(mObj, this.win, sOptions, "", bFrame); return true;},

doAction: function (action, sCleanData, obj)
{
 objP = obj.parentNode; objP.setAttribute('action', action.value); objBody = obj.querySelector(".ps_grid-body"); if (obj.getAttribute('class') && obj.getAttribute('class').indexOf("ps_box-scrollarea") != -1)
 objBody = obj; if (!objBody) return;  if (action.value.indexOf("a") != -1) {
 objBody.innerHTML += sCleanData; }
 else
 objBody.innerHTML = sCleanData; if (action.value.indexOf("l") != -1) {
 if (action.value.indexOf("pl") != -1) {
 var objPrev = GetLazyScrollObj(obj.parentNode, true); obj.removeChild(objPrev); } else { 
 var objMore = GetLazyScrollObj(obj); if (objMore)
 obj.removeChild(objMore); else {
 objMore = GetLazyScrollObj(obj.parentNode); if (objMore)
 obj.removeChild(objMore); }
 } 
 }
},

resume:function() 
{
 this.gXMLObj.innerHTML = ""; this.gXMLObj.innerHTML = this.gCleanData; this.gCleanData = ""; this.gXMLObj = null; if (this.bScript) { 
 this.nScriptfileIndex = 0; this.nScriptfiles = this.arrSrcScript.length; if (this.nScriptfiles == 0) {
 this.finalCall(); return; }

 this.getScriptfile(); }
 else {
 this.finalCall(); return; }
},




restoreXMLData:function(sRespdata) 
{
 var sTmpdata = sRespdata; if (sRespdata.indexOf("&lt;![CDATA*") != -1)
 sTmpdata=(sTmpdata.replace(/&lt;!\[CDATA\*/g,"&lt;![CDATA[")); if (sRespdata.indexOf("<![CDATA*") != -1)
 sTmpdata=(sTmpdata.replace(/<!\[CDATA\*/g,"<![CDATA[")); if (sRespdata.indexOf("*]&gt;") != -1)
 sTmpdata=(sTmpdata.replace(/\*\]\&gt;/g,"]]&gt;")); if (sRespdata.indexOf("*]>") != -1)
 sTmpdata=(sTmpdata.replace(/\*\]\>/g,"]]>")); return sTmpdata;},

loadedAllScriptfiles:function() 
{
 if (this.nScriptfiles>0 && this.nScriptfileIndex >= this.nScriptfiles) 
 {
 if (this.objGrouplet)
 this.updateGrouplet(); else
 this.finalCall(); return 1; }
 else if (this.nScriptfiles>0)
 return 0; else
 return 1; },

getScriptfile:function() 
{
 if (this.loadedAllScriptfiles()) return;   var i = this.nScriptfileIndex; if (this.nScriptfiles>0 && i<this.nScriptfiles) 
 {
 var tmp = this.arrSrcScript[i].split("/"); var Id = tmp[tmp.length - 1].split("."); var newId = (Id[0].concat("_")).concat(Id[1]); var oldScript = document.getElementById(newId); var oHead=document.getElementsByTagName("head")[0]; if (oldScript) 
 {
 this.nScriptfileIndex++; this.GetNextJSFile(); return; }
 this.oScript = document.createElement("script");  this.oScript.setAttribute("id",newId); this.oScript.setAttribute("type","text/javascript"); this.nScriptfileIndex++; if (this.arrSrcScript[i]) {
 this.oScript.setAttribute("src",this.arrSrcScript[i]); this.oScript.objNet = this; this.oSaveHead = oHead; this.loadScriptfile(); } 
 else {
 this.GetNextJSFile(); }
 }
},


loadScriptfile: function()
{ 
 this.oScript.onerror=this.oScript.onload=this.oScript.onreadystatechange = this.GotAsyncData; this.oSaveHead.appendChild(this.oScript);},


GotAsyncData:function() 
{
 

 var myScript = this; if (browserInfoObj2.isIE) {
 myScript = loader.oScript; myScript.objNet = loader; }

 if (!browserInfoObj2.isIE || (browserInfoObj2.isIE && (typeof myScript.readyState == "undefined" || myScript.readyState == "loaded" || myScript.readyState == "complete")))
 {
 
 myScript.objNet.getScriptfile(); myScript.objNet = null; } 
 return;},


GetNextJSFile:function() 
{
 this.getScriptfile();},

DoUrlAJAX: function(sURL, scriptList) {
 var bWorkCenter = isWorkCenter() && !isUrlFrmModal(sURL, window) && (window.ptalPageletArea || (parent && parent.ptalPageletArea)); var bWorkCenterDashboard = isWorkCenterDashboard(sURL); if(bWorkCenterDashboard && isUrlFrmModal(sURL, window) ) {
 if (typeof top.ptalPage == 'object' && top.ptalPage)
 sURL = top.ptalPage.appendPageParameters(sURL); top.document.getElementById('ptifrmtgtframe').src= sURL; this.closeModal(window.modalID); return; }
 if (isModeless(MTop().modlessId)) {
 window.doModeless(sURL, -1, -1, ''); }
 else if (bWorkCenter) {
 this.doWorkCenterRedirect(sURL); if (isUrlFrmModal(sURL, window))
 this.closeModal(window.modalID); this.OnloadScriptList = scriptList; this.finalCall();   var sScript = "processing_" + this.form.name + "(1, 3000);";  eval(sScript); }
 else if (isUrlFrmModal(sURL, window)) {
 this.doModalRedirect(sURL); }
 else if (isPortalUrl(sURL)) {
 this.closeModal(); if (sURL.indexOf("&psredirecttop=y") !== -1) { 
 
 sURL = sURL.replace("&psredirecttop=y", "");  }
 top.location.href = sURL; }
 else if(sURL.indexOf("/PSIGW/RESTListeningConnector/") !== -1) {
 this.closeModal(); top.location.href = sURL; }
 else {
 this.closeModal(); if (sURL.indexOf("mailto:") ==0)
 window.open(sURL);  else {
 if (sURL.indexOf("WEBLIB_PORTAL.PORTAL_HOMEPAGE.FieldFormula.IScript_HPCompRemove") !== -1)
 top.location.href=sURL; else
 window.location.href = sURL; }
 }
},

doWorkCenterRedirect : function(sURL) {
 var sTargetPSHomeSuffix = ""; var sTargetFrameURL = ""; try {
 sTargetFrameURL = top.document.getElementById('ptifrmtgtframe').contentWindow.location.href
 }
 catch(e) {
 sTargetPSHomeSuffix = "_newwin"; }
 if ((typeof sTargetFrameURL != "undefined") && sTargetFrameURL && sTargetFrameURL != "") 
 {
 if(isPortalHomagPageUrl(sTargetFrameURL) || isPIAComponentUrl(sTargetFrameURL) || isPortalUrl(sTargetFrameURL))
 {
 if((getUrlHost(sTargetFrameURL) == getUrlHost(sURL)))
 {
 sTargetPSHomeSuffix = getPSHomeSuffix(sTargetFrameURL); }
 else if((getUrlHost(top.document.location.href) == getUrlHost(sURL)))
 { 
 sTargetPSHomeSuffix=getPSHomeSuffix(top.document.location.href); }
 else
 {
 sTargetPSHomeSuffix = "_newwin"; }
 }
 }
 if((sTargetPSHomeSuffix == "_newwin" && getUrlHost(top.document.location.href) == getUrlHost(sURL)))
 {
 sTargetPSHomeSuffix=getPSHomeSuffix(top.document.location.href); }
 this.closeModal(); this.SetInProcess(false); if(sURL.indexOf("replaceCurrentTopWindow")==-1) 
 sURL = sURL.replace("/psp/","/psc/"); var nUrlPos = String(sURL).indexOf('\/psp\/'); if(nUrlPos === -1)
 var nUrlContPos = String(sURL).indexOf('\/psc\/');  if (nUrlPos != -1 || nUrlContPos != -1)
 {
 var sURLtemp = sURL.split("/"); var siteName = sURLtemp[4]; if(siteName.indexOf("_")!=-1)
 {
 var siteNametemp = siteName.lastIndexOf("_"); var siteNameNewWin = siteName.substring(siteNametemp + 1,siteName.length); if(isNaN(siteNameNewWin))
 {
 if(sTargetPSHomeSuffix != "_newwin")
 sTargetPSHomeSuffix = ""; var siteNamenew = siteName + sTargetPSHomeSuffix;  }
 else
 {
 var siteNamenew = siteName.substring(0,siteNametemp); if(sTargetPSHomeSuffix != "_newwin")
 sTargetPSHomeSuffix = ""; siteNamenew = siteNamenew + sTargetPSHomeSuffix; }
 sURL = sURL.replace(siteName,siteNamenew); }
 else
 {
 var siteNametemp = "/" + siteName + sTargetPSHomeSuffix + "/";  sURL = sURL.replace("/"+siteName+"/", siteNametemp); }
 } 
 
 var obj = document.getElementById("WAIT_" + this.formname); if (obj) {
 obj.style.display="none"; }
 obj = document.getElementById("SAVED_" + this.formname); if (obj) {
 obj.style.display="none"; } 

 
 var isFromNavPane = (window.ptalPageletArea || (parent && parent.ptalPageletArea));  if (isFromNavPane && parent.ptIframe && parent.ptIframe.isWorkCenterDirty()) {
 var cancelFunction = function(arg1, arg2) {
 if(arg2.indexOf("replaceCurrentTopWindow")!=-1) 
 top.location.href=arg2; else 
 top.document.getElementById('ptifrmtgtframe').src= arg2; };  parent.ptIframe.saveWarningForWorkCenter(cancelFunction, null,2,this, sURL); } 
 else if(sURL.indexOf("replaceCurrentTopWindow")!=-1) 
 top.location.href=sURL; else 
 top.document.getElementById('ptifrmtgtframe').src= sURL;},

doModalRedirect: function(sUrl) {
 if (isPortalUrl(sUrl))
 top.location.href = sUrl; else
 getFirstParentWin().location.href = sUrl; closeModalAll();},

closeModal: function(ID){
 if (this.bTypeAhead && !(this.id.indexOf("Resubmit") !== -1)) 
 return; if ((typeof ID != 'undefined' && ID != null) || (typeof window.modWin != 'undefined' && window.modWin != null)) {
 if (typeof ID != 'undefined' && ID != null) {
 if (window.winParent) {
 ptCommonObj2.hidePopupMask(window.winParent); window.winParent.modWin = null; }
 closeModal(ID); } else {
 try { 
 if (window.winParent)
 {
 if (window.modWin.bMsg) 
 closeMsg(null, top.modId); else 
 {
 if (typeof window.modWin.modalID != 'undefined' && window.modWin.modalID != null)
 closeModal(window.modWin.modalID); else 
 {
 
 if (typeof window.modWin.id != 'undefined' && window.modWin.id != null)
 {
 var winID = window.modWin.id; var n = winID.indexOf("_"); var modWinNum = -1; if (n>-1 && winID.length >(n+1) && !isNaN(winID.substring(n+1)))
 {
 modWinNum = (winID.substring(n+1)).valueOf(); closeModal(modWinNum); }
 else
 closeModalAll(); }
 
 else
 closeModalAll(); }
 }
 }
 else {
 if (isWinModeless(window))
 closeModal(window.modWin.modalID); else
 closeModalAll(); }
 }
 catch (e) { }
 window.modWin = null; }
 }
 else if( typeof window != 'undefined' && window.name.indexOf("modWin_") !== -1)
 {
 var sid = this.id; if (sid.indexOf("#KEY") !== -1)
 {
 sid = sid.substring(4); if (sid.charCodeAt() == 27)
 {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + window.modalID); if (typeof modObj != 'undefined' && modObj && modObj.bRCFModal)
 {
 if (typeof MTop().ptDialog != 'undefined' && MTop().ptDialog)
 MTop().ptDialog.doCloseModalDialog(window.modalID); }
 }
 }
 }
},



finalCall:function()
{
 this.arrSrcScript= new Array(); this.nScriptfiles=0; this.nScriptfileIndex=0; if (this.bScript) { 
 var n= this.arrScript.length; for (var xx=0; xx < n; xx++)
 {
 if (this.arrScript[xx]) 
 this.addScript(this.formname+"_"+xx,this.arrScript[xx]);  }

 
 if(typeof Array=="undefined") return; this.arrScript = new Array(); this.bScript = false; }

 
 if(window.ptalPageletArea || (parent && parent.ptalPageletArea))
 {
 var pageletname=this.form.parentElement.id.slice(14); if (window.ptalPageletArea)
 window.ptalPageletArea.fixPageletLinksById(pageletname); else
 parent.ptalPageletArea.fixPageletLinksById(pageletname); }

 var scriptData, el; var bDoModalURL = false; if (this.OnloadScriptList && this.OnloadScriptList.length>0 ) { 
 for (var i=0; i < this.OnloadScriptList.length; i++) 
 {
 if(this.OnloadScriptList[i].firstChild != null)
 scriptData = this.OnloadScriptList[i].firstChild.data;  if ((browserInfoObj2.isiPad && browserInfoObj2.isSafari) &&
 (scriptData.indexOf('window.open') === 0)) 
 {
 var scriptDataArrary= scriptData.split("'"); eval("window.location.href = '" + scriptDataArrary[1] + "'");  }
 else
 {
 var sTmp = scriptData.toLowerCase();  if (sTmp.indexOf('window.open') == 0 && sTmp.indexOf('http')== -1 && sTmp.indexOf('https')== -1)
 eval(decodeURI(scriptData)); else if (scriptData.indexOf("doModalURL") != -1) {
 eval(scriptData);  bDoModalURL = true; }
 else if (sTmp.indexOf("document.location") == -1)
 eval(scriptData);  else if (sTmp.indexOf("document.location.href") != -1)
 eval(scriptData);  }
 }
 }
 
 this.OnloadScriptList="";  if (closeHideModal()){
 if (this.bModal == 2)
 try {
 closeModal(window.modWin.modalID); } catch (e) {}
 else
 window.modWin = null; }
 else if (!bDoModalURL)
 this.closeModal(); if (this.sortid.length > 0)
 isPopupRequest(this.form, this.sortid); if (typeof ptConsole2 != 'undefined' && ptConsole2 && ptConsole2.isActive() && bPerf)
 {
 var nDuration = (new Date()).valueOf() - this.nStartResponse; var nTotalDuration = (new Date()).valueOf() - this.nStartAll; ptConsole2.append((new Date()).valueOf() + " scripts & request end. Resp: " + nDuration+" Total:"+ nTotalDuration); }
 
 if (this.sXMLResponse) {
 this.SetInProcess(false); this.SetWaitingObject(null,"",null,false,false); if (isAnyMsg()) 
 playMsg(); return; }
 var sScript = "if (typeof ptGridObj_"+this.formname+"!='undefined' && ptGridObj_"+this.formname+") ptGridObj_"+this.formname+".restoreScrollPos();"; eval(sScript); var bMessage = isAnyMsg(); if (isAnyMsg() || isAnyDivPopup()) {
 this.SetInProcess(false); this.SetWaitingObject(null, "", null, false, false); playMsg(); playDivPopup(); }
 else
 this.SetInProcess(false);    if (this.bPrompt) 
 promptFieldid = this.id;   if ( ptRC2.isEnabled() && (!this.bPrompt) && (promptFieldid.length > 0) ) {
 window.top.ptrc.refreshRCOnChangeIfNeeded(promptFieldid); promptFieldid = ""; } 
 
 
 if (ptRC2.isEnabled() && !this.bPrompt && typeof window.top.ptrc != 'undefined') 
 window.top.ptrc.onAddChangeEvent();  ptCommonObj2.generateABNSearchResults(this.form);   pm.updateMessageEvents(this.id);   bcUpdater.storeKeyList(); bcUpdater.updateAdvSearchLbl(); bcUpdater.removeRemoteData();  if (!isFModeLayout()) {
 updClassicHistory(); }
 
 if (this.GetWaitingICAction() != "")
 {
 var objWaiting = this.GetWaitingObject(); if (objWaiting != null) {
 var sScript = "aAction0_" + (objWaiting.v).name + "(objWaiting.v, objWaiting.w, objWaiting.x, objWaiting.y, objWaiting.z);";  eval(sScript); }
 }
 delete (this.req);   if (typeof GetDomData != "undefined")
 GetDomData(this.form, "TargetContent", "#GetDomInfo"); if (isFModeLayout() && browserInfoObj2.isIE) {
 doGrouplet("initScrolls"); }
},

addScript:function(id,dscript) 
{
if (!id || !dscript) return;var sId=id+"_HAScript";var obScript = document.getElementById(sId);var obHead=document.getElementsByTagName("head")[0];if (obScript) {
 obHead.removeChild(obScript);}
obScript = document.createElement("script");obScript.setAttribute("type","text/javascript")
obScript.setAttribute("id",sId);if (dscript.slice(-3).toLowerCase() === ".js") { 
 obScript.src = dscript;} else {
 obScript.text = dscript;}

obHead.appendChild(obScript);},


processIncludeJS: function() {
 var n = this.arrSrcScriptApp.length; this.bScript=true; for (var i = 0; i < n; i++) {
 if (this.arrSrcScriptApp[i]) {
 this.nSrcScript++; this.arrSrcScript[this.nSrcScript]=this.arrSrcScriptApp[i]; }
 }
},


processIncludeCSS: function() {
 if (this.arrSrcCSSApp.length == 0) 
 return; for (var i = 0; i < this.arrSrcCSSApp.length; i++) {
 this.addStyle("", "css", this.arrSrcCSSApp[i]); }
},

addStyle:function(cssId,dstyle,src) 
{
var id = cssId;if (src) {
 var tmp = src.split("/"); var tmpId = tmp[tmp.length - 1].split("."); id = (tmpId[0].concat("_")).concat(tmpId[1]);}
else { 
 if (!dstyle || dstyle.length==0) 
 return; else
 id = id+net2._HASTYLE;}

var oStyle = document.getElementById(id);var oHead = document.getElementsByTagName("head")[0];if (oStyle) { 
 
 oStyle.parentNode.removeChild(oStyle); }


if (src) {
 oStyle=document.createElement("link")
 oStyle.setAttribute("id",id); oStyle.setAttribute("rel", "stylesheet")
 oStyle.setAttribute("type", "text/css")
 oStyle.setAttribute("href", src)
} 
else {
 oStyle = document.createElement('style'); oStyle.setAttribute("id",id); oStyle.type = 'text/css'; if (oStyle.styleSheet){
 oStyle.styleSheet.cssText = dstyle; } else {
 oStyle.appendChild(document.createTextNode(dstyle)); }
}
oHead.appendChild(oStyle);},
processGrouplet: function(el)
{
 this.objGrouplet = el; this.sDataGroupletResp = this.processScript(el.id, this.req.responseText); if (this.arrSrcScript.length > 0) {
 this.nScriptfileIndex = 0; this.nScriptfiles = this.arrSrcScript.length; this.getScriptfile(); } else
 this.updateGrouplet();},
updateGrouplet:function()
{
 if (!this.objGrouplet) return; this.objGrouplet.innerHTML = ""; this.objGrouplet.innerHTML = this.sDataGroupletResp; if (this.arrScript.length > 0) { 
 var n = this.arrScript.length; for (var xx = 0; xx < n; xx++) {
 if (this.arrScript[xx])
 var sScript = this.arrScript[xx]; eval(sScript); }
 }
 this.arrScript = new Array(); this.arrSrcScript = new Array(); this.bScript = false;},

processScript:function(id,data)
{
var sData = new String(data);var myExp2= new RegExp("</script","gi");sData = sData.replace(/<script/gi,"%script");sData = sData.replace(myExp2,"%/script");myExp2= new RegExp("</style","gi");sData = sData.replace(/<style/gi,"%style");sData = sData.replace(myExp2,"%/style");myExp2 = new RegExp("</link", "gi");sData = sData.replace(/<link/gi, "%link");sData = sData.replace(myExp2, "%/link");if (sData.indexOf("%script")==-1 && sData.indexOf("%style")==-1) return data;var nLen = (net2.ENDSCRIPT).length; var pos=sData.indexOf("%script");if (pos != -1) this.bScript=true;var pos2;var sJS=".js'";while(pos>-1){
 pos2=sData.indexOf(net2.ENDSCRIPT,pos);  var sTmp = sData.substring(pos,pos2); pos3 = sTmp.indexOf(">"); var sTmp0 = sTmp.substring(0,pos3)
 if (sTmp0.length>0 && sTmp0.indexOf("src")!=-1)
 {
 var src = sTmp0.substring(sTmp0.indexOf("src")+5,sTmp0.length-1); this.nSrcScript++;  if (src.indexOf(sJS) > -1)
 {
 var nQuote = src.indexOf("'"); src = src.substring(0,nQuote); } 
 this.arrSrcScript[this.nSrcScript] = src; }
 else
 {
 sTmp = sTmp.substring(pos3+1,sTmp.length); if (sTmp.length>0)
 {

 var pos1=sTmp.indexOf("%script") 
 if(pos1>-1)
 {
 sTmp = sTmp.replace("%script","<script"); sTmp = sTmp.replace("%/script","</script"); }
 pos1=sTmp.indexOf("%style")
 if(pos1>-1)
 {
 sTmp = sTmp.replace("%style","<style"); sTmp = sTmp.replace("%/style","</style"); }
 
 if (this.nScript == -1)
 {
 ++this.nScript; this.arrScript[this.nScript]=sTmp; }
 
 else if (sTmp.indexOf(this.arrScript[(this.nScript)]) < 0 )
 {
 ++this.nScript; this.arrScript[this.nScript]=sTmp; }
 }
 }
 
 if(rteditorlist)
 {
 for (var i=0; i < rteditorlist.length; i++)
 {
 var rteeditor = rteditorlist[i].attributes; var rteeditorid=rteeditor.getNamedItem("id").value; if(sTmp.indexOf(rteeditorid)!=-1)
 {
 if (typeof(CKEDITOR)!== "undefined") 
 {
 for ( var instanceName in CKEDITOR.instances )
 { 
 if (instanceName == rteeditorid) {
 try {
 eval(CKEDITOR.instances[rteeditorid].destroy()); }catch(e){}
 }
 } 
 }
 }
 }
 }
 sData = sData.substring(0,pos)+sData.substring(pos2+nLen,sData.length); pos=sData.indexOf("%script"); }


var nStyle=-1;nLen = (net2.ENDSTYLE).length; pos=sData.indexOf("%style");while(pos>-1){
 pos2=sData.indexOf(net2.ENDSTYLE,pos); var sTmp = sData.substring(pos,pos2); pos3 = sTmp.indexOf(">"); var sTmp0 = sTmp.substring(0,pos3)
 if (sTmp0.length>0 && sTmp0.indexOf("src")!=-1)
 {
 var src = sTmp0.substring(sTmp0.indexOf("src")+5,sTmp0.length-1); ++nStyle; this.addStyle(id+"_"+nStyle,sTmp,src); }
 else
 {
 sTmp = sTmp.substring(pos3+1,sTmp.length); if (sTmp.length>0)
 {
 ++nStyle; this.addStyle(id+"_"+nStyle,sTmp,null); }
 }
 sData = sData.substring(0,pos)+sData.substring(pos2+nLen,sData.length); pos=sData.indexOf("%style"); }
 sData = sData.replace("%/style","</style"); nLen = ("/>").length; pos = sData.indexOf("%link");while(pos>-1){
 var posX = sData.indexOf(">", pos); pos2 = sData.indexOf("/>", pos); if (pos2 > posX)
 {
 pos2 = posX; nLen = (">").length;  }
 var sTmp = sData.substring(pos,pos2);  if (sTmp.length > 0 && sTmp.indexOf("href")!=-1)
 {
 sTmp0 = sTmp.substring(sTmp.indexOf("href") + 6, pos2); pos3 = sTmp0.indexOf("'"); if (pos3 < 0)
 pos3 = sTmp0.indexOf("\""); var src = sTmp0.substring(0, pos3); ++nStyle; this.addStyle(id+"_"+nStyle,sTmp,src); } 
 sData = sData.substring(0, pos) + sData.substring(pos2 + nLen, sData.length); pos=sData.indexOf("%link");}
 return sData;}
}




net2.cmdQueues=new Array();net2.CommandQueue=function(id,url,onUpdate,freq)
{
 this.id=id; net2.cmdQueues[id]=this; this.url=url; this.queued=new Array(); this.sent=new Array(); this.onUpdate=onUpdate; if (freq)
 {
 this.repeat(freq); }
 this.lastUpdateTime=0;}

net2.CommandQueue.STATUS_QUEUED=-1;net2.CommandQueue.STATE_UNINITIALIZED=net2.READY_STATE_UNINITIALIZED;net2.CommandQueue.STATE_LOADING=net2.READY_STATE_LOADING;net2.CommandQueue.STATE_LOADED=net2.READY_STATE_LOADED;net2.CommandQueue.STATE_INTERACTIVE=net2.READY_STATE_INTERACTIVE;net2.CommandQueue.STATE_COMPLETE=net2.READY_STATE_COMPLETE;net2.CommandQueue.STATE_PROCESSED=5;net2.CommandQueue.PRIORITY_NORMAL=0;net2.CommandQueue.PRIORITY_IMMEDIATE=1;net2.CommandQueue.prototype={
 addCommand:function(command)
 {
 if (this.isCommand(command))
 {
 this.queue.append(command,true); if (command.priority==net2.CommandQueue.PRIORITY_IMMEDIATE)
 {
 this.fireRequest(); }
 }
 },

 fireRequest:function()
 {
 if (!this.onUpdate && this.queued.length==0)
 {
 return; }
 var data="lastUpdate="+this.lastUpdateTime+"&data="; for(var i=0;i<this.queued.length;i++)
 {
 var cmd=this.queued[i]; if (this.isCommand(cmd))
 {
 data+=cmd.toRequestString(); this.sent[cmd.id]=cmd; }
 }
 this.queued=new Array(); this.loader=new net2.ContentLoader(
 this.url,
 net2.CommandQueue.onload,
 net2.CommandQueue.onerror,
 "POST",data
 ); },

 isCommand:function(obj)
 {
 return (
 obj.implementsProp("id")
 && obj.implementsProp("priority")
 && obj.implementsFunc("toRequestString")
 && obj.implementsFunc("parseResponse")
 ); },

 repeat:function(freq){
 this.unrepeat(); if (freq>0)
 {
 this.freq=freq; var cmd="net2.cmdQueues["+this.id+"].fireRequest()"; this.repeater=setInterval(cmd,freq*1000); }
 },

 unrepeat:function()
 {
 if (this.repeater)
 {
 clearInterval(this.repeater); }
 this.repeater=null; }
}

net2.CommandQueue.onload=function()
{
 var xmlDoc=this.req.responseXML; var elDocRoot=xmlDoc.getElementsByTagName("responses")[0]; var lastUpdate=elDocRoot.attributes.getNamedItem("updateTime"); if (parseInt(lastUpdate)>this.lastUpdateTime)
 {
 this.lastUpdateTime=lastUpdate; }
 if (elDocRoot)
 {
 for(i=0;i<elDocRoot.childNodes.length;i++)
 {
 elChild=elDocRoot.childNodes[i]; if (elChild.nodeName=="command")
 {
 var attrs=elChild.attributes; var id=attrs.getNamedItem("id").value; var command=net2.commandQueue.sent[id]; if (command)
 {
 command.parseResponse(elChild); }
 }
 else if (elChild.nodeName=="update")
 {
 if (this.implementsFunc("onUpdate"))
 {
 this.onUpdate.call(this,elChild); }
 }
 } 
 } 
}


net2.CommandQueue.onerror=function()
{
 alert("problem sending the data to the server");}
}
