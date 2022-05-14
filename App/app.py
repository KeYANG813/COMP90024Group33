# 2022 COMP90024 Group 33 

# Team members:

# Ke Yang (Student ID: 1219623) - city: Anhui

# Yimeng Liu (Student ID: 1074206) - city: Guangdong

# Jintong Liu (Student ID: 1074498) - city: Hebei

# Keang Xu (Student ID: 1008807) - city: Hubei

# Xinwei Qian (Student ID: 1068271) - city: Jiangsu

from flask import Flask
from flask import render_template, jsonify
import language_analysis, total_tweets, hashtag, tweet_sentiment

app = Flask(__name__)

app.jinja_env.auto_reload = True
app.config['TEMPLATES_AUTO_RELOAD'] = True

# Home page (render the HTML)
@app.route('/')
def template_test():
    return render_template('template_assignemnt2.html')

# language distribution each city
@app.route("/totaltweet")
def get_total():
    total_t = total_tweets.total_twts()[1] 
    return jsonify(total_t)

# total tweet number each city
@app.route("/tweetpercity")
def get_city_twts():
    # totaltwt = data_analysis.total_twts()
    totaltwt = total_tweets.total_twts()[0]
    #totaltwt = city_tweet
    return jsonify(totaltwt)

# language distribution each city
@app.route("/senario1")
def get_lang_dis():
    langdis = language_analysis.lang_count_for_city()
    return jsonify(langdis)

# number of hashtag each city
@app.route("/senario2")
def get_word_price():
    #top_word = word_dic
    top_word = hashtag.hashtags_analysis()[0]
    return jsonify(top_word)    

# hashtag setiment score
@app.route("/senario2sentiment")
def get_setiment():
    sentiment = hashtag.hashtags_analysis()[1]
    return jsonify(sentiment)

# live tweets sentiment
@app.route("/senario3")
def get_tweet_setiment():
    sentiment_t = tweet_sentiment.tweet_analysis()
    return jsonify(sentiment_t)  

if __name__ == '__main__':
    app.run(debug=True)
