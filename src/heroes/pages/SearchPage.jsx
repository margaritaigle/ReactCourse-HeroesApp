import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import { HeroCard } from "../components";
import { useForm } from "../hooks/useForm";
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = "" } = queryString.parse(location.search);
  const heroes = getHeroesByName(q);

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();

    navigate(`?q=${searchText.toLowerCase().trim()}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching </h4>
          <hr />

          <form onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Search hero"
              className="form-control"
              autoComplete="off"
              name="searchText"
              value={searchText}
              onChange={onInputChange}
            />

            <button className="btn btn-outline-primary mt-1">Search</button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {q === "" ? (
            <div className="alert alert-primary animate__animated animate__fadeIn">
              Search hero
            </div>
          ) : (
            heroes.length === 0 && (
              <div className="alert alert-danger animate__animated animate__fadeIn">
                No hero with <b>{q}</b>
              </div>
            )
          )}
          {heroes.map((hero) => (
            <HeroCard {...hero} key={hero.id} />
          ))}
        </div>
      </div>
    </>
  );
};
