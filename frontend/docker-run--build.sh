#!/usr/bin/env bash
docker-compose --env-file .docker.env up --build --remove-orphans
