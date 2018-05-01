import json
from flask import Flask, render_template, jsonify, request, make_response

app = Flask(__name__, static_folder='../static/dist', template_folder='../static')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/compile')
def compile_model():
    with open('./data.json', 'r') as f:
        data = json.load(f)
    
    # if request.method == 'POST':
    #     return None

    return make_response(jsonify(data))


if __name__ == '__main__':
    app.run()