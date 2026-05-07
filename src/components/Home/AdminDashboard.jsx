// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { storage, db } from '../../firebaseConfig'; // Ensure you import Firebase Storage
import { Box, Input, Button, Text, VStack, Textarea, Heading, Image } from '@chakra-ui/react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', image: null });
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() });
      });
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    try {
      let imageUrl = '';
      if (newPost.image) {
        const imageRef = ref(storage, `images/${newPost.image.name}`);
        await uploadBytes(imageRef, newPost.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, 'posts'), {
        title: newPost.title,
        content: newPost.content,
        imageUrl,
      });

      setNewPost({ title: '', content: '', image: null });
      // Optionally refetch posts here
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      // Optionally refetch posts here
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  // Add update functionality here

  return (
    <Box p={4}>
      <Heading mb={4}>Admin Dashboard</Heading>

      <VStack spacing={4}>
        <Box>
          <Heading as="h2" size="md" mb={2}>Create New Post</Heading>
          <Input
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            mb={2}
          />
          <Textarea
            placeholder="Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            mb={2}
          />
          <Input
            type="file"
            onChange={(e) => setNewPost({ ...newPost, image: e.target.files[0] })}
            mb={2}
          />
          <Button onClick={handleCreatePost}>Create Post</Button>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>Existing Posts</Heading>
          {posts.map(post => (
            <Box key={post.id} border="1px solid #ddd" p={4} mb={4}>
              <Heading as="h3" size="sm">{post.title}</Heading>
              {post.imageUrl && <Image src={post.imageUrl} alt={post.title} boxSize="200px" />}
              <Text>{post.content}</Text>
              <Button onClick={() => handleDeletePost(post.id)}>Delete Post</Button>
              {/* Add update functionality */}
            </Box>
          ))}
        </Box>
      </VStack>
    </Box>
  );
}

export default AdminDashboard;
