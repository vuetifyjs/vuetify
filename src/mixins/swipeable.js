let touchstartX = 0
let touchstartY = 0
let touchendX = 0
let touchendY = 0

const gesuredZone = document.getElementById('gesuredZone')

gesuredZone.addEventListener('touchstart', function (event) {
  touchstartX = event.screenX
  touchstartY = event.screenY
}, false)

gesuredZone.addEventListener('touchend', function (event) {
  touchendX = event.screenX
  touchendY = event.screenY
  handleGesure()
}, false)

function handleGesure () {
  if (touchendX < touchstartX) {
    //
  }
  if (touchendX > touchstartX) {
    //
  }
  if (touchendY < touchstartY) {
    //
  }
  if (touchendY > touchstartY) {
    //
  }
  if (touchendY === touchstartY) {
    //
  }
}
