import React, { ChangeEvent, useEffect, useState } from "react";
// tslint:disable-next-line: no-submodule-imports
import styled from "styled-components/macro";
import { AddButton } from "./components/AddButton";
import { DownloadButton } from "./components/DownloadButton";
import { Layout } from "../components/Layout";
import { Joke, JokeItem, JokeList } from "./components/JokeList";
import { AddForm } from "./components/AddForm";
import { Modal } from "../components/Modal";
import { EditForm } from "./components/EditForm";
import { QueryInput } from "./components/QueryElements";
import { FilterButton } from "./components/FilterButton";
import { AscButton } from "./components/AscButton";
import { DscButton } from "./components/DscButton";
import { SfwButton } from "./components/SfwButton";
import { NsfwButton } from "./components/NsfwButton";
import { GteButton } from "./components/GteButton";
import { LteButton } from "./components/LteButton";
import { theme } from "../theme";

const CurrentJokeNumber = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.secondaryFontColor};
`;

export type QueryFormState = {
  category: string;
  language: string;
  counter: number;
  limit: number;
};

export const DashboardPage = () => {
  const [addJokeVisible, setAddJokeVisible] = useState(false);
  const [editJoke, setEditJoke] = useState<Joke | null>(null);
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [asc, setAsc] = useState<boolean>(true);

  const sortedJokes = React.useMemo(
    () =>
      jokes.sort((curr, next) => {
        if (asc) {
          return curr.counter - next.counter;
        }
        return next.counter - curr.counter;
      }),
    [jokes, asc]
  );

  const [editQuery, setEditQuery] = useState<QueryFormState>({
    category: "",
    language: "",
    counter: 0,
    limit: 0,
  });
  const [show, setShow] = useState<boolean>(true);
  const [type, setType] = useState<"gte" | "lte">("gte");

  // prevents negative limits in joke query
  if (editQuery.limit < 0) {
    editQuery.limit = editQuery.limit * -1;
    setEditQuery(editQuery);
  }

  // query builder
  let queryString = `?`;
  if (editQuery.category !== "") {
    queryString = `${queryString}&category=${editQuery.category}`;
  }
  if (editQuery.language !== "") {
    queryString = `${queryString}&language=${editQuery.language}`;
  }
  if (editQuery.counter !== 0) {
    queryString = `${queryString}&counter=${editQuery.counter}`;
  }
  if (editQuery.limit !== 0) {
    queryString = `${queryString}&limit=${editQuery.limit}`;
  }
  queryString = `${queryString}&show=${show}&type=${type}`;

  const fetchJokes = async () => {
    // incorporation of query parameters
    const jokeRequest = await fetch(`/api/joke${queryString}`, {
      headers: { "content-type": "application/json" },
    });
    if (jokeRequest.status === 200) {
      const jokesJSON = await jokeRequest.json();
      setJokes(jokesJSON.jokes);
    }
  };

  const downloadCSV = async () => {
    // incorporation of query parameters
    const jokeRequest = await fetch(`/api/joke${queryString}`, {
      // necessary setting of headers for triggering the csv response
      headers: { Accept: "text/csv" },
    });
    if (jokeRequest.status === 200) {
      await jokeRequest
        .blob()
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `Jokes_${queryString}.csv`);
          document.body.appendChild(link);
          link.click();
          link.parentNode!.removeChild(link);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const queryInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditQuery({ ...editQuery, [e.target.name]: e.target.value });
  };

  const toggleAsc = () => {
    setAsc(!asc);
  };

  useEffect(() => {
    fetchJokes();
    // eslint-disable-next-line
  }, []);

  const toggleShow = () => {
    setShow(!show);
  };

  const toggleGte = () => {
    setType(type === "gte" ? "lte" : "gte");
  };

  const toggleLte = () => {
    setType(type === "lte" ? "gte" : "lte");
  };

  return (
    <Layout>
      <section
        className="dashboard__header"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <div className="dashboard__joke-number">
          <p
            style={{
              fontSize: "36px",
              margin: 0,
            }}
          >
            {jokes.length}
          </p>
          <CurrentJokeNumber>Number of Jokes</CurrentJokeNumber>
        </div>

        <div
          className="dashboard__button-section"
          style={{
            flex: 1,
            justifyContent: "flex-end",
            display: "flex",
            alignItems: "center",
          }}
        >
          <DownloadButton
            onClick={() => {
              downloadCSV();
            }}
          />
          <AddButton
            onClick={() => {
              if (!addJokeVisible) {
                setAddJokeVisible(true);
              }
            }}
          />
        </div>
      </section>
      <section className={"dashboard__filter"}>
        <JokeList>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: theme.colors.listBackgroundColor,
              borderRadius: "10px",
              marginTop: theme.margin.tiny,
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <div style={{ margin: theme.margin.tiny, width: "100%" }}>
              <QueryInput
                name="category"
                label="Category"
                type="text"
                onChange={queryInputHandler}
                value={editQuery.category}
              />
              <QueryInput
                name="language"
                label="Language"
                type="text"
                onChange={queryInputHandler}
                value={editQuery.language}
              />
              <QueryInput
                name="counter"
                label="Likes"
                type="number"
                onChange={queryInputHandler}
                value={editQuery.counter}
              />
            </div>
            <div
              style={{
                margin: theme.margin.tiny,
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: theme.roundButtonSize.large,
              }}
            >
              {show ? (
                <SfwButton onClick={toggleShow} />
              ) : (
                <NsfwButton onClick={toggleShow} />
              )}
              <QueryInput
                style={{ width: theme.roundButtonSize.large }}
                name="limit"
                label="#"
                type="number"
                min="0"
                onChange={queryInputHandler}
                value={editQuery.limit}
              />
              {type === "gte" ? (
                <GteButton onClick={toggleGte} />
              ) : (
                <LteButton onClick={toggleLte} />
              )}
            </div>
            <div style={{ margin: theme.margin.tiny }}>
              {asc ? (
                <AscButton onClick={toggleAsc} />
              ) : (
                <DscButton onClick={toggleAsc} />
              )}
              <FilterButton
                onClick={() => {
                  fetchJokes();
                }}
              />
            </div>
          </div>
        </JokeList>
      </section>

      {addJokeVisible && (
        <Modal
          title={"Add Joke"}
          onCancel={() => {
            setAddJokeVisible(false);
          }}
        >
          <AddForm
            afterSubmit={() => {
              setAddJokeVisible(false);
              fetchJokes();
            }}
          />
        </Modal>
      )}

      {editJoke && (
        <Modal
          title={"Show & Edit"}
          onCancel={() => {
            setEditJoke(null);
          }}
        >
          <EditForm
            afterSubmit={() => {
              setEditJoke(null);
              fetchJokes();
            }}
            joke={editJoke}
          />
        </Modal>
      )}
      <section className={"dashboard__joke-list"}>
        <JokeList>
          {sortedJokes.map((joke: Joke) => {
            return (
              <JokeItem
                key={joke.id}
                onClick={() => {
                  if (!addJokeVisible) {
                    setEditJoke(joke);
                  }
                }}
                joke={joke}
              />
            );
          })}
        </JokeList>
      </section>
    </Layout>
  );
};
