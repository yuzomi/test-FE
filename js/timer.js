// 1. 시간 클릭했을 때 숫자 올라감
// 2. 시간 입력 받으면 Start 버튼 활성화
// 3. 시간이 줄어듦
// 4. Reset버튼 누르면 초기화
// 5. Pause버튼 누르면 일시 정지

const 시간 = document.querySelectorAll(".container > div");

시간.forEach((node, index) => {
  node.addEventListener("click", (event) => {
    const 숫자 = node.querySelector("span");
    if (index === 0 && +숫자.textContent < 99)
      숫자.textContent = String(+숫자.textContent + 1).padStart(2, "0");
    else if (+숫자.textContent < 59)
      숫자.textContent = String(+숫자.textContent + 1).padStart(2, "0");
    else alert("그만 눌러");
  });
});

const 시작버튼 = document.querySelector("#start");
const 시작버튼이미지 = document.querySelector("#start-img");
const 정지버튼 = document.querySelector("#pause");
const 초기화버튼 = document.querySelector("#stop");
const 초기화버튼이미지 = document.querySelector("#stop-img");

window.addEventListener("click", (event) => {
  const time = [...시간].reduce(
    (acc, crr) => (acc += +crr.querySelector("span").textContent),
    0
  );
  if (time > 0) {
    // console.log(time);
    // 시작버튼.setAttribute("hidden", true);
    // 정지버튼.removeAttribute("hidden");
    시작버튼.style.backgroundColor = "#5180ff";
    시작버튼이미지.src = "./img/icon-start.png";

    초기화버튼.style.backgroundColor = "#fb7099";
    초기화버튼이미지.src = "./img/icon-reset.png";

    시작버튼.style.color = "white";
    초기화버튼.style.color = "white";
  } else {
    // 시작버튼.removeAttribute("hidden");
    // 정지버튼.setAttribute("hidden", true);
    시작버튼.style.color = "#617199";
    초기화버튼.style.color = "#617199";

    시작버튼.style.backgroundColor = "#324577";
    초기화버튼.style.backgroundColor = "#324577";
  }
});

시작버튼.addEventListener("click", (event) => {
  시작버튼.setAttribute("hidden", true);
  정지버튼.removeAttribute("hidden");

  let 초 = 0;

  시간.forEach((node, index) => {
    const span = node.querySelector("span");
    index === 0
      ? (초 += span.textContent * 3600)
      : index === 1
      ? (초 += span.textContent * 60)
      : index === 2
      ? (초 += span.textContent * 1)
      : 0;
  });
  const 타이머 = setInterval(() => {
    if (초 > 0) {
      초--;

      {
        시간[0].querySelector("span").textContent = String(
          parseInt(초 / 3600, 10)
        ).padStart(2, "0");
        시간[1].querySelector("span").textContent = String(
          parseInt((초 % 3600) / 60)
        ).padStart(2, "0");
        시간[2].querySelector("span").textContent = String(
          (초 % 3600) % 60
        ).padStart(2, "0");
      }

      if (초 === 0) {
        clearInterval(타이머);
        시작버튼.style.backgroundColor = "#324577";
        시작버튼.style.color = "#617199";
        초기화버튼.style.backgroundColor = "#324577";
        초기화버튼.style.color = "#617199";
        시작버튼.removeAttribute("hidden");
        정지버튼.setAttribute("hidden", true);
        시작버튼이미지.src = "./img/Vector 7.png";
        초기화버튼이미지.src = "./img/icon-reset-disabled.png";
      }
    }

    정지버튼.addEventListener("click", () => {
      시작버튼.removeAttribute("hidden");
      정지버튼.setAttribute("hidden", true);
      clearInterval(타이머);
    });

    초기화버튼.addEventListener("click", () => {
      초 = 0;
      clearInterval(타이머);
      for (const node of 시간) {
        node.querySelector("span").textContent = "00";
      }
      시작버튼.removeAttribute("hidden");
      정지버튼.setAttribute("hidden", true);
      시작버튼이미지.src = "./img/Vector 7.png";
      초기화버튼이미지.src = "./img/icon-reset-disabled.png";
    });

    console.log(초);
  }, 1000);
});

초기화버튼.addEventListener("click", () => {
  for (const node of 시간) {
    node.querySelector("span").textContent = "00";
  }
});
