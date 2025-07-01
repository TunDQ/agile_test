import React, { useEffect, useState } from "react";
import {
  fetchPosts,
  fetchTags,
  createPost,
  updatePost,
  deletePost,
} from "../services/postService";
import type { Post } from "../services/postService";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Profile.module.css";

interface PostsResponse {
  posts: Post[];
  current_page: number;
  total_page: number;
  page_size: number;
  total: number;
}

const Profile: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTags, setNewTags] = useState<string[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editTags, setEditTags] = useState<string[]>([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getPosts = async () => {
    try {
      const tagsParam = selectedTags.join(",");
      const data = await fetchPosts(title, page, tagsParam);
      setPosts(data.posts);
      setTotalPage(data.total_page);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, [title, page, selectedTags]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const tags = await fetchTags();
        setAllTags(tags);
        console.log(tags);
      } catch (err) {
        console.log(err);
      }
    };
    getTags();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost(newTitle, newDesc, newTags);
      setShowAdd(false);
      setNewTitle("");
      setNewDesc("");
      setNewTags([]);
      getPosts(); // reload lại danh sách
    } catch (err) {
      alert("Tạo post thất bại!");
    }
  };

  const startEdit = (post: Post) => {
    setEditId(post.id);
    setEditTitle(post.title);
    setEditDesc(post.description);
    setEditTags(
      Array.isArray(post.tags)
        ? post.tags
        : typeof post.tags === "string"
        ? post.tags.split(",").map((t) => t.trim())
        : []
    );
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    try {
      await updatePost(editId, editTitle, editDesc, editTags);
      setEditId(null);
      getPosts();
    } catch (err) {
      alert("Sửa post thất bại!");
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá post này?")) return;
    try {
      await deletePost(postId);
      getPosts();
    } catch (err) {
      alert("Xoá post thất bại!");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 200, background: "#eee", padding: 16 }}>
        <div className={styles.logo}>
          <span className={styles.dot1}></span>
          <span className={styles.dot2}></span>
        </div>
        <button
          style={{ display: "block", marginBottom: 8 }}
          className={styles.profile}
        >
          Posts
        </button>
        <button className={styles.logout} onClick={handleLogout}>
          Logout
        </button>{" "}
      </aside>
      <main style={{ flex: 1, padding: 32 }}>
        {showAdd && (
          <form
            onSubmit={handleCreatePost}
            style={{ marginBottom: 16 }}
            className={styles.formContainer}
          >
            <input
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
              style={{ marginRight: 8 }}
            />
            <input
              placeholder="Description"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              required
              style={{ marginRight: 8 }}
            />
            <select
              multiple
              value={newTags}
              onChange={(e) => {
                const options = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setNewTags(options);
              }}
              style={{ minWidth: 120, marginRight: 8 }}
            >
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <button type="submit" className={styles.create}>
              Tạo mới
            </button>
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className={styles.delete}
            >
              Hủy
            </button>
          </form>
        )}
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
          <button
            style={{
              marginRight: 16,
              background: "#a678f7",
              color: "#fff",
              border: 0,
              borderRadius: 20,
              padding: "8px 32px",
              fontWeight: 600,
            }}
            onClick={() => setShowAdd(true)}
          >
            Add new
          </button>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              marginRight: 16,
              padding: 8,
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div>
          <Select
            isMulti
            options={allTags.map((tag) => ({ value: tag, label: tag }))}
            value={selectedTags.map((tag) => ({ value: tag, label: tag }))}
            onChange={(options) =>
              setSelectedTags(options.map((opt) => opt.value))
            }
            placeholder="Tags"
            styles={{
              container: (base) => ({
                ...base,
                minWidth: 200,
                fontWeight: "bold",
              }),
            }}
          />
        </div>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>ID</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Title</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>
                Description
              </th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Tags</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  No data
                </td>
              </tr>
            ) : (
              posts.map((post) =>
                editId === post.id ? (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        multiple
                        value={editTags}
                        onChange={(e) => {
                          const options = Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          );
                          setEditTags(options);
                        }}
                      >
                        {allTags.map((tag) => (
                          <option key={tag} value={tag}>
                            {tag}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button onClick={handleUpdatePost}>Lưu</button>
                      <button onClick={() => setEditId(null)}>Hủy</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>
                      {Array.isArray(post.tags)
                        ? post.tags.join(", ")
                        : typeof post.tags === "string"
                        ? post.tags
                        : ""}
                    </td>
                    <td>
                      <button
                        style={{ marginRight: 8 }}
                        onClick={() => startEdit(post)}
                      >
                        ✏️
                      </button>
                      <button onClick={() => handleDeletePost(post.id)}>
                        🗑️
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
        <div style={{ marginTop: 16, textAlign: "right" }}>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
            style={{ marginRight: 8 }}
          >
            Prev
          </button>
          <span>
            Page {page} / {totalPage}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPage}
            style={{ marginLeft: 8 }}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
