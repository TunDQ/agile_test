import api from "./api"; // axios instance đã cấu hình baseURL

export interface Post {
  id: string;
  title: string;
  description: string;
  tags: string[] | string | null;
}

export interface PostsResponse {
  posts: Post[];
  current_page: number;
  total_page: number;
  page_size: number;
  total: number;
}

export const fetchPosts = async (title = "", page = 1, tags = "") => {
  const res = await api.get<PostsResponse>(
    `/posts?title=${title}&page=${page}&tags=${tags}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return res.data;
};

export const fetchTags = async () => {
  const res = await api.get<string[]>("/posts/tags", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return res.data;
};

export const createPost = async (
  title: string,
  description: string,
  tags: string[]
) => {
  const res = await api.post(
    "/posts",
    { title, description, tags },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return res.data;
};

export const updatePost = async (
  postId: string,
  title: string,
  description: string,
  tags: string[]
) => {
  const res = await api.patch(
    `/posts/${postId}`,
    { title, description, tags },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return res.data;
};

export const deletePost = async (postId: string) => {
  const res = await api.delete(`/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return res.data;
};
