(function(){"use strict";var xhtml="http://www.w3.org/1999/xhtml";var namespaces={svg:"http://www.w3.org/2000/svg",xhtml:xhtml,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};var namespace=function(name){var prefix=name+="",i=prefix.indexOf(":");if(i>=0&&(prefix=name.slice(0,i))!=="xmlns")name=name.slice(i+1);return namespaces.hasOwnProperty(prefix)?{space:namespaces[prefix],local:name}:name};function creatorInherit(name){return function(){var document=this.ownerDocument,uri=this.namespaceURI;return uri===xhtml&&document.documentElement.namespaceURI===xhtml?document.createElement(name):document.createElementNS(uri,name)}}function creatorFixed(fullname){return function(){return this.ownerDocument.createElementNS(fullname.space,fullname.local)}}var creator=function(name){var fullname=namespace(name);return(fullname.local?creatorFixed:creatorInherit)(fullname)};var matcher=function(selector){return function(){return this.matches(selector)}};if(typeof document!=="undefined"){var element=document.documentElement;if(!element.matches){var vendorMatches=element.webkitMatchesSelector||element.msMatchesSelector||element.mozMatchesSelector||element.oMatchesSelector;matcher=function(selector){return function(){return vendorMatches.call(this,selector)}}}}var matcher$1=matcher;var filterEvents={};var event=null;if(typeof document!=="undefined"){var element$1=document.documentElement;if(!("onmouseenter"in element$1)){filterEvents={mouseenter:"mouseover",mouseleave:"mouseout"}}}function filterContextListener(listener,index,group){listener=contextListener(listener,index,group);return function(event){var related=event.relatedTarget;if(!related||related!==this&&!(related.compareDocumentPosition(this)&8)){listener.call(this,event)}}}function contextListener(listener,index,group){return function(event1){var event0=event;event=event1;try{listener.call(this,this.__data__,index,group)}finally{event=event0}}}function parseTypenames(typenames){return typenames.trim().split(/^|\s+/).map(function(t){var name="",i=t.indexOf(".");if(i>=0)name=t.slice(i+1),t=t.slice(0,i);return{type:t,name:name}})}function onRemove(typename){return function(){var on=this.__on;if(!on)return;for(var j=0,i=-1,m=on.length,o;j<m;++j){if(o=on[j],(!typename.type||o.type===typename.type)&&o.name===typename.name){this.removeEventListener(o.type,o.listener,o.capture)}else{on[++i]=o}}if(++i)on.length=i;else delete this.__on}}function onAdd(typename,value,capture){var wrap=filterEvents.hasOwnProperty(typename.type)?filterContextListener:contextListener;return function(d,i,group){var on=this.__on,o,listener=wrap(value,i,group);if(on)for(var j=0,m=on.length;j<m;++j){if((o=on[j]).type===typename.type&&o.name===typename.name){this.removeEventListener(o.type,o.listener,o.capture);this.addEventListener(o.type,o.listener=listener,o.capture=capture);o.value=value;return}}this.addEventListener(typename.type,listener,capture);o={type:typename.type,name:typename.name,value:value,listener:listener,capture:capture};if(!on)this.__on=[o];else on.push(o)}}var selection_on=function(typename,value,capture){var typenames=parseTypenames(typename+""),i,n=typenames.length,t;if(arguments.length<2){var on=this.node().__on;if(on)for(var j=0,m=on.length,o;j<m;++j){for(i=0,o=on[j];i<n;++i){if((t=typenames[i]).type===o.type&&t.name===o.name){return o.value}}}return}on=value?onAdd:onRemove;if(capture==null)capture=false;for(i=0;i<n;++i)this.each(on(typenames[i],value,capture));return this};function none(){}var selector=function(selector){return selector==null?none:function(){return this.querySelector(selector)}};var selection_select=function(select){if(typeof select!=="function")select=selector(select);for(var groups=this._groups,m=groups.length,subgroups=new Array(m),j=0;j<m;++j){for(var group=groups[j],n=group.length,subgroup=subgroups[j]=new Array(n),node,subnode,i=0;i<n;++i){if((node=group[i])&&(subnode=select.call(node,node.__data__,i,group))){if("__data__"in node)subnode.__data__=node.__data__;subgroup[i]=subnode}}}return new Selection(subgroups,this._parents)};function empty(){return[]}var selectorAll=function(selector){return selector==null?empty:function(){return this.querySelectorAll(selector)}};var selection_selectAll=function(select){if(typeof select!=="function")select=selectorAll(select);for(var groups=this._groups,m=groups.length,subgroups=[],parents=[],j=0;j<m;++j){for(var group=groups[j],n=group.length,node,i=0;i<n;++i){if(node=group[i]){subgroups.push(select.call(node,node.__data__,i,group));parents.push(node)}}}return new Selection(subgroups,parents)};var selection_filter=function(match){if(typeof match!=="function")match=matcher$1(match);for(var groups=this._groups,m=groups.length,subgroups=new Array(m),j=0;j<m;++j){for(var group=groups[j],n=group.length,subgroup=subgroups[j]=[],node,i=0;i<n;++i){if((node=group[i])&&match.call(node,node.__data__,i,group)){subgroup.push(node)}}}return new Selection(subgroups,this._parents)};var sparse=function(update){return new Array(update.length)};var selection_enter=function(){return new Selection(this._enter||this._groups.map(sparse),this._parents)};function EnterNode(parent,datum){this.ownerDocument=parent.ownerDocument;this.namespaceURI=parent.namespaceURI;this._next=null;this._parent=parent;this.__data__=datum}EnterNode.prototype={constructor:EnterNode,appendChild:function(child){return this._parent.insertBefore(child,this._next)},insertBefore:function(child,next){return this._parent.insertBefore(child,next)},querySelector:function(selector){return this._parent.querySelector(selector)},querySelectorAll:function(selector){return this._parent.querySelectorAll(selector)}};var constant=function(x){return function(){return x}};var keyPrefix="$";function bindIndex(parent,group,enter,update,exit,data){var i=0,node,groupLength=group.length,dataLength=data.length;for(;i<dataLength;++i){if(node=group[i]){node.__data__=data[i];update[i]=node}else{enter[i]=new EnterNode(parent,data[i])}}for(;i<groupLength;++i){if(node=group[i]){exit[i]=node}}}function bindKey(parent,group,enter,update,exit,data,key){var i,node,nodeByKeyValue={},groupLength=group.length,dataLength=data.length,keyValues=new Array(groupLength),keyValue;for(i=0;i<groupLength;++i){if(node=group[i]){keyValues[i]=keyValue=keyPrefix+key.call(node,node.__data__,i,group);if(keyValue in nodeByKeyValue){exit[i]=node}else{nodeByKeyValue[keyValue]=node}}}for(i=0;i<dataLength;++i){keyValue=keyPrefix+key.call(parent,data[i],i,data);if(node=nodeByKeyValue[keyValue]){update[i]=node;node.__data__=data[i];nodeByKeyValue[keyValue]=null}else{enter[i]=new EnterNode(parent,data[i])}}for(i=0;i<groupLength;++i){if((node=group[i])&&nodeByKeyValue[keyValues[i]]===node){exit[i]=node}}}var selection_data=function(value,key){if(!value){data=new Array(this.size()),j=-1;this.each(function(d){data[++j]=d});return data}var bind=key?bindKey:bindIndex,parents=this._parents,groups=this._groups;if(typeof value!=="function")value=constant(value);for(var m=groups.length,update=new Array(m),enter=new Array(m),exit=new Array(m),j=0;j<m;++j){var parent=parents[j],group=groups[j],groupLength=group.length,data=value.call(parent,parent&&parent.__data__,j,parents),dataLength=data.length,enterGroup=enter[j]=new Array(dataLength),updateGroup=update[j]=new Array(dataLength),exitGroup=exit[j]=new Array(groupLength);bind(parent,group,enterGroup,updateGroup,exitGroup,data,key);for(var i0=0,i1=0,previous,next;i0<dataLength;++i0){if(previous=enterGroup[i0]){if(i0>=i1)i1=i0+1;while(!(next=updateGroup[i1])&&++i1<dataLength);previous._next=next||null}}}update=new Selection(update,parents);update._enter=enter;update._exit=exit;return update};var selection_exit=function(){return new Selection(this._exit||this._groups.map(sparse),this._parents)};var selection_merge=function(selection){for(var groups0=this._groups,groups1=selection._groups,m0=groups0.length,m1=groups1.length,m=Math.min(m0,m1),merges=new Array(m0),j=0;j<m;++j){for(var group0=groups0[j],group1=groups1[j],n=group0.length,merge=merges[j]=new Array(n),node,i=0;i<n;++i){if(node=group0[i]||group1[i]){merge[i]=node}}}for(;j<m0;++j){merges[j]=groups0[j]}return new Selection(merges,this._parents)};var selection_order=function(){for(var groups=this._groups,j=-1,m=groups.length;++j<m;){for(var group=groups[j],i=group.length-1,next=group[i],node;--i>=0;){if(node=group[i]){if(next&&next!==node.nextSibling)next.parentNode.insertBefore(node,next);next=node}}}return this};var selection_sort=function(compare){if(!compare)compare=ascending;function compareNode(a,b){return a&&b?compare(a.__data__,b.__data__):!a-!b}for(var groups=this._groups,m=groups.length,sortgroups=new Array(m),j=0;j<m;++j){for(var group=groups[j],n=group.length,sortgroup=sortgroups[j]=new Array(n),node,i=0;i<n;++i){if(node=group[i]){sortgroup[i]=node}}sortgroup.sort(compareNode)}return new Selection(sortgroups,this._parents).order()};function ascending(a,b){return a<b?-1:a>b?1:a>=b?0:NaN}var selection_call=function(){var callback=arguments[0];arguments[0]=this;callback.apply(null,arguments);return this};var selection_nodes=function(){var nodes=new Array(this.size()),i=-1;this.each(function(){nodes[++i]=this});return nodes};var selection_node=function(){for(var groups=this._groups,j=0,m=groups.length;j<m;++j){for(var group=groups[j],i=0,n=group.length;i<n;++i){var node=group[i];if(node)return node}}return null};var selection_size=function(){var size=0;this.each(function(){++size});return size};var selection_empty=function(){return!this.node()};var selection_each=function(callback){for(var groups=this._groups,j=0,m=groups.length;j<m;++j){for(var group=groups[j],i=0,n=group.length,node;i<n;++i){if(node=group[i])callback.call(node,node.__data__,i,group)}}return this};function attrRemove(name){return function(){this.removeAttribute(name)}}function attrRemoveNS(fullname){return function(){this.removeAttributeNS(fullname.space,fullname.local)}}function attrConstant(name,value){return function(){this.setAttribute(name,value)}}function attrConstantNS(fullname,value){return function(){this.setAttributeNS(fullname.space,fullname.local,value)}}function attrFunction(name,value){return function(){var v=value.apply(this,arguments);if(v==null)this.removeAttribute(name);else this.setAttribute(name,v)}}function attrFunctionNS(fullname,value){return function(){var v=value.apply(this,arguments);if(v==null)this.removeAttributeNS(fullname.space,fullname.local);else this.setAttributeNS(fullname.space,fullname.local,v)}}var selection_attr=function(name,value){var fullname=namespace(name);if(arguments.length<2){var node=this.node();return fullname.local?node.getAttributeNS(fullname.space,fullname.local):node.getAttribute(fullname)}return this.each((value==null?fullname.local?attrRemoveNS:attrRemove:typeof value==="function"?fullname.local?attrFunctionNS:attrFunction:fullname.local?attrConstantNS:attrConstant)(fullname,value))};var defaultView=function(node){return node.ownerDocument&&node.ownerDocument.defaultView||node.document&&node||node.defaultView};function styleRemove(name){return function(){this.style.removeProperty(name)}}function styleConstant(name,value,priority){return function(){this.style.setProperty(name,value,priority)}}function styleFunction(name,value,priority){return function(){var v=value.apply(this,arguments);if(v==null)this.style.removeProperty(name);else this.style.setProperty(name,v,priority)}}var selection_style=function(name,value,priority){var node;return arguments.length>1?this.each((value==null?styleRemove:typeof value==="function"?styleFunction:styleConstant)(name,value,priority==null?"":priority)):defaultView(node=this.node()).getComputedStyle(node,null).getPropertyValue(name)};function propertyRemove(name){return function(){delete this[name]}}function propertyConstant(name,value){return function(){this[name]=value}}function propertyFunction(name,value){return function(){var v=value.apply(this,arguments);if(v==null)delete this[name];else this[name]=v}}var selection_property=function(name,value){return arguments.length>1?this.each((value==null?propertyRemove:typeof value==="function"?propertyFunction:propertyConstant)(name,value)):this.node()[name]};function classArray(string){return string.trim().split(/^|\s+/)}function classList(node){return node.classList||new ClassList(node)}function ClassList(node){this._node=node;this._names=classArray(node.getAttribute("class")||"")}ClassList.prototype={add:function(name){var i=this._names.indexOf(name);if(i<0){this._names.push(name);this._node.setAttribute("class",this._names.join(" "))}},remove:function(name){var i=this._names.indexOf(name);if(i>=0){this._names.splice(i,1);this._node.setAttribute("class",this._names.join(" "))}},contains:function(name){return this._names.indexOf(name)>=0}};function classedAdd(node,names){var list=classList(node),i=-1,n=names.length;while(++i<n)list.add(names[i])}function classedRemove(node,names){var list=classList(node),i=-1,n=names.length;while(++i<n)list.remove(names[i])}function classedTrue(names){return function(){classedAdd(this,names)}}function classedFalse(names){return function(){classedRemove(this,names)}}function classedFunction(names,value){return function(){(value.apply(this,arguments)?classedAdd:classedRemove)(this,names)}}var selection_classed=function(name,value){var names=classArray(name+"");if(arguments.length<2){var list=classList(this.node()),i=-1,n=names.length;while(++i<n)if(!list.contains(names[i]))return false;return true}return this.each((typeof value==="function"?classedFunction:value?classedTrue:classedFalse)(names,value))};function textRemove(){this.textContent=""}function textConstant(value){return function(){this.textContent=value}}function textFunction(value){return function(){var v=value.apply(this,arguments);this.textContent=v==null?"":v}}var selection_text=function(value){return arguments.length?this.each(value==null?textRemove:(typeof value==="function"?textFunction:textConstant)(value)):this.node().textContent};function htmlRemove(){this.innerHTML=""}function htmlConstant(value){return function(){this.innerHTML=value}}function htmlFunction(value){return function(){var v=value.apply(this,arguments);this.innerHTML=v==null?"":v}}var selection_html=function(value){return arguments.length?this.each(value==null?htmlRemove:(typeof value==="function"?htmlFunction:htmlConstant)(value)):this.node().innerHTML};function raise(){if(this.nextSibling)this.parentNode.appendChild(this)}var selection_raise=function(){return this.each(raise)};function lower(){if(this.previousSibling)this.parentNode.insertBefore(this,this.parentNode.firstChild)}var selection_lower=function(){return this.each(lower)};var selection_append=function(name){var create=typeof name==="function"?name:creator(name);return this.select(function(){return this.appendChild(create.apply(this,arguments))})};function constantNull(){return null}var selection_insert=function(name,before){var create=typeof name==="function"?name:creator(name),select=before==null?constantNull:typeof before==="function"?before:selector(before);return this.select(function(){return this.insertBefore(create.apply(this,arguments),select.apply(this,arguments)||null)})};function remove(){var parent=this.parentNode;if(parent)parent.removeChild(this)}var selection_remove=function(){return this.each(remove)};var selection_datum=function(value){return arguments.length?this.property("__data__",value):this.node().__data__};function dispatchEvent(node,type,params){var window=defaultView(node),event=window.CustomEvent;if(event){event=new event(type,params)}else{event=window.document.createEvent("Event");if(params)event.initEvent(type,params.bubbles,params.cancelable),event.detail=params.detail;else event.initEvent(type,false,false)}node.dispatchEvent(event)}function dispatchConstant(type,params){return function(){return dispatchEvent(this,type,params)}}function dispatchFunction(type,params){return function(){return dispatchEvent(this,type,params.apply(this,arguments))}}var selection_dispatch=function(type,params){return this.each((typeof params==="function"?dispatchFunction:dispatchConstant)(type,params))};var root=[null];function Selection(groups,parents){this._groups=groups;this._parents=parents}function selection(){return new Selection([[document.documentElement]],root)}Selection.prototype=selection.prototype={constructor:Selection,select:selection_select,selectAll:selection_selectAll,filter:selection_filter,data:selection_data,enter:selection_enter,exit:selection_exit,merge:selection_merge,order:selection_order,sort:selection_sort,call:selection_call,nodes:selection_nodes,node:selection_node,size:selection_size,empty:selection_empty,each:selection_each,attr:selection_attr,style:selection_style,property:selection_property,classed:selection_classed,text:selection_text,html:selection_html,raise:selection_raise,lower:selection_lower,append:selection_append,insert:selection_insert,remove:selection_remove,datum:selection_datum,on:selection_on,dispatch:selection_dispatch};var select=function(selector){return typeof selector==="string"?new Selection([[document.querySelector(selector)]],[document.documentElement]):new Selection([[selector]],root)};function render(data){var circles=select("svg").selectAll("circle").data(data);circles.exit().remove();circles.enter().append("circle").attr("fill","rgba(255, 0, 0, 0.3)").attr("stroke","black").merge(circles).attr("cx",function(d){return d.x}).attr("cy",function(d){return d.y}).attr("r",function(d){return d.r})}render([{x:300,y:150,r:44},{x:500,y:350,r:51},{x:700,y:200,r:33},{x:583,y:114,r:77},{x:844,y:218,r:74},{x:257,y:316,r:44},{x:466,y:200,r:31},{x:179,y:414,r:50},{x:179,y:231,r:36},{x:376,y:326,r:26},{x:676,y:118,r:68},{x:626,y:199,r:68},{x:510,y:269,r:15},{x:510,y:419,r:15},{x:311,y:388,r:15},{x:50,y:388,r:6},{x:90,y:431,r:6},{x:90,y:287,r:11},{x:630,y:145,r:11}])})();