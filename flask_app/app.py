from flask import Flask, render_template, jsonify, request
from fileinput import filename
import cv2

from keras.models import model_from_json

with open('./model.json', 'r') as json_file:
   loaded_model_json = json_file.read()
# json_file = open('./model.json', 'r')
# loaded_model_json = json_file.read()
# json_file.close()
print(loaded_model_json)
import numpy as np
#  load weights into new modelloaded_model.load_weights("model.h5")
loaded_model = model_from_json(loaded_model_json)
loaded_model.load_weights("./model.h5")
loaded_model.compile(loss='binary_crossentropy',
                     optimizer='rmsprop', metrics=['accuracy'])

# loaded_model.predict(np.array([a1, a2, a3, a4]))

app = Flask(__name__)

@app.route('/verifyDocument')
def main():
   return render_template("login.html")

@app.route('/verifyDocument', methods=['POST'])
def verifyDocument():
   if request.method == "POST":
      name = request.form.get('name')
      dob = request.form.get('dob')
      gender = request.form.get('gender')
      uid = request.form.get('uid')

      print(name, dob, gender, uid)

      f = request.files['identity']

      f.save(f.filename)

      temp_img = cv2.imread('aadhar_bg.png')
      temp_img = cv2.resize(temp_img, (150, 224))

      img = cv2.imread(f.filename)
      img = cv2.resize(img, (150, 224))

      result = loaded_model.predict(np.array([img, temp_img]))
      print(result[0][0])
      # with open(f.filename, 'r') as img:

         # ocr(img)


      # return render_template("Acknowledgement.html", name=f.filename)

   return render_template(jsonify(name, dob, gender, uid, file_name=f.filename))

if __name__ == '__main__':
   app.run(debug=True)