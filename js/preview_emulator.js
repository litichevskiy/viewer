(function( exports ) {

    const
        DEFOULT_CELLS = 6,
        DEFOULT_ROWS  = 5,
        UP    = 38, // keyCode
        DOWN  = 40, // keyCode
        RIGHT = 39, // keyCode
        LEFT  = 37; // keyCode

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

            if ( code === UP ) {
                that.changeActiveElement(
                    UP, that.coordActiveCell, minUp
                );
            } else
                if ( code === DOWN  ) {
                    that.changeActiveElement(
                        DOWN, that.coordActiveCell, maxDowm
                    );
                } else
                    if ( code === LEFT  ) {
                        that.changeActiveElement(
                            LEFT, that.coordActiveCell, minLeft
                        );
                    } else
                        if ( code === RIGHT ) {
                            that.changeActiveElement(
                                RIGHT, that.coordActiveCell, maxRight
                            );
                        }
        });
    };

    PreviewEmulator.fn = PreviewEmulator.prototype;

    PreviewEmulator.fn.setCoordinates = function( coord ) {

        this.coordActiveCell.x = coord.x;
        this.coordActiveCell.y = coord.y;
    };

    PreviewEmulator.fn.changeActiveElement = function( direct, data, value ) {

        if ( direct === UP ) {

            if( data.x > value ){
                data.x -= 1 ,this.pubsub.publish('active_preview',data);
            }

        } else

            if ( direct === DOWN ) {

                if( data.x < value ) {
                    data.x += 1 ,this.pubsub.publish('active_preview',data);
                }
            }
            else

                if ( direct === LEFT ) {

                    if( data.y > value ) {
                        data.y -= 1, this.pubsub.publish('active_preview',data);
                    }
                    else{

                        this.pubsub.publish('last_right', {
                            quantity : this.rows,
                            direct   : 'left'
                        });
                    }
                }
                else

                    if ( direct === RIGHT ) {

                        if( data.y < value ) {
                            data.y += 1, this.pubsub.publish('active_preview',data);
                        }
                        else{

                            this.pubsub.publish('last_left', {
                                quantity : this.rows,
                                direct   : 'right'
                            });
                        }
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