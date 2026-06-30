.PHONY: build-node clear build-docker test-docker help

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
NC := \033[0m # No Color

help:
	@echo "$(BLUE)Age Viewer Makefile Commands$(NC)"
	@echo ""
	@echo "$(GREEN)build-node$(NC)       - Build Node.js frontend and backend"
	@echo "$(GREEN)clear$(NC)            - Clean up build artifacts, node_modules, and containers"
	@echo "$(GREEN)build-docker$(NC)     - Build Docker image"
	@echo "$(GREEN)test-docker$(NC)      - Build and run Docker container for testing"
	@echo "$(GREEN)help$(NC)             - Show this help message"

build-node:
	@echo "$(YELLOW)Building Node.js projects...$(NC)"
	npm run build-front
	npm run build-back
	@echo "$(GREEN)✅ Node.js build complete$(NC)"

clear:
	@echo "$(YELLOW)Cleaning up...$(NC)"
	rm -rf frontend/build
	rm -rf backend/build
	rm -rf frontend/node_modules
	rm -rf backend/node_modules
	find . -type d -name ".next" -exec rm -rf {} + 2>/dev/null || true
	@echo "$(GREEN)✅ Cleanup complete$(NC)"

build-docker:
	@echo "$(YELLOW)Building Docker image...$(NC)"
	docker build -t age-viewer:latest .
	@echo "$(GREEN)✅ Docker image built: age-viewer:latest$(NC)"
	@echo ""
	@echo "$(BLUE)Image details:$(NC)"
	docker images age-viewer:latest

test-docker: build-docker
	@echo "$(YELLOW)Starting Docker container...$(NC)"
	docker run -it --rm \
		-p 3000:3000 \
		-p 3001:3001 \
		--name age-viewer-test \
		age-viewer:latest
	@echo "$(GREEN)Container stopped$(NC)"

clean-containers:
	@echo "$(YELLOW)Removing age-viewer containers...$(NC)"
	docker ps -a | grep age-viewer | awk '{print $$1}' | xargs docker rm -f 2>/dev/null || true
	@echo "$(GREEN)✅ Containers cleaned$(NC)"

clean-images:
	@echo "$(YELLOW)Removing age-viewer images...$(NC)"
	docker images | grep age-viewer | awk '{print $$3}' | xargs docker rmi -f 2>/dev/null || true
	@echo "$(GREEN)✅ Images cleaned$(NC)"
