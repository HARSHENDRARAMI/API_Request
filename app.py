from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    # This is the GET method endpoint
    return jsonify({"operation_code": 1}), 200

@app.route('/bfhl', methods=['POST'])
def process_data():
    # This is the POST method endpoint
    data = request.json.get('data', [])
    if not isinstance(data, list):
        return jsonify({"is_success": False}), 400
    
    user_id = "john_doe_17091999"  # Replace with the correct format for your user_id
    email = "john@xyz.com"  # Replace with actual email
    roll_number = "ABCD123"  # Replace with actual roll number

    numbers = [x for x in data if x.isdigit()]
    alphabets = [x for x in data if x.isalpha()]
    lowercase_alphabets = [x for x in alphabets if x.islower()]
    highest_lowercase_alphabet = max(lowercase_alphabets) if lowercase_alphabets else None

    response = {
        "is_success": True,
        "user_id": user_id,
        "email": email,
        "roll_number": roll_number,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": [highest_lowercase_alphabet] if highest_lowercase_alphabet else []
    }
    
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
