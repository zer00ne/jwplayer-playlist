jwplayerPlaylist=function(h){function l(){for(var a=c.length-1;-1<a;a--)if(void 0!==c[a].a)return a;return-1}function k(a){for(var b=0;b<a.length;b++)a[b].a=void 0;return a}var e=-1,g,c,f=!1;h().registerPlugin("jwplayer.playlist","6.0",function(a){a.onPlaylist(function(){c=a.getPlaylist();g=c.length;f=!1;for(var b=0;b<g;b++)c[b].a=b});a.onPlaylistItem(function(){var b=a.getPlaylistIndex();if(f){if(b-e+1>=g)e=c.length-1;else if(e-b+1>=g)e=(l()+1)%c.length;else for(var d=0;d<c.length;d++)if(void 0!==
c[d].a&&c[d].a>=b){e=d;break}a.load(c);a.playlistItem(e)}else e=b});a.onComplete(function(){if(e+1>=g&&f){var b=(l()+1)%c.length;a.load(c);0<b&&a.playlistItem(b)}})});return{concat:function(a){a=Array.prototype.slice.call(arguments);for(var b=0;b<a.length;b++)a[b]=k(a[b]),c=c.concat(a[b]);f=!0},getPlaylist:function(){return c},getPlaylistItem:function(a){return void 0!==a?c[a]:h().getPlaylistItem()},getPlaylistIndex:function(){var a=h().getPlaylistIndex();if(!f)return a;for(var b=0;b<c.length;b++)if(void 0!==
c[b].a){if(c[b].a==a)return b;if(c[b].a>a)break}return-1},push:function(a){a=Array.prototype.slice.call(arguments);a=k(a);c=c.concat(a);f=!0},splice:function(a,b,d){0>a?a+=c.length:a>=c.length&&(a=c.length);d=Array.prototype.slice.call(arguments,2);isNaN(b)&&(d=Array.prototype.concat(b,d),b=c.length);d=k(d);c=c.slice(0,a).concat(d,c.slice(a+b));f=!0}}}(jwplayer);