package main

import (
	"fmt"
	"go_rest_api/src/api"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {

	/*
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}

		var port string = os.Getenv("PORT")
		fmt.Println(port)
	*/

	port := "3000"

	router := mux.NewRouter()
	apiRouter := router.PathPrefix("/api/").Subrouter()

	//todos Router
	apiRouter.HandleFunc("/golang/todos", api.GetTodos).Methods("GET")
	apiRouter.HandleFunc("/golang/todos", api.CreateTodo).Methods("POST")
	apiRouter.HandleFunc("/golang/todos/{id}", api.GetTodo).Methods("GET")
	apiRouter.HandleFunc("/golang/todos/{id}", api.DeleteTodo).Methods("POST")
	apiRouter.HandleFunc("/golang/todos/{id}", api.UpdateTodo).Methods("POST")

	//Content Router
	apiRouter.HandleFunc("/golang/ms-addContent", api.CreateContent).Methods("POST")
	apiRouter.HandleFunc("/golang/ms-contentlist", api.GetContents).Methods("GET")
	apiRouter.HandleFunc("/golang/ms-contentlist/{id}", api.GetContent).Methods("GET")
	apiRouter.HandleFunc("/golang/ms-deleteContent/{id}", api.DeleteContent).Methods("POST")
	apiRouter.HandleFunc("/golang/ms-updateContent/{id}", api.UpdateContent).Methods("POST")

	fmt.Printf("Server running at port %s", port)
	http.ListenAndServe(":"+port, router)
}
