# User Stories


## Users

### - Sign Up

- As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  - When I'm on the `/signup` page:
    - I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    - I would like the website to log me in upon successful completion of the sign-up form.
      - So that I can seamlessly access the site's functionality
  - When I enter invalid data on the sign-up form:
    - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    - So that I can try again without needing to refill forms I entered valid data into.

### - Log in

- As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  - When I'm on the `/login` page:
    - I would like to be able to enter my email and password on a clearly laid out form.
    - I would like the website to log me in upon successful completion of the log-in form.
      - So that I can seamlessly access the site's functionality
  - When I enter invalid data on the log-in form:
    - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      - So that I can try again without needing to refill forms I entered valid data into.

### - Demo User

- As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  - I can click on a Demo User button to log me in and allow me to access as a normal user.
    - So that I can test the site's features and functionality without needing to stop and enter credentials.

### - Log Out

- As a logged in user, I want to log-out via an easy to find log out button on the navigation bar.
  - While on any page of the site:
    - I can log out of my account and be redirected to a page displaying recent Questions.
      - So that I can easily log out to keep my information secure.
  
  
## Photos

### - Post Photos

  - As a logged in user, I want to be able to post new Photos.
    - When I am on the '/' page:
       - I can post a new Photo.
    
### - Viewing Photos

  - As a logged in or logged out user, I want to be able to view a selection of the most recent Photos.

    - When I am on the '/' page:
      - I can view all posted Photos.

### - Updating Photos

- As a logged in user, I want to be able to edit my Photo by clicking an Edit button associated with the Photo.
  - When I'm on the `/photos/:id` page:
    - I can click "Edit" to make permanent changes to Photo I have posted.
      - So that I can fix any errors I make in my Photo detail.

### - Deleting Photos

- As a logged in user, I want to be able to delete my Photo by clicking a Delete button associated with the Photo.
  - When I'm on the `/photos/:id` page:
    - I can click "Delete" to permanently delete a Photo that I have posted and all comments associated with this photo.
      - So that when I realize I shouldn't have publicly post a photo, I can easily remove it.
      
## Comments

### - Post Comments

- As a logged in user, I want to be able to post Comments to Photos.
  - When I'm on the `/photos/:id` page:
    - I can view all posted comment to the specific photo.

### - Edit Comment

- As a logged in user and the author of the comment, I am able to edit the comment by clicking on the "Edit" button associated with the Comment.

### - Delete Comment

- As a logged in user and the author of the comment, I am able to delete the comment by clicking on the "Delete" button associated with the Comment.


## Reactions

### - Post Reactions

- As a logged in user, I want to be able to post Reaction to Photos.
  - When I'm on the `/photos/:id` page:
    - I can view all posted reaction to the specific photo.

### - Delete Reactions

- As a logged in user and the author of the reaction, I am able to delete the reaction by clicking on the "Delete" button associated with the Reaction.


## Followers

### - Get Followers

- As a logged in user, I can get all the users that I am following.

### - Post Followers

- As a logged in user, I can follow / unfollow other users.


## Messages

### - Send messages to other users

- As a logged in user, I can chat with other logged in users using the "general chat".
