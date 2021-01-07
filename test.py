import sqlite3
sqliteConnection = sqlite3.connect('data.db')
cursor = sqliteConnection.cursor()
sql = "select Time, Temperature, Humidity from DHT22 limit 10"
print(sql)
cursor = cursor.execute(sql)
data = {
    'Header': [],
    'Time':[],
    'Temperature': [],
    'Humidity': []
}
header = list(map(lambda x: x[0], cursor.description))
for row in cursor:
    data['Time'].append(row[0])
    data['Temperature'].append(row[1])
    data['Humidity'].append(row[2])
data["Header"] = header

cursor.close()
sqliteConnection.close()           
print(data['Header'])
print(data['Time'])
print(data['Temperature'])
print(data['Humidity'])          