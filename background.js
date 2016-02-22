var mytabs = mytabs || {};

mytabs.switchTab = function( index, type ) {

    chrome.windows.getLastFocused({}, function( window ){

        var pinned = type === 'pin';

        var tabs = chrome.tabs.query({ windowId: window.id, pinned: pinned }, function( tabs ) {

            var idx = parseInt( index );

            if( idx > 0 && idx < 9 ) {
                var tabID = tabs[idx-1].id
            } else {
                var tabID = tabs[(tabs.length-1)].id
            }

            chrome.tabs.update(tabID, {active:true});
        } );
    } );

}

chrome.commands.onCommand.addListener(function(command) {
    var tab = command.split('-');
    if( tab.length == 2 && ( tab[0] === 'tab' || tab[0] === 'pin' ) ) {
        mytabs.switchTab( tab[1], tab[0] );
    }
});
