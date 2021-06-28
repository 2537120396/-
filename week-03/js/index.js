var nav = document.getElementById("nav-Subnet");
var Subnet = document.getElementById("Subnet");
var width = document.body.clientWidth;

Subnet.onclick = function(){
    let mySrc = Subnet.getAttribute('src');
      if(mySrc === '../imgs/icon-menu.svg'){
        nav.style.display = "block";
        Subnet.setAttribute('src', '../imgs/icon-close.svg');
      }
      else {
        nav.style.display = "none";
        Subnet.setAttribute('src', '../imgs/icon-menu.svg');
      }
};
const pageData = {
    playlist: [
        {
          "cover": "../imgs/cover-01.jpg",
          "avatar": "../imgs/avatar-01.jpg",
          "name": "Steve Wolf",
          "badge": "Pro",
          "likes": "225",
          "views": "32.6k"
        },
        {
          "cover": "../imgs/cover-02.png",
          "avatar": "../imgs/avatar-02.png",
          "name": "Fireart Studio",
          "badge": "Team",
          "likes": "137",
          "views": "19.9k"
        },
        {
          "cover": "../imgs/cover-03.jpg",
          "avatar": "../imgs/avatar-03.jpg",
          "name": "Ethan Fender",
          "badge": "Pro",
          "likes": "152",
          "views": "25.9k"
        },
        {
          "cover": "../imgs/cover-04.png",
          "avatar": "../imgs/avatar-04.gif",
          "name": "Stevan Rodic",
          "badge": "Pro",
          "likes": "96",
          "views": "16.9k"
        },
        {
          "cover": "../imgs/cover-05.png",
          "avatar": "../imgs/avatar-05.png",
          "name": "Dribbble",
          "badge": "Team",
          "likes": "43",
          "views": "3.5k"
        },
        {
          "cover": "../imgs/cover-06.png",
          "avatar": "../imgs/avatar-06.jpg",
          "name": "Alfrey Davilla | vaneltia",
          "badge": "Pro",
          "likes": "74",
          "views": "7.4k"
        },
        {
          "cover": "../imgs/cover-07.png",
          "avatar": "../imgs/avatar-07.png",
          "name": "tubik",
          "badge": "Team",
          "likes": "124",
          "views": "18.2k"
        },
        {
          "cover": "../imgs/cover-08.jpg",
          "avatar": "../imgs/avatar-08.png",
          "name": "Dlanid",
          "badge": "Pro",
          "likes": "46",
          "views": "7.1k"
        },
        {
          "cover": "../imgs/cover-09.png",
          "avatar": "../imgs/avatar-09.jpg",
          "name": "The Faces",
          "badge": "Team",
          "likes": "59",
          "views": "7.3k"
        },
        {
          "cover": "../imgs/cover-10.png",
          "avatar": "../imgs/avatar-10.png",
          "name": "Odama",
          "badge": "Team",
          "likes": "54",
          "views": "1.1k"
        },
        {
          "cover": "../imgs/cover-11.jpg",
          "avatar": "../imgs/avatar-11.jpg",
          "name": "Matt Naylor",
          "badge": "Team",
          "likes": "56",
          "views": "8.1k"
        },
        {
          "cover": "../imgs/cover-12.png",
          "avatar": "../imgs/avatar-12.jpg",
          "name": "Voila",
          "badge": "Team",
          "likes": "164",
          "views": "24.1k"
        }
      ]
  };