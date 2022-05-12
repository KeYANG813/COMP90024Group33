## directory structure
```
| /AURIN
      - Preprocessing AURIN data download from AURIN
  /static 
      - design the web
  /templates
      - template of the frontend
  /test
      - unused codes
  /app.py
      - start the frontend
  /Dockerfile
      - configure dockerfile for backend
  /hashtag.py
      -  count the top 10 hashtags each cities and calculate the sentimentic score
  /language_analysis.py
      - count top 10 languages used in cities
  /requirements.txt
      - install the environment need (e.g. flask)
  /save_json_from_cloud_couchdb.py
      - save live tweets as json from couchdb 
  /total_tweets.py
      - count total tweets for each city
```


## How to run
### Ubuntu
1. ```cd backend```
2. ```python3 -m venv venv```
3. ```. venv/bin/activate```
4. ```pip install -r requirements.txt```
5. ```pip install flask```
6. ```pip install python-dotenv```
7. ```flask run```
