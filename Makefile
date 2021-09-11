#!make
# Specify a shell
SHELL := /bin/bash

# Create the .env file if it does not exist
ifeq (,$(wildcard .env))
   $(shell cp .env.dist .env)
endif
# Get the environment variables
include .env

# Create the .env file if it does not exist
ifeq (,$(wildcard docker-compose.override.yml))
   $(shell cp docker-compose.override.yml.dist docker-compose.override.yml)
endif

# Color strings
GREY = /bin/echo -e "\x1b[30m$(1)\x1b[0m"
RED = /bin/echo -e "\x1b[31m$(1)\x1b[0m"
GREEN = /bin/echo -e "\x1b[32m$(1)\x1b[0m"
YELLOW = /bin/echo -e "\x1b[33m$1\x1b[0m"
BLUE = /bin/echo -e "\x1b[34m$(1)\x1b[0m"
PURPLE = /bin/echo -e "\x1b[35m$(1)\x1b[0m"
CYAN = /bin/echo -e "\x1b[36m$(1)\x1b[0m"
WHITE = /bin/echo -e "\x1b[37m$(1)\x1b[0m"

# Some files
ENV_FILE_EXISTS := $(or $(and $(wildcard .env),1),0)
DOCKER_OVERRIDE_FILE_EXISTS := $(or $(and $(wildcard docker-compose.override.yml),1),0)

# Project version string
PROJECT_VERSION_STRING = Project: $(PROJECT), version $(PROJECT_VERSION)

# Commands and information
info: commands
	@echo "------------------------------"
	@$(call YELLOW, "How to use commands:")
	@echo "------------------------------"
	@$(call YELLOW, "First install ?")
	@echo "     - build: build (re-build) the Docker images and containers"
	@echo "     - clean: remove Docker containers and images"
	@echo "     - clean-yarn-cache: clean the Yarn cache"
	@echo "     ---"
	@$(call YELLOW, "Start / stop project services ?")
	@echo "     - up: start the project services in console mode"
	@echo "     - up-detach: start the project services in daemon mode"
	@echo "     - down: stop the project services"
	@echo "     ---"
	@$(call YELLOW, "Some more advanced tricks ")
	@echo "     - vue-ui: start the vue-ui listening on the 9081/tcp port"
	@echo "     - ssh: open a bash shell in the running container"


# --------------------
commands: banner
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/' | column -c2 -t -s :)"


# --------------------
banner: ## The project information string (project name and version)
	@$(call CYAN, "------------------------------------------------------------")
	@$(call CYAN, $(PROJECT_VERSION_STRING))
	@$(call CYAN, "------------------------------------------------------------")


clean: ## Remove project Docker containers, images, network, volume
	docker rm ${CONTAINER_NAME}
	docker rmi ${IMAGE_NAME}


clean-yarn-cache: ## Clean Yarn global cache
	docker exec -t -i ${CONTAINER_NAME} yarn cache clean


build: ## (Re-)build Docker images and containers with Docker compose
	docker-compose -f docker-compose.yml build


up: ## Start project services in console attached mode
	docker-compose -f docker-compose.yml -f docker-compose.override.yml up
up-detach: ## Start project services in daemon mode
	docker-compose -f docker-compose.yml -f docker-compose.override.yml up --detach

logs: ## View Docker containers log (if started in daemon mode)
	docker-compose -f docker-compose.yml -f docker-compose.override.yml logs
down: ## Stop Docker containers (if started in daemon mode)
	docker-compose -f docker-compose.yml -f docker-compose.override.yml down


serve: ## Start serving the application (default Docker command)
	docker exec ${CONTAINER_NAME} yarn serve

lint: ## Lint the source code
	docker exec ${CONTAINER_NAME} yarn lint

unit-tests: ## Run the unit tests
	docker exec ${CONTAINER_NAME} yarn test:unit


prod: ## Build the production app
	docker exec ${CONTAINER_NAME} yarn build


ssh: ## Access Docker container terminal.
	docker exec -t -i ${CONTAINER_NAME} bash
root: ## Access Docker container terminal as root user.
	docker exec -u root -t -i ${CONTAINER_NAME} bash


vue-ui: ## Access Docker container terminal.
	docker exec ${CONTAINER_NAME} yarn vue-ui


stop: ## Stop/start Docker container
	docker stop ${CONTAINER_NAME}
start: ## Stop/start Docker container
	docker start ${CONTAINER_NAME}

.PHONY: banner info help clean clean-yarn-cache build up up-detach down logs serve start stop ssh vue-ui