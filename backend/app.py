from flask import Flask
from flask import render_template, jsonify
import language_analysis, total_tweets

app = Flask(__name__)

app.jinja_env.auto_reload = True
app.config['TEMPLATES_AUTO_RELOAD'] = True

language_dic = {
    "sydney":{"Arabic":194040,
    "Chinese":384639,"Vietnamese":99333,"Italian":62642,"Greek":76140,
    "Filipino":21442,"Hindi":64043,"Spanish":56826,"Punjabi":28516},"melbourne":
    {"Arabic":76317,"Chinese":279923,"Vietnamese":101340,"Italian":101341,
    "Greek":107136,"Filipino":15718,"Hindi":49386,"Spanish":33661,"Punjabi":52780,"English":2759529},"brisbane":{"Arabic":9868,"Chinese":76284,
    "Vietnamese":22562,"Italian":10062,"Greek":7547,"Filipino":5886,"Hindi":14535,"Spanish":14757,
    "Punjabi":12993},
    "adelaide":{"Arabic":9072,"Chinese":39112,"Vietnamese":18541,"Italian":27466,
    "Greek":21372,"Filipino":3098,"Hindi":7058,"Spanish":5387,"Punjabi":8499},
    "darwin":{"gcc_code":"7GDAR","Arabic":279,"Chinese":3159,"Vietnamese":1026,"Italian":655,"Greek":3169,
    "Filipino":1703,"Hindi":652,"Spanish":392,"Punjabi":477}
}

# total_tweet = { "number": 3000000 }

word_dic = {
    "sydney": [{"name":"www", "value": 2000}, {"name":"djfn", "value": 28400}, {"name":"llll", "value": 346}],
    "melbourne": [{"name":"hrw", "value": 253}, {"name":"djewn", "value": 400}, {"name":"lugffn", "value": 36}],
    "brisbane": [{"name":"jtd", "value": 56}, {"name":"rerer", "value": 6400}, {"name":"kkgkufn", "value": 8}],
    "adelaide": [{"name":"fwew", "value": 99}, {"name":"dhthth", "value": 2460}, {"name":"kmrffn", "value": 566}],
    "darwin": [{"name":"whrsdw", "value": 666}, {"name":"btbtn", "value": 220}, {"name":"kejffn", "value": 86}]
}


freq_dic = {
    "sydney": {"shopping": 321, "luxury": 444, "travel": 583},
    "melbourne":  {"shopping": 450, "luxury": 340, "travel": 543},
    "brisbane": {"shopping": 431, "luxury": 324, "travel": 643},
    "adelaide":  {"shopping": 234, "luxury": 477, "travel": 853},
    "darwin":  {"shopping": 334, "luxury": 532, "travel": 235},
}

setiment_dic = {
    "sydney": 493,
    "melbourne": 349,
    "brisbane": 520,
    "adelaide":  438,
    "darwin":  243,
}

city_tweet = {
    
    "melbourne": 180,
    "sydney": 200,
    "brisbane": 80,
    "adelaide": 100,
    "darwin": 50
}


# @app.route('/')
# def helloWorld():
#     return jsonify({'result': True, 'content': 'hello world'})

@app.route('/')
def template_test():
    return render_template('template_assignemnt2.html')

# language distribution each city
@app.route("/totaltweet")
def get_total():
    total_t = total_tweets.total_twts()[1] 
    return jsonify(total_t)

# language distribution each city
@app.route("/senario1")
def get_lang_dis():
    langdis = language_analysis.lang_count_for_city()
    return jsonify(langdis)


@app.route("/senario2")
def get_freq_dis():
    frequency = freq_dic
    return jsonify(frequency)

@app.route("/senario3")
def get_word_price():
    top_word = word_dic
    return jsonify(top_word)

@app.route("/senario3setiment")
def get_setiment():
    setiment = setiment_dic
    return jsonify(setiment)

# total tweet number each city
@app.route("/tweetpercity")
def get_city_twts():
    # totaltwt = data_analysis.total_twts()
    totaltwt = total_tweets.total_twts()[0]
    #totaltwt = city_tweet
    return jsonify(totaltwt)


if __name__ == '__main__':
    app.run(debug=True)
