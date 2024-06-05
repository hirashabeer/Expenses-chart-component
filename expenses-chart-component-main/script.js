document.addEventListener("DOMContentLoaded", () => {
  const popups = document.querySelectorAll(".popup");
  const bars = document.querySelectorAll(".bar");
  bars.forEach((bar) => {
    bar.addEventListener("mouseover", () => {
      bar.style.backgroundColor = "rgba(255, 155, 135, 255)";
      const correspondingPopup = bar.previousElementSibling;
      if (
        correspondingPopup &&
        correspondingPopup.classList.contains("popup")
      ) {
        correspondingPopup.classList.add("popup2");
      }
    });

    // Add mouseout event listener to each bar
    bar.addEventListener("mouseout", () => {
      bar.style.backgroundColor = "rgba(236,117,93,255)"; // Reset background color
      const correspondingPopup = bar.previousElementSibling;
      if (
        correspondingPopup &&
        correspondingPopup.classList.contains("popup")
      ) {
        correspondingPopup.classList.remove("popup2"); // Remove "popup2" class
      }
    });
  });

  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      updateBars(data);
    });
  function updateBars(data) {
    const bars = document.querySelectorAll(".bar");
    const popups = document.querySelectorAll(".popup");
    bars.forEach((bar, index) => {
      if (data[index]) {
        bar.style.height = `${data[index].amount * 3}px`;
        popups[index].textContent = `$${data[index].amount}`;
      }
    });

    const cyan = "#76B5BC";
    const fadedCyan = "#B4E0E5";
    const weekDayIndex = (new Date().getDay() - 1 + 7) % 7;
    const currBar = document.querySelectorAll(".bar")[weekDayIndex];
    currBar.style.backgroundColor = cyan;
    currBar.onmouseover = () => (currBar.style.backgroundColor = fadedCyan);
    currBar.onmouseout = () => (currBar.style.backgroundColor = cyan);
  }
});

//   const today = new Date().getDay();

//   if (index !== 6) {
//     index + 1 === today && bar.classList.add("highlight");
//   } else {
//    today === 0 && bar.classList.add("highlight");
//   }
