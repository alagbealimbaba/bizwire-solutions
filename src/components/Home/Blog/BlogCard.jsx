import { Box, Text, Badge, Flex, Image } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const CATEGORY_COLORS = {
  Technology: "blue",
  Business: "teal",
  Finance: "green",
  Marketing: "pink",
  Strategy: "orange",
  HR: "purple",
  Operations: "cyan",
};

export const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getExcerpt = (content, length = 140) => {
  if (!content) return "";
  return content.length > length ? content.substring(0, length) + "…" : content;
};

export const getReadTime = (content) =>
  Math.ceil((content?.split(/\s+/).length || 0) / 200) || 1;

const BlogCard = ({ post }) => {
  const navigate = useNavigate();
  const colorScheme = CATEGORY_COLORS[post.category] || "gray";
  const excerpt = post.excerpt || getExcerpt(post.content);
  const readTime = post.readTime || getReadTime(post.content);
  const initial = post.author?.[0]?.toUpperCase() || "A";

  return (
    <Box
      overflow="hidden"
      bg="white"
      boxShadow="sm"
      border="1px solid"
      borderColor="gray.200"
      transition="all 0.25s"
      _hover={{ transform: "translateY(-4px)", boxShadow: "md", borderColor: "#a17635" }}
      cursor="pointer"
      onClick={() => navigate(`/blog/${post.id}`)}
      display="flex"
      flexDirection="column"
      h="100%"
    >
      {/* Cover */}
      <Box h="200px" overflow="hidden" flexShrink={0}>
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            w="100%"
            h="100%"
            objectFit="cover"
            transition="transform 0.4s"
          />
        ) : (
          <Flex
            h="100%"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap={2}
            bg="#1a1a2e"
            position="relative"
            overflow="hidden"
          >
            {/* Decorative diagonal stripe */}
            <Box
              position="absolute"
              top="-30px"
              right="-30px"
              w="120px"
              h="120px"
              bg="#a17635"
              opacity={0.12}
              transform="rotate(45deg)"
            />
            <Box
              position="absolute"
              bottom="-20px"
              left="-20px"
              w="80px"
              h="80px"
              bg="#a17635"
              opacity={0.08}
              transform="rotate(45deg)"
            />
            <Text
              fontSize="11px"
              fontWeight="700"
              color="#a17635"
              letterSpacing="3px"
              textTransform="uppercase"
            >
              {post.category || "Article"}
            </Text>
            <Box w="30px" h="2px" bg="#a17635" opacity={0.6} />
            <Text fontSize="28px" color="white" fontWeight="800" fontStyle="italic" opacity={0.15}>
              Bw
            </Text>
          </Flex>
        )}
      </Box>

      {/* Gold accent bar */}
      <Box h="3px" bg="#a17635" flexShrink={0} />

      {/* Body */}
      <Box p={5} flex="1" display="flex" flexDirection="column">
        {/* Category + read time */}
        <Flex alignItems="center" gap={2} mb={3} flexWrap="wrap">
          {post.category && (
            <Badge
              colorScheme={colorScheme}
              fontSize="11px"
              px={2}
              py="2px"
              borderRadius="0"
              textTransform="capitalize"
            >
              {post.category}
            </Badge>
          )}
          <Flex alignItems="center" gap={1} color="#6a7c92" fontSize="xs">
            <BiTime />
            <Text>{readTime} min read</Text>
          </Flex>
        </Flex>

        {/* Title */}
        <Text
          fontWeight="700"
          fontSize="lg"
          color="#000"
          mb={2}
          noOfLines={2}
          textAlign="left"
          lineHeight="1.4"
        >
          {post.title}
        </Text>

        {/* Excerpt */}
        <Text
          fontSize="sm"
          color="#6a7c92"
          mb={4}
          noOfLines={3}
          textAlign="left"
          flex="1"
          lineHeight="1.7"
          fontStyle="italic"
        >
          {excerpt}
        </Text>

        {/* Footer */}
        <Flex alignItems="center" justifyContent="space-between" mt="auto" pt={3} borderTop="1px solid" borderColor="gray.100">
          <Flex alignItems="center" gap={2}>
            <Flex
              w="32px"
              h="32px"
              bg="#000"
              color="#a17635"
              alignItems="center"
              justifyContent="center"
              fontSize="xs"
              fontWeight="bold"
              flexShrink={0}
            >
              {initial}
            </Flex>
            <Box>
              <Text fontSize="xs" fontWeight="600" color="#000" textAlign="left">
                {post.author || "Anonymous"}
              </Text>
              <Text fontSize="xs" color="#6a7c92">
                {formatDate(post.createdAt)}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={1} color="red.400" fontSize="sm">
            <AiFillHeart />
            <Text fontSize="xs">{post.likes || 0}</Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default BlogCard;
