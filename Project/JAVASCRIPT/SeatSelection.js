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

// ดึงข้อมูลขบวนรถไฟที่เลือกจาก URL
const trainId = parseInt(getQueryParam("trainId"));
const selectedTrain = mockTrains.find(train => train.id === trainId);

// ตัวแปรที่นั่งที่เลือก
let selectedSeats = [];
// จำนวนที่นั่งสูงสุดที่เลือกได้
const maxSelectableSeats = 4;
// ราคาต่อที่นั่ง
const seatPrice = 300;

// รายการที่นั่งพิเศษสำหรับผู้พิการและผู้สูงอายุ
const disabledSeatIds = ["A1", "A2", "B1", "B2"];
const elderSeatIds = ["A4", "A5", "B4", "B5"];

// ตรวจสอบว่าพบข้อมูลขบวนรถไฟหรือไม่ แล้วเรียกแสดงผล
if (selectedTrain) {
    renderSeatSelection();
} else {
    document.getElementById("seatTrainInfo").innerHTML = "<p style='color: red;'>ไม่พบข้อมูลขบวนรถไฟ</p>";
}

// ฟังก์ชันสร้างตารางที่นั่ง
function renderSeatSelection() {
    // รีเซ็ตค่าที่นั่งที่เลือก
    selectedSeats = [];

    // แสดงข้อมูลรถไฟ
    const seatTrainInfo = document.getElementById("seatTrainInfo");
    seatTrainInfo.innerHTML = `
        <p><strong>ต้นทาง:</strong> ${selectedTrain.from}</p>
        <p><strong>ปลายทาง:</strong> ${selectedTrain.to}</p>
        <p><strong>วันที่:</strong> ${selectedTrain.date}</p>
        <p><strong>เวลา:</strong> ${selectedTrain.time}</p>
    `;

    // (ตัวอย่าง) ฟังก์ชันย่อยสำหรับแสดง Recommended Tickets (ถ้ามี)
    function renderRecommendedTickets() {
        const container = document.getElementById("recommendedContainer");
        if (!container) return;
        container.innerHTML = "";
        recommendedTickets.forEach(ticket => {
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
            <img src="${ticket.image}" alt="${ticket.title}">
            <div class="card-content">
              <h4>${ticket.title}</h4>
              <p>${ticket.description}</p>
            </div>
          `;
          container.appendChild(card);
        });
    }

    // (ตัวอย่าง) ฟังก์ชันย่อยสำหรับแสดง Tickets Listing (ถ้ามี)
    function renderTicketsListing() {
        const container = document.getElementById("ticketsListing");
        if (!container) return;
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
        mockTrains.forEach(train => {
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
        container.innerHTML = tableHTML;
    }

    // สร้างตารางที่นั่งสำหรับรถไฟที่เลือก
    const seatMapContainer = document.getElementById("seatMap");
    let seatTableHTML = '<table class="seat-table"><tbody>';
    let seatIndex = 0;
    // สร้างแถว A ถึง J (10 แถว)
    for (let rowChar = 65; rowChar < 75; rowChar++) {
        const row = String.fromCharCode(rowChar);
        seatTableHTML += "<tr>";
        // --- กลุ่มซ้าย: 2 ที่นั่ง ---
        for (let col = 1; col <= 2; col++) {
            seatIndex++;
            const seatId = row + col;
            let seatTypeClass = "";
            if (disabledSeatIds.includes(seatId)) {
                seatTypeClass = " disabled";
            } else if (elderSeatIds.includes(seatId)) {
                seatTypeClass = " elder";
            }
            let occupied = (seatIndex > selectedTrain.seatsAvailable);
            if (occupied) {
                seatTableHTML += `<td><button class="seat occupied" disabled>${seatId}</button></td>`;
            } else {
                seatTableHTML += `<td><button class="seat${seatTypeClass}" onclick="toggleSeat(this, '${seatId}')">${seatId}</button></td>`;
            }
        }
        // --- ช่องว่างสำหรับทางเดิน (aisle) ---
        seatTableHTML += '<td class="aisle"></td>';
        // --- กลุ่มขวา: 3 ที่นั่ง ---
        for (let col = 3; col <= 5; col++) {
            seatIndex++;
            const seatId = row + col;
            let seatTypeClass = "";
            if (disabledSeatIds.includes(seatId)) {
                seatTypeClass = " disabled";
            } else if (elderSeatIds.includes(seatId)) {
                seatTypeClass = " elder";
            }
            let occupied = (seatIndex > selectedTrain.seatsAvailable);
            if (occupied) {
                seatTableHTML += `<td><button class="seat occupied" disabled>${seatId}</button></td>`;
            } else {
                seatTableHTML += `<td><button class="seat${seatTypeClass}" onclick="toggleSeat(this, '${seatId}')">${seatId}</button></td>`;
            }
        }
        seatTableHTML += "</tr>";
    }
    seatTableHTML += "</tbody></table>";
    seatMapContainer.innerHTML = seatTableHTML;

    // แสดงข้อความเริ่มต้นสำหรับที่นั่งที่เลือก
    const selectedInfo = document.getElementById("selectedSeatsInfo");
    selectedInfo.innerHTML = "<p>ยังไม่ได้เลือกที่นั่ง</p>";
}

// ฟังก์ชันสำหรับคลิกเลือก/ยกเลิกที่นั่ง
window.toggleSeat = function (elem, seatId) {
    if (selectedSeats.includes(seatId)) {
        // ถ้าคลิกซ้ำ ให้ยกเลิกการเลือก
        selectedSeats = selectedSeats.filter(id => id !== seatId);
        elem.classList.remove("selected");
    } else {
        if (selectedSeats.length >= Math.min(maxSelectableSeats, selectedTrain.seatsAvailable)) {
            alert(`เลือกได้สูงสุด ${Math.min(maxSelectableSeats, selectedTrain.seatsAvailable)} ที่นั่ง`);
            return;
        }
        selectedSeats.push(seatId);
        elem.classList.add("selected");
    }
    updateSelectedSeatsInfo();
};

// ฟังก์ชันอัปเดตข้อมูลที่นั่งที่เลือก
function updateSelectedSeatsInfo() {
    const infoDiv = document.getElementById("selectedSeatsInfo");
    if (selectedSeats.length === 0) {
        infoDiv.innerHTML = "<p>ยังไม่ได้เลือกที่นั่ง</p>";
    } else {
        let html = "<p><strong>ที่นั่งที่เลือก:</strong></p><ul>";
        selectedSeats.forEach(id => {
            let typeText = "ที่นั่งปกติ";
            if (disabledSeatIds.includes(id)) {
                typeText = "ที่นั่งสำหรับผู้พิการ";
            } else if (elderSeatIds.includes(id)) {
                typeText = "ที่นั่งสำหรับผู้สูงอายุ";
            }
            html += `<li>${id} (${typeText}) - ${seatPrice} บาท</li>`;
        });
        html += `</ul><p><strong>ราคารวม:</strong> ${selectedSeats.length * seatPrice} บาท</p>`;
        infoDiv.innerHTML = html;
    }
}

// ปุ่มยืนยันการเลือกที่นั่ง
document.getElementById("btnConfirmSeats").addEventListener("click", () => {
    if (!selectedTrain || selectedSeats.length === 0) {
        alert("กรุณาเลือกที่นั่งอย่างน้อย 1 ที่นั่ง");
        return;
    }
    // บันทึกข้อมูลที่นั่งลงใน selectedTrain (ใน mock data)
    selectedTrain.selectedSeats = [...selectedSeats];
    selectedTrain.totalPrice = selectedSeats.length * seatPrice;
    selectedTrain.seatsAvailable -= selectedSeats.length;
    alert("การเลือกที่นั่งเสร็จสิ้น");
    // สามารถเพิ่มโค้ดเพื่อไปยังหน้าชำระเงินหรือหน้าถัดไปได้ที่นี่
});
