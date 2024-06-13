from flask import Flask, request, jsonify
import tensorflow as tf
from flask_cors import CORS 
from tensorflow.keras.preprocessing.image import img_to_array, load_img
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load the saved model
model = tf.keras.models.load_model('saved_model/mobilenetv2')

# Load the precomputed features and image paths
features = np.load('features.npy')
image_paths = np.load('image_paths.npy')

def preprocess_image(image_path, target_size=(224, 224)):
    image = load_img(image_path, target_size=target_size)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = preprocess_input(image)
    return image

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        image_path = os.path.join('uploads', file.filename)
        file.save(image_path)
        image = preprocess_image(image_path)
        uploaded_features = model.predict(image)

        similarities = cosine_similarity(uploaded_features, features)
        similar_image_indices = similarities.argsort()[0][-5:][::-1]

        similar_image_paths = image_paths[similar_image_indices]

        # Remove the uploaded image from the server
        os.remove(image_path)

        # Modify the file paths to only include the file names
        similar_file_names = [os.path.basename(path) for path in similar_image_paths]

        # Return the similar file names
        return jsonify({'similar_images': similar_file_names}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)
