(function( exports ){

    function initPreview( data ) {

        if( !data.container ) throw('initPreview required HTML container');

        $.when(

            storageAPI.getData( data.rows * data.cells, 0 )
        )
        .then( function( response ) {

            var pubsub = new PubSub(),


            blockPreview = new BlockPreview({
                container : data.container,
                pubsub    : pubsub
            }),

            blockViewer = new BlockViewer({
                container : data.container,
                pubsub    : pubsub
            }),

            previewEmulator = new PreviewEmulator({
                pubsub : pubsub,
                cells  : data.cells,
                rows   : data.rows,
                list   : response,
                load   : data.load
            });

        })
        .fail( function( error ){
            throw(error);
        });
    }

    exports.initPreview = initPreview;

})( window );