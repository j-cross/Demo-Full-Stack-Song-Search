# Josh Cross' Song Search

Thanks for checking out my song search app! You won't believe what it can do!

## Getting Started
1. Build the Docker image
`docker build -t josh-cross-demo .`
2. Run the Docker image
`docker run -dp 3000:3000 josh-cross-demo`

## Run the app
1. Follow the Getting Started steps
2. Open your browser (Firefox suggested)
3. Navigate to http://localhost:3000

## cURL commands
### List All Tracks
`curl http://localhost:3000/tracks/`

### Search Song Title
`curl http://localhost:3000/tracks/your-query`
*Replace 'your-query' with your search term. You can try 'minor'*