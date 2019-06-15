config-database:
	docker exec -i api_db sh -c 'exec mysql -uroot -ppass' < ./database/olxifres.sql

data-seed:
	docker exec -i api_db sh -c 'exec mysql -uroot -ppass olxifres' < ./database/olxifres_seed.sql 