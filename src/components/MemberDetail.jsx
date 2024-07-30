import {
  Flex,
  Box,
  Button,
  VStack,
  Text,
  Input,
  FormControl,
  FormLabel,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SkeletonView from "./SkeletonView";
import { get } from "../common/api";

const BASE_URL = "https://taperake.com/";

function MemberDetail({ onBack, memberData }) {
  const [detail, setDetail] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      console.log("fetch tasks");
      const getMember = await get(`mgmt/member/${memberData.id}`);
      const member = await getMember.json();
      setDetail({
        nama_lengkap: {
          label: "Nama Lengkap",
          value: memberData.nama_lengkap,
        },
        email: {
          label: "Email",
          value: memberData.email,
        },
        status: {
          label: "Status",
          value: memberData.status,
        },
        tempat_lahir: {
          label: "Tempat Lahir",
          value: member.tempat_lahir,
        },
        tanggal_lahir: {
          label: "Tanggal Lahir",
          value: member.tanggal_lahir,
        },
        no_hp: {
          label: "No. HP/WhatsApp",
          value: member.no_hp,
        },
        alamat: {
          label: "Alamat",
          value: member.alamat,
        },
        akun_meta: {
          label: "Facebook/Instagram",
          value: member.akun_meta,
        },
        asosiasi: {
          label: "Nama LPK/IM Japan",
          value: member.asosiasi,
        },
        tanggal_pulang: {
          label: "Tanggal Pulang",
          value: member.tanggal_pulang,
        },
        paket: {
          label: "Paket yang diambil",
          value: member.paket,
        },
        periode: {
          label: "Periode",
          value: member.periode,
        },
        omiyage: {
          label: "Omiyage",
          value: member.omiyage,
        },
        created_at: {
          label: "Tanggal Daftar",
          value: member.created_at,
        },
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [memberData.id]);

  return (
    <>
      {isLoading ? (
        <SkeletonView />
      ) : (
        <>
          <VStack w="100%" h="100%" p={5} className="member-detail">
            <Box w="100%" flex="1">
              <VStack w="100%">
                <Flex
                  gap="20px"
                  marginBottom="2rem"
                  w="100%"
                  alignItems="center"
                >
                  <Button
                    borderRadius="full"
                    size="sm"
                    colorScheme="orange"
                    variant="outline"
                    px="1rem"
                    onClick={onBack}
                  >
                    Back
                  </Button>
                  <Text fontWeight="semibold" fontSize="lg">
                    Data Member
                  </Text>
                </Flex>

                <VStack
                  w="100%"
                  gap="15px"
                  className="member-detail-data"
                  alignItems="start"
                >
                  <Flex gap={5}>
                    <Link href={`${BASE_URL}api/mgmt/userfile/${memberData.id}`} isExternal>
                      <Button colorScheme="blue" px="1rem" onClick={onBack}>
                        Lihat Photo
                      </Button>
                    </Link>

                    <Link href={`${BASE_URL}api/mgmt/userdoc/${memberData.id}`} isExternal>
                      <Button colorScheme="green" px="1rem" onClick={onBack}>
                        Lihat KTP
                      </Button>
                    </Link>
                  </Flex>
                  {Object.entries(detail).map(([key, obj]) => (
                    <FormControl key={key}>
                      <FormLabel htmlFor={key} fontWeight="semibold">
                        {obj.label}
                      </FormLabel>
                      <Input
                        type="text"
                        id={key}
                        value={obj.value}
                        readOnly={true}
                        bgColor="white"
                      />
                    </FormControl>
                  ))}
                </VStack>
              </VStack>
            </Box>
          </VStack>
        </>
      )}
    </>
  );
}

export default MemberDetail;
