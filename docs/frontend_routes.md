# User-facing routes (frontend routes)

## `/login`

### Log in page

This page displays a log in form

  - `GET /login`
  - `POST /login`

## `/signup`

This page displays a signup form.

### Sign up page

  - `GET /signup`
  - `POST /signup`

## `/`

Homepage

This page displays the Photos, as well as a navigation bar with login/signup or logout buttons.
Logged in users get navigation bar access to a "Make a Post" button that displays a form with which the user can use to craft a new Photo post.

Each photo has an update and delete button _if it belongs to the currently logged in user_.

  - `GET /`
  - `POST /photos`


## `/photos/:id`

This page displays individual photo with associated comments and reactions, as well as a navigation bar with login/signup or logout buttons. If the logged in user owns the photo, this page also displays an update and delete button. Logged in users can 'Like' the photo on this page. The logged in owners of those comments can update or delete them.

--Photos--
  - `GET /photos/:id`
  - `PUT /photos/:id`
  - `DELETE /photos/:id`

## `/comments/:id`

This page displays comments with associated photos, as well as a navigation bar with login/signup or logout buttons. If the logged in user owns the comment, this page also displays an update and delete button.

--Comments--
  - `GET /comments/photos/:id`
  - `POST /comments/photos/:id`
  - `PUT /comments/:id`
  - `DELETE /comments/:id`

--Reactions--
  - `GET /reactions/:id`
  - `POST /reactions/:id`


## `/explore`

### - Explore Page

      - A logged in user can explore other users that they have not yet follow for new contents added to their homepage      
      
