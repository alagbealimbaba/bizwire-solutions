import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Button,
  HStack,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer";
import BlogCard from "./BlogCard";
import { getPosts } from "../../../utils/blogStorage";

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(posts.map((p) => p.category).filter(Boolean));
    return ["All", ...cats];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return posts.filter((post) => {
      const matchesSearch =
        !term ||
        post.title?.toLowerCase().includes(term) ||
        post.content?.toLowerCase().includes(term) ||
        post.tags?.some((t) => t.toLowerCase().includes(term));
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setVisibleCount(POSTS_PER_PAGE);
  };

  return (
    <Box minH="100vh" bg="gray.100">
      <Navbar />

      {/* Hero — centered */}
      <Box
        py={{ base: 14, lg: 20 }}
        px={{ base: 6, lg: 12 }}
        bgImage="url('./thought-catalog.jpg')"
        bgSize="cover"
        bgPos="center"
        bgRepeat="no-repeat"
        position="relative"
        borderBottom="1px solid"
        borderColor="gray.300"
        textAlign="center"
        _before={{
          content: '""',
          position: "absolute",
          inset: 0,
          bg: "rgba(0,0,0,0.55)",
        }}
      >
        {/* Gold rule */}
        <Box w="40px" h="3px" bg="#a17635" mx="auto" mb={5} position="relative" />

        <Text
          fontSize={{ base: "38px", lg: "56px" }}
          fontWeight="700"
          color="white"
          fontStyle="italic"
          lineHeight="1.15"
          mb={3}
          position="relative"
        >
          Our Blog
        </Text>
        <Text
          color="gray.300"
          fontSize={{ base: "md", lg: "lg" }}
          fontStyle="italic"
          mb={8}
          position="relative"
        >
          Insights, stories and expertise from our team
        </Text>

        <InputGroup maxW="520px" mx="auto" position="relative">
          <InputLeftElement h="52px" pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search articles..."
            bg="white"
            h="52px"
            pl={10}
            fontSize="md"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="0"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setVisibleCount(POSTS_PER_PAGE);
            }}
            _focus={{ borderColor: "#a17635", boxShadow: "0 0 0 1px #a17635" }}
          />
        </InputGroup>
      </Box>

      {/* Category filters — centered */}
      {categories.length > 1 && (
        <Box
          bg="white"
          borderBottom="1px solid"
          borderColor="gray.200"
          py={4}
          px={{ base: 4, lg: 8 }}
          overflowX="auto"
        >
          <HStack spacing={2} justifyContent="center" minW="max-content" mx="auto">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <Button
                  key={cat}
                  size="sm"
                  borderRadius="0"
                  px={6}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(POSTS_PER_PAGE);
                  }}
                  bg={active ? "#000" : "transparent"}
                  color={active ? "#a17635" : "#6a7c92"}
                  border="1px solid"
                  borderColor={active ? "#000" : "gray.300"}
                  fontWeight={active ? "700" : "500"}
                  fontStyle="italic"
                  _hover={{ bg: "#000", color: "#a17635", borderColor: "#000" }}
                  transition="all 0.2s"
                >
                  {cat}
                </Button>
              );
            })}
          </HStack>
        </Box>
      )}

      {/* Posts */}
      <Box maxW="1200px" mx="auto" px={{ base: 4, lg: 8 }} py={12}>
        {loading ? (
          <Center py={20}>
            <Spinner size="xl" color="#a17635" thickness="4px" />
          </Center>
        ) : filteredPosts.length === 0 ? (
          <Center py={20} flexDirection="column" gap={4}>
            <Text fontSize="56px">📭</Text>
            <Text fontSize="xl" fontWeight="700" color="#000" fontStyle="italic">
              No posts found
            </Text>
            <Text color="#6a7c92" fontStyle="italic" textAlign="center">
              Try a different search term or category
            </Text>
            <Button
              onClick={clearFilters}
              bg="#000"
              color="#a17635"
              _hover={{ bg: "#a17635", color: "#000" }}
              borderRadius="0"
              px={6}
            >
              Clear filters
            </Button>
          </Center>
        ) : (
          <>
            {/* Results count */}
            <Flex
              justifyContent="space-between"
              alignItems="center"
              mb={8}
              flexWrap="wrap"
              gap={2}
            >
              <Flex alignItems="center" gap={2}>
                <Box w="3px" h="16px" bg="#a17635" />
                <Text color="#6a7c92" fontSize="sm" fontStyle="italic">
                  {filteredPosts.length} article
                  {filteredPosts.length !== 1 ? "s" : ""}
                  {selectedCategory !== "All" ? ` in "${selectedCategory}"` : ""}
                  {searchTerm ? ` matching "${searchTerm}"` : ""}
                </Text>
              </Flex>
              {(searchTerm || selectedCategory !== "All") && (
                <Button
                  size="sm"
                  variant="ghost"
                  color="#6a7c92"
                  fontStyle="italic"
                  onClick={clearFilters}
                  _hover={{ color: "#000" }}
                >
                  Clear filters
                </Button>
              )}
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {visiblePosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </SimpleGrid>

            {hasMore && (
              <Center mt={12}>
                <Button
                  onClick={() => setVisibleCount((c) => c + POSTS_PER_PAGE)}
                  bg="#000"
                  color="#a17635"
                  _hover={{ bg: "#a17635", color: "#000" }}
                  px={10}
                  py={6}
                  borderRadius="0"
                  fontWeight="700"
                >
                  Load More ({filteredPosts.length - visibleCount} remaining)
                </Button>
              </Center>
            )}
          </>
        )}
      </Box>

      <Footer />
    </Box>
  );
};

export default Blog;
