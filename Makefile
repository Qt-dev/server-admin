REPORTER ?= spec

test:
	@./node_modules/.bin/mocha \
		--recursive \
		--reporter $(REPORTER)

.PHONY: test