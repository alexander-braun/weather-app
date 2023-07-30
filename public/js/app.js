const button = document.querySelector("button");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector("input");
  const result = document.querySelector("#result");
  result.innerHTML = "Loading...";

  fetch(`/weather?address=${input.value}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        result.innerHTML = data.message;
      } else {
        result.innerHTML = `${data.description}.\nIt is ${data.temperature} degrees in ${data.city} ${data.country}.\nIt feels like ${data.feelsLike} degrees.`;
      }
    });
  });
});
