//chart-01
const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {},
};
const myChart = new Chart(document.getElementById("myChart"), config);

//chart-02
const data1 = {
  labels: ["a"],
  datasets: [
    {
      data: [11, 16, 7, 3, 14],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(75, 192, 192)",
        "rgb(255, 205, 86)",
        "rgb(201, 203, 207)",
        "rgb(54, 162, 235)",
      ],
    },
  ],
};

const config1 = {
  type: "polarArea",
  data: data1,
  options: {},
};

const mychart1 = new Chart(document.getElementById("mycanvas1"), config1);

//jquery
$(".search-box").keydown(function (e) {
  if (e.key == "Enter") {
    let a = $(".search-box").val();
    console.log(a);
    $.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${a}&appid=f2a2f3ef6345388be6f495bd087fbf06`,
      function (data, status) {
        $("#place").text(`${data.name},`);
        $("#country").text(`${data.sys.country}`);
        $("#yes_place").text(`${a}`);
        $.get(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=f2a2f3ef6345388be6f495bd087fbf06`,
          function (data, staus) {
            if (data.list[0].main.aqi == 1) {
              $(".PM").text("Good");
            } else if (data.list[0].main.aqi == 2) {
              $(".PM").text("Fair");
            }
            if (data.list[0].main.aqi == 3) {
              $(".PM").text("Moderate");
            }
            if (data.list[0].main.aqi == 4) {
              $(".PM").text("Poor");
            }
            if (data.list[0].main.aqi == 5) {
              $(".PM").text("Very Poor");
            }
          }
        );
        $.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&exclude=hourly,minutely&appid=f2a2f3ef6345388be6f495bd087fbf06`,
          function (data) {
            console.log(data);
            $(".weather_main").text(`${data.current.weather[0].main}`);
            $(".deg").text(`${data.current.temp}`);
            $(".pressure_value").text(`${data.current.pressure}mb`);
            $(".Visibility").text(`${data.current.visibility}m`);
            $(".humidity").text(`${data.current.humidity}%`);
            $("#UVI_value").text(`${data.current.uvi}  UVI`);
            $(".speed").html(`${data.current.wind_speed}`);
            $(".feel_like").html(`${data.current.feels_like}&#8451;  `);
            $("#yes_cel").html(`${data.daily[0].temp.max}&#8451;  `);
            $("#yes_main").html(`${data.daily[0].weather[0].main}`);
          }
        );
      }
    );
  }
});
