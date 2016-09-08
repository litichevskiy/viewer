(function( exports ) {

    function ScrollElement( container, className, text ) {

        this.button = $('<div class="'+className+'">'+text+'</div>');

        $(container).append( this.button );

    };

    exports.ScrollElement = ScrollElement;

})( window );