package database

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

func GetConnection() *sql.DB {
	//connStr := "postgres://postgres:park0070!@localhost/postgres?sslmode=disable"
	connStr := "host=postgres user=postgres password=park0070! dbname=postgres sslmode=disable"
	//connStr := "host=localhost port=5432 user=postgres password=park0070! dbname=postgres sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	return db
}
