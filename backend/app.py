# app.py - a minimal flask api using flask_restful
# from flask import Flask
# from flask_restful import Resource, Api

# app = Flask(__name__)
# api = Api(app)

# class HelloWorld(Resource):
#     def get(self):
#         return {'hello': 'world'}

# api.add_resource(HelloWorld, '/')

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0')

from flask import Flask
from flask import render_template, jsonify

app = Flask(__name__)

@app.route('/')
def helloWorld():
    return jsonify({'result': True, 'content': 'hello world'})

if __name__ == '__main__':
    app.run(debug=True)