import json
from flask import Flask, render_template, jsonify, request, make_response

app = Flask(__name__, static_folder='../static/dist', template_folder='../static')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/compile', methods=['POST'])
def compile_model():
    if request.method == 'POST':
        graph = request.form['data']
    data = {
        'header': 'Response from Compile',
        'nodes': len(graph['nodes'].keys()),
        'plates': len(graph['plates'].keys())
    }

    return make_response(jsonify(data))


if __name__ == '__main__':
    app.run()