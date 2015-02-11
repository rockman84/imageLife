/*
ImageLife 1.0
The jQuery plugin for doing Image Life interactions.
(c) 2015 Hansen Wong
License & Info: http://www.rockbeat.web.id/product/imagelife
	
Powered by the Rockbeat Platform: http://www.rockbeat.web.id/imagelife
Rockbeat License info at http://www.rockbeat.web.id/licensing/
*/
/**
@overview	##Info
@version	1.0
@license	Dual licensed under MIT license and GPL.
@author		Hansen Wong - e-mail@huanghanzen@gmail.com
*/
(function($){
	var offsetCache;
	var dimensionCache;
	var eventCache;
	var config;
	
	/**
	@param object
	**/
	$.fn.imageLife = function(opts){
		this.option(opts);
		this.click(function(event){
			eventCache = 'click';
			$(this).set_image();
		});
		return this;
	};
	
	/**
	set configuration
	@param object
	**/
	$.fn.option = function (opts){
		config = $.extend({
			click	: 'click',
			center	: 'center',
			north	: 'north',
			northeast:'northeast',
			east	: 'east',
			southeast: 'southeast',
			south	: 'south',
			southwest: 'southwest',
			west	: 'west',
			northwest: 'northwest',
			img_type:'',
			adj_top:0,
			adj_bottom:0,
			adj_left:0,
			adj_right:0,
		},opts);
		return this;
	};
	
	/**
	run imageLife
	@param object
	**/
	$.fn.start = function(e){
		this.getDirection(e);
		this.set_image();
	}
	
	/**
	-- update image --
	**/
	$.fn.set_image = function(){
		var tag_name = this[0].tagName;
		if( tag_name === 'IMG'){
			this.attr('src',config[eventCache]+config.img_type);
		}
		else if(tag_name === 'DIV'){
			this.css('background','url('+config[eventCache]+config.img_type+')');
		}
		return this;
	};
	
	/**
	-- get object dimensionCache --
	@return object
	**/
	$.fn.getDimension = function(){
		return dimensionCache = {
			width:this.innerWidth(),
			height:this.innerHeight()
		};
	};
	
	/**
	-- get object position --
	@return object
	**/
	$.fn.getOffset = function(){
		return offsetCache = this.offset();
	};
	
	/**
	-- update dimension and position object --
	**/
	$.fn.updateCache = function(){
		this.getDimension();
		this.getOffset();
		return this;
	};
	
	/**
	-- get direction position --
	@param object (event mousemove)
	**/
	$.fn.getDirection = function(e){
		this.updateCache();
		var x = e.pageX, y = e.pageY, posX = '',posY = '';
		// check top
		if((offsetCache.top+config.adj_top) > y){
			posY = 'north';
		}
		// check bottom
		else if(((offsetCache.top + dimensionCache.height)- config.adj_bottom) < y){
			posY = 'south';
		}
		else{
			posY = '';
		}
		// check left
		if((offsetCache.left+ config.adj_left) > x){
			posX = 'west';
		}
		// check right
		else if((offsetCache.left + dimensionCache.width) - config.adj_right < x){
			posX = 'east';
		}
		else{
			posX = '';
		}
		eventCache = posY+posX;
		if(eventCache === ''){
			eventCache = 'center';
		}
		this.trigger(eventCache);
		return eventCache;
	};
}(jQuery));
