(function( exports ) {

    function ScrollElement( container, className ) {

        this.button = $('<div class=""></div>');

        $(container).append( this.button );

    };

    exports.ScrollElement = ScrollElement;

})( window );