Template.defaultLayout.events({
	'click .back-button-especial':function(){
		Router.go('home');
	}
})

Template.defautLayout.onRendered(function() {
if (Meteor.isCordova) {
  document.addEventListener("deviceready", function() {
    StatusBar.overlaysWebView(true);
    StatusBar.styleLightContent();
  }, false);
}
});