import { auth } from "../../firebaseConfig";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ─── Session ID for like tracking (no auth needed) ──────────────────────────

const SESSION_KEY = "bizwire_session";

export const getSessionId = () => {
  let sid = sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
    sessionStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
};

// ─── Auth helpers ────────────────────────────────────────────────────────────

const getToken = async () => {
  const user = auth.currentUser;
  return user ? user.getIdToken() : null;
};

const authHeaders = async () => {
  const token = await getToken();
  const h = { "Content-Type": "application/json" };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
};

const jsonHeaders = { "Content-Type": "application/json" };

// ─── Posts ───────────────────────────────────────────────────────────────────

export const getPosts = async () => {
  const res = await fetch(`${API}/api/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export const getAllPosts = async () => {
  const res = await fetch(`${API}/api/posts/all`, { headers: await authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export const getPost = async (id) => {
  const res = await fetch(`${API}/api/posts/${id}`);
  if (!res.ok) return null;
  return res.json();
};

export const createPost = async (data) => {
  const res = await fetch(`${API}/api/posts`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
};

export const updatePost = async (id, data) => {
  const res = await fetch(`${API}/api/posts/${id}`, {
    method: "PUT",
    headers: await authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
};

export const deletePost = async (id) => {
  const res = await fetch(`${API}/api/posts/${id}`, {
    method: "DELETE",
    headers: await authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
};

// ─── Likes (session-scoped, no account needed) ───────────────────────────────

export const toggleLike = async (postId) => {
  const res = await fetch(`${API}/api/posts/${postId}/like`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ sessionId: getSessionId() }),
  });
  if (!res.ok) throw new Error("Failed to toggle like");
  return res.json(); // { likes, liked, likedBy }
};

export const isLikedBySession = (post) =>
  (post?.likedBy || []).includes(getSessionId());

// ─── Comments ────────────────────────────────────────────────────────────────

export const addComment = async (postId, { text }) => {
  const res = await fetch(`${API}/api/posts/${postId}/comments`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Failed to add comment");
  return res.json();
};

export const deleteComment = async (postId, commentId) => {
  const res = await fetch(`${API}/api/posts/${postId}/comments/${commentId}`, {
    method: "DELETE",
    headers: await authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete comment");
  return res.json();
};

// ─── Replies ─────────────────────────────────────────────────────────────────

export const addReply = async (postId, commentId, { text }) => {
  const res = await fetch(`${API}/api/posts/${postId}/comments/${commentId}/replies`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Failed to add reply");
  return res.json();
};

export const deleteReply = async (postId, commentId, replyId) => {
  const res = await fetch(
    `${API}/api/posts/${postId}/comments/${commentId}/replies/${replyId}`,
    { method: "DELETE", headers: await authHeaders() }
  );
  if (!res.ok) throw new Error("Failed to delete reply");
  return res.json();
};

// Admin deletes use the same endpoints (server enforces admin check)
export const adminDeleteComment = deleteComment;
export const adminDeleteReply = deleteReply;
