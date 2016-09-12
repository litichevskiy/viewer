(function( exports ){

    var storage = (function() {

        var list = [

            {
                'small' : './img/storage_img/small_photo_1.jpg',
                'big'   : './img/storage_img/big_photo_1.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_2.jpg',
                'big'   : './img/storage_img/big_photo_2.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_3.jpg',
                'big'   : './img/storage_img/big_photo_3.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_4.jpg',
                'big'   : './img/storage_img/big_photo_4.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_5.jpg',
                'big'   : './img/storage_img/big_photo_5.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_6.jpg',
                'big'   : './img/storage_img/big_photo_6.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_7.jpg',
                'big'   : './img/storage_img/big_photo_7.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_8.jpg',
                'big'   : './img/storage_img/big_photo_8.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_9.jpg',
                'big'   : './img/storage_img/big_photo_9.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_10.jpg',
                'big'   : './img/storage_img/big_photo_10.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_11.jpg',
                'big'   : './img/storage_img/big_photo_11.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_12.jpg',
                'big'   : './img/storage_img/big_photo_12.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_13.jpg',
                'big'   : './img/storage_img/big_photo_13.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_14.jpg',
                'big'   : './img/storage_img/big_photo_14.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_15.jpg',
                'big'   : './img/storage_img/big_photo_15.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_16.jpg',
                'big'   : './img/storage_img/big_photo_16.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_17.jpg',
                'big'   : './img/storage_img/big_photo_17.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_18.jpg',
                'big'   : './img/storage_img/big_photo_18.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_19.jpg',
                'big'   : './img/storage_img/big_photo_19.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_20.jpg',
                'big'   : './img/storage_img/big_photo_20.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_21.jpg',
                'big'   : './img/storage_img/big_photo_21.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_22.jpg',
                'big'   : './img/storage_img/big_photo_22.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_23.jpg',
                'big'   : './img/storage_img/big_photo_23.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_24.jpg',
                'big'   : './img/storage_img/big_photo_24.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_25.jpg',
                'big'   : './img/storage_img/big_photo_25.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_26.jpg',
                'big'   : './img/storage_img/big_photo_26.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_27.jpg',
                'big'   : './img/storage_img/big_photo_27.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_28.jpg',
                'big'   : './img/storage_img/big_photo_28.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_29.jpg',
                'big'   : './img/storage_img/big_photo_29.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_30.jpg',
                'big'   : './img/storage_img/big_photo_30.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_31.jpg',
                'big'   : './img/storage_img/big_photo_31.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_32.jpg',
                'big'   : './img/storage_img/big_photo_32.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_33.jpg',
                'big'   : './img/storage_img/big_photo_33.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_34.jpg',
                'big'   : './img/storage_img/big_photo_34.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_35.jpg',
                'big'   : './img/storage_img/big_photo_35.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_36.jpg',
                'big'   : './img/storage_img/big_photo_36.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_37.jpg',
                'big'   : './img/storage_img/big_photo_37.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_38.jpg',
                'big'   : './img/storage_img/big_photo_38.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_39.jpg',
                'big'   : './img/storage_img/big_photo_39.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_40.jpg',
                'big'   : './img/storage_img/big_photo_40.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_41.jpg',
                'big'   : './img/storage_img/big_photo_41.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_42.jpg',
                'big'   : './img/storage_img/big_photo_42.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_43.jpg',
                'big'   : './img/storage_img/big_photo_43.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_44.jpg',
                'big'   : './img/storage_img/big_photo_44.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_45.jpg',
                'big'   : './img/storage_img/big_photo_45.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_46.jpg',
                'big'   : './img/storage_img/big_photo_46.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_47.jpg',
                'big'   : './img/storage_img/big_photo_47.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_48.jpg',
                'big'   : './img/storage_img/big_photo_48.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_49.jpg',
                'big'   : './img/storage_img/big_photo_49.jpg'
            },

            {
                'small' : './img/storage_img/small_photo_50.jpg',
                'big'   : './img/storage_img/big_photo_50.jpg'
            }
        ];

        return {

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

    exports.storage = storage;

})( window );