import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, auth } from '../../../../firebaseConfig';
import { Box, Textarea, Button, Text, Input, Heading, Divider, useToast } from '@chakra-ui/react';
import { Navbar } from '../Navbar/Navbar';
import Footer from '../Footer';
import { signOut } from 'firebase/auth';
import { createToastHelpers } from '../../../utils/toastUtils';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commenter, setCommenter] = useState('');
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { success, error, warning } = createToastHelpers(toast);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const fetchedPosts = [];
        querySnapshot.forEach((doc) => {
          fetchedPosts.push({ id: doc.id, ...doc.data() });
        });
        setPosts(fetchedPosts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const addComment = async (postId) => {
    const user = auth.currentUser;

    if (!user) {
      warning("Authentication required", "You need to be logged in to add a comment!", { position: "top" });
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
        success("Comment added", "Your comment has been added successfully.", { position: "top" });
      } catch (err) {
        console.error('Error adding comment:', err);
        error("Error", "There was an error adding your comment. Please try again.", { position: "top" });
      }
    } else {
      warning("Missing information", "Please enter your name and comment!", { position: "top" });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      success("Logged out", "You have been logged out successfully.", { position: "top" });
    } catch (err) {
      error("Sign out failed", err.message, { position: "top" });
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
              _hover: { background: "#a17635", color: "#000" },
            }}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        )}

        {loading ? (
          <Text>Loading posts...</Text>
        ) : posts.length === 0 ? (
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
