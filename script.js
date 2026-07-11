async function checkOrder() {
  const order = document.getElementById("order").value.trim();

  if (!order) {
    alert("กรุณากรอกเลขออเดอร์");
    return;
  }

  const result = document.getElementById("result");
  result.innerHTML = "🔄 กำลังค้นหาข้อมูล...";

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxD9GKQWOG5SzE6Qi6FL33PQLuue2t05fYKUIOecUfG0zPBvTs2U_CHgYVyxNzObXtPLQ/exec?order=" +
      encodeURIComponent(order)
    );

    const data = await response.json();

    if (data.error) {
      result.innerHTML = `
        <h3>❌ ไม่พบเลขออเดอร์</h3>
      `;
    } else {
      result.innerHTML = `
        <h3>📦 ผลการค้นหา</h3>
        <p><strong>เลขออเดอร์:</strong> ${data.order}</p>
        <p><strong>สถานะ:</strong> ${data.status}</p>
        <p><strong>เลขพัสดุ:</strong> ${data.tracking}</p>
        <p><strong>หมายเหตุ:</strong> ${data.note}</p>
      `;
    }

  } catch (err) {
    result.innerHTML = `
      <h3>⚠️ ไม่สามารถเชื่อมต่อระบบได้</h3>
    `;
    console.error(err);
  }
}
