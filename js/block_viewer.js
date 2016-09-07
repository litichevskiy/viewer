(function( exports ) {

    const
        ESC = 27; // keyCode

    function BlockViewer( data ) {

        if( !data.pubsub ) throw('module require PubSub');

        this.pubsub = data.pubsub;
        this.container = data.container;
        this.mainFoto = $('<div class="main_foto"></div>');
        this.layer = $('<div class="layer_main hide_block"></div>');
        $(this.layer).append( this.mainFoto );
        $(this.container).append( this.layer );
        this.flagMainFoto = false;
        this.leftScroll = new ScrollElement( this.container, 'scroll_left');
        this.rightScroll = new ScrollElement(this.container, 'scroll_right');
        this.topScroll = new ScrollElement(this.container, 'scroll_top');
        this.bottomScroll = new ScrollElement(this.container, 'scroll_down');

        var that = this;

        this.leftScroll.button.addEventListener('click',function( event ) {
            console.log( 'ScrollElement' )
        });

        this.rightScroll.button.addEventListener('click',function( event ) {
            console.log( 'ScrollElement' )
        });

        this.topScroll.button.addEventListener('click',function( event ) {
            console.log( 'ScrollElement' )
        });

        this.bottomScroll.button.addEventListener('click',function( event ) {
            console.log( 'ScrollElement' )
        });

        this.layer[0].addEventListener('click',function( event ) {
            if( that.flagMainFoto ) {

                that.hideMainFoto();
            }
        });

        $(document).keydown( function( event ) {
            if( event.keyCode === ESC ){
                if( that.flagMainFoto ){

                    that.hideMainFoto();
                }
            }
        });

        this.pubsub.subscribe('set_main_foto', this.showMainFoto.bind( this ));
    };

    BlockViewer.fn = BlockViewer.prototype;

    BlockViewer.fn.hideMainFoto = function() {

        $(this.layer).addClass('hide_block');
        this.flagMainFoto = false;
    };

    BlockViewer.fn.showMainFoto = function( data ) {

        $(this.mainFoto).html( data );
        $(this.layer).removeClass('hide_block');
        this.flagMainFoto = true;
    };

    exports.BlockViewer = BlockViewer;

})( window );