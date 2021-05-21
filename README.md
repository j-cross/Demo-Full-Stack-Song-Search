1) docker build -t josh-cross-demo .
2) docker run -dp 3000:3000 josh-cross-demo

##cURL command##
###List All Tracks###
curl http://localhost:3000/tracks/

###Search Track Title###
curl http://localhost:3000/tracks/{query}
Replace {query} with your search term. You can try minor