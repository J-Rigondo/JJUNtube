const recordContainer = document.getElementById('jsRecordContainer');
const recordBtn = document.getElementById('jsRecordBtn');
const videoPreview = document.getElementById('jsVideoPreview');

let videoRecorder;

const handleRecordData = (event) => {
  const { data: videoFile } = event;
  const link = document.createElement('a');
  link.href = URL.createObjectURL(videoFile);
  link.download = 'record.webm';
  document.body.appendChild(link);
  link.click();
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener('click', stopRecording);
  recordBtn.addEventListener('click', getMedia);
  recordBtn.innerHTML = 'Start Recording';
};

const startRecording = (stream) => {
  videoRecorder = new MediaRecorder(stream);
  videoRecorder.start();
  videoRecorder.addEventListener('dataavailable', handleRecordData);
  recordBtn.addEventListener('click', stopRecording);
};

const getMedia = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });
    videoPreview.srcObject = stream;
    videoPreview.play();
    recordBtn.innerHTML = 'Stop recording';
    startRecording(stream);
  } catch (error) {
    console.log(error);
    recordBtn.innerHTML = 'Device not found';
    recordBtn.style.backgroundColor = '#b91f1f';
  } finally {
    recordBtn.removeEventListener('click', getMedia);
  }
};
function init() {
  recordBtn.addEventListener('click', getMedia);
  //recordBtn.onclick = getMedia; 이렇게 쓰면 이벤트 1개 밖에 추가 못함
}

if (recordContainer) {
  init();
}
