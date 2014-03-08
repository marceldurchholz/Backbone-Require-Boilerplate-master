/*
 * jReadMore 
 * http://do-web.com/jreadmore/overview
 *
 * Copyright 2011, Miriam Zusin
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 */ 
(function($){
	$.fn.jReadMore = function(options){
		
		var options = $.extend({
			open: 'read less',
			close: 'read more',
			height: 205,
			diff: 40
		},options);
		
		return this.each(function() {			
			var hndl = this;
			
			//layout
			$(this).addClass("jReadMore");
			$(this).wrapInner("<div class='jReadMoreContent'/>");
			$(this).append("<div class='jReadMoreActions'><span class='jReadMoreOpen'>" + options.open + "</span><span class='jReadMoreClose'>" + options.close + "</span></div>");
			
			//init vars
			this.open = $(this).find(".jReadMoreOpen");
			this.close = $(this).find(".jReadMoreClose");
			this.actions = $(this).find(".jReadMoreActions");
			this.content = $(this).find(".jReadMoreContent");
						
			//actions styles
			this.actions.find("span").css("cursor", "pointer").hide();
			this.content.css("overflow", "hidden");
			
			//change flag			
			this.flag = (this.content.height() - options.diff > options.height);			
			
			this.openBox = function(){
				if(hndl.flag){
					hndl.content.css("height", options.height);
					hndl.open.hide();
					hndl.close.show();
				}
			};
			
			this.closeBox = function(){
				if(hndl.flag){
					hndl.content.css("height", "");
					hndl.open.show();
					hndl.close.hide();
				}
			};
			
			this.open.click(function(){
				hndl.openBox();
			});
			
			this.close.click(function(){
				hndl.closeBox();
			});
			
			this.init = function(){
				hndl.openBox();
			};
			
			this.init();
		});	
	};
})(jQuery);
