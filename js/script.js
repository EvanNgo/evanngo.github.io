document.addEventListener("DOMContentLoaded", function(){
  //Define
  var mainContent = document.getElementById('mainContent');
  var navItems = document.getElementsByClassName('Nav-item');
  for (var i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", navOnClickListener);
  }

  function navOnClickListener(event) {
    event.preventDefault();
    if (this.classList.contains('Nav-item--active')) {
      return;
    }
    var activeItem = document.getElementsByClassName('Nav-item--active');
    if (activeItem.length > 0) {
      for (var i = 0; i < activeItem.length; i++) {
        activeItem[i].classList.remove("Nav-item--active");
      }
    }
    this.classList.add("Nav-item--active");
  }// End Nav Click Listener

  initBasicInfo();
  initTimeline();
  initPR();
  initSkill();

  function initBasicInfo() {
    // document.getElementById('userThumbnail').
    document.getElementById('userName').innerHTML = data.name;
    document.getElementById('userJob').innerHTML = data.job;
    document.getElementById('userBirth').innerHTML = data.birth;
    document.getElementById('userGender').innerHTML = data.gender === 0 ? "Nam" : "Nữ";
    document.getElementById('userAddress').innerHTML = data.address;
    document.getElementById('userPhone').innerHTML = data.phone;
    document.getElementById('userEmail').innerHTML = data.email;
  }

  function initTimeline() {
    if (data.timeline === null || data.timeline.length === 0) {
      return;
    }
    var timeline = createElement('div', "Timeline");
    var timelineTitle = createElement('h2', "Content__ttl", "Học vấn và sự nghiệp");
    var timelineContent = createElement('div', "Timeline-content");
    timelineContent.id = "timelineContent";
    timeline.appendChild(timelineTitle);

    var timelineStart = createElement("div", "Timeline-start");
    var timelineStartIcon = createElement("img", "Timeline-start__ico");
    timelineStartIcon.setAttribute("src","/img/timeline_start.png");
    timelineStart.appendChild(timelineStartIcon);
    timelineStart.appendChild(createElement("p","Timeline-start__line"));
    timelineContent.appendChild(timelineStart);

    var currentTimelineItem = null;
    var currentTimelineItemContent = null;
    var currentTimelineItemtBody = null;
    var currentYear = 0;
    var timelineBody = createElement("div", "Timeline-body");
    for (let i = 0; i < data.timeline.length; i++) {
      const mData = data.timeline[i];
      if (currentTimelineItem === null || currentYear != mData.year) {
        if (currentTimelineItem !== null) {
          currentTimelineItemContent.appendChild(currentTimelineItemtBody);
          currentTimelineItem.appendChild(currentTimelineItemContent);
          timelineBody.appendChild(currentTimelineItem);
        }
        currentTimelineItem = createElement("div", "Timeline-item");
        currentYear =  mData.year;
        currentTimelineItem.appendChild(createElement("p", "Timeline-item__year", currentYear));
        currentTimelineItemContent = createElement("div", "Timeline-item-content");
        var timelineItemIcon = createElement("p","Timeline-item-content__icon");
        switch (mData.event) {
          case "start_study":
            timelineItemIcon.appendChild(createElement("i", "fas fa-school"));
            break;
          case "graduation":
            timelineItemIcon.appendChild(createElement("i", "fas fa-user-graduate"));
            break;
          case "start_job":
            timelineItemIcon.appendChild(createElement("i", "fas fa-user-tie"));
            break;
          case "quit_job":
            timelineItemIcon.appendChild(createElement("i", "fas fa-briefcase"));
            break;
          default:
        }
        currentTimelineItemContent.appendChild(timelineItemIcon);
        currentTimelineItemtBody = createElement("div", "Timeline-item-content-body");
      }
      currentTimelineItemtBody.appendChild(createElement("p", "Timeline-item-content__ttl", mData.month+"/"+currentYear));
      switch (mData.event) {
        case "start_study":
          currentTimelineItemtBody.appendChild(createElement("p", "Timeline-item-content__txt", "Bắt đầu học "+mData.type+" tại "+mData.at));
          break;
        case "graduation":
          currentTimelineItemtBody.appendChild(createElement("p", "Timeline-item-content__txt", "Tốt nghiệp "+mData.type+" tại "+mData.at));
          break;
        case "start_job":
          currentTimelineItemtBody.appendChild(createElement("p", "Timeline-item-content__txt", "Bắt đầu làm "+mData.type+" tại "+mData.at));
          break;
        case "quit_job":
          currentTimelineItemtBody.appendChild(createElement("p", "Timeline-item-content__txt", "Thôi việc "+mData.type+" tại "+mData.at));
          break;
        default:
          currentTimelineItemtBody.appendChild(createElement("p", "Timeline-item-content__txt", mData.event+" at "+mData.at));
      }
    }
    currentTimelineItemContent.appendChild(currentTimelineItemtBody);
    currentTimelineItem.appendChild(currentTimelineItemContent);
    timelineBody.appendChild(currentTimelineItem);
    timelineContent.appendChild(timelineBody);

    var timelineEnd = createElement("div", "Timeline-end");
    var timelineEndIcon = createElement("img", "Timeline-end__ico");
    if (data.gender === 0) {
      timelineEndIcon.setAttribute("src","/img/timeline_end_man.png");
    } else {
      timelineEndIcon.setAttribute("src","/img/timeline_end_women.png");
    }
    timelineEnd.appendChild(timelineEndIcon);
    if(timelineContent.childElementCount % 2 == 1) {
      timelineEnd.appendChild(createElement("p","Timeline-end__line"));
    } else {
      timelineEnd.appendChild(createElement("p","Timeline-end__line Timeline-end__line--bottom"));
    }
    timelineContent.appendChild(timelineEnd);

    timeline.appendChild(timelineContent);
    mainContent.appendChild(timeline);

    var timelineTop = 0;
    var timelineBottom = 0;

    var items = document.getElementsByClassName('Timeline-item-content');
    for (let i = 0; i < items.length; i++) {
      if (i % 2 == 0 && items[i].offsetHeight > timelineTop ) {
        timelineTop = items[i].offsetHeight;
      } else if (i % 2 == 1 && items[i].offsetHeight > timelineBottom) {
        timelineBottom = items[i].offsetHeight;
      }
    }
    timelineContent.style.paddingTop = (timelineTop + 20)+"px";
    timelineContent.style.paddingBottom = (timelineBottom + 20)+"px";
  }

  function initPR() {
    if (data.pr === null || data.pr.length === 0) {
      return;
    }
    mainContent.appendChild(createElement("h2","Content__ttl","Tự giới thiệu"));
    for (let i = 0; i < data.pr.length; i++) {
      mainContent.appendChild(createElement("p", "Content__txt", data.pr[i]));
    }
  }

  function initSkill() {
    if (data.skills === null || data.skills.length === 0) {
      return;
    }
    mainContent.appendChild(createElement("h2","Content__ttl","Trình độ - Kỹ năng"));
    for (let i = 0; i < data.skills.length; i++) {
      const skill = data.skills[i];
      if (i === 0) {
        mainContent.appendChild(createElement("h3","Content__sub Content__sub--first", skill.group_name));
      } else {
        mainContent.appendChild(createElement("h3","Content__sub", skill.group_name));
      }
      var skillContent = createElement("div", "Content-skill");
      for (let j = 0; j < skill.skill_sheet.length; j++) {
        const element = skill.skill_sheet[j];
        var skillContentItem = createElement("div", "Content-skill-item");
        skillContentItem.appendChild(createElement("p","Content-skill-item__ttl",element.name));
        var skillContentItemProcess = createElement("p", "Content-skill-item-process");
        var skillContentItemBar = createElement("span", "Content-skill-item-process-bar");
        var skillContentItemValue = createElement("b","Content-skill-item-process-bar__value");
        skillContentItemValue.setAttribute("data-value", element.point);
        skillContentItemBar.appendChild(skillContentItemValue);
        skillContentItemProcess.appendChild(skillContentItemBar);
        skillContentItem.appendChild(skillContentItemProcess);
        skillContent.appendChild(skillContentItem);
      }
      var skillContentNote = createElement("p", "Content__note");
      for (let m = 0; m < skill.note.length; m++) {
        const note = skill.note[m];
        skillContentNote.appendChild(createElement("span", "", note));
      }
      skillContent.appendChild(skillContentNote);
      mainContent.appendChild(skillContent);
    }
  }

  function createElement(tag, className, content = "") {
    var element = document.createElement(tag);
    if (className !== "") {
      element.className = className;
    }
    if (content !== "") {
      element.innerHTML = content;
    }
    return element;
  }

  setTimeout(function () {
    var elems = document.querySelectorAll('.Content-skill-item-process-bar__value');
    [].forEach.call(elems, function(el) {
        el.style.width = el.getAttribute("data-value")+"%";
    });
  }, 10);
});

data = {
  "name"    :"Ngô Hải Vân",
  "job"     :"BrSE",
  "birth"   :"10/08/1993",
  "gender"  :0,
  "address" :"303 EstatePierNakamura, 3-14-1 GyoutokuEkimae, Ichikawa, Chiba, Japan",
  "phone" :"070-4284-9817",
  "email"  :"evanngo93@gmail.com",
  "sns" :[
    {
      "type":"fb",
      "url" :"facebook.com/even.ngo"
    },
    {
      "type":"yt",
      "url" :"youtube.com/evanngo"
    }
  ],
  "timeline": [
    {
      "year": 2015,
      "month": 9,
      "event": "start_job",
      "type":"Mobile Developer",
      "at":"VNPT"
    },
    {
      "year": 2015,
      "month": 9,
      "event": "graduation",
      "type":"Software Engineer",
      "at":"ĐH Cần Thơ"
    },
    {
      "year": 2016,
      "month": 2,
      "event": "quit_job",
      "type":"Mobile Developer",
      "at":"VNPT"
    },
    {
      "year": 2016,
      "month": 3,
      "event": "start_job",
      "type":"Mobile Developer",
      "at":"DragonFroot"
    },
    {
      "year": 2016,
      "month": 10,
      "event": "start_study",
      "type":"Tiếng Nhật",
      "at":"Học Viện Meros"
    },
    {
      "year": 2017,
      "month": 4,
      "event": "graduation",
      "type":"Tiếng Nhật",
      "at":"Học Viện Meros"
    },
    {
      "year": 2017,
      "month": 5,
      "event": "start_job",
      "type":"Mobile Developer",
      "at":"Robust-inc"
    },
    {
      "year": 2018,
      "month": 6,
      "event": "quit_job",
      "type":"Mobile Developer",
      "at":"Robust-inc"
    },
    {
      "year": 2018,
      "month": 7,
      "event": "start_job",
      "type":"BrSE",
      "at":" VietIS Solution"
    }
  ],
  "pr": [
    "Tôi là một người có niềm đam mê mãnh liệt về IT, đặc biệt là ở lĩnh vực FrontEnd. Tuy kinh nghiệm làm việc của tôi hiện tại chưa nhiều nhưng bản thân tôi tự tin rằng mình có khả năng học hỏi, cũng như tìm tòi những kỹ thuật, ngôn ngữ mới một cách nhanh chóng.",
    "Ngoài ra tôi tự tin rằng mình là người có khả năng giao tiếp cũng như kết nối với những đồng nghiệp khác, vì thế trong công việc tôi luôn có những mối quan hệ tốt cũng như thành tích làm việc nhóm hiệu quả.",
    "Khi có nhiều thời gian rảnh tôi luôn dành thời gian để đi du lịch về những vùng quê. Trong những chuyến đi tôi luôn học hỏi được điều mới về con người, về văn hóa từng vùng miền. Vì vậy sau công nghệ thì du lịch là niềm đam mê lớn thứ 2 của tôi."
  ],
  "skills": [
    {
      "group_name" : "Ngôn ngữ lập trình",
      "skill_sheet": [
        {
          "name" : "JavaScript",
          "point" : "87"
        },
        {
          "name" : "HTML/CSS",
          "point" : "98"
        },
        {
          "name" : "Android/Java",
          "point" : "80"
        },
        {
          "name" : "iOS/Swift",
          "point" : "55"
        },
        {
          "name" : "Unity/C#",
          "point" : "50"
        },
        {
          "name" : "Database",
          "point" : "95"
        }
      ],
      "note": [
        "Ở trường đại học tôi đã được học rất nhiều ngôn ngữ lập trình như C, C++, nhúng... Nhưng Android/Java là ngôn ngữ lập trình khiến tôi có hứng thú nhiều nhất, vì thế phần lớn thời gian đi học và những năm mới đi làm tôi đã chọn ngôn ngữ Android/Java để phát triển. Tuy nhiên 2 năm gần đây tôi lại có hứng thú mãnh liệt với ngôn ngữ JavaScript vì vậy mà tôi dành hết thời gian của mình để học cũng như làm việc với ngôn ngữ này. Tính đến hiện tại thì tôi có trên 2 năm kinh nghiệm lập trình Android và 2 năm lập trình web với JavaScript. Ngoài 2 ngôn ngữ trên thì những lúc rãnh tôi cũng tìm hiểu, học thêm những ngôn ngữ cũng như FrameWork/Thư viện khác như Unity, ASP.NET, Wordpress hoặc gần đây nhất là ReactJS."
      ]
    },
    {
      "group_name" : "Kỹ năng khác",
      "skill_sheet": [
        {
          "name" : "Quản lý",
          "point" : "50"
        },
        {
          "name" : "T.Kế tài liệu",
          "point" : "65"
        },
        {
          "name" : "Giao tiếp",
          "point" : "100"
        },
        {
          "name" : "L.Việc nhóm",
          "point" : "100"
        },
        {
          "name" : "Tiếng Anh",
          "point" : "50"
        },
        {
          "name" : "Tiếng Nhật",
          "point" : "85"
        }
      ],
      "note":[
        "Về mặt quản lý tôi chưa có cơ hội tiếp xúc nhiều với thực tế, tuy nhiên tôi luôn quan sát cũng như học hỏi từ những cấp trên của mình.",
        "Về ngoại ngữ, hiện tại tôi tự tin về khả năng giao tiếp bằng tiếng Nhật của mình vì tôi đã làm việc độc lập với KH người Nhật được 3 năm. Tuy nhiên về mặt tiếng Anh tôi có thể nghe và đọc tài liệu tốt."
      ]
    }
  ]
}
