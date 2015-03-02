(function ( $ ) {
    var UP = 0;
    var LEFT = 1;
    var DOWN = 2;
    var RIGHT = 3;
    
    var K_UP = 38;
    var K_RIGHT = 39;
    var K_DOWN = 40;
    var K_LEFT = 37;

    $.fn.snakeGame = function(options) {

        act_size = 10
        var settings = $.extend({
            FPS : 30,
            actor : {size : act_size},
            move : {len : act_size},
            snake : {
                color : '#FFFFFF',
                start : {
                    x : 0,
                    y : 0,
                },
                len : 1,
                grow : 1,
            },
            food : {color : '#FF0000'},
            background : '#000000',
            scene : {
                height : 512,
                width : 1024,
            }
        }, options);

        this.attr('tabindex', '0');

        this.css({
            'background' : settings.background,
            'height' : settings.scene.height + 'px',
            'width' : settings.scene.width + 'px',
            'position' : 'relative',
        })

        function rand(dimension) {
            len = settings.move.len;
            return Math.round(Math.random() * dimension/len) * len;
        }

        function Element() {
            element = $('<div></div>');
            element.css({
                'position' : 'absolute',
                'height' : settings.actor.size,
                'width' : settings.actor.size,
                'top' : '0px',
                'left' : '0px',
            })
            $.extend(element,{
                x : 0,
                y : 0,
                update : function(x, y) {
                    this.x = x || this.x;
                    this.y = y || this.y;
                    this.css({
                        top : this.x + 'px',
                        left : this.y + 'px',
                    })
                }
            })
            return element
        }
        
        function Food() {
            element = Element();
            element.css('background', settings.food.color);
            element.extend(element,{
                regenerate : function() {
                    this.x = rand(settings.scene.height);
                    this.y = rand(settings.scene.width);
                    console.log("Regenerating food possition" + this.x + ", " + this.y);
                    this.update()
                }
            })
            return element;
        }
        
        function SnakeBlock(x, y) {
            element = Element();
            element.css('background', settings.snake.color);
            element.update(x, y);
            return element;
        }

        function Snake(scene) {
            return {
                y : settings.snake.start.x,
                x : settings.snake.start.y,
                body : [SnakeBlock()],
                len : settings.snake.len,
                scene : scene,
                vector : RIGHT,
                move : function() {
                    switch(this.vector) {
                        case UP: this.x -= settings.move.len; break;
                        case RIGHT: this.y += settings.move.len; break;
                        case DOWN: this.x += settings.move.len; break;
                        case LEFT: this.y -= settings.move.len; break;
                    }
                    this.body.push(SnakeBlock(this.x, this.y));
                    if(this.body.length > this.len) this.body.shift().remove();
                    this.scene.append(this.body[this.body.length-1]);
                }
            }
        }

        this.append(snake = Snake(this), food = Food());
        food.regenerate()
        setInterval(function(){
            snake.move()
            if(snake.x == food.x && snake.y == food.y) {
                console.log("Colision food");
                snake.len += settings.snake.grow;
                food.regenerate();
            }
        }, (1/settings.FPS)*1000);

        this.keydown(function(event) {
            switch(event.which) {
                case K_UP: snake.vector = UP; break;
                case K_RIGHT: snake.vector = RIGHT; break;
                case K_DOWN: snake.vector = DOWN; break;
                case K_LEFT: snake.vector = LEFT; break;
            }
            event.preventDefault()
        })
    }

}( jQuery ));

