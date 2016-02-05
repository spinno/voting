(function(){define(["external/underscore","modules/clean/account/email","modules/clean/account/email_verify_reasons","modules/clean/comments/actions","modules/clean/comments/models/pending_comment_activity","modules/clean/comments/models/file_activity_data_source","modules/clean/comments/store","modules/clean/comments/utils","modules/clean/file_activity/api","modules/clean/promise","modules/core/exception","modules/core/i18n","modules/core/notify"],function(t,e,n,i,o,c,a,r,s,u,m,l,d){var f,v,y,g,A,p,C,b,h,_;f=e.EmailVerification,v=u.Promise,A=m.assert,y=l._,c.getInstance(),g=function(t){var e,i,s,u,m,l,d,y;return l=t.targetActivity,y=t.text,s=t.metadata,e=r.getActivityUser(a.state.actorId),e.is_email_verified?(u=o.build({activityUser:e,text:y,metadata:s}),m=p({targetActivity:l,pendingCommentActivity:u}),d=l.activity_key,c.getInstance().modify(function(t){return t.appendActivity(d,u)}),m):(i=f.get_for_user(e),f.set_should_use_simple_ui(!1),i.show_verify_modal(null,n.ADD_COMMENT),v.reject(Error("Cannot post comment with unverified user account")))},p=function(t){var e,n,i,o,r,u,m,l;return m=t.targetActivity,i=t.pendingCommentActivity,u=i.comment,r=u.raw_comment_text,e=u.comment_metadata,o=s.addComment({actorId:a.state.actorId,context:a.state.viewing.context,contextData:a.state.viewing.contextData,targetActivity:m,text:r,metadata:null!=e?e.toMetadataDict():void 0,oref:a.state.oref}),l=m.activity_key,n=i.activity_key,"PENDING"!==i.status&&c.getInstance().modify(function(t){return t.updateActivityStatus(n,"PENDING")}),o.then(function(t){return c.getInstance().modify(function(e){return e.purgeActivity(n).appendActivity(l,t)})}).catch(function(t){return c.getInstance().modify(function(t){return t.updateActivityStatus(n,"FAILED")}),c.getInstance().forcePull(),v.reject(t)})},i.addComment.listen(function(t){var e,n,i,o;return i=t.targetActivity,o=t.text,e=t.metadata,e=null!=e?e:{},n=g({targetActivity:i,text:o,metadata:e}),n.then(function(){return console.info("addComment completed :)")}),n.catch(function(t){return console.info("addComment failed :("),v.reject(t)})}),i.postPendingComment.listen(function(e){var n,i,o;return o=e.targetActivity,n=e.pendingCommentActivity,A(t.contains(o.comment_activities,n),"Target activity does not contain the pending comment activity to post"),i=p({targetActivity:o,pendingCommentActivity:n}),i.then(function(){return console.info("postPendingComment completed :)")}),i.catch(function(t){return console.log("postPendingComment failed :("),v.reject(t)})}),i.addAnnotationComment.listen(function(t){var e,n,o,c;return c=t.text,e=null!=(o=a.state.createAnnotation)?o.annotation:void 0,A(null!=e,"Cannot add comment with annotation because no annotation is in creation."),n=g({targetActivity:a.state.activity,text:c,metadata:{annotation:e.toMetadataDict(),revision:a.state.activity.latestRevision}}),n.then(function(){return i.stopAnnotationCreation(),console.info("addAnnotationComment completed :)")}),n.catch(function(t){return console.info("addAnnotationComment failed :("),v.reject(t)})}),i.addStickerComment.listen(function(t){var e,n,i;return i=t.targetActivity,n=t.stickerId,e=g({targetActivity:i,text:"",metadata:{stickers:{id:n},revision:a.state.activity.latestRevision}}),e.then(function(){return console.info("addStickerComment completed :)")}),e.catch(function(t){return console.info("addStickerComment failed :("),v.reject(t)})}),i.deleteComment.listen(function(t){var e,n;return e=t.commentActivityKey,A(null!=a.state.activity.findActivityByKey(e),"Comment activity to delete (key: "+e+") does not exist"),n=s.deleteComment({actorId:a.state.actorId,context:a.state.viewing.context,contextData:a.state.viewing.contextData,commentActivityKey:e,oref:a.state.oref}),c.getInstance().modify(function(t){return t.updateDeleteActivity(e,!0)}),n=n.then(function(){return console.info("deleteComment completed :)")}),n=n.catch(function(t){return c.getInstance().modify(function(t){return t.updateDeleteActivity(e,!1)}),c.getInstance().forcePull(),console.info("deleteComment failed :("),v.reject(t)})}),_=function(t){var e,n,i,o,r;return e=t.commentActivity,o=t.resolved,r=e.activity_key,i=s.updateResolveComment({actorId:a.state.actorId,context:a.state.viewing.context,contextData:a.state.viewing.contextData,commentActivityKey:r,resolved:o,oref:a.state.oref}),n=e.comment.resolved,c.getInstance().modify(function(t){return t.updateResolveActivity(r,o)}),i.catch(function(t){return c.getInstance().modify(function(t){return t.updateResolveActivity(r,n)}),c.getInstance().forcePull(),v.reject(t)})},i.resolveComment.listen(function(t){var e;return e=_({commentActivity:t,resolved:!0}),e.then(function(){return console.info("resolveComment completed :)")}),e.catch(function(t){return console.info("resolveComment failed :("),v.reject(t)})}),i.unresolveComment.listen(function(t){var e;return e=_({commentActivity:t,resolved:!1}),e.then(function(){return console.info("unresolveComment completed :)")}),e.catch(function(t){return console.info("unresolveComment failed :("),v.reject(t)})}),h=function(t){var e,n,i,o,r,u;return e=t.commentActivity,n=t.liked,u=e.activity_key,r=s.updateLikeComment({actorId:a.state.actorId,context:a.state.viewing.context,contextData:a.state.viewing.contextData,commentActivityKey:u,liked:n,oref:a.state.oref}),i={id:a.state.actorId},o=e.isLikedBy(a.state.actorId),c.getInstance().modify(function(t){return t.updateLikeActivity(u,n,i)}),r.catch(function(t){return c.getInstance().modify(function(t){return t.updateLikeActivity(u,o,i)}),c.getInstance().forcePull(),v.reject(t)})},i.likeComment.listen(function(t){var e;return e=h({commentActivity:t,liked:!0}),e.then(function(){return console.info("likeComment completed :)")}),e.catch(function(t){return console.info("likeComment failed :("),v.reject(t)})}),i.unlikeComment.listen(function(t){var e;return e=h({commentActivity:t,liked:!1}),e.then(function(){return console.info("unlikeComment completed :)")}),e.catch(function(t){return console.info("unlikeComment failed :("),v.reject(t)})}),b=function(t){var e,n,i,o;return e=t.enabled,o=s.updateCommentSetting({actorId:a.state.actorId,context:a.state.viewing.context,contextData:a.state.viewing.contextData,enableComment:e,oref:a.state.oref}),n=a.state.activity,i=a.state.activity.feedback_off,c.getInstance().modify(function(t){return t.updateEnableActivity(e)}),o.catch(function(t){return c.getInstance().modify(function(t){return t.updateEnableActivity(i)}),c.getInstance().forcePull(),v.reject(t)})},i.enableComment.listen(function(){var t;return t=b({enabled:!0}),t.then(function(){return console.info("enableComment completed :)")}),t.catch(function(t){return console.info("enableComment failed :("),v.reject(t)})}),i.disableComment.listen(function(){var t;return t=b({enabled:!1}),t.then(function(){return console.info("disableComment completed :)")}),t.catch(function(t){return console.info("disableComment failed :("),v.reject(t)})}),C=function(t){var e,i,o;return o=t.subscribed,e=r.getActivityUser(a.state.actorId),e.is_email_verified?s.updateFileActivitySubscription({actorId:a.state.actorId,context:a.state.viewing.context,contextData:a.state.viewing.contextData,targetUserEmail:null,subscribed:o,oref:a.state.oref}):(i=f.get_for_user(e),f.set_should_use_simple_ui(!1),i.show_verify_modal(null,n.SUBSCRIBE_TO_COMMENTS),v.reject(Error("Cannot change subscription with unverified user account")))},i.subscribeActivity.listen(function(){var t;return t=C({subscribed:!0}),t.then(function(){return console.info("subscribeActivity completed :)"),d.success(y("You have been subscribed."))}),t.catch(function(t){return console.info("subscribeActivity failed :("),d.error(y("We failed to subscribe you.")),v.reject(t)})}),i.unsubscribeActivity.listen(function(){var t;return t=C({subscribed:!1}),t.then(function(){return console.info("unsubscribeActivity completed :)"),d.success(y("You have been unsubscribed."))}),t.catch(function(t){return console.info("unsubscribeActivity failed :("),d.error(y("We failed to unsubscribe you.")),v.reject(t)})})})}).call(this);