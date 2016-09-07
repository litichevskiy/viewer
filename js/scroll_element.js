(function( exports ) {

    function ScrollElement( container, className ) {

        this.button = document.createElement('div');
        this.button.classList.add( className );

        container.appendChild( this.button );

    };

    exports.ScrollElement = ScrollElement;

})( window );