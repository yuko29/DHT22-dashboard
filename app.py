from flask import Flask, render_template, request, jsonify
from datetime import timedelta
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('starter_template.html')

@app.route('/_getdata', methods=['GET'])
def getdata():
    from myfunction import sendDHT22Data
    temperature, humidity = sendDHT22Data()
    response = {
        "temperature": temperature,
        "humidity": humidity
    }
    print(temperature, humidity)
    return jsonify(response)

@app.route('/_getStatisticData', methods=['GET'])
def getStatisticData():
    from myfunction import getHistoryRecord
    response = getHistoryRecord()
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
