jwplayerPlaylist = (function (jwplayer) {

    /**
     * Find the last recorded index in the playlist.
     *
     * @returns {number} The last recorded in the playlist. If not found, it returns -1.
     */
    function findLastRecordedIndex() {
        for (var i = playlist.length - 1; i > -1; i--) {
            if (playlist[i].oldIndex !== undefined) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Clear the old index for each items.
     *
     * @params {Array} items The items to clear the old index.
     *
     * @returns {Array} The items with undefined index.
     */
    function clearOldIndex(items) {
        for (var i = 0; i < items.length; i++) {
            items[i].oldIndex = undefined;
        }
        return items;
    }

    var lastIndex = -1,
        oldPlaylistLength,
        playlist,
        playlistIsModified = false,
        template = function (player) {

            player.onPlaylist(
                /*
                 * Fired when a new playlist has been loaded into the player.
                 * Note this event is not fired as part of the initial playlist load (playlist is loaded when onReady is called).
                 *
                 * Reset playlist variables.
                 */
                function () {
                    playlist = player.getPlaylist();
                    oldPlaylistLength = playlist.length;
                    playlistIsModified = false;
                    for (var i = 0; i < oldPlaylistLength; i++) {
                        playlist[i].oldIndex = i;
                    }
                }
            );

            player.onPlaylistItem(
                /*
                 * Fired when the playlist index changes to a new playlist item.
                 * This event occurs before the player begins playing the new playlist item.
                 *
                 * Check if the playlist has been modified.
                 * - If it is the case, load the modified playlist then play the index, where it should be;
                 * - otherwise, do nothing.
                 */
                function () {

                    var index = player.getPlaylistIndex();

                    if (!playlistIsModified) {
                        lastIndex = index;
                        return;
                    }

                    if ((index - lastIndex + 1) >= oldPlaylistLength) {
                        // Previous button on first item: play the last item of the playlist.
                        lastIndex = playlist.length - 1;

                    } else if ((lastIndex - index + 1) >= oldPlaylistLength) {
                        // Next button on last item: play the next item of the playlist.
                        lastIndex = (findLastRecordedIndex() + 1) % playlist.length;

                    } else {

                        /*
                         * Find the playing index in the modified playlist.
                         * If it doesn't exist, take the next existing index.
                         */
                        for (var i = 0; i < playlist.length; i++) {
                            if (playlist[i].oldIndex !== undefined && playlist[i].oldIndex >= index) {
                                lastIndex = i;
                                break;
                            }
                        }

                    }

                    player.load(playlist);
                    player.playlistItem(lastIndex);

                }
            );

            player.onComplete(
                // Fired when an item completes playback.
                function () {
                    if ((lastIndex + 1) >= oldPlaylistLength && playlistIsModified) {
                        // Playlist is completed (I don't use onPlaylistComplete, there were too many bugs) and modified.
                        var playlistIndex = (findLastRecordedIndex() + 1) % playlist.length;
                        player.load(playlist);
                        if (playlistIndex > 0) {
                            // Playlist is no more completed: there are new elements at the end of the playlist.
                            player.playlistItem(playlistIndex);
                        }
                    }
                }
            );

        };

    jwplayer().registerPlugin('jwplayer.playlist', '6.0', template);

    return {
        /**
         * Join the playlist with other array(s).
         *
         * @param {...Object} a Arrays to concatenate to the resulting array.
         */
        concat: function (a) {

            // The arrays to add to the end of the playlist.
            var arrays = Array.prototype.slice.call(arguments);

            for (var i = 0; i < arrays.length; i++) {
                arrays[i] = clearOldIndex(arrays[i]);
                playlist = playlist.concat(arrays[i]);
            }

            playlistIsModified = true;

        },

        /**
         * Get the player's modified playlist array.
         *
         * @returns {Array} The player's modified playlist array.
         */
        getPlaylist: function () {
            return playlist;
        },

        /**
         * Get the playlist item object at the specified index.
         * If the index is not specified, the currently playing item is returned.
         *
         * @param {number} index The playlist index.
         *
         * @returns {Object} The playlist item object.
         */
        getPlaylistItem: function (index) {
            if (index !== undefined) {
                return playlist[index];
            } else {
                return jwplayer().getPlaylistItem();
            }
        },

        /**
         * Get the index of the currently active item in the playlist.
         *
         * @returns {number} The index of the currently active item in the playlist. If not found, it returns -1.
         */
        getPlaylistIndex: function () {

            var index = jwplayer().getPlaylistIndex();

            if (!playlistIsModified) {
                return index;
            }

            for (var i = 0; i < playlist.length; i++) {
                if (playlist[i].oldIndex !== undefined) {
                    if (playlist[i].oldIndex == index) {
                        return i;
                    } else if (playlist[i].oldIndex > index) {
                        break;
                    }
                }
            }

            return -1;

        },

        /**
         * Append the given items to the end of the playlist.
         *
         * @param {...Object} i The items to add to the end of the array.
         */
        push: function (i) {

            var items = Array.prototype.slice.call(arguments);
            items = clearOldIndex(items);

            playlist = playlist.concat(items);
            playlistIsModified = true;

        },

        /**
         * Add new items while removing old items.
         *
         * @param {number} index   The index at which to start changing the array.
         * @param {number} howMany The number of old array items to remove.
         *                         If howMany is 0, no items are removed.
         *                         If howMany is greater than the number of items left in the array starting at index or isn't specified, then all of the items through the end of the array will be deleted.
         * @param {...Object} i    The items to add to the array.
         *                         If you don't specify any items, splice simply removes items from the array.
         */
        splice: function (index, howMany, i) {

            if (index < 0) {
                // If negative, will begin that many items from the end.
                index += playlist.length;
            } else if (index >= playlist.length) {
                // If greater than the length of the array, actual starting index will be set to the length of the array.
                index = playlist.length;
            }

            var items = Array.prototype.slice.call(arguments, 2);

            if (isNaN(howMany)) {
                items = Array.prototype.concat(howMany, items);
                howMany = playlist.length;
            }

            items = clearOldIndex(items);

            playlist = playlist.slice(0, index).concat(items, playlist.slice(index + howMany));

            playlistIsModified = true;

        }

    };

})(jwplayer);
