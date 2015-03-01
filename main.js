var BLACK = '#000000';
var WHITE = '#FFFFFF';
var RED = '#FF0000';
var P_SIZE = '15px';
var CANVAS_HEIGHT = '512';
var CANVAS_WIDTH = '1024';
var UP = 0;
var LEFT = 1;
var DOWN = 2;
var RIGHT = 3;

var K_UP = 38;
var K_RIGHT = 39;
var K_DOWN = 40;
var K_LEFT = 37;

(function ( $ ) {

    $.fn.snakeGame = function() {

        this.addRect  = function(x, y, x_size, y_size, color) {
            element = $('<div></div>')
            element.css({
                'position' : 'relative',
                'top' : x + 'px',
                'left' : y + 'px',
                'background' : color,
                'height' : x_size,
                'width' : y_size,
            })
            this.append(element);
            return element;
        }

        this.attr('tabindex', '0');
        this.css({
            'background' : BLACK,
            'height' : CANVAS_HEIGHT + 'px',
            'width' : CANVAS_WIDTH + 'px',
        })
        food = Food(this.addRect(20, 20, 10, 10, RED))
        snake = Snake(this.addRect(20, 20, 10, 10, WHITE), food)
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

function Food(element) {
    element.setX = function(x) { this.css('top', x + 'px'); }
    element.getX = function() { return parseFloat(this.css('top')); }
    element.setY = function(y) { this.css('left', y + 'px'); }
    element.getY = function() { return parseFloat(this.css('left')); }
}

function Snake(element, food) {
    element.food = food
    console.lof("asdafda")
    element.setX = function(x) { this.css('top', x + 'px'); }
    element.getX = function() { return parseFloat(this.css('top')); }
    element.setY = function(y) { this.css('left', y + 'px'); }
    element.getY = function() { return parseFloat(this.css('left')); }
    element.vector = RIGHT;
    element.move = function() {
        if(this.food.getX() == this.getX() && this.food.getY() == this.getY()) {
            food.setX((Math.random() * CANVAS_HEIGHT/P_SIZE) * P_SIZE);
            food.getY((Math.random() * CANVAS_HEIGHT/P_SIZE) * P_SIZE);
        }
        switch(this.vector) {
            case UP: this.setX(this.getX() - 10); break;
            case RIGHT: this.setY(this.getY() + 10); break;
            case DOWN: this.setX(this.getX() + 10); break;
            case LEFT: this.setY(this.getY() - 10); break;
        }
    }
    setInterval(function(){element.move()}, 512);
    return element;
}
