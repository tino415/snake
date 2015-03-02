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

        act_size = options.actor_size || 20;
        var settings = {
            FPS : 15,
            actor_size : act_size,
            move_len : act_size,
            snake_color : '#FFFFFF',
            snake_start_x : 0,
            snake_start_y : 0,
            snake_len : 1,
            snake_grow : 2,
            food_color : '#FF0000',
            background : '#000000',
            scene_height : 512,
            scene_width : 1024,
        };

        scene_hmax = settings.scene_height - settings.actor_size;
        scene_wmax = settings.scene_width - settings.actor_size;

        this.attr('tabindex', '0');

        this.css({
            'background' : settings.background,
            'height' : settings.scene_height + 'px',
            'width' : settings.scene_width + 'px',
            'position' : 'relative',
        })

        function rand(dimension) {
            len = settings.move_len;
            return Math.round(Math.random() * dimension/len) * len;
        }

        function Element() {
            element = $('<div></div>');
            element.css({
                'position' : 'absolute',
                'height' : settings.actor_size,
                'width' : settings.actor_size,
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
            element.css('background', settings.food_color);
            element.extend(element,{
                regenerate : function() {
                    this.x = rand(scene_hmax);
                    this.y = rand(scene_wmax);
                    this.update()
                }
            })
            return element;
        }
        
        function SnakeBlock(x, y) {
            element = Element();
            element.css('background', settings.snake_color);
            element.update(x, y);
            return element;
        }

        function Snake(scene) {
            return {
                y : settings.snake_start_x,
                x : settings.snake_start_y,
                body : [SnakeBlock()],
                len : settings.snake_len,
                scene : scene,
                vector : RIGHT,
                move : function() {
                    switch(this.vector) {
                        case UP: this.x -= settings.move_len; break;
                        case RIGHT: this.y += settings.move_len; break;
                        case DOWN: this.x += settings.move_len; break;
                        case LEFT: this.y -= settings.move_len; break;
                    }
                    console.log(this.colide(this.x, this.y));
                    if(this.colide(this.x, this.y)) {
                        console.log("Snake collided it self");
                        return false;
                    }
                    this.body.push(SnakeBlock(this.x, this.y));
                    if(this.body.length > this.len) this.body.shift().remove();
                    this.scene.append(this.body[this.body.length-1]);
                    return true;
                },
                colide : function(x, y) {
                    for(i=0; i<this.body.length; i++) {
                        if(this.body[i].x == x && this.body[i].y == y) {
                            console.log("Colision detected");
                            return true;
                        }
                    };
                    return false;
                }
            }
        }

        this.append(snake = Snake(this), food = Food());
        food.regenerate()
        gameLoop = setInterval(function(){
            if(!snake.move()) clearInterval(gameLoop);
            if(snake.x == food.x && snake.y == food.y) {
                snake.len += settings.snake_grow;
                food.regenerate();
            }
        }, (1/settings.FPS)*1000);

        this.keydown(function(event) {
            switch(event.which) {
                case K_UP:
                    if(snake.vector != DOWN) snake.vector = UP;
                    break;
                case K_RIGHT:
                    if(snake.vector != LEFT) snake.vector = RIGHT;
                    break;
                case K_DOWN:
                    if(snake.vector != UP) snake.vector = DOWN;
                    break;
                case K_LEFT:
                    if(snake.vector != RIGHT) snake.vector = LEFT;
                    break;
            }
            event.preventDefault()
        })
    }

}( jQuery ));

