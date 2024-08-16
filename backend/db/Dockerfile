FROM postgres
# This is the image we'll use as the base

ENV POSTGRES_PASSWORD password
# This is the password we'll define for the Docker Postgres instance

ENV POSTGRES_DB budget_capstone_app
# This is what we'll name the database inside the container

COPY capstone.sql /docker-entrypoint-initdb.d/
# Copy the todo.sql file to the listed path in the container