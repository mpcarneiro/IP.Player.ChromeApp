var Player = function(options) {
	this.schedule = options.schedule;
	
	this.el = options.el;
	
	this.left = options.left || 0;
	this.top = options.top || 0;
	this.width = options.width || 1;
	this.height = options.height || 1;
	
	this.isPaused = false;
	this.currentLayout = null;
	this.previousLayout = null;
	
	this.layouts = new Array();
		
	$(this.el).css({
		top: (this.top*100)+'%',
		left : (this.left*100)+'%',
		width : (this.width*100)+'%',
		height: (this.height*100)+'%'
	});
	
	this.normalContent(this.schedule.schedule.normalContent);
	//this.topContent(this.schedule.schedule.topContent);
	//this.backgroundContent(this.schedule.schedule.backgroundContent):
	
	//this.addRegions(this.schedule.schedule.regions);
	
};

Player.prototype.normalContent = function(lstLayouts) {
	
	lstLayouts = lstLayouts instanceof Array ? lstLayouts : [lstLayouts];

	for (var i=0; i<lstLayouts.length; i++) {

		$(this.el).append('<div id="'+lstLayouts[i].layout_id+'"></div>');
		var l = new Layout(lstLayouts[i]);
		this.layouts.push(l); // insere a lista de layouts do normalContent
		
		console.log("layout id: "+ lstLayouts[i].layout_id + " layout name: " + lstLayouts[i].layout_name + " layout dur: " + lstLayouts[i].dur + " layout regions: " + lstLayouts[i].regions);
	}
	
	this.play();
	
};

Player.prototype.notify = function(regionid) {
	/*
	this.layouts.forEach(function(layout){
		layout.play();
	});
	*/
	
	regionid = regionid instanceof Array ? regionid : [regionid];
	
	console.log('NOTIFIED FROM: ' + regionid);
	
	var layout = this.layouts[this.currentLayout];
	
	for (var i=0; i<layout.regions.length; i++) {

		//$(this.el).append('<div id="'+lstLayouts[i].layout_id+'"></div>');
		if(regionid == layout.regions[i].region_id) {
			layout.regions[i].cycle=1;
		}
		
		
		//var l = new Layout(lstLayouts[i]);
		//this.layouts.push(l); // insere a lista de layouts do normalContent
		
		//console.log("layout id: "+ lstLayouts[i].layout_id + " layout name: " + lstLayouts[i].layout_name + " layout dur: " + lstLayouts[i].dur + " layout regions: " + lstLayouts[i].regions);
	}
	
	var cycleCompleted = p.checkLayoutCycle();
	
	return cycleCompleted;

	
};

Player.prototype.checkLayoutCycle = function(){
	
	var layout = this.layouts[this.currentLayout];
	var regions = 0;
	
	for (var i=0; i<layout.regions.length; i++) {
		
		if(layout.regions[i].cycle==1) {
			regions++;
		}
	}
	
	
	if(regions>=layout.regions.length) {
		return true;
	}
	else {
		return false;
	}
	
};

Player.prototype.resetCycle = function(){
	/*
	this.layouts.forEach(function(layout){
		layout.play();
	});
	*/
	console.log('init cycle reset');
	
	var layout = this.layouts[this.currentLayout];
	var elLayout = '#'+layout.layout_id;
	//console.log("var layout: " + layout.layout_id + "el layout: " + elLayout);
	
	layout.resetCycle();
	
	//this.isPaused = false;
	//this.next();
	
};


Player.prototype.play = function(){
	/*
	this.layouts.forEach(function(layout){
		layout.play();
	});
	*/
	
	console.log('init layout');
	this.isPaused = false;
	this.next();
	
};

Player.prototype.next = function(){
	/*
	this.layouts.forEach(function(layout){
		layout.play();
	});
	*/

	console.log('next layout');
	//$(this.el).empty();
	
	if(this.currentLayout==null) {
		console.log('primeiro layout!');
		this.currentLayout = Math.abs((this.currentLayout) % this.layouts.length);
		//this.cycle=0;
	}
	else {
		var previousLayout = this.currentLayout;
		var pLayout = this.layouts[previousLayout];
		var elPrevLayout = '#'+pLayout.layout_id;
		
		console.log('PREV LAYOUT: ' + previousLayout + ' Element: ' + elPrevLayout);
		
		$(elPrevLayout).hide(500);
		
		console.log('---------- NEW LAYOUT -----------');
		this.currentLayout = Math.abs(((this.currentLayout)+1) % this.layouts.length);
		/*
		if((this.currentApp+1) >= this.containerList.length) {
			this.cycle++;
		}
		*/
	}
	
	//$(elLayout).show();
	//getNextApp
	//this.currentLayout = Math.abs((this.currentLayout + 1) % this.normalContent.length);
	console.log('this is layout number: ' + this.currentLayout + ' LAYOUT LIST: ' + this.layouts.length);
	var layout = this.layouts[this.currentLayout];
	var elLayout = '#'+layout.layout_id;
	console.log("var layout: " + layout.layout_id + "el layout: " + elLayout);
	
	layout.play(elLayout);
	
	/*	
	if(!this.isPaused) {
		var self = this;
		console.log('timeout: '+ app.dur);
		this.currTimeout = setTimeout(function () {
			self.next();
		},app.dur * 1000);
	}
	*/
};

Player.prototype.pause = function(){
	this.layouts.forEach(function(region){
		layout.pause();
	});
};

Player.prototype.getCycles = function() {
	
	console.log('a regiao X terminou o seu ciclo');
	this.layouts.forEach(function(region){
		layout.pause();
	});
};


/*
 * Layout class
 * Class that bla bla bla
 */
var Layout = function(options){
	// ids
	this.layout_id = options.layout_id;
	this.layout_name = options.layout_name;
	this.layout_dur = options.layout_dur;
	
	
	this.left = options.left || 0;
	this.top = options.top || 0;
	this.width = options.width || 1;
	this.height = options.height || 1;
	
	this.el = '#'+options.layout_id;
	
	$(this.el).css({
		top: (this.top*100)+'%',
		left : (this.left*100)+'%',
		width : (this.width*100)+'%',
		height: (this.height*100)+'%',
		display: 'none',
		position: 'absolute'
	});
		
	this.stylecss = "";
	
	this.cycle=0;
	
	this.regions = new Array();
	
	this.addRegions(options.regions);
};

Layout.prototype.addRegions = function(lstRegions) {

	lstRegions = lstRegions instanceof Array ? lstRegions : [lstRegions];

	for (var i=0; i<lstRegions.length; i++) {

		$(this.el).append('<div id="'+lstRegions[i].region_id+'"></div>');
		var r = new Region(lstRegions[i]);
		this.regions.push(r);
		
		console.log("region id: " + lstRegions[i].region_id);
	}

};

Layout.prototype.resetCycle = function(){

	console.log('init cycle reset ON LAYOUT');
		
	this.cycle=0;
	
	this.regions.forEach(function(region){
		region.resetCycle();
	});
		
};


Layout.prototype.play = function(elLayout){
	
	console.log('ENTREI NO LAYOUT PLAY');
	console.log('EL LAYOUT: ' + elLayout);
	
	$(elLayout).show();
	
	this.regions.forEach(function(region){
		region.play();
	});
};


/*
 * Region class
 * Class that bla bla bla
 */
var Region = function(options){
	//init
	// dimensions
	this.region_id = options.region_id;
	this.region_name = options.region_name;
	
	this.left = options.left;
	this.top = options.top;
	this.width = options.width;
	this.height = options.height;
	this.minWidth = options.minWidth;
	this.minHeight = options.minHeight;
	
	this.scheduleItem = options.scheduleItem;
	this.selector = options.selector;
	
	this.el = '#'+options.region_id;
	
	
	$(this.el).css({
		top: (this.top*100)+'%',
		left : (this.left*100)+'%',
		width : (this.width*100)+'%',
		height: (this.height*100)+'%',
		position: 'absolute'
	});
	
	//this.stylecss = "";
	
	
	this.containerList = new Array();
	
	this.currentApp = null;
	this.isPaused = false;
	this.started = false;
	
	this.cycle = 0;
	
	this.addList(options.containerList);
};

Region.prototype.addList = function(elems) {
	elems = elems instanceof Array ? elems : [elems];
	
	console.log("estou no addlist, show apps");
	s.showApps();
	//this.Schedule.prototype.showApps();
	//console.log("srcs: " + srcs);
	
	
	for (var i=0; i<elems.length; i++) {
		
		this.containerList.push(elems[i]);
		
		console.log("containerLst cid: " + elems[i].cid + " dur: " + elems[i].dur);
		console.log("estou no addlist, get src from this IDapp: " + elems[i].cid);
		var src = s.getAppSrc(elems[i].cid);
		console.log("ca estou, sou o: " + src);
		
	}
};

Region.prototype.resetCycle = function(){

	console.log('init cycle reset ON REGION!');
	console.log('reseting cycle of region: ' + this.region_id);
	$(this.el).empty();
	var self = this;
		
	self.cycle=0;
		
};


Region.prototype.play = function() {
	console.log('init play');
	this.isPaused = false;
	this.next();
	
};

Region.prototype.pause = function() {
	console.log('entered pause; paused at: ' + this.currentApp);
	this.isPaused = true;
	//console.log('curduration: '+this.curDuration);
	clearTimeout(this.currTimeout);
	//clearTimeout(this.curFadeout);
	
};

Region.prototype.insertApp = function(app) {
	
	// sandbox="allow-same-origin allow-scripts"
	
	var src = s.getAppSrc(app.cid);
	var sw = 0 || screen.width;
	var sh = 0 || screen.height;
	var wvwidth = this.width * sw;
	var wvheight = this.height * sh;
	//var el = $('<iframe sandbox="allow-same-origin" id="app" src="' + src + '" scrolling="no" />');
	
	var el = $('<webview id="app" partition="' + app.cid + '" style="width: '+wvwidth+'px; height: '+wvheight+'px;" src="' + src + '"> </webview>');
	//<webview id="wv0" partition="p0" style="width: 450px; height: 300px; border: 2px solid red" src="http://db.tt/FCCA7nuz"></webview>
	$(this.el).append(el);
	
	/*
	var self = this;
	
	
	app.chan = Channel.build({
		window : el[0].contentWindow,
		origin : "*",
		scope : "testScope",
		onReady : function() {
			console.log('ligacao feita');
		}
	});
	
	app.chan.bind("stop", function() {
  		console.log('application ' + app.src + ' executed stop');
  		self.pause();
	});
	
	app.chan.bind("delay", function(trans, t) {
  		console.log('application ' + app.src + ' with delay ' + t);
  		clearTimeout(self.currTimeout);
  		self.currTimeout = setTimeout(function () {
  			console.log('delay over');
			self.next();
		}, t);
	
	});
	
	app.chan.bind("video", function(trans, vdur) {
  		console.log('application ' + app.src + ' has a video');
  		clearTimeout(self.currTimeout);
  		self.currTimeout = setTimeout(function () {
  			console.log('video over');
			self.next();
		}, vdur * 1000);
	});
	*/
};

/*
 *  Primeiro next; add/del iframe
 */

Region.prototype.next = function() {
	clearTimeout(this.currTimeout);
	
	var elapp = $('#app');

	console.log('------------- next app ---------------');
	console.log('ELEMENTO REGION: ' + this.el);
	$(this.el).empty();
	
	//getNextApp
	console.log('previous app number: ' + this.currentApp + ' lenght lista: ' + this.containerList.length);
	console.log('region: ' + this.el + ' Cycle: ' + this.cycle);
	
	/*
	if(this.cycle>=1) {
		console.log('so posso iterar 1 vez!');
		p.notify();
		// qq coisa que notifique o player pai que esta regiao terminou o seu ciclo/s
	}
	*/
	
	if(this.currentApp==null) {
		//console.log('primeira vez!');
		this.currentApp = Math.abs((this.currentApp) % this.containerList.length);
	}
	else {
		//console.log('ja tenho numero');
		this.currentApp = Math.abs(((this.currentApp)+1) % this.containerList.length);
	}
	
	if((this.currentApp+1) >= this.containerList.length) {
		this.cycle++;
	}
	
	if(this.cycle>=1) {
		var layoutCycle = p.notify(this.region_id);
	}
	
	//this.currentApp = ((Math.abs((this.currentApp) % this.containerList.length) + 1) % this.containerList.length);
	console.log('this is app number: ' + this.currentApp);
	var app = this.containerList[this.currentApp];
	this.insertApp(app);	
	
	if(!this.isPaused) {
		var self = this;
		console.log('timeout: '+ app.dur);
		this.currTimeout = setTimeout(function () {
			if(layoutCycle == true) {
				console.log('LAYOUT CYCLE DONE');
				//self.pause();
				p.resetCycle();
				p.next();
			}
			else {
				console.log('LAYOUT CYCLE NOT DONE');
				self.next();
			}
		},app.dur * 1000);
	}
	
};

/*
 *  switchiframe para current/previous/next
 */

function loadIframe(iframeName, url, callback) {
    var $iframe = $('#' + iframeName);
    
    if ( $iframe.length ) {
        $iframe.attr('src',url);
        if (callback && typeof(callback) === 'function')
			callback(); 
        
        return false;
    }
    return true;
}

/*
 * switchiframe para app0/1/2, e com classe current next e previous
 */

function loadIframe2(iframeName, iframeClass, callback) {
    var $iframe = $('#' + iframeName);
	//$(".myclass.otherclass")
    if ( $iframe.length ) {
        $iframe.attr('class',iframeClass);
        console.log('mudei o attr');
        if (callback && typeof(callback) === 'function') {
        	console.log('callback time');  
			callback();
		}
        
        return false;
    }
    return true;
}

Region.prototype.previous = function() {
	clearTimeout(this.currTimeout);

	console.log('previous app');
	$(this.el).empty();	
	
	//getPreviousApp
	this.currentApp = Math.abs((this.currentApp - 1) % this.applications.length);
	var app = this.applications[this.currentApp];
	$(this.el).append('<iframe src="' + app.src + '" scrolling="no" />');
	
	if(!this.isPaused) {
		var self = this;
		console.log('timeout: '+ app.dur);
		this.currTimeout = setTimeout(function () {
			self.next();
		},app.dur * 1000);
	}
};

/*
 * Schedule
 */
var Schedule = function(options){
	this.url = options.url;
	this.id = "";
	this.name = "";
	this.lastUpdate = "";
	this.etag = "";
};

// update ficheiro json e respectiva callback a efectuar depois de lido
Schedule.prototype.update = function(callback){
	var self = this;
	$.getJSON(this.url,function(data){
		self.schedule = data.schedule;
		self.id = data.schedule.id;
		self.name = data.schedule.name;
		self.lastUpdate = data.schedule.updatedOn;
		self.etag = data.schedule.etag;
		
		self.apps = new Array();
		
		self.addApps(data.schedule.applications);
		
		if (callback && typeof(callback) === 'function')
			callback(data.schedule); 
  	});
};

Schedule.prototype.addApps = function(lstApps) {

	lstApps = lstApps instanceof Array ? lstApps : [lstApps];

	for (var i=0; i<lstApps.length; i++) {

		//console.log("app id: "+ lstApps[i].id + " Type app: " + lstApps[i].type + " App src: " + lstApps[i].src);
		this.apps.push(lstApps[i]);
		//console.log("this.app id: "+ this.apps[i].id);
	}
	
	this.showApps();

};

Schedule.prototype.showApps = function() {
	
	if(this.apps) {
		for(var i=0; i<this.apps.length; i++) {
			console.log("app id: "+ this.apps[i].id + " Type app: " + this.apps[i].type + " App src: " + this.apps[i].src)
		}
	}
};

Schedule.prototype.getAppSrc = function(appid) {
	if(this.apps) {
		for(var i=0; i<this.apps.length; i++) {
			if(this.apps[i].id == appid) { return this.apps[i].src; }
		}
	}
	return null;
};

//obtem todo o conteudo schedule
Schedule.prototype.getSchedule = function() {
	if(this.schedule) return this.schedule;
};

//devolve ao Player a lista de apps
Schedule.prototype.getApps = function() {
	if(self.apps) return self.apps;
};



/*
 *  Main
 */
var s, p;
$(function() {

	s = new Schedule({url:'json/schedulerv3.json'});
		
	s.update(function(){
		p = new Player({el:'#content', schedule:s});
		//p.play();
	});
	
	/**
	setInterval(function () {
		if(navigator.onLine) {
			console.log('connected...');
		}
		else {
			console.log('disconnected!');
		}
	}, 10000);**/
	
	$('#stop').click( function() {
		p.pause();
	});
	
	$('#play').click( function() {
		p.play();
	});
	
	$('#fwd').click( function() {
		p.next();
	});
	
	$('#back').click( function() {
		p.previous();
	});
	
});