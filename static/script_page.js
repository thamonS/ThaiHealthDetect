// document.getElementById('verifyBtn').addEventListener('click', function() {
//     const newsText = document.getElementById('newsInput').value;
//     const resultArea = document.getElementById('resultArea');
//     const btnText = document.getElementById('btnText');
//     const btnLoader = document.getElementById('btnLoader');
//     const verifyBtn = document.getElementById('verifyBtn');

//     // ตรวจสอบว่ามีข้อความหรือไม่
//     if (!newsText.trim()) {
//         alert("กรุณากรอกข้อความก่อนตรวจสอบ");
//         return;
//     }

//     // 1. เปลี่ยนสถานะปุ่มเป็น Loading
//     verifyBtn.disabled = true;
//     btnText.textContent = "กำลังประมวลผล...";
//     btnLoader.style.display = "inline-block";
//     resultArea.style.display = "none";

//     // 2. ส่งข้อมูลไปหา Python (web_app.py)
//     fetch('/verify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: newsText }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         // 3. เมื่อได้คำตอบกลับมา (หยุด Loading)
//         verifyBtn.disabled = false;
//         btnText.textContent = "ตรวจสอบ (Verify)";
//         btnLoader.style.display = "none";

//         // 4. แสดงผลลัพธ์
//         resultArea.style.display = "block";
//         // ล้าง class สีเก่าออกแล้วใส่สีใหม่ตามผลลัพธ์
//         resultArea.className = "card-footer alert-" + data.class; 
        
//         document.getElementById('resStatus').textContent = data.result;
//         document.getElementById('resConf').textContent = data.confidence;
//         document.getElementById('resReason').textContent = data.reason;
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         verifyBtn.disabled = false;
//         btnText.textContent = "ลองใหม่อีกครั้ง";
//         btnLoader.style.display = "none";
//         alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
//     });
// });


// document.addEventListener('DOMContentLoaded', function() {
    
//     document.getElementById('verifyBtn').addEventListener('click', function() {
//         const newsInput = document.getElementById('newsInput');
//         const newsText = newsInput.value;
//         const resultArea = document.getElementById('resultArea');
        
//         // Button elements
//         const btnText = document.getElementById('btnText');
//         const btnLoader = document.getElementById('btnLoader');
//         const verifyBtn = document.getElementById('verifyBtn');

//         // Validation
//         if (!newsText.trim()) {
//             newsInput.classList.add('is-invalid');
//             return;
//         } else {
//             newsInput.classList.remove('is-invalid');
//         }

//         // 1. UI Loading State
//         verifyBtn.disabled = true;
//         btnText.textContent = "กำลังประมวลผล...";
//         btnLoader.style.display = "inline-block";
//         resultArea.style.display = "none";
//         resultArea.className = "card-footer"; // Reset classes

//         // 2. Fetch API
//         fetch('/verify', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ text: newsText }),
//         })
//         .then(response => response.json())
//         .then(data => {
//             // 3. Reset UI
//             verifyBtn.disabled = false;
//             btnText.textContent = "Verify News (ตรวจสอบข่าว)";
//             btnLoader.style.display = "none";

//             // 4. Show Results
//             resultArea.style.display = "block";
//             // Add Bootstrap alert class based on result
//             resultArea.classList.add('alert-' + data.class);
            
//             document.getElementById('resStatus').textContent = data.result;
//             document.getElementById('resConf').textContent = data.confidence;
//             document.getElementById('resReason').textContent = data.reason;
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//             verifyBtn.disabled = false;
//             btnText.textContent = "ลองใหม่อีกครั้ง";
//             btnLoader.style.display = "none";
//             alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
//         });
//     });
// });

//------------------------------1---------------------------------

document.addEventListener('DOMContentLoaded', function() {
    
    const verifyBtn = document.getElementById('verifyBtn');
    const newsInput = document.getElementById('newsInput');
    const resultArea = document.getElementById('resultArea');
    
    // Elements inside Result Area
    const resStatus = document.getElementById('resStatus');
    const resConf = document.getElementById('resConf');
    const resReason = document.getElementById('resReason');
    const resIcon = document.getElementById('resIcon');

    // Button Elements
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');

    verifyBtn.addEventListener('click', function() {
        const text = newsInput.value.trim();

        // 1. Validation
        if (!text) {
            newsInput.classList.add('is-invalid');
            newsInput.focus();
            return;
        } else {
            newsInput.classList.remove('is-invalid');
        }

        // 2. Set Loading State
        setLoadingState(true);

        // 3. Call API
        fetch('/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text }),
        })
        .then(response => response.json())
        .then(data => {
            // 4. Update UI with Result
            setLoadingState(false);
            showResult(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            setLoadingState(false);
            alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
        });
    });

    // Function to handle Button State
    function setLoadingState(isLoading) {
        if (isLoading) {
            verifyBtn.disabled = true;
            btnText.textContent = "กำลังวิเคราะห์ข้อมูล...";
            btnLoader.style.display = "inline-block";
            resultArea.style.display = "none";
        } else {
            verifyBtn.disabled = false;
            btnText.textContent = "Verify News (ตรวจสอบ)";
            btnLoader.style.display = "none";
        }
    }

    // Function to Render Result
    function showResult(data) {
        resultArea.style.display = "block";
        
        // Reset classes
        resultArea.className = "card-footer p-4 animate-fade-in";
        
        if (data.class === 'danger') {
            resultArea.classList.add('alert-danger-custom');
            resIcon.className = "fas fa-times-circle text-danger";
        } else {
            resultArea.classList.add('alert-success-custom');
            resIcon.className = "fas fa-check-circle text-success";
        }

        resStatus.textContent = data.result;
        resConf.textContent = data.confidence;
        resReason.textContent = data.reason;

        // Smooth scroll to result
        resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Clear error on typing
    newsInput.addEventListener('input', function() {
        if (this.value.trim()) {
            this.classList.remove('is-invalid');
        }
    });
});