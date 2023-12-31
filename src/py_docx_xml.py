import spacy
from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
import os
import zipfile
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/execute-python-script": {"origins": "http://localhost:4200"}})

@app.route('/extract-docx', methods=['POST'])

def extract_docx():
    try:
        uploaded_file = request.files['file']

        if uploaded_file.filename != '':
            # Save the uploaded file
            file_path = os.path.join("uploads", uploaded_file.filename)
            uploaded_file.save(file_path)

            # Rename the extension to .zip
            zip_file = file_path.replace(".docx", ".zip")
            print(zip_file)
            os.rename(file_path, zip_file)

            # Unzip the renamed file
            with zipfile.ZipFile(zip_file, 'r') as zip_ref:
                zip_ref.extractall("unzipped")

            # Path to document.xml
            document_xml_path = os.path.join("unzipped", "word", "document.xml")

            # Open and read the document.xml file
            with open(document_xml_path, "r", encoding="utf-8") as xml_file:
                document_content = xml_file.read()
            print(document_content)

            # Delete the temporary .zip file
            os.remove(zip_file)
            # Delete the entire "unzipped" directory and its contents
            import shutil
            shutil.rmtree("unzipped")

            return jsonify({"content": document_content})
            # Delete the temporary .docx file
            os.remove(file_path)
        else:
            return jsonify({"error": "No file provided."})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    os.makedirs("uploads", exist_ok=True)
    os.makedirs("unzipped", exist_ok=True)
    app.run(debug=True)
    app.run(host="127.0.0.1", port=5000)




