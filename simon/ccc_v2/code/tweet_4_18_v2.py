from cloudant.client import Cloudant
import tweepy
from tweepy import Stream
import json as js
import argparse
from datetime import datetime
import time
import json

USERNAME = 'admin'
PASSWORD = 'comp90024'
URL = 'http://127.0.0.1:5984'
client = Cloudant(USERNAME, PASSWORD, url=URL, connect=True, auto_renew=True)
print(client.all_dbs())
db = client.create_database('mydb', partitioned=False)

def account_info():

    account = {
        "accounts": {
            "xwqian": {
                "consumer_key": "GrmxI5klhXEdyVFueGVzscw7l",
                "consumer_secret": "x5XHP4ZKV2aqyJrzjQNoQ9Z5eMmosd0ymUKgBi3VlSOti6tGYJ",
                "access_token": "1511617716427272198-bmrfxjJuDiDPWWxC4fewGtBYYc0aZD",
                "access_token_secret": "LHDoLmnVvIkXlbjnTaitkY2Xvl8BHenmEk0J1uMhdjXqW",
                "bearer_token":"AAAAAAAAAAAAAAAAAAAAAPPBbAEAAAAAqTGj1Wqqd57XnxMzOc08jfu7TRU%3D7RHr77dxXvmaijjoSarasRzBLRdSkQzjMlTW5y9JKmCSnUexfR"
            },
            "xwqian2":{
                "Consumer_Key" : "Up5cFxl1QjkHvqiDf7aehROw8",
                "Consumer_Secret" : "eyEbW9Rit5ANOt5bdSiOfBp124GqaJvtNxn0MObMSd4uPAKij8",
                "Access_Token" : "2527414171-8eUKlK9Z8k4FAIDRvPJ35JtLedXxjloAA9Xqf2h",
                "Access_Token_Secret" : "94Do2on02xCemCwpfg9PyCikFswDsAcufuYQTisJTrtWh"}
        },
        "db": {
            "user": "admin",
            "password": "comp90024",
            "url": "http://127.0.0.1:5984"
        }
    }

    return account


class IDPrinter(tweepy.Stream):
    def on_data(self, data):
        tweetJson = js.loads(data, encoding= 'utf-8')
# need to filter out the retweet
        if not tweetJson["text"].startswith('RT') and tweetJson["retweeted"] == False:
            db.create_document(tweetJson)
            print("get")
            print(newJSON)
    
    def on_status(self, status):
        print(status.id)
        print(status.place)

if __name__ == '__main__':
    account = account_info()
    Consumer_Key = account["accounts"]["xwqian2"]["Consumer_Key"]
    Consumer_Secret = account["accounts"]["xwqian2"]["Consumer_Secret"]
    Access_Token = account["accounts"]["xwqian2"]["Access_Token"]
    Access_Token_Secret = account["accounts"]["xwqian2"]["Access_Token_Secret"]
    stream = tweepy.Stream(
    Consumer_Key, Consumer_Secret,
    Access_Token, Access_Token_Secret
)
    printer = IDPrinter(
    Consumer_Key, Consumer_Secret,
    Access_Token, Access_Token_Secret
    )
    printer.filter(locations = [144.5832844553735, -37.94683815599797 ,145.6505450085851 ,-37.497858205844985])
    
    