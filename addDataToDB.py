import Adafruit_DHT
import sqlite3
from datetime import datetime
import time

DHT_SENSOR = Adafruit_DHT.DHT22
DHT_PIN = 17


while True:
    try:
        humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)
        if humidity is not None and temperature is not None:
            humidity = round(humidity, 2)
            temperature = round(temperature, 2)
            date = datetime.now().strftime("%Y/%m/%d")
            time_t = datetime.now().strftime("%H:%M:%S")
            sqliteConnection = sqlite3.connect('data.db')
            cursor = sqliteConnection.cursor()
            sql = "INSERT INTO DHT22(Date, Time, Temperature, Humidity) VALUES('{Date}', '{Time}', {Temperature}, {Humidity})".format(Date=date, Time=time_t, Temperature=temperature, Humidity=humidity)
            #print(sql)
            count = cursor.execute(sql)
            sqliteConnection.commit()
            cursor.close()
            time.sleep(0.5)
        else:
            print("Failed to retrieve data from HDT22 sensor")
    except sqlite3.Error as error:
        print("Failed to insert data into sqlite table", error)
    except KeyboardInterrupt:
        break
    finally:
        if (sqliteConnection):
            sqliteConnection.close()
            #print("The SQLite connection is closed")
