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
    announcementText.innerHTML =
      "The Market Is Closed Now. Working Time: Weekdays At 09:00-17:00";
    announcementText.style.color = "red";
  } else if (openningTime - now > 0 && openningTime - now < 30 * 60 * 1000) {
    announcementText.innerHTML =
      "The Market Will Open Soon. Working Time: Weekdays At 09:00-17:00";
    announcementText.style.color = "orange";
  } else if (closingTime - now > 0 && closingTime - now < 30 * 60 * 1000) {
    announcementText.innerHTML =
      "The Market Will close Soon. Working Time: Weekdays At 09:00-17:00";
    announcementText.style.color = "orange";
  } else if (now > openningTime && now < closingTime) {
    announcementText.innerHTML =
      "The Market Is Open Now. Working Time: Weekdays At 09:00-17:00";
    announcementText.style.color = "green";
  }
}
