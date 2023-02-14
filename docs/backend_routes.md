# API-Routes (backend routes)

This web app uses the following API routes to dynamically update the page to create a single-page-app-like feel for the user for specific features.

## Photos

- A logged in user may delete, edit or create their own Question, however every user can view all questions or a specific question, logged in or not.

  - `GET /api/photos/:id`
  - `GET /api/photos`
  - `POST /api/photos`
  - `PUT /api/photos/:id`
  - `DELETE /api/photos/:id`

## Comments

- A logged in user may delete, edit or create their own Comment to a Photo, however every user can view all comments of a specific photo, logged in or not.

  - `GET /api/comments`
  - `GET /api/comments/photos/:id`
  - `POST /api/comments/:id`
  - `PUT /api/comments/:id`
  - `DELETE /api/comments/:id`

## Reactions ('Like' an Answer)

- A logged in user may 'Like' switch between or completely undo their 'Like' from a photo using the icon which fetch data from an association attached to the photo_id and user_id.

- `GET /api/reactions/:id`
- `POST /api/reactions/:id/`


<!-- ## Bonus - Followers

- A logged in user can follow another user

  - `GET /api/followers/:id`
  - `POST /api/followers/:id`

<!-- ## Bonus - AWS

- Store photos with AWS

 
