# Checks a correr antes de mergear develop -> main / antes de un deploy.
# En Windows: usa `python manage.py ...` (no `.\manage.py`), ver docs/technical/deployment.md.
# Requiere el venv activado, o reemplaza "python" por ".venv/Scripts/python.exe".

.PHONY: pre-deploy check collectstatic migrate-check typecheck lint test

pre-deploy: check collectstatic migrate-check typecheck lint test
	@echo "pre-deploy: todo OK"

check:
	python manage.py check --deploy

collectstatic:
	python manage.py collectstatic --noinput --dry-run

migrate-check:
	python manage.py migrate --check

typecheck:
	python -m pyright

lint:
	python -m ruff check .

test:
	python manage.py test
