let currentUser = JSON.parse(localStorage.getItem('efBuddyCurrentUser')) || null;

function scoreGame(score, games) {
    document.getElementById('loadingSave').style.display = 'flex'; // แสดง
    const url = url_addPoint;
    const data = new URLSearchParams();
    data.append('username', currentUser.username);
    data.append(`score_${games}`, parseInt(score));
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
                console.log(`score_${games} : `, result);
                document.getElementById('loadingSave').style.display = 'none'; // ซ่อน
                // if (window.parent && window.parent.document) {
                //     const span = window.parent.document.getElementById('userPoints');
                //     if (span) {
                //         span.textContent = result.new_values.point;
                //     }
                // }


                let currentUser = JSON.parse(localStorage.efBuddyCurrentUser) || {};
                currentUser[`score_${games}`] = score;  // สมมติ result มี key นี้
                localStorage.efBuddyCurrentUser = JSON.stringify(currentUser);
                console.log('currentUser : ',currentUser);


            } else {
                console.error('ล้มเหลว:', result.message);
            }
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาด:', error);
        });

}
function bestScoreGame(best_score, point) {
    document.getElementById('loadingSave').style.display = 'flex'; // แสดง
    const url = url_addPoint;
    const data = new URLSearchParams();
    data.append('username', currentUser.username);
    data.append(best_score, parseInt(point));
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
                console.log('point :', result);
                localStorage.setItem('blinkBestScore', parseInt(point));
                document.getElementById('bestScore').textContent = parseInt(point);
                document.getElementById('loadingSave').style.display = 'none'; // ซ่อน
                // addPoint()
                if (window.parent && window.parent.document) {
                    const span = window.parent.document.getElementById('userPoints');
                    if (span) {
                        span.textContent = result.new_values.point;
                    }
                }

            } else {
                console.error('ล้มเหลว:', result.message);
            }
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาด:', error);
        });

}

