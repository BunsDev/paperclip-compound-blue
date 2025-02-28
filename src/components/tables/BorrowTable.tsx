"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MarketSummary } from "@/data/whisk/getMarketSummaries";
import Image from "next/image";
import { formatNumber } from "@/utils/format";
import { Table } from "./Table";
import Apy from "../Apy";
import { useUserPositionContext } from "@/providers/UserPositionProvider";
import { useMemo } from "react";
import NumberFlow from "../ui/NumberFlow";

interface TableProps {
  marketSummaries: MarketSummary[];
}

export const columns: ColumnDef<MarketSummary & { userBorrowUsd: number; userLtv: number }>[] = [
  {
    accessorKey: "loanAsset.symbol",
    header: "Loan Asset",
    cell: ({ row }) => {
      const market = row.original;

      return (
        <div className="flex items-center gap-3">
          <Image
            src={market.loanAsset.icon ?? ""}
            width={36}
            height={36}
            className="shrink-0 rounded-full border"
            alt={market.loanAsset.symbol}
          />
          <span>{market.loanAsset.symbol}</span>
        </div>
      );
    },
    minSize: 160,
  },
  {
    accessorKey: "collateralAsset.symbol",
    header: "Collateral Asset",
    cell: ({ row }) => {
      const market = row.original;

      return market.collateralAsset ? (
        <div className="flex items-center gap-3">
          <Image
            src={market.collateralAsset.icon ?? ""}
            width={36}
            height={36}
            className="shrink-0 rounded-full border"
            alt={market.collateralAsset.symbol}
          />
          <span>{market.collateralAsset.symbol}</span>
        </div>
      ) : (
        "N/A"
      );
    },
    minSize: 160,
  },
  {
    accessorKey: "userBorrowUsd",
    header: "Your Borrow",
    cell: ({ row }) => {
      return <NumberFlow value={row.original.userBorrowUsd} format={{ currency: "USD" }} />;
    },
    minSize: 160,
  },
  {
    accessorKey: "lltv",
    header: "Your LTV / LLTV",
    cell: ({ row }) => {
      const market = row.original;
      return (
        <span>
          <NumberFlow value={row.original.userLtv} format={{ style: "percent", minimumFractionDigits: 1 }} /> /{" "}
          {formatNumber(market.lltv, { style: "percent", minimumFractionDigits: 1 })}
        </span>
      );
    },
    minSize: 160,
  },
  {
    accessorKey: "liquidityAssetsUsd",
    header: "Liquidity",
    accessorFn: (row) => formatNumber(row.liquidityAssetsUsd, { currency: "USD" }),
    minSize: 140,
  },
  {
    accessorKey: "borrowApy.total",
    header: "Borrow APY",
    cell: ({ row }) => {
      const market = row.original;
      return <Apy type="borrow" apy={market.borrowApy} />;
    },
    minSize: 140,
  },
];

export default function BorrowTableClient({ marketSummaries }: TableProps) {
  // Inject user position
  const {
    userMarketPositionsQuery: { data: userMarketPositions },
  } = useUserPositionContext();

  const marketSummariesWithUserPositions = useMemo(() => {
    return marketSummaries.map((market) => {
      const userBorrowUsd = userMarketPositions?.[market.marketId]?.borrowAssetsUsd ?? 0;
      const userLtv = userMarketPositions?.[market.marketId]?.ltv ?? 0;
      return { ...market, userBorrowUsd, userLtv };
    });
  }, [marketSummaries, userMarketPositions]);

  return (
    <Table
      columns={columns}
      data={marketSummariesWithUserPositions}
      initialSortKey="liquidityAssetsUsd"
      rowLink={(row) => `/borrow/${row.marketId}`}
    />
  );
}
