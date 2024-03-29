import { Box, Button, Flex, Grid, Tag, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import { DEFAULT_IMAGE, GATEWAY } from "../constants";
import { getAllContracts } from "../services/constantsService";

import NFTViewer from "./NFTViewer";

const Card = ({
  name,
  animation_url,
  image_url,
  properties,
  onClickFunction,
  availiableDerivatives,
  viewFormat,
}) => {
  const [metaversesJson, setMetaversesJson] = useState([]);

  useEffect(() => {
    (async () => {
      const contracts = await getAllContracts();
      setMetaversesJson(contracts["metaversesJson"]);
    })();
  }, []);

  const animationURL = useMemo(() => {
    if (animation_url.slice(0, 4) === "ipfs") {
      return `https://${GATEWAY}/ipfs/${animation_url.slice(7)}`;
    }
    return animation_url;
  });

  const imageUrl = useMemo(() => {
    if (image_url.startsWith("ipfs")) {
      return `https://${GATEWAY}/ipfs/${image_url.slice(7)}`;
    }
    return image_url;
  }, []);

  const [hovered, setHovered] = useState(false);
  const [hoveredTimeout, setHoveredTimeout] = useState(null);

  const modelSize = useMemo(
    () =>
      viewFormat === "mosaic"
        ? "20rem"
        : viewFormat === "window"
        ? "20rem"
        : "16rem",
    [viewFormat]
  );

  const metaverseId = useMemo(() => {
    return Number(
      metaversesJson?.find((mv) => mv.slug === properties.Metaverse)?.id
    );
  }, [properties, metaversesJson]);

  const HOVER_DELAY = 500;

  return (
    <Box w="full" color="black">
      <Box
        // className={styles.nft_card}
        boxShadow="0 0 5px #000000 !important"
        overflow={"hidden"}
        color="white"
        pos="relative"
        bgColor="gradeint"
        borderRadius="2rem"
        style={{ cursor: "pointer" }}
      >
        <Box>
          <Flex direction={"column"} w="full" p="1rem" pb="0">
            <Flex justify={"center"}>
              <Text
                fontWeight={"bold"}
                fontSize={"1.25rem"}
                color="black"
                noOfLines={1}
              >
                {name}
              </Text>
            </Flex>
            <Flex
              pos="relative"
              w="full"
              // bg='#d2d4d6'
              borderRadius="2rem"
              alignItems="center"
              justifyContent="center"
              h={
                viewFormat === "window"
                  ? ["26rem", "26rem", "26rem", "24rem", "22rem", "24rem"]
                  : ["26rem", "26rem", "18rem", "18rem", "20rem", "20rem"]
              }
              onMouseEnter={() => {
                setHoveredTimeout(
                  setTimeout(() => setHovered(true), HOVER_DELAY)
                );
              }}
              onMouseLeave={() => {
                if (hoveredTimeout !== null) {
                  clearTimeout(hoveredTimeout);
                  setHoveredTimeout(null);
                }
                setHovered(false);
              }}
            >
              <NFTViewer
                hovered={hovered}
                model={animationURL}
                canvaStyles={{
                  width: modelSize,
                  height: modelSize,
                }}
                style={{ borderRadius: "2rem" }}
                objectFit="cover"
                h="full"
                rounded="md"
                is3D={animationURL ? true : false}
                fallback={DEFAULT_IMAGE}
                src={imageUrl}
                alt={name || ""}
                metaverseId={metaverseId}
              />
            </Flex>
            <Flex justify={"flex-end"}>
              <Tag w={"fit-content"}>{availiableDerivatives} left</Tag>
            </Flex>
            <Grid gap={"0.5rem"}>
              <Box fontWeight={"700"} color="black">
                Properties:
              </Box>
              <VStack align={"stretch"}>
                {Object.keys(properties).map((property, index) => (
                  <Text key={index} color="black">
                    {property}: {properties[property]}
                  </Text>
                ))}
              </VStack>
            </Grid>

            <Flex>
              <Button w={"100%"} onClick={onClickFunction} color="black">
                Buy
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
