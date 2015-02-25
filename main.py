import pygame
import time
import random

pygame.init()

FPS = 30

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

FONT = pygame.font.SysFont(None, 25)

pygame.display.set_caption('Slither')

clock = pygame.time.Clock()

gameDisplay = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))

def print_message(msg, color):
    screen_text = FONT.render(msg, True, color)
    gameDisplay.blit(screen_text, [WINDOW_WIDTH/2, WINDOW_HEIGHT/2])
    pygame.display.update()

def play():

    box_x = WINDOW_WIDTH/2
    box_y = WINDOW_HEIGHT/2
    box_move_x = 0
    box_move_y = 0
    foot_x = random.randrange(0, WINDOW_XBOX_CORNER/BOX_HEIGHT) * BOX_HEIGHT
    foot_y = random.randrange(0, WINDOW_YBOX_CORNER/BOX_WIDTH) * BOX_WIDTH

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT: return
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    box_move_x = -BOX_WIDTH
                    box_move_y = 0
                if event.key == pygame.K_RIGHT:
                    box_move_x = BOX_WIDTH
                    box_move_y = 0
                if event.key == pygame.K_UP:
                    box_move_y = -BOX_HEIGHT
                    box_move_x = 0
                if event.key == pygame.K_DOWN:
                    box_move_y = BOX_HEIGHT
                    box_move_x = 0
            elif event.type == pygame.KEYUP:
                if event.key in [pygame.K_LEFT, pygame.K_RIGHT]:
                    box_move_x = 0
                elif event.key in [pygame.K_UP, pygame.K_DOWN]:
                    box_move_y = 0
    
        box_x += box_move_x
        box_y += box_move_y
    
        if not box_x in range(0, WINDOW_XBOX_CORNER): 
            print_message("You lose", RED)
            time.sleep(1)
            return
        if not box_y in range(0, WINDOW_YBOX_CORNER):
            print_message("You lose", RED)
            time.sleep(1)
            return

        if box_x == foot_x and box_y == foot_y:
            foot_x = random.randrange(0, WINDOW_XBOX_CORNER/BOX_HEIGHT) * BOX_HEIGHT
            foot_y = random.randrange(0, WINDOW_YBOX_CORNER/BOX_WIDTH) * BOX_WIDTH

        gameDisplay.fill(WHITE)
        pygame.draw.rect(gameDisplay, RED, [foot_x, foot_y, BOX_HEIGHT, BOX_WIDTH])
        pygame.draw.rect(gameDisplay, GREEN, [box_x, box_y, BOX_HEIGHT, BOX_WIDTH])
        pygame.display.update()
    
        clock.tick(FPS)

play()

pygame.quit()
quit()
