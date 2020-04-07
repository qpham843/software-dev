#!/bin/bash
# Set this script as the start command for an ECS Task to initialize an AWS RDS MySQL database.
set -e
cat <<EOF >my.cnf
[mysql]
user = ${MYSQL_ROOT_USER}
password = ${MYSQL_ROOT_PASSWORD}
EOF
chmod 0600 my.cnf
echo "Initializing database '${MYSQL_DATABASE}' on host '${MYSQL_HOST}' with a-users.sql"
mysql --defaults-extra-file=my.cnf -h ${MYSQL_HOST} ${MYSQL_DATABASE} < /docker-entrypoint-initdb.d/a-users.sql
echo "Initializing database '${MYSQL_DATABASE}' on host '${MYSQL_HOST}' with publiceditor-database-dump.sql"
mysql --defaults-extra-file=my.cnf -h ${MYSQL_HOST} ${MYSQL_DATABASE} < /docker-entrypoint-initdb.d/publiceditor-database-dump.sql
echo "Initialization of database '${MYSQL_DATABASE}' on host '${MYSQL_HOST}' complete."
