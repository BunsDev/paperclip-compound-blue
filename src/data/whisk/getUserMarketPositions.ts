import "server-only";
import { graphql } from "@/generated/gql/whisk";
import { whiskClient } from "./client";
import { CHAIN_ID, WHITELISTED_MARKET_IDS } from "@/config";
import { Address } from "viem";
import { cacheAndCatch } from "@/data/cacheAndCatch";

const query = graphql(`
  query getMarketPosition($chainId: Number!, $marketId: String!, $accountAddress: String!) {
    morphoMarketPosition(chainId: $chainId, marketId: $marketId, accountAddress: $accountAddress) {
      market {
        marketId
        lltv
        collateralAsset {
          symbol
        }
        loanAsset {
          symbol
          decimals
          icon
        }
        borrowApy {
          base
          total
          rewards {
            asset {
              symbol
              icon
            }
            apr
          }
        }
      }
      collateralAssets
      collateralAssetsUsd
      supplyAssetsUsd
      borrowAssets
      borrowAssetsUsd
      maxBorrowAssetsUsd
      maxBorrowAssets
      ltv
    }
  }
`);

export const getUserMarketPositions = cacheAndCatch(async (accountAddress: Address) => {
  const marketPositions = await Promise.all(
    WHITELISTED_MARKET_IDS.map((marketId) =>
      whiskClient.request(query, { chainId: CHAIN_ID, marketId, accountAddress })
    )
  );
  return Object.fromEntries(
    marketPositions
      .filter((position) => position.morphoMarketPosition?.market)
      .map((position) => [position.morphoMarketPosition!.market!.marketId, position.morphoMarketPosition!])
  );
}, "getUserMarketPositions");

export type UserMarketPositions = NonNullable<Awaited<ReturnType<typeof getUserMarketPositions>>>;
