(function( exports, storageAPI ) {

    const
        CLASS_ACTIVE_PREVIEW = 'active_preview',
        WIDTH_SCREEN = 99,    // percent
        HEIGHT_SCREEN = 99,   // percent
        TIME_ANITATION = 0, // ms
        ENTER = 13;           //keyCode

    function BlockPreview( data ) {

        if( !data.pubsub ) throw('module require PubSub');

        this.pubsub = data.pubsub;
        this.container = $('<section class="container_previe"></section>')[0];
        $(data.container).append( this.container );
        this.storageCells = [];
        this.storageRows = [];
        this.firstID = 0;
        this.activePreview;
        this.lastID;
        this.widthCells;
        this.heightCells
        this.coordActiveCell;

        var that = this;

        this.container.addEventListener('click', function( event ) {
            var target = event.target,
                data;

            while( true ) {

                if( target.classList.contains('cell_previe') ) {

                    publishClick.call( that, target );
                    break;

                } else target = target.parentElement;
            };
        });

        $(document).keydown(function(event) {
            if( event.keyCode === ENTER ) {

                publishClick.call( that, that.activePreview );
            }
        });

        this.pubsub.subscribe('init_preview', this.createFieldPreview.bind( this ));
        this.pubsub.subscribe('active_preview', this.changeActivePreview.bind( this ));
        this.pubsub.subscribe('last_right', this.addNewImg.bind( this ));
        this.pubsub.subscribe('last_left', this.addHistoryImg.bind( this ));
    };

    BlockPreview.fn = BlockPreview.prototype;

    BlockPreview.fn.addNewImg = function( data ) {
        var that = this,
            lengthCells = that.storageCells.length,
            length, elem, img;

        storageAPI.getData( data.quantity, this.lastID )
        .then( function( response ) {

            response = response || [];

            length = response.length;

            if( length < 1 ) return that.pubsub.publish('new_img_false');

            for( var i = 0, x = 0, y = 0; i < length; i++ ) {

                elem = that.storageRows[y].removeChild( that.storageCells[y][x] );
                img = $(elem).find('img')[0];
                $(img).css({'opacity':'0'});
                img.src = response[i]['small'];
                that.storageRows[y].appendChild( elem );
                that.storageCells[y].splice( x, 1 );
                that.storageCells[y].push( elem );
                y++;

                if( y === lengthCells ) y = 0;
            }

            that.lastID = that.lastID + response.length;
            that.firstID = that.firstID + response.length;

            that.pubsub.publish('history_true');
            that.changeActivePreview( that.coordActiveCell );
        })
        .fail( function( err ) {

        });
    };

    BlockPreview.fn.addHistoryImg = function( data ) {
        var that = this,
            lengthCells = that.storageCells[0].length - 1,
            From = this.firstID - data.quantity,
            length, elem;

        if( From < 0 ) data.quantity = this.firstID, From = 0;
        if( this.firstID === 0 ) return this.pubsub.publish('history_false');

        storageAPI.getData( data.quantity, From )
        .then( function( response ) {

            response = response || [];

            length = response.length;

            if( length < 1 ) return that.pubsub.publish('new_img_false');

            for( var i = 0, x = lengthCells, y = 0; i < length; i++ ) {

                elem = that.storageRows[y].removeChild( that.storageCells[y][x] );
                img = $(elem).find('img')[0];
                $(img).css({'opacity':'0'});
                img.src = response[i]['small'];
                that.storageRows[y].insertAdjacentElement('afterBegin', elem );
                that.storageCells[y].splice( x, 1 );
                that.storageCells[y].splice( 0, 0, elem );
                y++;

                if( y > that.storageRows.length - 1 ) y = 0;
            }

            that.firstID -= length
            that.lastID -= length;

            if( that.firstID <= 0 )that.pubsub.publish('history_false');

            that.changeActivePreview( that.coordActiveCell );
        })
        .fail( function( err ) {

        });
    };

    BlockPreview.fn.changeActivePreview = function( coord ) {

        if ( this.activePreview ) {

            this.activePreview.classList.remove( CLASS_ACTIVE_PREVIEW );

            this.activePreview = this.storageCells[coord.x][coord.y];
            this.activePreview.classList.add( CLASS_ACTIVE_PREVIEW );

            this.coordActiveCell = coord;

            this.pubsub.publish('main_foto', $(this.activePreview).find('img')[0].src );

        } else {

            this.activePreview = this.storageCells[coord.x][coord.y];
            $(this.activePreview).addClass( CLASS_ACTIVE_PREVIEW );
            this.coordActiveCell = coord;
        }
    };

    BlockPreview.fn.createFieldPreview = function( data ) {

        var fragment = document.createDocumentFragment(),
            params = getParamsPreview( data ),

            rowsElement, cellElement;

            this.lastID = 0;
            this.widthCells = params.width;
            this.heightCells = params.height;

        for( var i = 0; i < data.rows; i++ ) {

            rowsElement = createRow.call( this );
            $(fragment).append( rowsElement[0] );
            this.storageRows.push( rowsElement[0] );
            this.storageCells.push( [] );
        };

        for( var x = 0, y = 0; this.lastID < data.list.length; this.lastID++ ) {

            cellElement = createCell.call( this, data.list[this.lastID]['small'] );
            this.storageCells[y].push( cellElement );
            this.storageRows[y].appendChild( cellElement );
            y++;
            if( y === data.rows ) y = 0;
        }

        $(this.container).append( fragment );
    };

    function createCell( path ) {

        var preview = $(
            '<div class="cell_previe">'+
                '<div class="layer_preview"></div>'+
            '</div>'
        );

        var img = $('<img  src="'+path+'"class="preview">')

        $(img).on('load', function() {

            $(this).animate({'opacity':'1'}, TIME_ANITATION );
        });

        $(preview).append(img)

        $(preview).css({ 'width' : this.widthCells + 'vw' });

        return preview[0];
    };

    function createRow(){

        var rowsElement = $('<div class="rows_previe"></div>');

        $(rowsElement).css({ 'height' : this.heightCells + 'vh' });

        return rowsElement;
    };

    function searchActiveElement( list, target ) {

        var index, i;

        for( i = 0; i < list.length; i++ ) {

            index = list[i].indexOf( target );

            if( index === -1 ) continue;

            return {
                element : target,
                coord:{ x : i, y : index }
            };
        }

        return target;
    }

    function publishClick( target ) {

        data = searchActiveElement( this.storageCells, target );
        this.pubsub.publish('new_coordinates', data.coord );
        this.pubsub.publish('set_main_foto', $(data.element.children[0]).html() );
        this.changeActivePreview( data.coord );
    };

    function getParamsPreview( data ) {

        var width = Math.floor( WIDTH_SCREEN / data.cells ),
            height = Math.floor( HEIGHT_SCREEN / data.rows  ),
            marginLeft = ( WIDTH_SCREEN - ( width * data.cells )) / data.cells,
            marginTop = ( HEIGHT_SCREEN - ( height * data.rows )) / data.rows;

        return {

            width      : width,
            height     : height,
            marginLeft : marginLeft,
            marginTop  : marginTop
        }
    };

    exports.BlockPreview = BlockPreview;

})( window, storageAPI );