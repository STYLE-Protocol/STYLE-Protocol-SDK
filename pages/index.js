import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useContext, useEffect, useState } from "react";

import {
  getRequestedNFTs,
  approveERC20,
  buyItem,
  buyAndMintItem,
  getRequestedSingularNFTs,
} from "../services/contractService";

import Card from "../components/Card";
import PropertySelector from "../components/PropertySelector";
import {
  Text,
  Box,
  VStack,
  Flex,
  Wrap,
  Center,
  Divider,
  Spinner,
} from "@chakra-ui/react";

import { metaversesJson, PROTOCOL_CONTRACTS } from "../constants";

import { AppContext } from "../contexts/AppContext";

export default function Home() {
  const {
    walletAddress,
    web3,
    chainId,
    isLoading,
    setIsLoading,
    checkIfWalletIsConnected,
    connectWallet,
  } = useContext(AppContext);

  const [requestedNFTs, setRequestedNFTs] = useState([]);
  const [metaverseFilter, setMetaverseFilter] = useState([]);

  const allProperties = {
    METAVERSE: metaversesJson.map((cur) => {
      return { name: cur.name, slug: cur.slug };
    }),
  };

  const allSetters = {
    METAVERSE: setMetaverseFilter,
  };

  const fetchRequestedNFTs = async (cursor, amount, chainId_, metaverse_) => {
    setIsLoading(true);
    setRequestedNFTs([]);
    console.log(
      await getRequestedSingularNFTs({
        owner: "0x67701e71F9412Af1BcB2D77897F40139B6Ccc073",
        chainId: chainId_,
      })
    );
    const requestedNFTs_ = await getRequestedNFTs({
      cursor,
      amount,
      chainId: chainId_,
      metaverseFilter: metaverse_,
    });

    setRequestedNFTs(requestedNFTs_);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRequestedNFTs(0, 100, chainId || 5, metaverseFilter);
  }, [chainId, metaverseFilter]);

  const onBuyAndMint = async (NFT) => {
    setIsLoading(true);
    try {
      await preBuy();
      await approveERC20({
        web3,
        walletAddress,
        chainId: chainId || 5,
        NFT,
        spender: PROTOCOL_CONTRACTS[chainId || 5],
      });

      await buyAndMintItem({ web3, walletAddress, chainId: chainId || 5, NFT });

      fetchRequestedNFTs(0, 100, chainId || 5, metaverseFilter);
    } catch (error) {
      console.log("buyAndMintError", error);
    }
    setIsLoading(false);
  };

  const preBuy = async () => {
    if (!(await checkIfWalletIsConnected())) {
      await connectWallet();
    }
  };

  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="viewport-fit=cover , initial-scale=0.8, maximum-scale=0.8, user-scalable=no "
        />
        <title>$STYLE | Protocol - SDK</title>
        <meta
          name="description"
          content="Style-SDK is way to integrate with your website using HTML &amp; JS file only."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <Flex>
          <VStack w={"20%"} borderRight={"solid"} borderWidth={"3px"}>
            {Object.keys(allProperties).map((property, key) => (
              <Box key={key}>
                <PropertySelector
                  name={property}
                  properties={allProperties[property]}
                  setter={allSetters[property]}
                />
                <Divider orientation="horizontal" />
              </Box>
            ))}
          </VStack>
          <Center w={"100%"}>
            {!isLoading ? (
              <Wrap>
                {requestedNFTs.map((NFT, key) => (
                  <Box key={key}>
                    <Card
                      name={NFT.asset.name}
                      animation_url={NFT.asset.animation_url}
                      properties={{
                        Metaverse: metaversesJson
                          .filter((cur) => cur.id === `${NFT.metaverseId}`)[0]
                          .slug.toLowerCase(),
                      }}
                      onClickFunction={() => onBuyAndMint(NFT)}
                      availiableDerivatives={NFT.numberOfDerivatives}
                    />
                  </Box>
                ))}
                {requestedNFTs.length === 0 && (
                  <Text fontSize={"1.15rem"} fontWeight={"600"}>
                    No items to buy.
                  </Text>
                )}
              </Wrap>
            ) : (
              <Center>
                <Spinner size={"lg"} />
              </Center>
            )}
          </Center>
        </Flex>
      </Box>

      <footer className={styles.footer}>
        <a
          href="https://www.protocol.style/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by $STYLE | Protocol
        </a>
      </footer>
    </div>
  );
}
