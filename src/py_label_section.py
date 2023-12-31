import spacy
from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
import os
import zipfile
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/label_section": {"origins": "http://localhost:4200"}})
nlp = spacy.load("en_core_web_sm")

@app.route('/label_section', methods=['POST'])


def label_section():
    
    section = request.data.decode('utf-8')  # Get the data from the request body
    soup = BeautifulSoup(section, "html.parser")
    text = soup.get_text()
    doc = nlp(text)
    custom_labels = {"sample": "CUSTOM_LABEL_1", "text": "CUSTOM_LABEL_2"}
    for ent, label in custom_labels.items():
        for token in doc:
            if token.text.lower() == ent:
                token.ent_type_ = label

# Print the labeled text
    for token in doc:
        print(f"{token.text}: {token.ent_type_}")

    print(section)
    # section = request.data.decode('utf-8')  # Get the data from the request body
    response_data = {'message': 'Section received and processed successfully'}
    return response_data
    # try:
        # uploaded_file = request.files['file']

        # if uploaded_file.filename != '':
            # Save the uploaded file
            # file_path = os.path.join("uploads", uploaded_file.filename)
            # uploaded_file.save(file_path)

            # # Rename the extension to .zip
            # zip_file = file_path.replace(".docx", ".zip")
            # print(zip_file)
            # os.rename(file_path, zip_file)

            # Unzip the renamed file
            # with zipfile.ZipFile(zip_file, 'r') as zip_ref:
            #     zip_ref.extractall("unzipped")

            # # Path to document.xml
            # document_xml_path = os.path.join("unzipped", "word", "document.xml")

            # # Open and read the document.xml file
            # with open(document_xml_path, "r", encoding="utf-8") as xml_file:
            #     document_content = xml_file.read()
            # print(document_content)

            # # Delete the temporary .zip file
            # os.remove(zip_file)
            # # Delete the entire "unzipped" directory and its contents
            # import shutil
            # shutil.rmtree("unzipped")

        # else:
            # return jsonify({"error": "No file provided."})

    # except Exception as e:
        # return jsonify({"error": str(e)})

if __name__ == '__main__':
    os.makedirs("uploads", exist_ok=True)
    os.makedirs("unzipped", exist_ok=True)
    app.run(debug=True)
    app.run(host="127.0.0.1", port=5000)




