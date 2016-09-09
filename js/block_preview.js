(function( exports, storageAPI ) {

    const
        WIDTH_SCREEN = 99, // percent
        HEIGHT_SCREEN = 99, // percent
        CLASS_ACTIVE_PREVIEW = 'active_preview',
        ENTER = 13; //keyCode

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

        this.pubsub.subscribe('init_preview', this.createFieldPreview.bind( this, data.list ));
        this.pubsub.subscribe('active_preview', this.changeActivePreview.bind( this ));
        this.pubsub.subscribe('last', this.addAndRemoveCells.bind( this ));
    };

    BlockPreview.fn = BlockPreview.prototype;

    BlockPreview.fn.addAndRemoveCells = function( data ) {
        var that = this,
            elem, From, id, list, cashRow, fromPositinon;

            if( data.direct === 'right' ) {

                From = that.lastID;
                this.lastID += data.quantity, this.firstID += data.quantity;
                id = 0, fromPositinon = data.quantity;//
                this.pubsub.publish('history_true');

            } else{

                if( this.firstID <= 0 ) {
                    this.pubsub.publish('history_false');
                    return;
                }

                this.lastID -= data.quantity, this.firstID -= data.quantity;
                From = that.firstID;
                id = data.quantity - 1, fromPositinon = 0;
                this.pubsub.publish('new_img_true');

                if( this.firstID === 0 ) this.pubsub.publish('history_false');
            }

        storageAPI.getData( data.quantity, From )
        .then( function( response ) {

            response = response || [];

            if( response.length < 1 ) {
                that.pubsub.publish('new_img_false');
                return;
            }

            response.forEach( function( item, i ) {

                elem = createCell.call( that, item );

                that.storageRows[i].removeChild( that.storageCells[i][id] );

                if( data.direct === 'right' ) that.storageRows[i].appendChild( elem );
                else that.storageRows[i].insertAdjacentElement('afterBegin', elem );

                that.storageCells[i].splice( id, 1 );
                that.storageCells[i].splice( fromPositinon, 0, elem );
            });

            that.changeActivePreview( that.coordActiveCell );
        })
        .fail( function( err ) {

        })
    };

    BlockPreview.fn.changeActivePreview = function( coord ) {

        if ( this.activePreview ) {

            this.activePreview.classList.remove( CLASS_ACTIVE_PREVIEW );

            this.activePreview = this.storageCells[coord.x][coord.y];
            this.activePreview.classList.add( CLASS_ACTIVE_PREVIEW );

            this.coordActiveCell = coord;

            this.pubsub.publish('main_foto', $(this.activePreview.children[0]).html() );

        } else {

            this.activePreview = this.storageCells[coord.x][coord.y];
            $(this.activePreview).addClass( CLASS_ACTIVE_PREVIEW );
            this.coordActiveCell = coord;
        }
    };

    BlockPreview.fn.createFieldPreview = function( list, data ) {

        list = list || [];

        var fragment = document.createDocumentFragment(),
            params = getParamsPreview( data ),
            marginLeft = params.marginLeft,
            marginTop = params.marginTop,

            rowsElement, arrayCell,
            cellElement, x, y;

            this.lastID = 0;
            this.widthCells = params.width;
            this.heightCells = params.height;

        for ( x = 0; x < data.rows; x++ ) {

            rowsElement = createRow.call( this );

            this.storageRows.push( rowsElement[0] );

            arrayCell = [];

            for ( y = 0; y < data.cells; y++ ) {

                cellElement = createCell.call( this, list[this.lastID] );

                $(rowsElement).append(cellElement);

                arrayCell.push( $(cellElement)[0] );

                this.lastID++;
            }

            $(fragment).append( rowsElement );

            this.storageCells.push( arrayCell );
        }

        $(this.container).append( fragment );
    };

    function createCell( content ) {

        var preview = $(
            '<div class="cell_previe">'+
                '<div class="fake">'+content+'</div>'+
                '<div class="layer_preview"></div>'+
            '</div>'
        );

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