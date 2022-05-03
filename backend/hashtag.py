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
    design_hashtag_doc= '''
    {
      "_id" : "_design/hash",
      "language": "javascript",
      "views" : {
        "count_hash":{
          "map": "function(doc){if (doc.lang) {
        
            if (doc.entities) {
                if (doc.entities.hashtags) {
                    if (doc.entities.hashtags.length > 0) {
                        for (var idx in doc.entities.hashtags) {
                            emit(doc.entities.hashtags[idx].text, 1);
                        }
                    }
                
                }
            }
        }
        }",  
          "reduce" : "_count"}
      }
    }
    '''
    client = couchdb_init()
    for city in dbname:
        citydb = client[city]
        hashtag_num = {}
        top_hashtags = []
        json_data = json.loads(design_hashtag_doc, strict=False)
        if not json_data['_id'] in citydb:
            citydb.create_document(json_data)

        create_view = View(citydb['_design/hash'], 'count_hash')
        with create_view.custom_result(group=True) as results:
            for result in results:
                hashtag_num[result['key']] = result['value']

            hashtag_sorted = dict(sorted(hashtag_num.items(), key=lambda item: item[1], reverse = True)[:10])
            
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