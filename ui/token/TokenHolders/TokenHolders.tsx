import type { UseQueryResult } from '@tanstack/react-query';
import React from 'react';

import type { TokenHolders, TokenInfo } from 'types/api/token';

import useIsMobile from 'lib/hooks/useIsMobile';
import ActionBar from 'ui/shared/ActionBar';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import DataListDisplay from 'ui/shared/DataListDisplay';
import Pagination from 'ui/shared/Pagination';
import type { Props as PaginationProps } from 'ui/shared/Pagination';

import TokenHoldersList from './TokenHoldersList';
import TokenHoldersTable from './TokenHoldersTable';

type Props = {
  tokenQuery: UseQueryResult<TokenInfo>;
  holdersQuery: UseQueryResult<TokenHolders> & {
    pagination: PaginationProps;
    isPaginationVisible: boolean;
  };
}

const TokenHoldersContent = ({ holdersQuery, tokenQuery }: Props) => {

  const isMobile = useIsMobile();
  if (holdersQuery.isError || tokenQuery.isError) {
    return <DataFetchAlert/>;
  }

  const actionBar = isMobile && holdersQuery.isPaginationVisible && (
    <ActionBar mt={ -6 }>
      <Pagination ml="auto" { ...holdersQuery.pagination }/>
    </ActionBar>
  );

  const items = holdersQuery.data?.items;

  const content = items && tokenQuery.data ? (
    <>
      { !isMobile && <TokenHoldersTable data={ items } token={ tokenQuery.data } top={ holdersQuery.isPaginationVisible ? 80 : 0 }/> }
      { isMobile && <TokenHoldersList data={ items } token={ tokenQuery.data }/> }
    </>
  ) : null;

  return (
    <DataListDisplay
      isError={ holdersQuery.isError || tokenQuery.isError }
      isLoading={ holdersQuery.isLoading || tokenQuery.isLoading }
      items={ holdersQuery.data?.items }
      skeletonProps={{ skeletonDesktopColumns: [ '100%', '300px', '175px' ] }}
      emptyText="There are no holders for this token."
      content={ content }
      actionBar={ actionBar }
    />
  );
};

export default TokenHoldersContent;