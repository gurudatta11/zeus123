!function(a,b){var c={"private":{dragRequest:function(b,c,d){var e=c.parent.data.key;"over"==d&&(e=c.data.key),jQuery.fn.dialog.showLoader();var f=[{name:"sourceTreeNodeID",value:b.data.key},{name:"treeNodeParentID",value:e}],g=c.parent.getChildren();if(g)for(var h=0;h<g.length;h++){var i=g[h];f.push({name:"treeNodeID[]",value:i.data.key})}a.ajax({dataType:"json",type:"POST",data:f,url:CCM_TOOLS_PATH+"/tree/node/drag_request",success:function(a){ccm_parseJSON(a,function(){}),jQuery.fn.dialog.hideLoader()}})},getMenu:function(b,c){var d='<div class="ccm-topic-menu ccm-popover-page-menu popover fade popover fade"><div class="arrow"></div><div class="popover-inner">';d+='<ul class="dropdown-menu">',b.canAddTopicCategoryTreeNode&&(d+='<li><a class="dialog-launch" dialog-width="550" dialog-on-open="$(\'[data-topic-form=add-category-node]\').ccmtopicstree(\'initAddNodeForm\', '+c.treeID+');" dialog-height="auto" dialog-modal="false" dialog-title="'+ccmi18n_topics.addCategory+'" href="'+CCM_DISPATCHER_FILENAME+"/tools/required/tree/node/add/topic_category?treeNodeParentID="+b.key+'">'+ccmi18n_topics.addCategory+"</a></li>"),b.canAddTopicTreeNode&&(d+='<li><a class="dialog-launch" dialog-width="550" dialog-on-open="$(\'[data-topic-form=add-topic-node]\').ccmtopicstree(\'initAddNodeForm\', '+c.treeID+');" dialog-height="auto" dialog-modal="false" dialog-title="'+ccmi18n_topics.addTopic+'" href="'+CCM_DISPATCHER_FILENAME+"/tools/required/tree/node/add/topic?treeNodeParentID="+b.key+'">'+ccmi18n_topics.addTopic+"</a></li>"),b.canEditTreeNode&&"topic_category"==b.treeNodeTypeHandle&&(d+='<li><a class="dialog-launch" dialog-width="550" dialog-on-open="$(\'[data-topic-form=update-category-node]\').ccmtopicstree(\'initUpdateCategoryNodeForm\', '+c.treeID+');" dialog-height="auto" dialog-modal="false" dialog-title="'+ccmi18n_topics.editCategory+'" href="'+CCM_DISPATCHER_FILENAME+"/tools/required/tree/node/edit/topic_category?treeNodeID="+b.key+'">'+ccmi18n_topics.editCategory+"</a></li>"),b.canDuplicateTreeNode&&"topic_category"==b.treeNodeTypeHandle&&(d+="<li><a href=\"#\" onclick=\"$.fn.ccmtopicstree('cloneNode', 'node', "+c.treeID+","+b.key+')">'+ccmi18n_topics.cloneCategory+"</a></li>"),b.canEditTreeNode&&"topic"==b.treeNodeTypeHandle&&(d+='<li><a class="dialog-launch" dialog-width="550" dialog-on-open="$(\'[data-topic-form=update-topic-node]\').ccmtopicstree(\'initUpdateTopicNodeForm\', '+c.treeID+');" dialog-height="auto" dialog-modal="false" dialog-title="'+ccmi18n_topics.editTopic+'" href="'+CCM_DISPATCHER_FILENAME+"/tools/required/tree/node/edit/topic?treeNodeID="+b.key+'">'+ccmi18n_topics.editTopic+"</a></li>"),b.canDuplicateTreeNode&&"topic"==b.treeNodeTypeHandle&&(d+="<li><a href=\"#\" onclick=\"$.fn.ccmtopicstree('cloneNode', 'node', "+c.treeID+","+b.key+')">'+ccmi18n_topics.cloneTopic+"</a></li>"),b.canEditTreeNodePermissions&&(d+='<li><a class="dialog-launch" dialog-width="480" dialog-height="auto" dialog-modal="true" dialog-title="'+ccmi18n_topics.editPermissions+'" href="'+CCM_TOOLS_PATH+"/tree/node/permissions?treeNodeID="+b.key+'">'+ccmi18n_topics.editPermissions+"</a></li>"),b.treeNodeParentID>0&&"topic_category"==b.treeNodeTypeHandle&&b.canDeleteTreeNode&&(d+='<li><a class="dialog-launch" dialog-width="550" dialog-on-open="$(\'[data-topic-form=remove-tree-node]\').ccmtopicstree(\'initRemoveNodeForm\', '+c.treeID+');" dialog-height="auto" dialog-modal="false" dialog-title="'+ccmi18n_topics.deleteCategory+'" href="'+CCM_TOOLS_PATH+"/tree/node/remove?treeNodeID="+b.key+'">'+ccmi18n_topics.deleteCategory+"</a></li>"),b.treeNodeParentID>0&&"topic"==b.treeNodeTypeHandle&&b.canDeleteTreeNode&&(d+='<li><a class="dialog-launch" dialog-width="550" dialog-on-open="$(\'[data-topic-form=remove-tree-node]\').ccmtopicstree(\'initRemoveNodeForm\', '+c.treeID+');" dialog-height="auto" dialog-modal="false" dialog-title="'+ccmi18n_topics.deleteTopic+'" href="'+CCM_TOOLS_PATH+"/tree/node/remove?treeNodeID="+b.key+'">'+ccmi18n_topics.deleteTopic+"</a></li>"),d+="</ul></div></div>";var e=a(d);return 0==e.find("li").length?!1:e},reloadNode:function(a,b,c){var d=a.ajaxData;d.treeNodeParentID=b.data.key;var e={url:CCM_TOOLS_PATH+"/tree/node/load",data:d,success:function(){c&&c()}};b.appendAjax(e)},setupDialogForm:function(b,c){b.closest(".ui-dialog").find("button[type=submit]").on("click",function(){b.trigger("submit")}),b.on("submit",function(){jQuery.fn.dialog.showLoader();var d=b.serializeArray();return a.ajax({dataType:"json",type:"post",data:d,url:b.attr("action"),success:function(a){1==a.error?ConcreteAlert.dialog(ccmi18n.error,a.errors.join("<br>")):(jQuery.fn.dialog.closeTop(),c(a))},error:function(a){ConcreteAlert.dialog(ccmi18n.error,a.responseText)},complete:function(){jQuery.fn.dialog.hideLoader()}}),!1})}},initAddNodeForm:function(b){c["private"].setupDialogForm(a(this),function(c){var d=a("[data-topic-tree="+b+"]");if(c.length)for(var e=0;e<c.length;e++){var f=d.dynatree("getTree").getNodeByKey(c[e].treeNodeParentID);f.addChild(c[e])}else{var f=d.dynatree("getTree").getNodeByKey(c.treeNodeParentID);f.addChild(c)}f.expand()})},cloneNode:function(b,d,e){var f=a("[data-topic-tree="+d+"]");return a.ajax({dataType:"json",type:"post",data:{treeNodeID:e},url:CCM_TOOLS_PATH+"/tree/node/duplicate/"+b,success:function(a){if(1==a.error)ConcreteAlert.dialog(ccmi18n.error,a.errors.join("<br>"));else{jQuery.fn.dialog.closeTop();var b=f.dynatree("getTree").getNodeByKey(a.treeNodeParentID);b.setLazyNodeStatus(DTNodeStatus_Loading),c["private"].reloadNode(f.data("options"),b,function(){b.setLazyNodeStatus(DTNodeStatus_Ok)})}},error:function(a){ConcreteAlert.dialog(ccmi18n.error,'<div class="alert alert-danger">'+a.responseText+"</div>")},complete:function(){jQuery.fn.dialog.hideLoader()}}),!1},initUpdateCategoryNodeForm:function(b){c["private"].setupDialogForm(a(this),function(c){var d=a("[data-topic-tree="+b+"]"),e=d.dynatree("getTree").getNodeByKey(c.key);e.data=c,e.render()})},initUpdateTopicNodeForm:function(b){c["private"].setupDialogForm(a(this),function(c){var d=a("[data-topic-tree="+b+"]"),e=d.dynatree("getTree").getNodeByKey(c.key);e.data=c,e.render()})},initRemoveNodeForm:function(b){c["private"].setupDialogForm(a(this),function(c){var d=a("[data-topic-tree="+b+"]"),e=d.dynatree("getTree").getNodeByKey(c.treeNodeID);e.remove()})},init:function(b){b=a.extend({readonly:!1,chooseNodeInForm:!1,onSelect:!1,allowFolderSelection:!0,selectNodesByKey:[]},b);var d=!1,e=!1;if(b.treeNodeParentID)var f={treeNodeParentID:b.treeNodeParentID};else var f={treeID:b.treeID};b.allowFolderSelection&&(f.allowFolderSelection=1);var g=!0;b.chooseNodeInForm&&(d=!0,g=!1,e={checkbox:"dynatree-radio"},b.selectNodesByKey.length&&(f.treeNodeSelectedIDs=b.selectNodesByKey)),"multiple"===b.chooseNodeInForm&&(d=!0,g=!1,e={checkbox:"dynatree-checkbox"},b.selectNodesByKey.length&&(f.treeNodeSelectedIDs=b.selectNodesByKey));var h=1;b.selectMode&&(h=b.selectMode);var i=2;return b.minExpandLevel&&(i=b.minExpandLevel),this.each(function(){if(b.treeNodeParentID)var g=CCM_TOOLS_PATH+"/tree/node/load";else var g=CCM_TOOLS_PATH+"/tree/load";var j=a(this);b.ajaxData=f,j.data("options",b),j.dynatree({autoFocus:!1,onSelect:function(a,c){b.chooseNodeInForm&&b.onSelect(a,c)},selectMode:h,checkbox:d,classNames:e,minExpandLevel:i,clickFolderMode:1,initAjax:{url:g,type:"post",data:f},onLazyRead:function(a){c["private"].reloadNode(b,a)},onPostInit:function(){var c=j;if(b.readonly&&c.dynatree("disable"),b.chooseNodeInForm){var d=c.dynatree("getTree");if(d=d.getSelectedNodes(),d[0]){var e=d[0];b.onSelect(!0,e)}}if(d){a.map(d,function(a){a.makeVisible()})}},onClick:function(d,e){if("expander"==d.getEventTargetType(e))return!0;if(b.chooseNodeInForm&&"checkbox"!=d.getEventTargetType(e))return!1;if(!d.getEventTargetType(e))return!1;if(!b.chooseNodeInForm&&"title"==d.getEventTargetType(e)&&!b.noForm){var f=c["private"].getMenu(d.data,b);if(f){var g=new ConcreteMenu(a(d.span),{menu:f,launcher:"none"});g.show(e)}}},dnd:{onDragStart:function(a){return b.noDrag?!1:!0},onDragStop:function(a){},autoExpandMS:1e3,preventVoidMoves:!0,onDragEnter:function(a,b){return!0},onDragOver:function(a,b,c){return a.parent.data.treeNodeID||"1"===a.data.treeNodeID?"over"!=c&&1==a.data.treeNodeID?!1:b.data.treeNodeID==a.data.treeNodeID?!1:a.data.treeNodeID||"after"!=c?a.isDescendantOf(b)?!1:!0:!1:!1},onDrop:function(a,b,d,e,f){b.move(a,d),c["private"].dragRequest(b,a,d)}}})})}};a.fn.ccmtopicstree=function(b){return c[b]?c[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error("Method "+b+" does not exist on jQuery.ccmtopicstree"):c.init.apply(this,arguments)}}(jQuery,window);