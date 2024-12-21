from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Replace 'your_api_key' with your actual OpenWeatherMap API key
API_KEY = 'ac30da005d9abb79df5396dee8b6e098'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/weather', methods=['POST'])
def get_weather():
    city = request.form.get('city')
    if not city:
        return jsonify({'error': 'City name is required!'}), 400

    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric'
    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({'error': 'City not found!'}), 404

    data = response.json()
    
    weather_info = {
        'city': data['name'],
        'country_name': data['sys']['country'],
        'temperature': data['main']['temp'],
        'feels_like': data['main']['feels_like'],
        'temp_min': data['main']['temp_min'],
        'temp_max': data['main']['temp_max'],
        'humidity': data['main']['humidity'],
        'pressure': data['main']['pressure'],
        'description': data['weather'][0]['description'],
        'icon': data['weather'][0]['icon'],
        'wind_speed': data['wind']['speed'],
    }
    return jsonify(weather_info)

if __name__ == '__main__':
    app.run(debug=True)
