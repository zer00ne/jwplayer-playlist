QUnit.asyncTest("Asynchronous tests.", function (assert) {

    setTimeout(function () {

        assert.equal(4, jwplayerPlaylist.getPlaylist().length, "Initial length.");
        assert.equal(0, jwplayerPlaylist.getPlaylistIndex(), "Initial index.");
        assert.equal(file1, jwplayerPlaylist.getPlaylistItem().file, "Initial item.");
        assert.equal(file4, jwplayerPlaylist.getPlaylistItem(3).file, "Initial 4th item.");

        jwplayerPlaylist.concat(
            jwplayerPlaylist.getPlaylistItem(0)
        );
        assert.equal(file1, jwplayerPlaylist.getPlaylistItem(4).file, "Concat. Validate item file.");
        assert.ok(undefined === jwplayerPlaylist.getPlaylistItem(4).oldIndex, "Concat. Validate item old index.");

        jwplayerPlaylist.concat(
            [jwplayerPlaylist.getPlaylistItem(1)],
            [jwplayerPlaylist.getPlaylistItem(2), jwplayerPlaylist.getPlaylistItem(3)]
        );
        assert.equal(file2, jwplayerPlaylist.getPlaylistItem(5).file, "Concat. Validate item file.");
        assert.ok(undefined === jwplayerPlaylist.getPlaylistItem(5).oldIndex, "Concat. Validate item old index.");
        assert.equal(file3, jwplayerPlaylist.getPlaylistItem(6).file, "Concat. Validate item file.");
        assert.ok(undefined === jwplayerPlaylist.getPlaylistItem(6).oldIndex, "Concat. Validate item old index.");
        assert.equal(file4, jwplayerPlaylist.getPlaylistItem(7).file, "Concat. Validate item file.");
        assert.ok(undefined === jwplayerPlaylist.getPlaylistItem(7).oldIndex, "Concat. Validate item old index.");

        jwplayerPlaylist.push(jwplayerPlaylist.getPlaylistItem(0));
        assert.equal(file1, jwplayerPlaylist.getPlaylistItem(8).file, "Push. Validate item file.");
        assert.ok(undefined === jwplayerPlaylist.getPlaylistItem(8).oldIndex, "Push. Validate item old index.");

        jwplayerPlaylist.push(
            jwplayerPlaylist.getPlaylistItem(1),
            jwplayerPlaylist.getPlaylistItem(2),
            jwplayerPlaylist.getPlaylistItem(3)
        );
        assert.equal(file2, jwplayerPlaylist.getPlaylistItem(9).file, "Push. Validate item file.");
        assert.ok(undefined === jwplayerPlaylist.getPlaylistItem(9).oldIndex, "Push. Validate item old index.");
        assert.equal(file3, jwplayerPlaylist.getPlaylistItem(10).file, "Push. Validate item file.");
        assert.ok(undefined === jwplayerPlaylist.getPlaylistItem(10).oldIndex, "Push. Validate item old index.");
        assert.equal(file4, jwplayerPlaylist.getPlaylistItem(11).file, "Push. Validate item file.");
        assert.ok(undefined === jwplayerPlaylist.getPlaylistItem(11).oldIndex, "Push. Validate item old index.");

        jwplayerPlaylist.splice(0, 4);
        assert.equal(8, jwplayerPlaylist.getPlaylist().length, "Splice at the beginning. New length.");
        assert.equal(file1, jwplayerPlaylist.getPlaylistItem(0).file, "Splice. New 1st item.");

        jwplayerPlaylist.splice(-1, 1);
        assert.equal(7, jwplayerPlaylist.getPlaylist().length, "Splice at the end. New length.");
        assert.equal(file3, jwplayerPlaylist.getPlaylistItem(6).file, "Splice. New last item.");

        jwplayerPlaylist.splice(1000, 1);
        assert.equal(7, jwplayerPlaylist.getPlaylist().length, "Splice nothing. Length.");

        jwplayerPlaylist.splice(
            1,
            jwplayerPlaylist.getPlaylistItem(1),
            jwplayerPlaylist.getPlaylistItem(2),
            jwplayerPlaylist.getPlaylistItem(3)
        );
        assert.equal(4, jwplayerPlaylist.getPlaylist().length, "Slice all items except the 1st one. New length.");
        assert.equal(file1, jwplayerPlaylist.getPlaylistItem(0).file, "Splice. Validate item file.");
        assert.ok(undefined === jwplayerPlaylist.getPlaylistItem(0).oldIndex, "Splice. Validate item old index.");
        assert.equal(file2, jwplayerPlaylist.getPlaylistItem(1).file, "Splice. Validate item file.");
        assert.ok(undefined === jwplayerPlaylist.getPlaylistItem(1).oldIndex, "Splice. Validate item old index.");
        assert.equal(file3, jwplayerPlaylist.getPlaylistItem(2).file, "Splice. Validate item file.");
        assert.ok(undefined === jwplayerPlaylist.getPlaylistItem(2).oldIndex, "Splice. Validate item old index.");
        assert.equal(file4, jwplayerPlaylist.getPlaylistItem(3).file, "Splice. Validate item file.");
        assert.ok(undefined === jwplayerPlaylist.getPlaylistItem(3).oldIndex, "Splice. Validate item old index.");

        jwplayerPlaylist.splice(
            1000,
            jwplayerPlaylist.getPlaylistItem(3)
        );
        assert.equal(5, jwplayerPlaylist.getPlaylist().length, "Splice, add item at the end. New length.");
        assert.equal(file4, jwplayerPlaylist.getPlaylistItem(4).file, "Splice. Validate item file.");
        assert.ok(undefined === jwplayerPlaylist.getPlaylistItem(4).oldIndex, "Splice. Validate item old index.");

        jwplayerPlaylist.splice(
            0,
            0,
            jwplayerPlaylist.getPlaylistItem(1)
        );
        assert.equal(6, jwplayerPlaylist.getPlaylist().length, "Splice, add item at the beginning. New length.");
        assert.equal(-1, jwplayerPlaylist.getPlaylistIndex(), "Initial index.");
        assert.equal(file2, jwplayerPlaylist.getPlaylistItem(0).file, "Splice. Validate item file.");
        assert.ok(undefined === jwplayerPlaylist.getPlaylistItem(0).oldIndex, "Splice. Validate item old index.");

        QUnit.start();

    }, 1000);

});
