## directory structure
```
| /AURIN
      - Preprocessing AURIN data download from AURIN
  /scenarios.py
      - implement 5 scenarios and add the processed json to falsk ReSTful API
  /view_data.py
      - backend get data from database (MapReduce Here)
  /requirement.txt
      - install the environment need (e.g. flask)
  /AURIN_api
      - add AURIN json to falsk ReSTful API
  /backend.py
      - start the backend
  /ini.py
      - initialise some global variables

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
