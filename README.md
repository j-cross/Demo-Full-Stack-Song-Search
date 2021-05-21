## Getting Started
1 Build the Docker image
`docker build -t josh-cross-demo .`
2 Run the Docker image
`docker run -dp 3000:3000 josh-cross-demo`

## cURL commands
### List All Tracks
`curl http://localhost:3000/tracks/`

### Search Song Title
`curl http://localhost:3000/tracks/{query}`
*Replace {query} with your search term. You can try minor*