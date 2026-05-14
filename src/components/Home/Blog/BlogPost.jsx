import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Flex,
  Button,
  Image,
  Badge,
  Textarea,
  Center,
  Spinner,
  useToast,
  IconButton,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiTime, BiArrowBack, BiTrash } from "react-icons/bi";
import { FiShare2, FiLogOut } from "react-icons/fi";
import { FaRegComment, FaReply } from "react-icons/fa";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer";
import AuthModal from "../../Auth/AuthModal";
import { createToastHelpers } from "../../../utils/toastUtils";
import { formatDate, getReadTime } from "./BlogCard";
import { logoutUser } from "../../../utils/userAuth";
import { useAuth } from "../../../context/AuthContext";
import {
  getPost,
  toggleLike,
  isLikedBySession,
  addComment,
  deleteComment,
  addReply,
  deleteReply,
} from "../../../utils/blogStorage";

const CATEGORY_COLORS = {
  Technology: "blue",
  Business: "teal",
  Finance: "green",
  Marketing: "pink",
  Strategy: "orange",
  HR: "purple",
  Operations: "cyan",
};

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { success, error, warning } = createToastHelpers(toast);
  const { isOpen: isAuthOpen, onOpen: openAuth, onClose: closeAuth } = useDisclosure();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [postLoading, setPostLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [submittingReply, setSubmittingReply] = useState(false);

  useEffect(() => {
    setPostLoading(true);
    getPost(id)
      .then(setPost)
      .catch(() => setPost(null))
      .finally(() => setPostLoading(false));
  }, [id]);

  const refreshPost = async () => {
    const updated = await getPost(id);
    if (updated) setPost(updated);
  };

  if (postLoading) {
    return (
      <Box minH="100vh" bg="gray.100">
        <Navbar />
        <Center py={40}>
          <Spinner size="xl" color="#a17635" thickness="4px" />
        </Center>
        <Footer />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box minH="100vh" bg="gray.100">
        <Navbar />
        <Center py={40} flexDirection="column" gap={4}>
          <Text fontSize="48px">📄</Text>
          <Text fontSize="xl" color="#6a7c92" fontStyle="italic">
            Post not found
          </Text>
          <Button
            onClick={() => navigate("/blog")}
            bg="#000"
            color="#a17635"
            _hover={{ bg: "#a17635", color: "#000" }}
            borderRadius="0"
          >
            Back to Blog
          </Button>
        </Center>
        <Footer />
      </Box>
    );
  }

  const liked = isLikedBySession(post);
  const readTime = post.readTime || getReadTime(post.content);
  const colorScheme = CATEGORY_COLORS[post.category] || "gray";
  const comments = post.comments || [];

  const handleLike = async () => {
    try {
      const { likes, likedBy } = await toggleLike(post.id);
      setPost((p) => ({ ...p, likes, likedBy }));
    } catch {
      error("Error", "Could not toggle like.");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    success("Link copied!", "Post URL copied to clipboard.");
  };

  const handleAuthSuccess = () => {
    closeAuth();
  };

  const handleLogout = () => {
    logoutUser();
  };

  const handleAddComment = async () => {
    if (!user) {
      openAuth();
      return;
    }
    if (!commentText.trim()) {
      warning("Empty comment", "Please write something before posting.", { position: "top" });
      return;
    }
    setSubmittingComment(true);
    try {
      await addComment(post.id, { text: commentText.trim() });
      setCommentText("");
      await refreshPost();
      success("Comment added!", "Your comment is now live.", { position: "top" });
    } catch {
      error("Error", "Could not add comment. Please try again.");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(post.id, commentId);
      await refreshPost();
      success("Deleted", "Comment removed.");
    } catch {
      error("Error", "Could not delete comment.");
    }
  };

  const handleAddReply = async (commentId) => {
    if (!user) {
      openAuth();
      return;
    }
    if (!replyText.trim()) {
      warning("Empty reply", "Please write something before posting.", { position: "top" });
      return;
    }
    setSubmittingReply(true);
    try {
      await addReply(post.id, commentId, { text: replyText.trim() });
      setReplyText("");
      setReplyingTo(null);
      await refreshPost();
      success("Reply posted!", "Your reply is now live.", { position: "top" });
    } catch {
      error("Error", "Could not post reply. Please try again.");
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleDeleteReply = async (commentId, replyId) => {
    try {
      await deleteReply(post.id, commentId, replyId);
      await refreshPost();
      success("Deleted", "Reply removed.");
    } catch {
      error("Error", "Could not delete reply.");
    }
  };

  const toggleReply = (commentId) => {
    if (replyingTo === commentId) {
      setReplyingTo(null);
      setReplyText("");
    } else {
      if (!user) {
        openAuth();
        return;
      }
      setReplyingTo(commentId);
      setReplyText("");
    }
  };

  return (
    <Box minH="100vh" bg="gray.100">
      <Navbar />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={closeAuth}
        onSuccess={handleAuthSuccess}
      />

      {/* Cover image */}
      {post.imageUrl && (
        <Box h={{ base: "260px", lg: "400px" }} overflow="hidden" bg="gray.200">
          <Image src={post.imageUrl} alt={post.title} w="100%" h="100%" objectFit="cover" />
        </Box>
      )}

      {/* Gold accent bar */}
      <Box h="4px" bg="#a17635" />

      <Box maxW="860px" mx="auto" px={{ base: 4, lg: 6 }} py={10}>
        {/* Back */}
        <Button
          leftIcon={<BiArrowBack />}
          variant="ghost"
          color="#6a7c92"
          mb={6}
          onClick={() => navigate("/blog")}
          _hover={{ color: "#000" }}
          pl={0}
          fontStyle="italic"
        >
          Back to Blog
        </Button>

        {/* Article card */}
        <Box bg="white" border="1px solid" borderColor="gray.200" p={{ base: 6, lg: 10 }}>
          {/* Meta */}
          <Flex alignItems="center" gap={3} mb={4} flexWrap="wrap">
            {post.category && (
              <Badge
                colorScheme={colorScheme}
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="0"
                textTransform="capitalize"
              >
                {post.category}
              </Badge>
            )}
            <Flex alignItems="center" gap={1} color="#6a7c92" fontSize="sm">
              <BiTime />
              <Text>{readTime} min read</Text>
            </Flex>
          </Flex>

          {/* Title */}
          <Text
            as="h1"
            fontSize={{ base: "26px", lg: "38px" }}
            fontWeight="700"
            color="#000"
            lineHeight="1.25"
            mb={5}
            textAlign="left"
            fontStyle="italic"
          >
            {post.title}
          </Text>

          {/* Author row */}
          <Flex
            alignItems="center"
            justifyContent="space-between"
            mb={8}
            flexWrap="wrap"
            gap={3}
            pb={6}
            borderBottom="1px solid"
            borderColor="gray.200"
          >
            <Flex alignItems="center" gap={3}>
              <Flex
                w="44px"
                h="44px"
                bg="#000"
                color="#a17635"
                alignItems="center"
                justifyContent="center"
                fontWeight="700"
                fontSize="md"
                flexShrink={0}
              >
                {post.author?.[0]?.toUpperCase() || "A"}
              </Flex>
              <Box>
                <Text fontWeight="600" color="#000" fontSize="sm">
                  {post.author || "Anonymous"}
                </Text>
                <Text color="#6a7c92" fontSize="xs">
                  {formatDate(post.createdAt)}
                </Text>
              </Box>
            </Flex>

            <Flex alignItems="center" gap={3}>
              <Tooltip label={liked ? "Unlike" : "Like this post"}>
                <Button
                  leftIcon={liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
                  variant="outline"
                  size="sm"
                  borderRadius="0"
                  color={liked ? "red.500" : "#6a7c92"}
                  borderColor={liked ? "red.300" : "gray.300"}
                  _hover={{ borderColor: "red.400", color: "red.500" }}
                  onClick={handleLike}
                >
                  {post.likes || 0}
                </Button>
              </Tooltip>
              <Tooltip label="Copy link">
                <IconButton
                  icon={<FiShare2 />}
                  variant="outline"
                  size="sm"
                  borderRadius="0"
                  color="#6a7c92"
                  borderColor="gray.300"
                  _hover={{ borderColor: "#a17635", color: "#a17635" }}
                  onClick={handleShare}
                  aria-label="Share post"
                />
              </Tooltip>
            </Flex>
          </Flex>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <Flex gap={2} mb={8} flexWrap="wrap">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="subtle"
                  colorScheme="gray"
                  px={2}
                  py={1}
                  borderRadius="0"
                  fontSize="xs"
                >
                  #{tag}
                </Badge>
              ))}
            </Flex>
          )}

          {/* Content */}
          <Box
            color="#6a7c92"
            fontSize={{ base: "16px", lg: "18px" }}
            lineHeight="1.9"
            textAlign="justify"
            fontStyle="italic"
            mb={4}
          >
            {post.content?.split("\n\n").map((para, i) => (
              <Text key={i} mb={5} whiteSpace="pre-line">
                {para}
              </Text>
            ))}
          </Box>
        </Box>

        {/* ── Comments section ── */}
        <Box mt={8}>
          <Flex
            alignItems="center"
            gap={2}
            mb={6}
            pb={3}
            borderBottom="2px solid"
            borderColor="#000"
          >
            <FaRegComment color="#a17635" size={18} />
            <Text fontSize="lg" fontWeight="700" color="#000">
              Comments ({comments.length})
            </Text>
          </Flex>

          {/* Auth status bar */}
          {user ? (
            <Flex
              alignItems="center"
              justifyContent="space-between"
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderLeft="3px solid"
              borderLeftColor="#000"
              px={4}
              py={3}
              mb={6}
            >
              <Flex alignItems="center" gap={2}>
                <Flex
                  w="28px"
                  h="28px"
                  bg="#000"
                  color="#a17635"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="xs"
                  fontWeight="700"
                  flexShrink={0}
                >
                  {user.displayName?.[0]?.toUpperCase() || "U"}
                </Flex>
                <Text fontSize="sm" color="#000" fontWeight="600">
                  Commenting as{" "}
                  <Box as="span" color="#a17635">
                    {user.displayName || user.email}
                  </Box>
                </Text>
              </Flex>
              <Tooltip label="Sign out">
                <IconButton
                  icon={<FiLogOut />}
                  size="xs"
                  variant="ghost"
                  color="#6a7c92"
                  _hover={{ color: "#000" }}
                  aria-label="Sign out"
                  onClick={handleLogout}
                />
              </Tooltip>
            </Flex>
          ) : (
            <Box
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderLeft="3px solid"
              borderLeftColor="#a17635"
              px={5}
              py={4}
              mb={6}
              textAlign="center"
            >
              <Text color="#6a7c92" fontStyle="italic" mb={3} fontSize="sm">
                Sign in or create a free account to join the conversation.
              </Text>
              <Button
                bg="#000"
                color="#a17635"
                _hover={{ bg: "#a17635", color: "#000" }}
                borderRadius="0"
                size="sm"
                px={6}
                onClick={openAuth}
              >
                Sign In / Create Account
              </Button>
            </Box>
          )}

          {/* Comment list */}
          {comments.length > 0 && (
            <Box mb={6} display="flex" flexDirection="column" gap={4}>
              {comments.map((comment) => {
                const isOwnComment = user && comment.userId === user.uid;
                const replies = comment.replies || [];

                return (
                  <Box
                    key={comment.id}
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    borderLeft="3px solid"
                    borderLeftColor="#a17635"
                  >
                    {/* Comment header */}
                    <Flex
                      justifyContent="space-between"
                      alignItems="flex-start"
                      px={5}
                      pt={5}
                      pb={2}
                    >
                      <Flex alignItems="center" gap={2}>
                        <Flex
                          w="32px"
                          h="32px"
                          bg="#000"
                          color="#a17635"
                          alignItems="center"
                          justifyContent="center"
                          fontSize="xs"
                          fontWeight="700"
                          flexShrink={0}
                        >
                          {comment.userName?.[0]?.toUpperCase() || "?"}
                        </Flex>
                        <Box>
                          <Flex alignItems="center" gap={2}>
                            <Text fontWeight="600" fontSize="sm" color="#000">
                              {comment.userName}
                            </Text>
                            {isOwnComment && (
                              <Badge
                                fontSize="9px"
                                colorScheme="gray"
                                variant="subtle"
                                borderRadius="0"
                              >
                                You
                              </Badge>
                            )}
                          </Flex>
                          <Text fontSize="xs" color="#6a7c92">
                            {formatDate(comment.createdAt)}
                          </Text>
                        </Box>
                      </Flex>
                      {isOwnComment && (
                        <Tooltip label="Delete comment">
                          <IconButton
                            icon={<BiTrash />}
                            size="xs"
                            variant="ghost"
                            colorScheme="red"
                            aria-label="Delete comment"
                            onClick={() => handleDeleteComment(comment.id)}
                          />
                        </Tooltip>
                      )}
                    </Flex>

                    {/* Comment text */}
                    <Text
                      color="#6a7c92"
                      fontSize="sm"
                      lineHeight="1.7"
                      textAlign="left"
                      fontStyle="italic"
                      px={5}
                      pb={3}
                      pl="57px"
                    >
                      {comment.text}
                    </Text>

                    {/* Reply button */}
                    <Flex px={5} pb={3} pl="57px" gap={2} alignItems="center">
                      <Button
                        leftIcon={<FaReply />}
                        size="xs"
                        variant="ghost"
                        color="#6a7c92"
                        fontStyle="italic"
                        _hover={{ color: "#000" }}
                        onClick={() => toggleReply(comment.id)}
                        borderRadius="0"
                      >
                        {replyingTo === comment.id
                          ? "Cancel"
                          : `Reply${replies.length > 0 ? ` (${replies.length})` : ""}`}
                      </Button>
                    </Flex>

                    {/* Replies */}
                    {replies.length > 0 && (
                      <Box
                        mx={5}
                        mb={3}
                        ml="57px"
                        borderLeft="2px solid"
                        borderColor="gray.200"
                        pl={4}
                        display="flex"
                        flexDirection="column"
                        gap={3}
                      >
                        {replies.map((reply) => {
                          const isOwnReply = user && reply.userId === user.uid;
                          return (
                            <Box key={reply.id}>
                              <Flex
                                justifyContent="space-between"
                                alignItems="flex-start"
                                mb={1}
                              >
                                <Flex alignItems="center" gap={2}>
                                  <Flex
                                    w="24px"
                                    h="24px"
                                    bg="#a17635"
                                    color="#000"
                                    alignItems="center"
                                    justifyContent="center"
                                    fontSize="10px"
                                    fontWeight="700"
                                    flexShrink={0}
                                  >
                                    {reply.userName?.[0]?.toUpperCase() || "?"}
                                  </Flex>
                                  <Box>
                                    <Flex alignItems="center" gap={2}>
                                      <Text fontWeight="600" fontSize="xs" color="#000">
                                        {reply.userName}
                                      </Text>
                                      {isOwnReply && (
                                        <Badge
                                          fontSize="8px"
                                          colorScheme="gray"
                                          variant="subtle"
                                          borderRadius="0"
                                        >
                                          You
                                        </Badge>
                                      )}
                                    </Flex>
                                    <Text fontSize="10px" color="#6a7c92">
                                      {formatDate(reply.createdAt)}
                                    </Text>
                                  </Box>
                                </Flex>
                                {isOwnReply && (
                                  <Tooltip label="Delete reply">
                                    <IconButton
                                      icon={<BiTrash />}
                                      size="xs"
                                      variant="ghost"
                                      colorScheme="red"
                                      aria-label="Delete reply"
                                      onClick={() =>
                                        handleDeleteReply(comment.id, reply.id)
                                      }
                                    />
                                  </Tooltip>
                                )}
                              </Flex>
                              <Text
                                color="#6a7c92"
                                fontSize="xs"
                                lineHeight="1.7"
                                fontStyle="italic"
                                pl="32px"
                              >
                                {reply.text}
                              </Text>
                            </Box>
                          );
                        })}
                      </Box>
                    )}

                    {/* Inline reply form */}
                    {replyingTo === comment.id && (
                      <Box
                        mx={5}
                        mb={4}
                        ml="57px"
                        borderLeft="2px solid"
                        borderColor="#a17635"
                        pl={4}
                      >
                        <Textarea
                          placeholder={`Reply to ${comment.userName}...`}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={3}
                          resize="vertical"
                          borderColor="gray.300"
                          borderRadius="0"
                          fontSize="sm"
                          _focus={{ borderColor: "#a17635", boxShadow: "0 0 0 1px #a17635" }}
                          mb={2}
                        />
                        <Flex gap={2}>
                          <Button
                            size="xs"
                            bg="#000"
                            color="#a17635"
                            _hover={{ bg: "#a17635", color: "#000" }}
                            borderRadius="0"
                            onClick={() => handleAddReply(comment.id)}
                            isLoading={submittingReply}
                            loadingText="Posting..."
                          >
                            Post Reply
                          </Button>
                          <Button
                            size="xs"
                            variant="ghost"
                            color="#6a7c92"
                            borderRadius="0"
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText("");
                            }}
                          >
                            Cancel
                          </Button>
                        </Flex>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          )}

          {comments.length === 0 && (
            <Box
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              p={6}
              textAlign="center"
              mb={6}
            >
              <Text color="#6a7c92" fontStyle="italic">
                No comments yet. Be the first to share your thoughts!
              </Text>
            </Box>
          )}

          {/* Add comment form */}
          {user && (
            <Box
              bg="white"
              p={6}
              border="1px solid"
              borderColor="gray.200"
              borderTop="3px solid"
              borderTopColor="#000"
            >
              <Text fontWeight="700" color="#000" mb={4}>
                Leave a comment
              </Text>
              <Textarea
                placeholder="Write your comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
                mb={4}
                borderColor="gray.300"
                borderRadius="0"
                resize="vertical"
                _focus={{ borderColor: "#a17635", boxShadow: "0 0 0 1px #a17635" }}
              />
              <Button
                onClick={handleAddComment}
                isLoading={submittingComment}
                loadingText="Posting..."
                bg="#000"
                color="#a17635"
                _hover={{ bg: "#a17635", color: "#000" }}
                borderRadius="0"
                px={8}
              >
                Post Comment
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default BlogPost;
