from cloudant.client import CouchDB
from cloudant.view import View
from cloudant.result import Result
import json
from collections import Counter

def couchdb_init():
    USERNAME = 'user'
    PASSWORD = 'pass'
    client = CouchDB(USERNAME, PASSWORD, url='http://172.26.132.223:5984', connect=True)
    return client

def count_hashtags():
    citys = {}
    dbname = ["db_melbourne", "db_sydney", "db_adelaide", "db_darwin", "db_brisbane"]
    client = couchdb_init()
    for city in dbname:
        city_hashtag = {}
        top_hashtags = []
        results = Result(client[city].all_docs, include_docs=True)
        for i in results:
            doc = i['doc']
            if "lang" in doc.keys():
                if doc['lang'] != "en":
                    continue
            else:
                continue
            if "entities" in doc.keys():
                entities = doc["entities"]
                if "hashtags" in entities.keys():
                    tag_list = entities["hashtags"]
                    if (tag_list != []):
                        for dic in tag_list:
                            if dic['text'] not in city_hashtag:
                                city_hashtag[dic['text']] = 1
                            else:
                                city_hashtag[dic['text']] += 1
        hashtag_sorted = dict(sorted(city_hashtag.items(), key=lambda item: item[1], reverse = True)[:10])
        for key in hashtag_sorted:
            format_dic = {}
            format_dic["name"] = key
            format_dic["value"] = hashtag_sorted[key]
            top_hashtags.append(format_dic)
        citys[city] = top_hashtags

    dict_change = {"db_melbourne": "melbourne","db_sydney": "sydney", "db_brisbane": "brisbane", "db_darwin": "darwin","db_adelaide": "adelaide"}
    for old, new in dict_change.items():
        citys[new] = citys.pop(old)
    
    return citys

print(count_hashtags())