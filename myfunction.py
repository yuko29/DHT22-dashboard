def sendDHT22Data():
    import Adafruit_DHT
    DHT_SENSOR = Adafruit_DHT.DHT22
    DHT_PIN = 17
    humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)
    if humidity is not None and temperature is not None:
        #print("Temp={0:0.2f}*C  Humidity={1:0.2f}%".format(temperature, humidity))
        humidity = round(humidity, 2)
        temperature = round(temperature, 2)
        return temperature, humidity
    else:
        print("Failed to retrieve data from HDT22 sensor.")

def getHistoryRecord():
    import sqlite3
    sqliteConnection = sqlite3.connect('data.db')
    cursor = sqliteConnection.cursor()
    sql = "select Time, Temperature, Humidity from DHT22 order by ROWID desc limit 20"
    print(sql)
    cursor = cursor.execute(sql)
    data = {
        'Header': [],
        'Time':[],
        'Temperature': [],
        'Humidity': []
    }
    header = list(map(lambda x: x[0], cursor.description))
    data["Header"] = header
    for row in cursor:
        data['Time'].append(row[0])
        data['Temperature'].append(row[1])
        data['Humidity'].append(row[2])
    cursor.close()
    sqliteConnection.close()
    data['Time'].reverse()
    data['Temperature'].reverse()
    data['Humidity'].reverse()
    return data