# Pixelgram

This web app inspired by Instagram built with Python, Flask, SQL-alchemy, Alembic, SQLite3 (development), PostgreSQL (production), Javascript, React, Redux and FontAwesome


## SCHEMA for this project
![Screenshot 2024-09-18 at 5 14 28 PM](https://github.com/user-attachments/assets/82af1667-c55b-486a-adce-7aa47a1d77c0)


## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.
