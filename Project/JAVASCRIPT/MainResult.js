// Mock Data รถไฟ
const mockTrains = [
  { id: 1, from: "Bangkok", to: "Chiang Mai", date: "2025-03-10", time: "08:00", seatsAvailable: 50 },
  { id: 2, from: "Bangkok", to: "Chiang Mai", date: "2025-03-10", time: "13:00", seatsAvailable: 30 },
  { id: 3, from: "Bangkok", to: "Korat", date: "2025-03-11", time: "09:30", seatsAvailable: 20 },
  { id: 4, from: "Chiang Mai", to: "Bangkok", date: "2025-03-12", time: "18:00", seatsAvailable: 25 },
];

// ฟังก์ชันสำหรับดึงพารามิเตอร์จาก URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// ดึงค่าจาก URL
const from = getQueryParam("from");
const to = getQueryParam("to");
const date = getQueryParam("date");

// ตรวจสอบข้อมูลที่ได้รับจากฟอร์ม
if (!from || !to || !date) {
  document.getElementById("searchResult").innerHTML = "<p style='color: red;'>กรุณากรอกข้อมูลให้ครบทุกช่อง</p>";
} else if (from.toLowerCase() === to.toLowerCase()) {
  document.getElementById("searchResult").innerHTML = "<p style='color: red;'>ต้นทางและปลายทางต้องไม่เหมือนกัน</p>";
} else {
  // กรองข้อมูลโดยเปรียบเทียบแบบไม่คำนึงถึงตัวพิมพ์ และไม่สนใจเวลาของรถไฟ
  const filtered = mockTrains.filter(train => {
      return train.from.toLowerCase() === from.toLowerCase() &&
             train.to.toLowerCase() === to.toLowerCase() &&
             train.date === date;
  });

  const searchResult = document.getElementById("searchResult");
  if (filtered.length === 0) {
      searchResult.innerHTML = "<p>ไม่พบรถไฟที่คุณค้นหา</p>";
  } else {
      let tableHTML = `
        <table class="tickets-table">
            <thead>
                <tr>
                    <th>ต้นทาง</th>
                    <th>ปลายทาง</th>
                    <th>วันที่</th>
                    <th>เวลา</th>
                    <th>ที่นั่งว่าง</th>
                    <th>จอง</th>
                </tr>
            </thead>
            <tbody>
      `;
      filtered.forEach(train => {
          tableHTML += `
            <tr>
                <td>${train.from}</td>
                <td>${train.to}</td>
                <td>${train.date}</td>
                <td>${train.time}</td>
                <td>${train.seatsAvailable}</td>
                <td><button onclick="bookTrain(${train.id})">จอง</button></td>
            </tr>
          `;
      });
      tableHTML += `</tbody></table>`;
      searchResult.innerHTML = tableHTML;
  }
}

// ฟังก์ชันส่งต่อไปยังหน้าการเลือกที่นั่ง
function bookTrain(trainId) {
  window.location.href = `seatSelection.html?trainId=${trainId}`;
}
