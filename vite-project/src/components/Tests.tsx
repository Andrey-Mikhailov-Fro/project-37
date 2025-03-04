/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { State, fetchTests, fetchSites } from "../servises/api";
import "./TestCard.css";
import { useNavigate } from "react-router-dom";

type TestCardProps = {
  testName: string;
  testType: string;
  testStatus: string;
  testSite: string;
  testId: number;
};

export default function TestsList({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => string;
}) {
  const initialState: State = {
    tests: [],
    sites: [],
  };

  const switcher = {
    NAME: "NAME",
    TYPE: "TYPE",
    SITE: "SITE",
    STATUS: "STATUS",
    DEFAULT: "DEFAULT",
  };

  const [state, setState] = useState(initialState);
  const [sort, setSort] = useState(switcher.DEFAULT);
  const [reverse, setReverse] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const tests = await fetchTests();
      const sites = await fetchSites();

      setState({
        tests,
        sites,
      });
    };

    getData();
  }, []);

  const TestCard = ({
    testName,
    testType,
    testStatus,
    testId,
    testSite,
  }: TestCardProps) => {
    const attrDispetcher = {
      ONLINE: "status-online",
      PAUSED: "status-paused",
      DRAFT: "status-draft",
      STOPPED: "status-stopped",
    };

    const isValidStatus = Object.keys(attrDispetcher).includes(testStatus);

    const className = isValidStatus
      ? attrDispetcher[testStatus as keyof typeof attrDispetcher]
      : "";

    const buttonSpec =
      testStatus === "DRAFT"
        ? {
            class: " button-finalize",
            name: "Finalize",
            nav: `/finalize/${testId}`,
          }
        : {
            class: " button-results",
            name: "Results",
            nav: `/results/${testId}`,
          };

    return (
      <div className="card">
        <div className="card-content">
          <h2 className="card-title">{testName}</h2>
          <div className="card-details">
            <span className="card-type">{testType}</span>
            <span className={"card-status " + className}>{testStatus}</span>
          </div>
          <div className="card-site">{testSite}</div>
          <button
            className={"card-button" + buttonSpec.class}
            onClick={() => navigate(buttonSpec.nav)}
          >
            {buttonSpec.name}
          </button>
        </div>
      </div>
    );
  };

  const normalizedSites = state.sites.map((site) => {
    const normilizeUrl = (url: string) => {
      const objUrl = new URL(url);

      const hostname = objUrl.hostname
        .split(".")
        .map((part) => (part === "www" ? "" : part))
        .join(".");
      return hostname;
    };

    const newSite = {
      id: site.id,
      url: normilizeUrl(site.url),
    };

    return newSite;
  });

  const seachingTests = value
    ? state.tests.filter((test) => test.name.toLowerCase().includes(value))
    : state.tests;

  const sortList = (list: typeof seachingTests) => {
    if (sort === switcher.DEFAULT) return list;

    const accumulator: typeof list = [];

    const sortOrder = {
      [switcher.NAME]: () =>
        list.sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
        ),
      [switcher.TYPE]: () =>
        list.sort((a, b) => {
          const typeComp = a.type.localeCompare(b.type, undefined, {
            sensitivity: "base",
          });

          if (typeComp === 0) {
            return a.name.localeCompare(b.name, undefined, {
              sensitivity: "base",
            });
          }

          return typeComp;
        }),
      [switcher.SITE]: () =>
        normalizedSites
          .sort((a, b) =>
            a.url.localeCompare(b.url, undefined, { sensitivity: "base" })
          )
          .reduce((acc, site) => {
            const thisSiteTests = list.filter(
              (test) => test.siteId === site.id
            );
            const sortedTests = thisSiteTests.sort((a, b) =>
              a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
            );
            acc = [...acc, ...sortedTests];
            return acc;
          }, accumulator),
      [switcher.STATUS]: () => {
        const statusOrder = {
          ONLINE: 1,
          PAUSED: 2,
          STOPPED: 3,
          DRAFT: 4,
        };

        return list.sort((a, b) => {
          const compA = statusOrder[a.status as keyof typeof statusOrder];
          const compB = statusOrder[b.status as keyof typeof statusOrder];

          return compA - compB;
        });
      },
    };

    const sortedList = sortOrder[sort] ? sortOrder[sort]() : list;

    if (reverse) return sortedList.reverse();
    return sortedList;
  };

  const handleSort = (category: string) => {
    if (category === sort) {
      setReverse(!reverse);
      return;
    }

    setSort(switcher[category as keyof typeof switcher]);

    console.log(sort);
  };

  const finalTestList = sortList(seachingTests);

  const haveResults = finalTestList.length !== 0;

  const NoResults = () => {
    return (
      <div className="no-results">
        <p className="no-results-message">
          Your search did not match any results.
        </p>
        <button
          className="card-button button-results"
          onClick={() => setValue("")}
        >
          Reset
        </button>
      </div>
    );
  };

  if (!haveResults) return <NoResults />;

  return (
    <>
      <div className="tab">
        <div className="tab-title" onClick={() => handleSort(switcher.NAME)}>
          <span className={switcher.NAME === sort ? "active" : "disabled"}>
            NAME
          </span>
          <img
            alt="dd"
            src="/dropdown.svg"
            className={reverse ? "reverse" : "order"}
          />
        </div>
        <div className="tab-type" onClick={() => handleSort(switcher.TYPE)}>
          <span className={switcher.TYPE === sort ? "active" : "disabled"}>
            TYPE
          </span>
          <img
            alt="dd"
            src="/dropdown.svg"
            className={reverse ? "reverse" : "order"}
          />
        </div>
        <div className="tab-status" onClick={() => handleSort(switcher.STATUS)}>
          <span className={switcher.STATUS === sort ? "active" : "disabled"}>
            STATUS
          </span>
          <img
            alt="dd"
            src="/dropdown.svg"
            className={reverse ? "reverse" : "order"}
          />
        </div>
        <div className="tab-site" onClick={() => handleSort(switcher.SITE)}>
          <span className={switcher.SITE === sort ? "active" : "disabled"}>
            SITE
          </span>
          <img
            alt="dd"
            src="/dropdown.svg"
            className={reverse ? "reverse" : "order"}
          />
        </div>
      </div>
      <ul className="list">
        {finalTestList.map((test) => {
          const site = normalizedSites.find(
            (currSite) => currSite.id === test.siteId
          );
          return (
            <li key={test.name}>
              <TestCard
                testName={test.name}
                testType={test.type}
                testStatus={test.status}
                testId={test.id}
                testSite={site?.url ?? ""}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
