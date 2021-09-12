import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Options from "./Dropdowns";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

function Main({ requestbody, changerequestbody, findfalcone }) {
  //to maintain planets, vehicles and total time.
  const [planets, changeplanets] = useState([]);
  const [vehicles, changevehicles] = useState([]);
  const [totaltime, changetotaltime] = useState(0);

  //Fecthing dropdowns and vehicles from API
  useEffect(() => {
    fetch("https://findfalcone.herokuapp.com/planets")
      .then(function (response) {
        //checking if the data loaded without any issues.
        if (response.status !== 200) {
          console.log("Unable to fetch. Status Code: " + response.status);
          return;
        }
        response.json().then(function (data) {
          changeplanets(data);
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });

    fetch("https://findfalcone.herokuapp.com/vehicles")
      .then(function (response) {
        if (response.status !== 200) {
          console.log("Unable to fetch. Status Code: " + response.status);
          return;
        }
        response.json().then(function (data) {
          changevehicles(data);
        });
      })
      .catch(function (error) {
        console.log("Fetch Error :-S", error);
      });
  }, []);

  var select = [0, 1, 2, 3];

  return (
    <>
      <Header />
      <form className="form">
        <div className="main">
          {select.map((item) => {
            return (
              <Options
                key={item}
                index={item}
                planets={planets}
                changeplanets={changeplanets}
                vehicles={vehicles}
                changevehicles={changevehicles}
                requestbody={requestbody}
                changerequestbody={changerequestbody}
                totaltime={totaltime}
                changetotaltime={changetotaltime}
              />
            );
          })}
          <h2>Time taken: {totaltime}</h2>
        </div>
        <div className="btn">
          {requestbody.planet_names.includes(null) ||
          requestbody.vehicle_names.includes(null) ? (
            <Button
              variant="outlined"
              color="secondary"
              type="submit"
              disabled
              endIcon={<SearchIcon />}
            >
              Find Falcone
            </Button>
          ) : (
            <Link to="/result" onClick={findfalcone}>
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                style={{ backgroundColor: "#C197D2" }}
                endIcon={<SearchIcon />}
              >
                Find Falcone
              </Button>
            </Link>
          )}
        </div>
      </form>
      <Footer />
    </>
  );
}

export default Main;
