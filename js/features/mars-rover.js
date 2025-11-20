// js/features/mars-rover.js
export default function () {
  const API_KEY = "DEMO KEY"; 

  document.getElementById("content-area").innerHTML = `
    <h2 class="mb-4">Mars Rover Photos</h2>

    <div class="row">
      <div class="col-lg-8 mx-auto">

        <div class="card p-4 mb-4 bg-dark text-light shadow">

          <label class="form-label">Pilih Rover:</label>
          <select id="rover" class="form-select mb-3">
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
          </select>

          <label class="form-label">Sol (hari di Mars):</label>
          <input id="sol" type="number" class="form-control mb-3" value="1000">

          <label class="form-label">Kamera:</label>
          <select id="camera" class="form-select mb-4">
            <option value="">Semua Kamera</option>
            <option value="FHAZ">Front Hazard Camera</option>
            <option value="RHAZ">Rear Hazard Camera</option>
            <option value="MAST">Mast Camera</option>
            <option value="NAVCAM">Navigation Camera</option>
          </select>

          <button id="load" class="btn btn-primary btn-lg w-100">Tampilkan Foto</button>
        </div>

        <div id="result"></div>

      </div>
    </div>
  `;

  const roverInput = document.getElementById("rover");
  const solInput = document.getElementById("sol");
  const cameraInput = document.getElementById("camera");
  const result = document.getElementById("result");

  const loadMarsPhotos = async () => {
    const rover = roverInput.value;
    const sol = solInput.value;
    const camera = cameraInput.value;

    result.innerHTML = `
      <div class="text-center my-5">
        <div class="spinner-border text-light" style="width:4rem;height:4rem;"></div>
      </div>
    `;

    try {
      const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.photos || data.photos.length === 0) {
        result.innerHTML = `<div class="alert alert-warning text-center">Tidak ada foto ditemukan untuk parameter tersebut.</div>`;
        return;
      }

      result.innerHTML = data.photos
        .map(
          (p) => `
          <div class="card mb-4 bg-dark text-light shadow">
            <img src="${p.img_src}" class="card-img-top rounded">
            <div class="card-body">
              <h5 class="card-title">${p.camera.full_name}</h5>
              <p class="card-text mb-1"><strong>Tanggal:</strong> ${p.earth_date}</p>
              <p class="card-text mb-1"><strong>Rover:</strong> ${p.rover.name}</p>
              <p class="card-text"><strong>Status Rover:</strong> ${p.rover.status}</p>
            </div>
          </div>
        `
        )
        .join("");
    } catch (err) {
      result.innerHTML = `
        <div class="alert alert-danger">Error: ${err.message}</div>
      `;
    }
  };

  document.getElementById("load").onclick = loadMarsPhotos;

  // Optional: otomatis tampilkan saat pertama dibuka
  loadMarsPhotos();
}
