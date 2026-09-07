"use strict";

const PRIVATE_INSTALLER_MAILTO = "mailto:fabian.nana@pucp.edu.pe?subject=Solicitud%20del%20instalador%20privado%20de%20TOTO&body=Hola%20Fabi%C3%A1n%2C%0A%0AQuiero%20solicitar%20el%20instalador%20privado%20de%20TOTO.";
const MODEL_URL = "./models/movenet-multipose-lightning-1/model.json";
const MODEL_NAME = "MoveNet MultiPose Lightning";
// The detector resizes internally, but feeding it a full 1080p/4K video still
// makes every browser copy and scale a very large frame before inference.
// Keep the demo responsive while preserving the video's original coordinates
// for the overlay and the optional user-triggered CSV download.
const MAX_INFERENCE_DIMENSION = 512;
const MAX_INFERENCE_FPS = 8;
const KEYPOINT_NAMES = [
  "nose", "left_eye", "right_eye", "left_ear", "right_ear",
  "left_shoulder", "right_shoulder", "left_elbow", "right_elbow",
  "left_wrist", "right_wrist", "left_hip", "right_hip", "left_knee",
  "right_knee", "left_ankle", "right_ankle",
];
const SKELETON_EDGES = [
  [5, 6], [5, 7], [7, 9], [6, 8], [8, 10], [5, 11], [6, 12],
  [11, 12], [11, 13], [13, 15], [12, 14], [14, 16], [0, 1],
  [0, 2], [1, 3], [2, 4],
];
const PALETTE = ["#24d4ca", "#ffb454", "#a88bff", "#ff7292", "#76b9ff", "#9ee36d"];

const copy = {
  es: {
    nav_demo: "Demo real", nav_download: "Descargar", nav_releases: "Versiones", nav_code: "Distribución",
    live_model: "Modelo real", hero_title: "Prueba el tracking real antes de instalar.",
    hero_copy: "Selecciona un vídeo desde tu celular o computadora. MoveNet analiza las personas en tu navegador, dibuja sus puntos y te deja descargar los resultados. El vídeo no se sube a un servidor de TOTO.",
    try_demo: "Probar con mi vídeo", request_installer: "Solicitar instalador privado por correo", cloud_title: "Demo pública; instalador privado",
    cloud_copy: "La demo y el modelo se sirven públicamente. El instalador de escritorio no se publica: solicítalo por correo.",
    source_link: "Ver distribución", model_link: "Ver modelo", interactive_label: "PRUEBA INTERACTIVA",
    demo_title: "Sube un vídeo y ejecuta pose tracking", demo_copy: "Esta vez no hay una figura dibujada de mentira: el detector recibe los frames de tu vídeo y devuelve poses reales.",
    model_not_loaded: "Modelo no cargado", choose_video: "Elegir vídeo", load_model: "Cargar modelo", process_video: "Procesar vídeo",
    stop: "Detener", empty_title: "Selecciona un vídeo para comenzar", empty_copy: "Formatos habituales del navegador: MP4, WebM o MOV.",
    ready: "Listo para cargar un vídeo", runtime: "Runtime", model_hint: "Carga el modelo para activar la inferencia.",
    visuals: "Capas visuales", skeleton: "Esqueleto", boxes: "Cajas", keypoints: "Puntos", confidence: "Confianza mínima",
    metric_frames: "Frames", metric_people: "Personas", metric_fps: "FPS modelo", metric_backend: "Backend",
    analysis_hint: "Carga el modelo y procesa un vídeo para obtener resultados reales.", download_results: "Guardar CSV (opcional)",
    privacy_note: "Privacidad: el vídeo y las poses quedan solo en la memoria temporal de esta pestaña. No se suben ni se guardan en GitHub. Solo se descarga un CSV si tú lo eliges.",
    proof_one_title: "Modelo cargado", proof_one_copy: "MoveNet MultiPose Lightning se inicializa de verdad con TensorFlow.js y devuelve hasta seis personas.",
    proof_two_title: "Vídeo del usuario", proof_two_copy: "Puedes usar un archivo del teléfono o de la computadora; el procesamiento ocurre en la pestaña.",
    proof_three_title: "Salida bajo tu control", proof_three_copy: "Los resultados quedan en la caché temporal y solo se descargan si eliges Guardar CSV.",
    distribution: "ACCESO PRIVADO", download_title: "Solicita la versión privada",
    download_copy: "La demo pública permite probar el modelo real. El instalador de escritorio no se sube ni se ofrece como descarga pública; pulsa el botón para solicitarlo por correo a fabian.nana@pucp.edu.pe.",
    poses: "poses", loading: "Cargando el modelo…", model_ready: "Modelo listo", processing: "Procesando vídeo…", stopped: "Procesamiento detenido",
    finished: "Procesamiento terminado", no_video: "Selecciona primero un vídeo", error: "No se pudo completar la operación",
  },
  en: {
    nav_demo: "Live demo", nav_download: "Download", nav_releases: "Releases", nav_code: "Distribution",
    live_model: "Real model", hero_title: "Try real tracking before installing.",
    hero_copy: "Choose a video from your phone or computer. MoveNet detects people in your browser, draws their keypoints and lets you download the results. The video is not uploaded to a TOTO server.",
    try_demo: "Try with my video", request_installer: "Request private installer by email", cloud_title: "Public demo; private installer",
    cloud_copy: "The demo and model are served publicly. The desktop installer is not published: request it by email.",
    source_link: "View distribution", model_link: "View model", interactive_label: "INTERACTIVE TEST",
    demo_title: "Upload a video and run pose tracking", demo_copy: "This is not a drawn figure: the detector receives frames from your video and returns real poses.",
    model_not_loaded: "Model not loaded", choose_video: "Choose video", load_model: "Load model", process_video: "Process video",
    stop: "Stop", empty_title: "Choose a video to begin", empty_copy: "Common browser formats: MP4, WebM or MOV.",
    ready: "Ready for a video", runtime: "Runtime", model_hint: "Load the model to enable inference.",
    visuals: "Visual layers", skeleton: "Skeleton", boxes: "Boxes", keypoints: "Keypoints", confidence: "Minimum confidence",
    metric_frames: "Frames", metric_people: "People", metric_fps: "Model FPS", metric_backend: "Backend",
    analysis_hint: "Load the model and process a video to get real results.", download_results: "Save CSV (optional)",
    privacy_note: "Privacy: the video and poses stay only in this tab's temporary memory. They are not uploaded or saved to GitHub. A CSV is downloaded only if you choose it.",
    proof_one_title: "Loaded model", proof_one_copy: "MoveNet MultiPose Lightning is initialized through TensorFlow.js and returns up to six people.",
    proof_two_title: "User video", proof_two_copy: "Use a file from your phone or computer; processing happens in this tab.",
    proof_three_title: "Output under your control", proof_three_copy: "Results stay in temporary tab memory and download only when you choose Save CSV.",
    distribution: "PRIVATE ACCESS", download_title: "Request the private version",
    download_copy: "The public demo lets you try the real model. The desktop installer is not uploaded or offered as a public download; use the button to request it by email at fabian.nana@pucp.edu.pe.",
    poses: "poses", loading: "Loading model…", model_ready: "Model ready", processing: "Processing video…", stopped: "Processing stopped",
    finished: "Processing finished", no_video: "Choose a video first", error: "The operation could not be completed",
  },
};

const $ = (id) => document.getElementById(id);
let locale = localStorage.getItem("toto-demo-language") || "es";
let detector = null;
let videoUrl = null;
let processing = false;
let runToken = 0;
let frameIndex = 0;
let results = [];
let lastPoses = [];
let resultUrl = null;
let inferenceCanvas = null;
let inferenceContext = null;
let lastInferenceMediaTime = -Infinity;
let smoothedInferenceFps = null;
let pendingSeekCancel = null;
let playbackOverlayRaf = null;

function t(key) {
  return (copy[locale] || copy.es)[key] || copy.es[key] || key;
}

function translate() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.documentElement.lang = locale;
  localStorage.setItem("toto-demo-language", locale);
  $("request-installer-hero").href = PRIVATE_INSTALLER_MAILTO;
  $("request-installer-main").href = PRIVATE_INSTALLER_MAILTO;
}

function setStatus(message, kind = "") {
  const node = $("viewer-message");
  node.textContent = message;
  node.className = kind;
}

function setModelBadge(message, kind = "pending") {
  const badge = $("model-badge");
  badge.textContent = message;
  badge.className = `demo-badge ${kind}`;
}

function updateActionState() {
  $("process").disabled = !detector || !$("source-video").src || processing;
  $("load-model").disabled = processing;
  $("stop").disabled = !processing;
}

function resetResults() {
  results = [];
  frameIndex = 0;
  lastInferenceMediaTime = -Infinity;
  smoothedInferenceFps = null;
  if (playbackOverlayRaf !== null) {
    cancelAnimationFrame(playbackOverlayRaf);
    playbackOverlayRaf = null;
  }
  $("metric-frames").textContent = "0";
  $("metric-people").textContent = "0";
  $("metric-fps").textContent = "—";
  $("progress-bar").style.width = "0%";
  $("download-results").classList.add("hidden");
  if (resultUrl) {
    URL.revokeObjectURL(resultUrl);
    resultUrl = null;
  }
}

function resizeInferenceCanvas(video) {
  const width = video.videoWidth || 0;
  const height = video.videoHeight || 0;
  if (!width || !height) return null;
  if (!inferenceCanvas) {
    inferenceCanvas = document.createElement("canvas");
    inferenceContext = inferenceCanvas.getContext("2d", {alpha: false, desynchronized: true})
      || inferenceCanvas.getContext("2d");
    if (inferenceContext) {
      inferenceContext.imageSmoothingEnabled = true;
      inferenceContext.imageSmoothingQuality = "low";
    }
  }
  const scale = Math.min(1, MAX_INFERENCE_DIMENSION / Math.max(width, height));
  const targetWidth = Math.max(1, Math.round(width * scale));
  const targetHeight = Math.max(1, Math.round(height * scale));
  if (inferenceCanvas.width !== targetWidth || inferenceCanvas.height !== targetHeight) {
    inferenceCanvas.width = targetWidth;
    inferenceCanvas.height = targetHeight;
  }
  return inferenceCanvas;
}

function inferenceFrame(video) {
  const canvas = resizeInferenceCanvas(video);
  if (!canvas || !inferenceContext) return null;
  inferenceContext.drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas;
}

function restoreVideoCoordinates(poses, video, input) {
  if (!input || !video.videoWidth || !video.videoHeight) return poses || [];
  const scaleX = video.videoWidth / input.width;
  const scaleY = video.videoHeight / input.height;
  return (poses || []).map((pose) => {
    const box = pose.box;
    const scaledBox = box ? {...box} : null;
    if (scaledBox) {
      if (Number.isFinite(box.xMin)) scaledBox.xMin = box.xMin * scaleX;
      if (Number.isFinite(box.yMin)) scaledBox.yMin = box.yMin * scaleY;
      if (Number.isFinite(box.xMax)) scaledBox.xMax = box.xMax * scaleX;
      if (Number.isFinite(box.yMax)) scaledBox.yMax = box.yMax * scaleY;
      if (Number.isFinite(box.width)) scaledBox.width = box.width * scaleX;
      if (Number.isFinite(box.height)) scaledBox.height = box.height * scaleY;
    }
    return {
      ...pose,
      box: scaledBox,
      keypoints: (pose.keypoints || []).map((point) => ({
        ...point,
        x: point.x * scaleX,
        y: point.y * scaleY,
      })),
    };
  });
}

function resizeCanvas() {
  const video = $("source-video");
  const canvas = $("overlay-canvas");
  const width = video.videoWidth || 960;
  const height = video.videoHeight || 540;
  canvas.width = width;
  canvas.height = height;
  $("stage").style.aspectRatio = `${width} / ${height}`;
  drawOverlay(lastPoses);
}

function visibleKeypoints(pose) {
  const threshold = Number($("confidence").value) / 100;
  return (pose.keypoints || []).filter((point) => Number(point.score || 0) >= threshold);
}

function poseBox(pose) {
  if (pose.box && Number.isFinite(pose.box.xMin)) {
    return pose.box;
  }
  const points = visibleKeypoints(pose);
  if (!points.length) return null;
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const xMin = Math.min(...xs);
  const yMin = Math.min(...ys);
  const xMax = Math.max(...xs);
  const yMax = Math.max(...ys);
  return {xMin, yMin, width: xMax - xMin, height: yMax - yMin};
}

function drawOverlay(poses) {
  const canvas = $("overlay-canvas");
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  const threshold = Number($("confidence").value) / 100;
  poses.forEach((pose, poseIndex) => {
    const color = PALETTE[poseIndex % PALETTE.length];
    const keypoints = pose.keypoints || [];
    if ($("show-boxes").checked) {
      const box = poseBox(pose);
      if (box) {
        context.strokeStyle = color;
        context.lineWidth = Math.max(2, canvas.width / 420);
        context.setLineDash([8, 5]);
        context.strokeRect(box.xMin, box.yMin, box.width || (box.xMax - box.xMin), box.height || (box.yMax - box.yMin));
        context.setLineDash([]);
        context.font = `${Math.max(12, canvas.width / 55)}px Inter, system-ui, sans-serif`;
        context.fillStyle = color;
        context.fillText(`P${pose.id ?? poseIndex + 1}`, box.xMin + 5, Math.max(16, box.yMin - 8));
      }
    }
    if ($("show-skeleton").checked) {
      context.strokeStyle = color;
      context.lineWidth = Math.max(3, canvas.width / 260);
      context.lineCap = "round";
      SKELETON_EDGES.forEach(([first, second]) => {
        const a = keypoints[first];
        const b = keypoints[second];
        if (!a || !b || Number(a.score || 0) < threshold || Number(b.score || 0) < threshold) return;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      });
    }
    if ($("show-keypoints").checked) {
      keypoints.forEach((point) => {
        if (Number(point.score || 0) < threshold) return;
        context.fillStyle = "#ffffff";
        context.strokeStyle = color;
        context.lineWidth = Math.max(2, canvas.width / 480);
        context.beginPath();
        context.arc(point.x, point.y, Math.max(3, canvas.width / 165), 0, Math.PI * 2);
        context.fill();
        context.stroke();
      });
    }
  });
}

function serializePose(pose) {
  return {
    id: pose.id ?? null,
    score: Number.isFinite(pose.score) ? pose.score : null,
    box: pose.box ? {
      xMin: pose.box.xMin ?? null,
      yMin: pose.box.yMin ?? null,
      width: pose.box.width ?? null,
      height: pose.box.height ?? null,
    } : null,
    keypoints: (pose.keypoints || []).map((point, index) => ({
      name: point.name || KEYPOINT_NAMES[index] || `keypoint_${index}`,
      x: point.x,
      y: point.y,
      score: point.score ?? null,
    })),
  };
}

function csvCell(value) {
  const text = value == null ? "" : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function resultsToCsv() {
  const filename = $("video-input").files[0]?.name || "";
  const header = ["video", "frame", "time_s", "pose_id", "pose_score", "x_min", "y_min", "width", "height", "keypoint", "x", "y", "keypoint_score"];
  const rows = [header];
  results.forEach((frame) => {
    const poses = frame.poses || [];
    if (!poses.length) {
      rows.push([filename, frame.frame, frame.time_s, "", "", "", "", "", "", "", "", "", ""]);
      return;
    }
    poses.forEach((pose) => {
      const box = pose.box || {};
      const points = pose.keypoints || [];
      if (!points.length) {
        rows.push([filename, frame.frame, frame.time_s, pose.id, pose.score, box.xMin, box.yMin, box.width, box.height, "", "", "", ""]);
        return;
      }
      points.forEach((point) => rows.push([
        filename, frame.frame, frame.time_s, pose.id, pose.score,
        box.xMin, box.yMin, box.width, box.height,
        point.name, point.x, point.y, point.score,
      ]));
    });
  });
  return rows.map((row) => row.map(csvCell).join(",")).join("\r\n") + "\r\n";
}

function publishResults() {
  const link = $("download-results");
  if (resultUrl) {
    URL.revokeObjectURL(resultUrl);
    resultUrl = null;
  }
  link.removeAttribute("href");
  link.download = "toto-browser-poses.csv";
  link.classList.toggle("hidden", !results.length);
}

function downloadResultsCsv() {
  if (!results.length) return;
  if (resultUrl) URL.revokeObjectURL(resultUrl);
  resultUrl = URL.createObjectURL(new Blob([resultsToCsv()], {type: "text/csv;charset=utf-8"}));
  const url = resultUrl;
  const link = document.createElement("a");
  link.href = url;
  link.download = "toto-browser-poses.csv";
  link.click();
  window.setTimeout(() => {
    if (resultUrl === url) {
      URL.revokeObjectURL(url);
      resultUrl = null;
    }
  }, 60000);
}

async function loadModel() {
  if (detector) return;
  if (!window.tf || !window.poseDetection) {
    setStatus(`${t("error")}: TensorFlow.js no terminó de cargar`, "error");
    return;
  }
  $("load-model").disabled = true;
  setModelBadge(t("loading"), "loading");
  $("model-status").textContent = t("loading");
  try {
    let backend = "webgl";
    try {
      await tf.setBackend("webgl");
      await tf.ready();
    } catch (_error) {
      backend = "cpu";
      await tf.setBackend("cpu");
      await tf.ready();
    }
    detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, {
      modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
      modelUrl: MODEL_URL,
      enableSmoothing: true,
      enableTracking: true,
      trackerType: poseDetection.TrackerType?.BoundingBox,
      minPoseScore: 0.25,
    });
    backend = tf.getBackend() || backend;
    $("backend-value").textContent = backend;
    $("metric-backend").textContent = backend;
    $("model-status").textContent = `${t("model_ready")} · ${backend}`;
    setModelBadge(t("model_ready"), "ready");
    setStatus(t("ready"), "success");
  } catch (error) {
    detector = null;
    $("load-model").disabled = false;
    setModelBadge(t("error"), "error");
    $("model-status").textContent = error?.message || String(error);
    setStatus(`${t("error")}: ${error?.message || String(error)}`, "error");
  }
  updateActionState();
}

function seekVideo(video, targetTime) {
  return new Promise((resolve) => {
    if (pendingSeekCancel) pendingSeekCancel();
    const duration = Number.isFinite(video.duration) ? video.duration : 0;
    const target = Math.max(0, Math.min(targetTime, Math.max(0, duration - 0.001)));
    let settled = false;
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
      if (pendingSeekCancel === cancel) pendingSeekCancel = null;
      resolve(ok);
    };
    const onSeeked = () => finish(true);
    const onError = () => finish(false);
    const cancel = () => finish(false);
    pendingSeekCancel = cancel;
    video.addEventListener("seeked", onSeeked, {once: true});
    video.addEventListener("error", onError, {once: true});
    if (video.readyState >= 2 && Math.abs(video.currentTime - target) < 0.001) {
      Promise.resolve().then(() => finish(true));
      return;
    }
    try {
      video.currentTime = target;
    } catch (_error) {
      finish(false);
    }
  });
}

function cachedPosesAtTime(time) {
  if (!results.length) return [];
  let low = 0;
  let high = results.length - 1;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if (Number(results[middle].time_s) < time) low = middle;
    else high = middle - 1;
  }
  const nextIndex = Math.min(results.length - 1, low + 1);
  const previous = results[low];
  const next = results[nextIndex];
  const previousDistance = Math.abs(Number(previous.time_s) - time);
  const nextDistance = Math.abs(Number(next.time_s) - time);
  return (nextDistance < previousDistance ? next : previous)?.poses || [];
}

function syncCachedOverlay() {
  const video = $("source-video");
  if (results.length) {
    lastPoses = cachedPosesAtTime(Number(video.currentTime) || 0);
    $("pose-count").textContent = `${lastPoses.length} ${t("poses")}`;
    drawOverlay(lastPoses);
  }
  if (!video.paused && !video.ended) {
    if (playbackOverlayRaf === null) {
      playbackOverlayRaf = requestAnimationFrame(() => {
        playbackOverlayRaf = null;
        syncCachedOverlay();
      });
    }
  } else if (playbackOverlayRaf !== null) {
    cancelAnimationFrame(playbackOverlayRaf);
    playbackOverlayRaf = null;
  }
}

async function processFrame(metadata, token) {
  if (!processing || token !== runToken) return;
  const video = $("source-video");
  const mediaTime = Number(metadata?.mediaTime ?? video.currentTime);
  const started = performance.now();
  try {
    const input = inferenceFrame(video);
    if (!input) throw new Error("El vídeo todavía no tiene un frame disponible");
    const poses = await detector.estimatePoses(input);
    if (!processing || token !== runToken) return;
    lastInferenceMediaTime = mediaTime;
    lastPoses = restoreVideoCoordinates(poses, video, input);
    results.push({
      frame: frameIndex++,
      time_s: Number.isFinite(mediaTime) ? mediaTime : 0,
      poses: lastPoses.map(serializePose),
    });
    const elapsed = Math.max(1, performance.now() - started);
    const instantFps = 1000 / elapsed;
    smoothedInferenceFps = smoothedInferenceFps == null
      ? instantFps
      : (smoothedInferenceFps * 0.7) + (instantFps * 0.3);
    $("metric-fps").textContent = smoothedInferenceFps.toFixed(1);
    $("metric-frames").textContent = String(results.length);
    $("metric-people").textContent = String(Math.max(Number($("metric-people").textContent) || 0, lastPoses.length));
    $("pose-count").textContent = `${lastPoses.length} ${t("poses")}`;
    const duration = $("source-video").duration || 0;
    $("progress-bar").style.width = `${duration ? Math.min(100, (mediaTime / duration) * 100) : 0}%`;
    drawOverlay(lastPoses);
  } catch (error) {
    stopProcessing();
    setStatus(`${t("error")}: ${error?.message || String(error)}`, "error");
    return false;
  }
  return true;
}

async function runProcessingLoop(token) {
  const video = $("source-video");
  const duration = Number(video.duration);
  const lastFrameTime = Math.max(0, duration - 0.02);
  const sampleInterval = 1 / MAX_INFERENCE_FPS;
  let targetTime = 0;
  while (processing && token === runToken) {
    const seekOk = await seekVideo(video, targetTime);
    if (!seekOk || !processing || token !== runToken) return;
    const atEnd = targetTime >= lastFrameTime;
    const ok = await processFrame({mediaTime: video.currentTime}, token);
    if (!ok || atEnd || !processing || token !== runToken) break;
    targetTime += sampleInterval;
    if (targetTime > lastFrameTime) targetTime = lastFrameTime;
  }
  if (processing && token === runToken) finishProcessing();
}

async function processVideo() {
  const video = $("source-video");
  if (!detector || !video.src) {
    setStatus(t("no_video"), "error");
    return;
  }
  resetResults();
  lastPoses = [];
  frameIndex = 0;
  runToken += 1;
  const token = runToken;
  processing = true;
  video.pause();
  setStatus(t("processing"));
  $("analysis").textContent = t("processing");
  updateActionState();
  try {
    const seekOk = await seekVideo(video, 0);
    if (!seekOk) throw new Error("No se pudo preparar el primer frame del vídeo");
  } catch (error) {
    processing = false;
    setStatus(`${t("error")}: ${error?.message || String(error)}`, "error");
    updateActionState();
    return;
  }
  runProcessingLoop(token).catch((error) => {
    if (!processing || token !== runToken) return;
    stopProcessing();
    setStatus(`${t("error")}: ${error?.message || String(error)}`, "error");
  });
}

function finishProcessing() {
  if (!processing) return;
  processing = false;
  runToken += 1;
  pendingSeekCancel?.();
  pendingSeekCancel = null;
  $("source-video").pause();
  $("progress-bar").style.width = "100%";
  publishResults();
  syncCachedOverlay();
  setStatus(t("finished"), "success");
  $("analysis").textContent = `${t("finished")}: ${results.length} frames`;
  updateActionState();
}

function stopProcessing() {
  if (!processing) return;
  processing = false;
  runToken += 1;
  pendingSeekCancel?.();
  pendingSeekCancel = null;
  $("source-video").pause();
  publishResults();
  setStatus(t("stopped"));
  updateActionState();
}

function prepareVideo(file) {
  if (!file) return;
  if (processing) stopProcessing();
  if (videoUrl) URL.revokeObjectURL(videoUrl);
  videoUrl = URL.createObjectURL(file);
  const video = $("source-video");
  video.src = videoUrl;
  video.load();
  $("empty-state").classList.add("hidden");
  resetResults();
  lastPoses = [];
  setStatus(`${file.name} · ${Math.round(file.size / 1024 / 1024 * 10) / 10} MB`);
  updateActionState();
}

$("language").value = locale;
$("language").addEventListener("change", (event) => { locale = event.target.value; translate(); });
$("theme").addEventListener("click", () => { document.body.classList.toggle("dark"); drawOverlay(lastPoses); });
$("video-input").addEventListener("change", (event) => prepareVideo(event.target.files[0]));
$("load-model").addEventListener("click", loadModel);
$("process").addEventListener("click", processVideo);
$("stop").addEventListener("click", stopProcessing);
$("download-results").addEventListener("click", downloadResultsCsv);
$("source-video").addEventListener("loadedmetadata", () => { resizeCanvas(); updateActionState(); });
$("source-video").addEventListener("play", syncCachedOverlay);
$("source-video").addEventListener("pause", syncCachedOverlay);
$("source-video").addEventListener("timeupdate", syncCachedOverlay);
$("source-video").addEventListener("seeking", syncCachedOverlay);
$("source-video").addEventListener("seeked", syncCachedOverlay);
$("source-video").addEventListener("ended", () => { finishProcessing(); syncCachedOverlay(); });
$("confidence").addEventListener("input", (event) => {
  $("confidence-value").textContent = `${event.target.value}%`;
  drawOverlay(lastPoses);
});
["show-skeleton", "show-boxes", "show-keypoints"].forEach((id) => $(id).addEventListener("change", () => drawOverlay(lastPoses)));

translate();
updateActionState();
