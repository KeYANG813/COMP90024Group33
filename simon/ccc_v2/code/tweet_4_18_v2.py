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
            "xwqian2":{
                "Consumer_Key" : "Up5cFxl1QjkHvqiDf7aehROw8",
                "Consumer_Secret" : "eyEbW9Rit5ANOt5bdSiOfBp124GqaJvtNxn0MObMSd4uPAKij8",
                "Access_Token" : "2527414171-8eUKlK9Z8k4FAIDRvPJ35JtLedXxjloAA9Xqf2h",
                "Access_Token_Secret" : "94Do2on02xCemCwpfg9PyCikFswDsAcufuYQTisJTrtWh"
                },
            "christina": {
                "consumer_key": "5KHYDpEavEvWs6f07gqA7FSYU",
                "consumer_secret": "15T8ePaIu7IfU0X7VnhPHAsgSjvIqpsYTpDEKjI596w6mUoTLe",
                "access_token": "1517696674243948545-ozARJ8xRdGarhfknxGHqvMs51uPXp3",
                "access_token_secret": "rN3JxUTER0PjMXqsy4WSgzqGk10IF29IBG7JXSotRUAxG",
                "bearer_token":"AAAAAAAAAAAAAAAAAAAAAEo9bwEAAAAA40DLUb109523Heu6ePJD3vtThCc%3DjIH9qTJi0qCyhH9V98DtTQLLMmoV9V2mSRr4W5f9tF8m8Iee8y"
            },
            "wendy": {
                "consumer_key": "mPbAIQI6GiUKsR89tBZ1dOVte",
                "consumer_secret": "0Vsm4cXRuLutFREUj0elbpF92PyyIb29TSR1BdwGXivLUftVD9",
                "access_token": "1510827213339623431-U1mlt70yY2bAd9v7WHlYGpTg3RCUJK",
                "access_token_secret": "gftHoztKdJ5em60kms3aqqRIsswcAGLRZDPYGbf6ESf1X",
                "bearer_token":"AAAAAAAAAAAAAAAAAAAAAJZqbAEAAAAAiiSxVh7G3TjQIB0UajmQrZJWPIE%3DibLwxyjeQOyLRYps5puQq4jtgPDkrz9tM9uDUAtx3pwurWerON"
            }
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
    
    