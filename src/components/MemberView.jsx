import {
  Box,
  Flex,
  Text,
  VStack,
  Card,
  CardBody,
  Heading,
  Stack,
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import { NavigationContext } from "../Contexts";
import MemberDetail from "./MemberDetail";
import MemberDataTable from "./MemberDataTable";

const MemberView = ({ members }) => {
  const [memberDetail, loadMemberDetail] = useState(null);
  const [detailOpened, openDetail] = useState(false);
  const { openNav } = useContext(NavigationContext);

  function formatDate(dateTime) {
    let dateOnly = dateTime.replace(/\s\d{2}:\d{2}:\d{2}/, "");
    return dateOnly;
  }

  const showDetail = (member) => {
    console.log(member);
    loadMemberDetail(member);
    openDetail(true);
    openNav(false);
  };

  const closeDetail = () => {
    openDetail(false);
    openNav(true);
  };

  return (
    <>
      {detailOpened ? (
        <MemberDetail onBack={closeDetail} memberData={memberDetail} />
      ) : (
        <VStack w="100%" p={5} pt="2rem">
          <Flex w="100%" gap="15px">
            <Flex
              backgroundColor="orange"
              w={10}
              h={10}
              alignItems="center"
              justifyContent="center"
              borderRadius="xl"
            >
              <Search2Icon boxSize={6} color="#fff" />
            </Flex>
            <Text fontSize="2xl" fontWeight="bold" marginBottom="1rem">
              Daftar Member
            </Text>
          </Flex>


          {members && members.length > 0 ? (
            <MemberDataTable data={members} onShowDetail={showDetail} />
          ) : (
            <Text textAlign="center" textColor="gray.600" fontStyle="italic">
              No data
            </Text>
          )}
        </VStack>
      )}
    </>
  );
};
export default MemberView;
