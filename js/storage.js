(function( exports ){

    var storage = (function() {

        var list = [];

        return {

            createList : function( lengthArray ) {

                lengthArray = lengthArray || 100;

                for( var i = 0; i < lengthArray; i++ ) {

                    list.push( i );
                }
            },

            getList : function( quantity, From ) {

                var data = [];

                if( isNaN( quantity ) || isNaN( From ) ) throw('check arguments');

                if( From < list.length ) {

                    data = list.slice( From, From + quantity );

                    return data;

                } else {

                    return data;
                }
            }
        }

    })();

    storage.createList( 300 );

    exports.storage = storage;

})( window );