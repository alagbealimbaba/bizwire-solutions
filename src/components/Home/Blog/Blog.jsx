import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, auth } from '../../../../firebaseConfig';
import { Box, Textarea, Button, Text, Input, Heading, Divider, useToast } from '@chakra-ui/react';
import { Navbar } from '../Navbar/Navbar';
import Footer from '../Footer';
import { signOut } from 'firebase/auth';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commenter, setCommenter] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state
  const toast = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const fetchedPosts = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Post data:", data);  // Log each post data
          fetchedPosts.push({ id: doc.id, ...data });
        });
        setPosts(fetchedPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  

  const addComment = async (postId) => {
    const user = auth.currentUser;

    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to add a comment!",
        status: "warning",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (newComment && commenter) {
      try {
        await addDoc(collection(db, "posts", postId, "comments"), {
          user: commenter,
          comment: newComment,
          timestamp: new Date(),
        });
        setNewComment('');
        setCommenter('');
        toast({
          title: "Comment added",
          description: "Your comment has been added successfully.",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error adding comment:', error);
        toast({
          title: "Error",
          description: "There was an error adding your comment. Please try again.",
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Missing information",
        description: "Please enter your name and comment!",
        status: "warning",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: error.message,
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="#f4f4f4" minHeight="100vh">
      <Navbar />

      <Box maxWidth="800px" mx="auto" p={4} bg="white" boxShadow="lg" borderRadius="md">
        <Heading as="h1" mb={6} textAlign="center" color="#a17635">Blog</Heading>

        {auth.currentUser && (
          <Button
            position={'absolute'}
            right={'20px'}
            top={40}
            sx={{
              background: "#000",
              color: "#a17635",
              _hover: {
                background: "#a17635",
                color: "#000",
              },
            }}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        )}

        {loading ? ( // Show loading state while fetching posts
          <Text>Loading posts...</Text>
        ) : posts.length === 0 ? ( // Handle no posts case
          <Text>No posts available.</Text>
        ) : (
          posts.map((post) => (
            <Box key={post.id} border="1px solid #ddd" borderRadius="md" p={6} my={6} bg="white" boxShadow="md">
              <Text fontSize="2xl" fontWeight="bold" mb={4} color="#000">{post.title}</Text>
              <Text mb={4} color="#333">{post.content}</Text>

              <Divider my={4} />
              <Text fontSize="lg" mb={2} color="#a17635">Comments:</Text>
              <Comments postId={post.id} />

              <Box mt={4}>
                <Input
                  placeholder="Your Name"
                  value={commenter}
                  onChange={(e) => setCommenter(e.target.value)}
                  disabled={!auth.currentUser}
                  mb={2}
                  borderColor="#a17635"
                  _placeholder={{ color: '#aaa' }}
                />
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  disabled={!auth.currentUser}
                  borderColor="#a17635"
                  _placeholder={{ color: '#aaa' }}
                />
                <Button
                  onClick={() => addComment(post.id)}
                  mt={2}
                  disabled={!auth.currentUser}
                  colorScheme="teal"
                  bg="#a17635"
                  color="#000"
                  _hover={{ bg: "#000", color: "#a17635" }}
                >
                  Submit Comment
                </Button>
              </Box>
            </Box>
          ))
        )}
      </Box>

      <Footer />
    </Box>
  );
}

function Comments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsSnapshot = await getDocs(collection(db, "posts", postId, "comments"));
      const fetchedComments = [];
      commentsSnapshot.forEach((doc) => {
        fetchedComments.push(doc.data());
      });
      setComments(fetchedComments);
    };
    fetchComments();
  }, [postId]);

  return (
    <Box mt={4}>
      {comments.length === 0 ? (
        <Text>No comments yet. Be the first to comment!</Text>
      ) : (
        comments.map((comment, index) => (
          <Box key={index} mb={4} p={3} border="1px solid #ddd" borderRadius="md" bg="white" boxShadow="sm">
            <Text fontWeight="bold" color="#a17635">{comment.user}:</Text>
            <Text color="#333">{comment.comment}</Text>
          </Box>
        ))
      )}
    </Box>
  );
}

export default Blog;
