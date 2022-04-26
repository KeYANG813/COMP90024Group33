from collect_tweepy import run_spider
from save_data import process_and_save,couchdb_init
import time


if __name__ == '__main__':
    start_time = time.time()
    max_count = 4 
    count = 0
    while True:
        run_spider()
        client = couchdb_init()
        process_and_save(client)
        print("next round")
        if count >max_count:
            break
        count = count + 1
        pass