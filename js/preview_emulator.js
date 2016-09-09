(function( exports ) {

    const
        DEFOULT_CELLS = 6,
        DEFOULT_ROWS  = 5,
        UP    = 38, // keyCode
        DOWN  = 40, // keyCode
        RIGHT = 39, // keyCode
        LEFT  = 37, // keyCode
        ESC   = 27; // keyCode

    function PreviewEmulator( data ) {

        if ( !data.pubsub ) throw('module require PubSub');

        this.pubsub = data.pubsub;
        this.listCoord = [];
        this.rows  = data.rows  || DEFOULT_ROWS;
        this.cells = data.cells || DEFOULT_CELLS;

        this.createField();
        this.coordActiveCell = getRandomCell( this.rows, this.cells );

        this.pubsub.publish('init_preview', {
            rows  : this.rows,
            cells : this.cells
        });

        this.pubsub.publish('active_preview',{
            x : this.coordActiveCell.x,
            y : this.coordActiveCell.y
        });

        this.pubsub.subscribe('new_coordinates', this.setCoordinates.bind( this ));

        var that = this,
            minUp = 0, maxDowm = this.rows - 1,
            minLeft = 0, maxRight = this.cells - 1;

        $(document).keydown(function(event) {
            var code = event.keyCode;

            if ( code === UP )
                return that.changeActiveElement( UP, that.coordActiveCell, minUp );

            if ( code === DOWN  )
                return that.changeActiveElement( DOWN, that.coordActiveCell, maxDowm );

            if ( !event.ctrlKey && code === LEFT )
                return that.changeActiveElement( LEFT, that.coordActiveCell, minLeft );

            if ( !event.ctrlKey && code === RIGHT )
                return that.changeActiveElement( RIGHT, that.coordActiveCell, maxRight );

            if ( event.ctrlKey && code === RIGHT )
                return that.pubsub.publish('last',{quantity:that.rows, direct:'right'});

            if ( event.ctrlKey && code === LEFT )
                return that.pubsub.publish('last',{quantity:that.rows, direct:'left'});

            if( code === ESC )
                return that.pubsub.publish('close_main_foto');
        });
    };

    PreviewEmulator.fn = PreviewEmulator.prototype;

    PreviewEmulator.fn.setCoordinates = function( coord ) {

        this.coordActiveCell.x = coord.x;
        this.coordActiveCell.y = coord.y;
    };

    var changeCoord = (function() {
        var coord = {

            'up'    : function( data ) { data.x -= 1; return data },
            'down'  : function( data ) { data.x += 1; return data },
            'left'  : function( data ) { data.y -= 1; return data },
            'right' : function( data ) { data.y += 1; return data }
        };

        return function( direct, data, eventName ) {
            var newData;

            newData = coord[direct]( data );
            this.pubsub.publish( eventName, newData );
        }

    })();

    PreviewEmulator.fn.changeActiveElement = function( direct, data, value ) {
        if ( direct === UP && data.x > value ) {
            changeCoord.call( this, 'up', data, 'active_preview' );
        }
        else
            if ( direct === DOWN && data.x < value ) {
                changeCoord.call( this, 'down', data, 'active_preview' );
            }
            else
                if ( direct === LEFT && data.y > value ) {
                        changeCoord.call( this, 'left', data, 'active_preview' );
                }
                else
                    if ( direct === RIGHT && data.y < value ) {
                            changeCoord.call( this, 'right', data, 'active_preview' );
                    }
                    else
                        if( direct === LEFT || direct === RIGHT ) {
                            var dir = ( direct === LEFT ) ? dir ='left' : dir = 'right';

                            this.pubsub.publish('last', {
                                quantity : this.rows,
                                direct   : dir
                            });
                        }
    };

    PreviewEmulator.fn.createField = function() {

        var list, x, y;

        for( x = 0; x < this.rows; x++ ) {

            list = [];

            for( y = 0; y < this.cells; y++ ) {

                list.push({ coord_x : x,coord_y : y });
            }

            this.listCoord.push( list );
        }
    };

    function getRandomCell( rows, cells ) {

        var coord = {};

        coord.x = Math.floor( Math.random() * rows );
        coord.y = Math.floor( Math.random() * cells );

        return coord;
    };

    exports.PreviewEmulator = PreviewEmulator;

})( window );