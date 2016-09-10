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
        if ( data.list.length === 0 ) throw('not photo');// user info

        this.pubsub = data.pubsub;
        this.listCoord = [];
        this.rows  = data.rows  || DEFOULT_ROWS;
        this.cells = data.cells || DEFOULT_CELLS;

        if( data.load > 1 && data.load < this.cells + 1 ) this.quantity = this.rows * data.load;
        else this.quantity = this.rows;

        data.list = this.createField( data.list );
        this.coordActiveCell = getRandomCell( this.rows, this.cells );

        this.pubsub.publish('init_preview', {
            rows  : this.rows,
            cells : this.cells,
            list  : data.list

        });

        this.pubsub.publish('active_preview',{
            x : this.coordActiveCell.x,
            y : this.coordActiveCell.y
        });

        this.pubsub.subscribe('new_coordinates', this.setCoordinates.bind( this ));
        this.pubsub.subscribe('click_left', this.publishEventClick.bind( this ));
        this.pubsub.subscribe('click_right', this.publishEventClick.bind( this ));

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
                return that.pubsub.publish('last_right',{ quantity:that.quantity });

            if ( event.ctrlKey && code === LEFT )
                return that.pubsub.publish('last_left',{ quantity:that.quantity });

            if( code === ESC )
                return that.pubsub.publish('close_main_foto');
        });
    };

    PreviewEmulator.fn = PreviewEmulator.prototype;

    PreviewEmulator.fn.publishEventClick = function( str ) {
        var eventName;

        if( str === 'right' ) eventName = 'last_right';
        if( str === 'left'  ) eventName = 'last_left';

        this.pubsub.publish( eventName, { quantity:this.quantity }) ;
    };

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
                            var eventName = ( direct === LEFT ) ?
                                eventName = 'last_left' : eventName = 'last_right';

                            this.pubsub.publish( eventName, {
                                quantity : this.quantity
                            });
                        }
    };

    PreviewEmulator.fn.createField = function( data ) {

        if( this.rows * this.cells > data.length ) {

            getNewField.call( this, data );

            data = data.splice( 0, this.rows * this.cells );
        }

        for( var i = 0; i < this.rows; i++ ) {

            this.listCoord.push( [] );
        }

        for( var y = 0, x = 0, count = 0; count < data.length; count++ ) {

            this.listCoord[y].push({ coord_x : x, coord_y : y, elem : data[count] });
            y++;
            if( y === this.rows ) y = 0, x++;
        }

        return data;
    };

    function getRandomCell( rows, cells ) {

        var coord = {};

        coord.x = Math.floor( Math.random() * rows );
        coord.y = Math.floor( Math.random() * cells );

        return coord;
    };

    function getNewField( list ) {

        if( list.length <= 3 ) {

            if( list.length === 1 ) return this.rows = 1, this.cells = 1;

            else this.rows = 1, this.cells = 2;
        }

        while( this.rows > 2 ) {

            this.rows -= 1;
            ( this.cells > 3 ) ? this.cells -= 1 : this.cells = this.cells;

            if( this.rows * this.cells > list.length ) continue;
            else return;
        };

        while( this.rows === 2 ) {

            this.cells -= 1;

            if( this.rows * this.cells > list.length ) continue;
            else return;
        };
    };

    exports.PreviewEmulator = PreviewEmulator;

})( window );