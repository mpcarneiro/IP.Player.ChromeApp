chrome.app.runtime.onLaunched.addListener(function() {
	// Tell your app what to launch and how.
	chrome.app.window.create('window.html', {
		width: 1920,
		height: 1080,
		state: 'maximized' 
    });
});


