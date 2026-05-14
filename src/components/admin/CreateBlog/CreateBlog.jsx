import { useState, useEffect } from "react";
import { getPost, createPost, updatePost } from "../../../utils/blogStorage";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Text,
  Flex,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormHelperText,
  Switch,
  useToast,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  Divider,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
import { createToastHelpers } from "../../../utils/toastUtils";
import { getExcerpt, getReadTime } from "../../Home/Blog/BlogCard";

const CATEGORIES = [
  "Technology",
  "Business",
  "Finance",
  "Marketing",
  "Strategy",
  "HR",
  "Operations",
  "Other",
];

const emptyForm = {
  title: "",
  category: "",
  content: "",
  imageUrl: "",
  tagInput: "",
  tags: [],
  published: true,
};

function CreateBlog() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");
  const toast = useToast();
  const { success, error } = createToastHelpers(toast);

  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editId) return;
    getPost(editId).then((post) => {
      if (post) {
        setForm({
          title: post.title || "",
          category: post.category || "",
          content: post.content || "",
          imageUrl: post.imageUrl || "",
          tagInput: "",
          tags: post.tags || [],
          published: post.published !== false,
        });
      } else {
        error("Not found", "The post you are trying to edit does not exist.");
        navigate("/dashboard");
      }
    });
  }, [editId, navigate]);

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleAddTag = () => {
    const tag = form.tagInput.trim().toLowerCase();
    if (tag && !form.tags.includes(tag) && form.tags.length < 8) {
      setForm((f) => ({ ...f, tags: [...f.tags, tag], tagInput: "" }));
    }
  };

  const handleRemoveTag = (tag) =>
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      error("Missing title", "Please add a title for your post.");
      return;
    }
    if (!form.content.trim()) {
      error("Missing content", "Please write some content for your post.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        content: form.content.trim(),
        excerpt: getExcerpt(form.content, 160),
        readTime: getReadTime(form.content),
        category: form.category,
        imageUrl: form.imageUrl.trim(),
        tags: form.tags,
        published: form.published,
        author: "Bizwire Team",
      };

      if (editId) {
        await updatePost(editId, payload);
        success("Saved!", "Your post has been updated.");
      } else {
        await createPost(payload);
        success("Published!", "Your post is now live.");
        setForm(emptyForm);
      }
      navigate("/dashboard");
    } catch {
      error("Save failed", "Could not save the post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const wordCount = form.content.trim().split(/\s+/).filter(Boolean).length;
  const estimatedReadTime = getReadTime(form.content);
  const previewExcerpt = getExcerpt(form.content, 160);

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
        <Flex alignItems="center" gap={3}>
          <Tooltip label="Back to dashboard">
            <IconButton
              icon={<AiOutlineArrowLeft />}
              variant="ghost"
              color="gray.400"
              _hover={{ color: "white" }}
              aria-label="Back"
              onClick={() => navigate("/dashboard")}
            />
          </Tooltip>
          <Text fontSize="lg" fontWeight="700" color="white">
            {editId ? "Edit Post" : "New Post"}
          </Text>
        </Flex>
        <Flex gap={3} alignItems="center">
          <Flex alignItems="center" gap={2}>
            <Text fontSize="sm" color="gray.400">
              {form.published ? "Published" : "Draft"}
            </Text>
            <Switch
              isChecked={form.published}
              onChange={(e) =>
                setForm((f) => ({ ...f, published: e.target.checked }))
              }
              colorScheme="green"
            />
          </Flex>
          <Button
            bg="#a17635"
            color="#000"
            _hover={{ bg: "white" }}
            size="sm"
            borderRadius="full"
            fontWeight="700"
            onClick={handleSubmit}
            isLoading={saving}
            loadingText="Saving..."
          >
            {editId ? "Save Changes" : "Publish"}
          </Button>
        </Flex>
      </Box>

      <Box maxW="900px" mx="auto" px={{ base: 4, lg: 6 }} py={8}>
        <form onSubmit={handleSubmit}>
          <Flex gap={8} flexDirection={{ base: "column", lg: "row" }}>
            {/* Main content */}
            <Box flex="1" display="flex" flexDirection="column" gap={6}>
              <FormControl isRequired>
                <Input
                  placeholder="Post title..."
                  value={form.title}
                  onChange={handleChange("title")}
                  fontSize="2xl"
                  fontWeight="700"
                  border="none"
                  borderBottom="2px solid"
                  borderColor="gray.300"
                  borderRadius={0}
                  px={0}
                  _focus={{ borderColor: "#a17635", boxShadow: "none" }}
                  _placeholder={{ color: "gray.400" }}
                  bg="transparent"
                />
              </FormControl>

              <FormControl isRequired flex="1">
                <FormLabel color="gray.600" fontSize="sm" fontWeight="600" mb={2}>
                  Content
                </FormLabel>
                <Textarea
                  placeholder={"Write your post content here...\n\nUse double line breaks to separate paragraphs."}
                  value={form.content}
                  onChange={handleChange("content")}
                  minH="480px"
                  resize="vertical"
                  bg="white"
                  borderColor="gray.300"
                  borderRadius="lg"
                  fontSize="md"
                  lineHeight="1.8"
                  _focus={{ borderColor: "#a17635", boxShadow: "0 0 0 1px #a17635" }}
                />
                <FormHelperText color="gray.400">
                  {wordCount} words · ~{estimatedReadTime} min read
                </FormHelperText>
              </FormControl>
            </Box>

            {/* Sidebar */}
            <Box w={{ base: "100%", lg: "280px" }} flexShrink={0}>
              <Box
                bg="white"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                overflow="hidden"
                position={{ lg: "sticky" }}
                top="20px"
              >
                <Box px={5} py={4} borderBottom="1px solid" borderColor="gray.100">
                  <Text fontWeight="700" color="gray.700" fontSize="sm">
                    Post Settings
                  </Text>
                </Box>

                <Box px={5} py={4} display="flex" flexDirection="column" gap={5}>
                  {/* Category */}
                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="600" color="gray.600">
                      Category
                    </FormLabel>
                    <Select
                      placeholder="Select category"
                      value={form.category}
                      onChange={handleChange("category")}
                      size="sm"
                      borderRadius="lg"
                      borderColor="gray.300"
                      _focus={{ borderColor: "#a17635" }}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Cover image */}
                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="600" color="gray.600">
                      Cover Image URL
                    </FormLabel>
                    <Input
                      placeholder="https://..."
                      value={form.imageUrl}
                      onChange={handleChange("imageUrl")}
                      size="sm"
                      borderRadius="lg"
                      borderColor="gray.300"
                      _focus={{ borderColor: "#a17635" }}
                    />
                    <FormHelperText fontSize="xs">
                      Optional. Paste a direct image URL.
                    </FormHelperText>
                  </FormControl>

                  {/* Tags */}
                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="600" color="gray.600">
                      Tags
                    </FormLabel>
                    <Flex gap={2}>
                      <Input
                        placeholder="Add tag..."
                        value={form.tagInput}
                        onChange={handleChange("tagInput")}
                        onKeyDown={handleTagKeyDown}
                        size="sm"
                        borderRadius="lg"
                        borderColor="gray.300"
                        _focus={{ borderColor: "#a17635" }}
                      />
                      <Tooltip label="Add tag">
                        <IconButton
                          icon={<AiOutlinePlus />}
                          size="sm"
                          onClick={handleAddTag}
                          borderRadius="lg"
                          bg="#000"
                          color="#a17635"
                          _hover={{ bg: "#a17635", color: "#000" }}
                          aria-label="Add tag"
                        />
                      </Tooltip>
                    </Flex>
                    <FormHelperText fontSize="xs">
                      Press Enter or comma to add
                    </FormHelperText>
                    {form.tags.length > 0 && (
                      <Wrap mt={2} spacing={1}>
                        {form.tags.map((tag) => (
                          <WrapItem key={tag}>
                            <Tag size="sm" borderRadius="full" variant="subtle" colorScheme="gray">
                              <TagLabel>#{tag}</TagLabel>
                              <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                            </Tag>
                          </WrapItem>
                        ))}
                      </Wrap>
                    )}
                  </FormControl>

                  {previewExcerpt && (
                    <>
                      <Divider />
                      <Box>
                        <Text
                          fontSize="xs"
                          fontWeight="600"
                          color="gray.500"
                          mb={2}
                          textTransform="uppercase"
                          letterSpacing="0.5px"
                        >
                          Excerpt Preview
                        </Text>
                        <Text fontSize="xs" color="gray.500" lineHeight="1.7">
                          {previewExcerpt}
                        </Text>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}

export default CreateBlog;
