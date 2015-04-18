/*
ImageLife 1.2
ImageLife is Jquery Plugin purpose for interacting image with event mouse move.
(c) 2015 Hansen Wong
License & Info: http://www.rockbeat.web.id
	
Powered by the Rockbeat: http://www.rockbeat.web.id/imageLife
*/
/**
@overview	##Info
@version	1.2
@license	Dual licensed under MIT license and GPL.
@author		Hansen Wong - e-mail@huanghanzen@gmail.com
*/
var imageLife = (function(opts){
	var fn = {},
		jquery,x,y,img_load = false,
		offsetCache,
		dimensionCache,
		eventCache;
	var config = {
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
		debug_color:'#00f',
	};
	fn.version = '1.2';
	/**
	set DOM target
	@param string | object | function
	**/
	fn.target = function(obj){
		jquery = $(obj);
		jquery.click(function(event){
			eventCache = 'click';
			set_image();
		});
		// check img are finished load
		jquery.on('load',function(){
			img_load = true;
		});
		return this;
	}
	/**
	set option setting
	@param object
	**/
	fn.option = function (opts){
		config = $.extend(config,opts);
		return this;
	}
	/**
	return a option setting
	@return object
	**/
	fn.getOption = function(){
		return config;
	}
	/**
	-- get direction position --
	@param object (event mousemove)
	**/
	fn.getDirection = function(e){
		fn.updateCache();
		x = e.pageX;
		y = e.pageY;
		var posX = '',posY = '';
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
		var position = posY+posX;
		if(position === ''){
			position = 'center';
		}
		return position;
	};
	/**
	-- update DOM dimension and position object --
	**/
	fn.updateCache = function(){
		fn.getDimension();
		fn.getOffset();
		return this;
	};
		/**
	-- get object dimensionCache --
	@return object
	**/
	fn.getDimension = function(){
		return dimensionCache = {
			width:jquery.innerWidth(),
			height:jquery.innerHeight()
		};
	};
	
	/**
	-- get object position --
	@return object
	**/
	fn.getOffset = function(){
		return offsetCache = jquery.offset();
	};
	/**
	run imageLife
	@param object
	**/
	fn.start = function(e){
		var pos = fn.getDirection(e);
		if(eventCache !== pos){
			eventCache = pos;
			jquery.trigger('change');
		}
		jquery.trigger(pos);
		set_image();
		return this;
	}
	/**
	-- update image --
	**/
	var set_image = function(){
		if(img_load){
			if( jquery[0].tagName === 'IMG'){
				jquery.attr('src',config[eventCache]+config.img_type);
			}
			else{
				jquery.css('background','url('+config[eventCache]+config.img_type+')');
			}
		}
		img_load = false;
		return this;
	};
	/**
	Event callback
	@param string [change,center,north,northwest,west,southwest,south,southeast,east,northeast]
	@param function
	**/
	fn.on = function(a,b){
		jquery.on(a,b);
	}
	/**
	debug mode
	**/
	fn.debug = function(){
		var id = jquery[0].id;
		var top = offsetCache.top + config.adj_top;
		var left = offsetCache.left + config.adj_left;
		var width = dimensionCache.width - (config.adj_left + config.adj_right);
		var height = dimensionCache.height - (config.adj_top + config.adj_bottom);
		var style = 'border:solid 2px '+config.debug_color+';z-index:2500;position:absolute;left:'+left+'px;top:'+top+'px;min-width:'+width+'px;height:'+height+'px;color:'+config.debug_color+';padding:10px';
		var html = '<p>'+jquery.selector+'<br />'+eventCache+'<br />'+width+'x'+height+'<br />left: '+left+'<br />top: '+top+'</p>';
		if($('#pos-debug').length === 0){
			$('body').after('<p id="pos-debug" style="color:'+config.debug_color+';position:fixed;right:10px;bottom:10px"></p>');
		}
		else{
			$('#pos-debug').html('Debug Mode<br/>X:'+x+'<br />Y:'+y);
		}
		if($(jquery.selector+'-debug').length === 0){
			$('body').after('<div id="'+id+'-debug"></div>');
		}
		$(jquery.selector+'-debug').attr('style',style).html(html);
	}
	fn.getEvent = function(){
		return eventCache;
	}
	
	fn.option(opts);
	return fn;
});