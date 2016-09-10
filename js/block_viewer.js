(function( exports ) {

    const
        DIRECT_LEFT = 'left',
        DIRECT_RIGHT = 'right';

    function BlockViewer( data ) {

        if( !data.pubsub ) throw('module require PubSub');

        this.pubsub = data.pubsub;
        this.container = data.container;
        this.mainFoto = $('<div class="main_foto"></div>');
        this.layer = $('<div class="layer_main"></div>');
        this.close = $('<div class="close_main_foto">&#10006;</div>')
        $(this.layer).append( this.close );
        $(this.layer).append( this.mainFoto );
        $(this.container).append( this.layer );
        this.flagMainFoto = false;
        this.leftScroll = $('<div class="scroll_left">&lsaquo;</div>');
        this.rightScroll = $('<div class="scroll_right">&rsaquo;</div>');
        $(this.container).append( this.leftScroll );
        $(this.container).append( this.rightScroll );
        this.hideScrollHistory();

        var that = this;

        $(this.leftScroll).click( clickButtonScroll.bind( this ));
        $(this.rightScroll).click( clickButtonScroll.bind( this ));
        $(this.close).on('transitionend', changeRotate.bind(null, this.close));

        this.layer[0].addEventListener('click',function( event ) {

            if( event.target === that.layer[0] ){

                if( that.flagMainFoto ) {

                    that.hideMainFoto();
                }
            }
        });

        $( this.close ).click( function( event ) {

            that.hideMainFoto();
        });

        this.pubsub.subscribe('set_main_foto', this.showMainFoto.bind( this ));
        this.pubsub.subscribe('init_preview', this.setCellsAndRows.bind( this ));
        this.pubsub.subscribe('history_false', this.hideScrollHistory.bind( this ));
        this.pubsub.subscribe('history_true', this.showScrollHistory.bind( this ));
        this.pubsub.subscribe('new_img_false', this.hideScrollAdd.bind( this ));
        this.pubsub.subscribe('new_img_true', this.showScrollAdd.bind( this ));
        this.pubsub.subscribe('main_foto', this.setMainFoto.bind( this ));
        this.pubsub.subscribe('close_main_foto', this.hideMainFoto.bind( this ));
    };

    function clickButtonScroll( event ) {
        var eventName = 'click_right',
            direct = 'right';

        if( event.target === this.leftScroll[0] )
            direct = 'left', eventName = 'click_left';

        this.pubsub.publish(eventName, direct );
    };

    BlockViewer.fn = BlockViewer.prototype;

    BlockViewer.fn.setMainFoto = function( data ) {

        if( !this.flagMainFoto ) return;

        $(this.mainFoto).html( data );
    };

    BlockViewer.fn.hideScrollHistory = function() {

        $( this.leftScroll ).hide(0);
    };

    BlockViewer.fn.showScrollHistory = function() {

        $( this.leftScroll ).show(0)
    };

    BlockViewer.fn.hideScrollAdd = function() {

        $( this.rightScroll ).hide(0);
    };

    BlockViewer.fn.showScrollAdd = function() {

        $( this.rightScroll ).show(0);
    };

    BlockViewer.fn.setCellsAndRows = function( data ) {

        this.rows = data.rows;
        this.cells = data.cells;
    };

    BlockViewer.fn.hideMainFoto = function() {

        if( !this.flagMainFoto ) return;

        $(this.close).css({ 'transform' : 'rotate(90deg)' });

        $(this.layer).css({
            'opacity' : '0',
            'z-index' : '0'
        });

        this.flagMainFoto = false;
    };

    BlockViewer.fn.showMainFoto = function( data ) {

        $(this.mainFoto).html( data );

        $(this.layer).css({
            'opacity' : '1',
            'z-index' : '2'
        });

        this.flagMainFoto = true;
    };

    function changeRotate( target ) {

         $(target).css({ 'transform' : 'rotate(0deg)' });
     };

    exports.BlockViewer = BlockViewer;

})( window );