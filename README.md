# Battleship

A browser-based implementation of the classic Battleship game built with JavaScript, HTML, and CSS.

This project was completed as an exercise in state management, modular architecture, and separation of concerns.

---

## Purpose

The primary goal of this project was to practice:

- Managing application state in a turn-based system
- Structuring logic separately from UI rendering
- Using factory functions to encapsulate behavior
- Handling game flow transitions (placement → attack → win)
- Keeping DOM manipulation isolated from core game logic

---

## Features

- Manual ship placement with rotation
- Turn-based attack system
- Computer opponent with random targeting
- Win detection and winner display
- New Game reset functionality
- Clean, centered fixed-layout UI

---

## Architecture

The project is structured to clearly separate responsibilities:

- `logic.js` — Contains all game state and core mechanics  
- `index.js` — Handles DOM updates and user interaction  
- `styles.css` — Layout and visual styling  

Game state is controlled entirely within the game factory, while the UI layer only reacts to state changes.

---
