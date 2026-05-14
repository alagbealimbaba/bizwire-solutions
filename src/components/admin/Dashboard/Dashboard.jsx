import { useState, useEffect } from "react";
import {
  getAllPosts,
  deletePost,
  updatePost,
  adminDeleteComment,
  adminDeleteReply,
} from "../../../utils/blogStorage";
import { adminLogout } from "../../../utils/adminAuth";
import {
  Box,
  Text,
  Flex,
  Button,
  Badge,
  IconButton,
  Center,
  Divider,
  Spinner,
  useToast,
  SimpleGrid,
  Tooltip,
  Input,
  InputGroup,
  InputLeftElement,
  Switch,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AiFillHeart,
  AiOutlinePlus,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { createToastHelpers } from "../../../utils/toastUtils";
import { formatDate } from "../../Home/Blog/BlogCard";

const CATEGORY_COLORS = {
  Technology: "blue",
  Business: "teal",
  Finance: "green",
  Marketing: "pink",
  Strategy: "orange",
  HR: "purple",
  Operations: "cyan",
};

function Dashboard() {
  const navigate = useNavigate();
  const toast = useToast();
  const { success, error } = createToastHelpers(toast);
  const { isOpen: isCommentsOpen, onOpen: openComments, onClose: closeComments } = useDisclosure();

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  const [moderatingPostId, setModeratingPostId] = useState(null);

  const moderatingPost = posts.find((p) => p.id === moderatingPostId) || null;

  useEffect(() => {
    getAllPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoadingPosts(false));
  }, []);

  const refreshPosts = () => getAllPosts().then(setPosts).catch(() => {});

  const handleDelete = async (postId, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(postId);
    try {
      await deletePost(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      success("Deleted", `"${title}" has been deleted.`);
    } catch {
      error("Error", "Could not delete the post. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublish = async (postId, currentStatus) => {
    setTogglingId(postId);
    try {
      await updatePost(postId, { published: !currentStatus });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, published: !currentStatus } : p
        )
      );
      success(
        currentStatus ? "Unpublished" : "Published",
        `Post is now ${currentStatus ? "hidden" : "live"}.`
      );
    } catch {
      error("Error", "Could not update publish status.");
    } finally {
      setTogglingId(null);
    }
  };

  const handleSignOut = () => {
    adminLogout();
    navigate("/admin");
  };

  const openCommentModal = (postId) => {
    setModeratingPostId(postId);
    openComments();
  };

  const handleAdminDeleteComment = async (postId, commentId) => {
    try {
      await adminDeleteComment(postId, commentId);
      await refreshPosts();
      success("Deleted", "Comment removed.");
    } catch {
      error("Error", "Could not delete comment.");
    }
  };

  const handleAdminDeleteReply = async (postId, commentId, replyId) => {
    try {
      await adminDeleteReply(postId, commentId, replyId);
      await refreshPosts();
      success("Deleted", "Reply removed.");
    } catch {
      error("Error", "Could not delete reply.");
    }
  };

  const filteredPosts = posts.filter(
    (p) =>
      !searchTerm ||
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalLikes = posts.reduce((acc, p) => acc + (p.likes || 0), 0);
  const totalComments = posts.reduce(
    (acc, p) =>
      acc +
      (p.comments || []).reduce(
        (ca, c) => ca + 1 + (c.replies || []).length,
        0
      ),
    0
  );
  const publishedCount = posts.filter((p) => p.published !== false).length;
  const draftCount = posts.length - publishedCount;

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Top bar */}
      <Box
        bg="gray.900"
        backgroundImage="linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
        px={{ base: 4, lg: 8 }}
        py={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="xl" fontWeight="800" color="white" letterSpacing="-0.5px">
          Admin Dashboard
        </Text>
        <Flex gap={3} alignItems="center">
          <Button
            leftIcon={<AiOutlinePlus />}
            bg="#a17635"
            color="#000"
            _hover={{ bg: "white", color: "#000" }}
            size="sm"
            borderRadius="full"
            fontWeight="700"
            onClick={() => navigate("/create-post")}
          >
            New Post
          </Button>
          <Tooltip label="Sign out">
            <IconButton
              icon={<AiOutlineLogout />}
              variant="ghost"
              color="gray.400"
              _hover={{ color: "white" }}
              aria-label="Sign out"
              onClick={handleSignOut}
            />
          </Tooltip>
        </Flex>
      </Box>

      <Box maxW="1200px" mx="auto" px={{ base: 4, lg: 8 }} py={8}>
        {/* Stats */}
        <SimpleGrid columns={{ base: 2, lg: 4 }} spacing={4} mb={8}>
          {[
            { label: "Total Posts", value: posts.length, color: "gray.800" },
            { label: "Published", value: publishedCount, color: "green.600" },
            { label: "Drafts", value: draftCount, color: "orange.500" },
            { label: "Total Likes", value: totalLikes, color: "red.500" },
          ].map(({ label, value, color }) => (
            <Box
              key={label}
              bg="white"
              borderRadius="xl"
              p={5}
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.200"
            >
              <Text fontSize="2xl" fontWeight="800" color={color}>
                {value}
              </Text>
              <Text fontSize="sm" color="gray.500" mt={1}>
                {label}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        {/* Search */}
        <Flex justifyContent="space-between" alignItems="center" mb={4} gap={4} flexWrap="wrap">
          <Text fontSize="lg" fontWeight="700" color="gray.800">
            All Posts
          </Text>
          <InputGroup maxW="300px">
            <InputLeftElement>
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg="white"
              borderRadius="full"
              size="sm"
            />
          </InputGroup>
        </Flex>

        {/* Posts list */}
        {loadingPosts ? (
          <Center py={16}>
            <Spinner size="xl" color="#a17635" thickness="4px" />
          </Center>
        ) : filteredPosts.length === 0 ? (
          <Center py={16} flexDirection="column" gap={3}>
            <Text fontSize="48px">📄</Text>
            <Text color="gray.400">
              {searchTerm ? "No posts match your search" : "No posts yet"}
            </Text>
            {!searchTerm && (
              <Button
                leftIcon={<AiOutlinePlus />}
                bg="#000"
                color="#a17635"
                _hover={{ bg: "#a17635", color: "#000" }}
                onClick={() => navigate("/create-post")}
                borderRadius="full"
              >
                Create your first post
              </Button>
            )}
          </Center>
        ) : (
          <Box
            bg="white"
            borderRadius="xl"
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.200"
            overflow="hidden"
          >
            {filteredPosts.map((post, idx) => {
              const commentCount = (post.comments || []).reduce(
                (acc, c) => acc + 1 + (c.replies || []).length,
                0
              );
              return (
                <Box key={post.id}>
                  {idx > 0 && <Divider />}
                  <Flex
                    p={5}
                    alignItems={{ base: "flex-start", lg: "center" }}
                    justifyContent="space-between"
                    gap={4}
                    flexDirection={{ base: "column", lg: "row" }}
                    _hover={{ bg: "gray.50" }}
                    transition="background 0.15s"
                  >
                    {/* Post info */}
                    <Box flex="1" minW={0}>
                      <Flex alignItems="center" gap={2} mb={1} flexWrap="wrap">
                        {post.category && (
                          <Badge
                            colorScheme={CATEGORY_COLORS[post.category] || "gray"}
                            fontSize="10px"
                            px={2}
                            borderRadius="full"
                          >
                            {post.category}
                          </Badge>
                        )}
                        <Badge
                          colorScheme={post.published !== false ? "green" : "orange"}
                          fontSize="10px"
                          px={2}
                          borderRadius="full"
                          variant="subtle"
                        >
                          {post.published !== false ? "Published" : "Draft"}
                        </Badge>
                      </Flex>
                      <Text
                        fontWeight="700"
                        color="gray.800"
                        fontSize="md"
                        noOfLines={1}
                        textAlign="left"
                      >
                        {post.title}
                      </Text>
                      <Text fontSize="xs" color="gray.400" mt={1}>
                        {formatDate(post.createdAt)}
                        {post.author ? ` · by ${post.author}` : ""}
                      </Text>
                    </Box>

                    {/* Stats + actions */}
                    <Flex alignItems="center" gap={4} flexShrink={0} flexWrap="wrap">
                      <Flex alignItems="center" gap={1} color="red.400" fontSize="sm">
                        <AiFillHeart />
                        <Text fontSize="sm">{post.likes || 0}</Text>
                      </Flex>

                      {/* Comments button */}
                      <Tooltip label="Moderate comments">
                        <Button
                          leftIcon={<FaRegComment />}
                          size="xs"
                          variant="ghost"
                          color={commentCount > 0 ? "blue.500" : "gray.400"}
                          _hover={{ color: "blue.600", bg: "blue.50" }}
                          borderRadius="full"
                          onClick={() => openCommentModal(post.id)}
                        >
                          {commentCount}
                        </Button>
                      </Tooltip>

                      {/* Publish toggle */}
                      <Tooltip label={post.published !== false ? "Unpublish" : "Publish"}>
                        <Switch
                          isChecked={post.published !== false}
                          onChange={() =>
                            handleTogglePublish(post.id, post.published !== false)
                          }
                          isDisabled={togglingId === post.id}
                          colorScheme="green"
                          size="md"
                        />
                      </Tooltip>

                      {/* Edit */}
                      <Tooltip label="Edit post">
                        <IconButton
                          icon={<AiOutlineEdit />}
                          size="sm"
                          variant="ghost"
                          color="gray.500"
                          _hover={{ color: "blue.500", bg: "blue.50" }}
                          aria-label="Edit"
                          onClick={() => navigate(`/create-post?id=${post.id}`)}
                        />
                      </Tooltip>

                      {/* Delete */}
                      <Tooltip label="Delete post">
                        <IconButton
                          icon={<AiOutlineDelete />}
                          size="sm"
                          variant="ghost"
                          color="gray.400"
                          _hover={{ color: "red.500", bg: "red.50" }}
                          aria-label="Delete"
                          isLoading={deletingId === post.id}
                          onClick={() => handleDelete(post.id, post.title)}
                        />
                      </Tooltip>
                    </Flex>
                  </Flex>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>

      {/* ── Comments moderation modal ── */}
      <Modal
        isOpen={isCommentsOpen}
        onClose={closeComments}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent borderRadius="lg" overflow="hidden">
          <ModalHeader borderBottom="1px solid" borderColor="gray.200" pb={4}>
            <Text fontSize="md" fontWeight="700" color="gray.800" noOfLines={1}>
              Comments — {moderatingPost?.title}
            </Text>
            <Text fontSize="xs" color="gray.400" fontWeight="400" mt={1}>
              {(moderatingPost?.comments || []).reduce(
                (acc, c) => acc + 1 + (c.replies || []).length,
                0
              )}{" "}
              total (comments + replies)
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody py={4} px={5}>
            {(moderatingPost?.comments || []).length === 0 ? (
              <Center py={10} flexDirection="column" gap={2}>
                <Text fontSize="32px">💬</Text>
                <Text color="gray.400" fontSize="sm">
                  No comments on this post yet.
                </Text>
              </Center>
            ) : (
              <Flex flexDirection="column" gap={4} pb={2}>
                {(moderatingPost?.comments || []).map((comment) => (
                  <Box
                    key={comment.id}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    {/* Comment */}
                    <Flex
                      px={4}
                      py={3}
                      justifyContent="space-between"
                      alignItems="flex-start"
                      bg="gray.50"
                    >
                      <Box flex="1" minW={0}>
                        <Flex alignItems="center" gap={2} mb={1}>
                          <Flex
                            w="26px"
                            h="26px"
                            bg="#000"
                            color="#a17635"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="10px"
                            fontWeight="700"
                            borderRadius="sm"
                            flexShrink={0}
                          >
                            {comment.userName?.[0]?.toUpperCase() || "?"}
                          </Flex>
                          <Text fontWeight="600" fontSize="sm" color="gray.800">
                            {comment.userName}
                          </Text>
                          <Text fontSize="xs" color="gray.400">
                            · {formatDate(comment.createdAt)}
                          </Text>
                        </Flex>
                        <Text
                          fontSize="sm"
                          color="gray.600"
                          textAlign="left"
                          pl="34px"
                          lineHeight="1.6"
                        >
                          {comment.text}
                        </Text>
                      </Box>
                      <Tooltip label="Delete comment">
                        <IconButton
                          icon={<BiTrash />}
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          aria-label="Delete comment"
                          ml={2}
                          flexShrink={0}
                          onClick={() =>
                            handleAdminDeleteComment(moderatingPost.id, comment.id)
                          }
                        />
                      </Tooltip>
                    </Flex>

                    {/* Replies */}
                    {(comment.replies || []).length > 0 && (
                      <Box borderTop="1px solid" borderColor="gray.200">
                        {(comment.replies || []).map((reply, ri) => (
                          <Box key={reply.id}>
                            {ri > 0 && <Divider />}
                            <Flex
                              px={4}
                              py={3}
                              pl={8}
                              justifyContent="space-between"
                              alignItems="flex-start"
                              bg="white"
                            >
                              <Box flex="1" minW={0}>
                                <Flex alignItems="center" gap={2} mb={1}>
                                  <Flex
                                    w="22px"
                                    h="22px"
                                    bg="#a17635"
                                    color="#000"
                                    alignItems="center"
                                    justifyContent="center"
                                    fontSize="9px"
                                    fontWeight="700"
                                    borderRadius="sm"
                                    flexShrink={0}
                                  >
                                    {reply.userName?.[0]?.toUpperCase() || "?"}
                                  </Flex>
                                  <Text fontWeight="600" fontSize="xs" color="gray.700">
                                    {reply.userName}
                                  </Text>
                                  <Badge fontSize="8px" colorScheme="blue" variant="subtle">
                                    reply
                                  </Badge>
                                  <Text fontSize="xs" color="gray.400">
                                    · {formatDate(reply.createdAt)}
                                  </Text>
                                </Flex>
                                <Text
                                  fontSize="xs"
                                  color="gray.500"
                                  textAlign="left"
                                  pl="30px"
                                  lineHeight="1.6"
                                >
                                  {reply.text}
                                </Text>
                              </Box>
                              <Tooltip label="Delete reply">
                                <IconButton
                                  icon={<BiTrash />}
                                  size="xs"
                                  variant="ghost"
                                  colorScheme="red"
                                  aria-label="Delete reply"
                                  ml={2}
                                  flexShrink={0}
                                  onClick={() =>
                                    handleAdminDeleteReply(
                                      moderatingPost.id,
                                      comment.id,
                                      reply.id
                                    )
                                  }
                                />
                              </Tooltip>
                            </Flex>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Dashboard;
