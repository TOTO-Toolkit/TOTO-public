# MoveNet MultiPose Lightning web model

This directory contains the TensorFlow.js graph model package used by the real
TOTO browser demo. The files were obtained from the official TensorFlow Hub
web-model endpoint and are stored in GitHub so the demo is fed by the TOTO
public project rather than depending on a second model host at runtime.

Source provenance:

- <https://tfhub.dev/google/tfjs-model/movenet/multipose/lightning/1>
- Model URL at retrieval: `https://tfhub.dev/google/tfjs-model/movenet/multipose/lightning/1`
- Format: TensorFlow.js graph model (`model.json` plus three weight shards)

Do not replace these files without updating this record, the model version, and
the live demo verification. The demo reads the video locally in the browser;
these assets do not contain participant data.
