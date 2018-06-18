all: migrate run
migrate:
	rm -rf db.sqlite3
	rm -rf cat/migrations/
	rm -rf migrations/
	python3 manage.py makemigrations
	python3 manage.py migrate --run-syncdb
	python3 manage.py migrate
run:
	python3 manage.py runserver 0:8000
