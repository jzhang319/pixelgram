# Pixelgram

## Database schema - layout
![image](https://user-images.githubusercontent.com/99565823/224571125-28b60345-7aca-4f7c-b0f9-58f546673d92.png)

### This project uses the following technologies
### Frontend
* Javascript
* React
* Redux
* FontAwesome
* WebSocketIO
### Backend
* Python
* Flask
* SQLAlchemy
* Alembic
* SQLite3 (development)
* PostgreSQL (production)
* Flask-Socketio-client

# CRUD Features

## Users
Allows you to:
   - Log in
   - Sign up
   - Explore other users' photos
   - Use the DEMO USER login

## Photos
   - All users can view a sampling of the most recent photos.

As a non-logged in user you can:
   - Explore photos threads
   - View Comments and Reactions

As a logged in user you can:
   - Post photos with detail
   - Edit and Delete your own photos
   - Post Comments on other photos

## Comments
   - All users (logged in or no) can view a sampling of the most recent comments to photos.

A logged in user can:
   - Post comments to photos
   - Edit and delete their own comments

## Reactions
A logged in user can:
   - Up-vote and down-vote an answer
   - Remove their own reaction
   - Update their reaction

## Followers
A logged in user can:
   - Follow a specific user
   - Remove a specific user that he/she is following

## Messages
A logged in user can:
   - send messages to other users using the general chat

# Future Features

## This clone is a work in progress, these features will be available in the future...

- ## AWS
   - Store all photos using AWS
