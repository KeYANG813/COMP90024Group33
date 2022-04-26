import os
import json
from tweepy import Client

if __name__ == "__main__":
    """
     - Save it in a secure location
     - Treat it like a password or a set of keys
     - If security has been compromised, regenerate it
     - DO NOT store it in public places or shared docs
    """
    print("start")
    bearer_token = "AAAAAAAAAAAAAAAAAAAAAPPBbAEAAAAAqTGj1Wqqd57XnxMzOc08jfu7TRU%3D7RHr77dxXvmaijjoSarasRzBLRdSkQzjMlTW5y9JKmCSnUexfR"

    if not bearer_token:
        raise RuntimeError("Not found bearer token")

    client = Client(bearer_token)

    # https://developer.twitter.com/en/docs/twitter-api/tweets/search/integrate/build-a-query
    query = "melbourne"
    #query2 = "has:geo (from:melbourn)"

    max_results = 100
    limit = 30
    counter = 0
    tweet_result_dict = {}
    # https://docs.tweepy.org/en/stable/client.html#search-tweets
    resp = client.search_recent_tweets(query, tweet_fields=["geo","created_at","author_id","attachments","lang"], max_results=max_results)
    if resp.errors:
        raise RuntimeError(resp.errors)
    if resp.data:
        #print(resp)

        for tweet in resp.data:
            tweet_info = {}
            tweet_info["index"] = counter
            tweet_info["text"] = tweet.text
            tweet_info["geo"] = tweet.geo
            tweet_info["author_id"] = tweet.author_id
            tweet_info["created_at"] = str(tweet.created_at)
            tweet_info["attachments"] = tweet.attachments
            tweet_info["lang"] = tweet.lang
            #print('###################################')
            #print("geo:",tweet.geo)
            print(tweet.__repr__())
            #print('###################################')
            tweet_result_dict[counter] = tweet_info
            counter += 1

    while resp.meta["next_token"] and counter < limit:
        resp = client.search_recent_tweets(query, max_results=max_results, next_token=resp.meta["next_token"],tweet_fields=["geo","created_at","author_id"])
        if resp.errors:
            raise RuntimeError(resp.errors)
        if resp.data:
            for tweet in resp.data:
                #print(tweet)
                print(tweet.__repr__())
                #print(tweet)
                counter += 1

    with open("../data/sample.json", "w") as outfile:
        json.dump(tweet_result_dict, outfile)