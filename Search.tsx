import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { CheckBoxList } from "./CheckList";
import { useQueryParam, ArrayParam } from "use-query-params";
import { Link, navigate } from "gatsby";

const topicsValue = [
  { title: "Accountability Keynote Speakers", value: 1 },
  { title: "Activist Keynote Speakers", value: 2 },
  { title: "Adversity", value: 3 },
  { title: "African American Keynote Speakers | Black Speakers", value: 4 },
];
const rangesValue = [
  { title: "$10.000 - $20.000", value: 1 },
  { title: "$1 - $200", value: 2 },
];
const countriesValue = [
  { title: "USA", value: 1 },
  { title: "Canada", value: 2 },
  { title: "Germany", value: 3 },
];
const locationValue = [
  { title: "Boston", value: 1 },
  { title: "Atlanta", value: 2 },
  { title: "Las Vegas", value: 3 },
];
const genderValue = [
  { title: "Female", value: 1 },
  { title: "Male", value: 2 },
  { title: "Other", value: 3 },
];
let arr_EN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const ContainerContentTop = styled("div")<{ bg: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ bg }) => bg};
  align-items: center;
  justify-content: center;
`;
export const ContentRes = styled("div")`
  display: flex;
  border-bottom: solid 1px #4e4e4e;
  justify-content: center;
  width: 1300px;
  @media (max-width: 1300px) {
    width: 100%;
  }
  @media (max-width: 990px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
export const Btn = styled(Button)`
  background: #f5af27;
  color: #000;
  width: 175px;
  border-radius: 0;
  &:hover {
    background: #fff;
    color: #000;
  }
  @media (max-width: 990px) {
    height: 60px;
  }
`;
export const CustomUl = styled("ul")`
  display: flex;
  padding: 0;
  margin: 50px 0;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 375px) {
    width: 95%;
  }
`;
const CustomLi = styled("li")<{ active?: boolean }>`
  list-style-type: none;
  width: 30px;
  height: 30px;
  border: ${({ active }) => (active ? "1px solid #fff" : "none")};
  box-sizing: border-box;
  font-size: 0.8em;
  a {
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-weight: 600;

    width: 100%;
    color: ${({ active }) => (active ? "#fff" : "#f5af27")};
  }
  :hover {
    border: 1px solid #fff;
    a {
      color: #fff;
    }
  }
`;
const ListsContainer = styled("div")`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 990px) {
    width: 80%;
    flex-wrap: wrap;
    justify-content: center;
  }
  @media (max-width: 460px) {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
`;
const BtnContainer = styled("div")`
  display: flex;
`;
const BtnClear = styled(Button)`
  background: #1d1d1d;
  color: #f5af27;
  width: 175px;
  border-radius: 0;
  &:hover {
    background: #fff;
    color: #000;
  }
  @media (max-width: 990px) {
    height: 60px;
  }
`;
type ArrType = { title: string; value: number }[] | [];

const filterSelected = (selectedValues: string[], allValues: ArrType) => {
  return selectedValues.map((item) => {
    return allValues.find(({ value }) => value === Number(item));
  });
};
const useFilterFromQuery = (
  name: string,
  allValues: ArrType,
  queryConfig: typeof ArrayParam
): [ArrType, (newValues: ArrType) => void] => {
  const [valueFromQuery] = useQueryParam(name, queryConfig);
  const [values, setValue] = useState<ArrType>(
    filterSelected(valueFromQuery || [], allValues)
  );

  const setFilteredValue = (newValues: ArrType): void =>
    setValue(
      filterSelected(
        newValues.map((t) => `${t.value}`),
        allValues
      )
    );

  return [values, setFilteredValue];
};

export const Search = () => {
  const [letterFromQuery] = useQueryParam("by_letter");
  const [topics, setTopics] = useFilterFromQuery(
    "topics",
    topicsValue,
    ArrayParam
  );
  const [ranges, setRanges] = useFilterFromQuery(
    "ranges",
    rangesValue,
    ArrayParam
  );
  const [countries, setCountries] = useFilterFromQuery(
    "countries",
    countriesValue,
    ArrayParam
  );
  const [location, setLocation] = useFilterFromQuery(
    "location",
    locationValue,
    ArrayParam
  );
  const [gender, setGender] = useFilterFromQuery(
    "gender",
    genderValue,
    ArrayParam
  );

  const [letter, setLetter] = useState(letterFromQuery);

  const getString = (allValues: ArrType, name: string) => {
    if (allValues.length === 0) {
      return [];
    } else {
      return allValues.map(({ value }) => `${name}=${value}`);
    }
  };
  const queryArr = () => {
    const stringQuery = [
      ...getString(topics, "topics"),
      ...getString(ranges, "ranges"),
      ...getString(countries, "countries"),
      ...getString(location, "location"),
      ...getString(gender, "gender"),
    ].join("&");
    return stringQuery;
  };
  const checkEmptyArray = (arr: ArrType) => {
    return arr.length > 0 ? true : false;
  };
  const navLetter = (l: string) => {
    return `/keynote-speakers/?by_letter=${l}${
      queryArr().trim().length === 0 ? "" : "&"
    }${queryArr()}`;
  };

  const navCustomQuery = (l = letterFromQuery) => {
    return (
      `${
        !l
          ? "/keynote-speakers/?"
          : `/keynote-speakers/?by_letter=${l}${
              queryArr().trim().length === 0 ? "" : "&"
            }`
      }` + queryArr()
    );
  };
  return (
    <>
      <ContainerContentTop bg="#1d1d1d">
        <ContentRes>
          <ListsContainer>
            <CheckBoxList
              defaultValue={topics}
              valueCheck={topicsValue}
              placeholder="Speaking Topics"
              setValue={setTopics}
            />
            <CheckBoxList
              defaultValue={ranges}
              valueCheck={rangesValue}
              placeholder="All Fee Ranges"
              setValue={setRanges}
            />
            <CheckBoxList
              defaultValue={countries}
              valueCheck={countriesValue}
              placeholder="All Countries"
              setValue={setCountries}
            />
            <CheckBoxList
              defaultValue={location}
              valueCheck={locationValue}
              placeholder="Location"
              setValue={setLocation}
            />
            <CheckBoxList
              defaultValue={gender}
              valueCheck={genderValue}
              placeholder="Gender"
              setValue={setGender}
            />
          </ListsContainer>
          <BtnContainer>
            <Btn
              variant="contained"
              onClick={() => {
                navigate(`${navCustomQuery()}`);
              }}
            >
              Search
            </Btn>
            {letterFromQuery ||
            checkEmptyArray(topics) ||
            checkEmptyArray(ranges) ||
            checkEmptyArray(countries) ||
            checkEmptyArray(location) ||
            checkEmptyArray(gender) ? (
              <BtnClear
                onClick={() => {
                  setTopics([]);
                  setRanges([]);
                  setCountries([]);
                  setLocation([]);
                  setGender([]);
                  navigate(`?`);
                }}
                variant="contained"
              >
                x CLEAR ALL
              </BtnClear>
            ) : null}
          </BtnContainer>
        </ContentRes>
      </ContainerContentTop>
      <ContainerContentTop bg="#000">
        <ContentRes>
          <CustomUl>
            {letterFromQuery ? (
              <CustomLi>
                <Link
                  onClick={() => {
                    setLetter("");
                  }}
                  to={navLetter("")}
                >
                  ALL
                </Link>
              </CustomLi>
            ) : null}
            {arr_EN.map((l) => (
              <CustomLi active={letterFromQuery === l}>
                <Link
                  onClick={() => {
                    setLetter(l);
                  }}
                  to={navLetter(l)}
                >
                  {l}
                </Link>
              </CustomLi>
            ))}
          </CustomUl>
        </ContentRes>
      </ContainerContentTop>
    </>
  );
};
