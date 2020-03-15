#!/bin/bash
cd /home/hostdir
cat << EOF > .my.cnf
[client]
user=root
password=${MYSQL_ROOT_PASSWORD}
EOF
cat MySQLArticleDatabase/publiceditor-database-dump.sql | mysql --defaults-file=/home/hostdir/.my.cnf -h localhost
