( function(){

    $(function () {

        $('.menu').each( function() {
            new Menu( $(this) );
        } );

    });

    var Menu = function(obj) {

        //private properties
        var _obj = obj,
            _btn = _obj.find( '.menu__btn' ),
            _item = _obj.find( '.menu__item' ),
            _wrap = _obj.find( '.menu__wrap' ),
            _scrollConteiner = $( 'html' );

        //private methods
        var _addEvents = function() {

                _btn.on({
                    'click': function() {

                        if ( !_obj.hasClass( 'active' ) ) {
                            _showMenu();
                        } else {
                            _hideMenu();
                        }
                    }
                });

                _item.on({
                    'click': function() {
                        event.preventDefault();
                        var elem = $( this ),
                            id = elem.attr( 'href' ),
                            way = $( id ).offset().top - $( '.site__header' ).outerHeight() + 1,
                            duration = 1000,
                            scrollWrap = $( 'body, html' );

                        if ( !elem.hasClass( 'active' ) ) {
                            scrollWrap.animate( { scrollTop: way }, duration );

                            setTimeout( function () {
                                scrollWrap.animate( { scrollTop: way - 1 }, 1 );
                            }, duration );

                            _item.removeClass( 'active' );
                            elem.addClass( 'active' );
                            _hideMenu();
                        }

                    }
                });

            },
            _getScrollWidth = function (){
                var scrollDiv = document.createElement( 'div'),
                    scrollBarWidth;

                scrollDiv.className = 'scrollbar-measure';

                document.body.appendChild( scrollDiv );

                scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

                document.body.removeChild(scrollDiv);

                return scrollBarWidth;
            },
            _showMenu = function() {
                _obj.addClass( 'active' );
                _scrollConteiner.css( {
                    overflowY: 'hidden',
                    paddingRight: _getScrollWidth()
                } );
            },
            _hideMenu = function() {
                _obj.removeClass( 'active' );
                _wrap.css( {
                    overflowY: 'hidden'
                } );
                _scrollConteiner.css( {
                    overflowY: 'auto',
                    paddingRight: 0
                } );
            },
            _init = function() {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

} )();