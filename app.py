import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"
import sys, torch, numpy as np, mne, tempfile
from scipy.signal import resample
from flask import Flask, request, jsonify
from flask_cors import CORS

# Point to the model folder where model.py and EEGNet live
MODEL_FOLDER = os.path.join(os.path.dirname(__file__), 'model')
sys.path.insert(0, MODEL_FOLDER)

from model import EEGNet

app = Flask(__name__)
CORS(app)

TARGET_SFREQ = 256
WINDOW_SIZE = 512
MODEL_PATH = os.path.join(MODEL_FOLDER, 'saved_models', 'eeg_model.pth')

print("Loading EEG model...")
eeg_model = EEGNet()
checkpoint = torch.load(MODEL_PATH, map_location=torch.device('cpu'))
eeg_model.load_state_dict(checkpoint['state_dict'] if 'state_dict' in checkpoint else checkpoint)
eeg_model.eval()
print("✅ EEG model loaded!")

def process_edf(path):
    raw = mne.io.read_raw_edf(path, preload=True, verbose=False)
    raw.pick_types(eeg=True)
    raw.pick(raw.ch_names[:min(23, len(raw.ch_names))])
    data = raw.get_data()
    if data.shape[0] < 23:
        data = np.vstack([data, np.zeros((23 - data.shape[0], data.shape[1]))])
    data = resample(data, int(data.shape[1] * TARGET_SFREQ / raw.info['sfreq']), axis=1)
    data = (data - data.mean(axis=1, keepdims=True)) / (data.std(axis=1, keepdims=True) + 1e-8)
    return np.array([data[np.newaxis, :, i:i+WINDOW_SIZE] for i in range(0, data.shape[1]-WINDOW_SIZE, WINDOW_SIZE)])

@app.route('/')
def health():
    return jsonify({'status': 'EEG Flask API running ✅'})

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    file = request.files['file']
    tmp = tempfile.NamedTemporaryFile(suffix='.edf', delete=False)
    try:
        file.save(tmp.name); tmp.close()
        X = process_edf(tmp.name)
        if len(X) == 0:
            return jsonify({'error': 'EDF file too short'}), 400
        with torch.no_grad():
            preds = torch.argmax(eeg_model(torch.tensor(X, dtype=torch.float32)), dim=1)
        pred_list = preds.tolist()
        seizure_count = sum(pred_list)
        total = len(pred_list)
        pct = round(seizure_count / total * 100, 1)
        detected = seizure_count > 0
        return jsonify({
            'seizure_detected': detected,
            'label': '⚠️ Seizure Detected' if detected else '✅ No Seizure Detected',
            'seizure_windows': seizure_count,
            'total_windows': total,
            'seizure_percentage': pct,
            'window_predictions': pred_list,
            'summary': f"Analysis complete. {seizure_count}/{total} windows ({pct}%) showed seizure activity. {'Please consult a neurologist.' if detected else 'No significant seizure activity detected.'}"
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        os.unlink(tmp.name)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000, debug=True)