from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')

mail = Mail(app)

# Sample data for projects
projects = {
    'available': [],
    'upcoming': [
        {
            'title': 'International Student Mentorship Program',
            'description': 'Connecting new international students with experienced mentors',
            'start_date': '2024-01-15'
        }
    ]
}

# Sample data for events
events = [
    {
        'title': 'Welcome Session 2024',
        'date': '2024-02-01',
        'description': 'Welcome session for new international students',
        'location': 'Main Auditorium'
    }
]

@app.route('/api/projects', methods=['GET'])
def get_projects():
    return jsonify(projects)

@app.route('/api/events', methods=['GET'])
def get_events():
    return jsonify(events)

@app.route('/api/join', methods=['POST'])
def join_request():
    data = request.json
    try:
        msg = Message(
            'New Join Request - MIK HUB',
            recipients=[os.getenv('ADMIN_EMAIL')],
            body=f"Name: {data.get('name')}\nEmail: {data.get('email')}\nMessage: {data.get('message')}"
        )
        mail.send(msg)
        return jsonify({'message': 'Your request has been sent successfully!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)