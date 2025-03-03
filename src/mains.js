//=============================
    // 1) ระบบสลับภาษา (TH/EN)
   
    const translations = {
        
      th: {
        
        menuHome: "หน้าแรก",
        menuLogin: "เข้าสู่ระบบ",
        menuSearch: "ค้นหาตั๋วรถไฟ",
        menuPayment: "ชำระเงิน",
        menuHistory: "ประวัติการจอง",

        homeTitle: "ยินดีต้อนรับสู่ระบบจองตั๋วรถไฟ",
        homeDesc: "โปรดเข้าสู่ระบบเพื่อใช้งาน หรือเลือกดูแนะนำตั๋วและรายการตั๋วจากสถานีต่างๆ",
        recommended:"แนะนำตั๋วและโปรโมชัน",
        ticket:"ตั๋วรถไฟสำหรับสถานีต่างๆ",

        loginTitle: "เข้าสู่ระบบ",
        labelUsername: "ชื่อผู้ใช้ (Username)",
        labelPassword: "รหัสผ่าน (Password)",
        btnLogin: "ล็อกอิน",

        searchTitle: "ค้นหาตั๋วรถไฟ",
        departure_station:"-- เลือกต้นทาง --",
        Bangkok:"กรุงเทพฯ",
        ChiangMai:"เชียงใหม่",
        Korat:"โคราช",
        arrival_station:"-- เลือกปลายทาง --",

        labelFrom: "ต้นทาง",
        labelTo: "ปลายทาง",
        labelDateSearch: "วันที่เดินทาง",
        btnSearchTickets: "ค้นหา",

        paymentTitle: "ชำระเงิน",
        method:"-- เลือกช่องทาง --",
        labelPaymentMethod: "ช่องทางชำระเงิน",
        labelPaymentDetails: "รายละเอียดการชำระเงิน",
        btnConfirmPayment: "ยืนยันการชำระเงิน",

        historyTitle: "ประวัติการจอง",

        footerText: "© 2025 TrainBooking. All Rights Reserved.",
      },
      en: {
       
        menuHome: "Home",
        menuLogin: "Login",
        menuSearch: "Search Tickets",
        menuPayment: "Payment",
        menuHistory: "History",

        homeTitle: "Welcome to Train Ticket Booking System",
        homeDesc: "Please login to proceed, or check out our recommended tickets and ticket listings.",
        recommended:"Recommend tickets and promotions",  
        ticket:"Train tickets for various stations",

        loginTitle: "Login",
        labelUsername: "Username",
        labelPassword: "Password",
        btnLogin: "Login",

        searchTitle: "Search Train Tickets",
        departure_station:"-- Select origin --",
        Bangkok:"Bangkok",
        ChiangMai:"Chiang Mai",
        Korat:"Korat",
        arrival_station:"--Select destination--",

        labelFrom: "From",
        labelTo: "To",
        labelDateSearch: "Travel Date",
        btnSearchTickets: "Search",

        paymentTitle: "Payment",
        method:"-- Choose a method --",
        labelPaymentMethod: "Payment Method",
        labelPaymentDetails: "Payment Details",
        btnConfirmPayment: "Confirm Payment",

        historyTitle: "Booking History",

        footerText: "© 2025 TrainBooking. All Rights Reserved.",
      },
    };
function setLanguage(lang) {
Object.keys(translations[lang]).forEach((id) => {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = translations[lang][id];
  }
});
updateTableHeaders(lang);
}

function updateTableHeaders(lang) {
// Update dynamic table headers if needed.
}

//=============================
// 1.5) Dark Mode Toggle
function toggleDarkMode() {
document.body.classList.toggle('dark-mode');
}
document.getElementById('btnDarkMode').addEventListener('click', toggleDarkMode);

//=============================
// 2) ระบบนำทาง (Navigation)
const homeSection = document.getElementById("homeSection");
const loginSection = document.getElementById("loginSection");
const searchSection = document.getElementById("searchSection");
const seatSelectionSection = document.getElementById("seatSelectionSection");
const paymentSection = document.getElementById("paymentSection");
const historySection = document.getElementById("historySection");
const AdminSection = document.getElementById("adminSection");

function showSection(sectionId) {
  [homeSection, loginSection, searchSection, seatSelectionSection, paymentSection, historySection, AdminSection].forEach(sec => {
    sec.classList.remove("active");
  });
  document.getElementById(sectionId).classList.add("active");
}

//=============================
// 3) ระบบล็อกอิน (Login)
let currentUser = null;
const loginError = document.getElementById("loginError");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

function validatePassword(password) {
const hasUpperCase = /[A-Z]/.test(password);
const hasLowerCase = /[a-z]/.test(password);
const hasDigit = /[0-9]/.test(password);
return hasUpperCase && hasLowerCase && hasDigit;
}

document.getElementById("btnLogin").addEventListener("click", () => {
const username = usernameInput.value.trim();
const password = passwordInput.value;
if (!username || !password) {
  loginError.textContent = "(TH)กรุณากรอกชื่อผู้ใช้และรหัสผ่าน (EN)Please enter your username and password.";
  return;
}
if (!validatePassword(password)) {
  loginError.textContent = "(TH)รหัสผ่านต้องมีตัวพิมพ์ใหญ่, พิมพ์เล็ก, และตัวเลข อย่างน้อย 1 ตัว(EN)The password must contain at least one uppercase letter, one lowercase letter, and one number.";
  return;
}
currentUser = { username };
loginError.textContent = "";
alert("Login Successful🎉!");
showSection("homeSection");
renderRecommendedTickets();
renderTicketsListing();
});

//=============================
// 4) ระบบค้นหาตั๋วรถไฟ (Search Tickets)
const searchForm = document.getElementById("searchForm");
const searchResult = document.getElementById("searchResult");
const mockTrains = [
{ id: 1, from: "Bangkok", to: "Chiang Mai", date: "2025-03-10", time: "08:00", seatsAvailable: 50 },
{ id: 2, from: "Bangkok", to: "Chiang Mai", date: "2025-03-10", time: "13:00", seatsAvailable: 30 },
{ id: 3, from: "Bangkok", to: "Korat",      date: "2025-03-11", time: "09:30", seatsAvailable: 20 },
{ id: 4, from: "Chiang Mai", to: "Bangkok", date: "2025-03-12", time: "18:00", seatsAvailable: 25 },
];

searchForm.addEventListener("submit", (e) => {
e.preventDefault();
if (!currentUser) {
  alert("กรุณาเข้าสู่ระบบก่อนค้นหาตั๋วรถไฟ");
  return;
}
const from = document.getElementById("searchFrom").value;
const to = document.getElementById("searchTo").value;
const date = document.getElementById("searchDate").value;
if (!from || !to || !date) {
  alert("กรุณากรอกข้อมูลให้ครบ");
  return;
}
if (from === to) {
  alert("ต้นทางและปลายทางต้องไม่เหมือนกัน");
  return;
}
const filtered = mockTrains.filter(train => train.from === from && train.to === to && train.date === date);
if (filtered.length === 0) {
  searchResult.innerHTML = "<p>ไม่พบรถไฟที่คุณค้นหา</p>";
  return;
}
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
});

//=============================
// 5) ระบบเลือกที่นั่ง (Seat Selection)
let selectedTrain = null;
let selectedSeats = [];
const maxSelectableSeats = 4;
const seatPrice = 300;
const disabledSeatIds = ["A1","A2","B1","B2"];
const elderSeatIds    = ["A4","A5","B4","B5"];

window.bookTrain = function(trainId) {
selectedTrain = mockTrains.find(t => t.id === trainId);
if (!selectedTrain) return;
showSection("seatSelectionSection");
renderSeatSelection();
};

function renderSeatSelection() {
if (!selectedTrain) return;
selectedSeats = [];
const seatTrainInfo = document.getElementById("seatTrainInfo");
seatTrainInfo.innerHTML = `
  <p><strong>ต้นทาง:</strong> ${selectedTrain.from}</p>
  <p><strong>ปลายทาง:</strong> ${selectedTrain.to}</p>
  <p><strong>วันที่:</strong> ${selectedTrain.date}</p>
  <p><strong>เวลา:</strong> ${selectedTrain.time}</p>
`;
const seatMapContainer = document.getElementById("seatMap");
let seatTableHTML = '<table class="seat-table"><tbody>';
const totalSeats = 50; // สมมติ 10 แถว x 5 ที่นั่ง = 50 ที่นั่ง
let seatIndex = 0;
for (let rowChar = 65; rowChar < 65 + 10; rowChar++) {
  const row = String.fromCharCode(rowChar);
  seatTableHTML += "<tr>";
  for (let col = 1; col <= 5; col++) {
    seatIndex++;
    const seatId = row + col;
    let seatTypeClass = "";
    if (disabledSeatIds.includes(seatId)) {
      seatTypeClass = " disabled";
    } else if (elderSeatIds.includes(seatId)) {
      seatTypeClass = " elder";
    }
    let occupied = false;
    if (seatIndex > selectedTrain.seatsAvailable) {
      occupied = true;
    }
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
document.getElementById("selectedSeatsInfo").innerHTML = "<p>ยังไม่ได้เลือกที่นั่ง</p>";
}

window.toggleSeat = function(elem, seatId) {
if (selectedSeats.includes(seatId)) {
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

function updateSelectedSeatsInfo() {
const infoDiv = document.getElementById("selectedSeatsInfo");
if (selectedSeats.length === 0) {
  infoDiv.innerHTML = "<p>ยังไม่ได้เลือกที่นั่ง</p>";
} else {
  let html = "<p><strong>ที่นั่งที่เลือก:</strong></p><ul>";
  selectedSeats.forEach(id => {
    let typeText = "ที่นั่งปกติ";
    if (disabledSeatIds.includes(id)) {
      typeText = "ที่นั่งผู้พิการ";
    } else if (elderSeatIds.includes(id)) {
      typeText = "ที่นั่งผู้สูงอายุ";
    }
    html += `<li>${id} (${typeText}) - ${seatPrice} บาท</li>`;
  });
  html += `</ul><p><strong>ราคารวม:</strong> ${selectedSeats.length * seatPrice} บาท</p>`;
  infoDiv.innerHTML = html;
}
}

document.getElementById("btnConfirmSeats").addEventListener("click", () => {
if (!selectedTrain || selectedSeats.length === 0) {
  alert("กรุณาเลือกที่นั่งอย่างน้อย 1 ที่นั่ง");
  return;
}
selectedTrain.selectedSeats = [...selectedSeats];
selectedTrain.totalPrice = selectedSeats.length * seatPrice;
selectedTrain.seatsAvailable -= selectedSeats.length;
showSection("paymentSection");
renderPaymentInfo();
});

//=============================
// 6) ชำระเงิน (Payment)
const paymentInfo = document.getElementById("paymentInfo");
function renderPaymentInfo() {
if (!selectedTrain) {
  paymentInfo.innerHTML = "<p>ยังไม่ได้เลือกรถไฟ</p>";
  return;
}
let freeSeatHTML = "";
let seatsInfoHTML = "";
if (!selectedTrain.selectedSeats || selectedTrain.selectedSeats.length === 0) {
  freeSeatHTML = `<p><strong>ที่นั่งว่าง:</strong> ${selectedTrain.seatsAvailable}</p>`;
} else {
  seatsInfoHTML = `
    <p><strong>ที่นั่งที่เลือก:</strong> ${selectedTrain.selectedSeats.join(", ")}</p>
    <p><strong>ราคารวม:</strong> ${selectedTrain.totalPrice} บาท</p>
  `;
}
paymentInfo.innerHTML = `
  <p><strong>ต้นทาง:</strong> ${selectedTrain.from}</p>
  <p><strong>ปลายทาง:</strong> ${selectedTrain.to}</p>
  <p><strong>วันที่:</strong> ${selectedTrain.date}</p>
  <p><strong>เวลา:</strong> ${selectedTrain.time}</p>
  ${freeSeatHTML}
  ${seatsInfoHTML}
`;
}

const paymentForm = document.getElementById("paymentForm");
const paymentResult = document.getElementById("paymentResult");

paymentForm.addEventListener("submit", (e) => {
e.preventDefault();
if (!selectedTrain) {
  alert("ไม่พบข้อมูลรถไฟที่ต้องการชำระเงิน");
  return;
}
if (!currentUser) {
  alert("กรุณาเข้าสู่ระบบก่อนทำการชำระเงิน");
  return;
}
const paymentMethod = document.getElementById("paymentMethod").value;
const paymentDetails = document.getElementById("paymentDetails").value;
if (!paymentMethod || !paymentDetails) {
  alert("กรุณากรอกข้อมูลการชำระเงินให้ครบ");
  return;
}
paymentResult.innerHTML = `<p style="color: green;">ชำระเงินสำเร็จ! ระบบได้บันทึกการจองเรียบร้อย</p>`;
saveBookingHistory({
  username: currentUser.username,
  from: selectedTrain.from,
  to: selectedTrain.to,
  date: selectedTrain.date,
  time: selectedTrain.time,
  seats: selectedTrain.selectedSeats || [],
  totalPrice: selectedTrain.totalPrice || 0,
  paymentMethod: paymentMethod,
  bookingDate: new Date().toLocaleString(),
});
selectedTrain = null;
selectedSeats = [];
renderPaymentInfo();
paymentForm.reset();
});

//=============================
// 7) ประวัติการจอง (History)
const historyList = document.getElementById("historyList");

function saveBookingHistory(booking) {
let historyData = JSON.parse(localStorage.getItem("bookingHistory")) || [];
historyData.push(booking);
localStorage.setItem("bookingHistory", JSON.stringify(historyData));
}

function loadBookingHistory() {
let historyData = JSON.parse(localStorage.getItem("bookingHistory")) || [];
if (historyData.length === 0) {
  historyList.innerHTML = "<p>ยังไม่มีประวัติการจอง</p>";
  return;
}
let html = "";
historyData.forEach(item => {
  if (currentUser && item.username === currentUser.username) {
    html += `
      <div class="history-item">
        <p><strong>จาก:</strong> ${item.from}</p>
        <p><strong>ไป:</strong> ${item.to}</p>
        <p><strong>วันที่:</strong> ${item.date}</p>
        <p><strong>เวลา:</strong> ${item.time}</p>
        ${item.seats && item.seats.length > 0 ? `<p><strong>ที่นั่ง:</strong> ${item.seats.join(", ")}</p>` : ""}\n          ${item.totalPrice ? `<p><strong>ราคารวม:</strong> ${item.totalPrice} บาท</p>` : ""}\n          <p><strong>ช่องทางชำระเงิน:</strong> ${item.paymentMethod}</p>\n          <p><strong>จองเมื่อ:</strong> ${item.bookingDate}</p>\n        </div>\n      `;
  }
});
historyList.innerHTML = html || "<p>ยังไม่มีประวัติการจองของผู้ใช้นี้</p>";
}

//=============================
// 8) Recommended Tickets & Tickets Listing (Home)
const recommendedTickets = [
{
  id: 101,
  from: "Bangkok",
  to: "Chiang Mai",
  image: "https://via.placeholder.com/280x150/2c62ec/ffffff?text=Bangkok+to+Chiang+Mai",
  title: "Bangkok to Chiang Mai",
  description: "ตั๋วโปรสุดคุ้ม ลดราคาพิเศษ!"
},
{
  id: 102,
  from: "Bangkok",
  to: "Korat",
  image: "https://via.placeholder.com/280x150/2c62ec/ffffff?text=Bangkok+to+Korat",
  title: "Bangkok to Korat",
  description: "โปรโมชั่นสำหรับนักท่องเที่ยว"
},
{
  id: 103,
  from: "Chiang Mai",
  to: "Bangkok",
  image: "https://via.placeholder.com/280x150/2c62ec/ffffff?text=Chiang+Mai+to+Bangkok",
  title: "Chiang Mai to Bangkok",
  description: "จองด่วน! ที่นั่งจำนวนจำกัด"
}
];

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

//=============================
// 9) การสลับ Section ผ่านเมนู
document.getElementById("menuHome").addEventListener("click", () => {
showSection("homeSection");
renderRecommendedTickets();
renderTicketsListing();
});
document.getElementById("menuLogin").addEventListener("click", () => {
showSection("loginSection");
});
document.getElementById("menuSearch").addEventListener("click", () => {
if (!currentUser) {
  alert("กรุณาเข้าสู่ระบบก่อน!");
  return;
}
showSection("searchSection");
});
document.getElementById("menuPayment").addEventListener("click", () => {
if (!currentUser) {
  alert("กรุณาเข้าสู่ระบบก่อน!");
  return;
}
showSection("paymentSection");
renderPaymentInfo();
});
document.getElementById("menuHistory").addEventListener("click", () => {
if (!currentUser) {
  alert("กรุณาเข้าสู่ระบบก่อน!");
  return;
}
showSection("historySection");
loadBookingHistory();
});

//=============================
// 10) สลับภาษา
const btnTH = document.getElementById("btnTH");
const btnEN = document.getElementById("btnEN");

btnTH.addEventListener("click", () => { setLanguage("th"); });
btnEN.addEventListener("click", () => { setLanguage("en"); });

// ตรวจสอบสิทธิ์การเข้าถึง Admin และซ่อนเมนูสำหรับลูกค้าธรรมดา
function checkAdminAccess() {
  if (!currentUser || currentUser.role !== 'admin') {
    document.getElementById("adminSection").style.display = "none"; // ซ่อนส่วน Admin
    document.getElementById("menuAdmin").style.display = "none"; // ซ่อนเมนู Admin
  } else {
    document.getElementById("adminSection").style.display = "block";
    document.getElementById("menuAdmin").style.display = "block";
  }
}

// กำหนดให้ตรวจสอบสิทธิ์ทุกครั้งที่มีการเข้าสู่ระบบ
document.getElementById("btnLogin").addEventListener("click", () => {
  // สมมติให้ username "admin" เป็นผู้ดูแลระบบ
  const username = document.getElementById("username").value.trim();
  currentUser = { username, role: username.toLowerCase() === "admin" ? "admin" : "user" };

  alert("เข้าสู่ระบบสำเร็จ!");
  checkAdminAccess();
  showSection("homeSection");
});

// ฟังก์ชันสำหรับแสดงหน้า Admin Dashboard (เฉพาะ Admin เท่านั้น)
document.getElementById("menuAdmin").addEventListener("click", () => {
  if (!currentUser || currentUser.role !== 'admin') {
    alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
    return;
  }
  showSection("homeSection");
  renderTrainList();
  loadBookingHistory(true); // โหลดประวัติการจองทั้งหมด
});

// ฟังก์ชันเพิ่มตั๋วรถไฟ
document.getElementById("addTrainForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!currentUser || currentUser.role !== 'admin') {
    alert("คุณไม่มีสิทธิ์เพิ่มตั๋ว");
    return;
  }

  // ดึงค่าจากฟอร์ม
  const from = document.getElementById("trainFrom").value.trim();
  const to = document.getElementById("trainTo").value.trim();
  const date = document.getElementById("trainDate").value;
  const time = document.getElementById("trainTime").value;
  const seats = parseInt(document.getElementById("trainSeats").value);

  if (!from || !to || !date || !time || isNaN(seats) || seats < 1) {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    return;
  }

  // เพิ่มข้อมูลตั๋วใหม่ลงไป
  const newTrain = {
    id: Date.now(), // ใช้ Timestamp เป็น id
    from,
    to,
    date,
    time,
    seatsAvailable: seats
  };

  mockTrains.push(newTrain);
  alert("เพิ่มตั๋วรถไฟสำเร็จ!");
  renderTrainList(); // รีเฟรชตารางตั๋ว
  document.getElementById("addTrainForm").reset();
});

// ฟังก์ชันแสดงรายการตั๋วรถไฟ (รวมปุ่มลบ)
function renderTrainList() {
  const tableBody = document.getElementById("trainListBody");
  tableBody.innerHTML = "";
  
  if (mockTrains.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='6'>ไม่มีตั๋วรถไฟ</td></tr>";
    return;
  }

  mockTrains.forEach((train) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${train.from}</td>
      <td>${train.to}</td>
      <td>${train.date}</td>
      <td>${train.time}</td>
      <td>${train.seatsAvailable}</td>
      <td><button class="deleteTrainBtn" data-id="${train.id}">❌</button></td>
    `;
    tableBody.appendChild(row);
  });
}

// ลบตั๋วรถไฟ
document.getElementById("trainListTable").addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteTrainBtn")) {
    const trainId = parseInt(e.target.getAttribute("data-id"));
    const index = mockTrains.findIndex((t) => t.id === trainId);
    if (index !== -1) {
      mockTrains.splice(index, 1);
      alert("ลบตั๋วรถไฟสำเร็จ!");
      renderTrainList();
    }
  }
});

// แสดงประวัติการจองทั้งหมด (เฉพาะ Admin)
function loadBookingHistory(isAdmin = false) {
  const historyContainer = document.getElementById("adminBookingHistory");
  if (!isAdmin || currentUser.role !== "admin") return;

  historyContainer.innerHTML = "";
  if (bookingHistory.length === 0) {
    historyContainer.innerHTML = "<p>ไม่มีประวัติการจอง</p>";
    return;
  }

  bookingHistory.forEach((item) => {
    const historyItem = document.createElement("div");
    historyItem.classList.add("history-item");
    historyItem.innerHTML = `
      <p><strong>ผู้ใช้:</strong> ${item.username}</p>
      <p><strong>จาก:</strong> ${item.from} → <strong>ไป:</strong> ${item.to}</p>
      <p><strong>วันที่:</strong> ${item.date}</p>
      <p><strong>เวลา:</strong> ${item.time}</p>
      <p><strong>ที่นั่ง:</strong> ${item.seats.join(", ")}</p>
      <p><strong>ราคารวม:</strong> ${item.totalPrice} บาท</p>
      <p><strong>ช่องทางชำระเงิน:</strong> ${item.paymentMethod}</p>
      <p><strong>วันที่จอง:</strong> ${item.bookingDate}</p>
    `;
    historyContainer.appendChild(historyItem);
  });
}




// เรียกใช้งานฟังก์ชันตรวจสอบสิทธิ์เมื่อโหลดหน้า
checkAdminAccess();


// ตั้งค่าเริ่มต้น
setLanguage("th");
showSection("homeSection");
renderRecommendedTickets();
renderTicketsListing();

