import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Body } from "../atom/Body";
import { Grid3Cols } from "../atom/GridLayouts";
import { HeadingText, Title } from "../atom/Headings";
import { Card } from "../components/Card";
import { Empty } from "../components/Empty";
import { Pagination } from "../components/Pagination";
import { Section } from "../components/Section";
import { useCarouselContext } from "../context/carouselImage";
import { useAPI } from "../hooks/API";
import { getImgSrc } from "../hooks/getImg";

// eslint-disable-next-line react/display-name
export const MainPage = React.memo(
  // eslint-disable-next-line react/prop-types
  ({ url, name, cards }) => {
    const history = useHistory();
    const [pageIdx, setPageIdx] = useState(1);

    const { data, error } = useAPI(`${url}/?page=${pageIdx}`);
    const { setImages } = useCarouselContext();

    useEffect(() => {
      if (data && !error && data.results.length) setImages(data.results);
    }, [data, error]);

    if (error || !data) return <HeadingText>Loading ...</HeadingText>;
    const res = data.results;

    return (
      <Body>
        <Section heading={<Title classes="">{name}</Title>}>
          <Grid3Cols>
            {res.map((data) => (
              <Card
                key={data.id}
                src={getImgSrc(data)}
                onClick={() => history.push(`${url}/${data.id}`)}
              >
                <HeadingText>{data.title}</HeadingText>
              </Card>
            ))}

            {res.length === 0 && <Empty />}
          </Grid3Cols>

          <Pagination
            prev={!!data.previous}
            next={!!data.next}
            handleNext={() => setPageIdx((idx) => idx - 1)}
            handlePrev={() => setPageIdx((idx) => idx + 1)}
          />
        </Section>
      </Body>
    );
  }
);
