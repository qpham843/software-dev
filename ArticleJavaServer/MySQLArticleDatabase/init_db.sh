#!/bin/bash
# Set this script as the start command for an ECS Task to initialize an AWS RDS MySQL database.
cat <<EOF >/root/.my.cnf
[mysql]
user = ${MYSQL_ROOT_USER}
password = ${MYSQL_ROOT_PASSWORD}
EOF
chmod 0600 /root/.my.cnf
echo "Initializing database '${MYSQL_DATABASE}' on host '${MYSQL_HOST}' with a-users.sql"
mysql -h ${MYSQL_HOST} ${MYSQL_DATABASE} < /docker-entrypoint-initdb.d/a-users.sql
echo "Initializing database '${MYSQL_DATABASE}' on host '${MYSQL_HOST}' with publiceditor-database-dump.sql"
mysql -h ${MYSQL_HOST} ${MYSQL_DATABASE} < /docker-entrypoint-initdb.d/publiceditor-database-dump.sql
echo "Initialization of database '${MYSQL_DATABASE}' on host '${MYSQL_HOST}' complete."
