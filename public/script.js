var times = 0;
function openDropdown(){
  times++
  if (times == 1){
    document.getElementById("dropnav").style.display = "block"
    setTimeout(() => {
      document.getElementById("nav-login").style.display = "inline-block"
      document.getElementById("nav-signin").style.display = "inline-block"
    }, 200)
  }
  else {
    document.getElementById("dropnav").style.display = "none"
    times = 0;
  }
}