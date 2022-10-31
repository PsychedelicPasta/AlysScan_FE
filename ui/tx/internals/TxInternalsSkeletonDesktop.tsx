import { Skeleton, Flex } from '@chakra-ui/react';
import React from 'react';

import SkeletonTable from 'ui/shared/SkeletonTable';

const TxInternalsSkeletonDesktop = () => {
  return (
    <>
      <Flex columnGap={ 3 } h={ 8 } mb={ 6 }>
        <Skeleton w="78px"/>
        <Skeleton w="360px"/>
      </Flex>
      <SkeletonTable columns={ [ '28%', '20%', '24px', '20%', '16%', '16%' ] }/>
    </>
  );
};

export default TxInternalsSkeletonDesktop;