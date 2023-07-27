var progress = document.querySelector("#progress");
var playSong = document.querySelector(".zm-play");
var pauseSong = document.querySelector(".zm-pause");

var index = 0;
var img = document.querySelector(".thumbnail img");

var thumb = document.querySelector("#thumb");
var title = document.querySelector("#title");
var artist = document.querySelector("#artist");

var start = document.querySelector("#start");
var end = document.querySelector("#end");

var song = document.querySelector("#song");
song.src = songs[index].src;
title.innerHTML = songs[index].name;
artist.innerHTML = songs[index].artists;
thumb.src = songs[index].image;

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;

    setInterval(() => {
        var min = Math.floor(song.duration / 60);
        var sec = Math.floor(song.duration % 60);

        var curMin = Math.floor(song.currentTime / 60);
        var curSec = Math.floor(song.currentTime % 60);

        if (sec < 10) {
            sec = "0" + sec;
        }
        if (curSec < 10) {
            curSec = "0" + curSec;
        }
        if (min < 10) {
            min = "0" + min;
        }
        if (curMin < 10) {
            curMin = "0" + curMin;
        }

        end.innerHTML = min + ":" + sec;
        start.innerHTML = curMin + ":" + curSec;
    }, 1000);
};




// Xu li su kien kich vao button play
function playPause() {
    // Khi click vao nut tam dung dang hien thi se thuc hien:
    if (pauseSong.style.display == "block") {
        song.pause();   // Dung bai hat
        pauseSong.style.display = "none";   // An nut tam dung
        playSong.style.display = "block";   // Hien thi nut choi nhac
        img.classList.remove("play");   // Dung chuyen dong animation anh
    } else {
        song.play();    // Chay bai hat
        pauseSong.style.display = "block";  // Hien thi nut tam dung
        playSong.style.display = "none";    // An nut choi nhac
        img.classList.add("play");  // Tiep tuc animation anh
    }
}

// Khi click vao bat ki vi tri nao cua thanh tien do 
// thoi gian se thay doi theo 
if (song.play()) {
    setInterval(() => {
        progress.value = song.currentTime;
        if (song.currentTime == song.duration) {
            nextPlay();
        }
    }, 1000);
}
// dong thoi nut choi nhac hoac tam dung cung se thay doi
progress.onchange = function () {
    song.play();
    song.currentTime = progress.value;
    playSong.style.display = "none";
    pauseSong.style.display = "block";
    img.classList.add("play");
};

// Su kien backward and forward button
function nextPlay() {
    index = index + 1;
    if (index > songs.length) {
        index = 0;
        song.src = songs[index].src;
        title.innerHTML = songs[index].name;
        artist.innerHTML = songs[index].artists;
        thumb.src = songs[index].image;
    }
    else {
        song.src = songs[index].src;
        title.innerHTML = songs[index].name;
        artist.innerHTML = songs[index].artists;
        thumb.src = songs[index].image;
    }
    playSong.style.display = "block";
    pauseSong.style.display = "none";
    img.classList.remove("play");
}
function prevPlay() {
    index = index - 1;
    if (index < 0) {
        index = songs.length;
        song.src = songs[index].src;
        title.innerHTML = songs[index].name;
        artist.innerHTML = songs[index].artists;
        thumb.src = songs[index].image;
    } else {
        song.src = songs[index].src;
        title.innerHTML = songs[index].name;
        artist.innerHTML = songs[index].artists;
        thumb.src = songs[index].image;
    }
    playSong.style.display = "block";
    pauseSong.style.display = "none";
    img.classList.remove("play");
}

// Xu li su kien phat ngau nhien bai hat
function shufflePlay() {
    index = Math.floor(Math.random() * songs.length);
    song.src = songs[index].src;
    title.innerHTML = songs[index].name;
    artist.innerHTML = songs[index].artists;
    thumb.src = songs[index].image;
    song.play();
}

// Xu li su kien lap lai bai hat
function repeatSong() {
    var showLoop = document.querySelector(".repeat-loop");
    if (song.loop) {
        song.loop = false;
        song.removeAttribute("loop");
        showLoop.style.display = "none";
    } else {
        song.loop = true;
        song.setAttribute("loop", "loop");
        showLoop.style.display = "block";
    }
}

// Dieu chinh am luong
var volumeSlider = document.querySelector("#btn-volume");
volumeSlider.addEventListener("input", function () {
    var curVol = volumeSlider.value;
    song.volume = curVol;
});

// Cap nhat hien thi tien do bai hat
var audio = new Howl({
    src: songs[index].src,
    onplay: function () {
        var songDuration = audio.duration();
        progress.max = songDuration;
    }
});




var volumeMuted = document.querySelector(".volume-muted");
var volumeDefault = document.querySelector(".volume-default");
var volBtn = document.querySelector("#adjustVolume");

volBtn.addEventListener("click", function () {
    if (volumeDefault.style.display == "block") {
        volumeDefault.style.display = "none";
        volumeMuted.style.display = "block";
        volumeSlider.value = "0";
        song.muted = true;
    } else {
        volumeDefault.style.display = "block";
        volumeMuted.style.display = "none";
        volumeSlider.value = "default";
        song.muted = false;
    }
});











// Xu ly thanh tim kiem 
var searchInput = document.querySelector(".search-container")
var historyBox = document.querySelector(".suggest__list");
searchInput.addEventListener("click", function () {
    searchInput.classList.add("is-collapse");
    historyBox.style.display = "block";
});










// Lấy danh sách các thẻ gallery-item
var galleryItems = document.querySelectorAll('.gallery-item');
// Lấy các button của slider
var prevButton = document.querySelector('.zm-carousel-control-prev.control-prev');
var nextButton = document.querySelector('.zm-carousel-control-next.control-next');
var isClicked = false;
var isAutoRunning = true;

// Đặt thời gian chuyển đổi giữa các slide
var interval;

// Lấy tổng số thẻ trong danh sách
var totalItems = galleryItems.length;

// Hàm chuyển đổi class của các thẻ
function rotateGalleryItems() {
    if (isClicked) {
        return;
    }

    // Lấy tên class của thẻ cuối cùng
    var lastItemClass = galleryItems[totalItems - 1].classList.item(1);

    // Di chuyển class của các thẻ về phía trước
    for (var i = totalItems - 1; i > 0; i--) {
        var currentItemClass = galleryItems[i].classList.item(1);
        var previousItemClass = galleryItems[i - 1].classList.item(1);
        galleryItems[i].classList.replace(currentItemClass, previousItemClass);
    }

    // Di chuyển class của thẻ đầu tiên về cuối danh sách
    galleryItems[0].classList.replace(galleryItems[0].classList.item(1), lastItemClass);
}
interval = setInterval(rotateGalleryItems, 5000);

// Hàm bắt đầu chạy slider tự động
function startAutoRun() {
    if (!isAutoRunning) {
        interval = setInterval(rotateGalleryItems, 5000);
        isAutoRunning = true;
    }
}

// Hàm dừng chạy slider tự động
function stopAutoRun() {
    if (isAutoRunning) {
        clearInterval(interval);
        isAutoRunning = false;
    }
}

// Gọi hàm bắt đầu chạy slider tự động ban đầu
startAutoRun();

// Hàm chuyển đổi các lớp của các phần tử gallery từ phải sang trái
function clickToRotateBack(direction) {
    isClicked = true;

    // Lấy class của phần tử đầu tiên và xóa nó
    var firstItemClass = galleryItems[0].classList[1];
    galleryItems[0].classList.remove(firstItemClass);

    // Thêm class mới vào phần tử cuối cùng dựa trên class của phần tử đầu tiên
    var lastItem = galleryItems[galleryItems.length - 1];
    lastItem.classList.add(firstItemClass);

    // Dịch chuyển các lớp của các phần tử gallery theo hướng chỉ định
    for (var i = galleryItems.length - 1; i > 0; i--) {
        var currentItem = galleryItems[i];
        var previousItem = galleryItems[i - 1];
        var currentClass = currentItem.classList[1];
        currentItem.classList.remove(currentClass);
        previousItem.classList.add(currentClass);
    }

    // Cập nhật lại danh sách galleryItems
    galleryItems = document.querySelectorAll('.gallery-item');

    // Kết thúc sự kiện click
    isClicked = false;

    // Bắt đầu chạy slider tự động sau khi kết thúc click
    startAutoRun();
}

// Hàm chuyển đổi các lớp của các phần tử gallery từ trái sang phải
function clickToRotateForward(direction) {
    isClicked = true;

    // Lấy class của phần tử cuối cùng và xóa nó
    var lastItemClass = galleryItems[galleryItems.length - 1].classList[1];
    galleryItems[galleryItems.length - 1].classList.remove(lastItemClass);

    // Thêm class mới vào phần tử đầu tiên dựa trên class của phần tử cuối cùng
    var firstItem = galleryItems[0];
    firstItem.classList.add(lastItemClass);

    // Dịch chuyển các lớp của các phần tử gallery theo hướng chỉ định
    for (var i = 0; i < galleryItems.length - 1; i++) {
        var currentItem = galleryItems[i];
        var nextItem = galleryItems[i + 1];
        var currentClass = currentItem.classList[1];
        currentItem.classList.remove(currentClass);
        nextItem.classList.add(currentClass);
    }

    // Cập nhật lại danh sách galleryItems
    galleryItems = document.querySelectorAll('.gallery-item');

    // Kết thúc sự kiện click
    isClicked = false;

    // Bắt đầu chạy slider tự động sau khi kết thúc click
    startAutoRun();
}

// Xử lý sự kiện khi nhấp vào nút "Prev"
prevButton.addEventListener('click', function () {
    stopAutoRun();  // Dừng chạy slider tự động khi có sự kiện click
    clickToRotateBack('prev');
});

// Xử lý sự kiện khi nhấp vào nút "Next"
nextButton.addEventListener('click', function () {
    stopAutoRun();   // Dừng chạy slider tự động khi có sự kiện click
    clickToRotateForward('next');
});


// Xu ly thanh cuon man hinh




// Xu li section Mới Phát Hành
function openMusicList(evt, musicType) {
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(musicType).style.display = "block";
    evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();