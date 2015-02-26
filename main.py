import pygame
import time
import random
import collections

pygame.init()

FPS = 15

WINDOW_HEIGHT = 600
WINDOW_WIDTH = 800

BOX_HEIGHT = 10
BOX_WIDTH = 10

WINDOW_XBOX_CORNER = WINDOW_WIDTH - BOX_WIDTH
WINDOW_YBOX_CORNER = WINDOW_HEIGHT - BOX_HEIGHT

WHITE = (255, 255, 255)
BLACK = (  0,   0,   0)
RED   = (255,   0,   0)
GREEN = (  0, 255,   0)

UP = 0
RIGHT = 1
DOWN = 2
LEFT = 3

FONT = pygame.font.SysFont(None, 25)

pygame.display.set_caption('Slither')

clock = pygame.time.Clock()

gameDisplay = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))

Point = collections.namedtuple('Point', ['x', 'y'])

class Snail:
    def __init__(self, point, vector = RIGHT):
        self.body = [point]
        self.vectr = vector
        self.vector(vector)
        self.length = 1


    def vector(self, vector):

        if self.vectr == UP and vector == DOWN: return
        if self.vectr == DOWN and vector == UP: return
        if self.vectr == RIGHT and vector == LEFT: return
        if self.vectr == LEFT and vector == RIGHT: return

        self.vectr = vector

        if vector == UP:
            self.move_x = 0
            self.move_y = -BOX_WIDTH
        elif vector == RIGHT:
            self.move_x = BOX_HEIGHT
            self.move_y = 0
        elif vector == DOWN:
            self.move_x = 0
            self.move_y = BOX_WIDTH
        elif vector == LEFT:
            self.move_x = -BOX_HEIGHT
            self.move_y = 0

    def head(self):
        return self.body[-1]
            
    def draw(self):
        self.body.append(Point(
            self.head().x + self.move_x, 
            self.head().y + self.move_y
        ))

        if len(self.body) > self.length:
            self.body.pop(0)

        for x, y in self.body:
            pygame.draw.rect(
                gameDisplay, 
                BLACK,
                [x, y, BOX_HEIGHT, BOX_WIDTH]
            )

class Food():
    def __init__(self):
        self.regenerate()

    def regenerate(self):
        self.x = random.randrange(0, WINDOW_XBOX_CORNER/BOX_HEIGHT) * BOX_HEIGHT
        self.y = random.randrange(0, WINDOW_YBOX_CORNER/BOX_WIDTH) * BOX_WIDTH
    
    def draw(self):
        pygame.draw.rect(gameDisplay, RED, [self.x, self.y, BOX_HEIGHT, BOX_WIDTH])

def in_map(x, y):
    if x > 0 and x < WINDOW_XBOX_CORNER and y > 0 and y < WINDOW_YBOX_CORNER:
        return True
    return False
        

def print_message(msg, color = BLACK, background = WHITE):
    gameDisplay.fill(background)
    screen_text = FONT.render(msg, True, color)
    gameDisplay.blit(screen_text, [WINDOW_WIDTH/2, WINDOW_HEIGHT/2])
    pygame.display.update()

def menu():
    print_message("S - to start game, Q - to quit")

    while True:

        for event in pygame.event.get():
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_q: return
                if event.key == pygame.K_s:
                    play()
                    print_message("S - to start game, Q - to quit")

def play():

    snail = Snail(Point(WINDOW_WIDTH/2, WINDOW_WIDTH/2))
    food = Food()

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT: return
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT: snail.vector(LEFT)
                if event.key == pygame.K_RIGHT: snail.vector(RIGHT)
                if event.key == pygame.K_UP: snail.vector(UP)
                if event.key == pygame.K_DOWN: snail.vector(DOWN)

        if snail.head().x == food.x and snail.head().y == food.y:
            snail.length += 1
            food.regenerate()

        gameDisplay.fill(WHITE)
        snail.draw()
        food.draw()
        pygame.display.update()
    
        clock.tick(FPS)

def quit():
    pygame.quit()

menu()
