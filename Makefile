build:
	rm -rf ./dist
	npx tsc

start: 
	npm run start

go:
	make build
	make start

test:
	npm run test