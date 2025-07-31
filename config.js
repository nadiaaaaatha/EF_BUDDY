const pointEndGame = 20; // รับ 20 poin
const url_addPoint = 'https://script.google.com/macros/s/AKfycbzR-KxaMtCGqjOZtTMJP8Lfhgaz1aMGtyshhWiNWdAQSiBn0YA9Qo0aN2Yg5gmE4wmX/exec'; // point 
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbymnfwZKATXaendDm4p8LN01C8FQ1lU2s2qlqN__85uvMvPEGODPgoC5YchiLZSTPqH/exec"; // login
const scriptUrl = 'https://script.google.com/macros/s/AKfycby2RY0O_FSCWKDzg58iMWq6nbMruIQLRoepDICXZoBc4lG-zwD9v2mZ9iJF_TT-qtFPiA/exec'; // registor

function addPoint() {
    const url = url_addPoint;
    const data = new URLSearchParams();
    data.append('username', currentUser.username);
    data.append('point', parseInt(pointEndGame));
    fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                console.log('เพิ่มคะแนนสำเร็จ:', result);
                document.getElementById('userPoints').textContent = result.new_values.point
                // if (window.parent && window.parent.document) {
                //     const span = window.parent.document.getElementById('userPoints');
                //     if (span) {
                //         span.textContent = result.new_values.point;
                //     }
                // }

            } else {
                console.error('ล้มเหลว:', result.message);
            }
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาด:', error);
        });

}
function updatePoint(point) {
    const url = url_addPoint;
    const data = new URLSearchParams();
    data.append('username', currentUser.username);
    data.append('point', parseInt(point));
    data.append('action', 'update');
    fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                console.log('อัพเดทคะแนนสำเร็จ:', result);
            } else {
                console.error('ล้มเหลว:', result.message);
            }
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาด:', error);
        });

}

let currentHistory = JSON.parse(localStorage.getItem('historyData')) || [];

function getCurrentDateTime() {
    const now = new Date();
    now.setHours(now.getHours() + 7); // ปรับเป็นเวลาไทย (UTC+7)
    const pad = (n) => n.toString().padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
        `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

function addHistory(game) {
    const newObj = {
        date: getCurrentDateTime(),
        playgame: game
    };

    const exists = currentHistory.some(item => item.date === newObj.date && item.playgame === newObj.playgame);

    if (!exists) {
        const maxSeq = currentHistory.length > 0
            ? Math.max(...currentHistory.map(item => item.seq || 0))
            : 0;
        newObj.seq = maxSeq + 1;
        currentHistory.push(newObj);
    }
    console.log('historyData:', currentHistory);
    localStorage.setItem('historyData', JSON.stringify(currentHistory));
    update_History(JSON.stringify(currentHistory));
}

