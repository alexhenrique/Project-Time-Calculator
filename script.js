const btnEl = document.getElementById("btn");
const birthdayEl = document.getElementById("chosen-date");
const resultElement = document.getElementById("result");

function calculateDistance() {
  const dateValue = birthdayEl.value;
  if (dateValue === "") {
    resultElement.innerText = "Entre com uma data";
  } else {
    const currentDate = new Date();
    const targetDate = new Date(dateValue);
    targetDate.setDate(targetDate.getDate() + 1); // Adiciona um dia à data escolhida

    const yearsDiff = currentDate.getFullYear() - targetDate.getFullYear();
    const monthsDiff = currentDate.getMonth() - targetDate.getMonth();
    const daysDiff = currentDate.getDate() - targetDate.getDate();

    let distanceDays = yearsDiff * 365 + monthsDiff * 30 + daysDiff;

    // Ajuste para levar em conta anos bissextos e diferentes números de dias em cada mês
    const isLeapYear = (year) =>
      (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    if (currentDate > targetDate) {
      const distanceYears = Math.abs(Math.floor(distanceDays / 365));
      const distanceMonths = Math.abs(Math.floor((distanceDays % 365) / 30));
      distanceDays = Math.abs((distanceDays % 365) % 30);

      let result = `Já se passaram desde ${formatDate(targetDate)}:`;
      if (distanceYears > 0) {
        result += ` ${distanceYears} ${pluralize(distanceYears, "ano", "anos")}`;
      }
      if (distanceMonths > 0) {
        result += ` ${distanceMonths} ${pluralize(distanceMonths, "mês", "meses")}`;
      }
      if (distanceDays > 0) {
        result += ` ${distanceDays} ${pluralize(distanceDays, "dia", "dias")}`;
      }
      resultElement.innerText = result;
    } else if (currentDate < targetDate) {
      distanceDays = Math.abs(distanceDays);

      const distanceYears = Math.floor(distanceDays / 365);
      const distanceMonths = Math.floor((distanceDays % 365) / 30);
      distanceDays = (distanceDays % 365) % 30;

      let result = `Faltam até ${formatDate(targetDate)}:`;
      if (distanceYears > 0) {
        result += ` ${distanceYears} ${pluralize(distanceYears, "ano", "anos")}`;
      }
      if (distanceMonths > 0) {
        result += ` ${distanceMonths} ${pluralize(distanceMonths, "mês", "meses")}`;
      }
      if (distanceDays > 0) {
        result += ` ${distanceDays} ${pluralize(distanceDays, "dia", "dias")}`;
      }
      resultElement.innerText = result;
    } else {
      resultElement.innerText = `A data fornecida é hoje!`;
    }
  }
}

function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return `${day}/${month}/${year}`;
}

function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural;
}

btnEl.addEventListener("click", calculateDistance);
