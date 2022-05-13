# 2022 COMP90024 Group 33 

# Team members:

# Ke Yang (Student ID: 1219623) - city: Anhui

# Yimeng Liu (Student ID: 1074206) - city: Guangdong

# Jintong Liu (Student ID: 1074498) - city: Hebei

# Keang Xu (Student ID: 1008807) - city: Hubei

# Xinwei Qian (Student ID: 1068271) - city: Jiangsu


from distutils import text_file
from cloudant.client import CouchDB
from cloudant.view import View
from cloudant.result import Result
import json
import nltk
nltk.download('vader_lexicon')
from nltk.sentiment import SentimentIntensityAnalyzer
import re
import os


def textProcess(text):
    text = re.sub(r'(https|http)?:\/\/(\w|\.|\/|\?|\=|\&|\%)*\b', " ", text)  # remove URL
    text = text.lower() # lowercase the text
#         text = re.sub(r'@[^ ]+', ' ', text) # replace mention
    # text = re.sub(r'#', '', text) # remove hashtag
    text = re.sub(r'([a-z])\1{2,}', r'\1', text) # character normalization
    text = re.sub(r'[^a-z#@0-9 ]', ' ', text) # remove non-letter characters
    text = text.strip()
    return text

def couchdb_init():
    USERNAME = 'user'
    PASSWORD = 'pass'
    client = CouchDB(USERNAME, PASSWORD, url='http://172.26.132.223:5984', connect=True)
    return client

def calculate_city_score(text):
    text = textProcess(text)
    sia = SentimentIntensityAnalyzer()
    score = sia.polarity_scores(text)
    return score

def tweet_analysis():
    # count hashtags
    citys = {}
    dbname = ["db_melbourne", "db_sydney", "db_adelaide", "db_darwin", "db_brisbane"]
    design_hashtag_doc= '''
    {
        "_id" : "_design/text",
        "language": "javascript",
        "views" : {
          "new_view" : {
            "map": "function(doc){emit(doc.text)}",  
            "reduce" : "_count"}
        }
    }
    '''
    client = couchdb_init()

    allCityResults = {}
    nums = []
    for city in dbname:
        citydb = client[city]
        json_data = json.loads(design_hashtag_doc, strict=False)
        client = couchdb_init()
        
        text_dic = {}
        compound_score = []
        neg_score = []
        neu_score = []
        pos_score = []
    
        if not json_data['_id'] in citydb:
            citydb.create_document(json_data)

        create_view = View(citydb['_design/text'], 'new_view')

        with create_view.custom_result(group=True) as results:
            index = 0
            for result in results:
                text_dic[index]= result['key']
                index += 1

        nums.append(index)
                
        c_score_sum = 0
        neg_score_sum = 0
        neu_score_sum = 0
        pos_score_sum = 0
        
        sia = SentimentIntensityAnalyzer()
        for content in text_dic.values():
            text = textProcess(content)
            score_all_dict = sia.polarity_scores(text)
            c_score_sum = c_score_sum + score_all_dict['compound']
            neg_score_sum = neg_score_sum + score_all_dict['neg']
            neu_score_sum = neu_score_sum + score_all_dict['neu']
            pos_score_sum = pos_score_sum + score_all_dict['pos']

        ave_compound_score = c_score_sum/len(text_dic.values())
        compound_score.append(ave_compound_score)
        ave_neg_score = neg_score_sum/len(text_dic.values())
        neg_score.append(ave_neg_score)
        ave_neu_score = neu_score_sum/len(text_dic.values())
        neu_score.append(ave_neu_score)
        ave_pos_score = pos_score_sum/len(text_dic.values()) 
        pos_score.append(ave_pos_score)


    results = {} 
    results["compound"] = compound_score
    results["neg"] = neg_score
    results["neu"] = neu_score
    results["pos"] = pos_score

    save_results = results
    save_results["nums"] = nums

    # save_results:
    # {"compound":[xx,xx,xx,xx,xx],
    #  "neg":[xx,xx,xx,xx,xx],
    #   ...
    #  "nums":[xx,xx,xx,xx,xx]
    # }


    filePath = "pre_sentiment.txt"
    if not os.path.exists(filePath):
        f = open(filePath,"w")
        try:
            json.dump(save_results, f)
        except IOError as e:
            print("save file error!")
        finally:
            f.close()

        return results
    else:
        f = open(filePath,"w")
        try:
            pre_results = json.load(f)

            for scores in pre_results:
                if scores != "nums":
                    for i in pre_results[scores]:
                        num1 = pre_results["nums"][i]
                        num2 = save_results["nums"][i]
                        pre_results[scores][i] = (pre_results[scores][i] * num1 + save_results[scores][i] * num2)/(num1+num2)
                        pre_results["nums"][i] = num1+num2

            
            json.dump(pre_results, f)
        except IOError as e:
            print("file IO error!")
        finally:
            f.close()
        
        return pre_results
                
    

