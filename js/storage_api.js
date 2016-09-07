var storageAPI = (function(){

    return {

        getData : function( quantity, From ) {

            if( isNaN( quantity ) || isNaN( From ) ) throw('check arguments');

            var defer = $.Deferred();

            var data = storage.getList( quantity, From );

            if ( data ) defer.resolve( data );
            else defer.reject('Error data is not defined');

            return defer;
        }
    }

})();