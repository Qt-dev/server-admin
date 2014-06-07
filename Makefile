REPORTER ?= spec

test:
	@./node_modules/.bin/mocha --reporter $(REPORTER) --recursive
 
.PHONY: test