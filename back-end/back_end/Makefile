migrate:
	rm -rf db.sqlite3
	rm -rf cat/migrations/
	python manage.py makemigrations cat
	python manage.py migrate
