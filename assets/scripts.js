$(() => {

    let isScrolling = false;
    let menuOnTop = true;
    let menuChangePoint = 90;
    let additScroll = 150;
    let blockMouseMargin = 40;
    let blockMouseDuration = 400;
    let listItems = document.querySelectorAll("main .main_spliter h3");
    let colors = ['FEF543', 'D7FE43', '57FE43',
        '43FE88', '43F0FE', '43BCFE', '4543FE',
        '9843FE', 'DA43FE', 'FE43E7', 'FE4392',
        'FE4358', 'FE4A43', 'FE7E43', 'FEC143'];

    function throttleScroll(e) {
        if (isScrolling == false) {
            window.requestAnimationFrame(function () {
                scrollingActions(e);
                isScrolling = false;
            });
        }
        isScrolling = true;
    }

    function scrollingActions() {

        let scrolled = window.pageYOffset;
        let listItem, i;

        if (scrolled >= menuChangePoint && menuOnTop == true) {
            menuOnTop = false;
            $("#page-header").removeClass("index-header");
            $("#scroll-to-top").addClass("active");
        } else if (scrolled < menuChangePoint && menuOnTop == false) {
            menuOnTop = true;
            $("#page-header").addClass("index-header");
            $("#scroll-to-top").removeClass("active");
        }

        for (i = 0; i < listItems.length; i++) {
            listItem = listItems[i];
            if (isPartiallyVisible(listItem)) {
                listItem.classList.add("active");
            } else {
                listItem.classList.remove("active");
            }
        }
    }

    function isPartiallyVisible(el) {
        let elementBoundary = el.getBoundingClientRect();
        let top = elementBoundary.top;
        let bottom = elementBoundary.bottom;
        let height = elementBoundary.height;
        return ((top + height >= 0) && (height + window.innerHeight >= bottom));
    }

    function rndColorBgIn() {
        let colorOne = '#' + colors[Math.floor(Math.random() * colors.length)];
        $(this).css("background-color", colorOne);
    }

    function rndColorBgOut() {
        $(this).css("background-color", '#fff');
    }

    function rndColorTxIn() {
        let colorOne = '#' + colors[Math.floor(Math.random() * colors.length)];
        $(this).find(".item-name a").css("color", colorOne);
    }

    function rndColorTxOut() {
        $(this).find(".item-name a").css("color", 'inherit');
    }

    function scrollPage(toPoint) {
        let t;
        let top = window.pageYOffset;
        let dir = (toPoint - top + 100) / 10;
        if (
            (dir < 0 && top > toPoint)
            ||
            (
                (dir > 0 && top < toPoint)
                &&
                !(top + window.innerHeight + 10 >= document.body.scrollHeight)
            )
        ) {
            window.scrollBy(0, dir);
            t = setTimeout(function () {
                scrollPage(toPoint)
            }, 20);
        } else clearTimeout(t);
        return false;
    }

    function scrollByClick(e) {
        e.preventDefault();
        let elStr = $(this).attr('href');
        let toPoint = $(elStr)[0].offsetTop - additScroll;
        scrollPage(toPoint);
    }

    function goBlockFrom(e) {
        let mouse = {
            x: e.pageX,
            y: e.pageY
        };
        let block = {
            el: $(this).find(".item-content"),
            x: $(this).offset().left,
            y: $(this).offset().top,
            w: $(this).innerWidth(),
            h: $(this).innerHeight()
        };

        if (!$(this).hasClass("animated")) {
            if (mouse.y - blockMouseMargin <= block.y) {
                // console.log("from top");
                $(this).addClass("animated");
                block.el.css({top: "-100%", left: 0});
                block.el.animate({top: 0},blockMouseDuration,'linear');
            }
            else if (mouse.y + blockMouseMargin >= block.y + block.h) {
                // console.log("from bottom");
                $(this).addClass("animated");
                block.el.css({top: "100%", left: 0});
                block.el.animate({top: 0},blockMouseDuration,'linear');
            }
            else if (mouse.x - blockMouseMargin <= block.x) {
                // console.log("from left");
                $(this).addClass("animated");
                block.el.css({top: 0, left: "-100%"});
                block.el.animate({left: 0},blockMouseDuration,'linear');
            }
            else if (mouse.x + blockMouseMargin >= block.x + block.w) {
                // console.log("from right");
                $(this).addClass("animated");
                block.el.css({top: 0, left: "100%"});
                block.el.animate({left: 0},blockMouseDuration,'linear');
            }
            else {
                $(this).addClass("animated");
                block.el.css({top: "-100%", left: 0});
                block.el.animate({top: 0},blockMouseDuration,'linear');
            }
        }
    }

    function goBlockClick(){
        if (!$(this).hasClass("animated")) {
            $(this).addClass("animated");
            $(this).find(".item-content").css({top: "-100%", left: 0});
            $(this).find(".item-content").animate({top: 0},blockMouseDuration,'linear');
        } else {
            $(this).removeClass("animated");
            $(this).find(".item-content").animate({top: "100%"},100,'linear');
        }
    }

    function goBlockTo(e) {
        let mouse = {
            x: e.pageX,
            y: e.pageY
        };
        let block = {
            el: $(this).find(".item-content"),
            x: $(this).offset().left,
            y: $(this).offset().top,
            w: $(this).innerWidth(),
            h: $(this).innerHeight()
        };

        if (mouse.y - blockMouseMargin < block.y) {
            //console.log("to top");
            block.el.animate({top: "-100%"},100,'linear',()=>{$(this).removeClass("animated");});
        }
        else if (mouse.y + blockMouseMargin > block.y + block.h) {
            //console.log("to bottom");
            block.el.animate({top: "100%"},100,'linear',()=>{$(this).removeClass("animated");});
        }
        else if (mouse.x - blockMouseMargin < block.x) {
            //console.log("to left");
            block.el.animate({left: "-100%"},100,'linear',()=>{$(this).removeClass("animated");});
        }
        else if (mouse.x + blockMouseMargin > block.x + block.w) {
            //console.log("to right");
            block.el.animate({left: "100%"},100,'linear',()=>{$(this).removeClass("animated");});
        }
        else {
            block.el.animate({top: "-100%"},100,'linear',()=>{$(this).removeClass("animated");});
        }
    }


    scrollingActions();

    $("#page-header #menu-button").click(function () {
        $(this).toggleClass("active");
        $("#page-header #menu-list").toggleClass("active");
    });

    $("#scroll-to-top").click(function (e) {
        e.preventDefault();
        scrollPage(0 - menuChangePoint);
    });

    $("#main_portfolio .inner-list .inner-list-item").hover(goBlockFrom);
    $("#main_portfolio .inner-list .inner-list-item").mouseleave(goBlockTo);
    $("#main_portfolio .inner-list .inner-list-item").click(goBlockClick);

    $(".scroll-btn").click(scrollByClick);
    $("#main_services .inner-list .inner-list-item").hover(rndColorTxIn, rndColorTxOut);

    $("#page-header #menu-list ul li").hover(function () {
        $(this).find("a").toggleClass("text-color2");
    });
    $(".small-btn").hover(rndColorBgIn, rndColorBgOut);

    $(document).scroll(throttleScroll);

});