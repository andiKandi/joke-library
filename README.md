# Joke Library

This project is based on a homework assignment that creates a joke library. It uses jokes from https://jokeapi.dev/ as a starting point, but own jokes may be added. These jokes are 
transferred into a database and can be modified or deleted by the user: i.e. the user rates the funniness by adjusting a
"likes" counter.

## Functionalities

### Backend

- REST-API for creating (`POST`), fetching (`GET`), updating (`PUT`) and deleting (`DELETE`) jokes via `HTTP` connection.
- Routing for different queries (see [routing details](#Backend Usage)) 
- Initial jokes are fetched from an external joke API (https://jokeapi.dev/).
- Export of jokes as CSV file.

### Frontend

- GUI with query form for filtered fetching of jokes based on category, likes, language, SFW/NSFW setting.
- Number of jokes can be limited.
- Fetched jokes may be edited or deleted.
- Fetched jokes may be sorted based on their number of likes.
- Download of fetched jokes as CSV file.

## Used technologies

- Docker
- React
- Typescript
- Node.JS
- TypeORM
- Express.js

## Getting Started

Follow the instructions to set up the system.

### Prerequisites

- Docker and Node.JS must be installed.

### Installation with Docker

- Go to folder `frontend` and install all node dependencies:

```bash
npm install
```

-  Go to folder `backend` and install all node dependencies:

```bash
npm install
```

- Go back to root project folder and start Frontend | Backend | Database with docker:

```bash
docker-compose up -d # runs docker as background process. Use `docker-compose logs` to see the logs.
```

or use: 

```bash
docker-compose up # runs docker as foreground process that shows the logs.
```

### Initialize the database

With each setup the database needs to be initialized. For this it is neccessary to create the needed tables. Synchronize and migrate the database via:

```bash
docker-compose exec backend npm run typeorm schema:sync # creates database tables based on the entities in `backend/src/entity`
docker-compose exec backend npm run typeorm migration:run # here 100 jokes are fetched from an external api via GET "https://v2.jokeapi.dev/joke/Any" 
```

### Troubleshooting

Sometimes there are connectivity issues between the backend and the database. In this case try restarting the system: 

```bash
docker-compose restart
```

or first start the database and then when it's running start the backend | frontend

```bash
docker-compose up db
docker-compose up backend frontend
```


## Backend Usage

Now that the system is set up, these routes and resources may be querried (for this Postman is recommended):

### select methods via GET
```bash
http://localhost:4000/api/ # returns "message": "hello global api"
http://localhost:4000/api/joke # returns data array of all jokes like "data": [{"id": "01e2e0c6-42d3-4ffd-9b2d-3570519a1feb","name": "277_Misc", ...}]
http://localhost:4000/api/joke/01e2e0c6-42d3-4ffd-9b2d-3570519a1feb # returns one joke object with id:01e2e0c6-42d3-4ffd-9b2d-3570519a1feb or {"status": "not_found"}
http://localhost:4000/api/joke?type=lte&counter=4 # returns all jokes with counter lower or equal 4
http://localhost:4000/api/joke?type=gte&counter=4 # returns all jokes with counter greater or equal 4
http://localhost:4000/api/joke?category=Programming # returns all jokes with category:Programming. Other possible categories are: Christmas, Dark, Misc, Pun, Spooky
http://localhost:4000/api/joke?show=true # returns all jakos with show:true
http://localhost:4000/api/joke?show=false # returns all jakos with show:false
http://localhost:4000/api/joke?show=true&category=Programming&type=gte&counter=4 # returns all jokes that fit this combined query
```

### create methods via POST
Here the request body must be set, e.g.: 
`{
"name": "Test",
"description": "Funny joke",
"show": true,
"counter": 0,
"category": "Programming",
"language": "en"
}`. 

Only the `name` and `description` are mandatory.

```bash
http://localhost:4000/api/joke # posts joke to database and returns data array of created joke {"id": "3c4c810b-1d8d-46bb-abe1-539d5b3ce18f","name": "Test", ...}]
```

### delete methods via DELETE
```bash
http://localhost:4000/api/joke/3c4c810b-1d8d-46bb-abe1-539d5b3ce18f # returns {"data": "Joke deleted: Test"} or {"status": "not_found"}
```

### update methods via UPDATE
Here the request body is set with the new values, e.g.:
`{
"name": "Test",
"description": "Hilarious joke",
"show": true,
"counter": 120,
"category": "Programming",
"language": "en"
}`.
The fields `show`, `counter`, `category` and `language` are optional but `name` and `description` must be set.

```bash
http://localhost:4000/api/joke/3c4c810b-1d8d-46bb-abe1-539d5b3ce18f # returns {"id": "3c4c810b-1d8d-46bb-abe1-539d5b3ce18f","name": "Test", ...}] or {"status": "not_found"} 
```

### Export joke database as csv via GET
To export the requested jokes in csv format set the request header to:
`{
key: Accept 
Value: text/csv
}`

```bash
http://localhost:4000/api/joke/ # returns the requested jokes as csv in the response body.
```

## Frontend
The frontend runs on:

`http://localhost:3000/`

Hopefully the page is selfexplanatory, but here is the gist:

### Page overview

On initial page request, all jokes in the database are queried for. In the upper part, there is the query bar. By filling out the form, it is possible to set the following query parameters:
- joke category (the jokes are randomly chosen, but usually the categories include: "programming", "misc", "dark", "pun", "spooky", "Christmas")
- joke language (currently only "en" available).
- number of likes combined with the toggling option between greater/lower or equal than defined number.
- toggle between the option SFW and NSFW (correspnds to the objects `show` attribute)
- limit of jokes to be fetched.

The joke request is submitted by pressing funnel button.

The fetched joke list may be sorted by number of likes by pressing the button above the funnel button.
![Joke_Library_Request_explanation](https://code.fbi.h-da.de/istaskrau/fwe-ss-21-763930/uploads/f2f356a6b5d7dc0f77f04501107cb29d/Joke_Library_Request_explanation.png)

### How to create a joke

- New jokes may be added by pressing the plus button and filling out the "Add Joke" form. Though only name and description are necessary to create a joke on the backend side, for quality control all fields must be filled out to submit a joke.
- Minimum length of joke title is 3 and for description it's 10.

![Create_new_joke](https://code.fbi.h-da.de/istaskrau/fwe-ss-21-763930/uploads/5052cabd5338ba3cdd543c3eb2099e78/Create_new_joke.png)

### How to edit or delete a joke

- All jokes may be edited by clicking on them. This opens a form similar to the creation form but with an additional delete button. It deletes the joke permanently.  

![Edit_existing_joke](https://code.fbi.h-da.de/istaskrau/fwe-ss-21-763930/uploads/6b7dbe5b6ba77b10e4f57f65ab069998/Edit_existing_joke.png)

## Credits
- This homework is based on the given initial project by Daniel Schulz, Daniel Wohlfarth, Thomas Sauer. 
- Initial jokes in the database are copied from: `https://jokeapi.dev/`

## License
The project is licensed under GPL v.3 (gpl-3.0).
