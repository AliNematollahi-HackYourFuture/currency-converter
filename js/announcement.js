function announcementHandler() {
  const now = new Date();
  const openningTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    9,
    0,
    0
  );
  const closingTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    17,
    0,
    0
  );

  if (
    now.getDay() === 0 ||
    now.getDay() === 6 ||
    openningTime - now > 30 * 60 * 1000 ||
    now > closingTime
  ) {
    announcementContainer.innerHTML =
      "The Market Is Closed Now. Working Time: Weekdays At 09:00-17:00";
    announcementContainer.style.border = "2px solid red";
  } else if (openningTime - now > 0 && openningTime - now < 30 * 60 * 1000) {
    announcementContainer.innerHTML =
      "The Market Will Open Soon. Working Time: Weekdays At 09:00-17:00";
    announcementContainer.style.border = "2px solid orange";
  } else if (closingTime - now > 0 && closingTime - now < 30 * 60 * 1000) {
    announcementContainer.innerHTML =
      "The Market Will close Soon. Working Time: Weekdays At 09:00-17:00";
    announcementContainer.style.border = "2px solid orange";
  } else if (now > openningTime && now < closingTime) {
    announcementContainer.innerHTML =
      "The Market Is Open Now. Working Time: Weekdays At 09:00-17:00";
    announcementContainer.style.border = "2px solid green";
  }
}
